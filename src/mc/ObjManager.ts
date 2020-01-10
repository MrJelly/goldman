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

		//移除一定范围内的物体
		public removeObjsAtAreaByHitObj(hitObj: Obj): void {
			if (hitObj.type == "TNT") {
				var removeObjsArr: Obj[] = [];
				for (var i in this._objsArr) {
					var o: Obj = this._objsArr[i];
					if (o !== hitObj) {
						var oPoint: egret.Point = new egret.Point(o.x + o.width / 2, o.y + o.height / 2);
						var hPoint: egret.Point = new egret.Point(hitObj.x + o.width / 2, hitObj.y + o.height / 2);
						var distance: number = egret.Point.distance(oPoint, hPoint);
						if (distance <= 200) {
							removeObjsArr.push(o);
						}
					}
				}
				for (var i in removeObjsArr) {
					var o: Obj = removeObjsArr[i];
					o.destory();
					this.removeObj(o);
				}
			}
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
