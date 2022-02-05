
cc.Class({
    extends: cc.Component,

    properties: {},
    start() {
        var self = this;
        this.Scr = require("Scripts");
        var url = "http://47.98.36.113/others/sfylc_resource/video/loading_ball.MP4";
        url = this.Scr.UrlToHTTPS(url);
        self.VP = this.node.getComponent(cc.VideoPlayer);
        cc.assetManager.loadRemote(url, function (err, clip) {
            if (cc.director.getScene().name != "FlashScreen") return;
            if (err) { console.log("err"); self.Loadscene();return; }
            self.VP.clip=clip;
            self.VP.mute=true;
            self.node.on("ready-to-play", self.vpPLAY, self);
        });

        self.scheduleOnce(function () {
            if (cc.director.getScene().name != "FlashScreen") return;
            console.log("force load scene");
            self.Loadscene();
        }, 3);

        var baseUrl = "http://47.98.36.113/others/sfylc_resource/"
        baseUrl = self.Scr.UrlToHTTPS(baseUrl);
        self.LoadUrl = require("LoadFromUrl").prototype;
        self.LoadUrl.Urls = [
            baseUrl + "draw/Menu/alply.png",
            baseUrl + "draw/StartChooseScene/alply_map_0.jpg",
        ]
        self.LoadUrl.CallbackEvent = new cc.Component.EventHandler();//获取事件句柄
        self.LoadUrl.CallbackEvent.target = self.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        self.LoadUrl.CallbackEvent.component = "FlashScreen";// 这个是代码文件名
        self.LoadUrl.CallbackEvent.handler = "Loadscene";
        // console.log(self.LoadUrl);
    },
    callback: function (videoplayer, eventType) {
        if (eventType == cc.VideoPlayer.EventType.COMPLETED) {
            videoplayer.play();
        }
    },
    Loadscene() {
        console.log("Loadscene Func");
        this.getComponent("ToSence").loadScene();
    },
    vpPLAY() {
        var self=this;
        self.LoadUrl.onLoad();
        self.VP.play();
    }
});
