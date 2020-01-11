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
    var Seeds = (function () {
        function Seeds() {
        }
        return Seeds;
    }());
    __reflect(Seeds.prototype, "Seeds");
    var Obj = (function (_super) {
        __extends(Obj, _super);
        function Obj(op) {
            var _this = _super.call(this) || this;
            _this._seeds = op;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        Obj.prototype.onAddToStage = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.objBmp = goldman.createBitmapByName(this._seeds.image);
            this.addChild(this.objBmp);
            this.x = this._seeds.posX;
            this.y = this._seeds.posY;
            // var oMoneyTextField = new egret.TextField();
            // this.addChild(oMoneyTextField);
            // oMoneyTextField.textAlign = egret.HorizontalAlign.LEFT;
            // oMoneyTextField.textColor = 0xffffff;
            // oMoneyTextField.width = 22;
            // oMoneyTextField.size = 18;
            // oMoneyTextField.text = this._seeds.score.toString();
        };
        Obj.prototype.removeFromParent = function () {
            this.parent.removeChild(this);
        };
        Object.defineProperty(Obj.prototype, "score", {
            get: function () {
                return this._seeds.score;
            },
            set: function (m) {
                this._seeds.score = m;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Obj.prototype, "speed", {
            get: function () {
                return this._seeds.speed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Obj.prototype, "image", {
            get: function () {
                return this._seeds.image;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Obj.prototype, "type", {
            get: function () {
                return this._seeds.type;
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