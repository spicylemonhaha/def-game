var exports = {
    _Scripts:require("Scripts"),
    addByTexture(theNode, texture) {
        // console.log("MapDraw addByTexture");
        var _sprite = theNode.getComponent(cc.Sprite);
        if (!_sprite)
            _sprite = theNode.addComponent(cc.Sprite);
        var tSize = [theNode.width, theNode.height];
        theNode.width = texture.width; theNode.height = texture.height;
        _sprite.spriteFrame = new cc.SpriteFrame(texture);
        theNode.width = tSize[0]; theNode.height = tSize[1];
    },
    addBySprName(theNode, _name) {
        // console.log("MapDraw addBySprName");
        if (_name==null){
            var _sprite = theNode.getComponent(cc.Sprite);
            if (_sprite) _sprite.spriteFrame = null;
            return;
        }
        this.GetFromSpriteName(_name,function(texture){
            var _sprite = theNode.getComponent(cc.Sprite);
            if (!_sprite)
                _sprite = theNode.addComponent(cc.Sprite);
            var tSize = [theNode.width, theNode.height];
            theNode.width = texture.width; theNode.height = texture.height;
            _sprite.spriteFrame = new cc.SpriteFrame(texture);
            theNode.width = tSize[0]; theNode.height = tSize[1];
        })
    },
    pics:[
        "path3","path2",
        "diy_peach_path",
        "role",
        "diy_peach_qidian",
        "shuzhuang",
        "diy_peach_zhongdian",
        "diy_peach_food",
        "food2",
        "a1","b1","c1","d1","e1","f1","g1","h1",
        "food",
    ],
    GetUrl(_str){
        var s="http://47.98.36.113/others/sfylc_resource/draw/DIY/node/";
        return s+_str+".png";
    },
    GetFromSpriteName(_name,func,_end=".png"){
        var s="http://47.98.36.113/others/sfylc_resource/draw/DIY/node/";
        var url=s+_name+_end;
        url = this._Scripts.UrlToHTTPS(url);
        cc.assetManager.loadRemote(url,function(err,tex){
            if(err){console.log("err");return}
            func(tex);
        });
        return ;
    },
    GetSpriteFrame(ind, func) {
        var url = this._Scripts.UrlToHTTPS(this.GetUrl(this.pics[ind]));
        cc.assetManager.loadRemote(url,function(err,tex){
            if(err){console.log("err");return}
            func(tex);
        });
    },
    LoadAll(){
        this.pics.forEach(_str => {
            var url = this._Scripts.UrlToHTTPS(this.GetUrl(_str));
            cc.assetManager.loadRemote(this.GetUrl(url),function(err,tex){});
        });
    },
    InitializeMap(MapDatas, MapNode) {
        var X = MapDatas.X,
            Y = MapDatas.Y,
            wsize = MapDatas.node_size,
            hsize = MapDatas.node_size,
            text = MapDatas.map_data;
        wsize = MapNode.width / X;
        hsize = MapNode.height / Y;
        var MapInName = text.split("*");
        if (MapInName[0].length==0){
            MapInName.splice(0,1);
        }
        MapNode.theMapNode = new Array(new Array());//????????????
        var CanvasPosx = 0, CanvasPosy = 0;
        var ArrayPosx = 0,ArrayPosy = 0;
        
        for (var i = 0; i < MapInName.length; i++) {
            var nowSprName = MapInName[i];//?????????????????????
            var node = new cc.Node(nowSprName);//???????????????
            node.parent = MapNode;//??????????????????
            node.setPosition(CanvasPosx, CanvasPosy);//??????
            node.setAnchorPoint(0,0);
            node.width = wsize; node.height = hsize;//????????????
            if (nowSprName && nowSprName!="null")
                this.addBySprName(node,nowSprName);
            MapNode.theMapNode[ArrayPosy].push(node);

            CanvasPosx += wsize;//?????????z 
            ArrayPosx++;
            if (ArrayPosx >= X) {
                ArrayPosx = 0;
                ArrayPosy++;
                CanvasPosx = 0;
                CanvasPosy += hsize;
                MapNode.theMapNode.push(new Array());
            }
        }
        MapNode.theMapNode.pop();//?????????????????????


    }

};
module.exports = exports;