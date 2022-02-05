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
        LoadNode:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var i,j,k;
        
        var button = this.node.getComponent(cc.Button);
        var that = this;
        this.TopCode = cc.find("Canvas/RandArea/Top").getComponent("Kmeans_TopLoading")
        this.oldPos={x:0,y:0}
        this.Code = cc.find("Canvas/RandArea").getComponent("Ai_cls1_RandAreaLoading")
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            that.oldPos.x = that.node.parent.position.x;
            that.oldPos.y = that.node.parent.position.y;
            for (i = 0; i < that.Code.randfix; i ++ )
                that.TopCode.show[i].children[1].getComponent(cc.Label).string = Math.floor(100 * Math.sqrt(Math.pow(Math.abs(that.Code.fix[i].x - that.Code.ship[that.index].x), 2) + Math.pow(Math.abs(that.Code.fix[i].y - that.Code.ship[that.index].y), 2))) / 100 + "m"
            
        });
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var moveXY = cc.v2;
            var toXY = cc.v2;
            
            // moveXY.x = event.getDeltaX()       //获取鼠标距离上一次事件移动的 X轴距离。
            moveXY.y = event.getDeltaY()      //获取鼠标距离上一次事件移动的 Y轴距离。
            moveXY.x = event.getDeltaX()
            toXY.x = that.node.parent.position.x + moveXY.x;
            toXY.y = that.node.parent.position.y + moveXY.y;  //限制y轴方向拖动

            that.node.parent.setPosition(toXY);
        })

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            var moveXY = cc.v2;
            var toXY = cc.v2;
            
            // moveXY.x = event.getDeltaX()       //获取鼠标距离上一次事件移动的 X轴距离。
            moveXY.y = event.getDeltaY()      //获取鼠标距离上一次事件移动的 Y轴距离。
            moveXY.x = event.getDeltaX()
            toXY.x = that.node.parent.position.x + moveXY.x;
            toXY.y = that.node.parent.position.y + moveXY.y;  //限制y轴方向拖动

            that.node.parent.setPosition(toXY);
            that.node.parent.setPosition(that.oldPos);

             
            for (j = 0; j < that.Code.randfix; j ++ ) {//50 40范围判断
                if(that.Code.fix[j].x - 50 <= toXY.x && that.Code.fix[j].x + 50 >= toXY.x && that.Code.fix[j].y - 40 <= toXY.y && that.Code.fix[j].y + 40 >= toXY.y) {
                    //该图片与状态
                    that.Code.shipstatement[that.index] = j;
                    that.Code.Scr.addByUrl(that.Code.ship[that.index], that.Code.ShippngUrl + j + ".png");
                }
            }
        })
    },
    
    start () {

    },

    update (dt) {
        
    },
});
