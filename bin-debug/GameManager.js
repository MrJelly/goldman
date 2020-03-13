var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var goldman;
(function (goldman) {
    var GameManager = (function () {
        function GameManager() {
            this.missionArr = [];
            this.LEVEL_TIME = 60;
            this.jinScore = 0;
            this.yinScore = 0;
            this.isOver = false;
        }
        GameManager.getInstance = function () {
            if (this._instance == null) {
                this._instance = new GameManager();
            }
            return this._instance;
        };
        GameManager.prototype.initGame = function () {
            egret.ImageLoader.crossOrigin = "anonymous"; //解决跨域问题
            this.initRequest();
            this.missionArr = RES.getRes("mission_json");
            this.gameScene = new goldman.GameScene();
            this.GameStage.addChild(this.gameScene);
            // this.gameScene.addEventListener(GameScene.TRIGGER_START_GO, this.onStartGo, this); //点击勾取
            this.objManager = new goldman.ObjManager();
            this.GameStage.addChild(this.objManager);
            this.objManager.createObjs(this.missionArr);
            this.hookManager = new goldman.HookManager();
            this.hookManager.addEventListener(goldman.HookManager.HOOK_MANAGER_EVENT, this.onHookManagerEventHandler, this);
            this.GameStage.addChild(this.hookManager);
            this.hookManager.x = this.GameStage_width / 2;
            this.hookManager.y = 330;
            this.gameOver = new goldman.GameOver();
            this.createUserData();
            // this.initUserData();
            this.GameStage.addEventListener(egret.Event.ENTER_FRAME, this.onGameEnterFrame, this);
            this.createGameTimeInterval();
        };
        GameManager.prototype.initUserData = function () {
            var url = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582977071549&di=679926970324b1383796ee137203125f&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg";
            // this.gameScene.setUserIcon(url);
        };
        GameManager.prototype.createUserData = function () {
            var self = this;
            var url = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582977071549&di=679926970324b1383796ee137203125f&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg";
            var imgLoader = new egret.ImageLoader();
            imgLoader.once(egret.Event.COMPLETE, function (evt) {
                if (evt.currentTarget.data) {
                    egret.log("加载头像成功: " + evt.currentTarget.data);
                    // 创建一个容器
                    var container = new egret.DisplayObjectContainer();
                    var texture = new egret.Texture();
                    texture.bitmapData = evt.currentTarget.data;
                    var bitmap = new egret.Bitmap(texture);
                    // 将头像放到容器内
                    container.addChild(bitmap);
                    var renderTexture = new egret.RenderTexture();
                    // 将容器绘制成纹理
                    renderTexture.drawToTexture(container);
                    // 将纹理赋给头像组件
                    var headicon = new egret.Bitmap(renderTexture);
                    self.GameStage.addChild(headicon);
                    headicon.width = 100;
                    headicon.height = 100;
                    headicon.x = 325;
                    headicon.y = 228;
                    // self.headicon.source = renderTexture;//赋给Image组件
                    // 释放纹理
                    bitmap.texture.dispose();
                    bitmap = null;
                    var circle = new egret.Shape();
                    circle.graphics.beginFill(0x000000);
                    circle.x = 325;
                    circle.y = 228;
                    circle.graphics.drawCircle(50, 50, 50);
                    circle.graphics.endFill();
                    this.GameStage.addChild(circle);
                    headicon.mask = circle;
                }
            }, this);
            imgLoader.once(egret.IOErrorEvent.IO_ERROR, function (evt) {
                egret.log("加载头像失败");
            }, this);
            imgLoader.load(url.replace(/[\\]/g, '')); // 去除链接中的转义字符‘\’[/mw_shl_code]
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
            var that = this;
            that.isOver = true;
            that.objManager.destroy();
            that.GameStage.removeChild(that.objManager);
            var timeHandle = setTimeout(function () {
                //执行事件
                that.GameStage.addChild(that.gameOver);
                that.gameOver.setJinText(that.jinScore);
                that.gameOver.setYinText(that.yinScore);
                // that.initRequest()
                that.gameOver.addEventListener(goldman.GameOver.CLOSE_GAMEOVER_EVENT, that.onDestroyGameOver, that);
                clearTimeout(timeHandle);
            }, that, 500);
        };
        GameManager.prototype.onDestroyGameOver = function (e) {
            this.gameOver.removeEventListener(goldman.GameOver.CLOSE_GAMEOVER_EVENT, this.onDestroyGameOver, this);
            this.GameStage.removeChild(this.gameOver);
        };
        GameManager.prototype.initRequest = function () {
            goldman.Http.create()
                .success(this.onRequestSuccess, this)
                .error(this.onRequestError, this)
                .add("x=ssss")
                .dataFormat(egret.URLLoaderDataFormat.TEXT)
                .post('api/v1/auth/me'); //也可以是post方法
        };
        GameManager.prototype.onRequestSuccess = function (data) {
            console.log("==>>>>", data);
        };
        GameManager.prototype.onRequestError = function () {
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
                        if (catchObj.type == 0) {
                            this.yinScore += catchObj.score;
                            this.gameScene.setYinScoreText(this.yinScore);
                        }
                        else if (catchObj.type == 1) {
                            this.jinScore += catchObj.score;
                            this.gameScene.setJinScoreText(this.jinScore);
                        }
                        for (var i = 0; i < catchObj.score / 10; i++) {
                            goldman.GoldEffectUtils.createSeeds(catchObj.type);
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
                    me.hookManager.setHookBackV(obj.speed);
                    me.hookManager.setCatchObj(obj);
                    me.objManager.removeObj(obj);
                    obj.destory();
                    // let point = me.hookManager.getHookPoint()
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