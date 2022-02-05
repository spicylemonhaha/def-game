
cc.Class({
    extends: cc.Component,

    properties: {
        MapName:"新地图",
        Visit:0,
        Good:0,
        Save:0,

        MapType:"桃花源",
        MapMode:"深度遍历",
        CreateTime: "2021-04-21",

        MapPreViewN: cc.Node,

        MapNameN:cc.Node,
        VisitN:cc.Node,
        GoodN:cc.Node,
        SaveN:cc.Node,

        MapTypeN:cc.Node,
        MapModeN:cc.Node,
        CreateTimeN:cc.Node,

        EditButton:cc.Node,
        DeleteButton:cc.Node,
        PlayButton:cc.Node,
        UpLoadButton:cc.Node,
        
    },
    Init(){
        if(!this.init){
            this.init = true;
            this.Draw = require("MapDraw");
            this.mysql = require("MySql_");
        }
    },
    start() {
        this.Init();
        // EditButton:cc.Node,
        // DeleteButton:cc.Node,
        // PlayButton:cc.Node,
        // UpLoadButton:cc.Node,
    },
    LoadDatas() {
        this.Init();
        var SetString=this.SetString;
        //MapData:{},
        SetString(this.MapNameN,this.MapName);
        SetString(this.VisitN,"浏览量:"+this.Visit);
        SetString(this.GoodN,"点赞量:"+this.Good);
        SetString(this.SaveN,"收藏量:"+this.Save);
        SetString(this.MapTypeN,this.MapType);
        SetString(this.MapModeN,this.MapMode);
        SetString(this.CreateTimeN,this.CreateTime);
        this.Draw.InitializeMap(this.MapDatas, this.MapPreViewN);
        
    },
    SetString(_node,_str){
        _node.getComponent(cc.Label).string=_str;
    },
    Edit() {
        if (!window.DataBase) window.DataBase={};
        window.DataBase.NowMapDatas=this.MapDatas;
        cc.director.loadScene("Diy_Create");
        
    },
    Delete(){
        this.mysql.send("DELETE FROM map_cocos WHERE id = " + this.MapDatas.id,function(res){});
        this.node.parent.getComponent("LoadMapItem").ReLoad();
    },
    Play(){

    },
    UpLoad(){

    }



    // update (dt) {},
});
