var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var goldman;
(function (goldman) {
    var HookManager = (function (_super) {
        __extends(HookManager, _super);
        function HookManager() {
            var _this = _super.call(this) || this;
            _this.BASE_ROTATION_MAX = 60; //钩子默认旋转角度
            _this.LINE_HEIGHT_DEFAULT = 10; //绳子默认长度
            _this.GO_V_DEFAULT = 8; //钩子默认出击速度
            _this.BACK_V_DEFAULT = 10; //钩子默认缩回速度
            _this.isGo = false; //钩子是否在抓取
            _this.isBack = false; //钩子是否在收回
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        HookManager.prototype.onAddToStage = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.createHook();
            this.lineHeight = this.LINE_HEIGHT_DEFAULT;
            this.hook.redrawHook(this.LINE_HEIGHT_DEFAULT);
            this.startRotate();
        };
        HookManager.prototype.createHook = function () {
            this.hook = new goldman.Hook();
            this.addChild(this.hook);
            this.goV = this.GO_V_DEFAULT;
            this.backV = this.BACK_V_DEFAULT;
        };
        HookManager.prototype.onUpdateEnterFrame = function () {
            this.onUpdateRotation();
            if (this.isGo) {
                this.onUpdateGo();
            }
        };
        HookManager.prototype.startRotate = function () {
            this.direction = "left";
        };
        HookManager.prototype.onUpdateRotation = function () {
            if (this.direction == "left") {
                this.hook.rotation += 1.5;
            }
            else if (this.direction == "right") {
                this.hook.rotation -= 1.5;
            }
            if (this.direction != "stop") {
                if (this.hook.rotation < -this.BASE_ROTATION_MAX) {
                    this.direction = "left";
                }
                else if (this.hook.rotation > this.BASE_ROTATION_MAX) {
                    this.direction = "right";
                }
            }
        };
        HookManager.prototype.startGo = function () {
            this.isGo = true;
            this.direction = "stop";
            goldman.SoundManager.getInstance().PlayPull();
        };
        HookManager.prototype.onUpdateGo = function () {
            var vHeight = this.goV;
            if (this.isBack) {
                vHeight = -this.backV;
            }
            this.lineHeight += vHeight;
            this.hook.redrawHook(this.lineHeight);
            this.dispatchEventWith(HookManager.HOOK_MANAGER_EVENT, false, {
                type: HookManager.UPDATE_HOOK_POSITION_EVENT,
                hook: this.hook,
                hookBmp: this.hook.hookBmp
            });
            if (this.lineHeight < this.LINE_HEIGHT_DEFAULT) {
                this.goComplete();
            }
            //判断是否出界
            if (!this.isBack) {
                var hookGlobalPoint = this.getHookPoint();
                if (hookGlobalPoint.x < 0 || hookGlobalPoint.x > goldman.GameManager.getInstance().GameStage_width || hookGlobalPoint.y > goldman.GameManager.getInstance().GameStage_height) {
                    this.isBack = true;
                    this.backV = this.BACK_V_DEFAULT;
                }
            }
        };
        /**
         * getHookPoint
         */
        HookManager.prototype.getHookPoint = function () {
            return this.hook.localToGlobal(this.hook.hookBmp.x, this.hook.hookBmp.y);
        };
        HookManager.prototype.setHookBackV = function (backV) {
            console.log("backV===", backV);
            var that = this;
            that.isBack = true;
            goldman.SoundManager.getInstance().StopPull();
            goldman.SoundManager.getInstance().PlayDig();
            that.backV = 0;
            if (backV > 0) {
                var tick_1 = setInterval(function () {
                    that.backV = that.backV + 1;
                    if (that.backV >= backV) {
                        clearInterval(tick_1);
                    }
                }, 40);
            }
        };
        HookManager.prototype.goComplete = function () {
            this.dispatchEventWith(HookManager.HOOK_MANAGER_EVENT, false, { type: HookManager.GO_COMPLETE_EVENT, catchObj: this.catchObj });
            this.hook.setBackHookType();
            this.lineHeight = this.LINE_HEIGHT_DEFAULT;
            this.hook.redrawHook(this.lineHeight);
            this.isGo = false;
            this.isBack = false;
            this.startRotate();
            this.catchObj = null;
            goldman.SoundManager.getInstance().StopDig();
            goldman.SoundManager.getInstance().StopPull();
        };
        HookManager.prototype.setCatchObj = function (obj) {
            this.catchObj = obj;
            var typeStr = obj.image;
            console.log("catchObj.type: " + typeStr);
            this.hook.setBackHookType(typeStr); //设置钩子的样子
        };
        HookManager.prototype.destroy = function () {
            console.log("删除hook");
            this.hook.destroy();
            this.removeChild(this.hook);
            this.hook = null;
            this.catchObj = null;
        };
        HookManager.HOOK_MANAGER_EVENT = 'HOOK_MANAGER_EVENT';
        HookManager.GO_COMPLETE_EVENT = 'GO_COMPLETE_EVENT';
        HookManager.UPDATE_HOOK_POSITION_EVENT = 'UPDATE_HOOK_POSITION_EVENT';
        return HookManager;
    }(egret.Sprite));
    goldman.HookManager = HookManager;
    __reflect(HookManager.prototype, "goldman.HookManager");
})(goldman || (goldman = {}));
//# sourceMappingURL=HookManager.js.map