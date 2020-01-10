
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
                generateEUI.skins = {};generateEUI.paths['resource/skins/GameOverSkin.exml'] = window.GameOverSkin = (function (_super) {
	__extends(GameOverSkin, _super);
	function GameOverSkin() {
		_super.call(this);
		this.skinParts = ["closeBtn","scoreText"];
		
		this.height = 1206;
		this.width = 750;
		this.elementsContent = [this._Image1_i(),this.closeBtn_i(),this.scoreText_i()];
	}
	var _proto = GameOverSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.source = "resource/assets/over.png";
		t.verticalCenter = 0;
		t.width = 535.34;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Image();
		this.closeBtn = t;
		t.horizontalCenter = 0;
		t.source = "resource/assets/clearok.png";
		t.verticalCenter = 112;
		return t;
	};
	_proto.scoreText_i = function () {
		var t = new eui.Label();
		this.scoreText = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Arial";
		t.height = 61.433;
		t.horizontalCenter = 0;
		t.size = 50;
		t.text = "0";
		t.textAlign = "center";
		t.textColor = 0xFF0000;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 206.987;
		return t;
	};
	return GameOverSkin;
})(eui.Skin);generateEUI.paths['resource/skins/GameSceneSkin.exml'] = window.GameSceneSkin = (function (_super) {
	__extends(GameSceneSkin, _super);
	function GameSceneSkin() {
		_super.call(this);
		this.skinParts = ["goalTextField","scoreTextField","timeTextField"];
		
		this.height = 292.2;
		this.width = 750;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.goalTextField_i(),this.scoreTextField_i(),this.timeTextField_i()];
	}
	var _proto = GameSceneSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 1200;
		t.source = "resource/assets/bgall.png";
		t.width = 750;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 151;
		t.source = "hero_png";
		t.width = 168;
		t.x = 330;
		t.y = 34;
		return t;
	};
	_proto.goalTextField_i = function () {
		var t = new eui.Label();
		this.goalTextField = t;
		t.height = 38;
		t.size = 30;
		t.text = "100";
		t.textAlign = "center";
		t.textColor = 0x2C2020;
		t.verticalAlign = "middle";
		t.width = 60;
		t.x = 168;
		t.y = 107.418;
		return t;
	};
	_proto.scoreTextField_i = function () {
		var t = new eui.Label();
		this.scoreTextField = t;
		t.border = false;
		t.height = 38;
		t.size = 30;
		t.text = "0";
		t.textAlign = "center";
		t.textColor = 0x2C2020;
		t.verticalAlign = "middle";
		t.width = 60;
		t.x = 194;
		t.y = 34;
		return t;
	};
	_proto.timeTextField_i = function () {
		var t = new eui.Label();
		this.timeTextField = t;
		t.height = 30;
		t.size = 28;
		t.text = "0s";
		t.textAlign = "center";
		t.textColor = 0xFFD745;
		t.verticalAlign = "middle";
		t.width = 90;
		t.x = 585;
		t.y = 120;
		return t;
	};
	return GameSceneSkin;
})(eui.Skin);