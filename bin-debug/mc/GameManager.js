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
    var GameManager = (function (_super) {
        __extends(GameManager, _super);
        function GameManager() {
            var _this = _super.call(this) || this;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.AddToStage, _this);
            return _this;
        }
        GameManager.prototype.AddToStage = function (e) {
            console.log("AddToStage");
            this.init();
        };
        GameManager.prototype.init = function () {
            console.log("GameSceneSkin");
            this.skinName = "GameSceneSkin";
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStartGo, this);
        };
        GameManager.prototype.clickStartGo = function (e) {
            this.dispatchEventWith(GameManager.TRIGGER_START_GO, false);
        };
        GameManager.prototype.setScoreText = function (score) {
            this.scoreTextField.text = score.toString();
        };
        GameManager.prototype.setGoalText = function (goalScore) {
            this.goalTextField.text = goalScore.toString();
        };
        GameManager.prototype.setTimeText = function (time) {
            this.timeTextField.text = time + "s";
        };
        GameManager.prototype.destroy = function () {
            this.removeChild(this.scoreTextField);
            this.removeChild(this.goalTextField);
            this.removeChild(this.timeTextField);
            this.scoreTextField = null;
            this.goalTextField = null;
            this.timeTextField = null;
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStartGo, this);
        };
        GameManager.TRIGGER_START_GO = 'TRIGGER_START_GO';
        return GameManager;
    }(eui.Component));
    goldman.GameManager = GameManager;
    __reflect(GameManager.prototype, "goldman.GameManager");
})(goldman || (goldman = {}));
//# sourceMappingURL=GameManager.js.map