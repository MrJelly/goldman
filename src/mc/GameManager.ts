module goldman {
	export class GameManager extends eui.Component {

		private scoreTextField: eui.Label;
		private goalTextField: eui.Label;
		private timeTextField: eui.Label;


		public static TRIGGER_START_GO: string = 'TRIGGER_START_GO';

		public constructor() {
			super();
			this.once(egret.Event.ADDED_TO_STAGE, this.AddToStage, this);
		}

		private AddToStage(e: egret.Event): void {
			console.log("AddToStage")
			this.init();
		}
		private init() {
			console.log("GameSceneSkin")
			this.skinName = "GameSceneSkin";
			this.touchEnabled = true;
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStartGo, this)
		}

		private clickStartGo(e: egret.TouchEvent): void {
			this.dispatchEventWith(GameManager.TRIGGER_START_GO, false)
		}
		public setScoreText(score: number): void {
			this.scoreTextField.text = score.toString();
		}

		public setGoalText(goalScore: number): void {
			this.goalTextField.text = goalScore.toString();
		}

		public setTimeText(time: number): void {
			this.timeTextField.text = time + "s";
		}

		public destroy(): void {
			this.removeChild(this.scoreTextField);
			this.removeChild(this.goalTextField);
			this.removeChild(this.timeTextField);
			this.scoreTextField = null;
			this.goalTextField = null;
			this.timeTextField = null;
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStartGo, this)
		}
	}
}