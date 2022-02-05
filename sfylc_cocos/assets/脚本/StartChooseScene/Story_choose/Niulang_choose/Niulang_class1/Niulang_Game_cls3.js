// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        Lplayer:cc.Node,
        Rplayer:cc.Node,
        Red:cc.SpriteFrame
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var self=this;
        function loadImgByUrl( remoteUrl,remoteUrl2,remoteUrl3, imageType) {
            if (!imageType) {
                imageType = "png";
            }
            cc.loader.load({
                url: remoteUrl,
                type: imageType
            }, function (err, texture) {
                if (err) { return; }
                self.Red = new cc.SpriteFrame(texture);
                var tSize = [self.Lplayer.width * 2, self.Lplayer.height];
                self.Red.width = tSize[0];self.Red.height = tSize[1]
            });
            cc.loader.load({
                url: remoteUrl2,
                type: imageType
            }, function (err, texture) {
                if (err) { return; }
                self.lnomal = new cc.SpriteFrame(texture);
                require("Scripts").ChangeSizeByNode(self.Lplayer, self.lnomal)
                // self.Lplayer..getComponent(cc.Sprite).spriteFrame = self.lnomal
            });
            cc.loader.load({
                url: remoteUrl3,
                type: imageType
            }, function (err, texture) {
                if (err) {return;}
                self.rnomal = new cc.SpriteFrame(texture);
                require("Scripts").ChangeSizeByNode(self.Rplayer, self.rnomal)
                // self.Rplayer.getComponent(cc.Sprite).spriteFrame = self.rnomal
            });
        }
        
        // return 
        loadImgByUrl(
            "https://www1.forwhat01.top/others/sfylc_resource/draw/StartChooseScene/Story_choose/nlzn/cls3/story_nlzn3_meet.png",
            "https://www1.forwhat01.top/others/sfylc_resource/draw/StartChooseScene/Story_choose/nlzn/cls3/story_nlzn3_man.png",
            "https://www1.forwhat01.top/others/sfylc_resource/draw/StartChooseScene/Story_choose/nlzn/cls3/story_nlzn3_woman.png",
            null
        )


// if(0)
        this.lMove = this.Lplayer.getComponent("Move1");//获取玩家节点中的move代码文件
        this.rMove = this.Rplayer.getComponent("Move")
        this.w = this.Lplayer.width
        console.log(self);

        
    },

    start () {

    },

    update (dt) {
        // return ;
        if(this.lMove.lrstate == this.rMove.lrstate) {
            if (this.Lplayer.getComponent(cc.Sprite).spriteFrame != this.Red) {
                this.SprRed();
            }
        } else {
            // this.SprNormal();
        }
    },
    SprNormal() {
        this.Lplayer.width = this.w
        this.Lplayer.getComponent(cc.Sprite).spriteFrame = this.lnomal
        this.Rplayer.getComponent(cc.Sprite).spriteFrame = this.rnomal
    },
    SprRed() {
        this.Lplayer.getComponent(cc.Sprite).spriteFrame = this.Red
        this.Rplayer.getComponent(cc.Sprite).spriteFrame = null
        this.Lplayer.width = 2 * this.w
    }
});
