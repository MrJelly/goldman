module goldman {
	/**
	 * 主游戏容器
	 */
    export class GameContainer extends egret.Sprite {
        /**游戏区域宽*/
        static thisW: number;
        /**游戏区域高*/
        static thisH: number;

        private levelArr: any = [];
        private currLevel: number = 1;
        private money: number = 0;

        private levelTimer: egret.Timer;
        private LEVEL_TIME: number = 60;

        private hookManager: HookManager;
        private objManager: ObjManager;
        private gameManager: GameManager;

        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        /**初始化*/
        private onAddToStage(e: egret.Event): void {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            GameContainer.thisW = this.stage.stageWidth;
            GameContainer.thisH = this.stage.stageHeight;
            this.getLevelData();
            console.log("11111111111111111111")
        }

        private getLevelData() {
            this.levelArr = RES.getRes("Level_json");
            console.log("==========>>>levelArr", this.levelArr)
            this.createGameScene();
        }

        /**创建游戏场景*/
        private createGameScene(): void {
            this.gameManager = new GameManager();
            this.gameManager.addEventListener(GameManager.LEVEL_MANAGER_EVENT, this.onGameManagerEventHandler, this);
            this.gameManager.addEventListener(GameManager.START_GO_EVENT, this.clickStartGo, this)
            
            this.addChild(this.gameManager);
            this.gameManager.createObjs();
            this.gameManager.setGoalText(this.levelArr[this.currLevel - 1].goal);
            // this.gameManager.setLevelText(this.currLevel);
            this.objManager = new ObjManager();
            this.objManager.addEventListener(ObjManager.OBJ_MANAGER_EVENT, this.onObjManagerEventHandler, this);

            this.addChild(this.objManager);
            this.objManager.createObjs(this.levelArr[this.currLevel - 1].objsArr);


            this.hookManager = new HookManager();
            this.hookManager.addEventListener(HookManager.HOOK_MANAGER_EVENT, this.onHookManagerEventHandler, this);
            this.addChild(this.hookManager);
            this.hookManager.x = GameContainer.thisW / 2;
            this.hookManager.y = 158;

            // this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStage, this); //点击勾取
            this.addEventListener(egret.Event.ENTER_FRAME, this.onGameEnterFrame, this);

            this.createGameTimeInterval();
        }

        private createGameTimeInterval(): void {
            this.levelTimer = new egret.Timer(1000, this.LEVEL_TIME);
            this.levelTimer.addEventListener(egret.TimerEvent.TIMER, this.gameTimerFunc, this);
            this.levelTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.gameTimerComFunc, this);
            this.levelTimer.start();
            this.gameManager.setTimeText(this.LEVEL_TIME);
        }

        private gameTimerFunc(e: egret.TimerEvent): void {
            this.gameManager.setTimeText(this.LEVEL_TIME - e.target.currentCount);
        }

        private gameTimerComFunc(e: egret.TimerEvent): void {
            this.gameManager.setTimeText(this.LEVEL_TIME - e.target.currentCount);
            // this.nextLevel();
        }

        private nextLevel(): void {
            console.log("nextLevel");
            this.destoryGameScene();
            this.currLevel++;
            this.createGameScene();
        }

        private destoryGameScene(): void {
            this.gameManager.removeEventListener(GameManager.START_GO_EVENT, this.clickStartGo, this);
            this.gameManager.destroy();
            this.removeChild(this.gameManager);
            this.objManager.destroy();
            this.removeChild(this.objManager);
            this.hookManager.destroy();
            this.removeChild(this.hookManager);
            
            // this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStage, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onGameEnterFrame, this);
            this.levelTimer.removeEventListener(egret.TimerEvent.TIMER, this.gameTimerFunc, this);
            this.levelTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.gameTimerComFunc, this);
            this.levelTimer.stop();
            this.levelTimer = null;
        }

        private onGameEnterFrame(e: Event): void {
            this.hookManager.onUpdateEnterFrame();
        }

        private onGameManagerEventHandler(e: egret.Event): void {
            var data: any = (e.data);
            switch (data.type) {
            }
        }

        private onObjManagerEventHandler(e: egret.Event): void {
            var data: any = (e.data);
            switch (data.type) {
            }
        }

        private onHookManagerEventHandler(e: egret.Event): void {
            var data: any = (e.data);
            switch (data.type) {
                case HookManager.GO_COMPLETE_EVENT:
                    var catchObj: Obj = data.catchObj;
                    if (catchObj) {
                        console.log("obj.money " + catchObj.money);
                        this.money += catchObj.money;
                        this.gameManager.setScoreText(this.money);
                    }
                    break;
                case HookManager.UPDATE_HOOK_POSITION_EVENT:
                    if (!this.hookManager.isBack) {
                        this.checkHookHitObject(data.hookBmp);
                    }
                    break;
            }
        }

        private checkHookHitObject(hookBmp: egret.Bitmap): void {
            var goldsArr: Obj[] = this.objManager.objsArr;
            var me = this;
            for (var i in goldsArr) {
                var obj: Obj = goldsArr[i];
                var isHit: boolean = GameUtil.hitTestObjByParentObj(hookBmp, obj, this);//检测钩子和物体是否相撞
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
                        me.hookManager.setCatchObj(obj);
                        obj.destory();
                    }
                    break;
                }
            }
        }

        private clickStartGo(e: egret.TouchEvent): void {
            console.log("dddddddddddddddd")
            this.hookManager.startGo();
        }
    }
}