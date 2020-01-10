


module goldman {

	class Seeds {
		public constructor() {
		}
		public id: number;
		public image: string;
		/**当前屏幕出现的最多个数*/
		public max_num: number;
		/**从哪里出现 0左侧 1右侧 中间*/
		public left: number;
		/**纵向的位置 0中上 1底部*/
		public pos: number;
		/**运动轨迹 0正常移动  1随机停顿  2斜线*/
		public movetype: number;
		/**怪物冲左侧移动到右侧需要的时间*/
		public speed: number;
		/**重量，越重拉回来的速度越慢*/
		public weight: number;
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

			var oMoneyTextField = new egret.TextField();
			this.addChild(oMoneyTextField);
			oMoneyTextField.textAlign = egret.HorizontalAlign.LEFT;
			oMoneyTextField.textColor = 0x000000;
			oMoneyTextField.width = 22;
			oMoneyTextField.size = 18;
			oMoneyTextField.text = this._seeds.score.toString();
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

		get type(): string {
			return "";
		}

		public destory(): void {
			console.log("物体销毁")
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			removeAllchild(this);
		}
	}
}
