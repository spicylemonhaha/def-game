
cc.Class({
    extends: cc.Component,

    properties: {
        MapItemPre:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        var self=this;
        this.WHEREstr=[];
        this.ReLoad();
    },
    ReLoad() {
        var self = this;
        var mysql = require("MySql_");
        var func = function (res) {
            self.MapDatasList = res;
            self.LoadMapDatasListDatas();
        }
        var twhere=" AND ",_sql="",start=true;
        this.WHEREstr.forEach(_str=>{
            if (_str.length>0){
                if (start) {
                    twhere += _str;
                } else {
                    twhere += " AND " +  _str ;
                }
                start=false;
            }
        })
        if (window.DataBase && window.DataBase.userstatus) {
            _sql = "SELECT * FROM map_cocos WHERE cre_user = '" + window.DataBase.userstatus.username+"'";
        } else {
            _sql = "SELECT * FROM map_cocos WHERE cre_user = " + "'123'"
        }
        if(this.WHEREstr.length>0){
            _sql+=twhere;
        }
        console.log(_sql);
        mysql.send(_sql, func);
    },
    LoadMapDatasListDatas(){

        var self = this;
        self.node.height = 200;
        self.node.children.forEach(node=>{
            node.destroy();
        })

        self.MapDatasList.forEach(MapDatas => {
            var ItemNode = cc.instantiate(self.MapItemPre);
            var Item = ItemNode.getComponent("MapItemScript");
            Item.MapDatas = MapDatas;
            Item.MapData = {
                "X": MapDatas.X,
                "Y": MapDatas.Y,
                "nodeSize": MapDatas.node_size,
                "baoshi_number": MapDatas.baoshi_number,
                "data": MapDatas.map_data,
                "type": MapDatas.map_node_data,
                "answer": MapDatas.ans,
            };
            Item.MapName = MapDatas.map_name;
            Item.Visit = MapDatas.visitor;
            Item.CreateTime = MapDatas.create_date.substr(0, 10);
            Item.Good = MapDatas.likes;
            Item.Save = MapDatas.collection;
            Item.MapType = MapDatas.Modn;
            Item.LoadDatas();
            ItemNode.parent = self.node;
            self.node.height += 200 + 10;
        });
    },
    SetWHERE(ind,_str){
        this.WHEREstr[ind]=_str;
        this.ReLoad();
    },
    SetStateWHERE(event, _str) {
        if (!_str){
            this.WHEREstr = [];
            this.ReLoad();
        } else {
            this.SetWHERE(0, "map_state = '" + _str+"'");
        }
    },
    SetTypeWHERE(event, _str) {
        this.SetWHERE(1, "Modn = '"+_str+"'");
    }

    // update (dt) {},
});
