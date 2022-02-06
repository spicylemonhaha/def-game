var exports={
    UrlToHTTPS(_url){
        _url = _url.replace("http://", "https://");
        _url = _url.replace("47.98.36.113", "www.defgame.xyz");
        _url = _url.replace("www1.forwhat01.top", "www.defgame.xyz");
        return _url;
    },
    addtexture(_node, texture) {
        // console.log(texture)
        var _sprite = _node.getComponent(cc.Sprite);
        if (!_sprite)
            _sprite = _node.addComponent(cc.Sprite);
        var tSize = [_node.width, _node.height];
        // _node.width = texture.width; _node.height = texture.height;
        _sprite.spriteFrame = new cc.SpriteFrame(texture);
        _node.width = tSize[0]; 
        _node.height = tSize[1];
    },
    addBySprName(_node, _name) {
        var self=this;
        if (_name == null) {
            var _sprite = _node.getComponent(cc.Sprite);
            if (_sprite) _sprite.spriteFrame = null;
            return;
        }
        this.GetFromSpriteName(_name, function (texture) {
            self.addtexture(_node,texture);
        });
    },
    addByUrl(_node, _url){
        var self=this;
        _url=self.UrlToHTTPS(_url);
        cc.assetManager.loadRemote(_url, function (err, tex) {
            if (err) { console.log("err"); return }
            self.addtexture(_node,tex);
        });
    },
    GetFromSpriteName(_name, func, _end = ".png") {
        var self = this;
        var s = "http://47.98.36.113/others/sfylc_resource/draw/DIY/node/";
        var url = s + _name + _end;
        url = self.UrlToHTTPS(url);
        cc.assetManager.loadRemote(url, function (err, tex) {
            if (err) { console.log("err"); return; }
            func(tex);
        });
        return;
    },
    SetString(_node, _str) {
        var self = this;
        if (_node && _node.getComponent(cc.Label)){
            if (_str)_node.getComponent(cc.Label).string = _str;
            else return _node.getComponent(cc.Label).string;
        }
    },
    ChangeSizeByNode(theNode, spfra) {
        var self = this;
        console.log(spfra)
        var tSize = [theNode.width, theNode.height];
        spfra.width = tSize[0]
        spfra.height = tSize[1]

        
    },

};
module.exports = exports;