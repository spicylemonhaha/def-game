// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        Bottom:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var i,j;
        this.ShowBtnNode = cc.find("Canvas/Game/Putout")
        this.ShowCode = this.ShowBtnNode.getComponent("Commit_cls1_Show")
        this.TopPlayerLoading = cc.find("Canvas/Game/escape_top_background").getComponent("Commit_cls1_TopLoading")
        this.before = new Array()
        for(i = 1; i <= this.TopPlayerLoading.playercount; i ++ ) {
            this.before[i] = new Array()
            for(j = 0; j <= this.TopPlayerLoading.playercount; j ++ )
                this.before[i][j] = false
        }
        console.log(this.Bottom)
        this.BottomLoadingCode = this.Bottom.getComponent("Commit_cls1_BottomLoading")
        var clickEventHandler = new cc.Component.EventHandler();//获取事件句柄
        clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "Commit_cls1_Add";// 这个是代码文件名
        clickEventHandler.handler = "callback";
        clickEventHandler.customEventData = "foobar";
        var button = this.node.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    },
    callback: function (event, customEventData) {
        var i,green;
        //在非多选情况下先获取当前绿色高亮下标
        if(!this.TopPlayerLoading.IsMore && this.ShowCode.BottomPlayerNode.active){
            for(i = 0; i < this.TopPlayerLoading.statement.length; i ++ ) {
                if(this.TopPlayerLoading.statement[i] == 1)
                    green = this.TopPlayerLoading.Pre[i]
            }
            //判断高亮与show所显示的是否为1个
            //不是则将状态置为true
            if(this.ShowCode.number != green.children[1].children[0].getComponent(cc.Label).string) {
                this.before[this.ShowCode.number][Number(green.children[1].children[0].getComponent(cc.Label).string)] = true;
            } 

        
        }
        this.BottomLoadingCode.Add();
        
    },

    start () {

    },

    // update (dt) {},
});
