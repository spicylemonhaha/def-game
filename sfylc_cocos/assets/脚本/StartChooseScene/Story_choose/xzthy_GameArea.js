// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        player: cc.Node,//玩家
        theMap: cc.TextAsset,//地图txt文件
        
        TeleLabel: cc.Node,
        FoodNode: cc.Node
    },
    Init() {
        this.correctSequence= "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB";//正确顺序
        this.playerposx=0;
        this.playerposy=0;//玩家初始坐标（用于地图位置修正）
        this.TeleNum= 3;
        this.PathSize= 30;
        this.FoodWidth= 25;
        this.FoodHeight=25;
    },
    // onLoad () {},
    start() {
        this.Init();
        var self=this;
        self.Scr=require("Scripts");
        self.addBySprName=function(_node, _name){
            var url ="http://47.98.36.113/others/sfylc_resource/draw/StartChooseScene/Story_choose/xzthy/story_xzthy_"
            //gem_peach
            self.Scr.addByUrl(_node,url+_name+".png");
        }
        this.GameOver = false;
        this.theMapNode = new Array(new Array());//保存地图
        this.telequene = new Array();
        if (this.TeleLabel) { this.TeleLabel.getComponent(cc.Label).string = this.TeleNum; }
        this.nowSequence = "";
        var posx = 0, posy = 0;
        var move = this.player.getComponent("MapMove");
        console.log(this.player);
        
        var Ppos = [this.playerposx, this.playerposy];
        //计算初始地图坐标
        var stax = this.player.x - Ppos[0] * move.xmove, stay = this.player.y - Ppos[1] * move.ymove;
        var text = String(this.theMap.text);
        var node = new cc.Node("test");
        for (var i = 0; i < text.length; i++) {
            var nowchar = text[i];//处理与生成地图
            this.theMapNode[posy].push(new Array());//当前节点数组
            if (nowchar != ".") {
                if (nowchar != "\n") {
                    if (nowchar.charCodeAt(0) == 13) { continue; }//跳过\r
                    node = new cc.Node("block" + nowchar);//这些是方块
                    node.parent = this.node;//新建，设定父
                    node.setPosition(stax, stay);//坐标
                    node.thechar = "+";//保存一下当前字符吧
                    self.addBySprName(node,"floor_peach")
                    node.width = this.PathSize; node.height = this.PathSize;//设定宽高
                    this.theMapNode[posy][posx].push(node);
                    if (nowchar != "+") {//如果不是单纯的路径
                        node = cc.instantiate(this.FoodNode);//食物
                        node.parent = this.node;
                        node.setPosition(stax, stay);
                        var thenumber = nowchar.charCodeAt(0) - "A".charCodeAt(0);
                        node.thechar = thenumber;
                        self.addBySprName(node, "gem_peach")

                        node.width = this.FoodWidth; node.height = this.FoodHeight;//设定宽高
                        this.theMapNode[posy][posx].push(node);
                    }

                } else {
                    this.theMapNode.push(new Array(new Array()));//加一行
                    stax = this.player.x - (Ppos[0] + 1) * move.xmove;
                    stay -= move.ymove;//下一行
                    posx = -1; posy++;
                }
            }
            stax += move.xmove;//下一格
            posx++;
        }
        console.log(this.theMapNode)
        this.player.removeFromParent(false);
        this.node.addChild(this.player);//重新添加玩家，使玩家不会被之前添加的地图块覆盖
    },
    GetNode(x, y, type) {
        if (type == "path") {
            for (var i = 0; i < this.theMapNode[y][x].length; i++) {
                var node = this.theMapNode[y][x][i];
                if (cc.isValid(node) && node.thechar == "+") {
                    return node;
                }
            }
        } else if (type == "food") {
            for (var i = 0; i < this.theMapNode[y][x].length; i++) {
                var node = this.theMapNode[y][x][i];
                if (cc.isValid(node) && node.thechar != "+") {
                    return node;
                }
            }
        }
        return false;
    },
    DeleteNode(x, y, type) {
        var node = this.GetNode(x, y, type);
        if (node) node.destroy();
        return false;
    },
    SetTeleportor() {
        var self = this;
        var move = this.player.getComponent("MapMove");
        var thenumber = this.telequene.length;
        if (thenumber >= this.TeleNum) { return; }
        var node = new cc.Node("Tele");//传送点
        node.parent = this.node;//生成传送点图标
        node.setPosition(this.player.x, this.player.y);
        self.addBySprName(node, "tp2_peach")

        if (thenumber > 0) {
            this.telequene[thenumber - 1][4].width = this.PathSize;
            this.telequene[thenumber - 1][4].height = this.PathSize;
            self.addBySprName(this.telequene[thenumber - 1][4], "tp1_peach")
        }
        node.width = this.PathSize; node.height = this.PathSize;//设定宽高
        this.telequene.push(new Array(
            move.playerx, move.playery,
            this.player.x, this.player.y, node
        ));//加入队列
        if (this.TeleLabel) {
            this.TeleLabel.getComponent(cc.Label).string = this.TeleNum - this.telequene.length;
        }
        this.player.removeFromParent(false);
        this.node.addChild(this.player);//重新添加玩家，使玩家不会被之前添加的地图块覆盖
    },
    UseTeleportor() {
        var self = this;
        var move = this.player.getComponent("MapMove");
        var thenumber = this.telequene.length;
        if (thenumber <= 0) { return; }
        if (thenumber>1){
            self.addBySprName(this.telequene[thenumber - 1][4], "tp2_peach")
        }
        var thetele = this.telequene.pop()//(new Array(move.playerx, move.playery, node));
        this.DeleteNode(move.playerx, move.playery, "path");
        move.playerx = thetele[0];
        move.playery = thetele[1];
        this.player.x = thetele[2];
        this.player.y = thetele[3];
        if (this.TeleLabel) {
            this.TeleLabel.getComponent(cc.Label).string = this.TeleNum - this.telequene.length;
        }
        thetele[4].destroy();
    },
    PutFood() {
        var self = this;
        var move = this.player.getComponent("MapMove");
        var foodnode = this.GetNode(move.playerx, move.playery, "food");
        if (foodnode) {
            console.log(foodnode);
            var ind = this.nowSequence.length;
            this.nowSequence += String.fromCharCode(foodnode.thechar + 'A'.charCodeAt(0));
            console.log(this.nowSequence);
            foodnode.removeFromParent(false);
            foodnode.destroy();
            if (this.nowSequence.length == this.correctSequence.length) {
                if (this.nowSequence == this.correctSequence) {//Win
                    this.node.getComponent("WinOrLose").ISwin = true;
                    this.GameOver = true;
                } else {//Lose
                    this.node.getComponent("WinOrLose").ISlose = true;
                    this.GameOver = true;
                }
            }
        }

    },
    update(dt) {
        var self = this;
        // return ;
        var toward = [[1, 0], [0, 1], [-1, 0], [0, -1]];
        var move = this.player.getComponent("MapMove");
        // console.log(this.player);
        var flag = false;
        if (!this.GameOver) { this.PutFood() };
        if(this.telequene.length>0)flag=true;
        for (var i = 0; i < 4 && !flag; i++) {
            if (move.get(move.playerx + toward[i][0], move.playery + toward[i][1])) {
                flag = true;//没死路
            }
        }
        if (!flag && !this.GameOver) {//死路了
            this.node.getComponent("WinOrLose").ISlose = true;
            this.GameOver = true;
            console.log(this.node)
        }
    },
});