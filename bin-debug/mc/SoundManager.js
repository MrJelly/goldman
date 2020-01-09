var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var goldman;
(function (goldman) {
    var SoundManager = (function () {
        function SoundManager() {
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
        SoundManager.getInstance = function () {
            if (SoundManager._instance == null)
                SoundManager._instance = new SoundManager();
            return SoundManager._instance;
        };
        SoundManager.prototype.PlayBGM = function () {
            if (this.IsMusic) {
                this._bgm_channel = this._bgm.play(0, 0);
                // this._bgm_channel.volume=0.1;
            }
        };
        SoundManager.prototype.StopBGM = function () {
            if (this._bgm_channel != null) {
                this._bgm_channel.stop();
            }
        };
        SoundManager.prototype.PlayClick = function () {
            if (this.IsSound) {
                this._click.play(0, 1);
            }
        };
        SoundManager.prototype.PlayScore = function () {
            if (this.IsSound) {
                this._score.play(0, 1);
            }
        };
        SoundManager.prototype.PlayPull = function () {
            if (this.IsSound) {
                this._pull_channel = this._pull.play(0, 0);
            }
        };
        SoundManager.prototype.StopPull = function () {
            if (this._pull_channel != null) {
                this._pull_channel.stop();
            }
        };
        SoundManager.prototype.PlayDig = function () {
            if (this.IsSound) {
                this._dig_channel = this._dig.play(0, 0);
            }
        };
        SoundManager.prototype.StopDig = function () {
            if (this._dig_channel != null) {
                this._dig_channel.stop();
            }
        };
        SoundManager.prototype.PlayLastSound = function () {
            if (this.IsSound) {
                this._lastsound.play(0, 1);
            }
        };
        Object.defineProperty(SoundManager.prototype, "IsMusic", {
            get: function () {
                var b = egret.localStorage.getItem("ismusic");
                if (b == null || b == "") {
                    return true;
                }
                else {
                    return b == "1";
                }
            },
            //音乐是否播放，保存设置
            set: function (value) {
                if (!value) {
                    egret.localStorage.setItem("ismusic", "0");
                    this.StopBGM();
                }
                else {
                    egret.localStorage.setItem("ismusic", "1");
                    this.PlayBGM();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundManager.prototype, "IsSound", {
            get: function () {
                var b = egret.localStorage.getItem("isSound");
                if (b == null || b == "") {
                    return true;
                }
                else {
                    return b == "1";
                }
            },
            //声效是否播放，保存设置
            set: function (value) {
                if (value) {
                    egret.localStorage.setItem("isSound", "1");
                }
                else {
                    egret.localStorage.setItem("isSound", "0");
                }
            },
            enumerable: true,
            configurable: true
        });
        return SoundManager;
    }());
    goldman.SoundManager = SoundManager;
    __reflect(SoundManager.prototype, "goldman.SoundManager");
})(goldman || (goldman = {}));
//# sourceMappingURL=SoundManager.js.map