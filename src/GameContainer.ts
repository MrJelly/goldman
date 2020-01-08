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
        private gameOver: GameOver;

        private isOver: boolean = false;

        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        /**初始化*/
        private onAddToStage(e: egret.Event): void {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            GameContainer.thisW = this.stage.stageWidth;
            GameContainer.thisH = this.stage.stageHeight;
            this.initRequest()

            this.getLevelData();
        }
        private initRequest() {
            goldman.Http.create()
                .success(this.onRequestSuccess, this)
                .error(this.onRequestError, this)
                .add('')
                .dataFormat(egret.URLLoaderDataFormat.TEXT)
                .post('https://happy.s1.anxinabc.com/api/v1/appconfig');//也可以是post方法
        }
        private onRequestSuccess(data){
            console.log("==>>>>",data)
        }
        private onRequestError(){

        }
        private minX: number = 100
        private maxX: number = 600
        private minY: number = 300
        private maxY: number = 1000
        private totalNum: number = 9
        private goldStrArr: Object = ['Gold1', 'Gold1', 'Gold1', 'Gold1', 'Gold2', 'Gold2', 'Gold2', 'Gold3', 'Gold3']
        private getLevelData() {
            this.levelArr = RES.getRes("Level_json");
            // const _array = []
            // for (let i = 0; i < this.totalNum; i++) {
            //     let x: number = Math.floor((this.maxX - this.minX + 1) * Math.random() + this.minX)
            //     let y: number = Math.floor((this.maxY - this.minY + 1) * Math.random() + this.minY)
            //     console.log("")
            //     _array.push({ x, y })
            // }
            // _array.sort(function (a: any, b: any): number {
            //     return a.y - b.y
            // })
            // for (let i = 0; i < this.totalNum; i++) {
            //     _array[i].name = this.goldStrArr[i]
            // }
            // console.log("======>_array", _array)
            // this.levelArr = [{
            //     "goal": "100",
            //     "objsArr": _array
            // }]
            this.createGameScene();
        }

        /**创建游戏场景*/
        private createGameScene(): void {
            this.gameManager = new GameManager();

            this.addChild(this.gameManager);
            this.gameManager.setGoalText(this.levelArr[this.currLevel - 1].goal);
            this.gameManager.addEventListener(GameManager.TRIGGER_START_GO, this.onStartGo, this); //点击勾取
            this.objManager = new ObjManager();
            this.objManager.addEventListener(ObjManager.OBJ_MANAGER_EVENT, this.onObjManagerEventHandler, this);

            this.addChild(this.objManager);
            this.objManager.createObjs(this.levelArr[this.currLevel - 1].objsArr);


            this.hookManager = new HookManager();
            this.hookManager.addEventListener(HookManager.HOOK_MANAGER_EVENT, this.onHookManagerEventHandler, this);

            this.addChild(this.hookManager);
            this.hookManager.x = GameContainer.thisW / 2;
            this.hookManager.y = 158;

            this.gameOver = new GameOver();

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
            this.onGameOver();
        }
        private onGameOver(): void {
            console.log("gameOver!!!");
            var that = this
            that.isOver = true;
            that.objManager.destroy();
            that.removeChild(that.objManager);
            var timeOut: number = setTimeout(function () {
                //执行事件
                console.log("alert msgbox!!!!!")
                that.addChild(that.gameOver);
                that.gameOver.setScoreText(that.money);
                that.gameOver.addEventListener(GameOver.CLOSE_GAMEOVER_EVENT, that.onDestroyGameOver, that)
                clearTimeout(timeOut);
            }, that, 500);
        }
        private onDestroyGameOver(e: egret.Event) {
            this.gameOver.removeEventListener(GameOver.CLOSE_GAMEOVER_EVENT, this.onDestroyGameOver, this)
            this.removeChild(this.gameOver);
        }

        private destoryGameScene(): void {
            this.gameManager.destroy();
            this.removeChild(this.gameManager);
            this.objManager.destroy();
            this.removeChild(this.objManager);
            this.hookManager.destroy();
            this.removeChild(this.hookManager);
            this.gameOver.destroy();
            this.removeChild(this.gameOver);

            this.gameManager.removeEventListener(GameManager.TRIGGER_START_GO, this.onStartGo, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onGameEnterFrame, this);
            this.levelTimer.removeEventListener(egret.TimerEvent.TIMER, this.gameTimerFunc, this);
            this.levelTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.gameTimerComFunc, this);
            this.levelTimer.stop();
            this.levelTimer = null;
        }

        private onGameEnterFrame(e: Event): void {
            this.hookManager.onUpdateEnterFrame();
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
                    if (this.isOver) { return }
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

        private onStartGo(): void {
            this.hookManager.startGo();
        }
    }
}