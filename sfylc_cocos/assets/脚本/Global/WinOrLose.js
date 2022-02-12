// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    ISwin: false,
    ISlose: false,
    BackScene: "1",
    NextScene: "1",
    ThisScene: "1",
    win: {
      default: null,
      type: cc.Prefab,
    },
    lose: {
      default: null,
      type: cc.Prefab,
    },
    PVP_restart: {
      default: null,
      type: cc.Prefab,
    },
    PVP_settlement: {
      default: null,
      type: cc.Prefab,
    },
    player: {
      default: null,
      type: cc.Node
    }
  },
  Load() {
    //start();
    this.winorloseNode = null;
    window.DataBase = require("DataBase");
    window.PVP = require("PVP");
  },
  start() {
    window.DataBase = require("DataBase");
    window.PVP = require("PVP");
  },
  update(dt) {
    var scene = cc.director.getScene();
    if (this.winorloseNode == null && (this.ISwin || this.ISlose)) {
      if (this.ISwin) {
        console.log(this.win);

        if (window.DataBase.is_start_pvp) {
          this.winorloseNode = cc.instantiate(this.PVP_settlement);
          /* toscene = this.winorloseNode.children[1].children[0]._components[1].scene = this.ThisScene; */
        } else {
          this.winorloseNode = cc.instantiate(this.win);
          //console.log(node.children[0]);
          var toscene = this.winorloseNode.children[1].children[0]._components[1].scene = this.BackScene;
          console.log(this.BackScene);
          var toscene = this.winorloseNode.children[1].children[1]._components[1].scene = this.NextScene;
          var toscene = this.winorloseNode.children[1].children[2]._components[1].scene = this.ThisScene;
        }
      } else {
        console.log(this.lose);
        if (window.DataBase.is_start_pvp) {
          this.winorloseNode = cc.instantiate(this.PVP_restart);
          /* toscene = this.winorloseNode.children[1].children[0]._components[1].scene = this.ThisScene;	 */
        } else {
          this.winorloseNode = cc.instantiate(this.lose);
          //console.log(node.children[1].children[0]);
          var toscene = this.winorloseNode.children[1].children[0]._components[1].scene = this.BackScene;
          console.log(this.BackScene);
          //toscene = node.children[1].children[0]._components[1].scene = this.NextScene;
          var toscene = this.winorloseNode.children[1].children[1]._components[1].scene = this.ThisScene;
          //console.log(node.children[0]);
        }
      }
      this.winorloseNode.parent = this.node;
      if (this.winorloseNode.getChildByName("Background")) {
        var Background = this.winorloseNode.getChildByName("Background");
        if (Background.width < this.node.width) {
          Background.width = this.node.width;
          Background.height = this.node.height;
        }
      }
      //console.log(this.node.parent.width)
      //console.log(this.node.parent.height)
      this.winorloseNode.setPosition(0, 0);
      //关闭原来场景中人物的监听
      //console.log(this)
      this.player.active = false;
    }
  },
});
