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
    var Gold3 = (function (_super) {
        __extends(Gold3, _super);
        function Gold3(money, backV) {
            return _super.call(this, "Gold3", money, backV) || this;
        }
        return Gold3;
    }(goldman.Obj));
    goldman.Gold3 = Gold3;
    __reflect(Gold3.prototype, "goldman.Gold3");
})(goldman || (goldman = {}));
//# sourceMappingURL=Gold3.js.map