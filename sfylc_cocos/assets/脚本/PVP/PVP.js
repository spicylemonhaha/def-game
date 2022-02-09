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
    // onLoad () {},
	statics:{
		match_id: -1,
		match_rank_score: 0,
		is_finding_duel: false,
		is_finded_duel: false,
		timeID: -1,
		checkpoint_id: 0,
		checkpoint_list: null,
	},

    start () {
        window.MySql = require("MySql_");
		window.DataBase = require("DataBase");
		checkpoint_list=new Array("Basic_Summer_class1","Basic_Summer_class2");
		checkpoint_id=0;
    },
	
	findingDuleUI(){
		this.node.getComponent("ToSence").loadScene();
	},
	
	initialUI(){
		this.node.getComponent("ToSence").loadScene();
	},
	
	chickFindDuel(){
		console.log(this.checkpoint_list);
		this.findingDuleUI();
		this.findDuel()
		    /* if(){//在数据库查找可对抗者
		                                    //开始对战                       
		        window.DataBase.is_start_pvp=true;
		        this.startGame();
		    }else{
		        this.queueDuel();
		                                    isstareduel=true;
		                                    updataMatchTime();
		                                    while(!findDuel2()&&isstareduel){
		                                        try {
		                                            Thread.sleep( 50 );
		                                        } catch (InterruptedException e) {
		                                            e.printStackTrace();
		                                        }
		                                    }
		                                    if(isstareduel) {
		                                        delDuel();
		                                        //开始对战
		                                        initialUI();
		                                        isstareduel=false;
		                                        isstartpvp=true;
		                                        game_start();
		                                    } 
		    } */
		
	},
	
	chickCencelFindDuel(){
		this.removeFinding();
		this.is_finding_duel=false;
		this.is_finded_duel=false;
		this.node.getComponent("ToSence").loadScene();
	},
	
	getMstchRankScore(){
		var self=this;//回调里this将会改变为http链接用Object
		window.MySql.send("SELECT * FROM users WHERE id = " + this.match_id,
		    function (resultSet) {
				if(resultSet.length>0){
					if(self.match_rank_score!=null){
						self.match_rank_score = resultSet[0].rank_score;					
					}
				}
		    },
		    function (err) {
		        console.log(err);
		    }
		);
	},
	
	findDuel(){
		var self = this;//回调里this将会改变为http链接用Object
		console.log("findDuel");
		window.MySql.send("SELECT * FROM queue,users WHERE queue.`user_id` = users.`id` AND users.`rank_score` < " + window.DataBase.rank_score +" + 1000 AND users.`rank_score` > " + window.DataBase.rank_score + " - 1000 AND queue.`ismatch` = 0 AND queue.`user_id` != " + window.DataBase.user_id + " ORDER BY time ASC",
		    function (resultSet) {
				console.log(resultSet);
		        if(resultSet.length>0){
					self.match_id = resultSet[0].user_id;
					self.getMstchRankScore()
					self.buildPVP();
		            self.startGame();
		        }else{
					self.queueDuel();
					self.listeningIsFinded()
				}
		    },
		    function (err) {
		        console.log(err);
		    }
		);
	},
	
	queueDuel(){
		var self=this;//回调里this将会改变为http链接用Object
		console.log(window.DataBase);
		window.MySql.send("INSERT INTO queue(user_id) VALUES(" + window.DataBase.user_id + ")",
		    function (resultSet) {
		    },
		    function (err) {
		        console.log(err);
		    }
		);
	},
	
	buildPVP(){
		var self=this;//回调里this将会改变为http链接用Object
		console.log(window.DataBase);
		window.MySql.send("UPDATE queue SET ismatch = 1 WHERE user_id = " + this.match_id,
		    function (resultSet) {
		    },
		    function (err) {
		        console.log(err);
		    }
		);
		window.MySql.send("INSERT INTO PVP(main_player_id,secondary_player_id,game_id,map_seed) VALUES(" + window.DataBase.user_id + "," + this.match_id + "," + this.chickpoint_i + ",1)",
		    function (resultSet) {
		    },
		    function (err) {
		        console.log(err);
		    }
		);
	},
	
	linsten(){
			var self=this;
			window.MySql.send("SELECT ismatch FROM queue WHERE user_id = " + window.DataBase.user_id + " AND ismatch = TRUE",
			    function (resultSet) {
					console.log("isFinded")
          console.log(resultSet)
					if(resultSet.length>0){
						self.is_finding_duel=false;
						self.is_finded_duel=true;
						self.removeFinding();
						self.getMatchID();
						self.startGame();
						clearTimeout(timeID)
					}else{
						self.is_finding_duel=true;
						self.is_finded_duel=false;
						timeID = setTimeout(self.linsten(), 500);
						console.log(timeID);
					}
			    },
			    function (err) {
			        console.log(err);
			    }
			);
	},
	listeningIsFinded(){
		
		timeID = setTimeout(this.linsten(), 500);
		/* while(true){
			setTimeout("listeningIsFinded", 1000 );
			var self=this;
			window.MySql.send("SELECT ismatch FROM queue WHERE user_id = " + window.DataBase.user_id + " AND ismatch = TRUE",
			    function (resultSet) {
					console.log("isFinded")
					if(resultSet.length>0){
						self.is_finding_duel=false;
						self.is_finded_duel=true;
						self.removeFinding();
						self.getMatchID();
						self.startGame();
						return;
					}else{
						self.is_finding_duel=true;
						self.is_finded_duel=false;
					}
			    },
			    function (err) {
			        console.log(err);
			    }
			);
		} */
	},
	
	getMatchID(){
		var self=this;//回调里this将会改变为http链接用Object
		console.log(window.DataBase);
		window.MySql.send("SELECT * FROM PVP WHERE main_player_id ="+window.DataBase.user_id+" OR secondary_player_id = "+window.DataBase.user_id,
		    function (resultSet) {
				if(resultSet.length>0){
				    if(resultSet[0].main_player_id==window.DataBase.user_id) self.match_id=resultSet[0].secondary_player_id;
					else self.match_id=resultSet[0].main_player_id;
					self.getMstchRankScore();
				}
		    },
		    function (err) {
		        console.log(err);
		    }
		);
	},
	
	removeFinding(){
		var self=this;//回调里this将会改变为http链接用Object
		console.log(window.DataBase);
		window.MySql.send("DELETE FROM queue WHERE user_id = " + window.DataBase.user_id,
		    function (resultSet) {
		    },
		    function (err) {
		        console.log(err);
		    }
		);
	},
	
	lose(){
		cc.director.loadScene(checkpoint_list[checkpoint_id]);
	},
	
	win(){
		
		var self=this;//回调里this将会改变为http链接用Object
		console.log(window.DataBase);
		window.MySql.send("SELECT * FROM PVP WHERE main_player_id = " + window.DataBase.user_id + " OR secondary_player_id = " + window.DataBase.user_id,
		    function (resultSet) {
				if(resultSet.length>0){
					//win
					window.DataBase.rank_score += 30;
					window.DataBase.rank_score += (self.match_rank_score - window.DataBase.rank_score) / 10;
				}else{
					//lose
					window.DataBase.rank_score -= 30;
					window.DataBase.rank_score += (self.match_rank_score - window.DataBase.rank_score) / 10;
				}
				window.MySql.send("UPDATE users SET rank_score = " + window.DataBase.rank_score + " WHERE id = " + window.DataBase.user_id,
				    function (resultSet) {
				    },
				    function (err) {
				        console.log(err);
				    }
				);
				
		    },
		    function (err) {
		        console.log(err);
		    }
		);
	},
	
	/* protected boolean findDuel1() {
	        boolean issuccess = false;
	        Connection conn = null;
	        ResultSet rs = null;
	        PreparedStatement pstmt = null;
	        try {
	            String sql = "SELECT * FROM queue,users WHERE queue.`user_id` = users.`id` AND users.`rank_score` < ? + 1000 AND users.`rank_score` > ? - 1000 AND queue.`ismatch` = 0 AND queue.`user_id` != ? ORDER BY time ASC";
	            conn = JDBCUtils.connection();
	            pstmt = conn.prepareStatement(sql);
	            pstmt.setInt(1,rank_score);
	            pstmt.setInt(2,rank_score);
	            pstmt.setInt(3,id);
	            rs = pstmt.executeQuery();
	            issuccess =rs.next();
	            if(issuccess) {
	                match_id = rs.getInt("user_id");
	                PreparedStatement pstmt2;
	                sql = "UPDATE queue SET ismatch = 1 WHERE user_id = ?";
	                pstmt2 = conn.prepareStatement(sql);
	                pstmt2.setInt(1,match_id);
	                pstmt2.executeUpdate();
	                sql = "INSERT INTO PVP(main_player_id,secondary_player_id,game_id,map_seed) VALUES(?,?,?,?)";
	                pstmt2 = conn.prepareStatement(sql);
	                pstmt2.setInt(1,id);
	                pstmt2.setInt(2,match_id);
	                int max=context.length,min=1;
	                int ran = (int) (Math.random()*(max-min)+min);
	                pstmt2.setInt(3,ran);
	                DataBase.pvp_seed = (int) (Math.random()*(2147483647-min)+min);
	                pstmt2.setInt(4,DataBase.pvp_seed);
	                pstmt2.executeUpdate();
	            }
	        } catch (SQLException throwables) {
	            throwables.printStackTrace();
	        }finally {
	            JDBCUtils.Close(rs,pstmt, conn);
	        }
	        return issuccess;
	    } */
	
	startGame(){
		console.log("startGame");
		console.log(checkpoint_list);
		console.log(checkpoint_id);
		cc.director.loadScene(checkpoint_list[checkpoint_id]);
	},
	
    // update (dt) {},
});
