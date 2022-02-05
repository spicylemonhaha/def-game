// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        Top:cc.Prefab,
        CodeNode:cc.Node,
        Prey:cc.Integer,
        nodex:cc.Integer,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.TopLink = new Array();
        this.Code = this.CodeNode.getComponent("Ai_cls1_RandAreaLoading");
        this.show = new Array();
        var i,mid = this.nodex / this.Code.randfix;

        for (i = 0; i < this.Code.randfix; i ++ ) {
            this.show[i] = cc.instantiate(this.Top)
            this.show[i].parent = this.node;
            
            this.show[i].setPosition(mid / 2 + i * mid - 480 - 95, this.Prey)
            this.show[i].children[1].getComponent(cc.Label).string = "NaN"
            // this.show[i].children[0].getComponent(cc.Sprite).spriteFrame = this.Code.Fixpng[i];
            this.Code.Scr.addByUrl(this.show[i].children[0],this.Code.FixpngUrl+i+".png");
        }
    },
    NaN(){
        var i;

        for (i = 0; i < this.Code.randfix; i ++ ) {
            this.show[i].children[1].getComponent(cc.Label).string = "NaN"
        }
    },
    start () {

    },

    update (dt) {},
});
