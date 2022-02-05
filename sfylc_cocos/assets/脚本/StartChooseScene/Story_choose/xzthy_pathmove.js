// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
    },
    start () {
        this.anglet=Math.random()*180+90;
        this.anglet*=1-2*(Math.random()<0.5)
    },

    update (dt) {
        this.node.angle += dt * this.anglet
        // console.log(1)
    },
});
