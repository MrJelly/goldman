module goldman {
    export class Msgbox extends egret.Sprite {
        private bgBmp: egret.Bitmap;
        private scoreTextField: egret.TextField;
        private closeBtn: egret.Shape;
        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        private onAddToStage(e: egret.Event): void {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.init();
        }
        private init() {
            console.log("444444444444")
            this.bgBmp = goldman.createBitmapByName("msgboxbg_png");
            this.addChild(this.bgBmp);
            this.bgBmp.x = 180
            this.bgBmp.y = 110
            this.bgBmp.width = 200
            this.bgBmp.height = 200
            this.bgBmp.alpha = 0.4;

            this.scoreTextField = new egret.TextField();
            this.addChild(this.scoreTextField);
            this.scoreTextField.x = 203;
            this.scoreTextField.y = 36;
            this.scoreTextField.width = 80;
            this.scoreTextField.textColor = 0x693117;
            this.scoreTextField.textAlign = egret.HorizontalAlign.CENTER;
            this.scoreTextField.size = 36;
            this.scoreTextField.text = "0";

            this.closeBtn = new egret.Shape();
            this.closeBtn.graphics.beginFill(0xf7acbc);
            this.closeBtn.graphics.drawRect(0, 0, 200, 50);
            this.closeBtn.graphics.endFill();
            this.closeBtn.touchEnabled = true;
            this.closeBtn.x = 50;
            this.closeBtn.y = 50;
            this.addChild(this.closeBtn);
            this.closeBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onClose, this );
        }
        /**
         * setScoreText
         */
        public setScoreText(score: number) {
            console.log("setScoreText")
            this.scoreTextField.text = score.toString();
        }
        public destroy(): void {
            this.removeChild(this.bgBmp);
            this.removeChild(this.scoreTextField);
            this.bgBmp = null;
            this.scoreTextField = null;
        }
        public onClose() {
            this.destroy();
        }
    }
}