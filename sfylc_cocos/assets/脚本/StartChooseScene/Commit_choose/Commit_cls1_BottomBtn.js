// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        //渲染图片
        Red0:cc.SpriteFrame,
        NumberNode:cc.Node,

    },

    
    onLoad () {

        this.Top = this.node.parent
        
        this.Top._components[0].spriteFrame = this.Red0
        var clickEventHandler = new cc.Component.EventHandler();//获取事件句柄
        clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "Commit_cls1_BottomBtn";// 这个是代码文件名
        clickEventHandler.handler = "callback";
        clickEventHandler.customEventData = "foobar";

        this.Add = cc.find("Canvas/Game/add")
        this.AddCode = this.Add.getComponent("Commit_cls1_Add")
        
        this.ShowBtnNode = cc.find("Canvas/Game/Putout")
        this.ShowCode = this.ShowBtnNode.getComponent("Commit_cls1_Show")

        var button = this.node.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    },
    start () {
        
    
    },
    callback: function (event, customEventData) {
        this.AddCode.before[this.ShowCode.number][Number(this.NumberNode.getComponent(cc.Label).string)] = false
        this.Bottom = this.node.parent.parent

        this.BottomLoadingCode = this.Bottom.getComponent("Commit_cls1_BottomLoading")
        
        this.BottomLoadingCode.Add();
    },
//20535197208
    start () {
        

    },

    update (dt) {

       

    },
});
