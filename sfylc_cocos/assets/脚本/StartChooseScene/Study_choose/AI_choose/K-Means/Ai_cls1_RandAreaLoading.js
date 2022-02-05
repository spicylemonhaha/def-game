
cc.Class({
    extends: cc.Component,

    properties: {
        FixPrefab:cc.Prefab,
        ShipPrefab:cc.Prefab,
        // FixpngUrl:"",
        // Fixpng:[cc.SpriteFrame],
        // ShippngUrl:"",
        // Shippng:[cc.SpriteFrame],
        maxx:cc.Integer,
        maxy:cc.Integer,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var BaseUrl = "https://www1.forwhat01.top/others/sfylc_resource/draw/StartChooseScene/Study_choose/";
        this.FixpngUrl = BaseUrl + "AiStudy_choose/AiKmeans/aikmeans_station_";
        this.ShippngUrl = BaseUrl +"AiStudy_choose/AiKmeans/aikmeans_user_";
        this.Scr=require("Scripts");
        let i;
        this.randfix = Math.floor(Math.random() * 100) % 3 + 3;
        this.randship = Math.floor(Math.random() * 100) % 3 + 8;
        this.shipstatement = new Array();
        this.fixstatement = new Array();
        this.ship = new Array()
        this.fix = new Array()
        for (i = 0; i < this.randfix; i ++ ) {
            this.fix[i] = cc.instantiate(this.FixPrefab)
            this.fix[i].parent = this.node
            this.fix[i].setPosition(Math.floor(Math.random() * 100000) % (this.maxx*100)*0.01, Math.floor(Math.random() * 100000) % (this.maxy*100)*0.01)
            this.fix[i].children[0].getComponent(cc.Label).string = i + 1;
            // this.fix[i].getComponent(cc.Sprite).spriteFrame = this.Fixpng[i];
            this.Scr.addByUrl(this.fix[i],this.FixpngUrl+i+".png");

        }

        for (i = 0; i < this.randship; i ++ ) {
            this.shipstatement[i] = 5; 
            this.ship[i] = cc.instantiate(this.ShipPrefab)
            this.ship[i].children[1].getComponent("Kmeans_ShipItemBtn").index = i;
            this.ship[i].parent = this.node
            this.ship[i].setPosition(Math.floor(Math.random() * 10000) % this.maxx, Math.floor(Math.random() * 10000) % this.maxy)
            this.ship[i].children[0].getComponent(cc.Label).string = i + 1;
            // this.ship[i].getComponent(cc.Sprite).spriteFrame = this.Shippng[5];
            this.Scr.addByUrl(this.ship[i], this.ShippngUrl + "e" + ".png");
            
            
        }
    },

    start () {

    },

    // update (dt) {},
});
