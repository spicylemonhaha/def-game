
cc.Class({
    extends: cc.Component,

    properties: {
       xmove:150,//移动单位
       ymove:100,
       dir:[cc.Boolean],//0,1,2,3分别表示上下左右可移动的方向
       lrstate:0,//代表左右移动格数
       udstate:0,
       oldx:0,//初始点击触屏位置
       oldy:0,
       newx:0,//点击结束触屏位置
       newy:0,
       maxudstate:1,
       minudstate:0,
       maxlrstate:1,//左右最大移动格数
       minlrstate:0,//最小移动格数，要想在初始位置左边移动将该变量设置为负数
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchCancel,this);
        
        
        
    },
    onTouchStart(event) {
        var touches = event.getTouches();
        var oldPos = this.node.parent.convertToNodeSpaceAR(touches[0].getStartLocation());
        this.oldx = oldPos.x;
        this.oldy = oldPos.y;
    },
    onTouchEnd (event) {
        var touches = event.getTouches();
        this.newPos = this.node.parent.convertToNodeSpaceAR(touches[0].getLocation()); //获取触摸结束之后的坐标；
        this.newy = this.newPos.y
        this.newx = this.newPos.x;
        if(this.newx - this.oldx > 80 && this.lrstate < this.maxlrstate && this.dir[3]) {//向右移动
            this.node.x += this.xmove;
            this.lrstate += 1 ;
        }
        else if(this.oldx - this.newx > 80 && this.lrstate > this.minlrstate && this.dir[2]) {//向左移动
            this.node.x -= this.xmove;
            this.lrstate -- ;
        }
        else if(this.newy - this.oldy > 80 && this.udstate < this.maxudstate && this.dir[0]) {//向上移动
            this.node.y += this.ymove;
            this.udstate ++ ;
        }
        else if(this.oldy - this.newy > 80 && this.udstate > this.minudstate && this.dir[1]) {//向下移动
            this.node.y -= this.ymove;
            this.udstate -- ;
        }
        
        
    },
    onTouchCancel: function (event) {
        this.onTouchEnd(event)
    },
    
});
