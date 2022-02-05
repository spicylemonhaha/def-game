// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // ClassSprFr:[cc.SpriteFrame],
        ClassScene:[cc.SceneAsset],
        ClassButtn:[cc.Node],
    },

    start () {
        this.BaseUrl = "http://47.98.36.113/others/sfylc_resource/draw/StartChooseScene/Study_choose/BaseStudy_choose/";
        this.Urls=[
            "Autumn_choose/minefield_map_1first.png",
            "Autumn_choose/minefield_map_2middel.png",
            "Autumn_choose/minefield_map_3after.png",
            "Autumn_choose/minefield_map_4treedeep.png",
            "Autumn_choose/minefield_map_5treebreadth.png",
            "Autumn_choose/minefield_map_6treedeepplus.png",
        ]
        this.Scr = require("Scripts");
        this.PageNow=0
    },
    TurnPage_Right(){
        if (this.PageNow != 0)return;
        for (var i = 0; i < 3; i++) {
            var node = this.ClassButtn[i];
            // node.getComponent(cc.Sprite).spriteFrame = this.ClassSprFr[i + 3];
            this.Scr.addByUrl(node, this.BaseUrl + this.Urls[i + 3])
            node.getComponent("ToSence").scene = this.ClassScene[i + 3]._name;
        }
        this.PageNow = 1;
    },
    TurnPage_Left() {
        if (this.PageNow != 1) return;
        for (var i = 0; i < 3; i++) {
            var node = this.ClassButtn[i];
            // node.getComponent(cc.Sprite).spriteFrame = this.ClassSprFr[i];
            this.Scr.addByUrl(node, this.BaseUrl + this.Urls[i])
            node.getComponent("ToSence").scene = this.ClassScene[i]._name;
        }
        this.PageNow = 0;
    },
});
