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
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
            var _this = _super.call(this) || this;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.AddToStage, _this);
            return _this;
        }
        GameScene.prototype.AddToStage = function (e) {
            this.init();
        };
        GameScene.prototype.init = function () {
            this.skinName = "GameSceneSkin";
            this.touchEnabled = true;
            this.gameArea.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStartGo, this);
            if (goldman.SoundManager.getInstance().IsSound) {
                this.checkbox.selected = true;
                goldman.SoundManager.getInstance().PlayBGM();
            }
            else {
                this.checkbox.selected = false;
            }
            this.checkbox.addEventListener(egret.Event.CHANGE, this.changeSound, this);
        };
        GameScene.prototype.changeSound = function (e) {
            if (this.checkbox.selected) {
                goldman.SoundManager.getInstance().IsSound = true;
                goldman.SoundManager.getInstance().PlayBGM();
            }
            else {
                goldman.SoundManager.getInstance().IsSound = false;
                goldman.SoundManager.getInstance().StopBGM();
            }
        };
        GameScene.prototype.clickStartGo = function (e) {
            goldman.GameManager.getInstance().onStartGo();
        };
        GameScene.prototype.setYinScoreText = function (score) {
            this.yinTextField.text = score.toString();
        };
        GameScene.prototype.setJinScoreText = function (score) {
            this.jinTextField.text = score.toString();
        };
        GameScene.prototype.setTimeText = function (time) {
            this.timeTextField.text = time.toString();
        };
        GameScene.prototype.destroy = function () {
            this.checkbox.removeEventListener(egret.Event.CHANGE, this.changeSound, this);
            this.gameArea.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStartGo, this);
            this.removeChild(this.jinTextField);
            this.removeChild(this.yinTextField);
            this.removeChild(this.timeTextField);
            this.removeChild(this.checkbox);
            this.removeChild(this.gameArea);
            this.jinTextField = null;
            this.yinTextField = null;
            this.timeTextField = null;
            this.checkbox = null;
            this.gameArea = null;
        };
        return GameScene;
    }(eui.Component));
    goldman.GameScene = GameScene;
    __reflect(GameScene.prototype, "goldman.GameScene");
})(goldman || (goldman = {}));
//# sourceMappingURL=GameScene.js.map