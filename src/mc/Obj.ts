


module goldman {

	class Seeds {
		public constructor() {
		}
		public id: number;
		public image: string;
		/**纵向的位置 0中上 1底部*/
		public pos: number;
		public type: number;
		public speed: number;
		/**得分*/
		public score: number;
		/**在屏幕的位置 */
		public posX: number;
		public posY: number;
	}
	export class Obj extends egret.Sprite {
		public objBmp: egret.Bitmap;
		public _seeds: Seeds;


		public constructor(op: Seeds) {
			super();
			this._seeds = op;
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		public onAddToStage(e: egret.Event): void {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.objBmp = goldman.createBitmapByName(this._seeds.image);
			this.addChild(this.objBmp);
			this.x = this._seeds.posX;
			this.y = this._seeds.posY;

			// var oMoneyTextField = new egret.TextField();
			// this.addChild(oMoneyTextField);
			// oMoneyTextField.textAlign = egret.HorizontalAlign.LEFT;
			// oMoneyTextField.textColor = 0xffffff;
			// oMoneyTextField.width = 22;
			// oMoneyTextField.size = 18;
			// oMoneyTextField.text = this._seeds.score.toString();
		}

		public removeFromParent(): void {
			this.parent.removeChild(this);
		}

		set score(m: number) {
			this._seeds.score = m;
		}

		get score(): number {
			return this._seeds.score;
		}

		get speed(): number {
			return this._seeds.speed;
		}

		get image(): string {
			return this._seeds.image;
		}

		get type(): number {
			return this._seeds.type;
		}

		public destory(): void {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			removeAllchild(this);
		}
	}
}
