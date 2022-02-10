// // Learn cc.Class:
// //  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// // Learn Attribute:
// //  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// // Learn life-cycle callbacks:
// //  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

// cc.Class({
//     extends: cc.Component,

//     properties: {},

//     // LIFE-CYCLE CALLBACKS:

//     // onLoad () {},

//     start () {
//         this.BaseUrl ="https://www1.forwhat01.top/others/sfylc_resource/draw/StartChooseScene/Story_choose/map/story_map_clsimg";
//         console.log();
//         var self=this;
//         this.clicked=false
//         cc.assetManager.loadRemote(this.BaseUrl + this.node.name[3] + "_d.png", function (err,texture) {
//             if(err){console.log("err");return;};
//             require("Scripts").addtexture(self.node,texture);
//         })

//         cc.director.getCollisionManager().enabled = true;
//         var canvas = cc.find("Canvas");//要生效就不能改Canvas的名。。
//         canvas.on(cc.Node.EventType.TOUCH_START, function (touch, event) {
//             let touchLoc = touch.getLocation();
//             if (cc.Intersection.pointInPolygon(touchLoc, this.node.getComponent(cc.Collider).world.points)) {
//                 this.clicked = true;
//             }
//         }, this);
//         var tcans = function (touch, event) {
//             if (!this.clicked) return;
//             this.node.opacity  = 255;
//             this.clicked = false;
//             this.node.getComponent("ToSence").loadScene();
//         }
//         canvas.on(cc.Node.EventType.TOUCH_END, tcans, this);
//         canvas.on(cc.Node.EventType.TOUCH_CANCEL, tcans, this);//进行点击监听

//     },
//     update(dt) {
//         // this.node.getComponent(cc.Sprite).spriteFrame = this.DownSpr;
//         if (this.clicked && this.node.opacity > 180) {
//             this.node.opacity -= 10;
//         }
//         if (!this.clicked && this.node.opacity < 255) {
//             this.node.opacity += 10;
//         }

//     },
// });
