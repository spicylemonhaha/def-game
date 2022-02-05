/*  
*/
cc.Class({
    extends: cc.Component,

    properties: {},

    // onLoad () {},

    start () {
        this.MapData={};
        this.Draw=require("MapDraw");
        if (!(window.DataBase && window.DataBase.NowMapDatas)) {
            this.MapDatas = JSON.parse('{"X":20,"Y":20,"Modn":"桃花源","map_state":"未上传","ans":"abcdefg"}')
            this.MapDatas.map_data = "";
            if (window.DataBase)
                this.MapDatas.cre_user = window.DataBase.userstatus.username;
            else
                this.MapDatas.cre_user = "123";
            this.MapDatas.ans = "abcdefg";
            this.MapDatas.baoshi_number = 2;
            for (var i = 0; i < this.MapDatas.X * this.MapDatas.Y; i++) {
                this.MapDatas.map_data += "*null"
            }
            this.MapDatas.map_name = "新地图";
        }else{
            this.MapDatas = window.DataBase.NowMapDatas;
        }
        this.node.drawSpr = "grass";
        this.Draw.InitializeMap(this.MapDatas, this.node);
        console.log(this.node);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchMove, this);
    },
    GetNode(x, y) {
        var node = this.node;
        if (node.theMapNode[y])
            return node.theMapNode[y][x];
    },
    SetNode(x, y, name) {
        var _node = this.GetNode(x, y);
        if(_node){
            _node.name = String(name);
            this.Draw.addBySprName(_node,name);
        }
    },
    onTouchMove(event) {
        var touches = event.getTouches();
        var Pos = this.node.convertToNodeSpaceAR(touches[0].getLocation()); //获取触摸结束之后的坐标
        // var pos=[Pos.x,Pos.y];
        var wsize = this.GetNode(0, 0).width, hsize = this.GetNode(0, 0).height;
        var chooseNodeArrayx = Math.floor(Pos.x / wsize),
            chooseNodeArrayy = Math.floor(Pos.y / hsize);
        // var _node = this.GetNode(chooseNodeArrayx, chooseNodeArrayy);
        this.SetNode(chooseNodeArrayx, chooseNodeArrayy, this.node.drawSpr)
    },
    setDrawSprToNull(){
        this.node.drawSpr=null;
    },
    clearMap() {
        // console.log(this.node.theMapNode);
        this.node.theMapNode.forEach(iarray => {
            iarray.forEach(node=>{
                var _spr = node.getComponent(cc.Sprite);
                if(_spr)_spr.spriteFrame=null;
                node.name="null";
            })
        });
    },
    MapToString(){
        var res="";
        this.node.theMapNode.forEach(iarray => {
            iarray.forEach(node => {
                res += "*" + node.name;
            })
        });
        this.MapDatas.map_data=res;
        return res;
    }

    // update (dt) {},
});
