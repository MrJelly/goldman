namespace goldman {
  export class GameManager {
    public constructor() {
    }
    private static _instance: GameManager;
    public static getInstance(): GameManager {
      if (this._instance == null) {
        this._instance = new GameManager();
      }
      return this._instance;
    }

    public GameStage: egret.Stage;
    public GameStage_width: number;
    public GameStage_height: number;
    private levelArr: any = [];
    private currLevel: number = 1;
    private money: number = 0;

    private levelTimer: egret.Timer;
    private LEVEL_TIME: number = 60;

    private hookManager: HookManager;
    private objManager: ObjManager;
    public gameScene: GameScene;
    private gameOver: GameOver;
    private isOver: boolean = false;

    public initGame(): void {
      this.levelArr = RES.getRes("Level_json");
      this.gameScene = new GameScene();

      this.GameStage.addChild(this.gameScene);
      this.gameScene.setGoalText(this.levelArr[this.currLevel - 1].goal);
      this.gameScene.addEventListener(GameScene.TRIGGER_START_GO, this.onStartGo, this); //点击勾取
      this.objManager = new ObjManager();

      this.GameStage.addChild(this.objManager);
      this.objManager.createObjs(this.levelArr[this.currLevel - 1].objsArr);

      this.hookManager = new HookManager();
      this.hookManager.addEventListener(HookManager.HOOK_MANAGER_EVENT, this.onHookManagerEventHandler, this);

      this.GameStage.addChild(this.hookManager);
      this.hookManager.x = this.GameStage_width / 2;
      this.hookManager.y = 158;

      this.gameOver = new GameOver();

      this.GameStage.addEventListener(egret.Event.ENTER_FRAME, this.onGameEnterFrame, this);

      this.createGameTimeInterval();
    }

    private createGameTimeInterval(): void {
      this.levelTimer = new egret.Timer(1000, this.LEVEL_TIME);
      this.levelTimer.addEventListener(egret.TimerEvent.TIMER, this.gameTimerFunc, this);
      this.levelTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.gameTimerComFunc, this);
      this.levelTimer.start();
      this.gameScene.setTimeText(this.LEVEL_TIME);
    }

    private gameTimerFunc(e: egret.TimerEvent): void {
      let leftTime = this.LEVEL_TIME - e.target.currentCount
      this.gameScene.setTimeText(leftTime);
      if (leftTime == 10) {
        SoundManager.getInstance().PlayLastSound();
      }
    }

    private gameTimerComFunc(e: egret.TimerEvent): void {
      this.gameScene.setTimeText(this.LEVEL_TIME - e.target.currentCount);
      this.onGameOver();
    }
    private onGameOver(): void {
      console.log("gameOver!!!");
      var that = this
      that.isOver = true;
      that.objManager.destroy();
      that.GameStage.removeChild(that.objManager);
      var timeHandle: number = setTimeout(function () {
        //执行事件
        console.log("alert msgbox!!!!!")
        that.GameStage.addChild(that.gameOver);
        that.gameOver.setScoreText(that.money);
        that.gameOver.addEventListener(GameOver.CLOSE_GAMEOVER_EVENT, that.onDestroyGameOver, that)
        clearTimeout(timeHandle);
      }, that, 500);
    }
    private onDestroyGameOver(e: egret.Event) {
      this.gameOver.removeEventListener(GameOver.CLOSE_GAMEOVER_EVENT, this.onDestroyGameOver, this)
      this.GameStage.removeChild(this.gameOver);
    }

    private destoryGameScene(): void {
      this.GameStage.removeChild(this.gameScene);
      this.gameScene.destroy();
      this.GameStage.removeChild(this.objManager);
      this.objManager.destroy();
      this.GameStage.removeChild(this.hookManager);
      this.hookManager.destroy();
      this.GameStage.removeChild(this.gameOver);
      this.gameOver.destroy();
      this.gameScene.removeEventListener(GameScene.TRIGGER_START_GO, this.onStartGo, this);
      this.GameStage.removeEventListener(egret.Event.ENTER_FRAME, this.onGameEnterFrame, this);
      this.levelTimer.removeEventListener(egret.TimerEvent.TIMER, this.gameTimerFunc, this);
      this.levelTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.gameTimerComFunc, this);
      this.levelTimer.stop();
      this.levelTimer = null;
    }

    private onGameEnterFrame(e: Event): void {
      this.hookManager.onUpdateEnterFrame();
    }

    private onHookManagerEventHandler(e: egret.Event): void {
      var data: any = (e.data);
      switch (data.type) {
        case HookManager.GO_COMPLETE_EVENT:
          if (this.isOver) { return }
          var catchObj: Obj = data.catchObj;
          if (catchObj) {
            console.log("obj.money " + catchObj.money);
            this.money += catchObj.money;
            this.gameScene.setScoreText(this.money);
            for (let i = 0; i < 3; i++) {
              GoldEffectUtils.createImg();
            }
          }
          break;
        case HookManager.UPDATE_HOOK_POSITION_EVENT:
          if (!this.hookManager.isBack) {
            this.checkHookHitObject(data.hookBmp);
          }
          break;
      }
    }
    private updateHookBack(obj: Obj): void {
      this.hookManager.setCatchObj(obj);
      this.objManager.removeObj(obj);
      obj.destory();
    }
    private checkHookHitObject(hookBmp: egret.Bitmap): void {
      var goldsArr: Obj[] = this.objManager.objsArr;
      var me = this;
      for (var i in goldsArr) {
        var obj: Obj = goldsArr[i];
        var isHit: boolean = GameUtil.hitTestObjByParentObj(hookBmp, obj, this.GameStage);//检测钩子和物体是否相撞
        if (isHit) {
          if (obj.type == "TNT") {
            me.hookManager.setHookBackV(0);
            me.objManager.removeObjsAtAreaByHitObj(obj);
            obj.overObject();
            setTimeout(function () {
              me.hookManager.setHookBackV(obj.backV);
              me.hookManager.setCatchObj(obj);
              obj.destory();
            }, 300);
          } else {
            me.hookManager.setHookBackV(obj.backV);
            let point = me.hookManager.getHookPoint()
            egret.Tween.get(obj).to({ x: point.x, y: point.y }, 100, egret.Ease.sineIn).call(function () {
              me.hookManager.setCatchObj(obj);
              me.objManager.removeObj(obj);
              obj.destory();
            });
          }
          break;
        }
      }
    }

    public onStartGo(): void {
      this.hookManager.startGo();
    }
  }
}
