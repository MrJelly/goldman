var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var goldman;
(function (goldman) {
    var GameManager = (function () {
        function GameManager() {
            this.score = 0;
            this.goal = 100;
            this.missionArr = [];
            this.LEVEL_TIME = 60;
            this.isOver = false;
        }
        GameManager.getInstance = function () {
            if (this._instance == null) {
                this._instance = new GameManager();
            }
            return this._instance;
        };
        GameManager.prototype.initGame = function () {
            this.missionArr = RES.getRes("mission_json");
            this.gameScene = new goldman.GameScene();
            this.GameStage.addChild(this.gameScene);
            this.gameScene.setGoalText(this.goal);
            // this.gameScene.addEventListener(GameScene.TRIGGER_START_GO, this.onStartGo, this); //点击勾取
            this.objManager = new goldman.ObjManager();
            this.GameStage.addChild(this.objManager);
            this.objManager.createObjs(this.missionArr);
            this.hookManager = new goldman.HookManager();
            this.hookManager.addEventListener(goldman.HookManager.HOOK_MANAGER_EVENT, this.onHookManagerEventHandler, this);
            this.GameStage.addChild(this.hookManager);
            this.hookManager.x = this.GameStage_width / 2;
            this.hookManager.y = 158;
            this.gameOver = new goldman.GameOver();
            this.GameStage.addEventListener(egret.Event.ENTER_FRAME, this.onGameEnterFrame, this);
            this.createGameTimeInterval();
        };
        GameManager.prototype.createGameTimeInterval = function () {
            this.levelTimer = new egret.Timer(1000, this.LEVEL_TIME);
            this.levelTimer.addEventListener(egret.TimerEvent.TIMER, this.gameTimerFunc, this);
            this.levelTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.gameTimerComFunc, this);
            this.levelTimer.start();
            this.gameScene.setTimeText(this.LEVEL_TIME);
        };
        GameManager.prototype.gameTimerFunc = function (e) {
            var leftTime = this.LEVEL_TIME - e.target.currentCount;
            this.gameScene.setTimeText(leftTime);
            if (leftTime == 10) {
                goldman.SoundManager.getInstance().PlayLastSound();
            }
        };
        GameManager.prototype.gameTimerComFunc = function (e) {
            this.gameScene.setTimeText(this.LEVEL_TIME - e.target.currentCount);
            this.onGameOver();
        };
        GameManager.prototype.onGameOver = function () {
            console.log("gameOver!!!");
            var that = this;
            that.isOver = true;
            that.objManager.destroy();
            that.GameStage.removeChild(that.objManager);
            var timeHandle = setTimeout(function () {
                //执行事件
                console.log("alert msgbox!!!!!");
                that.GameStage.addChild(that.gameOver);
                that.gameOver.setScoreText(that.score);
                that.gameOver.addEventListener(goldman.GameOver.CLOSE_GAMEOVER_EVENT, that.onDestroyGameOver, that);
                clearTimeout(timeHandle);
            }, that, 500);
        };
        GameManager.prototype.onDestroyGameOver = function (e) {
            this.gameOver.removeEventListener(goldman.GameOver.CLOSE_GAMEOVER_EVENT, this.onDestroyGameOver, this);
            this.GameStage.removeChild(this.gameOver);
        };
        GameManager.prototype.destoryGameScene = function () {
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
        };
        GameManager.prototype.onGameEnterFrame = function (e) {
            this.hookManager.onUpdateEnterFrame();
        };
        GameManager.prototype.onHookManagerEventHandler = function (e) {
            var data = (e.data);
            switch (data.type) {
                case goldman.HookManager.GO_COMPLETE_EVENT:
                    if (this.isOver) {
                        return;
                    }
                    var catchObj = data.catchObj;
                    if (catchObj) {
                        console.log("obj.score " + catchObj.score);
                        this.score += catchObj.score;
                        this.gameScene.setScoreText(this.score);
                        goldman.GoldEffectUtils.showTips(catchObj.score.toString(), false);
                        for (var i = 0; i < 3; i++) {
                            goldman.GoldEffectUtils.createImg();
                        }
                    }
                    break;
                case goldman.HookManager.UPDATE_HOOK_POSITION_EVENT:
                    if (!this.hookManager.isBack) {
                        this.checkHookHitObject(data.hookBmp);
                    }
                    break;
            }
        };
        GameManager.prototype.updateHookBack = function (obj) {
            this.hookManager.setCatchObj(obj);
            this.objManager.removeObj(obj);
            obj.destory();
        };
        GameManager.prototype.checkHookHitObject = function (hookBmp) {
            var goldsArr = this.objManager.objsArr;
            var me = this;
            for (var i in goldsArr) {
                var obj = goldsArr[i];
                var isHit = goldman.GameUtil.hitTestObjByParentObj(hookBmp, obj, this.GameStage); //检测钩子和物体是否相撞
                if (isHit) {
                    if (obj.type == "TNT") {
                        me.hookManager.setHookBackV(0);
                        me.objManager.removeObjsAtAreaByHitObj(obj);
                        setTimeout(function () {
                            me.hookManager.setHookBackV(obj.speed);
                            me.hookManager.setCatchObj(obj);
                            obj.destory();
                        }, 300);
                    }
                    else {
                        me.hookManager.setHookBackV(obj.speed);
                        me.hookManager.setCatchObj(obj);
                        me.objManager.removeObj(obj);
                        obj.destory();
                        // let point = me.hookManager.getHookPoint()
                    }
                    break;
                }
            }
        };
        GameManager.prototype.onStartGo = function () {
            this.hookManager.startGo();
        };
        return GameManager;
    }());
    goldman.GameManager = GameManager;
    __reflect(GameManager.prototype, "goldman.GameManager");
})(goldman || (goldman = {}));
//# sourceMappingURL=GameManager.js.map