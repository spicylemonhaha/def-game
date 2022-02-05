// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
		label_rank_score: {
		            default: null,
		            type: cc.Label,
					serializable: true,
		}
    },

    // LIFE-CYCLE CALLBACKS:

    // 

    start() {
    },
	onLoad () {
		this.MySql = require("MySql_");
		window.DataBase = require("DataBase");
		console.log("onLoad");
		console.log(this.label_rank_score);
		this.getRankScore();
	},
    getRankScore() {
        var self=this;//回调里this将会改变为http链接用Object
		console.log("getRankScore");
        this.MySql.send("SELECT * FROM users WHERE id = " + window.DataBase.user_id,
            function (resultSet) {
				if(resultSet.length>0){
					if(self.label_rank_score!=null){
						window.DataBase.rank_score = resultSet[0].rank_score
						self.label_rank_score.string = "段位分数：" + resultSet[0].rank_score;						
					}

				}
            },
            function (err) {
                console.log(err);
            }
        );
    },
    // update (dt) {},
});
