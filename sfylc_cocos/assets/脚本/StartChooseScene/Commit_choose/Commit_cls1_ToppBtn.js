// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        //三种渲染图片
        Green:cc.SpriteFrame,
        Normal:cc.SpriteFrame,
        Blue:cc.SpriteFrame,
        statement:0,//渲染状态
        index:0,//当前索引
        NumberNode:cc.Node,
        CountNode:cc.Node,
        playercount:0,

    },

    // LIFE-CYCLE CALLBACKS:
    changeNumber(number) {
        this.NumberNode.getComponent(cc.Label).string = number
    },
    changeCount(count) {
        this.CountNode.getComponent(cc.Label).string = count
    },
    onLoad () {
        this.Scr=require("Scripts");
        this.Urls={
            Green:"https://www1.forwhat01.top/others/sfylc_resource/draw/StartChooseScene/Competition_choose/highlight2_person_escape.png",
            Normal:"https://www1.forwhat01.top/others/sfylc_resource/draw/blue_person.png",
            Blue:"https://www1.forwhat01.top/others/sfylc_resource/draw/StartChooseScene/Competition_choose/highlight_person_escape.png",
        }
        this.Top = this.node.parent
        this.ShowBtnNode = cc.find("Canvas/Game/Putout")
        this.ShowCode = this.ShowBtnNode.getComponent("Commit_cls1_Show")

        this.Scr.addByUrl(this.Top,this.Urls.Normal);
        // this.Top._components[0].spriteFrame = this.Normal

        var clickEventHandler = new cc.Component.EventHandler();//获取事件句柄
        clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "Commit_cls1_ToppBtn";// 这个是代码文件名
        clickEventHandler.handler = "callback";
        clickEventHandler.customEventData = "foobar";
        this.NodeParent = this.node.parent.parent;//存储父对象
        this.TopLoading = this.NodeParent.getComponent("Commit_cls1_TopLoading")//存储加载代码文件
        var button = this.node.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    },
    start () {
        
    
    },
    callback: function (event, customEventData) {
        var i, j;
        // console.log("finish")
        if(!this.TopLoading.IsMore){
            this.Scr.addByUrl(this.Top, this.Urls.Green);
            // this.Top._components[0].spriteFrame = this.Green
           
            for(i=0 ;i<this.TopLoading.statement.length;i++){
                if(this.TopLoading.statement[i] == 1)
                    this.TopLoading.statement[i] = 0
            }
            this.TopLoading.statement[this.index] = 1
            this.TopLoading.changestatement()
            
            
        }
        else {
            if (this.ShowCode.index != -1) {
                this.Scr.addByUrl(this.Top, this.Urls.Blue);
                // this.Top._components[0].spriteFrame = this.Blue
           
                for(i=0 ;i<this.TopLoading.statement.length;i++){
                    if(this.TopLoading.statement[i] == 2)
                        this.TopLoading.statement[i] = 0
                }
                this.TopLoading.statement[this.index] = 2
                this.TopLoading.changestatement()
            }
        }
        
    },
//20535197208
    start () {
        

    },

    update (dt) {
        if (this.statement == 0) {
            this.Scr.addByUrl(this.Top, this.Urls.Normal);
            // this.Top._components[0].spriteFrame = this.Normal
        }
        else if (this.statement == 1) {
            this.Scr.addByUrl(this.Top, this.Urls.Green);
            // this.Top._components[0].spriteFrame = this.Green
        }
        else if (this.statement == 2) {
            this.Scr.addByUrl(this.Top, this.Urls.Blue);
            // this.Top._components[0].spriteFrame = this.Blue
        }

    },
});
