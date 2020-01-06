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
    var Obj = (function (_super) {
        __extends(Obj, _super);
        function Obj(tp, money, backV) {
            var _this = _super.call(this) || this;
            _this.name = (Math.floor(Math.random() * 9999999999)).toString();
            _this._type = tp;
            _this._money = Number(money);
            _this._backV = Number(backV);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        Obj.prototype.onAddToStage = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.objBmp = goldman.createBitmapByName(this._type);
            this.addChild(this.objBmp);
            var oMoneyTextField = new egret.TextField();
            this.addChild(oMoneyTextField);
            oMoneyTextField.textAlign = egret.HorizontalAlign.LEFT;
            oMoneyTextField.textColor = 0x000000;
            oMoneyTextField.width = 22;
            oMoneyTextField.size = 18;
            oMoneyTextField.text = this._money.toString();
        };
        Obj.prototype.overObject = function () {
        };
        Object.defineProperty(Obj.prototype, "money", {
            get: function () {
                return this._money;
            },
            set: function (m) {
                this._money = m;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Obj.prototype, "backV", {
            get: function () {
                return this._backV;
            },
            set: function (m) {
                this._backV = m;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Obj.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (t) {
                this._type = t;
            },
            enumerable: true,
            configurable: true
        });
        Obj.prototype.destory = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            goldman.removeAllchild(this);
        };
        return Obj;
    }(egret.Sprite));
    goldman.Obj = Obj;
    __reflect(Obj.prototype, "goldman.Obj");
})(goldman || (goldman = {}));
//# sourceMappingURL=Obj.js.map