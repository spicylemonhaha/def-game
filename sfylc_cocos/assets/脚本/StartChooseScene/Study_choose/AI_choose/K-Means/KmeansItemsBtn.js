// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        statement:0,//颜色状态

    },

    // LIFE-CYCLE CALLBACKS:
    //获取加载文件中的图片资源数组
//获取已有隐藏飞船资源，响应按钮时，隐藏飞船显现并随手指移动飞船
    onLoad () {},

    start () {

    },
//时刻根据状态改变自身图片
    update (dt) {},
});
