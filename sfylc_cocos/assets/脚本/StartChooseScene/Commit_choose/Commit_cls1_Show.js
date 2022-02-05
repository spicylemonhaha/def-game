// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
    extends: cc.Component,
    
    properties: {
        index: -1,//存储当前显示的人的index
        BottomPlayerNode:cc.Node,
        Bottom:cc.Node,
        
    },

    onLoad () {
        
        this.TopPlayerLoading = cc.find("Canvas/Game/escape_top_background").getComponent("Commit_cls1_TopLoading")
        this.BottomPlayerNode.active = false
        this.number = 1
        var clickEventHandler = new cc.Component.EventHandler();//获取事件句柄
        clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "Commit_cls1_Show";// 这个是代码文件名
        clickEventHandler.handler = "callback";
        clickEventHandler.customEventData = "foobar";
        var button = this.node.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    },
    callback: function (event, customEventData) {
        var i, j;

        if(!this.TopPlayerLoading.IsMore)
            for (i = 0; i < this.TopPlayerLoading.playercount; i ++ )
                if (this.TopPlayerLoading.statement[i] == 1 ){
                    if(this.index == -1 || this.number != this.TopPlayerLoading.Number[i]){
                        this.index = i
                        this.BottomPlayerNode.active = true     
                        this.BottomPlayerNode.children[0].children[0].getComponent(cc.Label).string = this.TopPlayerLoading.Number[this.index]
                        this.number = this.TopPlayerLoading.Number[this.index]  
                        this.Bottom.getComponent("Commit_cls1_BottomLoading").Add()
                        break;
                    }
                }
        
    },
    start () {

    },

    update (dt) {
        
    },
});