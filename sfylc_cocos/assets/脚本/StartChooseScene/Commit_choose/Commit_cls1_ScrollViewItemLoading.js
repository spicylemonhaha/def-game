// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        count:0,
        Pre:cc.Prefab,
        front:[cc.Integer],
        after:[cc.Integer],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var i, j;
        //获取人数
        this.TopPlayerLoading = cc.find("Canvas/Game/escape_top_background").getComponent("Commit_cls1_TopLoading")
        
        this.playercount = this.TopPlayerLoading.playercount
        this.count = Math.floor(Math.random() * 100) % 5 + 8
        
        //生成答案
        j = 0
        this.TopPlayerLoading.answer = new Array()
        temp = new Array()
        for(i = 0; i <= this.playercount; i ++ )
            temp[i] = false
        while(j < this.playercount) {
            //随机第几个未放入的人为当前位置
            m = Math.floor(Math.random() * 100) % (this.playercount - j) + 1
            c = k = 1
            //放人，从1遍历，遍历至未放入次数为m，放入
            for (k = 1, c = 1; c <= m; k ++ ) {
                if (!temp[k]) {
                    c ++
                   
                } 
            }
            k--
            this.TopPlayerLoading.answer[j] = k 
            temp[k] = true
            j++
        }
        //循环生成数据
        i = 0
        while(i<this.count) {
            ra = Math.floor(Math.random() * 100) % (this.playercount - 1)
            rb = Math.floor(Math.random() * 100) % (this.playercount - ra - 1) + ra + 1

            this.front[i] = this.TopPlayerLoading.answer[ra]
            this.after[i] = this.TopPlayerLoading.answer[rb]
            for (k = 0; k <= i; k ++ ) {
                if (k != i && this.front[i] == this.front[k] && this.after[i] == this.after[k]) break;
            }
            if (k > i)
                i++      
        }
        //数据转为条件
        this.Text = new Array();
        for (i = 0; i < this.count; i ++ ) {
            this.Text[i] =  this.front[i].toString() + "号必须在" + this.after[i].toString() + "前面" 
        }
        cc.find("Canvas/Game/Task").active = false 
        


        this.node.height = 0
    },

    start() {
        var i, j;
        for (i = 0; i < this.count; i ++ ) {
            node = cc.instantiate(this .Pre);
            node.parent = this.node;
            this.node.height += (this.Pre.data.height + 10)
            this.node.parent.height = this.node.height
            node.children[1].getComponent(cc.Label).string = this.Text[i]; 
        }
    },

    // update (dt) {},
});
