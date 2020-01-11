var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var goldman;
(function (goldman) {
    var GoldEffectUtils = (function () {
        function GoldEffectUtils() {
        }
        //dir是金币飞到的玩家位置
        GoldEffectUtils.createSeeds = function (type) {
            var goldImg;
            var head;
            if (type == 0) {
                goldImg = goldman.createBitmapByName("yin_animation_png");
                head = { x: 405, y: 50 };
            }
            else if (type == 1) {
                goldImg = goldman.createBitmapByName("jin_animation_png");
                head = { x: 160, y: 50 };
            }
            goldman.GameManager.getInstance().GameStage.addChild(goldImg);
            var goldX = goldman.GameManager.getInstance().GameStage_width / 2 - goldImg.width / 2;
            var goldY = 330;
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
            egret.Tween.get(goldImg).wait(randomTime)
                .to({ y: 420, alpha: 1 }, 300, egret.Ease.sineIn)
                .wait(100)
                .to({ x: head.x, y: head.y, alpha: 1 }, tweenTime, egret.Ease.sineOut)
                .call(onComplete1, this);
        };
        GoldEffectUtils.showTips = function (str, isWarning) {
            if (str === void 0) { str = ""; }
            if (isWarning === void 0) { isWarning = false; }
            var effectTips = new egret.TextField();
            effectTips.size = 36;
            effectTips.y = 300;
            if (isWarning) {
                effectTips.textColor = 0xffcd43;
            }
            else {
                effectTips.textColor = 0xffcd43;
            }
            effectTips.alpha = 0;
            effectTips.text = str;
            effectTips.strokeColor = 0xe8604e;
            effectTips.x = goldman.GameManager.getInstance().GameStage_width / 2 + 50;
            effectTips.stroke = 2;
            effectTips.textAlign = egret.HorizontalAlign.CENTER;
            if (!goldman.GameManager.getInstance().GameStage.contains(effectTips)) {
                goldman.GameManager.getInstance().GameStage.addChild(effectTips);
            }
            effectTips.anchorOffsetX = effectTips.width / 2;
            effectTips.anchorOffsetY = effectTips.height / 2;
            effectTips.scaleX = 0;
            effectTips.scaleY = 0;
            var onComplete = function () {
                if (goldman.GameManager.getInstance().GameStage.contains(effectTips)) {
                    goldman.GameManager.getInstance().GameStage.removeChild(effectTips);
                    effectTips = null;
                }
            };
            egret.Tween.get(effectTips).to({ scaleX: 1.3, scaleY: 1.3, alpha: 1 }, 200).wait(200)
                .to({ y: 0, alpha: 0 }, 600, egret.Ease.sineOut).call(onComplete, this);
        };
        return GoldEffectUtils;
    }());
    goldman.GoldEffectUtils = GoldEffectUtils;
    __reflect(GoldEffectUtils.prototype, "goldman.GoldEffectUtils");
})(goldman || (goldman = {}));
//# sourceMappingURL=GoldEffect.js.map