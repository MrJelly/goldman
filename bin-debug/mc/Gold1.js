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
    var Gold1 = (function (_super) {
        __extends(Gold1, _super);
        function Gold1(money, backV) {
            return _super.call(this, "Gold1", money, backV) || this;
        }
        return Gold1;
    }(goldman.Obj));
    goldman.Gold1 = Gold1;
    __reflect(Gold1.prototype, "goldman.Gold1");
})(goldman || (goldman = {}));
//# sourceMappingURL=Gold1.js.map