// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    UserName: cc.Node,
    UserLevel: cc.Node,
    UserExp: cc.Node,
    UserAlgoCoin: cc.Node,
    UserDiamond: cc.Node,
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  
  start() {
    var setStr = require("Scripts").SetString;
    if (window.DataBase && false) {
      setStr(this.UserName, window.DataBase.userstatus.username);
      setStr(this.UserLevel, "Lv" + Math.floor(Math.random() * 1000));
      if (this.UserExp) this.UserExp.getComponent(cc.ProgressBar).progress = Math.random();
      setStr(this.UserAlgoCoin, Math.floor(Math.random() * 1000));
      setStr(this.UserDiamond, Math.floor(Math.random() * 1000));
    } else {
      setStr(this.UserName, "123");
      setStr(this.UserLevel, "Lv" + Math.floor(Math.random() * 1000));
      if (this.UserExp) this.UserExp.getComponent(cc.ProgressBar).progress = Math.random();
      setStr(this.UserAlgoCoin, Math.floor(Math.random() * 1000));
      setStr(this.UserDiamond, Math.floor(Math.random() * 1000));
    }

  },

  // update (dt) {},
});
