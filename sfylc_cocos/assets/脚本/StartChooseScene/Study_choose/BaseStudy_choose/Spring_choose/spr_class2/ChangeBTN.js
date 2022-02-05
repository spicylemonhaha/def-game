// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        var clickEventHandler = new cc.Component.EventHandler();//获取事件句柄
        clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "ChangeBTN";// 这个是代码文件名
        clickEventHandler.handler = "callback";
        clickEventHandler.customEventData = "foobar";
        var button = this.node.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    },
    callback: function (evrnt, customEventData) {
        
        var Bins = this.node.parent.parent.getComponent("Spr_clsGameLoading").Bins;
        var Move = this.node._parent._parent._children[1].getComponent("Move");
        var x = Move.lrstate;
        var temp = Bins[x].getComponent(cc.Label).string
        Bins[x].getComponent(cc.Label).string = Bins[x + 1].getComponent(cc.Label).string
        Bins[1 + x].getComponent(cc.Label).string = temp;

    },

    start () {
    },

    // update (dt) {},
});
