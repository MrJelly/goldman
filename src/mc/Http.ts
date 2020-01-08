module goldman {
    export class Http {
        private loader: egret.URLLoader = new egret.URLLoader();
        private variables: egret.URLVariables;

        static create(): Http {
            return new Http();
        }
        success(handle: Function, thisObj: any = null): Http {
            this.loader.addEventListener(egret.Event.COMPLETE, function (e: egret.Event): void {
                var loader = <egret.URLLoader>e.target;
                handle.call(thisObj, loader.data);
            }, thisObj);
            return this;
        }
        error(handle: Function, thisObj: any = null): Http {
            this.loader.addEventListener(egret.IOErrorEvent.IO_ERROR, handle, thisObj);
            return this;
        }
        add(source): Http {
            if (!this.variables) {
                this.variables = new egret.URLVariables();
            }
            this.variables.decode(source);
            return this;
        }
        dataFormat(dataFormat: string): Http {
            this.loader.dataFormat = dataFormat;
            return this;
        }
        get(url: string) {
            var req = new egret.URLRequest(url);
            this.variables && (req.data = this.variables);
            this.loader.load(req);
        }
        post(url: string) {
            var req = new egret.URLRequest(url);
            req.method = egret.URLRequestMethod.POST;
            this.variables && (req.data = this.variables);
            this.loader.load(req);
        }
    }
}