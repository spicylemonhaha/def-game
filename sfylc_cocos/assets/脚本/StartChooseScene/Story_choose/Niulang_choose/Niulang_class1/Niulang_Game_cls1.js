
cc.Class({
    extends: cc.Component,

    properties: {
        flag:[cc.Boolean],//用于标记是否变红
        Words:[cc.Integer],//记录文字用于最终结果判定
        Red:cc.SpriteFrame,//存储红箱子图片用于更换图片
        //Warn:[cc.Node],//存储警告节点用于取消警告限制
        RedCount:1,//红箱子数量，用于判断是否需要判断胜利
        player:cc.Node,//玩家节点

        //以下为坐标数据用于检测滑动
        oldx:0,
        oldy:0,
        newx:0,
        newy:0,

    },
    onLoad () {
        
        var self=this;
        function loadImgByUrl( remoteUrl, imageType) {
            if (!imageType) {
                imageType = "png";
            }
            cc.loader.load({
                url: remoteUrl,
                type: imageType
            }, function (err, texture) {
                if (err) {
                    return;
                }
                self.Red = new cc.SpriteFrame(texture);
                require("Scripts").ChangeSizeByNode(self.node._components[1].Bins[0]._parent,self.Red)
            });
        }


        loadImgByUrl("https://www1.forwhat01.top/others/sfylc_resource/draw/StartChooseScene/Story_choose/nlzn/square_a.png",null)

        var Bins = this.node._components[1].Bins;//获取本节点上的其他组件中的箱子的文字组件【】
        var i;
        for (i = 0; i < Bins.length; i ++ ) {//获取初始文字
            this.Words[i] = Number(Bins[i].getComponent(cc.Label).string);
        }
        
        Bins[0]._parent._components[0].spriteFrame = this.Red;//第一个箱子原本就是红的
        this.flag[0] = true;
        this.node.parent.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
        this.node.parent.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        //this.Warn[i]
    },
    onTouchMove(event) {
        var touches = event.getTouches();
        var oldPos = this.node.parent.convertToNodeSpaceAR(touches[0].getStartLocation());
        this.oldx = oldPos.x;
        this.oldy = oldPos.y;
    },
    onTouchEnd(event){
        var touches = event.getTouches();
        this.newPos = this.node.parent.convertToNodeSpaceAR(touches[0].getLocation()); //获取触摸结束之后的坐标；
        this.newy = this.newPos.y
        this.newx = this.newPos.x;
        var Move = this.player.getComponent("Move");//获取玩家节点中的move代码文件
        var Bins = this.node._components[1].Bins;
        var BagBin = this.node.getComponent("Spr_clsGameLoading").binInbag
        if (this.newy - this.oldy > 80) {
            //up
            //判断当前节点图片是否为红且背包中箱子是否已经显现，
            //都不是则隐藏箱子节点活动
            //并且将箱子内容赋给背包箱子并令背包箱子现行
            if (!this.flag[Move.lrstate] && !BagBin.active) {
                Bins[Move.lrstate]._parent._parent.active = false;
                BagBin.active = true;
                //console.log(BagBin.children[0].getComponent(cc.Label))
                BagBin.children[0].getComponent(cc.Label).string = Bins[Move.lrstate].getComponent(cc.Label).string
                
            }
        }
        else if (this.oldy - this.newy > 80) {
            //down
            //判断当前节点是否已经消失且背包中有数据
            if (!Bins[Move.lrstate]._parent._parent.active && BagBin.active) {
                //将箱子重现并赋予背包中值，并将背包箱子重新隐藏
                console.log(Bins[Move.lrstate].getComponent(cc.Label).string)
                Bins[Move.lrstate]._parent._parent.active = true;
                //BagBin.children[0].getComponent(cc.Label).string = Bins[Move.lrstate].getComponent(cc.Label).string
                Bins[Move.lrstate].getComponent(cc.Label).string = BagBin.children[0].getComponent(cc.Label).string
                BagBin.active = false;
                console.log(Bins[Move.lrstate].getComponent(cc.Label).string)

            }
        }
    },
    
    update (dt) {
        var Move = this.player.getComponent("Move");//获取玩家节点中的move代码文件
        var Bins = this.node._components[1].Bins;
        if (this.RedCount >= 6){//红色箱子达到一定数目就可判断是否胜利，结束游戏
            //先进行数据上的排序，之后将玩家进行排序的结果与答案对比
            this.Words.sort(function (a, b) {
                return a - b 
            });
            var sign = 0
            var wl = this.node.parent.getComponent("WinOrLose")
            var i;
            for (i = 0; i < this.Words.length; i ++ ) {
                if (this.Words[i] != Number(Bins[i].getComponent(cc.Label).string)) {
                    var sign = 1;
                    console.log(this.Words)
                    console.log(i)
                    console.log(Bins)
                    break;
                }
            }
            var Arrow = cc.find("Canvas/Game/Mark/Arrow")
            Arrow.active = false
            if(sign)
                wl.ISlose = true;
            else wl.ISwin = true;


        }
        else if (this.RedCount >= 2 && Move.maxlrstate < this.RedCount) {
            //未达到数目，实时检测红箱子数目，并实时减少警告，增加活动范围
            //this.Warn[this.RedCount - 2].active = false;
            Move.maxlrstate ++ ;
            
        }
        //sconsole.log(this.node._components[1].Bins);
    },
});
// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


