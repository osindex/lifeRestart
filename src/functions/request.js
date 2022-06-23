export default class Request {
    static getInstance(...args) {
        if (!this._instance) {
            this._instance = new Request(...args);
        }
        return this._instance;
    }
    constructor(...args) {
        this.xhr = new Laya.HttpRequest;
        //设置超时时间
        this.xhr.http.timeout = 10000;
    }
    get(url, thisObj, callback) {
        const method = "get";
        let responseType = "text";
        this.thisObj = thisObj;
        this.callback = callback;
        this.xhr.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete);
        this.xhr.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        this.xhr.on(Laya.Event.PROGRESS, this, this.onHttpRequestProgress);
        this.xhr.send(url, null, method, responseType);
        return this;
    }
    post(url, data, contentType, thisObj, callback) {
        const method = "post";
        let responseType = "text";
        this.thisObj = thisObj;
        this.callback = callback;
        this.xhr.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete);
        this.xhr.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        this.xhr.on(Laya.Event.PROGRESS, this, this.onHttpRequestProgress);
        let headers = null;
        if (contentType != null) {
            headers = ["content-type", contentType];
        }
        this.xhr.send(url, data, method, responseType, headers);
        return this;
    }
    onHttpRequestProgress(data) {
        console.log("onHttpRequestProgress", data);
    }
    onHttpRequestComplete(data) {
        console.log("onHttpRequestComplete", data, this.xhr.data);
        this.callback.apply(this.thisObj, [{ state: 200, data: this.xhr.data }]);
    }
    onHttpRequestError(error) {
        console.log("onHttpRequestError", error, this.xhr.data);
        //onHttpRequestError [404]Not Found:http://127.0.0.1:8080/test1.json null
        const data = this.xhr.data;
        this.callback.apply(this.thisObj, [{ state: 500, error: error, data: data }]);
    }
}