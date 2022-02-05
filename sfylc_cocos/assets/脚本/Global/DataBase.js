
cc.Class({
    extends: cc.Component,

    properties: {
		is_start_pvp:false,
		player:null,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
	statics: {
		user_id:1,
	    is_start_pvp:false,
		rank_score:-1,
        serverIp:"47.98.36.113",
	},

    start () {

    },

    // update (dt) {},
});