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
    var BombBtn = (function (_super) {
        __extends(BombBtn, _super);
        function BombBtn() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        //todo 炸弹按钮
        BombBtn.prototype.onAddToStage = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        };
        return BombBtn;
    }(egret.Sprite));
    goldman.BombBtn = BombBtn;
    __reflect(BombBtn.prototype, "goldman.BombBtn");
})(goldman || (goldman = {}));
//# sourceMappingURL=BombBtn.js.map