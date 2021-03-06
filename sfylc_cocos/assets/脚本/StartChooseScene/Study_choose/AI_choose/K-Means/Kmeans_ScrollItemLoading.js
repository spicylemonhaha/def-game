// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        Item:cc.Prefab,
        CodeNode:cc.Node,
        ScrollView:cc.Node,
        TopNode:cc.Node,
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.TopCode = cc.find("Canvas/RandArea/Top").getComponent("Kmeans_TopLoading")
        this.Code = this.CodeNode.getComponent("Ai_cls1_RandAreaLoading");
        var i, j;
        this.item = new Array()
        this.node.height = 0;
        
        for (i = 0; i < this.Code.randship; i ++ ) {
            
            this.item[i] = cc.instantiate(this.Item);
            this.item[i].parent = this.node;
            
            this.node.height += (this.Item.data.height + 10)

            this.node.parent.height = this.node.height

        }
        
        this.answer = new Array();
        this.answerindex = new Array();

        this.ScrollView.active = false;
    },
    sure() {
        var i, j, co = 0;

        for (i = 0; i < this.Code.randship; i ++ ) {
            this.answer[i] = 10000000
            for (j = 0; j < this.Code.randfix; j ++ ){
                if(this.answer[i] > Math.floor(100 * Math.sqrt(Math.pow(Math.abs(this.Code.fix[j].x - this.Code.ship[i].x), 2) + Math.pow(Math.abs(this.Code.fix[j].y - this.Code.ship[i].y), 2))) / 100){
                    this.answer[i] = Math.floor(100 * Math.sqrt(Math.pow(Math.abs(this.Code.fix[j].x - this.Code.ship[i].x), 2) + Math.pow(Math.abs(this.Code.fix[j].y - this.Code.ship[i].y), 2))) / 100
                    
                    this.answerindex[i] = j
                }
            }
            
        }
        
    },
    judge(){
        var i,j,k;
        for (i = 0; i < this.Code.randship; i ++ ) {
            if(this.Code.shipstatement[i] == 5){
                console.log("?????????")
                break
            }
            if(this.answerindex[i] != this.Code.shipstatement[i]){
                console.log("lose" + i)
                break
            }
        }
        var newfix = new Array()
        if(i == this.Code.randship){//?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
            //??????????????????????????????????????????????????????????????????
            var count = 0,con = 0;
            for (k = 0; k < this.Code.randfix; k ++ ){
                con = 0;
                newfix[k] = {x:0,y:0}
                for(j = 0; j < this.Code.randship; j ++ ) {
                    if(this.Code.shipstatement[j] == k){
                        newfix[k].x+=this.Code.ship[j].x
                        newfix[k].y+=this.Code.ship[j].y
                        con++
                    }
                }
                if(con){
                    newfix[k].x/=con
                    newfix[k].y/=con
                    
                }
                else {
                    newfix[k].x = this.Code.fix[k].x;
                    newfix[k].y = this.Code.fix[k].y
                }
                if(newfix[k].x == this.Code.fix[k].x && newfix[k].y == this.Code.fix[k].y) {
                        count++
                    }
            }
            if(count == this.Code.randfix)
                console.log("win")
            else {//???????????????????????????????????????????????????????????????,???????????????
                this.TopCode.NaN()
                for (j = 0; j < this.Code.randship; j ++ ){
                    this.Code.shipstatement[j] = 5
                    this.Code.ship[j].getComponent(cc.Sprite).spriteFrame = this.Code.Shippng[5]
                }
                //??????
                for (k = 0; k < this.Code.randfix; k ++ ){
                    this.Code.fix[k].x = newfix[k].x
                    this.Code.fix[k].y = newfix[k].y
                }

                //?????????
                this.sure()

            }
        }
    },
    startbtn() {
        this.ScrollView.active = true;
        this.ScrollView.y = -22;
    },
    close() {
        // this.ScrollView.active = false;
        this.ScrollView.y = 640;

    },
    start () {

    },

    update (dt) {
        var i;
        for (i = 0; i < this.Code.randship; i ++ ){
            if (this.Code.shipstatement[i] < 5)
                this.item[i].children[1].getComponent(cc.Label).string = "??????: " + (i + 1) + "   ??????(" + this.Code.ship[i].x + "," + this.Code.ship[i].y + ")    ???????????????:" + (this.Code.shipstatement[i] + 1)
            else
                this.item[i].children[1].getComponent(cc.Label).string = "??????: " + (i + 1) + "   ??????(" + this.Code.ship[i].x + "," + this.Code.ship[i].y + ")    ???????????????:???"
            
        }
        
    },
});
