var enumProperty = /\w*\[\w*\[\"([^\"]*)\"\]\s*=\s*([^\]]*)[^;]*;/gmi;
var enumPropertyEs6 = '$1=$2,';
var moduls = [];
declare var QReqConfig;

//enum ModuleType {
//    folder = 1e+400,
//    uknown = -1,
//    code = 0,
//    json = 1,
//    xml = 2,
//    html = 3,
//    Image = 4,
//    template = 5,
//    style = 6
//}

//enum ModuleExt {
//    js = ModuleType.code,
//    json = ModuleType.json,
//    xml = ModuleType.xml,
//    html = ModuleType.html,
//    img = ModuleType.Image,
//    template = ModuleType.template,
//    svg = ModuleType.style,
//    ico = ModuleType.style,
//    css = ModuleType.style,
//}

//enum ModuleStat {
//    New = 0,
//    Downloading = 1,
//    Downloaded = 2,
//    Defining = 3,
//    Defined = 4,
//    Executing = 5,
//    Executed = 6,
//    Failed = 7,
//}
enum ModuleType {
    folder = 9e9888,
    uknown = -1,
    code = 0,
    json = 1,
    xml = 2,
    html = 3,
    Image = 4,
    template = 5,
    style = 6
}

enum ModuleExt {
    js = ModuleType.code,
    json = ModuleType.json,
    xml = ModuleType.xml,
    html = ModuleType.html,
    img = ModuleType.Image,
    template = ModuleType.template,
    svg = ModuleType.style,
    ico = ModuleType.style,
    css = ModuleType.style,
}

enum ModuleStat {
    New = 0,
    Downloading = 1,
    Downloaded = 2,
    Defining = 3,
    Defined = 4,
    Executing = 5,
    Executed = 6,
    Failed = 7,
}


namespace System {
    
    var stack: core.Module[] = [];
    var args: core.Args[] = [];
    export declare type IPluginEventCallback = (e: PluginsEvent) => void;
    export interface PluginsEvent {
        exports: any;
        url: System.basics.IUrl;
        data: any;
    }
    export namespace basics {


        export interface IUrl {
            moduleType: ModuleType;
            IsExternal: boolean;
            host: string;
            path: string[];
            moduleName: string;
            ext: string;
            isAsset: boolean;
            params: string;
            getEName(defaultExt?: string): string;
            IsInternal: boolean;
            FullPath: string;
        }
        export class Url implements IUrl {
            private _path: string[];
            moduleType: ModuleType;
            host: string;
            moduleName: string;
            ext: string;

            getEName(defaultExt?: string): string {
                if (this.IsFolder) return "";
                var he = this.ext
                var defaultExt = this.ext ? this.ext : this.moduleType >= 0 ? ModuleExt[this.moduleType] || defaultExt : defaultExt;

                var s = this.moduleName;
                if (defaultExt) s += "." + defaultExt;
                if (this.params) s += "?" + this.params;
                return s;
            }

            params: string;
            IsFolder: boolean;
            constructor(url?: string) {
                if (url)
                    this.init(url);
            }

            public toString() {
                var s = "";
                if (this.IsExternal)
                    s = this.host;
                s += "/";
                if (this.path.length > 0)
                    s += this.path.join('/') + '/';
                s += this.getEName();
                return s;
            }

            private init(url: string) {
                url = url.toLowerCase().trim();

                var path: string;
                var i = url.indexOf('|');
                if (i !== -1) {
                    this.moduleType = ModuleType[url.substr(0, i)];
                    url = url.substr(i + 1);
                }
                if (url.indexOf('//') === 0)
                    [this.host, this.path] = Url.getHost(url = url.substr(2));
                else
                    [this.host, this.path] = Url.getFullHost(url);
                var lp = this.path.pop();
                if (lp) {
                    this.IsFolder = false;
                    var iq = lp.indexOf('?');
                    var ename = iq === -1 ? lp : lp.substr(0, iq);
                    if (iq == -1) this.params = "";
                    else this.params = lp.substr(iq + 1);
                    iq = iq === -1 ? lp.length - 1 : i;
                    var iext = ename.lastIndexOf('.');

                    if (iext !== -1) {
                        this.ext = ename.substr(iext + 1);
                        this.moduleName = ename.substr(0, iext);
                    } else {
                        this.moduleName = ename;
                    }
                } else {
                    this.IsFolder = true;
                    this.moduleType = ModuleType.folder;
                }

                if (this.moduleType == undefined)
                    this.moduleType = !this.ext ? ModuleType.code : (ModuleType[ModuleType[ModuleExt[this.ext]]]);
                if (this.moduleType === undefined && this.ext)
                    this.moduleType = ModuleType.uknown;
                return this;
            }
            static getHost(url: string): [string, string[]] {
                var i = url.indexOf('://');
                var pi = url.indexOf('/');
                if (pi < i) {
                    path = url.split('/');
                    if (pi === 0) path.shift(), host = Url.rootUrl.host;;
                    return [host, path];
                }
                if (i === -1) throw " Invalid Url ";
                var s = url.indexOf('/', i + 3);
                var host = s === -1 ? url : url.substr(0, s);
                var path = s === -1 ? [""] : url.substr(s + 1).split('/');
                return [host, path];
            }
            static getFullHost(url: string): [string, string[]] {
                var i = url.indexOf('://');
                var pi = url.indexOf('/');
                if (i === -1 || pi < i) {
                    path = url.split('/');
                    if (pi === 0) path.shift(), host = Url.rootUrl.host;;
                }
                else {
                    var s = url.indexOf('/', i + 3);
                    var host = s === -1 ? url : url.substr(0, s);
                    var path = s === -1 ? [""] : url.substr(s + 1).split('/');
                }
                return [host, path];
            }
            public Combine(path: string | Url) {
                var t = typeof path === 'string' ? new Url(path) : path;
                if (t.IsExternal)
                    return t;
                var c = new Url();
                c.host = this.host;
                c.path = this.path == null ? t.path : t.path == null ? null : this.path.concat(t.path);
                c.moduleType = t.moduleType;
                c.moduleName = t.moduleName;
                c.ext = t.ext;
                c.params = t.params;
                return c;
            }


            get IsExternal(): boolean { return this.host != null && this.host != ""; }
            get isAsset(): boolean { return this.moduleType !== ModuleType.code; }
            get path() { return this._path; }
            set path(v: string[]) { Url.RevalidatePath(v, this.IsExternal); this._path = v; }
            get FullPath() { return this.toString(); }
            public SameHostAs(url: Url) {
                var h1 = this.IsExternal ? this.host : Url.rootUrl.host;
                var h2 = url.IsExternal ? url.host : Url.rootUrl.host;
                return h1 === h2;
            }
            static RevalidatePath(ary: string[], isFullPath?: boolean) {
                if (!ary) return;
                let i;
                let part;
                for (i = 0; i < ary.length; i++) {
                    part = ary[i];
                    if (part === '.') {
                        ary.splice(i, 1);
                        i -= 1;
                    } else if (part === '..') {
                        if (isFullPath) {
                            if (i == 0) {
                                ary.splice(i, 1);
                                i -= 1;
                            } else {
                                ary.splice(i - 1, 2);
                                i -= 2;
                            }
                        }
                        else if (i === 0 || (i === 1 && ary[2] === '..') || ary[i - 1] === '..') {
                            continue;
                        } else if (i > 0) {
                            ary.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
            }

            public intersect(url: Url): Url {
                if (!this.SameHostAs(url)) return null;
                var c = new Url();
                c.host = this.host;
                var p1 = this.path;
                var p2 = url.path;
                var p = [];
                var pl = Math.min(p1.length, p2.length);
                return c;
            }
            public get IsInternal(): boolean {
                return this.IsExternal ? Url.rootUrl.SameHostAs(this) : true;
            }
            public static rootUrl = new Url(document.location.href);
        }
    }
    export namespace net {

        export class Header {
            private _value: string;
            constructor(private _key: string, _value: number | string | boolean) {
                this._value = String(_value || "");
            }

            get key() {
                return this._key;
            }

            get value() {
                return this._value;
            }
        }

        export class EventListener {
            private _deleagtes: Function[] = [];
            private _store: Array<{ k: any, d: any }>;
            constructor(private key) {
            }

            set On(delegate: Function) {
                this._deleagtes.push(delegate);
            }

            set Off(delegate: Function) {
                const i = this._deleagtes.indexOf(delegate);
                if (i == -1)
                    return;
                this._deleagtes.splice(i, 1);
            }
            private call(_this, array: any[], curs: number, l: number) {
                try {
                    for (curs++; curs < l; curs++)
                        this._deleagtes[curs].apply(_this, array);
                } catch (e) {
                }
                return curs;
            }
            PInvoke(key: any, _this: any, array: any[]) {
                var curs = -1;
                const l = this._deleagtes.length;
                if (key == this.key && l > 0)
                    while (curs < l)
                        curs = this.call(_this, array, curs, l);
            }

            Invok(key, callBack: (d: Function) => void) {
                const l = this._deleagtes.length;
                if (key == this.key && l > 0)
                    for (let i = 0; i < l; i++)
                        try {
                            callBack(this._deleagtes[i]);
                        }
                        catch (e) {

                        }
            }

            Add(delegate: Function, key: any) {
                if (this._store == null)
                    this._store = [];
                if (key)
                    this._store.push({ k: key, d: delegate });
                this._deleagtes.push(delegate);
            }

            Remove(key: any) {
                if (this._store)
                    for (let i = 0; i < this._store.length; i++) {
                        const p = this._store[i];
                        if (p.k == key) {
                            this._store.splice(i, 1);
                            i--;
                        }
                    }
            }
        }

        export enum ResponseType {
            json = 0,
            Document = 1,
            Text = 2,
            ArrayBuffer = 3,
            Blob = 4,
            "" = 8,
        }

        export enum WebRequestMethod {
            Get = 0,
            Post = 1,
            Head = 2,
            Put = 3,
            Delete = 4,
            Options = 5,
            Connect = 6,
        }

        export class WebRequest {
            http: XMLHttpRequest = new XMLHttpRequest();
            _method: WebRequestMethod;
            _responseType: ResponseType = null;
            key = new Object();
            OnComplete = new EventListener(this.key);

            constructor() {
                this._onprogress = this._onprogress.bind(this);
                this.http.onload = this._onprogress
                this.http.onerror = this._onprogress;

            }

            get method() {
                return this._method == null ? 0 : this._method;
            }

            set method(v) {
                if (WebRequestMethod[v] == null)
                    return;
                this._method = v;
            }

            get ResponseType() {
                return this._responseType || ResponseType.Text;
            }

            set ResponseType(v) {
                this._responseType = v;
            }

            _onprogress(e) {
                if (this.http.readyState == 4) {
                    let cur = this.OnComplete;
                    if (cur) {
                        cur.PInvoke(this.key, null, [this]);
                    }

                } else
                    throw "";
            }

            get IsSuccess() { return this.http.status == 200 && this.http.readyState == 4; }

            Download<T>(url: basics.IUrl, data: downloadCallback<T>) {
                this.http.open(WebRequestMethod[this.method], url.toString(), true);
                this.http.setRequestHeader('allow-cross-origin', '*');
                var httpReq = this.http;
                httpReq.setRequestHeader('Access-Control-Allow-Headers', '*');
                httpReq.setRequestHeader('Content-type', '*');
                httpReq.setRequestHeader('Access-Control-Allow-Origin', '*');
                this.http.responseType = <XMLHttpRequestResponseType>ResponseType[this.ResponseType].toLowerCase();
                if (this.method == WebRequestMethod.Get)
                    this.http.send();
                else
                    this.http.send(data);
            }

            get Response() {
                return this.http.response;
            }
        }

        export class downloadCallback<T> {
            IsSuccess: boolean;
            constructor(public callback: (http: Downloader, data: downloadCallback<T>) => void, public data: T, public isPrivate?) {
                this.callback = callback;
                this.data = data;
                this.isPrivate = isPrivate;
                this.IsSuccess = null;
                if (isPrivate == void 0)
                    isPrivate = false;
            }
        }

        export class __data<T> {
            constructor(public url: basics.IUrl, public data: downloadCallback<T>) {
            }
        }

        export class Downloader {
            webr: WebRequest;
            quee: __data<any>[] = [];
            current: __data<any>;
            isRunning = false;
            isDownloading = false;
            success = [];
            fails = [];
            OnSuccess = new EventListener(1);
            OnFail = new EventListener(1);
            OnFinish = new EventListener(1);
            constructor() {
                this.webr = new net.WebRequest();
                this.quee = [];
                this.isRunning = false;
                this.isDownloading = false;
                this.success = [];
                this.fails = [];
                this.OnSuccess = new EventListener(1);
                this.OnFail = new EventListener(1);
                this.OnFinish = new EventListener(1);
                this.webr.method = net.WebRequestMethod.Get;
                this.webr.ResponseType = net.ResponseType.Text;
                this.webr.OnComplete.Add(this.DownloadComplete.bind(this), "DCT");
            }

            get Request() { return this.webr; }

            DownloadComplete(xmlRequest) {
                let x;
                this.isDownloading = false;
                if (this.webr.IsSuccess) {
                    x = this.OnSuccess;
                    this.success.push(this.current);
                }
                else {
                    x = this.OnFail;
                    this.fails.push(this.current);
                }
                try {
                    let ip = true;
                    const th = this;
                    if (th.current.data instanceof downloadCallback) {
                        try {
                            var c = th.current.data;
                            c.IsSuccess = th.webr.IsSuccess;
                            if (c.callback instanceof Function)
                                c.callback(this as any, c);
                        }
                        catch (e) { }
                        ip = !(c.isPrivate);
                    }
                    if (ip)
                        x.PInvoke(1, null, [th, th.current.data]);// arg => { arg(th, th.current.data); });
                }
                catch (error) {
                }
                this.Next();
            }

            Push<T>(url: basics.IUrl, data: downloadCallback<T>) {
                this.quee.push(new __data(url, data));

                if (!this.isRunning)
                    this.Start();
            }

            Start() {
                if (this.isDownloading)
                    return;
                this.isRunning = true;
                this.Next();
            }

            Next() {
                if (0 == this.quee.length) {
                    this.isRunning = false;
                    this.isDownloading = false;
                    const ___this = this;
                    this.OnFinish.PInvoke(1, null, [___this, ___this.current.data]);// arg => { arg(___this, ___this.current.data); });
                    return;
                }
                const c = this.current = this.quee.shift();
                this.webr.Download(c.url, c.data);
                this.isDownloading = true;
            }

            Restart() {
                this.isDownloading = false;
                this.Start();
            }
        }

    }

    namespace core {
        var ff = true;
        var counter: number = 0;
        var _store: { [id: number]: IContextData } = {};
        var _listeners: { t: Module, m: Module, s: ModuleStat, c: (lFullName: string, nFullName: string, _new: ModuleStat, c: ModuleStat) => void | ModuleStat }[] = [];

        export class dic {
            static set(key: Function, obj: string) {
                const l = this.keys.length;
                this.keys.push(key);
                this.values[l] = obj;
            }

            static get(key: Function) {
                const i = this.keys.indexOf(key);
                if (i === -1)
                    return undefined;
                return this.values[i];
            }

            static getkey(val: string) {
                const i = this.values.indexOf(val);
                if (i === -1)
                    return undefined;
                return this.keys[i];
            }
            static keys: Function[] = [];
            static values: string[] = [];

            public static registerNativeTypes() {
                var r = Object.getOwnPropertyNames(window);
                for (var i = 0; i < r.length; i++) {
                    var p = r[i];
                    var v = Object.getOwnPropertyDescriptor(window, p) as any;
                    v = v.value;
                    if (v && v.prototype && v.prototype.constructor === v) {
                        this.keys.push(v);
                        this.values.push(p);
                    }
                }
                delete this.registerNativeTypes;
            }
        }
        dic.registerNativeTypes();
        var _garbage: { [s: number]: { count: number, vaue: any } } = {};
        var count = 0;
        var $freeze = Object.freeze;
        export class SecureValue<T> {
            private _id: number;
            constructor(_v: T, count) {
                this._id = count++;
                _garbage[this._id] = { count: typeof count !== 'number' ? 1 : count, vaue: _v };
                $freeze(this);
            }
            get Value(): T {
                const l = _garbage[this._id];
                if (!l) return undefined;
                if (--l.count <= 0)
                    delete _garbage[this._id];
                return l.vaue;
            }
        }

        export interface IContextData {
            Module: Module
            CanAccessToMe?: (type, folder, name) => boolean;
        }

        export class Context {
            public context: Context;
            constructor(module: Module) {
                this.context = this;
                const id = ++counter;
                Object.defineProperty(this, 'Id', { value: id, writable: false, configurable: false });
                _store[id] = { Module: module };
                Object.freeze(this);
                Object.preventExtensions(this);
                Object.seal(this);
            }

            set CanAccessToMe(m: (type, folder, name) => void) {
                if (!(m instanceof Function))
                    return;
                const config = _store[this['Id']];
                Object.defineProperty(config, 'CanAccessToMe', { value: m, writable: false, configurable: false });
            }

            canAccessToMe(type, folder, name) {
                const config = _store[this['Id']];
                if (config.CanAccessToMe)
                    return config.CanAccessToMe(type, folder, name);
                return true;
            }

            GetPath(url: string) {
                const config = _store[this['Id']];
                return config.Module.Folder.FullName + ((url as any).startsWith('/') ? url.substring(1) : url);
            }

            NameOf(type: Function) {
                const config = _store[this['Id']];
                return config.Module.NameOf(type);
            }

            GetType(path) {
                if (path == null) return null;
                const config = _store[this['Id']];
                return config.Module.GGetType(path);
            }
            GetEnum(path) {
                if (path == null) return null;
                const config = _store[this['Id']];
                return config.Module.GGetEnum(path);
            }

            GetStat(path) {
                if (path == null) return null;
                const config = _store[this['Id']];
                return config.Module.GetStat();
            }

            OnStat(module, stat, callback) {
                const config = _store[this['Id']];
                return config.Module.OnStatChanged(module, stat, callback);
            }

            OnGStat(stat, callback) {
                const config = _store[this['Id']];
                return config.Module.OnGStatChanged(stat, callback);
            }
            GetTemplateRoot(s: string | number): ITemplateModule | HTMLTemplateElement {
                const config = _store[this['Id']];
                var f = config.Module.Folder;
                if (typeof s === 'string') {
                    var p = new basics.Url(s);
                    f = Folder.NavigateTo(p.path, f);
                    s = p.getEName();
                    if (!f) return undefined;
                }
                if (f instanceof Module)
                    return f.getRooteOfTemplate(s);
            }
        }

        Object.defineProperty(Context.prototype, '__extends', { value: window['__extends'], writable: false, configurable: false, enumerable: false });

        export declare type IUrl = basics.IUrl;

        export interface IModuleOnExecuted {
            Owner?: any;
            callback: (m: Module, e: IModuleOnExecuted) => void;
        }

        export class Module {
            _stat: ModuleStat = ModuleStat.New;
            Script: string = "";
            Folder: Folder;
            exports: Exports;
            args: Args;
            Optional: boolean;
            _thisContext: Context;
            _listeners;
            _fn: string;
            constructor(folder: Folder, public Url: IUrl) {
                moduls.push(this);
                stack.push(this);
                this.exports = new Exports();
                //this.dependencies = [];
                this._stat = ModuleStat.New;
                this.Script = "";
                this._thisContext = new Context(this);
                if (folder == null)
                    throw "Context errro";
                this.Folder = folder;
                this.require = this.require.bind(this);
                this.define = this.define.bind(this);
                this._listeners = [];
            }


            call(toGet: Module, callback?, onerror?, context?): Exports {
                if (!toGet._thisContext.canAccessToMe(this.Url.moduleType, this.Folder.FullName, this.EName))
                    return onerror ? (context == null ? onerror("access denied") : onerror.call(context, "access denied")) : null;
                return callback ? (context == null ? callback(toGet.exports) : callback.call(context, toGet.exports)) : toGet.exports;
            }

            require(modulePath, callback: (m: Exports) => void, onerror?, context?) {
                if (typeof modulePath == 'string') {
                    const toGet = this.Folder.GetModule(modulePath);
                    if (toGet.Stat == ModuleStat.Executed)
                        return this.call(toGet, callback, onerror, context);
                    else if (toGet.Stat == ModuleStat.Failed)
                        return onerror && onerror.call(context, 'module failed to execute');
                    else if (toGet.Stat >= ModuleStat.Downloading) {
                        var fid = Date.now();
                        toGet.OnExecuted = { callback: function (d) { this.call(d, callback, onerror, context); }, Owner: this };
                    }
                    else if (toGet.Stat == ModuleStat.New) {
                        toGet.OnExecuted = { callback: function (d) { this.call(d, callback, onerror, context); }, Owner: this };
                        moduleDownloader.Download(toGet);
                    }
                    return null;
                }
            }
            private _onExecuted: IModuleOnExecuted[] = [];
            public set OnExecuted(v: IModuleOnExecuted | ((m: Module, e?: IModuleOnExecuted) => void)) {
                if (typeof v === 'function') v = { callback: v, Owner: this };
                if (this._stat >= ModuleStat.Executed)
                    v.callback.call(v.Owner, this, v);
                else this._onExecuted.push(v);
            }
            define() {
                return Folder.prototype.define.apply(this.Folder, arguments);
            }

            public checkOverflow() {
                var r = [];
                Module.checkOverflow(this, this, r, []);
                if (r.length != 0) {
                    console.log(this.FullName);
                }
                return r;
            }
            private static checkOverflow(find: Module, start: Module, rslt: { module: Module, arg: Dependency }[], checked?: Module[]) {
                if (checked.indexOf(start) !== -1) return;
                checked.push(start);
                if (!start.args) return;
                var d = start.args.Dependencies;
                if (!d) return;
                for (var i = 0; i < d.length; i++) {
                    var x = d[i].module;
                    if (x === find) { rslt.push({ module: find, arg: d[i] }); }
                    else
                        if (x instanceof Module)
                            Module.checkOverflow(find, x, rslt, checked);
                }
            }


            private onModuleExecuted() {
                var i = stack.indexOf(this);
                if (i !== -1) stack.splice(i, 1);
                var l = this._onExecuted.splice(0);
                for (var i = 0; i < l.length; i++) {
                    var c = l[i];
                    c.callback.call(c.Owner, this, c);
                }
            }
            NameOf(type: Function): string {
                return root.NameOf(type);
            }

            public GGetType(path: string): Function {
                let c = dic.getkey(path);
                if (c != null) return c;
                c = root.GetType(path.split('.'));
                if (c === undefined) return undefined;
                dic.set(c, path);
                return c;
            }
            private static getNativeTypes() {                
                var r = Object.getOwnPropertyNames(window);
                for (var i = 0; i < r.length; i++) {
                    var p = r[i];
                    var v = window[i] as Function;
                    if (v && v.prototype && v.prototype.constructor === v) dic.set(v, p);
                }
            }
            public static isConstructor(v) {
                return v && v.prototype && v.prototype.constructor === v;
            }
            public GGetEnum(path: string, global?): Object {
                if (!global) {
                    let c: any = dic.getkey(path);
                    if (c != null) return c;
                    c = root.getRadical().GetEnum(path.split('.'));
                    if (c === undefined) return undefined;
                    dic.set(c, path);
                    return c;
                } else {
                    var ds = this.args.Dependencies;
                    for (var i = 0; i < ds.length; i++) {
                        var d = ds[i].module;
                        if (d instanceof Module && d.Url.moduleType === ModuleType.code) {
                            var x = d.GetEnum(path.split('.'));
                            if (x) return x;
                        }
                    }
                }

            }

            public GetStat(): ModuleStat {
                return this._stat;
            }

            public OnStatChanged(module: string, stat: ModuleStat, callback: (me: Module, module: string | string[], oldStat: ModuleStat, newStat: ModuleStat) => ModuleStat) {
                const m = module ? this.Folder.GetModule(module) : this;
                const s = m.Stat;
                if (s >= stat) {
                    const ns = callback(this, module, s, stat);
                    if (typeof ns === 'number') {
                        if (ns <= s)
                            return;
                        else stat = ns;
                    }
                    else return;
                }
                m._listeners.push({ t: this, m: module, s: stat, c: callback });
            }

            OnGStatChanged(stat: ModuleStat, callback: () => void) {
                _listeners.push({ t: this, m: this, s: stat, c: callback });
            }

            GetType(path: string[]): Function {
                let c = this.exports;
                for (let i = 0; i < path.length; i++) {
                    c = c[path[i]];
                    if (c === undefined) return undefined;
                }
                return c instanceof Function ? c : undefined;
            }

            GetEnum(path: string[]): Object {
                let c = this.exports;
                for (let i = 0; i < path.length; i++) {
                    c = c[path[i]];
                    if (c === undefined) return undefined;
                }
                return typeof c === 'object' ? c : undefined;
            }

            onStatChanged(_old, _new) {
                for (let i = 0; i < this._listeners.length; i++) {
                    const l = this._listeners[i];
                    if (l.s > _old && l.s <= _new) {
                        try {
                            const ns = l.c(l.t.FullName, this.FullName, _new, l.s);
                            if (typeof ns === 'number') {
                                if (ns > l.s) {
                                    l.s = ns; continue;
                                }
                            }
                        } catch (e) {
                        }
                        this._listeners.splice(i, 1);
                        i--;
                    }
                }
            }

            onGStatChanged(_old, _new) {
                for (const l of _listeners) {
                    if (l.s > _old && l.s <= _new) {
                        try {
                            const ns = l.c(l.t.FullName, this.FullName, _new, l.s);
                            if (typeof ns === 'number' && ns > l.s)
                                l.s = ns;
                        } catch (e) {
                        }
                    }
                }
            }

            get Stat() {
                return this._stat;
            }

            set Stat(v) {
                if (v == this._stat)
                    return;
                if (v < this._stat) return;
                var lv = this._stat;
                this._stat = v;
                if (v >= ModuleStat.Executed)
                    this.onModuleExecuted();
                this.onStatChanged(lv, v);
                this.onGStatChanged(lv, v);
            }

            get Name() { return this.Url.moduleName; }

            get EName() { return this.Url.getEName(this.Url.isAsset ? undefined : 'js'); }

            get FullName() {
                if (this._fn == null)
                    this._fn = this.Folder.FullName + this.EName;
                return this._fn;
            }

            static Init() {
                const scrs = document.getElementsByTagName('script');
                for (let i = 0; i < scrs.length; i++) {
                    const scr = scrs.item(i);
                    const app = scr.getAttribute('entry-point');
                    if (app != undefined) {
                        var url = basics.Url.rootUrl.Combine(app)
                        root.require(url.toString(), (o: any) => { o.Start && o.Start(); }, o => { alert('we cannot find app'); });
                    }
                }
            }
            static id = 0;


            public setArgs(dependencies: string[], callback: Function) {
                const args = new Args(this, callback);
                for (let i = 0, l = dependencies.length; i < l; i++) {
                    let d = dependencies[i];
                    if (d == "exports") {
                        args.createDependency(this.exports, i);
                        continue;
                    }
                    else if (d == 'require') {
                        args.createDependency(this.require as any, i);
                        continue;
                    }
                    else if (d === 'context' || d === 'context.js' || (d as any).endsWith('/context') || (d as any).endsWith('/context.js')) {
                        args.createDependency(this._thisContext, i);
                    }
                    else if (d.indexOf('plugin|') === 0) {
                        var x = moduleDownloader.get(d.substr(7));
                        if (x) args.createDependency(x, i);
                    }
                    else {
                        var isOptional = false;
                        if ((d as any).startsWith('?')) isOptional = true, d = d.substr(1);
                        const dependencyModule = (Qrc.UseRelativePath ? this.Folder : root).GetModule(d);
                        const dm = args.createDependency(dependencyModule, i, isOptional);
                    }
                }
                args.Invoke();
            }
        }

        export class Folder {
            Modules: Modules;
            Assets: Modules;
            subFolders: SubsFolder;
            constructor(public Parent: Folder, public Name: string) {
                this.Modules = new Modules();
                this.Assets = new Modules();
                this.subFolders = new SubsFolder(this);
                this.require = this.require.bind(this);
                this.define = this.define.bind(this);
                if (ff) {
                    this.Parent = this;
                    ff = false;
                    this.Name = "";
                }
                else if (Parent == null) {
                    this.Parent = root;
                }
                //this.Url = Parent && Parent.Url.Combine(Name);
            }
            
            GetModule(modulePath: string): Module {

                var url = Qrc.UseRelativePath ? new basics.Url(this.FullName).Combine(modulePath) : basics.Url.rootUrl.Combine(modulePath);//var url = new basics.Url(modulePath);
                if (modulePath.length == 0)
                    throw 'modulePath argument is null';
                const folder = Folder.CreateWithUrl(url, this);
                const ressource = url.isAsset === true ? folder.Assets : folder.Modules;
                var t = ressource.getModule(url);
                if (!t) ressource.setModule(t = new Module(folder, url /* new basics.Url(folder.FullName).Combine(url)*/));
                return t;
            }
            _fn: string;
            get FullName(): string {
                if (!this._fn) {
                    if (this == this.Parent)
                        return this._fn = this.Name + '/';
                    const p = this.Parent;
                    this._fn = (p == null ? "" : p.FullName) + this.Name + '/';
                }
                return this._fn;
            }

            _createPath(url: IUrl): Folder {
                let cf: Folder = url.IsExternal ? external.subFolders.createFolder(url.host) : this;
                return cf.createPath(url.path);
            }
            createPath(modulePath: string[]): Folder {
                return Folder.CreatePath(modulePath, this);
            }
            public NafigateTo(pathString: string) {
                var path = new basics.Url(pathString);
                var f = Folder.NavigateTo(path.path, this);
                if (f && path.moduleName)
                    return f.GetModule(path.getEName())
                return f;
            }
            public static NavigateTo(urlPath: string[], cf?: Folder) {
                for (let i = 0, l = urlPath.length; i < l; i++) {
                    let folderName = urlPath[i];
                    folderName = folderName.trim();
                    switch (folderName) {
                        case '~':
                            cf = root;
                            break;
                        case '':
                        case '.':
                            continue;
                        case '..':
                            cf = cf && cf.Parent;
                            continue;
                        default:
                            if (!cf)
                                return undefined;
                            else {
                                const f = cf.subFolders.GetFolder(folderName);
                                if (!f) return undefined;
                                continue;
                            }
                    }
                }
                return cf;
            }
            public static CreatePath(urlPath: string[], cf?: Folder) {
                for (let i = 0, l = urlPath.length; i < l; i++) {
                    let folderName = urlPath[i];
                    folderName = folderName.trim();
                    switch (folderName) {
                        case '~':
                            cf = root;
                            break;
                        case '':
                        case '.':
                            continue;
                        case '..':
                            cf = cf && cf.Parent;
                            continue;
                        default:
                            if (!cf)
                                cf = new Folder(null, folderName);
                            else {
                                const f = cf.subFolders.GetFolder(folderName);
                                cf = f ? f : cf.subFolders.createFolder(folderName);
                                continue;
                            }
                    }
                }
                return cf;
            }
            public static CreateWithUrl(url: IUrl, root: Folder) {
                var r: Folder = url.IsInternal ? url.IsExternal ? global : root : external.subFolders.GetFolder(url.host) || external.subFolders.createFolder(url.host);
                return this.CreatePath(url.path, r);
            }
            _nameOf(type: Function) {
                const s = this.Modules._store;
                for (var i in s) {
                    const m = s[i];
                    var fn = Type.GetType(type, m.exports);
                    if (fn != null)
                        return fn;
                }
                const s1 = this.subFolders._store;
                for (var i in s1) {
                    const f = s1[i];
                    var fn = f._nameOf(type);
                    if (fn != null)
                        return fn;
                }
            }

            NameOf(type: Function) {
                let fn = dic.get(type);
                if (fn != undefined)
                    return fn;
                fn = this._nameOf(type);
                if (fn != null)
                    dic.set(type, fn);
                return fn;
            }

            GetType(path: string[]) {
                const s = this.Modules._store;
                for (var i in s) {
                    const m = s[i];
                    var fn = m.GetType(path);
                    if (fn !== undefined)
                        return fn;
                }
                const s1 = this.subFolders._store;
                for (var i in s1) {
                    const f = s1[i];
                    var fn = f.GetType(path) as Function;
                    if (fn !== undefined)
                        return fn;
                }
                return undefined;
            }

            GetEnum(path: string[]): Object {
                const s: { [s: string]: Module } = this.Modules._store;
                for (var i in s) {
                    const m = s[i];
                    var fn = m.GetEnum(path);
                    if (fn !== undefined)
                        return fn;
                }
                const s1 = this.subFolders._store;
                for (var i in s1) {
                    const f = s1[i];
                    fn = f.GetEnum(path);
                    if (fn !== undefined)
                        return fn;
                }
                return undefined;
            }

            public getRadical() {
                var folder: Folder = this;
                var child = null;
                parent = folder;
                do {
                    var parent = folder.Parent;
                    if (!parent || folder == parent) return folder;
                    folder = parent;
                } while (true);
            }

            define() {
                var moduleName = arguments[0];
                let s = 0;
                let module: Module;
                if (typeof arguments[0] === 'string') {
                    module = (Qrc.UseRelativePath ? this : root).GetModule(arguments[0]);
                    if (module.Stat > 2)
                        throw 'module ' + module.FullName + ' exist';
                    module.Stat = ModuleStat.Downloaded;
                } else {
                    s = -1;
                    module = new Module(this, new basics.Url('code|@anonymouse' + (++this.anonymouseCounter) + '.js'));
                }
                managers.CodeManager.idefine(module, arguments[1 + s], arguments[2 + s]);
            }

            require(modulePath, callback: (m: Exports) => void, onerror?, context?) {
                if (typeof modulePath == 'string') {
                    const toGet = this.GetModule(modulePath);
                    if (toGet.Stat == ModuleStat.Executed)
                        return this.call(toGet, callback, onerror, context);
                    else if (toGet.Stat == ModuleStat.Failed)
                        return onerror && onerror.call(context, 'module failed to execute');
                    else if (toGet.Stat >= ModuleStat.Downloading) {
                        var fid = Date.now();
                        toGet.OnExecuted = { callback: function (d) { this.call(d, callback, onerror, context); }, Owner: this };
                    }
                    else if (toGet.Stat == ModuleStat.New) {
                        toGet.OnExecuted = { callback: function (d) { this.call(d, callback, onerror, context); }, Owner: this };
                        moduleDownloader.Download(toGet);
                    }
                    return null;
                }
            }

            call(toGet: Module, callback?, onerror?, context?): Exports {
                if (!toGet._thisContext.canAccessToMe(-1, this.FullName, this.Name))
                    return onerror ? (context == null ? onerror("access denied") : onerror.call(context, "access denied")) : null;
                return callback ? (context == null ? callback(toGet.exports) : callback.call(context, toGet.exports)) : toGet.exports;
            }

            private anonymouseCounter: number;
            public getRooteOfTemplate(s: string | number, parsed?: Folder[]):ITemplateModule|HTMLTemplateElement {
                if (!parsed) parsed = [];
                else if (parsed.indexOf(this) !== -1 || this == null) return;
                parsed.push(this);
                for (var i in this.Assets._store) {
                    var m = this.Assets._store[i];
                    if (m.Url.moduleType === ModuleType.template) {
                        var x = m.exports as any as managers. ITemplateExport;
                        var c = x.template.get(s as any);
                        if (c) return c;
                    }
                }
                for (var i in this.subFolders._store) {
                    var f = this.subFolders._store[i];
                    var xm = f.getRooteOfTemplate(s, parsed);
                    if (xm) return xm;
                }
                if (this.Parent)
                    return this.Parent.getRooteOfTemplate(s, parsed);
            }
        }

        export class SubsFolder {
            _store: { [s: string]: Folder } = {};
            constructor(public folder: Folder) {
            }

            GetFolder(folderName: string): Folder {
                return this._store[folderName.toLowerCase().trim()];
            }

            createFolder(foldername: string) {
                const t = new Folder(this.folder, foldername);
                this._store[foldername.toLowerCase().trim()] = t;
                return t;
            }
        }

        export class Modules {
            _store: {[s: string]:Module} = {};
            OnExecuted = new net.EventListener(1);

            constructor() {
                this._store = {};
                this.OnExecuted = new net.EventListener(1);
            }
            getModule(url: IUrl) {
                return this._store[url.getEName(url.isAsset ? undefined : 'js')];
            }

            setModule(_module: Module) {
                this._store[_module.EName] = _module;
            }
        }


        export class Type {
            static passed = [];
            static type;
            static _getPath(root) {
                if (root.constructor === Object || root.constructor === Exports)
                    for (const i in root) {
                        const v = root[i];
                        if (v == null) continue;
                        if (this.passed.indexOf(v) !== -1)
                            continue;
                        this.passed.push(v);
                        switch (typeof v) {
                            case 'string':
                            case 'number':
                            case 'boolean':
                            case 'undefined': continue;
                            default:
                                if (v === this.type) {
                                    return i;
                                }
                                if (v instanceof Function)
                                    continue;
                                const x = this._getPath(v);
                                if (x != null)
                                    return `${i}.${x}`;
                                break;
                        }
                    }
                return null;
            }

            static GetType(type, root) {
                this.type = type;
                this.passed.length = 0;
                return this._getPath(root);
            }
        }


        export class Dependency {
            constructor(public Args: Args, public module: Module | Exports | Context | IModuleManager<any, any>, public Index: number) {
            }
        }

        export class Exports {
            constructor(x?) {
                if (x)
                    for (var c in x)
                        this[c] = x[c];
                else return;
                Object.freeze(this);
                Object.seal(this);
            }
            clone(x) {
                for (var c in x)
                    this[c] = x[c];
            }
        }


        export class Args {

            Dependencies: Dependency[] = [];
            nsuccess: number = 0;
            _args: (Exports | Context | IModuleManager<any, any>)[];
            constructor(public Module: Module, public callback: Function) {
                this.moduleExecuted = this.moduleExecuted.bind(this);
                Module.args = this;
                args.push(this);
            }
            createDependency(module: Module | Exports | Context | IModuleManager<any, any>, index: number, isOptional?: boolean) {
                const t = new Dependency(this, module, index);
                this.Dependencies[index] = t;
                
                if (!(module instanceof Module)) {
                    this.nsuccess++;
                }
                else {
                    if (isOptional)
                        this.nsuccess++;
                    
                    if (module.Stat >= ModuleStat.Executed)
                        this.nsuccess++;
                    else {
                        if (!isOptional)
                            module.OnExecuted = this.moduleExecuted;
                        if (module.Stat === ModuleStat.New)
                            moduleDownloader.Download(module);
                    }
                }
                return t;
            }
            moduleExecuted(module: Module) {
                this.nsuccess++;
                if (this.nsuccess >= this.Dependencies.length) {
                    this.nsuccess = Number.NEGATIVE_INFINITY;
                    this.Execute();
                }
            }

            populateArgs() {
                const _: (Exports | IModuleManager<any, any> | Context)[] = new Array(this.Dependencies.length);
                const $ = this.Dependencies;
                for (let i = 0, l = $.length; i < l; i++) {
                    const m = $[i].module;
                    if (m instanceof Module)
                        _[i] = this.Module.call(m);
                    else
                        _[i] = m;
                }
                this._args = _;
            }

            Execute() {
                this.populateArgs();
                var mod = this.Module;
                try {
                    if (mod.Stat >= ModuleStat.Executed)
                        return;
                    mod.Stat = ModuleStat.Executing;
                    var exp = this.callback.apply(mod._thisContext, this._args);
                    if (exp)
                        mod.exports.clone(exp);
                    mod.Stat = ModuleStat.Executed;
                }
                catch (e) {
                    mod.Stat = ModuleStat.Failed;
                }
            }
            Invoke() {
                if (this.nsuccess >= this.Dependencies.length)
                    this.Execute();
            }

            getUnExecuted() {
                var t = [];
                this.Dependencies.forEach(function (v, i, a) { if (v.module instanceof Module) if (v.module.Stat < 6) this.push(v.module); }, t);
                return t;
            }
            getUnSuccessed() {
                var t = [];
                this.Dependencies.forEach(function (v, i, a) { if (v.module instanceof Module) if (v.module.Stat > 6) this.push(v.module); }, t);
                return t;
            }
            static getUnExecuted() {
                var t: { m: Module, r: Module[] }[] = [];
                args.every(function (v, i, a) {
                    var r = v.getUnExecuted();
                    if (r.length !== 0)
                        t.push({ m: v.Module, r });
                    return true;
                }, t);
                return t;
            }
            static getUnSuccessed() {
                var t = [];
                args.every(function (v, i, a) {
                    var r = v.getUnSuccessed();
                    if (r.length !== 0)
                        t.push({ m: v.Module, r });
                    return true;
                }, t);
                return t;
            }
        }

        export function initialize() {
            http = new net.Downloader();
            moduleDownloader = new ModuleDownoader();
            Qrc = { UseRelativePath: QReqConfig.UseRelativePath };

            global = new Folder(null, basics.Url.rootUrl.host);
            root = Folder.CreateWithUrl(basics.Url.rootUrl, global);
            external = new Folder(null, "/");

            OnModuleCreated = [];
            _listeners = [];
            Module.Init();
            window['global'] = {
                root: root,
                global: global,
                external: external,
            }
        }

        export enum OperationPhase {
            Initializer,
            Downloader,
            Definer,
            Executer,
        }

        export interface IModuleEvent<D, E> {
            module: Module;
            dData?: D;
            eData?: E;
            error?: boolean;
            dataStat: any;
            OnOperationDone: (e: IModuleEvent<D, E>, pase: OperationPhase) => void;
        }

        export interface IModuleManager<D, E> {
            moduleType: ModuleType;
            Download(e: IModuleEvent<D, E>);
            Define?(e: IModuleEvent<D, E>);
            Execute?(e: IModuleEvent<D, E>);
            addEventListener(stat: string, callback: IPluginEventCallback, data: any);
            removeEventlistenr(stat: string, callback: IPluginEventCallback);
            avaibleEvents: string[];
        }

        interface PluginsEvent {
            exports: Exports;
            url: IUrl;
            data: any;
        }
        export declare type IPluginEventCallback = (e: PluginsEvent) => void;
        interface IPluginsStore {
            callback: IPluginEventCallback;
            data: any;
        }



        export namespace thread {

            var jobs = {};
            //secured vars
            var isRunning = false;
            var id = -1;
            var stack: thread.IDispatcherCallback[] = [];
            var djobs: thread.IDispatcherCallback[] = [];
            var cj = 0;
            //end secured vars
            export interface IDispatcherCallback {
                callback: (delegate: (...param: any[]) => void, param: any, _this: any) => void;
                params: JobParam;
                _this: any;
                optimizable: boolean;
                isWaiting: boolean;
                id: number;
                children: IDispatcherCallback[];
                ce: number;
            };
            export class JobParam {
                public params: any[];
                constructor(public id: number, params?: any[]) {
                    this.params = params || [];
                }
                public Set(...params: any[]) {
                    let p;
                    for (var i = params.length - 1; i >= 0; i--)
                        if ((p = params[i]) === undefined) continue;
                        else
                            this.params[i] = p;
                    return this;
                }
                public Set1(params: any[]) {
                    let p;
                    for (var i = params.length - 1; i >= 0; i--)
                        if ((p = params[i]) === undefined) continue;
                        else
                            this.params[i] = p;
                    return this;
                }
                public Clone() {
                    var t = new JobParam(this.id);
                    t.Set1(this.params);
                    return t;
                }
            }
            var OnIdle: ({ owner: any, callback: () => void })[] = [];
            var isIdle: boolean;
            function asIdle() {
                isIdle = true;
                var idls = OnIdle.slice();
                for (var i = 0; i < idls.length; i++) {
                    try {
                        var t = idls[i];
                        t.callback.call(t.owner);
                    } catch (e) {
                    }
                }
                isIdle = false;
                if (stack.length != 0) {
                    clearTimeout(id);
                    id = setTimeout((<any>Dispatcher).start, 0);
                    isRunning = true;
                }
            }
            export class Dispatcher {
                public static OnIdle(owner: any, callback: () => void) {
                    if (isIdle || !isRunning)
                        try {
                            callback.call(owner);
                        } catch (e) {

                        }
                    else
                        OnIdle.push({ owner: owner, callback: callback });
                }

                static InIdle() { return isIdle; }
                static GC() {
                    for (var i = 0, l = djobs.length; i < l; i++) {
                        var c = djobs[i];
                        c.children.length = 0;
                        c.ce = 0;
                    }
                    stack.length = 0;
                    cj = 0;
                    asIdle();
                }
                static clone(ojob: IDispatcherCallback, params: any[], __this?: any) {
                    var l = {
                        callback: ojob.callback,
                        _this: __this === undefined ? ojob._this : __this,
                        id: ojob.id,
                        isWaiting: true,
                        optimizable: false,
                        params: new JobParam(ojob.id).Set1(params || ojob.params.params)
                    };
                    ojob.children.push(l as thread.IDispatcherCallback);
                    return l as IDispatcherCallback;
                }
                public static cretaeJob(delegate: (...param: any[]) => void, param: any[], _this: any, optimizable: boolean) {
                    var t = {
                        callback: delegate,
                        params: new JobParam(djobs.length, param),
                        _this: _this,
                        optimizable: optimizable,
                        isWaiting: false,
                        id: djobs.length, children: [], ce: 0
                    };
                    djobs.push(t);
                    return t.params;
                }
                public static Clear(o: JobParam) {
                    var k = djobs[o.id];
                    var pj = k.children;
                    var ce = k.ce;
                    var l = pj.length;
                    for (var i = l - 1; i > ce; i--) {
                        var c = pj[i];
                        c.isWaiting = false;
                        c.optimizable = true;
                    }
                    pj.length = 0;
                    k.ce = 0;
                }
                public static get CurrentJob() {
                    return stack[cj];
                }
                private static start() {
                    isRunning = true;
                    if (stack.length === 0) {
                        isRunning = false; asIdle();
                        return;
                    }

                    var to = cj + Math.min(3, stack.length - cj);
                    for (; cj < to; cj++) {
                        var c = stack[cj];
                        if (c.isWaiting)
                            try {
                                var p = c.params.params;
                                c.callback.call(c._this, p[0], p[1], p[2]);
                            } catch (e) {
                            }
                        if (!c.optimizable) {
                            var pj = djobs[c.id];
                            pj.ce++;
                        }
                        c.isWaiting = false;
                        stack[cj] = null;
                    }

                    isRunning = cj < stack.length;
                    if (isRunning)
                        id = setTimeout(Dispatcher.start, 0);
                    else Dispatcher.GC();

                }
                public static Push(ojob: JobParam, params?: any[], _this?: any) {
                    var job = djobs[ojob.id];
                    if (!job.optimizable)
                        job = this.clone(job, params, _this);
                    else {
                        if (params)
                            job.params.Set(params);
                        job._this = _this === undefined ? job._this : _this;
                        if (job.isWaiting) { return; }
                    }
                    job.isWaiting = true;
                    stack.push(job);
                    if (!isRunning)
                        if (stack.length > 0) {
                            clearTimeout(id);
                            id = setTimeout(Dispatcher.start, 0);
                            isRunning = true;
                            isIdle = false;
                        }
                    return job;
                }
                public static call(_this, fn: Function, ...args: any[]) {
                    this.Push(delayedJob, [_this, fn, args]);
                }
            }
            var delayedJob = thread.Dispatcher.cretaeJob((context, fun: Function, args) => {
                fun.apply(context, args);
            }, [], null, false);
        }


        export class ModuleDownoader {
            private _store: { [s: number]: IModuleManager<any, any> } = {};
            private http = new net.Downloader();
            constructor() {
                this.register(new managers.StyleManager());
                this.register(new managers.CodeManager());
                this.register(new managers.TemplateManager());
                this.register(new managers.JsonManager());
            }
            public register<D, E>(manager: IModuleManager<D, E>) {
                this._store[manager.moduleType] = manager;
            }
            public Download<D, E>(module: Module, OnOperationDone?: (e: IModuleEvent<D, E>, phase: OperationPhase) => void, dataStat?: any): IModuleEvent<D, E> {
                if (module.Stat >= ModuleStat.Downloading) throw "Modul Stat Corrupted";
                var manager = this._store[module.Url.moduleType];
                if (!manager) {
                    module.Stat = ModuleStat.Failed;
                    return;
                }
                module.Stat = ModuleStat.Downloading;
                var e: IModuleEvent<D, E> = { module: module, dataStat: dataStat, OnOperationDone: OnOperationDone };
                manager.Download(e);
                return e;
            }
            public Execute<D, E>(e: IModuleEvent<D, E>) {
                if (e.module.Stat >= ModuleStat.Executing) throw "Modul Stat Corrupted";
                var manager = this._store[e.module.Url.moduleType];
                if (!manager) {
                    e.module.Stat = ModuleStat.Failed; return;
                }
                e.module.Stat = ModuleStat.Executing;
                manager.Download(e);
            }
            public get(s: string | ModuleType): IModuleManager<any, any> {
                if (typeof s === 'number')
                    var v: ModuleType = s;
                else {
                    v = ModuleType[s = s.toLowerCase()];
                    if (v === undefined) return this._store[s];
                }
                return this._store[v];
            }
        }

        interface KeyValue<K, V> {
            key: K;
            value: V;
        }

        namespace managers {
            Object.defineProperty(window, 'define', { get: () => { return CodeManager.define; }, set: (v) => { }, configurable: false, enumerable: false });
            Object.defineProperty(window, 'require', { get: () => { return CodeManager._current && CodeManager._current.module.require || root.require; }, set: (v) => { }, configurable: false, enumerable: false });

            abstract class Plugins<T, P> implements IModuleManager<T, P> {
                protected _avaibleEvents: string[];
                moduleType: ModuleType;
                abstract Download(e: IModuleEvent<T, P>);
                Define?(e: IModuleEvent<T, P>) { }
                Execute?(e: IModuleEvent<T, P>) { }
                private _eventsStore: { [s: string]: IPluginsStore[] } = {};

                addEventListener(stat: string, callback: IPluginEventCallback, data: any) {
                    var c = this._eventsStore[stat];
                    if (!c) this._eventsStore[stat] = c = [];
                    c.push({ data: data, callback: callback });
                }
                removeEventlistenr(stat: string, callback: IPluginEventCallback) {
                    var c = this._eventsStore[stat];
                    if (!c) return;
                    for (var i = 0; i < c.length; i++)
                        if (c[i].callback === callback) return c.splice(i, 1);
                }
                get avaibleEvents() {
                    return this._avaibleEvents;
                }

                protected detacheEvent(event: string | ModuleStat, url: IUrl, exports: Exports, data?) {
                    var c = this._eventsStore[event];
                    if (!c) return;
                    var plg: PluginsEvent = { data: data, exports: exports, url: url };
                    for (var i = 0; i < c.length; i++) {
                        var x = c[i];
                        try {
                            x.callback(plg);
                        } catch (e) {
                        }
                    }
                }
            }

            export interface ITemplateExport extends Exports {
                require: (m: Exports) => void;
                template: ITemplateModule;
                html: HTMLElement;
            }

            export class CodeManager extends Plugins<HTMLScriptElement, any> {
                private static instance: CodeManager;
                constructor() {
                    super();
                    if (CodeManager.instance) throw "this is Singliton class";
                    CodeManager.instance = this;
                }
                private static eventHandler(e) {
                    return CodeManager.instance.handleEvent(e, this);
                }
                public moduleType: ModuleType = ModuleType.code;
                private static _store: IModuleEvent<HTMLScriptElement, any>[] = [];
                private static _isDownloading = false;

                public static _current: IModuleEvent<HTMLScriptElement, any>;
                private static Next() {
                    if (this._isDownloading) return;
                    this.Download();
                }
                private static Push(e: IModuleEvent<HTMLScriptElement, any>) {
                    if (e) this._store.push(e);
                    this.Next();
                }
                static interactiveScript: HTMLScriptElement;

                public handleEvent(evnt: Event, data: any) {
                    var c = CodeManager._current;
                    var m = c.module;
                    CodeManager._current = undefined;
                    CodeManager._isDownloading = false;
                    if (!c) return;
                    var s = c.dData;
                    this.detacheEvent(ModuleStat.Downloaded, m.Url, m.exports);
                    s.removeEventListener('load', data);
                    s.removeEventListener('error', data);
                    s.remove();
                    c.error = evnt.type === 'error';
                    m.Stat = ModuleStat.Defined;
                    try {
                        if (!c.error)
                            if (m.Stat != ModuleStat.Defined) {
                                m.exports.clone(window['exports']);
                                m.Stat = ModuleStat.Executed;
                                window['exports'] = {};
                            }

                    } catch (e) {
                        m.Stat = ModuleStat.Failed;
                    }
                    try {
                        c.OnOperationDone && c.OnOperationDone(c, OperationPhase.Downloader);                        
                    } catch (e) {
                    }
                    this.detacheEvent(m.Stat, m.Url, m.exports);   
                    CodeManager.Next();
                }
                public static define() {
                    var c = CodeManager._current;
                    if (!c)
                        if (arguments.length != 0)
                            return root.define.apply(root, arguments);
                        else throw "UnExpected Error";
                    else
                        CodeManager.beginDefine(c.module, arguments);
                }
                private static beginDefine(module: Module, args: IArguments) {
                    var name: string;
                    var deps: string[];
                    var callback: Function;
                    if (typeof args[0] === 'string')
                        Folder.prototype.define.apply(module.Folder, args);
                    else if (args[0] instanceof Array)
                        CodeManager.idefine(module, args[0], args[1]);
                    else {
                        throw 'Code not implimented';
                    }
                }
                private static Download() {
                    if (this._store.length === 0) {
                        this._isDownloading = false;
                        this._current = undefined;
                        return;
                    }
                    var e = this._current = this._store.shift();
                    var s = document.createElement('script');
                    var c = e.module;
                    s.src = c.FullName;
                    e.dData = s;
                    c.Stat = ModuleStat.Downloading;
                    var y = { _this: this, handleEvent: this.eventHandler };
                    s.addEventListener('load', y);
                    s.addEventListener('error', y);
                    this._isDownloading = true;
                    document.head.appendChild(s);
                }
                Download(e: IModuleEvent<HTMLScriptElement, any>) {
                    if (e.module.Url.FullPath.indexOf('sys/models.js') !== -1) stop();
                    CodeManager.Push(e);
                }
                Define(e: IModuleEvent<HTMLScriptElement, any>) {

                }
                Execute(e: IModuleEvent<HTMLScriptElement, any>) {

                }
                public static getUrls() {
                    var ret = [];
                    var c = document.head.firstChild;
                    do {
                        if (c instanceof HTMLScriptElement && (c.src || "").trim() != "") {
                            ret.push(c.src);
                        }
                    } while (c = c.nextSibling);
                    return ret;
                }

                public static idefine(m: Module, dependencies: string[], callback: Function) {
                    if (m.Stat >= ModuleStat.Defining)
                        return;
                    m.Stat = ModuleStat.Defining;
                    const args = new Args(m, callback);
                    for (let i = 0, l = dependencies.length; i < l; i++) {
                        let d = dependencies[i];
                        if (d == "exports") {
                            args.createDependency(m.exports, i);
                            continue;
                        }
                        else if (d == 'require') {
                            args.createDependency(m.require as any, i);
                            continue;
                        }
                        else if (d === 'context' || d === 'context.js' || (d as any).endsWith('/context') || (d as any).endsWith('/context.js')) {
                            args.createDependency(m._thisContext, i);
                        }
                        else if (d.indexOf('plugin|') === 0) {
                            var x = moduleDownloader.get(d.substr(7));
                            if (x) args.createDependency(x, i);
                        }
                        else {
                            var isOptional = false;
                            if ((d as any).startsWith('?')) isOptional = true, d = d.substr(1);
                            const dependencyModule = (Qrc.UseRelativePath ? m.Folder : root).GetModule(d);
                            const dm = args.createDependency(dependencyModule, i, isOptional);
                        }
                    }
                    m.Stat = ModuleStat.Defined;
                    args.Invoke();
                }
            }

            export class StyleManager extends Plugins<HTMLLinkElement, StyleSheet> {
                public moduleType: ModuleType = ModuleType.style;
                public static handleEvent(evnt: Event) {
                    var t = this as any;
                    (t.t as StyleManager).onDownloaded(t.e, this, evnt);
                }
                Download(e: IModuleEvent<HTMLLinkElement, any>) {
                    var s = document.createElement('link');
                    s.rel = "stylesheet"
                    var m = e.module;
                    s.href = m.Url.FullPath;
                    e.dData = s;
                    m.Stat = ModuleStat.Downloading;
                    var t = { handleEvent: StyleManager.handleEvent, e: e, t: this };
                    s.addEventListener('load', t);
                    s.addEventListener('error', t);
                    document.head.appendChild(s);
                }
                Define(e: IModuleEvent<HTMLLinkElement, any>) {

                }
                Execute(e: IModuleEvent<HTMLLinkElement, any>) {

                }
                private onDownloaded(e: IModuleEvent<HTMLLinkElement, any>, data: EventListenerObject, evnt: Event) {
                    e.dData.removeEventListener('load', data);
                    e.dData.removeEventListener('error', data);
                    var m = e.module;
                    var s = e.dData;
                    this.detacheEvent(ModuleStat.Downloaded, m.Url, m.exports);
                    e.error = evnt.type === 'error';
                    m.Stat = ModuleStat.Defined;
                    try {
                        e.eData = s.sheet;
                        m.Stat = e.error ? ModuleStat.Failed : ModuleStat.Executed;
                        if (!e.error) {
                            m.exports.clone({
                                sheet: s.sheet,
                                dom: s,
                            });
                        }
                        e.OnOperationDone && e.OnOperationDone(e, OperationPhase.Downloader);
                    } catch (e) {
                    }

                    this.detacheEvent(m.Stat, m.Url, m.exports);
                }                
            }
            export class Templates {
                private static split(s: string): (string | number)[] {
                    var t = [];
                    var path = s.split('.');
                    for (var i = 0; i < path.length; i++) {
                        var f = path[i];
                        if (f === '') continue;
                        var p = f.split(/[\]\[]/);
                        if (p.length === 1)
                            t.push(f);
                        else {
                            for (var j = 0; j < p.length; j++) {
                                var indice: number;
                                var isIndice = isNaN(indice = parseInt(p[i]));
                                if (isIndice) t.push(indice);
                                else t.push(p[i]);
                            }
                        }
                    }
                    return t;
                }
                public static get(s: string, context: Context) {
                    var path = this.split(s);
                    var root = context.GetTemplateRoot(path[0]);
                    var t: typeof root = root;
                    for (var i = 1; i < path.length; i++) {
                        var fld = path[i];
                        if (t instanceof Element) return undefined;
                        t = t.get(fld as any);
                    }
                    return t;
                }
            }

            export class TemplateManager extends Plugins<any, any> {

                moduleType = ModuleType.template;
                Download(e: IModuleEvent<any, any>) {
                    http.Push(e.module.Url, new net.downloadCallback(TemplateManager._execute, { key: this, value: e }, true));
                }
                private static _execute(http: net.Downloader, pr: net.downloadCallback<KeyValue<TemplateManager, IModuleEvent<any, any>>>) {
                    var _this = pr.data.key;
                    var e = pr.data.value;
                    var m = e.module;
                    m.Stat = ModuleStat.Downloaded;
                    _this.detacheEvent(ModuleStat.Downloaded, m.Url, m.exports);
                    try {
                        var t = document.createElement('div');
                        t.innerHTML = http.webr.Response;
                        var requires: string[] = [];
                        var x = TemplateManager.BuildTree(t.firstElementChild, requires);

                        m.exports.clone({
                            require: m.require,
                            template: TemplateManager.reduce(x),
                            html: t.firstElementChild
                        });

                    } catch (ex) {
                        pr.IsSuccess = false;
                    }
                    if (pr.IsSuccess && requires.length != 0) {
                        m.setArgs(requires, (a) => {
                            m.Stat = pr.IsSuccess ? ModuleStat.Executed : ModuleStat.Failed;
                            _this.detacheEvent(m.Stat, m.Url, m.exports);
                        });
                    } else {
                        m.Stat = pr.IsSuccess ? ModuleStat.Executed : ModuleStat.Failed;
                        _this.detacheEvent(m.Stat, m.Url, m.exports);
                    }
                }
                private templates: ITemplateModule[] = [];
                
                Execute(e: IModuleEvent<any, any>) {
                }
                private static reduce(x) {
                    if (Object.getOwnPropertyNames(x).length === 2 && x['#'].length === 1)
                        return TemplateManager.reduce(x['#'][0]);
                    return x;
                }
                private static get(s: string | number) {
                    if (typeof s === 'string')
                        return this[s];
                    return this['#'][s];
                }
                private static BuildTree(html: Element, requires: string[]) {
                    var _tree = { get: this.get }, _ind = []; _tree['#'] = _ind;
                    return TemplateManager.reduce(this.buildTree(html, _tree, _ind,requires));
                }
                private static buildTree(html: Element, tree: object, ind: any[],requires:string[]) {
                    var name = html.getAttribute('name')
                    switch (html.tagName) {
                        case 'REQUIRE':
                            requires.push(html.getAttribute('module') || html.getAttribute('url') || (<HTMLElement>html).innerText || html.innerHTML);
                            break;
                        case 'TEMPLATES':
                        case 'DESCRIPTOR':
                            var _tree = { get: this.get }, _ind = []; _tree['#'] = _ind;
                            if (name) tree[name] = _tree;
                            else ind.push(_tree);
                            var t = html.firstElementChild;
                            while (t) {
                                this.buildTree(t, _tree, _ind, requires);
                                t = t.nextElementSibling;
                            }
                            break;
                        default:
                        case 'TEMPLATE':
                            if (name) tree[name] = html;
                            else ind.push(name);
                            break;
                    }
                    return tree;
                }

                public OnNewTemplateExecuted: net.EventListener = new net.EventListener(managers);

            }
            
            export class JsonManager extends Plugins<any, any> {
                moduleType = ModuleType.json;
                Download(e: IModuleEvent<any, any>) {
                    http.Push(e.module.Url, new net.downloadCallback(JsonManager._execute, { key: this, value: e }, true));
                }
                private static _execute(http: net.Downloader, pr: net.downloadCallback<KeyValue<JsonManager, IModuleEvent<any, any>>>) {
                    var _this = pr.data.key;
                    var e = pr.data.value;
                    var m = e.module;
                    _this.detacheEvent(ModuleStat.Downloaded, m.Url, m.exports);
                    if (pr.IsSuccess)
                        try {
                            m.exports.clone({
                                require: m.require,
                                value: JSON.parse(http.webr.Response),
                            });
                        } catch (e) {
                            pr.IsSuccess = false;
                        }
                    m.Stat = pr.IsSuccess ? ModuleStat.Executed : ModuleStat.Failed;
                    _this.detacheEvent(m.Stat, m.Url, m.exports);
                }
            }
        }
    }
    var global: core.Folder;
    var root: core.Folder;
    var external: core.Folder;
    var Qrc: { UseRelativePath: boolean };
    var http: net.Downloader;
    var OnModuleCreated: Array<any>;
    var _listeners: Array<any>;
    var moduleDownloader: core.ModuleDownoader;
    
    core.initialize();

    export function checkOverFlow() {
        var t = [];
        for (var i = 0; i < stack.length; i++) {
            var r = stack[i].checkOverflow();
            if (r.length != 0) t.push([stack[i], r]);
        }
        return t;
    }
    export function checkStat() {
        var t = [];
        for (var i = 0; i < stack.length; i++) {
            var r = stack[i];
            if (r.Stat<6) t.push(r);
        }
        return t;
    }
    export function getUnExecuted() {
        return core.Args.getUnExecuted() as any;
    }
    export function getUnUnSuccessed() {
        return core.Args.getUnSuccessed() as any; 
    }
    interface isx {
        a: string, m: core.Module, r: isx[], push: (m: isx) => void
    }
    export function getUExecuted() {
        var map: isx[] = [];
        function getM(m: core.Module) {
            for (var i = 0; i < ts.length; i++) {
                var r = ts[i];
                if (r.m === m) return r;
            }
            ts.push(r = {
                a: m.FullName,
                m: m, r: [],
                push: function (m: isx) {
                    if (this.r.indexOf(m) === -1) {
                        this.r.push(m);
                        var i = map.indexOf(m);
                        if (i !== -1) map.splice(i, 1);
                    }
                },
            });
            map.push(r);
            return r;
        }
        var ts: isx[] = [];
        var t = [];
        getUnExecuted().forEach(function (v, i, a) {
            var tx = getM(v.m);
            v.r.forEach(function (av, ai, aa) {
                getM(av).push(tx);
            });
        }, t);
        return ts as any;
    }
}
function ValidateImport(...styles: any[]) {
    for (var i = 0; i < styles.length; i++)
        if (styles[i] == undefined) styles.splice(i, 1);
        else continue;
}