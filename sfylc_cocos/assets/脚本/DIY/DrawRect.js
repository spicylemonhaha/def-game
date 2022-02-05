// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {},

    start () {
    },
    update(dt){

        var x1 = 0, y1 = 0;
        var w = this.node.width,
            h = this.node.height;
        var Canvas = this.node.getComponent(cc.Graphics);
        if(!Canvas)Canvas = this.node.addComponent(cc.Graphics);
        Canvas.rect(x1, y1, w, h);
        Canvas.stroke();
    }

});
