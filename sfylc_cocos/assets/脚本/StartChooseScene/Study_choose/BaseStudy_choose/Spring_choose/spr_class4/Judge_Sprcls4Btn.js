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
    MBNode:cc.Node,
    Mark:cc.Node

},

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.beforelx = this.Lplayer.x
        
        this.beforemx = this.Mark.x
        var clickEventHandler = new cc.Component.EventHandler();//获取事件句柄
        clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "Judge_Sprcls4Btn";// 这个是代码文件名
        clickEventHandler.handler = "callback";
        clickEventHandler.customEventData = "foobar";
        var button = this.node.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    },
    callback: function (event, customEventData) {

        //首先判斷是否為重合，若是則響應，，分開左右玩家，限制行動
        var lMove = this.Lplayer.getComponent("Move1");//获取玩家节点中的move代码文件
        var rMove = this.Rplayer.getComponent("Move")
        var GameCode = this.GameNode._components[2]
        var MBCode = this.MBNode.getComponent("Mark_Sprcls4Btn")
        console.log(lMove)
        console.log(rMove)
        console.log(GameCode)
        console.log(MBCode)
        if(lMove.lrstate == rMove.lrstate && MBCode.IsJB) {
            MBCode.IsJB = false
            MBCode.Count ++
            this.Lplayer.x = this.beforelx + 99 * (GameCode.Minx[MBCode.Count]) 
            this.Mark.x = this.beforemx + 99 * (GameCode.Minx[MBCode.Count]) 
            
            lMove.lrstate = GameCode.Minx[MBCode.Count]
            this.Rplayer.x = this.beforelx + 99 * (GameCode.Maxx[MBCode.Count]) 
            rMove.lrstate = GameCode.Maxx[MBCode.Count]
            lMove.dir[3] = false
            rMove.dir[2] = true
        }


        
    },
    start () {

    },

    // update (dt) {},
});
