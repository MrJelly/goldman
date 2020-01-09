var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var goldman;
(function (goldman) {
    var GoldEffectUtils = (function () {
        function GoldEffectUtils() {
        }
        //dir是金币飞到的玩家位置
        GoldEffectUtils.createImg = function () {
            var goldImg = goldman.createBitmapByName("coin_png");
            goldman.GameManager.getInstance().GameStage.addChild(goldImg); //游戏层添加金币（自己决定）
            var goldX = goldman.GameManager.getInstance().GameStage_width / 2 - goldImg.width / 2;
            var goldY = 200;
            var tweenTime = 600;
            var randomNum = Math.round((Math.random() * 40 + 1)); //随机增减xy值（使得金币看起来是散乱的）
            var randomTime = Math.floor((100 - 200 + 1) * Math.random() + 100);
            var randomFlag = Math.round((Math.random() * 4 + 1)); //四个标记
            if (randomFlag == 1) {
                goldX = goldX - randomNum;
                goldY = goldY + randomNum;
            }
            else if (randomFlag == 2) {
                goldX = goldX + randomNum;
                goldY = goldY - randomNum;
            }
            else if (randomFlag == 3) {
                goldX = goldX + randomNum;
                goldY = goldY + randomNum;
            }
            else if (randomFlag == 4) {
                goldX = goldX - randomNum;
                goldY = goldY - randomNum;
            }
            goldImg.x = goldX;
            goldImg.y = goldY;
            var onComplete2 = function () {
                if (goldman.GameManager.getInstance().GameStage.contains(goldImg)) {
                    goldman.GameManager.getInstance().GameStage.removeChild(goldImg); //清空金币
                    goldImg = null;
                }
            };
            var onComplete1 = function () {
                egret.Tween.get(goldImg).to({ alpha: 0 }, 500).call(onComplete2, this); //隐藏金币
            };
            goldImg.visible = true;
            var head = { x: 210, y: 40 };
            egret.Tween.get(goldImg).wait(randomTime)
                .to({ y: 300, alpha: 1 }, 300, egret.Ease.sineIn)
                .wait(100)
                .to({ x: head.x, y: head.y, alpha: 1 }, tweenTime, egret.Ease.sineOut)
                .call(onComplete1, this);
        };
        return GoldEffectUtils;
    }());
    goldman.GoldEffectUtils = GoldEffectUtils;
    __reflect(GoldEffectUtils.prototype, "goldman.GoldEffectUtils");
})(goldman || (goldman = {}));
//# sourceMappingURL=GoldEffect.js.map