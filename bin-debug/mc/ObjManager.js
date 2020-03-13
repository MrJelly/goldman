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
    var ObjManager = (function (_super) {
        __extends(ObjManager, _super);
        function ObjManager() {
            var _this = _super.call(this) || this;
            _this._objsArr = [];
            return _this;
        }
        ObjManager.prototype.createObjs = function (objDatas) {
            for (var i = 0; i < objDatas.length; i++) {
                var objData = objDatas[i];
                var obj = new goldman.Obj(objData);
                this._objsArr.push(obj);
                this.addChild(obj);
            }
        };
        Object.defineProperty(ObjManager.prototype, "objsArr", {
            get: function () {
                return this._objsArr;
            },
            enumerable: true,
            configurable: true
        });
        ObjManager.prototype.removeObj = function (obj) {
            var currHookObj = this._objsArr.splice(this._objsArr.indexOf(obj), 1)[0];
            this.removeChild(currHookObj);
            return currHookObj;
        };
        ObjManager.prototype.destroy = function () {
            for (var i in this._objsArr) {
                var o = this._objsArr[i];
                this.removeChild(o);
                o.destory();
            }
            this._objsArr = [];
        };
        ObjManager.OBJ_MANAGER_EVENT = 'OBJ_MANAGER_EVENT';
        return ObjManager;
    }(egret.Sprite));
    goldman.ObjManager = ObjManager;
    __reflect(ObjManager.prototype, "goldman.ObjManager");
})(goldman || (goldman = {}));
//# sourceMappingURL=ObjManager.js.map