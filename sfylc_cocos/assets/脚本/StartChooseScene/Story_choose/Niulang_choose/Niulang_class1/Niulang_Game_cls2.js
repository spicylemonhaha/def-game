// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        play:cc.Node,
        // Red:cc.SpriteFrame,
        // Green:cc.SpriteFrame,
        Bins:[cc.Node],
        Words:[cc.Integer],
        BlackNode:cc.Node,
        // Black:cc.SpriteFrame,
        // BlackLighting:cc.SpriteFrame,
        IsBlackLighting:cc.Boolean,
        Count:cc.Node,
        Label1:cc.Node,
        Label2:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        var self=this;
        function loadImgByUrl( remoteUrl, imageType) {
            var ChangeSizeByNode = require("Scripts").ChangeSizeByNode, _p = self.Bins[0]._parent;
            imageType = "png";var ind=0;
            cc.assetManager.loadRemote(remoteUrl[ind], function (err, texture) {
                if (err) {return;}
                self.Red = new cc.SpriteFrame(texture);
                ChangeSizeByNode(_p, self.Red)
                // self.mark()
            }); ind++;
            cc.assetManager.loadRemote(remoteUrl[ind], function (err, texture) {
                if (err) { return; }
                self.Green = new cc.SpriteFrame(texture);
                ChangeSizeByNode(_p, self.Green)
                // self.mark()
            }); ind++;
            cc.assetManager.loadRemote(remoteUrl[ind], function (err, texture) {
                if (err) { return; }
                self.Blue = new cc.SpriteFrame(texture);
                ChangeSizeByNode(_p, self.Blue)
                // self.mark()
            }); ind++;
            cc.assetManager.loadRemote(remoteUrl[ind], function (err, texture) {
                if (err) { return; }
                self.Black = new cc.SpriteFrame(texture);
                ChangeSizeByNode(_p, self.Black)
                self.mark()
            }); ind++;
            cc.assetManager.loadRemote(remoteUrl[ind], function (err, texture) {
                if (err) { return; }
                self.BlackLighting = new cc.SpriteFrame(texture);
                ChangeSizeByNode(_p,self.BlackLighting)
            }); ind++;
        }
        var Urls=[
            "https://www1.forwhat01.top/others/sfylc_resource/draw/StartChooseScene/Story_choose/nlzn/square_d.png", 
            "https://www1.forwhat01.top/others/sfylc_resource/draw/StartChooseScene/Story_choose/nlzn/square_e.png", 
            "https://www1.forwhat01.top/others/sfylc_resource/draw/StartChooseScene/Story_choose/nlzn/square_c.png", 
            "https://www1.forwhat01.top/others/sfylc_resource/draw/StartChooseScene/Story_choose/nlzn/cls2/story_nlzn2_left2.png", 
            "https://www1.forwhat01.top/others/sfylc_resource/draw/StartChooseScene/Story_choose/nlzn/cls2/story_nlzn2_right2.png"
        ]
        
        loadImgByUrl(Urls,null)
        

        this.Move = this.play.getComponent("Move")
        this.Blue = this.Bins[0]._parent._components[0].spriteFrame
        for (i = 0; i < this.Bins.length; i ++ ) {//获取初始文字
            this.Words[i] = Number(this.Bins[i].getComponent(cc.Label).string);
        }
        this.wl = this.getComponent("WinOrLose")
        console.log(this.wl)
        this.flag = new Array();
        for(var i=0;i<7;i++)this.flag.push(false);
        
        this.node.parent.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
        this.node.parent.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        this.node.parent.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchEnd,this);
    },
    onTouchStart(event) {
        var touches = event.getTouches();
        var oldPos = this.node.parent.convertToNodeSpaceAR(touches[0].getStartLocation());
        this.oldx = oldPos.x;
        this.oldy = oldPos.y;
    },
    cancel() {
        var i;
        for (i = 0; i < 7 && this.flag; i ++ ) {
            if (this.flag[i]) {
                this.Bins[i]._parent._components[0].spriteFrame = this.Blue
                this.flag[i] = false
            }
        }
    },
    
    mark() {
        var i;
        this.Words.sort(function(a,b) {
            return a-b;
        })
        for (i = 0; i < this.Words.length; i ++) {
            this.Bins[i]._parent._components[0].spriteFrame = this.Blue
        }
        for (i = 0; i < this.Words.length && this.Words[i] == Number(this.Bins[i].getComponent(cc.Label).string); i ++) {
            this.Bins[i]._parent._components[0].spriteFrame = this.Green
        }
        if(i == this.Words.length){ 
            this.BlackNode._components[0].spriteFrame = this.BlackLighting
            this.IsBlackLighting = true
        }else {
            this.BlackNode._components[0].spriteFrame = this.Black
        }
        
        for (i = this.Words.length - 1; i >= 0 && this.Words[i] == Number(this.Bins[i].getComponent(cc.Label).string); i -- ) {
            this.Bins[i]._parent._components[0].spriteFrame = this.Green
        }
        // if(i == this.Words.length) this.BlackNode.getComponent(cc.SpriteFrame) = this.BlackLighting
        // else this.BlackNode.getComponent(cc.SpriteFrame) = this.Black
        
    },
    
    
    onTouchEnd (event) {
        var touches = event.getTouches();
        this.newPos = this.node.parent.convertToNodeSpaceAR(touches[0].getLocation()); //获取触摸结束之后的坐标；
        
        this.newy = this.newPos.y
        this.newx = this.newPos.x;
        if (this.newx - this.oldx > 80 || this.oldx - this.newx > 80) {            
        
            this.cancel()
            this.mark()
               
        }else if(this.newy - this.oldy > 80) {//向上移动
            
            this.cancel()
            this.mark()
            if(this.Move.lrstate >= 2 && this.Move.lrstate <= 7 && this.Move.udstate == -2) {
                //高亮，并标记
                this.flag[this.Move.lrstate - 1] = true
                this.flag[this.Move.lrstate - 2] = true
            }
        }else if(this.oldy - this.newy > 80) {//向下移动
            this.cancel()
            this.mark()
            if(this.Move.lrstate >= 1 && this.Move.lrstate <= 6 && this.Move.udstate == 0) {
                //高亮，并标记
                this.flag[this.Move.lrstate - 1] = true
                this.flag[this.Move.lrstate ] = true
                
            }
        }
        if(this.Move.lrstate == 0 && this.Move.udstate == 0 && this.newx - this.oldx > 80) {
            this.Count.getComponent(cc.Label).string = Number(this.Count.getComponent(cc.Label).string) + 1;
        }
        
    },
    onTouchCancel: function (event) {
        this.onTouchEnd(event)
    },

    start () {

    },

    update (dt) {
        var i;
        for (i = 0; i < 7 && this.flag; i ++ ) {
            if(this.flag[i])
                this.Bins[i]._parent._components[0].spriteFrame = this.Red
            
        }
        if(this.Move.lrstate == 0 || this.Move.lrstate == 8) {
            
            if(this.Move.udstate == 0 || this.Move.udstate == -2){
                if(this.Move.udstate == -2)
                this.Move.dir[2] = true
                else
                this.Move.dir[2] = false
                this.Move.dir[0] = true
                this.Move.dir[1] = true
                if(this.Move.udstate == 0)
                this.Move.dir[3] = true
                else
                this.Move.dir[3] = false
            }
            else {
                this.Move.dir[0] = true
                this.Move.dir[1] = true
                this.Move.dir[2] = false
                this.Move.dir[3] = false
            }
        }
        if (this.Move.udstate == -2 && this.Move.lrstate >= 1 && this.Move.lrstate <= 7) {
            
            this.Move.dir[2] = true
            this.Move.dir[0] = false
            this.Move.dir[1] = false
            this.Move.dir[3] = false
        }
        if (this.Move.udstate == 0 && this.Move.lrstate >= 1 && this.Move.lrstate <= 7) {
            
            this.Move.dir[3] = true
            this.Move.dir[0] = false
            this.Move.dir[1] = false
            this.Move.dir[2] = false

        }
        if(this.Count.getComponent(cc.Label).string == '0') {
            this.Label1.active = false
            this.Label2.active = false
            this.Count.active = false
        }
        else {
            this.Label1.active = true
            this.Label2.active = true
            this.Count.active = true
        }
        if(this.Move.udstate == -2 && this.Move.lrstate == 0 && this.IsBlackLighting) {
            this.wl.ISwin = true
        } 
    },
});
