// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        firstx:-385,
        firsty:-46,
        PrefabPlay:cc.Prefab,
        playercount:cc.Integer,
        movex:110,
        IsMore:false,


    },
    changestatement() {
        var i, j;
        for(i = 0; i < this.playercount; i ++ ) {
            this.TopBtnLoading[i].statement = this.statement[i]
        }
    },
    onLoad() {
        var i, j;
        this.Count=new Array();
        this.Number=new Array();
        this.statement=new Array();
        this.playercount = Math.floor(Math.random() * 100) % 4 + 5
        this.Pre = new Array()
        this.TopBtnLoading = new Array()
        for(i = 0; i < this.playercount; i ++ ) {
            this.Pre[i] = cc.instantiate(this.PrefabPlay)
            this.Pre[i].parent = this.node
            this.TopBtnLoading[i] = this.Pre[i].children[2].getComponent("Commit_cls1_ToppBtn")
            this.TopBtnLoading[i].index = i;
            this.Pre[i].setPosition(this.firstx + 880/this.playercount * i, this.firsty)
            this.Count[i] = 0
            this.TopBtnLoading[i].changeNumber(i + 1)
            this.Number[i] = i + 1
            this.statement[i] = 0
        }
      },

    start () {

    },

    update (dt) {
        var i;
        for(i = 0; i < this.playercount; i ++ ) {
            
            this.TopBtnLoading[i].changeNumber(this.Number[i])
            this.TopBtnLoading[i].changeCount(this.Count[i])
            this.TopBtnLoading[i].statement = this.statement[i]
        }
    },
});
