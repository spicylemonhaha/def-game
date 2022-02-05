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
        GameNode:cc.Node,
        Bins:[cc.Node]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        this.GameCode = this.GameNode.getComponent("Niulang_Game_cls2")
        this.Move = this.GameCode.Move
        console.log(this.Move)
        this.Bins = this.GameCode.Bins
        var clickEventHandler = new cc.Component.EventHandler();//获取事件句柄
        clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "Niulang_cls2ChangeBtn";// 这个是代码文件名
        clickEventHandler.handler = "callback";
        clickEventHandler.customEventData = "foobar";
        var button = this.node.getComponent(cc.Button);
        console.log(button)
        button.clickEvents.push(clickEventHandler);
    },
    callback() {
        var temp;
        var flag = this.GameCode.flag
        if(!flag)return;
        if(this.Move.lrstate > 0 && flag[this.Move.lrstate - 1]) {
            if(this.Move.udstate == 0 && this.Move.lrstate >= 1 && this.Move.lrstate <= 6) {
                //1
                temp = this.Bins[this.Move.lrstate].getComponent(cc.Label).string
                this.Bins[this.Move.lrstate].getComponent(cc.Label).string = this.Bins[this.Move.lrstate - 1].getComponent(cc.Label).string
                this.Bins[this.Move.lrstate - 1].getComponent(cc.Label).string = temp
                
            }
            if(this.Move.udstate == -2 && this.Move.lrstate >= 2 && this.Move.lrstate <= 7) {
                //3
                temp = this.Bins[this.Move.lrstate - 2].getComponent(cc.Label).string
                this.Bins[this.Move.lrstate - 2].getComponent(cc.Label).string = this.Bins[this.Move.lrstate - 1].getComponent(cc.Label).string
                this.Bins[this.Move.lrstate - 1].getComponent(cc.Label).string = temp
                
            }
        }
        
        this.GameCode.mark()
    },
    start () {

    },

    // update (dt) {},
});
