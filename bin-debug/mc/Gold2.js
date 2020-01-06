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
    var Gold2 = (function (_super) {
        __extends(Gold2, _super);
        function Gold2(money, backV) {
            return _super.call(this, "Gold2", money, backV) || this;
        }
        return Gold2;
    }(goldman.Obj));
    goldman.Gold2 = Gold2;
    __reflect(Gold2.prototype, "goldman.Gold2");
})(goldman || (goldman = {}));
//# sourceMappingURL=Gold2.js.map