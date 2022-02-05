//t=require("Player");
var map;
cc.Class({
    extends: cc.Component,

    properties: {
        xmove: 100,//移动单位
        ymove: 100,
        IsOnlyOnce: true,//是否只能经过一次
        theMap: { default: null, type: cc.TextAsset },//地图txt文件 
        playerx: 4,
        playery: 0,//初始位置
        // Canvas: { default: null, type: cc.Node },
        MapNode: { default: null, type: cc.Node },
        MapCode: "Aut_cls123456GameArea"
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.oldx = 0;//初始点击触屏位置
        this.oldy = 0;
        // this.maptxt=String(this.theMap.text);
        // this.maptxt=this.maptxt.replace("\r", "");//删除\r
        var canvas = cc.find("Canvas");//要生效就不能改Canvas的名。。
        canvas.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        canvas.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        canvas.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);//进行点击监听
        var txt = this.theMap.text;
        this.maptxt = new Array(txt.length);
        this.mapw = txt.indexOf("\n") - 1; this.maph = 0;
        for (var i = 0, j = 0; i < txt.length; i++) {
            var nowchar = txt[i];//加载地图
            if (txt[i] == "\r") { continue; }
            if (txt[i] == "\n") {///换行
                this.maph++; continue;
            }
            if (txt[i] != ".") {
                this.maptxt[j] = 1; j++;
            } else {
                this.maptxt[j] = 0; j++;
            }
        }
        //如果最后少一个换行，说明行数=换行数量+1
        if (txt[txt.length - 1] != "\n") { this.maph++; }
        console.log(this)
    },
    get(x, y) {//获取某点
        if (x >= this.mapw || y >= this.maph || x<0 || y<0) return 0
        var pos = y * (this.mapw) + x;
        return this.maptxt[pos]
    },
    set(x, y, t) {//设置某点
        if (x >= this.mapw || y >= this.maph || x < 0 || y < 0) return 0
        var pos = y * (this.mapw) + x;
        var tt = this.maptxt[pos];
        this.maptxt[pos] = t;
        if (t == 0) {
            this.MapNode.getComponent(this.MapCode).DeleteNode(x, y, "path");
        }
        return tt
    },
    onTouchStart(event) {
        var touches = event.getTouches();
        var oldPos = this.node.parent.convertToNodeSpaceAR(touches[0].getStartLocation());
        this.oldx = oldPos.x;
        this.oldy = oldPos.y;
    },
    onTouchEnd(event) {
        var touches = event.getTouches();
        this.newPos = this.node.parent.convertToNodeSpaceAR(touches[0].getLocation()); //获取触摸结束之后的坐标；
        this.newy = this.newPos.y
        this.newx = this.newPos.x;
        var mousedx = this.newx - this.oldx;
        var mousedy = this.newy - this.oldy;
        var toward = [[1, 0], [0, 1], [-1, 0], [0, -1]], moveneed = 80;
        for (var i = 0; i < 4; i++) {
            var flagx = (mousedx * toward[i][0] - moveneed) > 0;
            var flagy = (mousedy * toward[i][1] - moveneed) > 0;
            var nextx = this.playerx + toward[i][0],
                nexty = this.playery - toward[i][1];
            if ((flagx || flagy) && this.get(nextx, nexty)) {//如果能走
                if (this.IsOnlyOnce) {
                    this.set(this.playerx, this.playery, 0)
                }
                this.node.x += toward[i][0] * this.xmove;
                this.playerx = nextx;
                this.node.y += toward[i][1] * this.ymove;
                this.playery = nexty;
            }
        }
    },
});

