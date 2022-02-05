
cc.Class({
    extends: cc.Component,
 
    properties: {
		nodes_box1:[cc.Node],
		nodes_box2:[cc.Node],
		nodes_text:[cc.Label],
		question:[cc.String],
		box_position:[cc.Integer],
		min:0,
		max:2,
		move:100,
		tox_push:300,
		toy_push:80,
		tox_pop:-400,
		toy_pop:-160,
		oldx:0,
		oldy:0,
		newx:0,
		newy:0,
		state:0,
		queue_lenth:0,
		ans_lenth:0,
		is_lose:false,
    },
	

 
    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.node.parent.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
        this.node.parent.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        this.node.parent.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchCancel,this);
    },
    onTouchStart(event) {
		var touches = event.getTouches();
        var oldPos = this.node.parent.convertToNodeSpaceAR(touches[0].getStartLocation());
        this.oldx = oldPos.x;
        this.oldy = oldPos.y;
    },
    onTouchEnd (event) {
		
		var touches = event.getTouches();
        this.newPos = this.node.parent.convertToNodeSpaceAR(touches[0].getLocation());
 //获取触摸结束之后的node坐标；
        this.newy = this.newPos.y;
        this.newx = this.newPos.x;
        if(this.oldx + 100 < this.newx && this.state < this.max && this.oldy - this.newy < 300 && this.newy - this.oldy < 300) {
        }
        else if(this.oldx > this.newx + 100 && this.state > this.min && this.oldy - this.newy < 300 && this.newy - this.oldy < 300) {
        }
		else if(this.oldy - this.newy > 200)
		{
			if(this.box_position[this.state]<3)
			{
				for(var i = this.queue_lenth - 1; i >= 0; i--)
				{
					var n;
					for(var j=0;j<this.box_position.length;j++)
					{
						if(this.box_position[j]==this.box_position.length + i) n=j;
					}
					this.nodes_box1[n].y -= this.move;
					this.box_position[n]++;
				}
				this.nodes_box1[this.state].x = this.tox_push;
				this.nodes_box1[this.state].y = this.toy_push;
				if(this.box_position[this.state]!=3-1)
				{
					this.node.x += this.move;
					this.box_position[this.state] = 3;
					this.state++;
				}
				else this.box_position[this.state] = 3;
				this.queue_lenth++;
				
			}
		}
		else if(this.newy - this.oldy > 200 && this.queue_lenth>0)
		{
				var n1;
				for(var i=0; i < this.box_position.length; i++)
				{
					if(this.box_position[i]==this.box_position.length) n1=i;
				}
				this.nodes_box1[n1].x = this.tox_pop + this.ans_lenth * this.move;
				this.nodes_box1[n1].y = this.toy_pop;
				this.box_position[n1] = 2 * this.box_position.length + this.ans_lenth;
				if(this.question[this.ans_lenth]==String.fromCharCode(n1+65))
					this.nodes_text[this.ans_lenth].node.color = new cc.color(10,225,10,255);
				else {
					this.nodes_text[this.ans_lenth].node.color = new cc.color(255,45,0,255);
					this.is_lose=true;
				}
				this.ans_lenth++;
			this.queue_lenth--;
			for(var i=1;i<=this.queue_lenth;i++)
			{
				var n2;
				for(var j=0;j<this.box_position.length;j++)
				{
					if(this.box_position[j]==this.box_position.length+i) n2=j;
				}
				this.nodes_box1[n2].y += this.move;
				this.box_position[n2]--;
			}
			if (this.ans_lenth == 3) {
				var winorlose = cc.find("Canvas").getComponent("WinOrLose");
				if (this.is_lose) winorlose.ISlose = true;
				else winorlose.ISwin = true;
			}
		}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    },
	onTouchCancel: function (event) {
		this.onTouchEnd(event)
	}
/*    onTouchCancel: function () {
        this.newPos = this.node.parent.convertToNodeSpaceAR(touches[0].getLocation());
 //获取触摸结束之后的node坐标；
        this.newy = this.newPos.y;
        this.newx = this.newPos.x;
        if(this.oldx + 100 < this.newx && this.state < this.max && this.oldy - this.newy < 300 && this.newy - this.oldy < 300) {
            this.node.x += this.move;
            this.state++;
        }
        else if(this.oldx > this.newx + 100 && this.state > this.min && this.oldy - this.newy < 300 && this.newy - this.oldy < 300) {
            this.node.x -= this.move;
            this.state--;
        }
		else if(this.oldy - this.newy > 200)
		{
			if(this.box_position[this.stare]<3)
			{
				this.nodes_box1[this.state].x = this.tox_push;
				this.nodes_box1[this.state].y = this.toy_push - this.queue_lenth * this.move;
				this.box_position[this.stare] = this.queue_lenth++ + 3;
				this.queue_lenth++;
			}
		}
		else if(this.newy - this.oldy > 200)
		{
			for(var i=0;i<this.queue_lenth;i++)
			{
				this.nodes_box1[i].x = this.tox_pop + this.queue_lenth * this.move;
				this.nodes_box1[i].y = this.toy_pop;
				this.queue_lenth--;
			}
		}  
    }, */
    /*
    onLoad () {
		//节点初始位置,每次触摸结束更新
        this.nodePos = this.node.getPosition();
        //触摸监听(this.node.parent是屏幕)
        //想达到按住节点，节点才能移动的效果，将监听函数注册到 this.node 上，去掉  .parent 即可
 
        this.node.parent.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    },
    //触摸移动；
    onTouchMove (event) {
        var self = this;
        var touches = event.getTouches();
        //触摸刚开始的位置
        var oldPos = self.node.parent.convertToNodeSpaceAR(touches[0].getStartLocation());
        //触摸时不断变更的位置
        var newPos = self.node.parent.convertToNodeSpaceAR(touches[0].getLocation());
        
        //var subPos = cc.pSub(oldPos,newPos); 1.X版本是cc.pSub
 
        var subPos = oldPos.sub(newPos); // 2.X版本是 p1.sub(p2);
 
        self.node.x = self.nodePos.x - subPos.x;
        self.node.y = self.nodePos.y - subPos.y;
        
        // 控制节点移不出屏幕; 
        var minX = -self.node.parent.width/2 + self.node.width/2; //最小X坐标；
        var maxX = Math.abs(minX);
        var minY = -self.node.parent.height/2 + self.node.height/2; //最小Y坐标；
        var maxY = Math.abs(minY);
        var nPos = self.node.getPosition(); //节点实时坐标；
 
        if (nPos.x < minX) {
            nPos.x = minX;
        };
        if (nPos.x > maxX) {
            nPos.x = maxX;
        };
        if (nPos.y < minY) {
            nPos.y = minY;
        };
        if (nPos.y > maxY) {
            nPos.y = maxY;
        };
        self.node.setPosition(nPos);
    },
 
 
    */
    
    
});
 
 
