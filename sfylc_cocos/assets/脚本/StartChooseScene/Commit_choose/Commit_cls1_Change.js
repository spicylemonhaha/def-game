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
        Bottom:cc.Node,
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.TopCode = this.TopNode.getComponent("Commit_cls1_TopLoading")
        this.BottomLoadingCode = this.Bottom.getComponent("Commit_cls1_BottomLoading")
        clickEventHandler = new cc.Component.EventHandler();//获取事件句柄
        clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "Commit_cls1_Change";// 这个是代码文件名
        clickEventHandler.handler = "callback";
        clickEventHandler.customEventData = "foobar";
        var button = this.node.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    },
    callback() {
        var i,j;
        this.a = this.b = -1
        if(this.TopCode.IsMore){
            for (i = 0; i < this.TopCode.statement.length; i ++ ) {
                if(this.TopCode.statement[i] == 1) {
                    this.a = i;
                }
                else if (this.TopCode.statement[i] == 2) {
                    this.b = i
                }
            }
            if(this.a != -1 && this.b != -1) {
                temp = this.TopCode.Number[this.a]
                this.TopCode.Number[this.a] = this.TopCode.Number[this.b]
                this.TopCode.Number[this.b] = temp
                temp = this.TopCode.Count[this.a]
                this.TopCode.Count[this.a] = this.TopCode.Count[this.b]
                this.TopCode.Count[this.b] = temp
                this.TopCode.statement[this.a] = this.TopCode.statement[this.b] = 0
                this.TopCode.IsMore = false
                this.BottomLoadingCode.Add()
            }

        }

    },
    start () {

    },

    // update (dt) {},
});
