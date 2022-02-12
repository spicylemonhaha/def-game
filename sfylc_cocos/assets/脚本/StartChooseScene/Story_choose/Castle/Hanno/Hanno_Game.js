
cc.Class({
    extends: cc.Component,

    properties: {
      blockLayerNode: cc.Node,
      blockPrefab: cc.Prefab,
      baseNodeArr: [cc.Node],
    },
    onLoad() {
      window.game = this;
      this.blockNodeArr = [[], [], []];
      this.blockNum = 3;
      //初始化方块
      this.initBlock(this.blockNum);
    },
    start () {
      
    },
    initBlock(num) {
      //初始化三个底座数组
      this.blockNodeArr = [[], [], []];
      for(let i = 0; i < num; i ++) {
        //设置小色块的位置
        let blockNode = cc.instantiate(this.blockPrefab)
        this.blockLayerNode.addChild(blockNode)
  
        blockNode.x = this.baseNodeArr[0].x;
        blockNode.y = -94 + 35 * i;

        //设置小色块的所属底座
        blockNode.baseIndex = 0;
        //设置小色块的层级
        blockNode.blockIndex = num - i - 1;
        //生成小色块
        blockNode.getComponent('block').init(num - i - 1);
        //给底座添加色块
        this.blockNodeArr[0].push(blockNode);
      }
    },//-301-94
    baseIndexCheck(pos) {
      for(let i = 0; i < this.baseNodeArr.length; i ++) {
        let baseNode = this.baseNodeArr[i];
        if(pos.x >= baseNode.x - baseNode.width * 0.7 / 2 && pos.x <= baseNode.x + baseNode.width * 0.7 / 2) {
          console.log(i);
          return i;
        }
      }
      return -1;
    },
    placeBlock(blockNode) {
      //baseIndex是移动之后的位置，如果为-1则算做错误
      //blockNode.baseIndex是小色块所属底座
      let baseIndex = this.baseIndexCheck(blockNode.position);
      //没有进入应该存放地区域，错误
      if(baseIndex == -1) {
        return false;
      }
      //还是原来的位置，直接返回，所以算做错误
      if(blockNode.baseIndex == baseIndex) {
        return false;
      }
      //拿到移动后那个位置的底座数组
      let arr = this.blockNodeArr[baseIndex];
      if(arr.length && arr[arr.length - 1].blockIndex <= blockNode.blockIndex) {
        return false;
      }
      //拿到现在的底座
      let baseNode = this.baseNodeArr[baseIndex];
      //让节点的x等于底座的x
      blockNode.x = baseNode.x;
      //原本的底座需要弹出
      this.blockNodeArr[blockNode.baseIndex].pop();
      //加入到现在的底座
      this.blockNodeArr[baseIndex].push(blockNode);
      //更新节点的底座坐标
      blockNode.baseIndex = baseIndex;
      //获取所处底座数组长度
      let length = this.blockNodeArr[baseIndex].length;
      //控制y的位置
      blockNode.y = -95 + (length - 1) * 46 * 0.8;
      if(this.blockNodeArr[2].length == this.blockNum) {
        let wl = this.getComponent("WinOrLose");
        wl.ISwin = true;
        console.log('通关了')
      }
      return true;
    },
});
