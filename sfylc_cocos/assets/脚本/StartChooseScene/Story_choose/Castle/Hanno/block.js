cc.Class({
    extends: cc.Component,

    properties: {
      colorAtlas: cc.SpriteAtlas
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
      this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
      this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    },
    onDestory() {
      this.node.off('touchstart', this.onTouchStart, this)
      this.node.off('touchmove', this.onTouchMove, this)
      this.node.off('touchend', this.onTouchEnd, this)
    },
    init(blockIndex) {
      //放置精灵
      this.node.getComponent(cc.Sprite).spriteFrame = this.colorAtlas.getSpriteFrame(blockIndex);
      //给节点设宽度
      this.node.width = 80 + blockIndex * 40;
    },
    onTouchStart(e) {
      this.startPos = this.node.position;
    },
    onTouchMove(e) {
      let delta = e.getDelta();
      this.node.x += delta.x;
      this.node.y += delta.y;
    },
    onTouchEnd(e) {
      console.log('结束')
      let canPlace = window.game.placeBlock(this.node);    
      if(!canPlace) {
        this.node.position = this.startPos;
      }
      console.log(canPlace);
    },
    start () {

    },

    // update (dt) {},
});
