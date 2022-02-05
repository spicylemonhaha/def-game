// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        TopNode:cc.Node,
        //
    },

    onLoad () {
        this.TopCode = this.TopNode.getComponent("Commit_cls1_TopLoading")
        clickEventHandler = new cc.Component.EventHandler();//获取事件句柄
        clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "Commit_cls1_More";// 这个是代码文件名
        clickEventHandler.handler = "callback";
        clickEventHandler.customEventData = "foobar";
        var button = this.node.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    },
    callback() {
        this.ShowBtnNode = cc.find("Canvas/Game/Putout")
        this.ShowCode = this.ShowBtnNode.getComponent("Commit_cls1_Show")
        if(this.ShowCode.index != -1)
        this.TopCode.IsMore = true

    },
    start () {

    },

    // update (dt) {},
});
