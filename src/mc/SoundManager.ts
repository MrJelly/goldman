namespace goldman {
    export class SoundManager {
        private static _instance: SoundManager;
        public static getInstance(): SoundManager {
            if (SoundManager._instance == null)
                SoundManager._instance = new SoundManager();
            return SoundManager._instance;
        }
        private _click: egret.Sound;//点击声音
        private _lastsound: egret.Sound;//最后10秒提示
        private _score: egret.Sound;//如果得分
        private _pull: egret.Sound;//如果拉
        private _pull_channel: egret.SoundChannel;
        private _dig: egret.Sound;//如果拉
        private _dig_channel: egret.SoundChannel;
        private _bgm: egret.Sound;//背景音乐
        private _bgm_channel: egret.SoundChannel;//保存用来静音用
        public constructor() {
            this._click = new egret.Sound();
            this._click.load("resource/sound/button.mp3");
            this._bgm = new egret.Sound();
            this._bgm.load("resource/sound/bgm.mp3");
            this._score = new egret.Sound();
            this._score.load("resource/sound/score.mp3");
            this._pull = new egret.Sound();
            this._pull.load("resource/sound/pull.mp3");
            this._dig = new egret.Sound();
            this._dig.load("resource/sound/dig.mp3");
            this._lastsound = new egret.Sound();
            this._lastsound.load("resource/sound/last-10s-sound.mp3");
        }
        public PlayBGM() {
            if (this.IsMusic) {
                this._bgm_channel = this._bgm.play(0, 0);
                // this._bgm_channel.volume=0.1;
            }

        }
        public StopBGM() {
            if (this._bgm_channel != null) {
                this._bgm_channel.stop();
            }
        }
        public PlayClick() {
            if (this.IsSound) {
                this._click.play(0, 1);
            }
        }
        public PlayScore() {
            if (this.IsSound) {
                this._score.play(0, 1);
            }
        }
        public PlayPull() {
            if (this.IsSound) {
                this._pull_channel = this._pull.play(0, 0);
            }
        }
        public StopPull() {
            if (this._pull_channel != null) {
                this._pull_channel.stop();
            }
        }
        public PlayDig() {
            if (this.IsSound) {
                this._dig_channel = this._dig.play(0, 0);
            }
        }
        public StopDig() {
            if (this._dig_channel != null) {
                this._dig_channel.stop();
            }
        }
        public PlayLastSound() {
            if (this.IsSound) {
                this._lastsound.play(0, 1);
            }
        }
        //音乐是否播放，保存设置
        public set IsMusic(value) {
            if (!value) {
                egret.localStorage.setItem("ismusic", "0");
                this.StopBGM();
            } else {
                egret.localStorage.setItem("ismusic", "1");
                this.PlayBGM();
            }
        }
        public get IsMusic(): boolean {
            var b = egret.localStorage.getItem("ismusic");
            if (b == null || b == "") {
                return true;
            }
            else {
                return b == "1";
            }
        }
        //声效是否播放，保存设置
        public set IsSound(value) {
            if (value) {
                egret.localStorage.setItem("isSound", "1");
            } else {
                egret.localStorage.setItem("isSound", "0");
            }
        }
        public get IsSound(): boolean {
            var b = egret.localStorage.getItem("isSound");
            if (b == null || b == "") {
                return true;
            }
            else {
                return b == "1";
            }
        }
    }
}