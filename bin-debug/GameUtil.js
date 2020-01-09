var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var goldman;
(function (goldman) {
    var GameUtil = (function () {
        function GameUtil() {
        }
        /**基于矩形的碰撞检测*/
        GameUtil.hitTestObjByParentObj = function (obj1, obj2, commonParentObj) {
            var rect1 = obj1.getTransformedBounds(commonParentObj);
            var rect2 = obj2.getTransformedBounds(commonParentObj);
            return rect1.intersects(rect2);
        };
        return GameUtil;
    }());
    goldman.GameUtil = GameUtil;
    __reflect(GameUtil.prototype, "goldman.GameUtil");
    goldman.baseUrl = "http://";
    goldman.sounds = {
        pull: "pull_mp3",
        bg: "level-bg_mp3"
    };
    /**
     * 根据名称获取位图资源
     */
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    goldman.createBitmapByName = createBitmapByName;
    function removeAllchild(diso) {
        while (diso.numChildren) {
            diso.removeChildAt(0);
        }
    }
    goldman.removeAllchild = removeAllchild;
})(goldman || (goldman = {}));
//# sourceMappingURL=GameUtil.js.map