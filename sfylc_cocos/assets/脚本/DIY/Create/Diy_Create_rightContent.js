
cc.Class({
    extends: cc.Component,

    properties: {
        DrawNode: cc.Node,
        DrawOutRect: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.SetContent();
        // this.OutRectSpr=this.DrawOutRect.getComponent(cc.Sprite).spriteFrame;
        // this.Reload();
    },
    SetContent(event,data){
        // console.log(event,data);
        switch(data){
            default:
            case "path"://grass,path,block,
                this.urls = [
                  "block",
                  "grass",
                  "grass1",
                  "rectpath",
                ];
                break;
            case "start"://songshu,man,robot?
                this.urls = [
                  "man",
                  "robot",
                  "songshu",
                ];
                break;
            case "shuzhuang"://shuzhuang,card
                this.urls = [
                  "bluebox",
                  "hole",
                  "redbox",
                  "shuzhuang",
                  "zhongdian",
                ];
                break;
            case "crystal"://flower,crystal,box
                this.urls = [
                  "box",
                  "crystal",
                  "flower",
                  "a1",
                  "b1",
                  "c1",
                  "d1",
                  "e1",
                  "f1",
                  "g1",
                  "h1",
                  "i1",
                ];
                break;
        }
        this.Reload();
    },
    Reload() {
        this.node.children.forEach(node=>{
            if (node)node.destroy();
        })
        this.node.height = 70;
        this.urls.forEach((_name) => {
            this.addContentByName(this.node, 70, 70, _name);
        })
    },
    addContentByName(_node, _w, _h, _sprname) {
        var _url;
        var self = this;
        var node = new cc.Node(_sprname);
        node.width = _w; node.height = _h; 
        var Scr = require("Scripts")
        Scr.addBySprName(node, _sprname);
        var button = node.addComponent(cc.Button);
        button.transition = cc.Button.Transition.COLOR;

        var clickEventHandler = new cc.Component.EventHandler();//获取事件句柄
        clickEventHandler.target = self.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "Diy_Create_rightContent";// 这个是代码文件名
        clickEventHandler.handler = "chooseBlock";
        clickEventHandler.customEventData = _sprname;
        button.clickEvents.push(clickEventHandler);

        node.parent = _node;
        this.node.height += 70 + 10;
        return node;
    },
    chooseBlock(event, _name) {
        // console.log(_name);
        this.DrawNode.drawSpr = _name;
    },
    PreView() {
        var _spr= this.DrawOutRect.getComponent(cc.Sprite);
        if (_spr.spriteFrame){
            this.OutRectSpr = _spr.spriteFrame;
            _spr.spriteFrame = null;
        } else {
            _spr.spriteFrame = this.OutRectSpr;
        }
    }
    // update (dt) {},
});
