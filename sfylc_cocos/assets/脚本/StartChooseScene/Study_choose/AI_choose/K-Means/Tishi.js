// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        Node:cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.Node.active = false
    },

    start () {

    },

    update (dt) {
        if(this.Node.active) {
            
        }
    },
});
