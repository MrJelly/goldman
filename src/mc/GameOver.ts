module goldman {
    export class GameOver extends eui.Component {

        private jinText: eui.Label;
        private yinText: eui.Label;
        private closeBtn: eui.Image;
        public static CLOSE_GAMEOVER_EVENT: string = 'CLOSE_GAMEOVER_EVENT';
        public constructor() {
            super();
            this.once(egret.Event.ADDED_TO_STAGE, this.AddToStage, this);
        }
        private AddToStage(e: egret.Event): void {
            this.init();
        }
        private init() {
            this.skinName = "GameOverSkin";
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        }
        public setJinText(score: number) {
            this.jinText.text = score.toString();
        }
        public setYinText(score: number) {
            this.yinText.text = score.toString();
        }
        public destroy(): void {
            this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.removeChild(this.jinText);
            this.removeChild(this.yinText);
            this.removeChild(this.closeBtn);
            this.jinText = null;
            this.yinText = null;
            this.closeBtn = null;
            this.skinName = null;
        }
        public onClose() {
            this.destroy();
            this.dispatchEventWith(GameOver.CLOSE_GAMEOVER_EVENT, false);
        }
    }
}