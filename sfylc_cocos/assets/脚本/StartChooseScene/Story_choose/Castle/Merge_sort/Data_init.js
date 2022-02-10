cc.Class({
  extends: cc.Component,
  properties: {
    Bins: [cc.Node],//箱子内数据
    splitters: [cc.Node],
    buttons: [cc.Button],
    winText: cc.Node,
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad() {
    console.log('开始初始化');
    //初始化数组和最终答案数组
    this.ans = [];
    this.ans[0] = this.Bins[0].getComponent(cc.Label).string = Math.floor(Math.random() * 100) + 40;
    this.ans[7] = this.Bins[7].getComponent(cc.Label).string = Math.floor(Math.random() * 100) - 30;
    for (let i = 1; i < this.Bins.length - 1; i++) {
      this.Bins[i].getComponent(cc.Label).string = Math.floor(Math.random() * 100);
      this.ans[i] = +this.Bins[i].getComponent(cc.Label).string;
    }
    this.ans.sort(this.NumAscSort);
    //声明第二回合的答案数组
    this.leftAnsArr = [];
    this.rightAnsArr = [];
    this.turnsItem2 = [];
    //监听四个按钮
    this.buttons[1].node.on(cc.Node.EventType.TOUCH_END, this.rightButtonEnd, this);
    this.buttons[0].node.on(cc.Node.EventType.TOUCH_END, this.leftButtonEnd, this);
    this.buttons[2].node.on(cc.Node.EventType.TOUCH_END, this.focusButtonEnd, this);
    this.buttons[3].node.on(cc.Node.EventType.TOUCH_END, this.changeButtonEnd, this);
    //初始化目前机器人所在位置
    this.focusIndex = 1;
    //初始化回合数
    this.turns = 1;
  },
  checkTurn1() {
    let flag1 = true;
    let left = -100;
    for (let i = 0; i < this.Bins.length; i++) {
      var nowNum = +this.Bins[i].getComponent(cc.Label).string;
      if (i % 2 == 0) {
        left = nowNum;
      } else if (left > nowNum) {
        flag1 = false;
        break;
      }
    }
    //这里通过flag1来判断每个小间隔是否排好序,如果排好序那进行下一轮操作
    if (flag1) {
      this.turns++;
      this.splitters[0].active = false;
      this.splitters[2].active = false;
      for (let i = 0; i < this.Bins.length; i++) {
        if (i <= 3) {
          let num = +this.Bins[i].getComponent(cc.Label).string;
          this.leftAnsArr.push(num);
        } else {
          let num = +this.Bins[i].getComponent(cc.Label).string;
          this.rightAnsArr.push(num);
        }
      }
      console.log(this.leftAnsArr);
      console.log(this.rightAnsArr);
      this.leftAnsArr.sort(this.NumAscSort);
      this.rightAnsArr.sort(this.NumAscSort);
      console.log(this.leftAnsArr);
      console.log(this.rightAnsArr);
    }
  },
  checkTurn2Or3() {
    let flag = true;
    let left = [];
    let right = [];
    if (this.turns == 2) {
      for (let i = 0; i < this.Bins.length; i++) {
        if (i <= 3) left.push(+this.Bins[i].getComponent(cc.Label).string);
        else right.push(+this.Bins[i].getComponent(cc.Label).string);
      }
      console.log(left, this.leftAnsArr);
      console.log(right, this.rightAnsArr);
      if (left.toString() != this.leftAnsArr.toString()) flag = false;
      if (right.toString() != this.rightAnsArr.toString()) flag = false;
      if (flag) {
        this.splitters[1].active = false;
        this.turns++;
        return;
      }
    } else if (this.turns == 3) {

      for (let i = 0; i < this.Bins.length; i++) {
        console.log(+this.Bins[i].getComponent(cc.Label).string);
        console.log(this.ans[i]);
        if (+this.Bins[i].getComponent(cc.Label).string != this.ans[i]) flag = false;
      }
      if (flag) {
        this.winText.active = true;
      }
    }
  },
  changeButtonEnd() {
    if (this.focusedIndex2 && this.focusedIndex1 && this.turns == 1) {
      //由于目标索引是从1开始而实际的数组是从0开始所以要减一
      let bottle = +this.Bins[this.focusedIndex1 - 1].getComponent(cc.Label).string;
      if (bottle > +this.Bins[this.focusedIndex2 - 1].getComponent(cc.Label).string) {
        delete this.focusedIndex1;
        delete this.focusedIndex2;
        console.log('排序错误');
        return;
      }
      this.Bins[this.focusedIndex1 - 1].getComponent(cc.Label).string = this.Bins[this.focusedIndex2 - 1].getComponent(cc.Label).string;
      this.Bins[this.focusedIndex2 - 1].getComponent(cc.Label).string = bottle;
      delete this.focusedIndex1;
      delete this.focusedIndex2;
      //交换完一次之后检查是否成功
      if (this.turns == 1) {
        this.checkTurn1();
      }
    } else if (this.turns == 2) {
      if (this.isLeft == 1 && this.turnsItem2.length == 4) {
        for (let i = 0; i < 4; i++) {
          this.Bins[i].getComponent(cc.Label).string = this.turnsItem2[i];
        }
      } else if (this.isLeft == 2 && this.turnsItem2.length == 4) {
        for (let i = 4; i < 8; i++) {
          this.Bins[i].getComponent(cc.Label).string = this.turnsItem2[i - 4];
        }
      }
      this.turnsItem2.splice(0);
      delete this.focusedIndex1;
      this.checkTurn2Or3();
    } else if (this.turns == 3) {
      console.log(this.turnsItem2)
      if (this.turnsItem2.length == 8) {
        for (let i = 0; i < 8; i++) {
          this.Bins[i].getComponent(cc.Label).string = this.turnsItem2[i];
        }
        this.turnsItem2.splice(0);
        delete this.focusedIndex1;
        this.checkTurn2Or3();
      }
    }

  },
  leftButtonEnd() {
    if (this.focusIndex > 1) {
      this.focusIndex--;
    }
  },
  rightButtonEnd() {
    if (this.focusIndex < 8) {
      this.focusIndex++;
    }
  },
  focusButtonEnd() {

    if (this.turns == 1) {
      if (!this.focusedIndex2 && this.focusedIndex1 && Math.abs(this.focusIndex - this.focusedIndex1) < 2) {
        if ((this.focusedIndex1 % 2 == 0) && this.focusIndex == (this.focusedIndex1 - 1)) {
          this.focusedIndex2 = this.focusIndex;
        }
        if ((this.focusedIndex1 % 2 == 1) && this.focusIndex == (this.focusedIndex1 + 1)) {
          this.focusedIndex2 = this.focusIndex;
        }
      }
      if (!this.focusedIndex1) {
        this.focusedIndex1 = this.focusIndex;
      }
      console.log(this.focusedIndex1, this.focusedIndex2);
    } else if (this.turns == 2) {
      if (!this.focusedIndex1) {
        this.times = 1;
        this.focusedIndex1 = this.focusIndex;
        if (this.focusedIndex1 <= 4) {
          this.isLeft = 1;
        } else {
          this.isLeft = 2;
        }
      }
      if (this.focusedIndex1) {
        if ((this.isLeft == 1 && this.focusIndex > 4) || (!this.isLeft == 2 && this.focusIndex <= 4)) {
          console.log('排序错误');
          this.turnsItem2.splice(0);
          delete this.focusedIndex1;
          return;
        }
        let num = +this.Bins[this.focusIndex - 1].getComponent(cc.Label).string
        this.turnsItem2.push(num);
      }
      console.log(this.turnsItem2);
    } else if (this.turns == 3) {
      if (!this.focusedIndex1) {
        this.focusedIndex1 = this.focusIndex;
      }
      if (this.focusedIndex1) {
        let num = +this.Bins[this.focusIndex - 1].getComponent(cc.Label).string
        this.turnsItem2.push(num);
      }
    }
  },
  NumAscSort(a, b) {
    return a - b;
  },
  update(dt) {

  },
});
