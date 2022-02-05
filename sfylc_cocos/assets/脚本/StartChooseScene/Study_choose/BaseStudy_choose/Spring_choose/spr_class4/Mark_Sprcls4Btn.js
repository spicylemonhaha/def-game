// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,
//将基准数以及两个玩家归位，并限制行动
properties: {
    GameNode:cc.Node,
    Lplayer:cc.Node,
    Rplayer:cc.Node,
    IsRed:false,
    Count:0,
    Red:cc.SpriteFrame,
    IsJB:false,
    IsNL:false,

},

    // LIFE-CYCLE CALLBACKS:
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
                require("Scripts").ChangeSizeByNode(self.GameNode.getComponent("Spr_clsGameLoading").Bins[0]._parent,self.Red)
            });
        }
        
        if(this.IsNL)
            loadImgByUrl("https://www1.forwhat01.top/others/sfylc_resource/draw/StartChooseScene/Story_choose/nlzn/square_d.png",null)
        else
            loadImgByUrl("https://www1.forwhat01.top/others/sfylc_resource/draw/StartChooseScene/Study_choose/BaseStudy_choose/Spring_choose/sprcls2_boxred.png",null)
        
        
        var clickEventHandler = new cc.Component.EventHandler();//获取事件句柄
        clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "Mark_Sprcls4Btn";// 这个是代码文件名
        clickEventHandler.handler = "callback";
        this.IsJB = false
        clickEventHandler.customEventData = "foobar";
        var button = this.node.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    },
    callback: function (event, customEventData) {
        console.log("mark")
        var lMove = this.Lplayer.getComponent("Move1");//获取玩家节点中的move代码文件
        
        var rMove = this.Rplayer.getComponent("Move")
        
        var GameCode = this.GameNode._components[2]
        
        var Bins = this.GameNode.getComponent("Spr_clsGameLoading").Bins
        
        //没标红
        if (!this.IsRed) {
            if(!this.IsJB){
                //限制行动并标红
                console.log("没标红")
                this.IsRed = true
           
                lMove.dir[3] = true
                rMove.dir[2] = false
                this.nomal = Bins[rMove.lrstate]._parent._components[0].spriteFrame
                Bins[rMove.lrstate]._parent._components[0].spriteFrame = this.Red
            }
        }
        //标红
        else {
            //交换并取消标红
            console.log("标红")
            this.IsRed = false
                //换图片并限制行动
            lMove.dir[3] = false
            rMove.dir[2] = true
            Bins[rMove.lrstate]._parent._components[0].spriteFrame = this.nomal
        
            var temp1 = Bins[lMove.lrstate].getComponent(cc.Label).string
            Bins[lMove.lrstate].getComponent(cc.Label).string = Bins[rMove.lrstate].getComponent(cc.Label).string
            Bins[rMove.lrstate].getComponent(cc.Label).string = temp1
            //在一起
            if (lMove.lrstate == rMove.lrstate && !this.IsJB){
                //与基准数进行交换
                var temp = Bins[GameCode.Minx[this.Count]].getComponent(cc.Label).string
                
                Bins[GameCode.Minx[this.Count]].getComponent(cc.Label).string = Bins[lMove.lrstate].getComponent(cc.Label).string
                Bins[lMove.lrstate].getComponent(cc.Label).string = temp
                //限制行动
                lMove.dir[3] = false
                rMove.dir[2] = false
                var wl = this.GameNode._components[3]
                //判断是否失败
                for (var i = 0; i < 8; i ++ ) {
                    if(Bins[i].getComponent(cc.Label).string != GameCode.Match[this.Count][i]) {
                        wl.ISlose = true
                        console.log("lose")
                        break;
                    }
                }
                //在未失败的基础上判断胜利
                if (this.Count == GameCode.BaseCount - 1 && !wl.ISlose) {
                    //
                    wl.ISwin = true
                }
                this.IsJB = true
            }
        }
        

    },
    start () {

    },

    // update (dt) {},
});
