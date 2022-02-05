// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        correctSequence: "ABCDEFGH",//正确顺序
        playerposx: 4,
        playerposy: 0,//玩家初始坐标（用于地图位置修正）
        player: cc.Node,//玩家
        theMap: cc.TextAsset,//地图txt文件
        // pathSpr: cc.SpriteFrame,//路径图片
        // pathSprUrl: cc.String,//路径图片
        // foodSpr: [cc.SpriteFrame],//每种食物的图片
        // teleSpr: [cc.SpriteFrame],
        // foodSprUrl: [cc.String],//每种食物的图片
        // teleSprUrl: [cc.String],
        TeleNum: 2,
        TeleLabel: cc.Node,
        thebox: cc.Node,
        PathSize: 70,
        FoodWidth: 50,
        FoodHeight: 70,
        FoodBoxwidth: 35,
        FoodBoxheight: 50,
    },
    UrlSet() {
        this.SprLoader = require("MapDraw");
        this.foodSprUrl = ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", "i1"];
        this.TeleSprUrl = ["spraut_hole1", "spraut_hole2", "spraut_hole2"];
                // box ="http://47.98.36.113/others/sfylc_resource/draw/DIY/node/box.png"; addBySprName box
        // pathSprUrl = "http://47.98.36.113/others/sfylc_resource/draw/DIY/node/block.png"; addBySprName block        
    },
    // onLoad () {},
    start() {
        this.UrlSet();
        this.GameOver = false;
        this.theMapNode=new Array(new Array());//保存地图
        this.telequene = new Array();
        if (this.TeleLabel) { this.TeleLabel.getComponent(cc.Label).string = this.TeleNum; }
        this.nowSequence="";
        var posx = 0, posy = 0;
        var move = this.player.getComponent("MapMove");
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
                    // component = node.addComponent(cc.Sprite);
                    // component.spriteFrame = this.pathSpr;//添加图片
                    node.width = this.PathSize; node.height = this.PathSize;//设定宽高
                    this.SprLoader.addBySprName(node,"block");

                    this.theMapNode[posy][posx].push(node);
                    if (nowchar != "+") {//如果不是单纯的路径
                        node = new cc.Node("food" + nowchar);//食物
                        node.parent = this.node;
                        node.setPosition(stax, stay);
                        var thenumber = nowchar.charCodeAt(0) - "A".charCodeAt(0);
                        node.thechar = thenumber;
                        // component = node.addComponent(cc.Sprite);
                        // component.spriteFrame = this.foodSpr[thenumber];
                        node.width = this.FoodWidth; node.height = this.FoodHeight;//设定宽高
                        this.SprLoader.addBySprName(node, this.foodSprUrl[thenumber]);

                        this.theMapNode[posy][posx].push(node);
                    }
                    
                } else {
                    this.theMapNode.push(new Array(new Array()));//加一行
                    stax = this.player.x - (Ppos[0]+1) * move.xmove;
                    stay -= move.ymove;//下一行
                    posx = -1; posy ++ ;
                }
            }
            stax += move.xmove;//下一格
            posx ++;
        }
        console.log(this.theMapNode)
        if (this.thebox) {
            //创建下方装矿物的一列盒子
            this.SprLoader.addBySprName(this.thebox, "box");
            this.boxes = new Array(this.thebox);
            for (var i = 1; i < this.correctSequence.length; i++) {
                var node = cc.instantiate(this.thebox);//盒子
                this.SprLoader.addBySprName(node, "box");
                node.parent = this.node;//新建，设定父
                node.setPosition(this.thebox.x + i * (this.thebox.width * 1.1), this.thebox.y);//坐标
                this.boxes.push(node);//记录
            }
        }
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
        if(node)node.destroy();
        return false;
    },
    SetTeleportor() {
        var move = this.player.getComponent("MapMove");
        var thenumber = this.telequene.length;
        if (thenumber >= this.TeleNum){return;}
        var node = new cc.Node("Tele");//传送点
        node.parent = this.node;//生成传送点图标
        node.setPosition(this.player.x, this.player.y);
        // component = node.addComponent(cc.Sprite);
        // component.spriteFrame = this.teleSpr[thenumber];
        node.width = this.PathSize; node.height = this.PathSize;//设定宽高
        this.SprLoader.addBySprName(node, this.TeleSprUrl[thenumber]);
        this.telequene.push(new Array(
            move.playerx, move.playery , 
            this.player.x, this.player.y, node
        ));//加入队列
        if (this.TeleLabel){
            this.TeleLabel.getComponent(cc.Label).string = this.TeleNum - this.telequene.length;
        }
        this.player.removeFromParent(false);
        this.node.addChild(this.player);//重新添加玩家，使玩家不会被之前添加的地图块覆盖
    },
    UseTeleportor() { 
        var move = this.player.getComponent("MapMove");
        var thenumber = this.telequene.length;
        if (thenumber <= 0) { return; }
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
        var move = this.player.getComponent("MapMove");
        var foodnode = this.GetNode(move.playerx, move.playery, "food");
        if (foodnode) {
            // console.log(foodnode);
            var ind = this.nowSequence.length;
            this.nowSequence += String.fromCharCode(foodnode.thechar+'A'.charCodeAt(0));
            foodnode.x = this.boxes[ind].x;
            foodnode.y = this.boxes[ind].y;
            foodnode.width = this.FoodBoxwidth;
            foodnode.height = this.FoodBoxheight;
            // console.log(this.nowSequence);
            foodnode.removeFromParent(false);
            this.node.addChild(foodnode);//重新添加food使不会被覆盖
            if (this.nowSequence.length==this.correctSequence.length){
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
        
        var toward = [[1, 0], [0, 1], [-1, 0], [0, -1]];
        var move = this.player.getComponent("MapMove");
        var flag = false;
        if (this.telequene.length > 0) flag = true;
        for (var i = 0; i < 4 && !flag; i++) {
            if (move.get(move.playerx + toward[i][0], move.playery + toward[i][1])) {
                flag = true;//没死路
            }
        }
        var foodnode = this.GetNode(move.playerx, move.playery, "food");
        if (!foodnode && !flag && !this.GameOver) {//死路了
            this.node.getComponent("WinOrLose").ISlose = true;
            this.GameOver = true;
            // console.log(this.node)
        }
    },
});