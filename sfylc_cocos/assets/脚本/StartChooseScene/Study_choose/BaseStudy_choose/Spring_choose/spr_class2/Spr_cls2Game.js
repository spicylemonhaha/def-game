// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,
    
    properties: {
        //Bins:[cc.Node],
        index:0,
        temp1:[cc.Integer],
        ans:0,
        player:cc.Node,
        // Red:cc.SpriteFrame
    },

    // LIFE-CYCLE CALLBACKS:
    
    onLoad () {



        var self=this;
        function loadImgByUrl( remoteUrl) {
            cc.assetManager.loadRemote(remoteUrl, function (err, texture) {
                if (err) {console.log("err "+remoteUrl);return;}
                self.Red = new cc.SpriteFrame(texture);
                var Bins = self.node.getComponent("Spr_clsGameLoading").Bins;
                require("Scripts").ChangeSizeByNode(
                    Bins[self.player.getComponent("Move").lrstate].node.parent,
                    self.Red
                )
            });
        }
        
        
        loadImgByUrl("https://www1.forwhat01.top/others/sfylc_resource/draw/General/sprcls2_boxred.png")
        

        this.index = 0,this.ans = 0
        var Move = this.node.children[1].getComponent("Move");
        var Bins = this.node.getComponent("Spr_clsGameLoading").Bins; 
        
        var i,j;
        for (i = 0; i < 8; i ++ ) {
            Bins[i] = Bins[i].getComponent(cc.Label)
            this.temp1[i] = Number(Bins[i].string);
        }
        
        //Bins[0].string = Bins[1].string
        i = 0;
        this.ans = new Array()
        while(i < this.temp1.length - 1){
            for (j = 0; j < this.temp1.length - i - 1; j ++ ) {
                if(this.temp1[j] > this.temp1[j + 1]){
                    var t = this.temp1[j]
                    this.temp1[j] = this.temp1[j + 1]
                    this.temp1[j + 1] = t 
                }
            }
            this.ans[i] = new Array()
            //存储答案数组
            for (j = 0; j < this.temp1.length; j ++ ) {
                this.ans[i][j] = this.temp1[j];
            }        
            i++;
        }
        

    },

    start () {
        
    },

    update(dt) {
        // console.log(this.node.getComponent("Spr_clsGameLoading"));
        var Bins = this.node.getComponent("Spr_clsGameLoading").Bins;
        
        //判断失败
        var Move = this.node.children[1].getComponent("Move");
        let wl = this.getComponent("WinOrLose");
        if(this.index == 7)
            wl.ISwin = true
        else if(Move.lrstate == this.temp1.length - this.index - 1){
            //console.log(this.index)
            var i;
            for (i = 0; i < this.temp1.length; i ++ ) {
                if(this.ans[this.index][i] != Number(Bins[i].string)) {
                    
                    wl.ISlose = true;
                }
            }
            Move.node.x -= Move.xmove * (this.temp1.length - this.index - 1);
            this.index ++
            
            //console.log(Bins[Move.lrstate].node.parent._components)
            if (!wl.ISlose)
                Bins[Move.lrstate].node.parent._components[0].spriteFrame = this.Red
            Move.lrstate = 0;
        }},
});
