// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        HelpSprUrl:"https://www1.forwhat01.top/others/sfylc_resource/draw/General/all_button.png",
        Width:800,
        Height:560,
    },

    start () {
        this.Scr=require("Scripts");
        this.HelpBackground = new cc.Node();//先弄一个 全屏Node 用Button覆盖住底下 点击后消失  灰色半透明
        this.HelpBackground.parent = this.node;

        this.HelpBackground.width = 960; this.HelpBackground.height=640;//全屏

        var EvHandler = new cc.Component.EventHandler();//Button覆盖
        EvHandler.target = this.node; 
        EvHandler.component = "Help";
        EvHandler.handler = "CloseHelp";//点击后消失
        var button = this.HelpBackground.addComponent(cc.Button);
        button.clickEvents.push(EvHandler);

        this.canvas = this.HelpBackground.addComponent(cc.Graphics);//绘制灰色半透明
        this.canvas.fillColor = new cc.Color(50, 50, 50, 200);
        this.canvas.rect(-960, -640, 960*2, 640*2);//多覆盖点，保险
        this.canvas.fill();

        this.HelpSpr=new cc.Node();
        this.HelpSpr.parent = this.HelpBackground;
        this.HelpSpr.width = this.Width;
        this.HelpSpr.height = this.Height;
        this.Scr.addByUrl(this.HelpSpr, this.HelpSprUrl);
    },
    CloseHelp(){
        this.HelpBackground.active=false;
    },
});
