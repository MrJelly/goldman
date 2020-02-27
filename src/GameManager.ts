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
    private missionArr: any = [];

    private levelTimer: egret.Timer;
    private LEVEL_TIME: number = 60;
    private jinScore: number = 0;
    private yinScore: number = 0;

    private hookManager: HookManager;
    private objManager: ObjManager;
    public gameScene: GameScene;
    private gameOver: GameOver;
    private isOver: boolean = false;

    public initGame(): void {
      this.missionArr = RES.getRes("mission_json");
      this.gameScene = new GameScene();

      this.GameStage.addChild(this.gameScene);
      // this.gameScene.addEventListener(GameScene.TRIGGER_START_GO, this.onStartGo, this); //点击勾取
      this.objManager = new ObjManager();

      this.GameStage.addChild(this.objManager);
      this.objManager.createObjs(this.missionArr);

      this.hookManager = new HookManager();
      this.hookManager.addEventListener(HookManager.HOOK_MANAGER_EVENT, this.onHookManagerEventHandler, this);

      this.GameStage.addChild(this.hookManager);
      this.hookManager.x = this.GameStage_width / 2;
      this.hookManager.y = 330;

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
        that.GameStage.addChild(that.gameOver);
        that.gameOver.setJinText(that.jinScore);
        that.gameOver.setYinText(that.yinScore);

        that.initRequest()

        that.gameOver.addEventListener(GameOver.CLOSE_GAMEOVER_EVENT, that.onDestroyGameOver, that)
        clearTimeout(timeHandle);
      }, that, 500);
    }
    private onDestroyGameOver(e: egret.Event) {
      this.gameOver.removeEventListener(GameOver.CLOSE_GAMEOVER_EVENT, this.onDestroyGameOver, this)
      this.GameStage.removeChild(this.gameOver);
    }

    private initRequest() {
      goldman.Http.create()
        .success(this.onRequestSuccess, this)
        .error(this.onRequestError, this)
        .add('')
        .dataFormat(egret.URLLoaderDataFormat.TEXT)
        .post('https://happy.s1.anxinabc.com/api/v1/appconfig');//也可以是post方法
    }
    private onRequestSuccess(data) {
      console.log("==>>>>", data)
    }
    private onRequestError() {
      console.log("==>>>>")
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
      // this.gameScene.removeEventListener(GameScene.TRIGGER_START_GO, this.onStartGo, this);
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
            if (catchObj.type == 0) {
              this.yinScore += catchObj.score;
              this.gameScene.setYinScoreText(this.yinScore);
            } else if (catchObj.type == 1) {
              this.jinScore += catchObj.score;
              this.gameScene.setJinScoreText(this.jinScore);
            }
            for (let i = 0; i < catchObj.score / 10; i++) {
              GoldEffectUtils.createSeeds(catchObj.type);
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
          me.hookManager.setHookBackV(obj.speed);
          me.hookManager.setCatchObj(obj);
          me.objManager.removeObj(obj);
          obj.destory();
          // let point = me.hookManager.getHookPoint()
          break;
        }
      }
    }

    public onStartGo(): void {
      this.hookManager.startGo();
    }
  }
}
