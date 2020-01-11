//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
// class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {
//     public constructor() {
//         super();
//         goldman.SoundManager.getInstance();
//         this.createView();
//     }
//     private textField: egret.TextField;
//     private createView(): void {
//         this.textField = new egret.TextField();
//         this.addChild(this.textField);
//         this.textField.y = goldman.GameManager.getInstance().GameStage_height/2-50;
//         this.textField.x = goldman.GameManager.getInstance().GameStage_width/2-240;
//         this.textField.width = 480;
//         this.textField.height = 100;
//         this.textField.textAlign = "center";
//         this.textField.textColor = 0x000000;
//     }
//     public onProgress(current: number, total: number): void {
//         this.textField.text = `Loading...${current}/${total}`;
//     }
// }
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.w = 0;
        _this.h = 0;
        goldman.SoundManager.getInstance();
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.w = egret.MainContext.instance.stage.stageWidth;
        this.h = egret.MainContext.instance.stage.stageHeight;
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x000000, 0.5);
        bg.graphics.drawRect(0, 0, this.w, this.h);
        bg.graphics.endFill();
        this.addChild(bg);
        this.pgBg = new egret.Bitmap;
        this.pgBg.texture = RES.getRes("PreLoadingBarBg_png");
        this.pgBg.x = this.w / 2 - this.pgBg.width / 2;
        this.pgBg.y = this.h / 2 - this.pgBg.height / 2;
        this.addChild(this.pgBg);
        this.pgBar = new egret.Bitmap;
        this.pgBar.texture = RES.getRes("PreLoadingBar_png");
        this.pgBar.x = this.w / 2 - this.pgBar.width / 2;
        this.pgBar.y = this.pgBg.y + 12;
        this.addChild(this.pgBar);
        this.textField = new egret.TextField();
        this.textField.size = 24;
        this.textField.textColor = 0xFFFFFF;
        this.textField.bold = true;
        this.textField.stroke = 1;
        this.textField.strokeColor = 0x000000;
        this.addChild(this.textField);
        this.textField.width = 100;
        this.textField.x = this.w / 2 - this.textField.width / 2;
        this.textField.y = this.pgBg.y + 12;
        this.textField.textAlign = "center";
        this.textField.text = "0%";
        this.pgBar.width = 0;
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        var rate = Math.round((current / total) * 100);
        this.textField.text = rate + "%";
        this.pgBar.width = 376 * (current / total);
    };
    return LoadingUI;
}(eui.UILayer));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//# sourceMappingURL=LoadingUI.js.map