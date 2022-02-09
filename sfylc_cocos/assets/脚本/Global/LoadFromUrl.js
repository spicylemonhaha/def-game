
module.exports = cc.Class({
    extends: cc.Component,

    properties: {
        Urls: [cc.String],//"http://47.98.36.113/others/sfylc_resource/draw/"
        SpriteNodes:[cc.Node],
        CallbackEvent: cc.Component.EventHandler,
        InChain:true,
    },
    onLoad() {
        if (!this.SpriteNodes) this.SpriteNodes = [];
        if (!this.Urls) this.Urls = [];
        var self = this;
        self.complete = 0;
        this.Scr = require("Scripts");
        console.log("Start Load");
        this.startTime=new Date();
        if (!this.InChain){
            for (var i = 0; i < self.Urls.length; i++) {
                var _url = self.Urls[i];
                var _node = self.SpriteNodes[i];
                var _i = i;//防止在回调时i已经改变
                self.LoadRemote(_url, _node, _i);
            }
        } else {
            self.LoadRemote_Chain();
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
            if (_node && _node.parent) self.addTexture(_node, texture)
            console.log((_node ? _node.name : "Pre") + " Loaded texture " + _url);
        });
    },
    LoadRemote_Chain(ind=0) {
        var self = this;
        if (ind >= self.Urls.length) {
            if (self.CallbackEvent)
                self.CallbackEvent.emit(); 
            // console.log("Load Complete in " + (new Date - this.startTime)/1000+"s");
            return;
        } 
        var _url = self.Urls[ind];
        _url = self.Scr.UrlToHTTPS(_url);
        cc.assetManager.loadRemote(_url, function (err, texture) {
            var _node = self.SpriteNodes[ind];
            if (err) { console.log("err " + (_node ? _node.name : "") + _url); self.LoadRemote_Chain(ind + 1);return; }
            if (_node) self.Scr.addtexture(_node, texture)
            // console.log((_node ? _node.name : "Pre") + " Loaded texture " + _url);
            self.LoadRemote_Chain(ind + 1);
            console.log(texture)  
        });
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