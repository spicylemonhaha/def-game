
cc.Class({
    extends: cc.Component,

    properties: {
        username:cc.Node,
        password:cc.Node,
        tip:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.tip.parent.active=false;
        this.MySql = require("MySql_");
        window.DataBase = require("DataBase");
    },
    Login() {
        var self=this;//回调里this将会改变为http链接用Object
        this.password.parent.getComponent(cc.EditBox).inputFlag = cc.EditBox.InputFlag.DEFAULT;
        var userNameStr = this.username.getComponent(cc.Label).string;
        var passWordStr = this.password.getComponent(cc.Label).string;
        this.MySql.send("select * from users where username='" + userNameStr + "' AND password='" + passWordStr + "'",
            function (resultSet) {
                if(resultSet.length>0){
                    var me=resultSet[0];
                    window.DataBase.user_id = me.id;
                    window.DataBase.userstatus = me;
                    self.node.getComponent("ToSence").loadScene();
                }
            },
            function (err) {
                console.log(err);
            }
        );
        this.password.parent.getComponent(cc.EditBox).inputFlag = cc.EditBox.InputFlag.PASSWORD;
    },
    Regist() {

    },
    QQLogin(){

    },
    PhoneLogin(){

    }


});
