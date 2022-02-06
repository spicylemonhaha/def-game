
module.exports = cc.Class({
  extends: cc.Component,

  properties: {
    Urls: [cc.String],//"http://47.98.36.113/others/sfylc_resource/draw/"
    SpriteNodes: [cc.Node],
    CallbackEvent: cc.Component.EventHandler,
    InChain: true,
  },
  onLoad() {
    if (!this.SpriteNodes) this.SpriteNodes = [];
    if (!this.Urls) this.Urls = [];
    var self = this;
    this.texture = [];
    // this.texture.errs = [];
    self.complete = 0;
    this.Scr = require("Scripts");
    console.log("Start Load");
    this.startTime = new Date();
    if (!this.InChain) {
      console.log('循环调用')
      for (var i = 0; i < self.Urls.length; i++) {
        var _url = self.Urls[i];
        var _node = self.SpriteNodes[i];
        var _i = i;//防止在回调时i已经改变
        self.LoadRemote(_url, _node, _i);
      }
    } else {
      console.log('链式调用')
      var p1 = new Promise((resolve, reject) => {self.LoadRemote_Chain(0, resolve); console.log(resolve);} );
      console.log('链式调用完毕')
      p1.then(function() {
        for (var i = 0; i < self.Urls.length; i++) {
          var _node = self.SpriteNodes[i];
          var _i = i;//防止在回调时i已经改变
          // self.LoadRemote(_url, _node, _i);
          console.log(self.texture)
          if (_node) {
            console.log(this.texture)
            self.Scr.addtexture(_node, self.texture[_i])
          }
        }
      })

    }
  },
  LoadRemote(_url, _node, _i) {
    var self = this;
    // console.log(_url);
    _url = this.Scr.UrlToHTTPS(_url);
    // console.log(_url);
    cc.assetManager.loadRemote(_url, function (err, texture) {
      self.complete += 1;
      if (self.complete >= self.Urls.length && self.CallbackEvent) {
        self.CallbackEvent.emit();
      }
      if (err) { console.log(err); return; }
      if (_node && _node.parent) self.Scr.addtexture(_node, texture)
      console.log((_node ? _node.name : "Pre") + " Loaded texture " + _url);
    });
  },
  LoadRemote_Chain(ind = 0, resolve) {
    var self = this;
    if (ind >= self.Urls.length) {
      if (self.CallbackEvent)
        self.CallbackEvent.emit();
      // console.log("Load Complete in " + (new Date - this.startTime)/1000+"s");
      resolve();
      return;
    }
    var _url = self.Urls[ind];
    _url = self.Scr.UrlToHTTPS(_url);
    cc.assetManager.loadRemote(_url, function (err, texture) {
      var _node = self.SpriteNodes[ind];
      if (err) { console.log("err " + (_node ? _node.name : "") + _url); self.texture.errs.push(ind); self.LoadRemote_Chain(ind + 1, resolve); return; }
      // if (_node) self.Scr.addtexture(_node, texture)
      self.texture[ind] = texture;
      self.LoadRemote_Chain(ind + 1, resolve);
    });
    //   cc.assetManager.loadRemote(_url, function (err, texture) {
    //     var _node = self.SpriteNodes[ind];
    //     if (err) { console.log("err " + (_node ? _node.name : "") + _url); self.texture.errs.push(ind); self.LoadRemote_Chain(ind + 1);return; }
    //     if (_node) self.Scr.addtexture(_node, texture)
    //     self.texture[ind] = texture;
    //     self.LoadRemote_Chain(ind + 1);
    // });

  },
});

// module.exports = 
/**
 *


            this.ImageLoader.imageLoadTool(_url, function (spriteFrame) {
                if (_node)this.addSpriteFrame(_node,spriteFrame);//如果_node为undefined说明应该进行预加载
                console.log("Loaded texture " + self.Urls[_i]);
            })
 */