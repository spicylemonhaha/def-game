
cc.Class({
    extends: cc.Component,

    properties: {
        LoginBox:cc.Node,
        username: cc.Node,
        password: cc.Node,
        tip: cc.Node,
    },
    start() {
        this.MySql = require("MySql_");
        this.active00=false;
    },
    RegistBegin() {
        this.node.y = 320;
        this.LoginBox.y = 320 + 640;
        this.active00 = true;
    },
    RegistStart() {
        var self = this;//回调里this将会改变为http链接用Object
        this.password.parent.getComponent(cc.EditBox).inputFlag = cc.EditBox.InputFlag.DEFAULT;
        var userNameStr = this.username.getComponent(cc.Label).string;
        var passWordStr = this.password.getComponent(cc.Label).string;
        this.MySql.send("INSERT INTO users(username,password) VALUE('" + userNameStr + "' , '" + passWordStr + "')",
            function (result) {
                if (result) {
                    self.RegistDone();
                    // self.node.getComponent("ToSence").loadScene();

                }
            }
        );
        this.password.parent.getComponent(cc.EditBox).inputFlag = cc.EditBox.InputFlag.PASSWORD;

    },
    RegistDone() {
        this.node.y = 320 + 640;
        this.LoginBox.y = 320;
        this.active00 = false;
    },
});
