// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        player:cc.Node,
        Red:cc.SpriteFrame
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var self=this;
        function loadImgByUrl( remoteUrl, imageType) {
            var Scr=require("Scripts");
            remoteUrl=Scr.UrlToHTTPS(remoteUrl);
            if (!imageType) {
                imageType = "png";
            }
            cc.loader.load({
                url: remoteUrl,
                type: imageType
            }, function (err, texture) {
                if (err) {
                    return;
                }
                self.Red = new cc.SpriteFrame(texture);
                require("Scripts").ChangeSizeByNode(self.node.parent.parent._components[1].Bins[self.player.getComponent("Move").lrstate]._parent,self.Red)
            });
        }
        
        
        loadImgByUrl("http://47.98.36.113//others/sfylc_resource/draw/General/sprcls2_boxred.png",null)
        
        var clickEventHandler = new cc.Component.EventHandler();//获取事件句柄
        clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "MakeSure";// 这个是代码文件名
        clickEventHandler.handler = "callback";
        clickEventHandler.customEventData = "foobar";
        var button = this.node.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    },
    callback: function (event, customEventData) {
        //
        this.backNode = cc.find("Canvas/Game");//全局从根节点寻找
        var GameCode = this.backNode._components[2]
        //console.log(this.player)
        var Bins = this.node.parent.parent._components[1].Bins;

        if(!GameCode.flag[this.player.getComponent("Move").lrstate] && Bins[this.player.getComponent("Move").lrstate]._parent._parent.active) {//并未变红
            GameCode.RedCount ++
            GameCode.flag[this.player.getComponent("Move").lrstate] = true;
            //
            Bins[this.player.getComponent("Move").lrstate]._parent._components[0].spriteFrame = this.Red

            //GameCode.Bins[0]._parent._components[0].spriteFrame = this.Red;
        }
        

    },

    start () {

    },

    // update (dt) {},
});
