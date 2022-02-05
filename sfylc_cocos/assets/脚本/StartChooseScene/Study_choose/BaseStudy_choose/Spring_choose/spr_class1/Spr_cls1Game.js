// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        a: {default:null,type:cc.Node},//坐标为(1,0)的箱子
        b: {default: null,type: cc.Node},//坐标为(1,1)的箱子
        p: {default: null,type: cc.Node},//背包中箱子
        player: {default: null,type: cc.Node},//玩家
        ispressup: false,//是否允许覆盖，false为允许
        aa:0,
        bb:0,
        isfinish:false
    },
    // onLoad () {},
    onLoad() {
        this.oldx=0;this.oldy=0;
        this.aa = Math.floor(Math.random() * 100);//生成小于1的随机数，转换后向下取整
        this.bb = Math.floor(Math.random() * 100);
        this.node.parent.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.a.getComponent(cc.Label).string = this.aa;//获取文字组件字符串属性，并输入内容
        this.b.getComponent(cc.Label).string = this.bb;
        this.p.parent.active=false;//透明度为0，且控件不启用
        this.isfinish = false;
        
    },
    onTouchStart(event) {
        let touches,newPos,newx,newy;
        touches = event.getTouches();
        newPos = this.node.parent.convertToNodeSpaceAR(touches[0].getLocation()); //获取触摸结束之后的坐标；
        newy = newPos.y;
        newx = newPos.x;
        let move = this.player.getComponent("Move");
        if (touches[0].getLocation().y < cc.find("Canvas").height / 2.0) {//起点为下半屏幕时，人物无法左右动
            move.dir[2] = false;move.dir[3] = false;
            this.ispressup=false;
        } else {
            move.dir[2] = true; move.dir[3] = true;
            this.ispressup=true;
        }
        this.oldx=newx;
        this.oldy=newy;
    },
    onTouchEnd(event) {
        var touches = event.getTouches();
        var newPos = this.node.parent.convertToNodeSpaceAR(touches[0].getLocation()); //获取触摸结束之后的坐标；
        var newy = newPos.y
        var newx = newPos.x;
        let move = this.player.getComponent("Move");//获取脚本
        let astr = this.a.getComponent(cc.Label), 
            bstr = this.b.getComponent(cc.Label),
            pstr = this.p.getComponent(cc.Label);
        if (newx - this.oldx > 80 && !this.ispressup ) {//向右
            bstr.string = astr.string;
        } else if (this.oldx - newx > 80 && !this.ispressup ) {//向左
            astr.string = bstr.string;
        } else if (newy - this.oldy > 80 && !this.isfinish) {//向上移动
            this.p.parent.active = true;
            if(move.lrstate==0){
                pstr.string = astr.string;
            } else {
                pstr.string = bstr.string;
            }
        } else if (this.oldy - newy > 80 && pstr.string>0) {//向下移动
            if (move.lrstate == 0) {
                astr.string = pstr.string;
            } else {
                bstr.string = pstr.string;
            }
        }
        //判断是否胜利或是失败
        let wl = this.getComponent("WinOrLose");
        if((astr.string == bstr.string && !this.p.parent.active) || (astr.string == bstr.string && astr.string == pstr.string)) { 
            // console.log("lose"); 
            // console.log(pstr.active)
            // console.log((astr.string == bstr.string && !pstr.active))
            // console.log((astr.string == bstr.string && astr.string == pstr.string))          
            wl.ISlose = true;
            console.log(wl); 
            this.isfinish = true;

        }
        if(astr.string == this.bb && bstr.string == this.aa){
            console.log("win")
            wl.ISwin = true;
            this.isfinish = true
            
        }


    }

    // update (dt) {},
});
