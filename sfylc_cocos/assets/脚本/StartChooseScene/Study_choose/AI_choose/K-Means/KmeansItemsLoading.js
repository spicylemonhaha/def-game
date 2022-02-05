// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        statement:[cc.Integer],
        spriteframe:[cc.SpriteFrame],

    },

    // LIFE-CYCLE CALLBACKS:
//生成维修站数目以及飞船数目
//使用预置资源加载并记录飞船及维修站的坐标
//计算得出维修站的具体归属范围，并写成函数
//
    onLoad () {},

    start () {

    },

    // update (dt) {},
});
