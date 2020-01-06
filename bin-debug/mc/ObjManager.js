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
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        ObjManager.prototype.onAddToStage = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.objsConfig = RES.getRes("objsConfig_json");
            console.log("=========>", this.objsConfig);
        };
        ObjManager.prototype.createObjs = function (objDatas) {
            for (var i = 0; i < objDatas.length; i++) {
                var objData = objDatas[i];
                var ty = objData.name;
                var money = this.objsConfig[ty].money;
                var backV = this.objsConfig[ty].backV;
                var oClass = egret.getDefinitionByName("goldman." + ty);
                var obj = new oClass(money, backV);
                obj.x = objData.x;
                obj.y = objData.y;
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
        //移除一定范围内的物体
        ObjManager.prototype.removeObjsAtAreaByHitObj = function (hitObj) {
            if (hitObj.type == "TNT") {
                var removeObjsArr = [];
                for (var i in this._objsArr) {
                    var o = this._objsArr[i];
                    if (o !== hitObj) {
                        var oPoint = new egret.Point(o.x + o.width / 2, o.y + o.height / 2);
                        var hPoint = new egret.Point(hitObj.x + o.width / 2, hitObj.y + o.height / 2);
                        var distance = egret.Point.distance(oPoint, hPoint);
                        if (distance <= 200) {
                            removeObjsArr.push(o);
                        }
                    }
                }
                for (var i in removeObjsArr) {
                    var o = removeObjsArr[i];
                    o.destory();
                    this.removeObj(o);
                }
            }
        };
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