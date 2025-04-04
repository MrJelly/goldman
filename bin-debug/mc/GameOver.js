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
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        function GameOver() {
            var _this = _super.call(this) || this;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.AddToStage, _this);
            return _this;
        }
        GameOver.prototype.AddToStage = function (e) {
            this.init();
        };
        GameOver.prototype.init = function () {
            this.skinName = "GameOverSkin";
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        };
        GameOver.prototype.setJinText = function (score) {
            this.jinText.text = score.toString();
        };
        GameOver.prototype.setYinText = function (score) {
            this.yinText.text = score.toString();
        };
        GameOver.prototype.destroy = function () {
            this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.removeChild(this.jinText);
            this.removeChild(this.yinText);
            this.removeChild(this.closeBtn);
            this.jinText = null;
            this.yinText = null;
            this.closeBtn = null;
            this.skinName = null;
        };
        GameOver.prototype.onClose = function () {
            this.destroy();
            this.dispatchEventWith(GameOver.CLOSE_GAMEOVER_EVENT, false);
        };
        GameOver.CLOSE_GAMEOVER_EVENT = 'CLOSE_GAMEOVER_EVENT';
        return GameOver;
    }(eui.Component));
    goldman.GameOver = GameOver;
    __reflect(GameOver.prototype, "goldman.GameOver");
})(goldman || (goldman = {}));
//# sourceMappingURL=GameOver.js.map