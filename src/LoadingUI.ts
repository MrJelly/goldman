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


class LoadingUI extends eui.UILayer implements RES.PromiseTaskReporter {

    private pgBg: egret.Bitmap;
    private pgBar: egret.Bitmap;
    private textField: egret.TextField;
    private w: number = 0;
    private h: number = 0;

    public constructor() {
        super();
        goldman.SoundManager.getInstance();
        this.createView();
    }
    private createView(): void {
        this.w = egret.MainContext.instance.stage.stageWidth;
        this.h = egret.MainContext.instance.stage.stageHeight;
        console.log("====>>>", this.w, this.h)
        this.pgBg = new egret.Bitmap;
        console.log("=====>>>", RES.getRes)
        this.pgBg.texture = RES.getRes("PreLoadingBarBg_png");
        this.pgBg.x = this.w / 2 - this.pgBg.width / 2;
        this.pgBg.y = this.h / 2 - this.pgBg.height / 2;
        this.addChild(this.pgBg);

        this.pgBar = new egret.Bitmap;
        this.pgBar.texture = RES.getRes("PreLoadingBar_png");
        this.pgBar.x = this.w / 2 - this.pgBar.width / 2;
        this.pgBar.y = this.pgBg.y + 20;
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
        this.textField.y = this.pgBg.y + 20;
        this.textField.textAlign = "center";
        this.textField.text = "0%";
        console.log("======>>",this.pgBg.width)
        this.pgBar.width = 0;
    }
    public onProgress(current: number, total: number): void {
        var rate: number = Math.round((current / total) * 100);
        this.textField.text = rate + "%";
        this.pgBar.width = this.pgBg.width * (current / total);
    }
}
