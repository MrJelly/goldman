module goldman {
	export class ObjManager extends egret.Sprite {
		private _objsArr: Obj[] = [];
		private obj: Obj;

		public static OBJ_MANAGER_EVENT: string = 'OBJ_MANAGER_EVENT';

		public constructor() {
			super();
		}
		public createObjs(objDatas: any[]): void {
			for (var i = 0; i < objDatas.length; i++) {
				var objData = objDatas[i];
				var obj: Obj = new Obj(objData);
				this._objsArr.push(obj);
				this.addChild(obj);
			}
		}
		get objsArr(): Obj[] {
			return this._objsArr;
		}
		public removeObj(obj: Obj): Obj {
			console.log("从数组中removeObj")
			var currHookObj: Obj = this._objsArr.splice(this._objsArr.indexOf(obj), 1)[0];
			this.removeChild(currHookObj);
			return currHookObj;
		}

		public destroy(): void {
			for (var i in this._objsArr) {
				var o: Obj = this._objsArr[i];
				this.removeChild(o);
				o.destory();
			}
			this._objsArr = [];
		}
	}
}
