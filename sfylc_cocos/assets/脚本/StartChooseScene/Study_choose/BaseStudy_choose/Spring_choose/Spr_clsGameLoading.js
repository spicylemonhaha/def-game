// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        Bins:[cc.Node],//箱子内数据
        binInbag:cc.Node,//背包中箱子
        player:[cc.Node],
        Isbag:false,
        //Ismove:[cc.Boolean],
        binnum:0,
        playernum:0,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var i;
        for (i = 0; i < this.binnum; i ++ ) {
            this.bin = Math.floor(Math.random() * 100);
            //console.log(this.bin);
            this.Bins[i].getComponent(cc.Label).string = this.bin;
        }
        if  (this.Isbag)
            this.binInbag.active = false;
    },

    start () {
        
        
        

    },

    // update (dt) {},
});
