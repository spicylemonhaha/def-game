// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        firstx:-385,
        firsty:-46,
        Count:[cc.Integer],
        Number:[cc.Integer],
        PrefabPlay:cc.Prefab,
        playercount:0,
        movex:120,
        top:cc.Node,
        AddNode:cc.Node,

        

    },
    addBottom() {
		var i = 0, j;
		for (j = 0; j < this.Top.playercount; j++)
			this.Node[j].active = false
		for (j = 1; j <= this.Top.playercount; j++) {
			if (this.AddNode.getComponent("Commit_cls1_Add").before[this.ShowCode.number][j]) {
				this.Node[i].active = true
				this.Node[i].children[0].children[0].getComponent(cc.Label).string = j
				i++
			}
		}
		for (j = 0; j < this.Top.playercount; j++)
			if (this.Top.Number[j] == this.ShowCode.number)
				this.playercount = this.Top.Count[j] = i;
    },
    onLoad () {
        this.firstx = -380
        this.firsty = -46
        this.Top = this.top.getComponent("Commit_cls1_TopLoading")
        this.ShowBtnNode = cc.find("Canvas/Game/Putout")
        this.Node = new Array()
        this.ShowCode = this.ShowBtnNode.getComponent("Commit_cls1_Show")
        this.Add = this.addBottom
        var i = 0,j;
        for (j = 0; j < this.Top.playercount; j ++ ) {
			this.Node[j] = cc.instantiate(this.PrefabPlay)
			this.Node[j].parent = this.node
			this.Node[j].setPosition(this.firstx + this.movex * j, this.firsty)
			this.Node[j].children[0].children[0].getComponent(cc.Label).string = j
			this.Node[j].active = false
			i++;
		}
        
            //寻找true值，并加载序号
        
      
    },
    

    start () {

    },

    // update (dt) {},
});