module goldman {
    export class GameScene extends eui.Component {

        private jinTextField: eui.Label;
        private yinTextField: eui.Label;
        private timeTextField: eui.Label;
        private checkbox: eui.CheckBox;
        private gameArea: eui.Image;

        public constructor() {
            super();
            this.once(egret.Event.ADDED_TO_STAGE, this.AddToStage, this);
        }

        private AddToStage(e: egret.Event): void {
            this.init();
        }
        private init() {
            this.skinName = "GameSceneSkin";
            this.touchEnabled = true;
            this.gameArea.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStartGo, this);

            if (SoundManager.getInstance().IsSound) {
                this.checkbox.selected = true
                SoundManager.getInstance().PlayBGM()
            } else {
                this.checkbox.selected = false
            }
            this.checkbox.addEventListener(egret.Event.CHANGE, this.changeSound, this);
        }

        private changeSound(e: egret.Event): void {
            if (this.checkbox.selected) {
                SoundManager.getInstance().IsSound = true
                SoundManager.getInstance().PlayBGM()
            } else {
                SoundManager.getInstance().IsSound = false
                SoundManager.getInstance().StopBGM()
            }
        }

        private clickStartGo(e: egret.TouchEvent): void {
            GameManager.getInstance().onStartGo()
        }

        public setYinScoreText(score: number): void {
            this.yinTextField.text = score.toString();
        }
        public setJinScoreText(score: number): void {
            this.jinTextField.text = score.toString();
        }

        public setTimeText(time: number): void {
            this.timeTextField.text = time.toString();
        }

        public destroy(): void {
            this.checkbox.removeEventListener(egret.Event.CHANGE, this.changeSound, this);
            this.gameArea.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStartGo, this)
            this.removeChild(this.jinTextField);
            this.removeChild(this.yinTextField);
            this.removeChild(this.timeTextField);
            this.removeChild(this.checkbox);
            this.removeChild(this.gameArea);
            this.jinTextField = null;
            this.yinTextField = null;
            this.timeTextField = null;
            this.checkbox = null;
            this.gameArea = null;
            
        }
    }
}