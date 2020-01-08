var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var goldman;
(function (goldman) {
    /**
     * 主游戏容器
     */
    var GameContainer = (function (_super) {
        __extends(GameContainer, _super);
        function GameContainer() {
            var _this = _super.call(this) || this;
            _this.levelArr = [];
            _this.currLevel = 1;
            _this.money = 0;
            _this.LEVEL_TIME = 60;
            _this.isOver = false;
            _this.minX = 100;
            _this.maxX = 600;
            _this.minY = 300;
            _this.maxY = 1000;
            _this.totalNum = 9;
            _this.goldStrArr = ['Gold1', 'Gold1', 'Gold1', 'Gold1', 'Gold2', 'Gold2', 'Gold2', 'Gold3', 'Gold3'];
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        /**初始化*/
        GameContainer.prototype.onAddToStage = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            GameContainer.thisW = this.stage.stageWidth;
            GameContainer.thisH = this.stage.stageHeight;
            this.initRequest();
            this.getLevelData();
        };
        GameContainer.prototype.initRequest = function () {
            goldman.Http.create()
                .success(this.onRequestSuccess, this)
                .error(this.onRequestError, this)
                .add('')
                .dataFormat(egret.URLLoaderDataFormat.TEXT)
                .post('https://happy.s1.anxinabc.com/api/v1/appconfig'); //也可以是post方法
        };
        GameContainer.prototype.onRequestSuccess = function (data) {
            console.log("==>>>>", data);
        };
        GameContainer.prototype.onRequestError = function () {
        };
        GameContainer.prototype.getLevelData = function () {
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
        };
        /**创建游戏场景*/
        GameContainer.prototype.createGameScene = function () {
            this.gameManager = new goldman.GameManager();
            this.addChild(this.gameManager);
            this.gameManager.setGoalText(this.levelArr[this.currLevel - 1].goal);
            this.gameManager.addEventListener(goldman.GameManager.TRIGGER_START_GO, this.onStartGo, this); //点击勾取
            this.objManager = new goldman.ObjManager();
            this.objManager.addEventListener(goldman.ObjManager.OBJ_MANAGER_EVENT, this.onObjManagerEventHandler, this);
            this.addChild(this.objManager);
            this.objManager.createObjs(this.levelArr[this.currLevel - 1].objsArr);
            this.hookManager = new goldman.HookManager();
            this.hookManager.addEventListener(goldman.HookManager.HOOK_MANAGER_EVENT, this.onHookManagerEventHandler, this);
            this.addChild(this.hookManager);
            this.hookManager.x = GameContainer.thisW / 2;
            this.hookManager.y = 158;
            this.gameOver = new goldman.GameOver();
            this.addEventListener(egret.Event.ENTER_FRAME, this.onGameEnterFrame, this);
            this.createGameTimeInterval();
        };
        GameContainer.prototype.createGameTimeInterval = function () {
            this.levelTimer = new egret.Timer(1000, this.LEVEL_TIME);
            this.levelTimer.addEventListener(egret.TimerEvent.TIMER, this.gameTimerFunc, this);
            this.levelTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.gameTimerComFunc, this);
            this.levelTimer.start();
            this.gameManager.setTimeText(this.LEVEL_TIME);
        };
        GameContainer.prototype.gameTimerFunc = function (e) {
            this.gameManager.setTimeText(this.LEVEL_TIME - e.target.currentCount);
        };
        GameContainer.prototype.gameTimerComFunc = function (e) {
            this.gameManager.setTimeText(this.LEVEL_TIME - e.target.currentCount);
            this.onGameOver();
        };
        GameContainer.prototype.onGameOver = function () {
            console.log("gameOver!!!");
            var that = this;
            that.isOver = true;
            that.objManager.destroy();
            that.removeChild(that.objManager);
            var timeOut = setTimeout(function () {
                //执行事件
                console.log("alert msgbox!!!!!");
                that.addChild(that.gameOver);
                that.gameOver.setScoreText(that.money);
                that.gameOver.addEventListener(goldman.GameOver.CLOSE_GAMEOVER_EVENT, that.onDestroyGameOver, that);
                clearTimeout(timeOut);
            }, that, 500);
        };
        GameContainer.prototype.onDestroyGameOver = function (e) {
            this.gameOver.removeEventListener(goldman.GameOver.CLOSE_GAMEOVER_EVENT, this.onDestroyGameOver, this);
            this.removeChild(this.gameOver);
        };
        GameContainer.prototype.destoryGameScene = function () {
            this.gameManager.destroy();
            this.removeChild(this.gameManager);
            this.objManager.destroy();
            this.removeChild(this.objManager);
            this.hookManager.destroy();
            this.removeChild(this.hookManager);
            this.gameOver.destroy();
            this.removeChild(this.gameOver);
            this.gameManager.removeEventListener(goldman.GameManager.TRIGGER_START_GO, this.onStartGo, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onGameEnterFrame, this);
            this.levelTimer.removeEventListener(egret.TimerEvent.TIMER, this.gameTimerFunc, this);
            this.levelTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.gameTimerComFunc, this);
            this.levelTimer.stop();
            this.levelTimer = null;
        };
        GameContainer.prototype.onGameEnterFrame = function (e) {
            this.hookManager.onUpdateEnterFrame();
        };
        GameContainer.prototype.onObjManagerEventHandler = function (e) {
            var data = (e.data);
            switch (data.type) {
            }
        };
        GameContainer.prototype.onHookManagerEventHandler = function (e) {
            var data = (e.data);
            switch (data.type) {
                case goldman.HookManager.GO_COMPLETE_EVENT:
                    if (this.isOver) {
                        return;
                    }
                    var catchObj = data.catchObj;
                    if (catchObj) {
                        console.log("obj.money " + catchObj.money);
                        this.money += catchObj.money;
                        this.gameManager.setScoreText(this.money);
                    }
                    break;
                case goldman.HookManager.UPDATE_HOOK_POSITION_EVENT:
                    if (!this.hookManager.isBack) {
                        this.checkHookHitObject(data.hookBmp);
                    }
                    break;
            }
        };
        GameContainer.prototype.updateHookBack = function (obj) {
            this.hookManager.setCatchObj(obj);
            this.objManager.removeObj(obj);
            obj.destory();
        };
        GameContainer.prototype.checkHookHitObject = function (hookBmp) {
            var goldsArr = this.objManager.objsArr;
            var me = this;
            for (var i in goldsArr) {
                var obj = goldsArr[i];
                var isHit = goldman.GameUtil.hitTestObjByParentObj(hookBmp, obj, this); //检测钩子和物体是否相撞
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
                    }
                    else {
                        me.hookManager.setHookBackV(obj.backV);
                        var point = me.hookManager.getHookPoint();
                        egret.Tween.get(obj).to({ x: point.x, y: point.y }, 100, egret.Ease.sineIn).call(function () {
                            me.hookManager.setCatchObj(obj);
                            me.objManager.removeObj(obj);
                            obj.destory();
                        });
                    }
                    break;
                }
            }
        };
        GameContainer.prototype.onStartGo = function () {
            this.hookManager.startGo();
        };
        return GameContainer;
    }(egret.Sprite));
    goldman.GameContainer = GameContainer;
    __reflect(GameContainer.prototype, "goldman.GameContainer");
})(goldman || (goldman = {}));
//# sourceMappingURL=GameContainer.js.map