// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        ScrollViewNode:cc.Node,
        TopNode:cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.ItemLoading = this.ScrollViewNode.getComponent("Commit_cls1_ScrollViewItemLoading")
        this.TopCode = this.TopNode.getComponent("Commit_cls1_TopLoading")
        clickEventHandler = new cc.Component.EventHandler();//获取事件句柄
        clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "Commit_cls1_Sure";// 这个是代码文件名
        clickEventHandler.handler = "callback";
        clickEventHandler.customEventData = "foobar";
        var button = this.node.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    },
    callback(event, customEventData) {
        var i, j;
        //初始化答案数组，看实际玩家的每个序号对应的位置
        wlnode = cc.find("Canvas/Game")
        let wl = wlnode.getComponent("WinOrLose");
        wl.ISlose = false;
        wl.ISwin = false;
        this.answer = new Array()
        this.number = new Array()
        for (i = 0; i < this.TopCode.playercount; i ++ ) {
            this.answer[this.TopCode.Number[i]] = i
        }
        
        for (i = 0; i < this.ItemLoading.count; i ++ ) {
            //逐个判断是否符合条件
            if(this.answer[this.ItemLoading.front[i]] < this.answer[this.ItemLoading.after[i]]) {
                
                wl.ISlose = true
            }
            
        }
        if(!wl.ISlose) {
            wl.ISwin = true
        }
    },
    start () {
        
    },

    // update (dt) {},
});
