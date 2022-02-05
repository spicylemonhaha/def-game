// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        Draw:cc.Node,
        MapName:cc.Node,
        MapTeleNum:cc.Node,
        MapAns:cc.Node,
    },


    start() {
        this.drawCom = this.Draw.getComponent("Diy_Create_Draw");

    },
    Save(event,data){
        var mysql=require("MySql_");
        this.drawCom.MapDatas.map_name = this.SetNodeString(this.MapName, null);
        this.drawCom.MapDatas.baoshi_number = this.SetNodeString(this.MapTeleNum, null);
        this.drawCom.MapDatas.ans = this.SetNodeString(this.MapAns, null);

        this.drawCom.MapToString();
        var sql="INSERT INTO map_cocos(";
        for (var keys in this.drawCom.MapDatas){
            if (keys == "id" || keys == "create_date")continue;
            sql+=keys+",";
        } sql = sql.slice(0, sql.length - 1) + ") VALUES(";
        for (var keys in this.drawCom.MapDatas) {
            if (keys == "id" || keys == "create_date") continue;
            var nowstr = this.drawCom.MapDatas[keys];
            var need = (typeof nowstr) == "string"
            sql += (need ? "'" : "") + nowstr + (need ? "'" : "") +",";
        } sql = sql.slice(0, sql.length - 1) + ");";
        // console.log(sql);
        mysql.send(sql,function(res){console.log(res)});
        this.Hide();
    },
    SetNodeString(_node,str){
        if(str){
            _node.getComponent(cc.Label).string=str;
        }else{
            return _node.getComponent(cc.Label).string;
        }
    },
    Hide() {
        this.node.y = -640;
    },
    Show() {
        this.SetNodeString(this.MapAns, this.drawCom.MapDatas.ans);
        this.SetNodeString(this.MapTeleNum, this.drawCom.MapDatas.baoshi_number);
        this.node.y = 0;
    },
    chooseTree() {
        this.drawCom.MapDatas.Modn = "树";
        this.ModeHide();
    },
    chooseLabyrinth() {
        this.drawCom.MapDatas.Modn = "迷宫";
        this.ModeHide();
    },
    choosePeach() {
        this.drawCom.MapDatas.Modn = "桃花源";
        this.ModeHide();
    },
    ModeHide() {
        this.node.y = 640;
    },
    ModeShow() {
        this.node.y = 0;
    },

});
