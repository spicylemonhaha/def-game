// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    //右边的角色只能左走，左边角色只能右走，二者同时只可走一个
    //只能先运行快速排序将基准数以及每次的移动范围确定才可进行其余模拟，故在初始函数onLoad中执行
    extends: cc.Component,

    properties: {
        Words:[cc.Integer],
        //左右两个角色
        Lplayer:cc.Node,
        Rplayer:cc.Node,
        BaseNode:cc.Node,
        BaseCount:0,
        Minx:[cc.Integer],//每次最小移动范围集合
        Maxx:[cc.Integer],//每次最大移动范围集合
        
    },
    quicketmark(a,l,r) {
        if(l >= r)
            return 
        var base = a[l];
        this.Minx[this.BaseCount] = l
        this.Maxx[this.BaseCount] = r
        
        var i = l;
        var j = r;
        while(i < j){
            while (a[j] >= base && i < j) j --
            while (a[i] <= base && i < j) i ++
            var temp = a[i];
            a[i] = a[j]
            a[j] = temp
        }
        a[l] = a[i]
        a[i] = base
        this.Match[this.BaseCount] = new Array()
        var m;
        for (m = 0; m < 8; m ++ ) {
            this.Match[this.BaseCount][m] = a[m]
        }
        // console.log(this.Match[this.BaseCount])
        // console.log(this.Minx[this.BaseCount])
        // console.log(this.Maxx[this.BaseCount])
        // console.log(i)
        this.BaseCount ++ 
        this.quicketmark(a,l,i - 1)
        this.quicketmark(a,i + 1,r)
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {//
        this.Match = new Array()
        var i;
        var Bins = this.node._components[1].Bins;//获取本节点上的其他组件中的箱子的文字组件【】
        for (i = 0; i < Bins.length; i ++ ) {//获取初始文字
            this.Words[i] = Number(Bins[i].getComponent(cc.Label).string);
        }
        
        this.quicketmark(this.Words,0,7)
        
        
    },
    

    start () {

    },

    update (dt) {
        
        var lMove = this.Lplayer.getComponent("Move1");//获取玩家节点中的move代码文件
        var rMove = this.Rplayer.getComponent("Move");
        if(lMove.lrstate == rMove.lrstate){
            lMove.dir[3] = false
            rMove.dir[2] = false
        }



    },
});
