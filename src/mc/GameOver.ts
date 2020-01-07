module goldman {
    export class GameOver extends eui.Component {

        private scoreText: eui.Label;
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
            console.log("444444444444")
            this.skinName = "GameOverSkin";
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        }
        /**
         * setScoreText
         */
        public setScoreText(score: number) {
            console.log("setScoreText")
            this.scoreText.text = score.toString();
        }
        public destroy(): void {
            console.log("dddddddddd====destroy");
            this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.removeChild(this.scoreText);
            this.removeChild(this.closeBtn);
            this.scoreText = null;
            this.closeBtn = null;
            this.skinName = null;
        }
        public onClose() {
            this.destroy();
            this.dispatchEventWith(GameOver.CLOSE_GAMEOVER_EVENT,false);
        }
    }
}