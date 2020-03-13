
                var __extends = this && this.__extends|| function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = window.generateEUI||{};
                generateEUI.paths = generateEUI.paths||{};
                generateEUI.styles = undefined;
                generateEUI.skins = {};generateEUI.paths['resource/skins/checkboxSkin.exml'] = window.checkBoxSkin = (function (_super) {
	__extends(checkBoxSkin, _super);
	function checkBoxSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",1)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","music_on_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","music_on_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","music_on_png")
				])
		];
	}
	var _proto = checkBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "music_off_png";
		return t;
	};
	return checkBoxSkin;
})(eui.Skin);generateEUI.paths['resource/skins/GameOverSkin.exml'] = window.GameOverSkin = (function (_super) {
	__extends(GameOverSkin, _super);
	function GameOverSkin() {
		_super.call(this);
		this.skinParts = ["closeBtn","jinText","yinText"];
		
		this.height = 1296;
		this.width = 750;
		this.elementsContent = [this._Rect1_i(),this._Image1_i(),this.closeBtn_i(),this.jinText_i(),this.yinText_i()];
	}
	var _proto = GameOverSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.5;
		t.height = 1296;
		t.width = 750;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.bottom = 297;
		t.horizontalCenter = 5;
		t.left = 40;
		t.right = 30;
		t.source = "over_png";
		t.top = 297;
		t.verticalCenter = 0;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Image();
		this.closeBtn = t;
		t.horizontalCenter = 284;
		t.source = "clearok_png";
		t.verticalCenter = -286;
		t.x = 600;
		return t;
	};
	_proto.jinText_i = function () {
		var t = new eui.Label();
		this.jinText = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Arial";
		t.height = 80;
		t.horizontalCenter = 28;
		t.size = 60;
		t.text = "0";
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.verticalAlign = "middle";
		t.verticalCenter = -73;
		t.width = 200;
		t.y = 545;
		return t;
	};
	_proto.yinText_i = function () {
		var t = new eui.Label();
		this.yinText = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Arial";
		t.height = 80;
		t.horizontalCenter = 28;
		t.size = 60;
		t.text = "0";
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.verticalAlign = "middle";
		t.verticalCenter = 156;
		t.width = 200;
		t.x = 300;
		t.y = 780;
		return t;
	};
	return GameOverSkin;
})(eui.Skin);generateEUI.paths['resource/skins/GameSceneSkin.exml'] = window.GameSceneSkin = (function (_super) {
	__extends(GameSceneSkin, _super);
	function GameSceneSkin() {
		_super.call(this);
		this.skinParts = ["gameArea","yinTextField","jinTextField","timeTextField","checkbox"];
		
		this.height = 1296;
		this.width = 750;
		this.elementsContent = [this._Image1_i(),this.gameArea_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this.yinTextField_i(),this.jinTextField_i(),this.timeTextField_i(),this._Label1_i(),this.checkbox_i()];
	}
	var _proto = GameSceneSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 310;
		t.source = "bg_head_png";
		t.width = 750;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.gameArea_i = function () {
		var t = new eui.Image();
		this.gameArea = t;
		t.height = 1090;
		t.source = "bg_bottom_png";
		t.width = 750;
		t.x = 0;
		t.y = 310;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 172;
		t.source = "ji_png";
		t.width = 206;
		t.x = 272;
		t.y = 170;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 84;
		t.source = "jin_png";
		t.width = 226;
		t.x = 20;
		t.y = 15;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 84;
		t.source = "yin_png";
		t.width = 226;
		t.x = 270;
		t.y = 15;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 84;
		t.source = "time_png";
		t.width = 206;
		t.x = 524;
		t.y = 15;
		return t;
	};
	_proto.yinTextField_i = function () {
		var t = new eui.Label();
		this.yinTextField = t;
		t.height = 40;
		t.size = 36;
		t.text = "0";
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.verticalAlign = "middle";
		t.width = 100;
		t.x = 368;
		t.y = 45;
		return t;
	};
	_proto.jinTextField_i = function () {
		var t = new eui.Label();
		this.jinTextField = t;
		t.border = false;
		t.height = 40;
		t.size = 36;
		t.text = "0";
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.verticalAlign = "middle";
		t.width = 100;
		t.x = 118;
		t.y = 45;
		return t;
	};
	_proto.timeTextField_i = function () {
		var t = new eui.Label();
		this.timeTextField = t;
		t.height = 40;
		t.size = 36;
		t.text = "0";
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.verticalAlign = "middle";
		t.width = 90;
		t.x = 608.224;
		t.y = 43.653;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.text = "s";
		t.x = 680.543;
		t.y = 50.194;
		return t;
	};
	_proto.checkbox_i = function () {
		var t = new eui.CheckBox();
		this.checkbox = t;
		t.height = 80;
		t.label = "CheckBox";
		t.skinName = "checkBoxSkin";
		t.width = 80;
		t.x = 648.204;
		t.y = 120.49;
		return t;
	};
	return GameSceneSkin;
})(eui.Skin);