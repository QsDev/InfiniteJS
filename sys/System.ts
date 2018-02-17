import {net, Common, bind, basic, collection, utils, encoding,reflection} from './Corelib';
import {context} from 'context';
var _services = {};
var _defualt: Controller.ProxyData;
var apis = new collection.Dictionary<Function, Controller.Api<any>>("Apis", false);
export declare type RequestMethodShema = net.RequestMethodShema;
export module Controller {
    export function Register(service: IService) {
        Object.freeze(service);
        Object.defineProperty(_services,
            service.Name,
            {
                configurable: false,
                enumerable: false,
                value: service,
                writable: false
            });
    }
    
    export abstract class Api<T> {

        public abstract GetType();
        public abstract GetRequest(data: T, shema: RequestMethodShema | string | net.WebRequestMethod, params: net.IRequestParams): net.RequestUrl;
        public abstract OnResponse(response: JSON, data: T, context: encoding.SerializationContext);
        constructor( reg?: boolean) {
            apis.Set(this.GetType(), this);
        }
        public Register(method: RequestMethodShema) {
            method.Name = method.Name.toUpperCase();
            if (typeof method.ParamsFormat === 'string')
                method.ParamsFormat = basic.CompileString(method.ParamsFormat);
            this._methodsShema[method.Name] = method;
        }
        public ERegister(method: net.WebRequestMethod, name: string, paramsFormat: string, sendData: boolean) {
            this.Register({ Method: method, Name: name, ParamsFormat: paramsFormat && basic.CompileString(paramsFormat), SendData: sendData });
        }
        public GetMethodShema(m: net.WebRequestMethod | string | net.RequestMethodShema) {
            if (typeof m === 'string') return this._methodsShema[m.toUpperCase()];//|| { Name: m, Method: 0} as any;
            if (typeof m === 'number') {
                var x = this._methodsShema[net.WebRequestMethod[m].toUpperCase()];
                if (x != null) return x;
                for (var i in this._methodsShema) {
                    var v: net.RequestMethodShema = this._methodsShema[i];
                    if (v.Method === m) return v;
                }
                return;// { Name: String(m), Method: m } as any;
            } else if(m) {
                if (!m.Name) return m;
            }
            for (var i in this._methodsShema) {
                var v: net.RequestMethodShema = this._methodsShema[i];
                return v;
            }
            return;// { Name: 'GET', Method: 0 } as any;
        }
        private _methodsShema: { [n: string]: RequestMethodShema } = {};
    }
    export class CostumeApi<T> extends Api<T> {
        public GetType() { return this._type; }
        public GetRequest(data: T): net.RequestUrl { return this._getRequest(data); }
        public OnResponse(response: JSON, data: T) { return this._onResponse(response, data); }
        constructor(private _type: Function,
            private _getRequest: (data: T) => net.RequestUrl,
            private _onResponse: (response: JSON, data: T) => void) {
            super();
        }
    }

    var mt;
    function messageType() { return mt || (mt = context.GetType('models.Message')); }

    export interface IService {
        
        Name: string;
        OnResponse(proxy: ProxyCallback<any>, webr: net.QueeDownloader, json: IServiceResponse);
    }

    export interface IServiceResponse {
        __service__: string;
        dropRequest: boolean;
        iss: boolean;
        rdata: any;
        sdata: any;
    }

    export class ProxyCallback<T> extends net.RequestParams<T,net.QueeDownloader> {
        constructor(data: T,
            public param: any,
            public api: Api<T>,
            public context?: encoding.SerializationContext,
            public callBack?: (s: ProxyCallback<T>, result: T, success: boolean, req?: net.WebRequest) => void,
            public method?: net.WebRequestMethod) {
            super(null, data, true);
        }

        private static parse(json) {
            if (json == null || json.trim() == "") return null;
            try { return JSON.parse(json); } catch (e) { return null; }
        }

        public Callback(sender: net.QueeDownloader, result: net.WebRequest) {
            var iss = true;
            try {
                var r = sender.Request.IsSuccess ? ProxyCallback.parse(result.Response) : null;
                
                if (r && r.hasOwnProperty('__service__')) {
                    var sr: IServiceResponse = r;
                    if (sr.__service__) {
                        var s = _services[sr.__service__] as IService;
                        if (s)
                            s.OnResponse(this, sender, sr);
                        if (sr.dropRequest) return;
                        
                    }
                    iss = sr.iss;
                    r = sr.rdata;
                }
                if (this.api)
                    this.api.OnResponse(r, this.data, this.context || encoding.SerializationContext.GlobalContext);
            } catch (ee) {
                iss = false;
            }
            if (this.callBack)
                this.callBack(this, r, iss && this.IsSuccess, result);
        }

        public OutputData():string {
            if ('string' === typeof this.data) return this.data as any as string;
            var r = this.context == null;
            var e = r ? new encoding.SerializationContext(true) : this.context.reset();
            var d = e.ToJson(this.data);
            if (r) e.Dispose();
            return JSON.stringify(d);
        }

    }
    export class ProxyData {
        private http: net.QueeDownloader;
        private quee: ProxyCallback<any>[] = [];
        private apis: collection.Dictionary<Function, Api<any>>

        public set Crypto(v: basic.ICrypto) {
            this.http.Crypto = v;
        }

        constructor(crpt: basic.ICrypto, isCostume: boolean) {
            if (_defualt != null) throw null;
            this.http = new net.QueeDownloader(crpt);
            this.apis = isCostume ? new collection.Dictionary<Function, Api<any>>("Apis", false) : apis;
        }

        public Register<T>(api: Api<any>) {
            this.apis.Set(api.GetType(), api);
        }

        

        private static getMethod(api: Api<any>, m: net.WebRequestMethod | string | net.RequestMethodShema): net.WebRequestMethod {
            if (typeof m === 'number') return m;
            if (typeof m === 'string') {
                var x = api.GetMethodShema(m);
                return x ? x.Method : 0;
            }
            if (x.Name)
                return net.WebRequestMethod[(m as net.RequestMethodShema).Name] || 0;
            return 0;
        }
        public Request<T>(
            type: Function, method: string | net.RequestMethodShema | net.WebRequestMethod, data?: T, params?: net.IRequestParams,
            callback?: RequestCallback<T>, costumize?: RequestCostumize<T>, beforRequest?: (req: net.IRequestUrl) => void, objectStat?: any) {
            const api = this.apis.Get(type != null ? type : data.constructor);
            const t = new ProxyCallback(data, objectStat, api, encoding.SerializationContext.GlobalContext, callback, ProxyData.getMethod(api, method));
            const req = api.GetRequest(data, method, params);
            req.beforRequest = beforRequest;
            if (costumize) costumize(req, t);
            this.http.Push(req, t, null);
        }
        public Push<T>(type: Function, data: T, param: any, callBack?: RequestCallback<T>, method?: net.WebRequestMethod, costumize?: RequestCostumize<T>, serializer?: encoding.SerializationContext, beforRequest?: (req: net.IRequestUrl) => void, params?: net.IRequestParams) {
			const api = this.apis.Get(type != null ? type : data.constructor);
			const t = new ProxyCallback(data, param, api, serializer || new encoding.SerializationContext(true) || encoding.SerializationContext.GlobalContext, callBack);
            const req = api.GetRequest(data, null, params);
            req.HasBody = true;
			req.beforRequest = beforRequest;
            if (method != undefined)
                req.Method = method;
            if (costumize) costumize(req, t);
            this.http.Push(req, t, params);
        }

        public Post<T>(type: Function, data: T, param: any, callBack?: RequestCallback<T>, costumize?: RequestCostumize<T>, serializer?: encoding.SerializationContext, params?: net.IRequestParams) {
            const api = this.apis.Get(type != null ? type : data.constructor);
            const t = new ProxyCallback(data, param, api, serializer || encoding.SerializationContext.GlobalContext, callBack);
            const req = api.GetRequest(data, null, params);
            req.HasBody = true;
            req.Method = net.WebRequestMethod.Post;
            if (costumize) costumize(req, t);
            this.http.Push(req, t, params);
        }

        public Put<T>(type: Function, data: T, param: any, callBack?: RequestCallback<T>, costumize?: RequestCostumize<T>, serializer?: encoding.SerializationContext, params?: net.IRequestParams) {
            const api = this.apis.Get(type != null ? type : data.constructor);
            const t = new ProxyCallback(data, param, api, serializer || encoding.SerializationContext.GlobalContext, callBack);
            const req = api.GetRequest(data, null, params);
            req.HasBody = true;
            req.Method = net.WebRequestMethod.Put;
            if (costumize) costumize(req, t);
            this.http.Push(req, t,params);
        }

        public Get<T>(type: Function, data: T, param: any, callBack?: RequestCallback<T>, costumize?: RequestCostumize<T>, serializer?: encoding.SerializationContext, params?: net.IRequestParams) {
            const api = this.apis.Get(type != null ? type : data.constructor);
            const t = new ProxyCallback(data, param, api, serializer || encoding.SerializationContext.GlobalContext, callBack);
            const req = api.GetRequest(data, null, params);
            req.Method = net.WebRequestMethod.Get;
            if (costumize) costumize(req, t);
            this.http.Push(req, t, params);
        }
        public Delete<T>(type: Function, data: T, param: any, callBack?: RequestCallback<T>, costumize?: RequestCostumize<T>, serializer?: encoding.SerializationContext, params?: net.IRequestParams) {
            const api = this.apis.Get(type != null ? type : data.constructor);
            const t = new ProxyCallback(data, param, api, serializer || encoding.SerializationContext.GlobalContext, callBack);
            const req = api.GetRequest(data, null, params);
            req.Method = net.WebRequestMethod.Delete;
            if (costumize) costumize(req, t);
            this.http.Push(req, t, params);
            return req;
        }

        public static get Default() { return _defualt || (_defualt = new ProxyData(basic.Crypto, false)); }
    }
    export declare type RequestCallback<T> = (_s: ProxyCallback<T>, r: JSON, issuccess: boolean, result?: net.WebRequest) => void;
    export declare type RequestCostumize<T> = (_req: net.IRequestUrl, t: ProxyCallback<any>) => void;
}



export module sdata {

    export enum DataStat {
        IsNew = 0,
        Modified = 1,
        Saved = 2,
        Updating = 4,
        Uploading = 8,
        Updated = 16,   
        Frozed = 32
    }

    export abstract class DataRow extends bind.DObject implements basic.IId {
        public static DPId: bind.DProperty<number, DataRow> = bind.DObject.CreateField<number, DataRow>("Id", Number, 0, (e) => {
            e.__this.OnIdChanged(e._old, e._new);
        }, (e) => {
            if (e._new == null || e._new === 0)
                e._new = basic.New();
        }, bind.PropertyAttribute.IsKey);
        protected static DPStat: bind.DProperty<DataStat, DataRow> = bind.DObject.CreateField<DataStat, DataRow>("Stat", Number, 0, null, null, bind.PropertyAttribute.Private | bind.PropertyAttribute.NonSerializable);
        public get Stat() { return this.get(DataRow.DPStat); }
        public set Stat(s: sdata.DataStat) { this.set(DataRow.DPStat, s); }

        public static CreateFromJson(json, type: typeof DataRow, requireNew: boolean) {
            if (requireNew) return null;
            const id = (typeof json === 'number' ? json : json.Id) as number;
            return typeof id === 'number' ? type.getById(id, type) : null;
        }

        protected OnIdChanged(old: number, nw: number) {
            const store = this.getStore();
            if (old)
                store.Remove(old);
            if (nw)
                store.Set(nw, this);
        }
        protected abstract getStore(): collection.Dictionary<number, this>;
        get Id(): number {
            return this.get(DataRow.DPId);
        }
        set Id(v: number) {
            this.set(DataRow.DPId, v);
        }
        constructor(id: number) {
            super();
            const st = this.getStore();
            if (id) {
                if (st.Get(id) != null) throw "enristrement exist";
                this.set(DataRow.DPId, id);
            }
        }
        public static __fields__(): Array<any> {
            return [
                DataRow.DPId, DataRow.DPStat
            ];
        }
        public static getById(id: number, type: Function) {
            
        }
        FromJson(json: any, context: encoding.SerializationContext, update?: boolean): this {            
            if (typeof json === 'number') {
                if (this.Stat >= DataStat.Updating)
                    return this;

                this.Id = json;
                this.set(DataRow.DPStat, DataStat.Updating);
                Controller.ProxyData.Default.Request(this.constructor, "UPDATE", this, this as any, () => { if (this.Stat > DataStat.Updating) { return false; } return true; });
            } else {
                this.set(DataRow.DPStat, DataStat.Updated);
                super.FromJson(json, context, update);
                if (json != null && json.IsFrozen == true) {
                    this.Freeze();
                }
            }
            return this;
        }

        //private t: string;
        public get TableName() {
            return context.NameOf(this.constructor).replace("models.", "");// this.t;
        }
        abstract Update();
        abstract Upload();
    }

    export abstract class QShopRow extends sdata.DataRow {
        static __fields__() { return []; }
        GenType(): Function { return QShopRow; }
        private static _QueryApi: string;
        public static get QueryApi(): string {
            return this._QueryApi;
        }
        constructor(id?: number) {super(id);}
        Update() {
            
        }
        Upload() {
            
        }
    }
    export abstract class DataTable<T extends DataRow> extends collection.List<T>{
        private static DPOwner = DataTable.CreateField<DataRow, DataTable<any>>('Owner', DataRow, null, null, null, bind.PropertyAttribute.SerializeAsId);

        public static DPStat = bind.DObject.CreateField<DataStat, DataTable<any>>('Stat', Number, 0, null, null, bind.PropertyAttribute.Private);
        public Stat: DataStat;

        static __fields__() {
            return [DataTable.DPOwner];
        }
        get Owner() { return this.get(DataTable.DPOwner); }
        set Owner(v: DataRow) {  this.set(DataTable.DPOwner, v); }
        constructor(private _parent: DataRow, argType: Function, private ctor: (id: number) => T, array?: T[]) {
            super(argType, array);
            this.Owner = _parent;
        }
        public CreateNewItem(id: number): T { return this.ctor(id); }
        FromJson(json: any, x: encoding.SerializationContext, update?: boolean, callback?: (prop: string, val: any) => Object) {
            if (this.Stat == sdata.DataStat.Frozed) return;
            this.set(DataTable.DPStat, DataStat.Updating);
            const obj = super.FromJson(json, x, update, callback) as DataTable<T>;
            this.set(DataTable.DPStat, DataStat.Updated);
            if (json == null) return this;
            if (json != null && json.IsFrozen == true)
                this.Freeze();
            return this;
        }

        public GetById(id: number) :T{
            var t = this.AsList();
            var _ = DataRow.DPId;
            for (var i = 0, l = t.length; i < l; i++)
                if (t[i].GetValue<number>(_) === id) return t[i];
            return undefined;
        }

        Update() {

        }
        Upload() {
        }
        Add(item: T) {
            return (this._list.indexOf(item) == -1) ? super.Add(item) : this;
        }
    }
    var stp = true;

    export declare type bindCallback = (e: bind.EventArgs<any, any>) => void;
    export interface Property {
        jname?: string;
        sname?: string;
        type: Function | reflection.DelayedType | reflection.GenericType;
        default?: any;
        onchange?: bindCallback;
        check?: bindCallback;
        get: () => any;
        set: (v: any) => any;
    }
    export interface Properties {
        [name: string]: Property | Function;
    }

    export interface Model {
        namespace: string;
        class: string;
        super: string | Model;
        properties: Properties;
        prototype: any;
        init();
        ctor();
        cctor();
        onPropertyChanged(e: bindCallback);
    }
}


export module base {
    export  interface Vecteur<T> extends bind.DObject{
        From: T;
        To: T;
        Check(val: T);
    }
    export class DateVecteur extends bind.DObject implements Vecteur<Date>{
        public static DPFrom = bind.DObject.CreateField<Date, DateVecteur>('From', Date);
        public static DPTo = bind.DObject.CreateField<Date, DateVecteur>('To', Date);
        get From() { return this.get(DateVecteur.DPFrom); } set From(v: Date) { this.set(DateVecteur.DPFrom, v); }
        get To() { return this.get(DateVecteur.DPTo); } set To(v: Date) { this.set(DateVecteur.DPTo, v); }
        static __fields__() { return [DateVecteur.DPFrom, DateVecteur.DPTo]; }
        Check(date: Date) {
            if (!sdata) return true;
            var f = this.From;
            var t = this.To;
            var val = date.getTime();
            return (f == null || f.getTime() <= val) && (t == null || t.getTime() >= val);
        }
    }
    export class NumberVecteur extends bind.DObject implements Vecteur<number>{
        public static DPFrom = bind.DObject.CreateField<number, NumberVecteur>('From', Number);
        public static DPTo = bind.DObject.CreateField<number, NumberVecteur>('To', Number);
        get From() { return this.get(NumberVecteur.DPFrom); } set From(v: number) { this.set(NumberVecteur.DPFrom, v); }
        get To() { return this.get(NumberVecteur.DPTo); } set To(v: number) { this.set(NumberVecteur.DPTo, v); }
        static __fields__() { return [NumberVecteur.DPFrom, NumberVecteur.DPTo];}
        Check(val: number) {
            if (!val) return true;
            return (this.From == null || this.From <= val) && (this.To == null || this.To >= val);
        }
    }


}



export module crypto {

    var aes_store = {};
    var Sbox = new Uint8Array([99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22]);
    var ShiftRowTab = new Uint8Array([0, 5, 10, 15, 4, 9, 14, 3, 8, 13, 2, 7, 12, 1, 6, 11]);
    var ShiftRowTab_Inv: Uint8Array;
    var Sbox_Inv: Uint8Array, xtime: Uint8Array;
    export function string2bytes(a: string):Uint8Array {
        var c = new Uint8Array(a.length);
        for (var d = 0; d < a.length; d++)
            c[d] = (a as string).charCodeAt(d);
        return c;
    }
    export function bytes2string(a: Uint8Array) {
        for (var c = "", d = 0; d < a.length; d++)
            c += String.fromCharCode(a[d]);
        return c
    }
    {
        ;
        Sbox_Inv = new Uint8Array(256);
        for (var b = 0; b < 256; b++)
            Sbox_Inv[Sbox[b]] = b;
        ShiftRowTab_Inv = new Uint8Array(16);
        for (b = 0; b < 16; b++)
            ShiftRowTab_Inv[ShiftRowTab[b]] = b;
        xtime = new Uint8Array(256);
        for (b = 0; b < 128; b++)
            xtime[b] = b << 1,
                xtime[128 + b] = b << 1 ^ 27;
    }

    export class ExAes  {

        protected Key: Uint8Array;
        constructor(key: string | Uint8Array) {
            if ('string' === typeof (key))
                this.Key = this.InitKey(string2bytes(key as string));
            else if (key instanceof Uint8Array)
                this.Key = this.InitKey(key);
            else throw "Invalid Key";
        }
        InitKey(key: Uint8Array): Uint8Array {
            return key;
        }

        static ExpandKey(b: Uint8Array) {
            ;
            var c = b.length, d, e = 1;
            switch (c) {
                case 16:
                    d = 176;
                    break;
                case 24:
                    d = 208;
                    break;
                case 32:
                    d = 240;
                    break;
                default:
                    alert("my.ExpandKey: Only key lengths of 16, 24 or 32 bytes allowed!")
            }
            for (var g = c; g < d; g += 4) {
                var h = b.slice(g - 4, g);
                if (g % c == 0) {
                    if (h = new Uint8Array([Sbox[h[1]] ^ e, Sbox[h[2]], Sbox[h[3]], Sbox[h[0]]]),
                        (e <<= 1) >= 256)
                        e ^= 283
                } else
                    c > 24 && g % c == 16 && (h = new Uint8Array([Sbox[h[0]], Sbox[h[1]], Sbox[h[2]], Sbox[h[3]]]));
                for (var f = 0; f < 4; f++)
                    b[g + f] = b[g + f - c] ^ h[f]
            }
        }

        Encrypt(data: Uint8Array): Uint8Array {
            ;
            var Key = this.Key;
            var d = Key.length;
            ExAes.AddRoundKey(data, Key.slice(0, 16));
            for (var e = 16; e < d - 16; e += 16)
                ExAes.SubBytes(data, Sbox),
                    ExAes.ShiftRows(data, ShiftRowTab),
                    ExAes.MixColumns(data),
                    ExAes.AddRoundKey(data, Key.slice(e, e + 16));
            ExAes.SubBytes(data, Sbox);
            ExAes.ShiftRows(data, ShiftRowTab);
            ExAes.AddRoundKey(data, Key.slice(e, d));
            return data;

        }

        Decrypt(data: Uint8Array): Uint8Array {
            ;
            var Key = this.Key;
            var d = Key.length;
            ExAes.AddRoundKey(data, Key.slice(d - 16, d));
            ExAes.ShiftRows(data, ShiftRowTab_Inv);
            ExAes.SubBytes(data, Sbox_Inv);
            for (d -= 32; d >= 16; d -= 16)
                ExAes.AddRoundKey(data, Key.slice(d, d + 16)),
                    ExAes.MixColumns_Inv(data),
                    ExAes.ShiftRows(data, ShiftRowTab_Inv),
                    ExAes.SubBytes(data, Sbox_Inv);
            ExAes.AddRoundKey(data, Key.slice(0, 16))
            return data;
        }

        static SubBytes(a: Uint8Array, c: Uint8Array) {
            ;
            for (var d = 0; d < 16; d++)
                a[d] = c[a[d]]
        }
        static AddRoundKey(a, c) {
            ;
            for (var d = 0; d < 16; d++)
                a[d] ^= c[d]
        }

        static ShiftRows(a, c) {
            ;
            for (var d = [].concat(a), e = 0; e < 16; e++)
                a[e] = d[c[e]]
        }

        static MixColumns(b) {
            ;
            var _xtime = xtime;
            for (var c = 0; c < 16; c += 4) {
                var d = b[c + 0]
                    , e = b[c + 1]
                    , g = b[c + 2]
                    , h = b[c + 3]
                    , f = d ^ e ^ g ^ h;
                b[c + 0] ^= f ^ _xtime[d ^ e];
                b[c + 1] ^= f ^ _xtime[e ^ g];
                b[c + 2] ^= f ^ _xtime[g ^ h];
                b[c + 3] ^= f ^ _xtime[h ^ d]
            }
        }
        static MixColumns_Inv(b) {
            ;
            var _xtime = xtime;
            for (var c = 0; c < 16; c += 4) {
                var d = b[c + 0]
                    , e = b[c + 1]
                    , g = b[c + 2]
                    , h = b[c + 3]
                    , f = d ^ e ^ g ^ h
                    , o = _xtime[f]
                    , p = _xtime[_xtime[o ^ d ^ g]] ^ f;
                f ^= _xtime[_xtime[o ^ e ^ h]];
                b[c + 0] ^= p ^ _xtime[d ^ e];
                b[c + 1] ^= f ^ _xtime[e ^ g];
                b[c + 2] ^= p ^ _xtime[g ^ h];
                b[c + 3] ^= f ^ _xtime[h ^ d]
            }
        }
    }

    export class AesCBC extends ExAes {
        constructor(key: string | Uint8Array) {
            super(key);
        }
        InitKey(key: Uint8Array) {
            ExAes.ExpandKey(key);
            return key;
        }
        static blockXOR(a:Uint8Array, c:Uint8Array):Uint8Array {
            ;
            for (var d = new Uint8Array(16), e = 0; e < 16; e++)
                d[e] = a[e] ^ c[e];
            return d
        }
        static blockIV(): Uint8Array {
            ;
            var a = new crypto.SecureRandom(), c = new Uint8Array(16);
            a.nextBytes(c);
            return c;
        }

        static pad16(a: Uint8Array): Uint8Array {
            ;
            var c = a.slice(0), d = (16 - a.length % 16) % 16;
            var c = new Uint8Array(a.length + d);
            for (var i = 0, l = a.length; i < l; i++)
                c[i] = a[i];
            return c;
        }
        ;
        static depad(a: Uint8Array) {
            ;
            for (var i = a.length - 1; i >= 0; i--)
                if (a[i] != 0) return a.slice(0, i + 1);
            return new Uint8Array(0);
        }

        concate(a: Uint8Array, b: Uint8Array) {                
            var x = new Uint8Array(a.length + b.length);
            for (var i = 0, l = a.length; i < l; i++)
                x[i] = a[i];
            for (var i = 0, j = a.length, l = b.length; i < l; i++ , j++)
                x[j] = b[i];
            return x;
        }
        Encrypt(data: Uint8Array):Uint8Array {
            ;
            var Key = this.Key;
            data = AesCBC.pad16(data);
            var g = AesCBC.blockIV();
            for (var  h = 0; h < data.length / 16; h++) {
                var f = data.slice(h * 16, h * 16 + 16);
                var o = g.slice(h * 16, (h + 1) * 16);
                f = AesCBC.blockXOR(o, f);
                super.Encrypt(f);
                g = this.concate(g, f);
            }
            return g;
        }

        Decrypt(data: Uint8Array) :Uint8Array{
            ;
            var g = new Uint8Array(data.length);
            var i0 = 0;
            var i1 = 16;
            var i2 = 32;
            for (var h = 1; h < data.length / 16; h++) {
                var f = data.slice(i1, i2);
                var o = data.slice(i0, i1);
                super.Decrypt(f);
                f = AesCBC.blockXOR(o, f);
                g.set(f, i0);
                i0 = i1;
                i1 = i2;
                i2 += 16;
            }
            return AesCBC.depad(g);
        }

    }

}

export module crypto {
    class Arcfour {
        ;
        public j: number;
        public i: number;
        public S: Uint8Array = new Uint8Array(256);
        init(a) {
            ;
            var b, c, d;
            for (b = 0; b < 256; ++b)
                this.S[b] = b;
            for (b = c = 0; b < 256; ++b)
                c = c + this.S[b] + a[b % a.length] & 255,
                    d = this.S[b],
                    this.S[b] = this.S[c],
                    this.S[c] = d;
            this.j = this.i = 0
        }
        next() {
            ;
            var a;
            this.i = this.i + 1 & 255;
            this.j = this.j + this.S[this.i] & 255;
            a = this.S[this.i];
            this.S[this.i] = this.S[this.j];
            this.S[this.j] = a;
            return this.S[a + this.S[this.i] & 255]
        }
    }

    var rng_psize = 256, rng_state, rng_pool: Uint8Array, rng_pptr;

    if (rng_pool == null) {
        rng_pool = new Uint8Array(rng_psize);
        rng_pptr = 0;
        var t;
        if (navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {
            var z = (window.crypto as any).random(32);
            for (t = 0; t < z.length; ++t)
                rng_pool[rng_pptr++] = z.charCodeAt(t) & 255
        }
        for (; rng_pptr < rng_psize;)
            t = Math.floor(65536 * Math.random()),
                rng_pool[rng_pptr++] = t >>> 8,
                rng_pool[rng_pptr++] = t & 255;
        rng_pptr = 0;
        rng_seed_time()
    }
    function prng_newstate() {
        return new Arcfour
    }

    function rng_seed_int(a) {
        ;
        rng_pool[rng_pptr++] ^= a & 255;
        rng_pool[rng_pptr++] ^= a >> 8 & 255;
        rng_pool[rng_pptr++] ^= a >> 16 & 255;
        rng_pool[rng_pptr++] ^= a >> 24 & 255;
        rng_pptr >= rng_psize && (rng_pptr -= rng_psize)
    }
    function rng_seed_time() {
        rng_seed_int((new Date).getTime())
    }
    export class SecureRandom {
        nextBytes(a) {
            ;
            var b;
            for (b = 0; b < a.length; ++b)
                a[b] = this.rng_get_byte()
        }
        rng_get_byte() {
            ;
            if (rng_state == null) {
                rng_seed_time();
                rng_state = prng_newstate();
                rng_state.init(rng_pool);
                for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
                    rng_pool[rng_pptr] = 0;
                rng_pptr = 0
            }
            return rng_state.next()
        }
    }
}

export namespace System{
    var co: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    class Color {            
            toHex (t, e) {
                t = parseInt(t, 10);
                for (var i = ""; t > 0;)
                    i = co[t % 16] + i, t = Math.floor(t / 16);
                for (; i.length < e;)
                    i = "0" + i;
                return i
            }
            hexToDec (t) {
                return parseInt(t, 16)
            }
            toRgb (t) {
                var e, i, s, n;
                return "string" != typeof t
                    ? (e = t[0], i = t[1], s = t[2])
                    : -1 != t.indexOf("rgb")
                        ? (n = t.substr(t
                            .indexOf("(") +
                            1,
                            t.lastIndexOf(")") - t.indexOf("(") - 1)
                            .split(","), e = n[0], i = n[1], s = n[2])
                        : ("#" == t.substr(0, 1) && (t = t.substr(1)), e = this.hexToDec(t.substr(0, 2)), i = this
                            .hexToDec(t.substr(2, 2)), s = this
                                .hexToDec(t
                                    .substr(4, 2))), e = parseInt(e, 10) || 0, i = parseInt(i, 10) || 0, s =
                    parseInt(s, 10) || 0,
                    (0 > e || e > 255) && (e = 0), (0 > i || i > 255) && (i = 0), (0 > s || s > 255) && (s = 0), [e, i, s]
            }
            hsvToRgb (t, e, i) {
                var s, n, a, r, h, o, l, c;
                switch (s = Math
                    .floor(t / 60) %
                6, n = t / 60 - s, a = i * (1 - e), r = i * (1 - n * e), h = i * (1 - (1 - n) * e), o = 0, l = 0,
                c = 0, s
                ) {
                    case 0:
                        o = i, l = h, c = a;
                        break;
                    case 1:
                        o = r, l = i, c = a;
                        break;
                    case 2:
                        o = a, l = i, c = h;
                        break;
                    case 3:
                        o = a, l = r, c = i;
                        break;
                    case 4:
                        o = h, l = a, c = i;
                        break;
                    case 5:
                        o = i, l = a, c = r
                }
                return o = Math.floor(255 * o), l = Math.floor(255 * l), c = Math.floor(255 * c), [o, l, c]
            }
            rgbToHsv (t, e, i) {
                var s, n, a, r, h, o, l, c;
                return s = t / 255, n = e / 255, a = i / 255, r = Math.min(s, n, a), h = Math
                    .max(s, n, a), l = 0, o = 0 === h ? 0 : 1 - r / h, c = h,
                    h == r
                        ? l = 0
                        : h == s && n >= a
                            ? l = 60 * (n - a) / (h - r) + 0
                            : h == s && a > n
                                ? l = 60 * (n - a) / (h - r) + 360
                                : h == n ? l = 60 * (a - s) / (h - r) + 120 : h == a && (l = 60 * (s - n) / (h - r) + 240),
                    [l, o, c]
            }
        }
    }