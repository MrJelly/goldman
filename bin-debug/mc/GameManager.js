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
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        GameManager.prototype.onAddToStage = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        };
        GameManager.prototype.createObjs = function () {
            this.bgBmp = goldman.createBitmapByName("bgall_png");
            this.addChild(this.bgBmp);
            this.heroBmp = goldman.createBitmapByName("hero_png");
            this.addChild(this.heroBmp);
            this.heroBmp.x = 330;
            this.heroBmp.y = 34;
            this.startGoButton = goldman.createBitmapByName("LevelPanel_png");
            this.addChild(this.startGoButton);
            this.startGoButton.x = 235;
            this.startGoButton.y = 1085;
            this.startGoButton.touchEnabled = true;
            this.startGoButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStartGoButton, this);
            this.scoreTextField = new egret.TextField();
            this.addChild(this.scoreTextField);
            this.scoreTextField.x = 203;
            this.scoreTextField.y = 36;
            this.scoreTextField.width = 80;
            //this.scoreTextField.fontFamily = "Arial";
            this.scoreTextField.textColor = 0x693117;
            this.scoreTextField.textAlign = egret.HorizontalAlign.CENTER;
            this.scoreTextField.size = 36;
            this.scoreTextField.text = "0";
            this.goalTextField = new egret.TextField();
            this.addChild(this.goalTextField);
            this.goalTextField.x = 180;
            this.goalTextField.y = 110;
            this.goalTextField.width = 80;
            //this.goalTextField.fontFamily = "Arial";
            this.goalTextField.textColor = 0x693117;
            this.goalTextField.textAlign = egret.HorizontalAlign.CENTER;
            this.goalTextField.size = 36;
            this.goalTextField.text = "0";
            this.timeTextField = new egret.TextField();
            this.addChild(this.timeTextField);
            this.timeTextField.x = 575;
            this.timeTextField.y = 110;
            this.timeTextField.width = 110;
            //this.timeTextField.fontFamily = "Arial";
            this.timeTextField.textColor = 0xffe400;
            this.timeTextField.textAlign = egret.HorizontalAlign.CENTER;
            this.timeTextField.size = 36;
            this.timeTextField.text = "0s";
            // this.levelPanelBmp = goldman.createBitmapByName("LevelPanel");
            // this.addChild(this.levelPanelBmp);
            // this.levelPanelBmp.x = 235;
            // this.levelPanelBmp.y = 1085;
            // this.levelTextField = new egret.TextField();
            // this.addChild(this.levelTextField);
            // this.levelTextField.x = 458;
            // this.levelTextField.y = 1107;
            // this.levelTextField.width = 80;
            // //this.levelTextField.fontFamily = "Arial";
            // this.levelTextField.textColor = 0x1a1a1a;
            // this.levelTextField.textAlign = egret.HorizontalAlign.CENTER;
            // this.levelTextField.size = 60;
            // this.levelTextField.text = "1";
        };
        GameManager.prototype.clickStartGoButton = function (e) {
            this.dispatchEventWith(GameManager.START_GO_EVENT, false);
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
            this.removeChild(this.bgBmp);
            this.removeChild(this.heroBmp);
            this.removeChild(this.scoreTextField);
            this.removeChild(this.goalTextField);
            this.removeChild(this.timeTextField);
            this.removeChild(this.startGoButton);
            this.startGoButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStartGoButton, this);
            this.bgBmp = null;
            this.heroBmp = null;
            this.scoreTextField = null;
            this.goalTextField = null;
            this.timeTextField = null;
            this.startGoButton = null;
        };
        // private levelPanelBmp: egret.Bitmap;
        // private levelTextField: egret.TextField;
        GameManager.LEVEL_MANAGER_EVENT = 'LEVEL_MANAGER_EVENT';
        GameManager.START_GO_EVENT = 'START_GO_EVENT';
        return GameManager;
    }(egret.Sprite));
    goldman.GameManager = GameManager;
    __reflect(GameManager.prototype, "goldman.GameManager");
})(goldman || (goldman = {}));
//# sourceMappingURL=GameManager.js.map