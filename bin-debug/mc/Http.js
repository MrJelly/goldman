var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var goldman;
(function (goldman) {
    var Http = (function () {
        function Http() {
            this.loader = new egret.URLLoader();
        }
        Http.create = function () {
            return new Http();
        };
        Http.prototype.success = function (handle, thisObj) {
            if (thisObj === void 0) { thisObj = null; }
            this.loader.addEventListener(egret.Event.COMPLETE, function (e) {
                var loader = e.target;
                handle.call(thisObj, loader.data);
            }, thisObj);
            return this;
        };
        Http.prototype.error = function (handle, thisObj) {
            if (thisObj === void 0) { thisObj = null; }
            this.loader.addEventListener(egret.IOErrorEvent.IO_ERROR, handle, thisObj);
            return this;
        };
        Http.prototype.add = function (source) {
            if (!this.variables) {
                this.variables = new egret.URLVariables();
            }
            this.variables.decode(source);
            return this;
        };
        Http.prototype.dataFormat = function (dataFormat) {
            this.loader.dataFormat = dataFormat;
            return this;
        };
        Http.prototype.get = function (url) {
            var req = new egret.URLRequest(goldman.baseUrl + url);
            this.variables && (req.data = this.variables);
            this.loader.load(req);
        };
        Http.prototype.post = function (url) {
            var req = new egret.URLRequest(goldman.baseUrl + url);
            var header = new egret.URLRequestHeader("Authorization", "Bearer " + window['token']);
            req.requestHeaders.push(header);
            req.method = egret.URLRequestMethod.POST;
            this.variables && (req.data = this.variables);
            this.loader.load(req);
        };
        return Http;
    }());
    goldman.Http = Http;
    __reflect(Http.prototype, "goldman.Http");
})(goldman || (goldman = {}));
//# sourceMappingURL=Http.js.map