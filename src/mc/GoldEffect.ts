namespace goldman {
  export class GoldEffectUtils {
    //dir是金币飞到的玩家位置
    static createImg(): void {
      var goldImg = createBitmapByName("coin_png");
      GameManager.getInstance().GameStage.addChild(goldImg);
      var goldX = GameManager.getInstance().GameStage_width / 2 - goldImg.width / 2;
      var goldY = 250;
      var tweenTime = 600;
      var randomNum = Math.round((Math.random() * 40 + 1));//随机增减xy值（使得金币看起来是散乱的）
      var randomTime = Math.floor((100 - 200 + 1) * Math.random() + 100)
      var randomFlag = Math.round((Math.random() * 4 + 1));//四个标记
      if (randomFlag == 1) {
        goldX = goldX - randomNum;
        goldY = goldY + randomNum;
      } else if (randomFlag == 2) {
        goldX = goldX + randomNum;
        goldY = goldY - randomNum;
      } else if (randomFlag == 3) {
        goldX = goldX + randomNum;
        goldY = goldY + randomNum;
      } else if (randomFlag == 4) {
        goldX = goldX - randomNum;
        goldY = goldY - randomNum;
      }
      goldImg.x = goldX;
      goldImg.y = goldY;

      var onComplete2: Function = function () {
        if (GameManager.getInstance().GameStage.contains(goldImg)) {
          GameManager.getInstance().GameStage.removeChild(goldImg);//清空金币
          goldImg = null;
        }
      };

      var onComplete1: Function = function () {
        egret.Tween.get(goldImg).to({ alpha: 0 }, 500).call(onComplete2, this);//隐藏金币
      };
      goldImg.visible = true;

      var head = { x: 210, y: 40 };
      egret.Tween.get(goldImg).wait(randomTime)
        .to({ y: 300, alpha: 1 }, 300, egret.Ease.sineIn)
        .wait(100)
        .to({ x: head.x, y: head.y, alpha: 1 }, tweenTime, egret.Ease.sineOut)
        .call(onComplete1, this);
    }


    static showTips(str: string = "", isWarning: boolean = false): void {
      var effectTips = new egret.TextField();

      effectTips.size = 36;
      effectTips.y = 300;
      if (isWarning) {
        effectTips.textColor = 0xffcd43;
      } else {
        effectTips.textColor = 0xffcd43;
      }
      effectTips.alpha = 0;

      effectTips.text = str;
      effectTips.strokeColor = 0xe8604e;
      effectTips.x = GameManager.getInstance().GameStage_width / 2 + 50;
      effectTips.stroke = 2;
      effectTips.textAlign = egret.HorizontalAlign.CENTER;

      if (!GameManager.getInstance().GameStage.contains(effectTips)) {
        GameManager.getInstance().GameStage.addChild(effectTips);
      }

      effectTips.anchorOffsetX = effectTips.width / 2;
      effectTips.anchorOffsetY = effectTips.height / 2;
      effectTips.scaleX = 0;
      effectTips.scaleY = 0;

      var onComplete: Function = function () {
        if (GameManager.getInstance().GameStage.contains(effectTips)) {
          GameManager.getInstance().GameStage.removeChild(effectTips);
          effectTips = null;
        }
      };
      egret.Tween.get(effectTips).to({ scaleX: 1.3, scaleY: 1.3, alpha: 1 }, 200).wait(200)
      .to({ y: 0, alpha: 0 }, 600, egret.Ease.sineOut).call(onComplete, this);
    }
  }
}