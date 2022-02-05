// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({//给Class传一个匿名对象
    extends: cc.Component,//继承于cc.Component
    properties: {
        scene:"1",//跳转的场景
        // TheScene:cc.SceneAsset,
    },

    onLoad: function () {
        var clickEventHandler = new cc.Component.EventHandler();//获取事件句柄
        clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "ToSence";// 这个是代码文件名
        clickEventHandler.handler = "callback";
        clickEventHandler.customEventData = "foobar";
       
        var button = this.node.getComponent(cc.Button);
        if (button)
            button.clickEvents.push(clickEventHandler);
        
    },

    callback: function (event, customEventData) {
        if (this.TheScene) {
            cc.director.loadScene(this.TheScene._name);
        } else {
            cc.director.loadScene(this.scene);
        }
    },
    loadScene(){
        this.callback(null,null);
    }
	/* callback: function (event, customEventData,to_scence) {
	    cc.director.loadScene(to_scence);
	},
	loadScene(to_scence){
	    this.callback(null,null);
	} */
});//