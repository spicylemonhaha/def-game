// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        count:0,
        Pre:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //获取人数
        
        
        this.Text = new Array();
        
        cc.find("Canvas/MainCamera/Task").active = false 
        


        this.node.height = 0
    },

    start () {
        var i;
        for (i = 0; i < this.count; i ++ ) {
            node = cc.instantiate(this .Pre);
            node.parent = this.node;
            this.node.height += (this.Pre.data.height + 10)
            this.node.parent.height = this.node.height
            node.children[1].getComponent(cc.Label).string = this.Text[i]; 
        }
    },

    // update (dt) {},
});