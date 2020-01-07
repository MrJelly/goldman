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
    var Msgbox = (function (_super) {
        __extends(Msgbox, _super);
        function Msgbox() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        Msgbox.prototype.onAddToStage = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.init();
        };
        Msgbox.prototype.init = function () {
            console.log("444444444444");
            this.bgBmp = goldman.createBitmapByName("msgboxbg_png");
            this.addChild(this.bgBmp);
            this.bgBmp.x = 180;
            this.bgBmp.y = 110;
            this.bgBmp.width = 200;
            this.bgBmp.height = 200;
            this.bgBmp.alpha = 0.4;
            this.scoreTextField = new egret.TextField();
            this.addChild(this.scoreTextField);
            this.scoreTextField.x = 203;
            this.scoreTextField.y = 36;
            this.scoreTextField.width = 80;
            this.scoreTextField.textColor = 0x693117;
            this.scoreTextField.textAlign = egret.HorizontalAlign.CENTER;
            this.scoreTextField.size = 36;
            this.scoreTextField.text = "0";
            this.closeBtn = new egret.Shape();
            this.closeBtn.graphics.beginFill(0xf7acbc);
            this.closeBtn.graphics.drawRect(0, 0, 200, 50);
            this.closeBtn.graphics.endFill();
            this.closeBtn.touchEnabled = true;
            this.closeBtn.x = 50;
            this.closeBtn.y = 50;
            this.addChild(this.closeBtn);
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        };
        /**
         * setScoreText
         */
        Msgbox.prototype.setScoreText = function (score) {
            console.log("setScoreText");
            this.scoreTextField.text = score.toString();
        };
        Msgbox.prototype.destroy = function () {
            this.removeChild(this.bgBmp);
            this.removeChild(this.scoreTextField);
            this.bgBmp = null;
            this.scoreTextField = null;
        };
        Msgbox.prototype.onClose = function () {
            this.destroy();
        };
        return Msgbox;
    }(egret.Sprite));
    goldman.Msgbox = Msgbox;
    __reflect(Msgbox.prototype, "goldman.Msgbox");
})(goldman || (goldman = {}));
//# sourceMappingURL=Msgbox.js.map