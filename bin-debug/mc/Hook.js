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
//钩子
var goldman;
(function (goldman) {
    var Hook = (function (_super) {
        __extends(Hook, _super);
        function Hook() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        Hook.prototype.onAddToStage = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.line = new egret.Shape();
            this.addChild(this.line);
            this._hookBmp = goldman.createBitmapByName("hook_png");
            this.addChild(this._hookBmp);
        };
        Hook.prototype.setBackHookType = function (typeStr) {
            if (typeStr === void 0) { typeStr = ""; }
            if (typeStr) {
                this._backHookBmp = goldman.createBitmapByName(typeStr + "_Back");
                this.addChild(this._backHookBmp);
                this._backHookBmp.x = this._hookBmp.x;
                this._backHookBmp.y = this._hookBmp.y;
                this._hookBmp.visible = false;
            }
            else {
                if (this._backHookBmp && this.contains(this._backHookBmp)) {
                    this.removeChild(this._backHookBmp);
                    this._backHookBmp = null;
                }
                this._hookBmp.visible = true;
            }
        };
        Hook.prototype.redrawHook = function (lineHeight) {
            if (lineHeight === void 0) { lineHeight = 0; }
            this._hookBmp.y = lineHeight;
            this.line.graphics.clear();
            this.line.graphics.lineStyle(3, 0x3c3841);
            this.line.graphics.moveTo(0, 0);
            this.line.graphics.lineTo(0, lineHeight);
            this.line.graphics.endFill();
            //绳子上的小点 模拟铁链
            for (var i = 10; i <= lineHeight; i += 10) {
                this.line.graphics.beginFill(0x3c3841);
                this.line.graphics.drawCircle(0, i, 2);
                this.line.graphics.endFill();
            }
            this._hookBmp.x = -this._hookBmp.width / 2;
            if (this._backHookBmp) {
                this._backHookBmp.y = lineHeight;
                this._backHookBmp.x = -this._backHookBmp.width / 2;
            }
        };
        Object.defineProperty(Hook.prototype, "hookBmp", {
            get: function () {
                return this._hookBmp;
            },
            enumerable: true,
            configurable: true
        });
        Hook.prototype.destroy = function () {
            this.removeChild(this.line);
            this.line = null;
            this.removeChild(this._hookBmp);
            this._hookBmp = null;
            if (this._backHookBmp && this.contains(this._backHookBmp)) {
                this.removeChild(this._backHookBmp);
                this._backHookBmp = null;
            }
        };
        return Hook;
    }(egret.Sprite));
    goldman.Hook = Hook;
    __reflect(Hook.prototype, "goldman.Hook");
})(goldman || (goldman = {}));
//# sourceMappingURL=Hook.js.map