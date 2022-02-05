// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        player:cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var clickEventHandler = new cc.Component.EventHandler();//获取事件句柄
        clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "Push";// 这个是代码文件名
        clickEventHandler.handler = "callback";
        clickEventHandler.customEventData = "foobar";
        var button = this.node.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    },
    callback: function (event, customEventData) {
        var Move = this.player._components[0];//获取玩家节点中的move代码文件
        var Bins = this.node.parent.parent._components[1].Bins;
        var BagBin = this.node.parent.parent.getComponent("Spr_clsGameLoading").binInbag
        this.backNode = cc.find("Canvas/Game");//全局从根节点寻找
        var GameCode = this.backNode._components[2]

        //先判断右边是否为空【节点隐藏】且本节点是否不为空
        if(Move.lrstate < Move.maxlrstate && !Bins[Move.lrstate + 1]._parent._parent.active && Bins[Move.lrstate]._parent._parent.active){
            //是则将本节点与下一节点所有有用状态交换，分别为活跃状态，数值，图片
            var temp = Bins[Move.lrstate + 1]._parent._parent.active
            Bins[Move.lrstate + 1]._parent._parent.active = Bins[Move.lrstate]._parent._parent.active
            Bins[Move.lrstate]._parent._parent.active = temp

            temp = Bins[Move.lrstate + 1].getComponent(cc.Label).string
            Bins[Move.lrstate + 1].getComponent(cc.Label).string = Bins[Move.lrstate].getComponent(cc.Label).string
            Bins[Move.lrstate].getComponent(cc.Label).string = temp
            
            temp = Bins[Move.lrstate + 1]._parent._components[0].spriteFrame
            Bins[Move.lrstate + 1]._parent._components[0].spriteFrame = Bins[Move.lrstate]._parent._components[0].spriteFrame
            Bins[Move.lrstate]._parent._components[0].spriteFrame = temp


            //交换flag值
            temp = GameCode.flag[this.player.getComponent("Move").lrstate]
            GameCode.flag[this.player.getComponent("Move").lrstate] = GameCode.flag[this.player.getComponent("Move").lrstate + 1];
            GameCode.flag[this.player.getComponent("Move").lrstate + 1] = temp
            //并交换二者图片

        }
        
        
        

    },
    start () {

    },

    // update (dt) {},
});
