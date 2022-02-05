// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        Abox:cc.Node,
        Bbox:cc.Node,
    },


    start() {
        var self=this;
        self.baseUrl = "http://47.98.36.113/others/sfylc_resource/video/DecisionTree/";
        var Scr=require("Scripts");
        self.baseUrl = Scr.UrlToHTTPS(self.baseUrl);
        self.page = 1; self.eated = false;
        self.videoSets = {}
        self.classSets = {}

        self.videoSets.end = function (ind) {
            if (ind < 0) { ind = Math.abs(100 + ind); }
            // console.log("end" + ind);
            return "end" + ind + ".mp4";
        }
        self.videoSets.page = function (ind) {
            // console.log("page" + ind);
            return "page" + ind + ".mp4";
        }
        self.classSets.PageSets = [
            1, 2, 3, 4, -1,//5
            6, -2,//7
            8, 9, 10, 11, -3,//12
            -4,//13
            -102,//14
            15, -5,//16
            17, 18, -102,//19
            20, 21, -101,
        ]
        self.classSets.nextPage = function () {
            if (self.page<0){return;}
            var tPage = self.classSets.PageSets[self.page];
            if (tPage < -100) {
                self.page = tPage;
                tPage += 100;
                tPage = Math.abs(tPage);
                return self.videoSets.end(tPage);
            } else {
                self.page = tPage;
                if (tPage < 0) return tPage;
                return self.videoSets.page(tPage);
            }
        }
        self.videoP={
            players: [
                self.node.getChildByName("MP0").getComponent(cc.VideoPlayer), 
                self.node.getChildByName("MP1").getComponent(cc.VideoPlayer)
            ],
            usePlayer:0,
            setClip: function (clip) { this.players[this.usePlayer].clip=clip;},
            play: function () { 
                this.players[1-this.usePlayer].stayOnBottom=true;
                this.players[this.usePlayer].stayOnBottom=false;
                this.players[this.usePlayer].play();
            },
            change: function () { this.usePlayer = 1 - this.usePlayer;},
            changeAndPlay:function(clip,delay=self.delaytime){
                var pthis=this;
                this.change();
                this.setClip(clip);
                self.scheduleOnce(function () {
                    self.videoE.spriteFrame = null;
                    self.Abox.parent.active = false;
                    self.Bbox.parent.active = false;
                    pthis.play();
                }, delay);
            },
            stayOnBottom: function () {
                this.players.forEach(i => { i.stayOnBottom=true;})
            }
        }
        // self.videoP = self.node.getComponent(cc.VideoPlayer);
        self.videoE = self.node.getComponent(cc.Sprite);
        console.log(self);
        self.Abox.parent.active = false;
        self.Bbox.parent.active = false;
        self.delaytime = 2;

        cc.assetManager.loadRemote(self.baseUrl + "page1.mp4", function (err, clip) {// nextPage
            if (err) { console.log("Load err"); return }
            // self.videoP.clip = clip;
            // self.videoP.play();

            self.videoP.changeAndPlay(clip,0);
            // self.videoP.players[0].clip=clip;
            // self.videoP.players[0].node.on("ready-to-play", function (event) {
            //     self.videoP.players[0].play();
            // });
        });

    },
    VideoCallback: function (videoplayer, eventType, customEventData) {
        var self = this;
        if (eventType == cc.VideoPlayer.EventType.COMPLETED) {
            var nextPage = self.classSets.nextPage();
            if (nextPage==undefined)return;
            if (nextPage < 0) {//检查是否已经显示按钮
                this.SelectionMenu();
            } else {
                var startTime=new Date();
                cc.assetManager.loadRemote(self.baseUrl + nextPage, function (err, clip) {
                // cc.resources.load("video/DecisionTree/" + nextPage, function (err, clip) {
                    if (err) { console.log("Load err"); return }
                    self.videoP.changeAndPlay(clip, Math.max(self.delaytime - (new Date() - startTime) / 1000, 0));
                    //计算过去的秒数与delaytime的差，作为播放的延迟
                });
            }
        }
    },
    SelectionMenu(nextPage) {
        var self = this;
        var Display = function (choice) {
            self.Abox.parent.active = true;
            self.Abox.getComponent(cc.Label).string = choice[0];
            self.Bbox.parent.active = true;
            self.Bbox.getComponent(cc.Label).string = choice[1];
        }
        var list=[4,6,11,0,15]
        var filename = "page" + list[Math.abs(self.page)-1] + "_p.jpg";
        cc.assetManager.loadRemote(self.baseUrl + filename, function (err, clip) {
            self.videoP.stayOnBottom();//
            if (err) { console.log("Img Load err -" + self.baseUrl + filename); return }
            switch (self.page) {
                case -1:Display(["按下", "不按"]); break;
                case -2:Display(["吃掉", "不吃"]); break;
                case -3:Display(["不带药剂", "带上药剂"]); break;
                case -4:Display(["按红按钮", "按绿按钮"]); break;
                case -5:self.SelectionMenuCallback(null, self.eated); break;
            }
            require("Scripts").addtexture(self.node, clip);
        });
    },
    SelectionMenuCallback(Event, is) {
        var self = this;
        is = Math.floor(is);
        if (is) {
            // console.log(is,self.page);
            switch (self.page) {
                case -1: self.page = 5; break;
                case -2: self.page = 7; self.eated = true; break;
                case -3: self.page = 12; break;
                case -4: self.page = 13; break;
                case -5: self.page = 16; break;
            }
        } else {
            switch (self.page) {
                case -1: self.page = -102; break;
                case -2: self.page = 7; self.eated = false; break;
                case -3: self.page = 19; break;
                case -4: self.page = 14; break;
                case -5: self.page = -101; break;
            }
        }
        if (self.page==undefined){console.log("page undefined???");return;}
        var nextpage;
        if (self.page < 0) {
            nextpage = self.videoSets.end(self.page);
        }else{
            nextpage = self.videoSets.page(self.page);
        }
        cc.assetManager.loadRemote(self.baseUrl + nextpage, function (err, clip) {
            if (err) { console.log("Select vP Load err -" + "video/DecisionTree/" + nextpage); return }
            // self.videoE.spriteFrame = null;
            // self.Abox.parent.active = false;
            // self.Bbox.parent.active = false;
            self.videoP.changeAndPlay(clip,1);
        });
    },

    
});
/*
1-2-3-4
Y-5 N-e2    //-1
5-6
Y-7(eated=1) N-7    //-2
7-8-9-10-11
    X-12    //-3
        red-13-e2   //-4
        green-14-15
            if(eated):  //-5
                16-17-18-e2
            else:
                e1
    posion
    19-20-21-e1
 */