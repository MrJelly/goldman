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
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        /**初始化*/
        GameContainer.prototype.onAddToStage = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            GameContainer.thisW = this.stage.stageWidth;
            GameContainer.thisH = this.stage.stageHeight;
            this.getLevelData();
            console.log("11111111111111111111");
        };
        GameContainer.prototype.getLevelData = function () {
            this.levelArr = RES.getRes("Level_json");
            console.log("==========>>>levelArr", this.levelArr);
            this.createGameScene();
        };
        /**创建游戏场景*/
        GameContainer.prototype.createGameScene = function () {
            this.gameManager = new goldman.GameManager();
            this.gameManager.addEventListener(goldman.GameManager.LEVEL_MANAGER_EVENT, this.onGameManagerEventHandler, this);
            this.gameManager.addEventListener(goldman.GameManager.START_GO_EVENT, this.clickStartGo, this);
            this.addChild(this.gameManager);
            this.gameManager.createObjs();
            this.gameManager.setGoalText(this.levelArr[this.currLevel - 1].goal);
            // this.gameManager.setLevelText(this.currLevel);
            this.objManager = new goldman.ObjManager();
            this.objManager.addEventListener(goldman.ObjManager.OBJ_MANAGER_EVENT, this.onObjManagerEventHandler, this);
            this.addChild(this.objManager);
            this.objManager.createObjs(this.levelArr[this.currLevel - 1].objsArr);
            this.hookManager = new goldman.HookManager();
            this.hookManager.addEventListener(goldman.HookManager.HOOK_MANAGER_EVENT, this.onHookManagerEventHandler, this);
            this.addChild(this.hookManager);
            this.hookManager.x = GameContainer.thisW / 2;
            this.hookManager.y = 158;
            // this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStage, this); //点击勾取
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
            // this.nextLevel();
            this.objManager.destroy();
            this.removeChild(this.objManager);
        };
        GameContainer.prototype.nextLevel = function () {
            console.log("nextLevel");
            this.destoryGameScene();
            this.currLevel++;
            this.createGameScene();
        };
        GameContainer.prototype.destoryGameScene = function () {
            this.gameManager.removeEventListener(goldman.GameManager.START_GO_EVENT, this.clickStartGo, this);
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
        };
        GameContainer.prototype.onGameEnterFrame = function (e) {
            this.hookManager.onUpdateEnterFrame();
        };
        GameContainer.prototype.onGameManagerEventHandler = function (e) {
            var data = (e.data);
            switch (data.type) {
            }
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
                        me.hookManager.setCatchObj(obj);
                        obj.destory();
                    }
                    break;
                }
            }
        };
        GameContainer.prototype.clickStartGo = function (e) {
            console.log("dddddddddddddddd");
            this.hookManager.startGo();
        };
        return GameContainer;
    }(egret.Sprite));
    goldman.GameContainer = GameContainer;
    __reflect(GameContainer.prototype, "goldman.GameContainer");
})(goldman || (goldman = {}));
//# sourceMappingURL=GameContainer.js.map