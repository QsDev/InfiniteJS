//// <reference path="../lib/Module.d.ts" />
import { models } from '../../abstract/Models';
import {context} from 'context';
import {UI} from './UI';
import * as plg_template from 'plugin|template';
import * as plg_json from 'plugin|json';
if (plg_template)
    plg_template.addEventListener(ModuleStat.Executed, (e) => mvc.Initializer.Register(e), null);
if (plg_json)
    plg_json.addEventListener(ModuleStat.Executed, (e) => {
        var c = encoding.SerializationContext.GlobalContext.reset();
        var v = e.exports.value;
        var type = v.__type__;
        var name = v.__name__;
        var tt = c.FromJson(v, context.GetType(type) || Object, new encoding.Path(e, 'data'));

    }, null);
declare var stop;
declare var document;
var OnNodeInserted = 'DOMNodeInsertedIntoDocument';
// best framework material ui  :::http://framework7.io/apps/
//best css material ui ::::http://materializecss.com/getting-started.html

export declare type GFunction = Function | reflection.GenericType | reflection.DelayedType;
export declare type Guid=number;
var _Instance: mvc.Initializer;

var jobs = {};
//secured vars
var isRunning = false;
var id = -1;
var stack: thread.IDispatcherCallback[] = [];
var djobs: thread.IDispatcherCallback[] = [];
var cj = 0;
//end secured vars

(window as any).cnt = [];
var _p = false;
export namespace Common {
    export var Message: models.Message = null;
    export var Math = Math;
    export class RichMenu {

    }
}
export namespace TemplateTypes {
    export function RichMenu() {
    }
}
namespace vars {
    export var _c = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    export var _cnts = [7, 11, 15, 19, 32];
    export var names_scop_fromIn = false;
}

var max = 9223372036854775807;
export namespace css {
    export function getVar(name: string) {

    }
    export function toValidCssName(c) {
        if (typeof c !== 'string') return c;
        for (var i = 0; i < c.length; i++) {
            var h = c.charCodeAt(i);
            if (h > 64 && h < 91) {
                c = c.substring(0, i) + '-' + String.fromCharCode(h + 32) + c.substring(i + 1);
                i++;
            }
            else if (h === 36) {
                c = c.substring(0, i) + '-' + c.substring(++i);
            }

            else if (h === 95) {
                c = c.substring(0, i) + '--' + c.substring(++i);
            }
        }
        return c;
    }
    export function toValidEnumName(c) {
        if (typeof c !== 'string') return c;
        for (var i = 0; i < c.length; i++) {
            var h = c.charCodeAt(i);
            if (h >= 65 && h <= 90)
                throw "InvalidCssName";
            var nh = c.charCodeAt(i + 1);

            if (h === 45) {
                if (nh >= 97 && nh <= 122) {
                    c = c.substring(0, i) + String.fromCharCode(nh - 32) + c.substring(i + 2);
                }
                else {
                    if (c.charCodeAt(i + 1) === 45) {
                        {
                            c = c.substring(0, i) + '_' + c.substring(i + 2); continue;
                        }
                    } else
                        c = c.substring(0, i) + '$' + c.substring(i + 1);
                    i += 1;
                }

            }
        }
        return c;
    }

    export function Css2Less<T>(css: string, callback: (less: string, param: T) => void, param: T) {
        //var url = 'http://beautifytools.com/css-to-less-converter.php';
        var t = new XMLHttpRequest();
        t.open("POST", '/css-to-less.php');
        t.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        t.setRequestHeader('Access-Control-Allow-Origin', 'true');
        t.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        t.send(encodeURIComponent("data") + "=" + encodeURIComponent("body{display:none}"));
        t.onload = (t) => {
            stop();
        }
    }

}




export namespace string {

    export function IsPrintable(keyCode:number,charCode:number) {
        // What a control/printable character is varies wildly based on the browser.
        // - most control characters (arrows, backspace) do not send a `keypress` event
        //   in Chrome, but the *do* on Firefox
        // - in Firefox, when they do send a `keypress` event, control chars have
        //   a charCode = 0, keyCode = xx (for ex. 40 for down arrow)
        // - printable characters always send a keypress event.
        // - in Firefox, printable chars always have a keyCode = 0. In Chrome, the keyCode
        //   always matches the charCode.
        // None of this makes any sense.
        // For these keys, ASCII code == browser keycode.

        var anyNonPrintable =
            (keyCode == 8) ||  // backspace
            (keyCode == 9) ||  // tab
            (keyCode == 13) ||  // enter
            (keyCode == 27);     // escape

        // For these keys, make sure it's a browser keycode and not an ASCII code.
        var mozNonPrintable =
            (keyCode == 19) ||  // pause
            (keyCode == 20) ||  // caps lock
            (keyCode == 45) ||  // insert
            (keyCode == 46) ||  // delete
            (keyCode == 144) ||  // num lock
            (keyCode == 145) ||  // scroll lock
            (keyCode > 32 && keyCode < 41) || // page up/down, end, home, arrows
            (keyCode > 111 && keyCode < 124); // fn keys

        return !anyNonPrintable && !(charCode == 0 && mozNonPrintable);
    }
}

export namespace basic {

    export namespace Settings {
        var _store = {};
        export function get(name) {
            return _store[name];
        }
        export function set(name, value) {
            try {

                value = JSON.stringify(value);
            } catch (e) {
            }
            localStorage.setItem(name, value);
        }
        (() => {
            for (var i = 0; i < localStorage.length; i++) {
                var n = localStorage.key(i);
                var s = localStorage.getItem(n);
                try {
                    s = JSON.parse(s);
                } catch (e) {
                }
                _store[n] = s;
            }
        })();
    }


    export enum DataStat {
        Fail = 0,
        Success = 1,
        OperationCanceled = 2,
        UnknownStat,
        DataCheckError,
    }
    export namespace polyfill {

        export var supportTemplate = 'content' in document.createElement('template');
        export function IsTemplate(x) {
            return supportTemplate ? x instanceof HTMLTemplateElement : (x instanceof HTMLUnknownElement) && x.tagName === 'TEMPLATE';
        }
        if (!supportTemplate) Object.defineProperty(HTMLUnknownElement.prototype, 'content', { get: function () { return this.tagName === 'TEMPLATE' ? this : undefined; } });
    }
    function defaultUrl(url) {
        if (!url) url = document.location.origin;
        if (url.endsWith('/')) {
            url = url.substr(0, url.length - 1);
        }
        return url;
    }
    export var host = defaultUrl(true ? null : 'http://127.0.0.1:801');// 'https://localhost:5000';

    export interface ICrypto {
        Encrypt(data: Uint8Array | number[]): (Uint8Array |number[]);
        Decrypt(data: Uint8Array | number[]): (Uint8Array | number[]);


        SEncrypt(data: string): string;
        SDecrypt(data: string): string;
    }
    export const Crypto: ICrypto = { Decrypt: (d) => d, Encrypt: (d) => d, SEncrypt: (d) => d, SDecrypt: (d) => d };

    var _guid = null;
    var _end = null;
    export function setGuidRange(start: number, end: number) {
        _guid = start;
        _end = end;
    }
    export function New() {
        if (_guid == null || _guid >= _end) {
            var x = Date.now() * 100000 + Math.floor(Math.random() * 775823);
            return x < max ? x : (Date.now() * 10000) / 10000 | (Math.random() * 771);
        } else {
            if (_guid >= _end - 300) GuidManager.update();
            return _guid++;
        }
    }


    export class GuidManager {
        static get current(): number {
            return _guid;
        }
        constructor(public vars) {
        }
        static get isValid(): boolean {
            return _guid !== 0 && _guid < _end;
        }
        public static get Next() {
            return ++_guid;
        }
        public static New<T>(callback: (id: number, param: T) => void, pram: T) {
            if (_guid !== 0 && _guid < _end)
                callback(++_guid, pram);
            else {
                this.update(callback, pram);
            }

        }
        static t: net.WebRequest;
        static isLoading: boolean;
        public static update<T>(callback?: (id: number, param: T) => void, pram?: T) {
            if (this.t != null) return;
            this.t = new net.WebRequest(null);
            this.t.Download({ Url: '/~Guid', HasBody: false, Method: net.WebRequestMethod.Get }, callback);
            this.t.OnComplete.On = (e) => {
                GuidManager.t.Dispose();
                GuidManager.t = null;
                callback && callback(++_guid, pram);
            }
        }
    }

    export function isFocused(v: Element) {
        var t = document.activeElement;
        while (t) {
            if (t == v) return true;
            t = t.parentElement;
        }
        return false;
    }

    class MyClass {
        constructor(public bound: HTMLElement, private andButton: boolean) { }

        getPrev(p: Element) {
            var ns;
            while (p && !(ns = p.previousElementSibling)) {
                if (this.bound.contains(p))
                    p = p.parentElement;
                else return null;
            }
            return ns;
        }
        _focusePrev(v: Element, array: Element[]) {
            if (!v) return false;
            if (array.indexOf(v) !== -1) return false;
            array.push(v);
            if (v === document.activeElement) {
                v =this. getPrev(v);
                if (!v) return true;
                array.push(v);
            }
            var tmp;
            if ((v as any).tabIndex >= 0 && typeof (v as any).focus === 'function') {
                (v as any).focus();
                if (document.activeElement == v) {
                    if ((v as any).select) (v as any).select();
                    return v;
                }
            }
            if (v instanceof HTMLElement)
                if ((tmp = this._focusePrev(v.firstElementChild, array))) return tmp;
            var n = this.getPrev(v);
            if (n) return this._focusePrev(n, array);
            return true;
        }
    }

    export class focuser {
        focuse(rebound: boolean, toPrev: boolean): any {
            return this[toPrev ? 'focusePrev' : 'focuseNext'](rebound);
        }

        constructor(public bound: HTMLElement, private andButton: boolean) { }



        getNext(p: Element) {
            var ns;
            while (p && !(ns = p.nextElementSibling)) {
                if (this.bound.contains(p))
                    p = p.parentElement;
                else return null;
            }
            return ns;
        }
        _focuseNext(v: Element, array: Element[]) {
            if (!v) return false;
            if (array.indexOf(v) !== -1) return false;
            array.push(v);
            if (v === document.activeElement) {
                v = this.getNext(v);
                if (!v) return true;
                array.push(v);
            }
            var tmp;
            if ((v as any).tabIndex >= 0 && typeof (v as any).focus === 'function') {
                if (this.andButton || v.constructor !== HTMLButtonElement) {
                    (v as any).focus();
                    if (document.activeElement == v) {
                        if ((v as any).select) (v as any).select();
                        return v;
                    }
                }
            }
            if (v instanceof HTMLElement)
                if ((tmp = this._focuseNext(v.firstElementChild, array))) return tmp;
            var n =this. getNext(v);
            if (n) return this._focuseNext(n, array);
            return true;
        }

        getPrev(p: Element) {
            var ns;
            while (p && !(ns = p.previousElementSibling)) {
                if (this.bound.contains(p))
                    p = p.parentElement;
                else return null;
            }
            return ns;
        }
        _focusePrev(v: Element, array: Element[]) {
            if (!v) return false;
            if (array.indexOf(v) !== -1) return false;
            array.push(v);
            if (v === document.activeElement) {
                v = this.getPrev(v);
                if (!v) return true;
                array.push(v);
            }
            var tmp;
            if ((v as any).tabIndex >= 0 && typeof (v as any).focus === 'function') {
                (v as any).focus();
                if (document.activeElement == v) {
                    if ((v as any).select) (v as any).select();
                    return v;
                }
            }
            if (v instanceof HTMLElement)
                if ((tmp = this._focusePrev(v.lastElementChild, array))) return tmp;
            var n = this.getPrev(v);
            if (n) return this._focusePrev(n, array);
            return true;
        }

        focusePrev(rebound: boolean) {
            if (this.bound.contains(document.activeElement))
                var x = this._focusePrev(document.activeElement, []);
            else x = true;
            if (rebound)
                if (x == true) return this._focusePrev(this.bound, []);
            return x;
        }

        focuseNext(rebound: boolean) {
            if (this.bound.contains(document.activeElement))
                var x = this._focuseNext(document.activeElement, []);
            else x = true;
            if (rebound)
                if (x == true) return this._focuseNext(this.bound, []);
            return x;
        }
        reFocuseOn() {
            return this._focuseNext(this.bound, []);
        }
        focusOn() {
            if (this.bound.contains(document.activeElement)) return;
            return this._focuseNext(this.bound, []);
        }
    }
    var _fc = new focuser(null, false);
    export function focuseOn(v: HTMLElement): boolean {
        (_fc as any).bound = v;
        return _fc.focuseNext(true);
    }
    export function _focuseOn(v: HTMLElement): boolean {
        (_fc as any).bound = v;
        return _fc.focusOn();
    }

    function getNext(p: Element) {
        var ns;
        while (p && !(ns = p.nextElementSibling))
            p = p.parentElement;
        return ns;
    }
    function _xfocuseNext(v: Element, array: Element[]) {
        if (!v) return false;
        if (array.indexOf(v) != -1) return false;
        array.push(v);
        if (v === document.activeElement) {
            v = getNext(v);
            if (!v) return true;
            array.push(v);
        }
        var tmp;
        if (v instanceof HTMLInputElement) {
            v.focus();
            return v;
        }
        if (v instanceof HTMLElement)
            if ((tmp = _xfocuseNext(v.firstElementChild, array))) return tmp;
        var n = getNext(v);
        if (n) return _xfocuseNext(n, array);
        return true;
    }
    export function focuseNext(v: Element) {
        return _xfocuseNext(v || document.activeElement, []);
    }


    export interface IRef<T> {
        value: T;
        aux?: any;
    }
    export interface IEventHandler extends IDisposable {
        Started: boolean;
        Start();
        Pause();
        Dispose();
        Reset();
    }
    export interface Module {
    }
    export interface IContext {
        CanAccessToMe(type: string, folder: string, name: string);
        GetPath(path: string): string;
        NameOf(type: Function): string;
        GetType(path: string): Function;
    }

    export interface IDisposable {
        Dispose(force?: boolean);
    }
    export interface IBindable {
        Owner?: any;
        Invoke(...args: any[]);
    }
    export interface ITBindable<T extends (...args: any[]) => void> extends IBindable {
        Invoke: T;
    }

    export interface IOnDisposing extends IDisposable {
        OnDisposing: (s: this) => void;
        Dispose();
    }
    export interface IDelegate extends IDisposable, EventListenerObject, IBindable {

        handleEvent(...args: any[]): void;
    }
    export class Delegate<T> implements IDelegate {
        constructor(public Owner: T, public Invoke: (...args: any[]) => void, private _dispose: (ihe: Delegate<T>) => void, public objectStat?: any) {
        }
        handleEvent(...args: any[]): void {
            this.Invoke.apply(this.Owner, args);
        }
        Dispose() {
            this._dispose(this);
            this.Owner = null;
            this._dispose = null;
            this.Invoke = null;
        }
    }

    export interface IValueCheck {
        [s: string]: (v: any) => boolean;
    }
    export interface IJob {
        Name: string,
        Todo?(job: bind.JobInstance, e: bind.EventArgs<any, any>): void;
        Check?(job: bind.JobInstance, e: bind.EventArgs<any, any>): void;
        OnError?(job: bind.JobInstance, e: bind.EventArgs<any, any>): void;
        OnInitialize?(job: bind.JobInstance, e: bind.EventArgs<any, any>): void;
        OnScopDisposing?(job: bind.JobInstance, e: bind.EventArgs<any, any>): void;
    }

    export class Rectangle {

        private _x: number;
        public get Left(): number {
            return this._x;
        }
        public set Left(v: number) {
            this._x = v;
            this.OnChanged();
        }


        private _y: number;
        public get Top(): number {
            return this._y;
        }
        public set Top(v: number) {
            this._y = v;
            this.OnChanged();
        }

        private _w: number;
        public get Width(): number {
            return this._w;
        }
        public set Width(v: number) {
            this._w = v;
            this.OnChanged();
        }

        private _h: number;
        public get Height(): number {
            return this._h;
        }
        public set Height(v: number) {
            this._h = v;
            this.OnChanged();
        }
        private OnChanged() {
            for (var i = 0; i < this._onchanged.length; i++) {
                var dlg = this._onchanged[i];
                dlg(this);
            }
        }
        private _onchanged: Array<(___this: Rectangle) => void> = [];
        constructor() {
            Object.freeze(this);
            Object.preventExtensions(this);
        }
        public Set(left: number, top: number, width: number, height: number) {
            this._x = left;
            this._y = top;
            this._w = width;
            this._h = height;
            this.OnChanged();
        }
    }
    export interface EqualInterface {
        Equals(o: Object): boolean;
    }
    export interface scopCollection {
        [s: string]: bind.Scop;
    }

    export class SessionId {
        static Id  = new Array<number>(16);
        public get Data() { return SessionId.Id; }
        constructor(guid: string) {
            SessionId.parse(guid);
        }
        public static parse(guid: string) {
            var t = SessionId.Id;
            var i = 0;
            for (var i = 0; i < 16; i++) {
                var c = guid.substr(2 * i, 2);
                if (c === '') break;
                t[i] = parseInt(c, 16);
            }
        }
    }
    export class iGuid implements EqualInterface {
        public static Empty = new iGuid('00000000-0000-0000-0000-000000000000');
        private _id: string;
        public get Id() { return this._id; }
        constructor(g: string) {
            this._id = g.toUpperCase();
        }
        Equals(o: any): boolean {
            if (o instanceof iGuid)
                return this._id == (<iGuid>o)._id;
            return false;
        }
        toString() { return this._id.toString(); }

        private static FromNumber(v: number) {
            var c = vars._c;
            var cnts = vars._cnts;
            var cc = 0;
            var l = "";
            var i = 0;
            while (i < 32) {
                var d: number, r: number;
                if (v !== 0) {
                    var d = v / 16;
                    var r = Math.floor(v % 16);
                    v = Math.floor(d);
                } else
                    r = Math.floor(Math.random() * 16);
                l += c[r];
                if (i == cnts[cc]) {
                    l += '-';
                    cc++;
                }
                i++;
            }
            return new iGuid(l);
        }

        public static get New() {
            return iGuid.FromNumber(Date.now());
        }

    }
    export interface IId {
        Id: number;
    }

    export class EnumValue {
        constructor(
            public Name: string,
            public Value: number) { Object.freeze(this); }
        toString() { return this.Name; }
        public static GetValue(lst: collection.List<EnumValue>, n: number | string) {
            var c = lst.AsList();
            if (typeof n === 'number') {
                for (var i = 0; i < c.length; i++)
                    if (c[i].Value === n) return c[i];
            } else {
                for (var i = 0; i < c.length; i++)
                    if (c[i].Name === n) return c[i];
            }
            return undefined;
        }
    }

    var enums = {};
    export function getEnum(enumPath: string, enumValue?: Object): collection.List<EnumValue> {
        var _enum;
        if (typeof enumPath === 'string')
            _enum = enums[enumPath] || enumValue || context.GetEnum(enumPath);
        else throw "the Path Inspecified";
        if (!(_enum instanceof collection.List && (<collection.List<EnumValue>>_enum).IsFrozen())) {
            if (_enum == null) throw "Enum not founded";
            if (_enum.constructor !== Object) throw "Error Parsing Enum";
            enums[enumPath] = _enum = new collection.List(EnumValue, gen(_enum));
            _enum.Freeze();
        }
        return _enum;
    }
    function gen(_enum) {
        var o = [];
        for (var i in _enum)
            if (isNaN(parseFloat(i)))
                o.push(new basic.EnumValue(i, _enum[i]));
        return o;
    }
    var t = /@([a-zA-Z][a-zA-Z\d\.]*)/mgi;
    export interface SIndex {
        Name: string;
        Index: number;
    }
    export function CompileString(s: string, getString?: (value: any, param: any) => string, params?: any) {
        return StringCompile.Compile(s, getString, params);
    }
    export interface ICode {
        Code: string;
    }

    export class CodeCompiler {
        private script: IReg[] = [];
        private code: string
        private curs: number;
        private len: number;
        private stack: (string | ICode)[] = [];
        private pcurs: number = 0;
        private isCode: boolean = false;
        private hasNoReturn: boolean = false;
        private get currentChar() {
            return this.code[this.curs];
        }
        private get nextChar() {
            return this.code[this.curs + 1];
        }

        private get MoveNext() {
            this.curs++;
            return this.curs < this.len;
        }
        constructor() {
            this.OnFnSuccess = this.OnFnSuccess.bind(this);
        }
        private init(hasNoReturn: boolean, code: string) {
            this.code = code;
            this.curs = -1;
            this.len = code.length;
            this.stack= [];
            this.pcurs = 0;
            this.isCode = false;
            this.hasNoReturn = hasNoReturn;
        }
        private getString() {
            var end: string = this.currentChar;
            var s = this.curs + 1;
            var pc = '\0';
            while (this.MoveNext) {
                {
                    if (pc === '\\') continue;
                    pc = this.currentChar;
                    if (pc === end)
                        return this.code.substr(s, this.curs - s);
                }
            }
            throw "Error";
        }
        private toRegString(s: string) {
            var rs = "";
            for (var i = 0; i < s.length; i++) {
                var cc = s[i];
                if (cc === '"' || cc === '\'') {
                    rs += "\\" + cc;
                }
                else rs += cc;
            }
            return rs;
        }
        private static params = ["$ovalue", "$value", "$scope", "$dom", "$job", "$fn"];
        public generateFn() {
            var strs = new Array(this.stack.length);
            var hasCode = false;
            for (var i = 0; i < this.stack.length; i++) {
                var s = this.stack[i];
                if (typeof s === 'string')
                    strs[i] = '"' + this.toRegString(s) + '"';
                else {
                    hasCode = true; strs[i] = s.Code;
                }
            }
            var fn = strs.join(" + ");
            if (!this.hasNoReturn) fn = "return " + fn;
            var reg = internal.getExpression(fn,CodeCompiler.params, this.OnFnSuccess, this, true);
            this.script.push(reg);
            reg.IsString = !hasCode;
            return reg;
        }
        
        private _push(code: string) {
            if (code[0] !== "=")
                this.init(true, code);
            else
                this.init(false, code.substr(1));
                
            while (this.MoveNext) {
                var c = this.currentChar;
                if (this.isCode) {
                    if (c === '"') this.getString();
                    else if (c === "'") this.getString();
                    else if (c === '}' && this.nextChar === "}") this._toStack();
                }
                else if (c === '{' && this.nextChar === '{') this._toStack();
            }
            this._toStack();
            return this.generateFn();
        }
        public push(code: string | string[]) {
            if (typeof code === "string") return this._push(code);
            var ret = new Array(code.length);
            for (var i = 0; i < code.length; i++)
                ret[i] = this._push(code[i]);
            return ret;
        }
        public Compile() {
            var code = new Array(this.script.length)
            for (var i = 0; i < code.length; i++) {
                code[i] = this.script[i].code;
            }
            EvalCode.Compile(code.join('\r\n'), this._onload, this._onerror, this);

        }
        public reset() { this.script.length = 0;}
        private _onload(t: this) {
            t.onload && t.onload(t);
        }
        private _onerror(t: this) {
            t.onerror && t.onerror(t);
        }
        private OnFnSuccess(fn: Function, t: IReg) {
            try {
                this.onFnLoad && this.onFnLoad(fn, t);
            } catch (e) {

            }
            
        }
        public onFnLoad: (fn: Function, t: IReg) => void;
        public onload: (t:this) => void;
        public onerror: (t:this) => void;

        public remove(t: IReg) {
            var i = this.script.indexOf(t);
            if (i !== -1) this.script.splice(i, 1);

        }
        private _toStack() {
            var len = this.curs - this.pcurs;
            if (len != 0) {
                var str = this.code.substr(this.pcurs, len);
                this.stack.push(this.isCode ? <ICode>{ Code: str } : str);
            }
            if (this.curs < this.len) {
                this.curs += 1;
                this.pcurs = this.curs + 1;
                this.isCode = !this.isCode;
            } else this.isCode = false;
        }
    }
    export class EvalCode {
        /** @param {string} code*/
        /**@param {function} callback*/
        /** @returns {void} */

        static Compile(code: string, callback?: Function, onerror?: Function, stat?) {
            var b = new Blob([code], { type: "text/javascript" });
            var scrpt = document.createElement('script');
            scrpt.src = URL.createObjectURL(b, { oneTimeOnly: true });
            scrpt.addEventListener('load', function () {
                if (b.msClose) b.msClose();
                document.head.removeChild(scrpt);
                callback && callback(stat);
            });
            scrpt.addEventListener('error', (e) => {
                if (b.msClose) b.msClose();
                document.head.removeChild(scrpt);
                onerror && onerror(stat);
            });
            document.head.appendChild(scrpt);
        }
        /** @param {string} code*/
        /**@param {function} callback*/
        /**@param {Array<string>} params*/
        /** @returns {void} */

        static CompileExpression(expression: string, params: string[], callback?: (exprFn: Function, stat: any) => void, stat?: any,exludeReturn?:boolean) {
            var code: IReg = internal.getExpression(expression, params, callback, stat, exludeReturn);
            var b = new Blob([code.code], { type: "text/javascript" });
            var url = URL.createObjectURL(b, { oneTimeOnly: true });
            var scrpt = document.createElement('script');
            scrpt.src = url;
            scrpt.addEventListener('load', function () {
                if (b.msClose) b.msClose();
                document.head.removeChild(scrpt);
            });
            document.head.appendChild(scrpt);
        }
    }
    export interface IReg {
        name: string;
        stat?: any;
        callback: (exprFn: Function, IReg: this) => void;
        onError?: (stat: any) => void;
        code: string;
        evalCode?: Function;
        IsString?: boolean;
    }
    namespace internal {
        var reg: { [s: string]: IReg } = {};
        var i = 0;
        function register(rg: IReg) {
            if (reg[rg.name]) console.error("Duplicated ExprFn Occurred {}");
            reg[rg.name] = rg;
        }
        function defineExpression(name, expr) {
            var rg = reg[name];
            delete reg[name];
            rg.evalCode = expr;
            if (rg.callback)
                rg.callback(expr, rg);
        }
       export function getExpression(expression: string, params: string[], callback: (exprFn: Function, stat: any) => void, stat?: any,exludeReturn?:boolean) {
            var _expressionName = "$$__exprFn__" + i++;
            var _params = params.join(',');
            var code = "window.defineExpression('" + _expressionName + "', function (" + _params + ") { " + (exludeReturn ? "" : " return ") + expression + "; });";
            var rg: IReg = {
                name: _expressionName,
                callback: callback,
                stat: stat,
                code: code
            };
            register(rg);
            return rg;
        }
        Object.defineProperty(window, "defineExpression", { get: () => { return defineExpression; }, set: () => { }, configurable: false, enumerable: false });
    }
    export class StringCompile {

        constructor(protected indexer: (string | SIndex)[], private getString: (name: string, value: any) => string, public params:any) {
            this.onDataChanged = this.onDataChanged.bind(this);
        }
        private static generateIndexer(s, array: SIndex[]) {
            var x: (string | SIndex)[] = [];
            var lcur = 0;
            for (var i = 0; i < array.length; i++) {
                var n = array[i];
                var l = n.Index - lcur;
                if (l > 0)
                    x.push(s.substr(lcur, l));
                x.push(n);
                lcur = n.Index + n.Name.length + 1;
            }
            l = s.length - lcur;
            if (l > 0)
                x.push(s.substr(lcur, l));
            return x;
        }
        public static Compile(s: string, getString?: (name: string, value: any) => string, params?: any) {
            var rslt: RegExpExecArray;
            var array: SIndex[] = [];
            while (rslt = t.exec(s))
                array.push(<SIndex>{ Name: rslt[1], Index: rslt.index });
            return new StringCompile(this.generateIndexer(s, array), getString, params);
        }
        
        public apply(data: any): string {
            var a = this.indexer.slice();
            for (var i = 0; i < a.length; i++) {
                var t = a[i] as SIndex;
                if (typeof t !== 'string')
                    a[i] = this.getString ? this.getString(t.Name, data[t.Name]) : String(data[t.Name]);
            }
            return String.prototype.concat.apply("", a);
        }
        public bind(data: bind.DObject) {
            var ld = this.data;
            if (ld)
                ld.removeListener(this.onDataChanged);
            if (data)
                data.addListener(this.onDataChanged);
            this.data = data;
            return this.onDataChanged(null);
        }
        private data: bind.DObject;
        private onDataChanged(ev:bind.EventArgs<any, any>):void {
            var a = this.indexer.slice();
            for (var i = 0; i < a.length; i++) {
                var t = a[i] as SIndex;
                if (typeof t !== 'string')
                    a[i] = this.data[t.Name] || "";
            }
            return this.Value = String.prototype.concat.apply("", a);
        }
        public Value: string;
    }
    window["SC"] = StringCompile;
    export interface Stat {
        Data: any;
        Back();
        Go();
        Forward();
    }
    export class History {
        private index: number = -1;
        private stats: Stat[] = [];
        public Push(stat: Stat) {
            this.stats.splice(this.index + 1, 0, stat);
        }
        public goBack() {
            var c = this.Current;
            c.Back();
            this.Index--;
            var c = this.Current;
            if (c) c.Go();
        }
        public goForward() {
            var c = this.Current;
            if (c)
                c.Forward();
            this.Index++;
            var c = this.Current;
            if (c) c.Go();
        }
        public get Current() { return this.stats[this.index]; }
        private set Index(i: number) {
            if (i < 0) this.index = -1;
            else if (i >= this.stats.length) this.index = this.stats.length - 1;
            else this.index = i;
        }
        private get Index() { return this.index; }
    }

    export namespace Routing {        
        export module history {
            export var supported= !!(window.history && window.history.pushState);
            export var fallback: null;
            export var initial = {
                popped: <boolean>null,
                URL: <string>null
            };
            // Empty container for "Initial Popstate" checking variables.
            export function pushState (state, title, path) {
                if (history.supported) {
                    if (Path.dispatch(path)) {
                        history.pushState(state, title, path);
                    }
                } else {
                    if (history.fallback) {
                        window.location.hash = "#" + path;
                    }
                }
            }
            export function popState (event) {
                var initialPop = !history.initial.popped && location.href == history.initial.URL;
                history.initial.popped = true;
                if (initialPop) return;
                Path.dispatch(document.location.pathname);
            }
            export function listen (fallback) {
                history.supported = !!(window.history && window.history.pushState);
                history.fallback = fallback;

                if (history.supported) {
                    history.initial.popped = ('state' in window.history), history.initial.URL = location.href;
                    window.onpopstate = history.popState;
                } else {
                    if (history.fallback) {
                        for (var route in Path.routes.defined) {
                            if (route.charAt(0) != "#") {
                                Path.routes.defined["#" + route] = Path.routes.defined[route];
                                Path.routes.defined["#" + route].path = "#" + route;
                            }
                        }
                        Path.listen();
                    }
                }
            }
        }
        export module Path  {
            export function map (path) {
                if (Path.routes.defined.hasOwnProperty(path)) {
                    return Path.routes.defined[path];
                } else {
                    return new Path.core.route(path);
                }
            }
            export function root(path) {
                
                Path.routes.root = path;
            }
            export function rescue (fn) {
                Path.routes.rescue = fn;
            }
            export function match(path: string, parameterize?:any) {
                var params = {}, route = null, possible_routes, slice, i, j, compare;
                for (route in Path.routes.defined) {
                    if (route !== null && route !== undefined) {
                        route = Path.routes.defined[route];
                        possible_routes = route.partition();
                        for (j = 0; j < possible_routes.length; j++) {
                            slice = possible_routes[j];
                            compare = path;
                            if (slice.search(/:/) > 0) {
                                for (i = 0; i < slice.split("/").length; i++) {
                                    if ((i < compare.split("/").length) && (slice.split("/")[i].charAt(0) === ":")) {
                                        params[slice.split('/')[i].replace(/:/, '')] = compare.split("/")[i];
                                        compare = compare.replace(compare.split("/")[i], slice.split("/")[i]);
                                    }
                                }
                            }
                            if (slice === compare) {
                                if (parameterize) {
                                    route.params = params;
                                }
                                return route;
                            }
                        }
                    }
                }
                return null;
            }
            export function dispatch(passed_route: string) {
                var previous_route, matched_route;
                if (Path.routes.current !== passed_route) {
                    Path.routes.previous = Path.routes.current;
                    Path.routes.current = passed_route;
                    matched_route = Path.match(passed_route, true);

                    if (Path.routes.previous) {
                        previous_route = Path.match(Path.routes.previous);
                        if (previous_route !== null && previous_route.do_exit !== null) {
                            previous_route.do_exit();
                        }
                    }

                    if (matched_route !== null) {
                        matched_route.run();
                        return true;
                    } else {
                        if (Path.routes.rescue !== null) {
                            Path.routes.rescue();
                        }
                    }
                }
            }
            export function listen() {
                var fn = function () { Path.dispatch(location.hash); }

                if (location.hash === "" && Path.routes.root !== null)
                    location.hash = Path.routes.root;

                // The 'document.documentMode' checks below ensure that PathJS fires the right events
                // even in IE "Quirks Mode".
                if ("onhashchange" in window && (!document.documentMode || document.documentMode >= 8)) {
                    var cc = Object.getOwnPropertyDescriptor(window, 'onhashchange');
                    Object.defineProperty(window, 'onhashchange', { set: function (v) { cc.set.call(this, fn); }, get: function () { return fn; }, configurable: false, enumerable: false });
                    
                    var cc = Object.getOwnPropertyDescriptor(window, 'onpopstate');
                    Object.defineProperty(window, 'onpopstate', { set: function (v) { cc.set.call(this, fn); }, get: function () { return fn; }, configurable: false, enumerable: false });

                } else {
                    setInterval(fn, 50);
                }

                if (location.hash !== "") {
                    Path.dispatch(location.hash);
                }
            }
            export namespace core {
                export class route {
                    action = null;
                    do_enter = [];
                    do_exit = null;
                    params = {};
                    constructor(public path: string) {
                        Path.routes.defined[path] = this;
                    }
                    to(fn) {
                        this.action = fn;
                        return this;
                    }
                    enter(fns) {
                        if (fns instanceof Array) {
                            this.do_enter = this.do_enter.concat(fns);
                        } else {
                            this.do_enter.push(fns);
                        }
                        return this;
                    }
                    exit(fn) {
                        this.do_exit = fn;
                        return this;
                    }
                    partition() {
                        var parts = [], options = [], re = /\(([^}]+?)\)/g, text, i;
                        while (text = re.exec(this.path)) {
                            parts.push(text[1]);
                        }
                        options.push(this.path.split("(")[0]);
                        for (i = 0; i < parts.length; i++) {
                            options.push(options[options.length - 1] + parts[i]);
                        }
                        return options;
                    }
                    run() {
                        var halt_execution = false, i, result;

                        if (Path.routes.defined[this.path].hasOwnProperty("do_enter")) {
                            if (Path.routes.defined[this.path].do_enter.length > 0) {
                                for (i = 0; i < Path.routes.defined[this.path].do_enter.length; i++) {
                                    result = Path.routes.defined[this.path].do_enter[i].apply(this, null);
                                    if (result === false) {
                                        halt_execution = true;
                                        break;
                                    }
                                }
                            }
                        }
                        if (!halt_execution) {
                            Path.routes.defined[this.path].action();
                        }
                    }
                }
            }  
            export var routes= {
                'current': null,
                'root': null,
                'rescue': null,
                'previous': null,
                'defined': {},
                
            }
        };
    }

    

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
            //if (!this.IsFolder && !this.ext)
            //    this.ext = ModuleExt[this.moduleType];
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
            return c;
        }
        public get IsInternal(): boolean {
            return this.IsExternal ? Url.rootUrl.SameHostAs(this) : true;
        }
        public static rootUrl = new Url(document.location.href);
    }

}

export namespace query {
    export declare type selector = (t: _$, node: Node, param) => boolean;
    export interface _$ {
        detach(): this;
        insertBefore(thisDom: Node): this;
        insertAfter(thisDom: Node): this;
        children(selector: selector, param): __;
        removeChildren(selector: selector, param): this;
        find(selector: selector, param): __;
        add(dom: Node | Node[]);
        toggleClass(calssName: string);
        siblings(selector: selector, param): __;
        appendTo(dom: Node);
        length: number;
        submit();
        parent(selector: selector, param): _$;
        hasClass(className: string): boolean;
        removeClass(className: string): this;
        addClass(className: string): this
        eq(n: number): _$;
    }

    export function hasClass(t: _$, d: Node, param: string) {
        return d instanceof Element && d.classList.contains(param);
    }
    export function hasTag(t: _$, d: Node, param: string) {
        return d instanceof Element && d.tagName === param.toUpperCase();
    }
    function insertAfter(newNode: Node, referenceNode: Node) {
        var next = referenceNode.nextSibling;
        if (next)
            referenceNode.parentNode.insertBefore(newNode, next);
        else referenceNode.parentNode.appendChild(newNode);
    }
    export class __ implements _$ {

        eq(n: number):_$ {
            var d = n < 0 ? this.dom[this.dom.length - n] : this.dom[n];
            if (d) return new _(d);
            return new ___();
        }

        removeClass(className: string): this {

            for (var i = 0; i < this.dom.length; i++) {
                var d = this.dom[i];
                if (d instanceof Element) d.classList.remove(className);
            }
            return this;
        }
        addClass(className: string): this {

            for (var i = 0; i < this.dom.length; i++) {
                var d = this.dom[i];
                if (d instanceof Element) d.classList.add(className);
            }
            return this;
        }

        hasClass(className: string): boolean {
            for (var i = 0; i < this.dom.length; i++) {
                var cd = this.dom[i];
                if (cd instanceof Element)
                    if (cd.classList.contains(className)) return true;
            }
            return false;
        }
        parent(selector: selector, param): _$ {
            if (this.dom.length == 1) return new _(this.dom[0]).parent(selector, param);
            else if (this.dom.length === 0) return new ___();
            throw null;
        }
        submit() {

            for (var i = 0; i < this.dom.length; i++) {
                var cd = this.dom[i];
                if (cd instanceof HTMLFormElement)
                    cd.submit();
            }
        }
        siblings(selector: selector, param: any): __ {
            throw new Error("Method not implemented.");
        }
        appendTo(dom: Node) {
            throw new Error("Method not implemented.");
        }

         constructor(private dom: Node[]) { }
        public get length() { return this.dom.length; }
        public detach() {
            for (var i = 0; i < this.dom.length; i++) {
                var cd = this.dom[i];
                cd.parentNode.removeChild(cd);
            }
            return this;
        }
        public insertBefore(thisDom: Node) {
            for (var i = 0; i < this.dom.length; i++) {
                var cd = this.dom[i];
                if (cd != null) cd.parentNode.removeChild(cd);
                thisDom.parentElement.insertBefore(cd, thisDom);
            }
            return this;
        }
        public insertAfter(referenceNode: Node) {
            for (var i = 0; i < this.dom.length; i++) {
                var cd = this.dom[i];
                if (cd != null) cd.parentNode.removeChild(cd);
                insertAfter(cd, referenceNode);
            }
            return this;
        }
        public find(selector: selector, param) {
            var array = [];
            for (var i = 0; i < this.dom.length; i++) {
                var d = this.dom[i];
                var w = document.createTreeWalker(d, NodeFilter.SHOW_ALL, <any>{
                    param: param,
                    this: this,
                    acceptNode: function (node) {
                        return selector(this.this, node, this.param);
                    }
                }, false);
                while (w.nextNode()) array.push(w.currentNode);
            }
            return new __(array);
        }
        public children(selector: selector, param) {
            var r = [];
            for (var i = 0; i < this.dom.length; i++) {
                var d = this.dom[i];
                if (d instanceof Element)
                    for (var i = 0; i < d.children.length; i++) {
                        var t = d.children[i];
                        if (selector(this, t, param))
                            r.push(t);
                    }
            }
            return new __(r);
        }
        public removeChildren(selector: selector, param) {

            for (var i = 0; i < this.dom.length; i++) {
                var d = this.dom[i];
                if (d instanceof Element)
                    for (var i = 0; i < d.children.length; i++) {
                        var t = d.children[i];
                        if (selector(this, t, param)) {
                            d.removeChild(t);
                            i--;
                        }
                    }
            }
            return this;
        }

        public add(dom: Node | Node[]) {
            if (dom instanceof Array) {
                for (var i = 0; i < dom.length; i++)
                    this.dom.push(dom[i]);
            } else
                this.dom.push(dom);
            return this;
        }

        public toggleClass(className: string): this {
            var d = this.dom;
            for (var i = 0; i < d.length; i++) {
                var c = d[i];
                if (c instanceof Element)
                    if (c.classList.contains(className))
                        c.classList.remove(className)
                    else c.classList.add(className)
            }
            return this;
        }
    }
    export class _ implements _$ {
        eq(n: number): _$ {
            if (n === 0 || n === -1) return this;
            return new ___();
        }

        hasClass(className: string): boolean {
            var cd = this.dom;
            if (cd instanceof Element)
                if (cd.classList.contains(className)) return true;
            return false;
        }
        parent(selector: selector, param: any): _$ {
            var t = this.dom.parentNode;
            while (t != document) {
                if (selector(this, t, param)) return new _(t);
                t = t.parentNode;
            }
            return new ___();
        }

        constructor(private dom: Node) { }
        public get length() { return 1; }

        submit() {
            var cd = this.dom;
            if (cd instanceof HTMLFormElement)
                cd.submit();
        }
        siblings(selector: selector, param): __ {
            var t: Node = this.dom;
            while (t.previousSibling) {
                t = t.previousSibling;
            }
            var arr = [];
            do {
                if (selector(this, t, param))
                    arr.push(t);
                t = t.nextSibling;
            } while (t);
            return new __(arr);
        }
        public detach() {
            if (this.dom.parentNode != null) this.dom.parentNode.removeChild(this.dom);
            return this;
        }
        public add(dom: Node | Node[]) {
            var array: Array<Node>;
            if (dom instanceof Array) {
                array = dom.slice();
                array.unshift(this.dom);
            } else array = [this.dom, dom];
            return new __(array);
        }
        public toggleClass(className: string) {
            var c = this.dom;
            if (c instanceof Element)
                if (c.classList.contains(className))
                    c.classList.remove(className)
                else c.classList.add(className)

        }
        public insertBefore(thisDom: Node) {
            if (this.dom.parentNode != null) this.dom.parentNode.removeChild(this.dom);
            thisDom.parentElement.insertBefore(this.dom, thisDom);
            return this;
        }
        public insertAfter(thisDom: Node) {
            if (this.dom.parentNode != null) this.dom.parentNode.removeChild(this.dom);
            insertAfter(this.dom, thisDom);
            return this;
        }
        public children(selector: selector, param) {
            var r = [];
            var d = this.dom;
            if (d instanceof HTMLElement)
                for (var i = 0; i < d.children.length; i++) {
                    var t = d.children[i];
                    if (selector(this, t, param))
                        r.push(t);
                }
            return new __(r);
        }
        public removeChildren(selector: selector, param) {
            var d = this.dom;
            if (d instanceof HTMLElement)
                for (var i = 0; i < d.children.length; i++) {
                    var t = d.children[i];
                    if (selector(this, t, param)) {
                        d.removeChild(t);
                        i--;
                    }
                }
            return this;
        }
        public appendTo(dom: Node) {
            this.detach();
            dom.appendChild(this.dom);
        }
        public find(selector: selector, param) {
            var array = [];
            var w = document.createTreeWalker(this.dom, NodeFilter.SHOW_ALL, <any>{
                param: param,
                this: this,
                acceptNode: function (node) {
                    return selector(this.this, node, this.param);
                }
            }, false);
            while (w.nextNode()) array.push(w.currentNode);
            return new __(array);
        }

        removeClass(className: string): this {
            var d = this.dom;
            if (d instanceof Element) d.classList.remove(className);
            return this;
        }
        addClass(className: string): this {
            var d = this.dom;
            if (d instanceof Element) d.classList.add(className);
            return this;
        }

    }


    class ___ implements _$ {
        eq(n: number): _$ {
            return this;
        }

        removeClass(className: string): this {
            return this;
        }
        addClass(classNm) { return this;}
        hasClass(className: string): boolean {
            return false;
        }
        detach(): this {
            return this;
        }
        insertBefore(thisDom: Node): this {
            return this;
        }
        insertAfter(thisDom: Node): this {
            return this;
        }
        children(selector: selector, param: any): __ {
            return new __([]);
        }
        removeChildren(selector: selector, param: any): this {
            return this;
        }
        find(selector: selector, param: any): __ {
            return new __([]);
        }
        add(dom: Node | Node[]) {
            return query.$$(dom);
        }
        toggleClass(calssName: string) {
            return this;
        }
        siblings(selector: selector, param: any): __ {
            return new __([]);
        }
        appendTo(dom: Node) {
            return this;
        }
        get length(): number { return 0; }
        submit() {
            return this;
        }
        parent(selector: selector, param: any): _$ {
            return this;
        }
    }



    export function $$(dom: Node | Node[]) {
        return dom instanceof Array ? new __(dom) : new _(dom);
    }
}

export function $$(dom: Node | Node[]) { return query.$$(dom); }

export namespace reflection {

    export interface ICallHistory {
        caller: any;
        arguments: any[];
        fn: Function;
    }

    
    export interface IDebuggerInfo {
        obsArgs: boolean;
        Stack?: ICallHistory[];
        debug?: boolean;
        save?: boolean;
        callback?: Function;
        fn: Function;
        proxy?: Function;
        ReCalc?: (callHistory: ICallHistory | number, direct: boolean) => any;
    }
    var $slice = Array.prototype.slice;
    
    function ReCalc(callHistory,befor, direct) {
        if (!callHistory) callHistory = this.Stack[this.Stack.length - 1];
        if (typeof callHistory === 'number')
            var callHistory = this.Stack[callHistory];
        if (befor) befor.apply(callHistory.caller, callHistory.arguments);
        if (callHistory)
            return (direct ? this.fn : this.proxy).apply(callHistory.caller, callHistory.arguments);
    }
    function debug(dbgInfo, callback) {
        if (!dbgInfo.Stack) dbgInfo.Stack = [];
        dbgInfo.ReCalc = ReCalc;
        dbgInfo.proxy = function () {
            var args = $slice.call(arguments);
            if (dbgInfo.obsArgs!==false)
                for (var i = 0; i < args.length; i++) {
                    if (typeof args[i] === 'function')
                        if (args[i].__isProxy)
                            debug({
                                save: dbgInfo.save,
                                callback: dbgInfo.callback,
                                obsArgs: dbgInfo.obsArgs,
                                Stack: dbgInfo.Stack,
                                fn: args[i],
                                ReCalc: ReCalc,
                                debug: false
                            }, (s) => { args[i] = s.proxy; });
                }
            if (dbgInfo.debug)
                stop();
            if (dbgInfo.save)
                dbgInfo.Stack.push({ caller: this, arguments: args, fn: dbgInfo.fn});
            if (dbgInfo.callback)
                dbgInfo.callback.apply(this, args);
            return dbgInfo.fn && dbgInfo.fn.apply(this, args);
        }
        dbgInfo.proxy.__isProxy = true;
        dbgInfo.proxy.__Fn = dbgInfo.fn;

        if (callback) callback(dbgInfo);
        //debug({ fn: XMLHttpRequest.prototype.send, debug: true }, (s) => { XMLHttpRequest.prototype.send = s.proxy as any; });
        return dbgInfo;        
    }
    function debugObj(obj,stack) {
        for (var i in obj) {
            try {
                var v = obj[i];
            } catch (e) { continue; }
            if (typeof v === 'function')
                ((fName) => {
                    debug({ save:true, Stack: stack, fn: obj[fName], debug: false }, (s) => { obj[fName] = s.proxy; });
                })(i);
        }
    }

    export function isInstanceOfClassName(instance, className) {
        while ((instance = instance.__proto__)) {
            if (instance.constructor.name == className)
                return true;
        }
        return false;
    }
    export function isInstanceOfClass(instance, type) {
        while ((instance = instance.__proto__)) {
            if (instance.constructor == type)
                return true;
        }
        return false;
    }
    export function _isInstanceOf(type: Function, superType: Function): boolean {
        var t: any = type;
        while (type) {
            if (type == superType) return true;
            t = t.base;
        }
        return false;
    }

    export function GetBaseType (type)  {
        if (type instanceof reflection.GenericType) {
            return (type as reflection.GenericType).GetBaseType();
        }
        var p = type.prototype.__proto__;
        if (p == null) return null;
        return p.constructor;
    }

    export function GetBaseTypes  (type, totype?):typeof Object[] {
        var l = [];
        var pr = type.prototype;
        do {
            if (pr.constructor == totype) break;
            l.push(pr.constructor);
            pr = pr.__proto__;
        } while (pr !== null);
        return l;
    }

    export function IsInstanceOf  (type, superType)  {
        if (type === superType || superType === Object) return true;
        if (type.constructor == reflection.GenericType) type = (type as reflection.GenericType).Constructor;
        if (superType.constructor == reflection.GenericType) superType = (superType as reflection.GenericType).Constructor;

        var pr = type.prototype;
        do {
            if (pr.constructor === superType) return true;
            pr = pr.__proto__;
        } while (pr !== null);
        return false;
    }
    
    export class Type {
        private passed = [];
        type: Function;
        constructor(type) {
            this.type = type;
        }
        _getPath(root) {
            for (var i in root) {
                var v = root[i];
                if (this.passed.indexOf(v) !== -1) continue;
                this.passed.push(v);
                switch (typeof v) {
                    case 'string': case 'number': case 'boolean': case 'undefined': continue;
                    default:
                        if (v === this.type) { return i; }
                        if (v instanceof Function) continue;
                        var x = this._getPath(v);
                        if (x != null) return i + '.' + x;
                        break;
                }
            }
        }
        GetType(root) {
            if (this.passed == null) this.passed = [];
            this.passed.length = 0;
            return this._getPath(root);
        }
    }
    var _gtypes: collection.Dictionary<GenericType, Function>
    function gtypes() {
        return _gtypes || (_gtypes = new collection.Dictionary<GenericType, Function>("GTypes", true));
    }

    export class GenericType {
        public prototype;
        constructor(
            public Constructor: Function,
            public Params: Function[], base: Function) {
            //super();
            this.prototype = Constructor.prototype;
            if (!_p) throw this;
            gtypes().Set(this, base);
            _p = false;
        }

        public get base() { return gtypes().Get(this) }
        public GetBaseType() {
            return gtypes().Get(this);
        }
        public static GetType(type: Function, params?: Function[], checkOnly?: boolean, base?: Function): GenericType | Function {
            if (typeof type !== 'function') throw 'type must be fanction';
            if (params == null || params.length === 0) return type;
            var i = this.i(type);
            for (var i = gtypes().Count - 1; i >= 0; i--) {
                var e = gtypes().GetKeyAt(i);
                if (type == e.Constructor) {
                    if (params.length == e.Params.length) {
                        var p = e.Params;
                        for (var j = p.length - 1; j >= 0; j--) {
                            if (p[j] != params[j]) {
                                p = undefined; break;
                            }
                        }
                        if (p) return e;
                    }
                }
            }
            if (checkOnly) return
            _p = true;
            return new GenericType(type, params, base == null ? GetBaseType(type) : base);
        }

        private static i(f) { return f instanceof GenericType ? 1 : 0; }
        public static IsInstanceOf(type, superType) {
            return (this as any)._isInstanceOf[this.i(type) + this.i(superType) * 2](type, superType);
        }
        public static _isInstanceOf = [
            (type: Function, superType: Function) => {
                return IsInstanceOf(type, superType);
            },
            (type: Function, superGType: GenericType) => {
                return IsInstanceOf(type, superGType.Constructor);
            },
            (gtype: GenericType, superGType: GenericType) => {
                return IsInstanceOf(gtype.Constructor, superGType.Constructor);
            },
            (gtype: GenericType, superType: Function) => {
                return IsInstanceOf(gtype.Constructor, superType);
            }];
    }

    (<any>Function).prototype.IsInstanceOf = reflection.IsInstanceOf;

    export class DelayedType{
        get Type(): Function {
            return this._type();
        }
        private _type: () => Function;
        constructor(type: () => Function) {
            this._type = type;
        }
    };

    export module Observable {

        var events = [];
        export function observeProperty(obj, propName: string, evnt: string) {
            var c = Object.getOwnPropertyDescriptor(obj, propName);
            Object.defineProperty(obj, propName, {
                get: c.get,
                set: function (v) {
                    var oldValue = c.get.call(this);
                    if (v === oldValue) return;
                    c.set.call(this, v);
                    var event = events.length == 0 ? document.createEvent('Event') as any : events.pop();
                    event.initEvent(evnt, true, true);
                    event.oldValue = oldValue;
                    event.newValue = v;
                    dispatchEvent(new Event(evnt, { bubbles: false, cancelable: true, scoped: false }));
                    if (this instanceof EventTarget)
                        this.dispatchEvent(event);
                    else dispatchEvent(event);
                    events.push(event);
                }
            });
        }

        export function setObservableProperty<T>(obj, propName: string, get: () => T, set: (val: T) => void, evnt: string) {
            Object.defineProperty(obj, propName, {
                get: get,
                set: function (v) {
                    var oldValue = get.call(this);
                    if (v === oldValue) return;
                    set.call(this, v);
                    var event = events.length == 0 ? document.createEvent('Event') as any : events.pop();
                    event.initEvent(evnt, true, true);
                    event.oldValue = oldValue;
                    event.newValue = v;
                    dispatchEvent(new Event(evnt, { bubbles: true, cancelable: true, scoped: true }));
                    if (this instanceof EventTarget)
                        this.dispatchEvent(event);
                    else dispatchEvent(event);
                    events.push(event);
                }
            });
        }

        Object.defineProperty(Node.prototype, 'value', { get: function () { return this.textContent; }, set: function (v) { this.textContent = v; } });

        observeProperty(Node.prototype, 'textContent', 'textContentChanged');

        export function ObjectToObservable(o: Object){
            //o.get = function e() {
            //    var n: bind.DObject;n.get
            //}
        }
    }
}

export namespace services {
    export var Service = (function () {
        function execute() {
            var i = binds.length > 100 ? 100 : binds.length;
            while (i > 0) {
                i--;
                var t = binds.pop();
                var bs: bind.PropBinding[] = t[0];
                var arg: bind.EventArgs<any, any> = t[1];
                for (var i = 0; i < bs.length; i++) {
                    var b = bs[i];
                    b.handleEvent(arg);
                    b.IsWaiting = false;
                }

            }
        }
        class Service {
            public static Push(ps: bind.PropBinding[], e: bind.EventArgs<any, any>) {
                var a = (e.prop as any).IsAsync;
                var x = new Array<bind.PropBinding>();
                for (var i = 0; i < ps.length; i++) {
                    var p = ps[i];
                    if (a) {
                        if (!p.IsWaiting) {
                            p.IsWaiting = true;
                            x.push(p);
                        }
                        continue;
                    } else
                        p.handleEvent(e);
                }
                if (x.length > 0) binds.push([x, e]);
            }
            public static Close() {
                isRunning = true;
                clearInterval(id);
            }
            public static Restart() {
                clearInterval(id);
                id = setInterval(execute, 1000);
                isRunning = true;
            }

            public static get IsRunning() { return isRunning; }
        }
        //let id = setInterval(execute, 100);
        let isRunning: boolean = true;
        let binds: any[] = [];
        return Service as any;
    })();
}

namespace internal {
    export class __data {
        constructor(public name: string, public event: string, public delegate: EventListenerOrEventListenerObject) { }
    }
}

export namespace bind {
    export class Job implements basic.IJob {

        constructor(
            public Name: string,
            public Todo: (job: JobInstance, e: bind.EventArgs<any, any>) => void,
            public Check?: (job: JobInstance, e: bind.EventArgs<any, any>) => void,
            public OnError?: (job: JobInstance, e: bind.EventArgs<any, any>) => void,
            public OnInitialize?: (job: JobInstance, e: bind.EventArgs<any, any>) => void,
            public OnScopDisposing?: (job: JobInstance, e: bind.EventArgs<any, any>) => void

        ) {
            jobs[Name] = this;
        }
    }
    export class Jobs implements basic.IJob {
        public Todo(job: JobInstance, e: bind.EventArgs<any, any>): void {
        }
        public Check(job: JobInstance, e: bind.EventArgs<any, any>): void {
        }
        public OnError(job: JobInstance, e: bind.EventArgs<any, any>): void { }
        public OnInitialize(job: JobInstance, e: bind.EventArgs<any, any>): void { }
        public OnScopDisposing(job: JobInstance, e: bind.EventArgs<any, any>): void {
        }
        constructor(public Name: string) {
            jobs[Name] = this;
        }
        public push(jobName) {
        }
    }
    export class JobInstance implements EventListenerObject {
        public Control: UI.JControl;
        private _events: internal.__data[] = [];
        public Handle: (ji: JobInstance, e: Event) => void;
        public addEventListener(name: string, event: string, delegate: EventListenerOrEventListenerObject | any) {
            this._events.push(new internal.__data(name, event, delegate));
            (this.dom as HTMLElement).addEventListener(event, delegate);
        }
        public removeEventListener(name: string) {
            var t = this._events;
            for (var i = t.length - 1; i >= 0; i--) {
                var d = t[i];
                if (d.name == name) {
                    this.dom.removeEventListener(d.event, d.delegate);
                    t.splice(i, 1);
                    return;
                }
            }
        }
        public getEvent(name: string) {
            var t = this._events;
            for (var i = t.length; i >= 0; i--) {
                var d = t[i];
                if (d.name == name)
                    return d.delegate;

            }
            return null;
        }
        constructor(public Scop: bind.Scop, public job: basic.IJob, public dom: Node) {
            this.propb = Scop.OnPropertyChanged(bind.Scop.DPValue, this.ValueChanged, this);
        }

        private propb: PropBinding;
        private ValueChanged(s, e: bind.EventArgs<any, Scop>) {
            if (this.job != null && this.job.Todo != null)
                this.job.Todo(this, e);
        }
        public Dispose() {
            var dx = this.job.OnScopDisposing;
            if (dx != null) dx(this, null);
            var t = this._events;
            for (var i = t.length - 1; i >= 0; i--) {
                var d = t[i];
                this.dom.removeEventListener(d.event, d.delegate);
                t[i] = null;
            }
            this._events.splice(0);
            this._events = null;
            this._store = null;
            this.Checker = null;
            this.dom = null;
            this.Handle = null;
            this.job = null;
            this.Scop.removeEvent(bind.Scop.DPValue, this.propb);
            this.Scop = null;
            this.propb.Dispose();
            this.propb = null;
            this.IsDisposed = true;
        }
        public IsDisposed;
        public _store: any = {};
        public addValue(name: string, value: any) {
            this._store[name] = value;
        }
        public getValue(name: string) {
            return this._store[name];
        }

        public Checker: (value: any) => boolean;
        public Ischanging: boolean;
        handleEvent(e: Event) {
            if (this.Handle) this.Handle(this, e);
        }
    }
    export function GetJob(name: string): basic.IJob {
        var l = jobs[name];
        if (l == null) return Register(new Job(name, null, null, null, null, null));
        return l;
    };
    export function Register(job:basic. IJob, override?: boolean): basic.IJob {
        var l: Job = jobs[job.Name];
        if (l != null)

            if (override) {
                jobs[job.Name] = job;
                return job;
            } else
                return l;
        else return jobs[job.Name] = job;
    };
 
}


export namespace thread {

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

        static InIdle() { return !isRunning; }
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
        static clone(ojob: IDispatcherCallback, params: any[],__this?:any) {
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
                isRunning = false;
                asIdle();
                return;
            }
            isIdle = false;
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
        public static Push(ojob: JobParam, params?: any[],_this?:any) {
            var job = djobs[ojob.id];
            if (!job.optimizable)
                job = this.clone(job, params,_this);
            else {
                if (params)
                    job.params.Set(params);
                job._this = _this === undefined ? job._this : _this;
                if (job.isWaiting) {  return; }
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
        public static call(_this,fn: Function, ...args: any[]) {
            this.Push(delayedJob, [_this, fn, args]);
        }
    }
    var delayedJob = thread.Dispatcher.cretaeJob((context, fun: Function, args) => {
        fun.apply(context, args);
    }, [], null, false);
}

export module bind {
    
    export class DProperty<T, P> {
        Index: number;
        GType: reflection.GenericType;
        constructor(public Attribute: PropertyAttribute, public Name: string, public Type: GFunction, public DefaultValue?: T, public Changed?: (e: EventArgs<T, P>) => void, public Check?: (e: EventArgs<T, P>) => void) {
            if (Type instanceof reflection.GenericType)
                this.GType = Type as reflection.GenericType;
            this.RedifineChecker();
        }
        public get IsKey() {
            return (this.Attribute & PropertyAttribute.IsKey) === PropertyAttribute.IsKey;
        }
        private RedifineChecker() {
            switch (this.Type) {
                case reflection.GenericType:
                    this.checkType = this.isGenerictype;
                    break;
                case Object:
                    this.checkType = DProperty.isObject;
                    break;
                case String:
                    this.checkType = DProperty.isString;
                    break;

                case Number:
                    this.checkType = DProperty.isNumber;
                    break;

                case Boolean:
                    this.checkType = DProperty.isBoolean;
                    break;

                case reflection. DelayedType:
                    break;
                default:
                    if (this.Type.constructor ==reflection. DelayedType)
                        break;
                    else if (this.Type.constructor === reflection.GenericType)
                        this.checkType = this.isGenerictype;
                    else
                        this.checkType = this._checkType;
                    break;
            }
        }
        public checkType(val: T): boolean {
            var t = <reflection. DelayedType>this.Type;
            this.Type = t.Type;
            if (this.Type instanceof reflection.GenericType)
                this.GType = this.Type as reflection.GenericType;
            this.RedifineChecker();
            return this.checkType(val);
        }
        public _checkType<T>(val: T): boolean {
            return val instanceof <Function>this.Type;
        }

        private isGenerictype<T>(val: T) {
            return val instanceof (<reflection.GenericType>this.Type).Constructor;
        }
        private static isObject<T>(val: T) {
            return true;
        }
        private static isString<T>(val: T) {
            return typeof val == 'string';
        }
        private static isNumber<T>(val: T) {
            return typeof val == 'number';
        }

        private static isBoolean<T>(val: T) {
            return typeof val == 'boolean';
        }
    }
    var _events: EventArgs<any, any>[] = [];
    export class EventArgs<T, P> implements basic.IDisposable {
        static New<T, P>(prop: DProperty<T, P>, ithis: P, _old: T, _new: T): EventArgs<T,P> {
            var _this = _events.length == 0 ? new EventArgs() : _events.pop();
            _this.prop = prop;
            _this.__this = ithis;
            _this._new = _new;
            _this._old = _old;
            return _this;
        }
        prop: DProperty<T, P>;
        __this: P;
        _old: T;
        _new: T;
        IsValid = true;
        public Dispose() {
            _events.push(this);
        }
    }
    export class Ref<T> {
        private _key: T;
        public get key(): T {
            return this._key;
        }
        public set key(v: T) {
            this._key = v;
        }
    }
    export class EventListener<T extends Function> implements basic.IDisposable {
        private _deleagtes: T[] = [];
        private key: Object = new Object();
        private isSingliton: boolean;
        constructor(key: any, isSingliton?: boolean) {
            this.key = key;
            this.isSingliton = isSingliton === true;
        }
        public set On(delegate: T) {
            this._deleagtes.push(delegate);
        }
        private locks: T[] = [];
        public set Off(delegate: T) {
            if (this.lock) { this.locks.push(delegate); return; }
            var i = this._deleagtes.indexOf(delegate);
            if (i == -1) return;
            this._deleagtes.splice(i, 1);
        }
        private lock: boolean = false;
        public Invoke(key: Object, params: any[]) {
            if (key != this.key || l <= 0) return;
            this.lock = true;
            var locks = this.locks;
            if (this.isSingliton) {
                while (this._deleagtes.length > 0)
                    try {
                        this._deleagtes.shift().apply(this, params);
                        //callBack(this._deleagtes.shift());
                    } catch (e) { }
                this.locks.length = 0;
            } else {
                for (var i = 0, l = this._deleagtes.length; i < l; i++)
                    try {
                        this._deleagtes[i].apply(this, params);
                        //callBack(this._deleagtes[i]);
                    } catch (e) { }
                this.lock = false;
                while (locks.length > 0)
                    this.Off = this.locks.pop();
            }
            this.lock = false;
        }
        public Invok(key: Object, callBack: (delegate: T) => any) {
            if (key != this.key || l <= 0) return;
            var lr;
            this.lock = true;
            if (this.isSingliton) {
                while (this._deleagtes.length > 0)
                    try { callBack(this._deleagtes.shift()); } catch (e) { }
                this.locks.length = 0;
            } else {
                for (var i = 0, l = this._deleagtes.length; i < l; i++)
                    try { lr = callBack(this._deleagtes[i]); } catch (e) { }
                this.lock = false;
                while (this.locks.length > 0)
                    this.Off = this.locks.pop();
            }
            this.lock = false;
            return lr;
        }
        public PInvok(key: Object, params: any[], owner?: any) {
            var l = this._deleagtes.length;
            if (key != this.key || l <= 0) return;
            var dlg = this._deleagtes.slice();
            var lr;
            if (this.isSingliton)
                this._deleagtes.length = 0;
            for (var i = 0; i < l; i++)
                try { lr = dlg[i].apply(owner, params); } catch (e) { }
            this.locks.length = 0;
            return lr;
        }
        public Add(delegate: T, key?: any) {
            if (this._store == null) this._store = [];
            if (key !== undefined)
                this._store[key] = delegate;
            this._deleagtes.push(delegate);
        }
        public Remove(key: any) {
            if (this._store) {
                var d = this._store[key];
                delete this._store[key];
                this.Off = d;
            }
        }
        private _store: any[];
        public Dispose() {
            this.key = null;
            this.locks.length = 0;
            this.locks = null;
            if (this._store) { this._store.length = 0; this._store = null; }
            this._deleagtes.length = 0;
            this._deleagtes = null;
        }
    }
    export class PropBinding implements basic.IDisposable,basic.IDelegate {
        public IsWaiting: boolean;
        constructor(public Invoke: (sender: PropBinding, e: EventArgs<any, any>) => void, public Owner?: any) {
            
        }
        private _isIvnoked;
        handleEvent(e: EventArgs<any, any>) {
            if (this._isIvnoked || this.Invoke == null) return;
            this._isIvnoked = true;
            try {
                if (this.Owner)
                    this.Invoke.apply(this.Owner || this, [this, e]);
                else
                    this.Invoke(this, e);
            } catch (error) {
                console.warn(error);
            }
            this._isIvnoked = false;
        }

        public Dispose() {
            this.Owner = null;
            this.Invoke = null;
        }
    }
    class PropertyStore implements basic.IDisposable {
        public Bindings: Array<PropBinding> = [];
        constructor(public Value?) {

        }
        public Dispose() {
            this.Value = null;
            for (var i = this.Bindings.length - 1; i >= 0; i--)
                this.Bindings[i].Dispose();
            this.Bindings.length = 0
            this.Bindings = null;
        }
    }
    export enum PropertyAttribute {
        NonSerializable = 2,
        Private = 4,
        SerializeAsId = 8,
        IsKey=16,
    }
    export enum ObjectAttribute {
        NonSerializable = 2,
    }
    class TypesMap {
        public get length() { return this.Fields.length; }
        public Fields: DProperty<any, DObject>[] = [];
        constructor(public Base: TypesMap) {
            this.Fields = Base ? Base.Fields.slice(0) : [];
        }
    }
    
    export abstract class DObject implements basic.IDisposable {
        private static _dpStore: Array<TypesMap> = [];
        private static _isOpen: boolean = false;
        public GetType() { return (<any>this).constructor; }
        public static __fields__(): bind.DProperty<any, any>[] { return []; }
        public static __attributes__() {

        }
        public static get isOpen(): boolean {
            return this._isOpen;
        }
        public static GetProperty(type: Function, name: string) {
            var id = DObject.getId(type);
            var s = DObject._dpStore[id];
            var f = s.Fields;
            for (var i = f.length - 1; i >= 0; i--) {
                var p = f[i];
                if (p.Name == name) return p;
            }
        }
        public static GetDPropertyAt(type: Function, index: number): DProperty<any, any> {
            var map = DObject.register(type);
            //var id = DObject.getId(type);
            //var s = DObject._dpStore[id];
            return map.Fields[index];
        }
        public GetProperty(name: string) {
            var types =reflection. GetBaseTypes(this.constructor, DObject);
            for (var j = 0; j < types.length; j++) {
                var id = DObject.getId(types[j]);
                var tm = DObject._dpStore[id];
                if (tm) {
                    for (var i = tm.Fields.length - 1; i >= 0; i--) {
                        if (tm.Fields[i].Name == name) { return tm.Fields[i]; }
                    }
                }
            }
            return null;
        }
        ToJson(_context: encoding.SerializationContext, indexer?: encoding.IIndexer): Object {
            indexer = indexer == undefined ? _context.getJson(this) : indexer;
            indexer.valid = true;
            var json = indexer.json;
            for (var tm = DObject._dpStore[DObject.getId(this.constructor)].Fields, j = 0, l = tm.length; j < l; j++) {
                var prop = tm[j];
                if ((prop.Attribute & 2) === 2) continue;
                var v = this.get(prop) as basic.IId;
                if ((prop.Attribute & 8) == 8)
                    if (v && v.Id) {
                        json[prop.Name] = v.Id;
                        continue;
                    } else continue;
                json[prop.Name] = _context.ToJson(v);
            }            
            return json;
        }

        FromJson(json: any, context: encoding.SerializationContext, update?: boolean): this {
            if (json == null) return this;
            var ref = json['@ref'] as encoding.IRef;
            delete json['@ref'];
            if (ref)
                context.set(ref.__ref__, this);
            update = update || false;
            for (var tm = DObject._dpStore[DObject.getId(this.constructor)].Fields, j = 0, l = tm.length; j < l; j++) {
                var prop = tm[j];
                if ((prop.Attribute & 4) === 4) continue;
                var val = json[prop.Name];
                if (val === undefined) continue;
                context.FromJson(val, prop.Type as any, new encoding.Path(this, prop));
            }
            return this;
        }
        public static IsClass(x: any) {
            if (typeof x == "function") {
                if (x == (<any>DObject).IsClass.constructor) return false;
                return true;
            }
            return false;
        }

        public static CreateField<PropertyType, ClassType>(name: string, type: Function | reflection.GenericType |reflection. DelayedType, defaultValue?: PropertyType, changed?: (e: EventArgs<PropertyType, ClassType>) => void, check?: (e: EventArgs<PropertyType, ClassType>) => void, attribute?: PropertyAttribute) {
            if (type == null)
                type = Object;
            return new DProperty<PropertyType, ClassType>(attribute, name, type, defaultValue, changed, check);
        }
        private static typeCount = 0;
        private static getId(type: any) {
            if (type.hasOwnProperty("__id__")) return type.__id__;
            var val = ++DObject.typeCount;
            Object.defineProperty(type, "__id__", {
                value: val, writable: false, configurable: false, enumerable: false
            });
            return val;
        }
        static xxx = window['xxx'] = [];
        private static _buildProperty(obj, propName: string) {
            var v = obj[propName];
            if (v != null) var t = v.constructor;
            else t = Object;
            return bind.DObject.CreateField(propName, t, v);
        }

        public IsPropertiesChanged(m: BuckupList<this>) {
            if (!m) return true;
            var t = m.values;
            var x = this.store;
            var c;
            for (var i = 0; i < x.length; i++)
                if (c = x[i])
                    if (c.Value !== t[i]) return true;
            return false;
        }

        public static ToDObject(obj: any, props: string[]) {
            if (obj instanceof this || obj.hasOwnProperty("__id__")) return obj;
            var type = obj.getType instanceof Function ? obj.getType() : obj.constructor;
            if (!type.hasOwnProperty("__id__"))
                Object.defineProperty(type, "__id__", {
                    value: -1, writable: false, configurable: false, enumerable: false
                });
            else if (type !== -1) throw "Invalid type";
            
            var flds = new Array<bind.DProperty<any, any>>(props.length);
            for (var i = 0; i < props.length; i++) {
                var dp = flds[i] = this._buildProperty(obj, props[i]);
                dp.Index = i;
                setProperty(obj, dp);
            }
        }

        private static register(type: any) {

            var id = DObject.getId(type);
            var x = DObject._dpStore[id];
            if (x != null) return x;
            var c = reflection.GetBaseTypes(typeof (type) === 'function' ? type : type.constructor, DObject);            
            var u, lu: TypesMap;
            for (var i = c.length - 1; i >= 0; i--) {
                var bc = c[i];
                var id = DObject.getId(bc);
                u = DObject._dpStore[id];
                if (u == null) {
                    if (bc.hasOwnProperty('ctor'))
                        (bc as any).ctor();

                    if (bc.hasOwnProperty('_ctor'))
                        (bc as any)._ctor();
                    if (bc.hasOwnProperty('__fields__'))
                        var nld: () => DProperty<any, any>[] = bc["__fields__"];
                    else nld = null;
                    
                    DObject._isOpen = true;
                    u = new TypesMap(lu);
                    
                    var cnt = lu ? lu.length : 0;
                    var uf = nld ? bc["__fields__"]() : [];
                    for (var j = 0; j < uf.length; j++) {
                        var dp = uf[j] as DProperty<any, DObject>;
                        dp.Index = cnt + j;
                        if (!(dp.Type instanceof reflection.DelayedType))
                            Object.freeze(dp);
                        if (!bc.prototype.hasOwnProperty(dp.Name))
                            setProperty(bc, dp);
                        u.Fields.push(dp);
                    }
                    DObject._isOpen = false;
                    DObject._dpStore[id] = u;
                    Object.freeze(u);
                }
                lu = u;
            }
            return DObject._dpStore[id];
        }

        private store: PropertyStore[] = [];
        private __events__:typeof PropertyStore
        public getType() {
            return (<any>this).constructor;
        }
        
        constructor() {            
            DObject.register(this.constructor);
        }
        public static getFieldsCount() {
            return this.register(this).Fields.length;
        }
        public static getFields(type?: Function) {
            return this.register(type||this).Fields;
        }

        
        protected _isFrozen: boolean;

        protected set<T>(prop: DProperty<T, this>, value: T, keepEvent?: boolean): void | EventArgs<T, this> {
            if (this._isFrozen) return;
            var ps = this.store[prop.Index] || (this.store[prop.Index] = new PropertyStore(prop.DefaultValue));
            var old = ps.Value;
            if (old === value) return;
            if (value != null)
                if (!prop.checkType(value))
                    throw { message: "Uncompatible type", this: this, property: prop, value: value };
            var ev = EventArgs.New(prop, this, <T>old, value);
            if (prop.Check)
                prop.Check.call(this, ev);
            if (old === ev._new || !ev.IsValid) return;
            ps.Value = ev._new;

            if (prop.Changed)
                prop.Changed.call(this, ev);
            this.onPropertyChanged(ev);
            if (keepEvent) return ev;
            ev.Dispose();
        }
        protected raise<T>(e: DProperty<T, this>) {
            var c = this.get(e);
            var ev = EventArgs.New(e, this, c, c);
            this.onPropertyChanged(ev);
        }
        protected get<T>(prop: DProperty<T, this>): T {
            var ps = this.store[prop.Index];
            return ps ? ps.Value as T : prop.DefaultValue;
        }
        protected GetValues() {
            return this.store.map((v, i, a) => v && v.Value);
        }

        public GetValue<T>(prop: DProperty<T, this>): T {
            var ps = this.store[prop.Index];
            return ps ? ps.Value as T : prop.DefaultValue;
        }
        public SetValue<T>(prop: DProperty<T, this>, p: T) {
            this.set(prop, p);
        }

        private _propertyChanged: ((ev: EventArgs<any, this>) => void)[] = [];
        public removeListener(v: (ev: EventArgs<any, this>) => void) {
            var x = this._propertyChanged.indexOf((<any>v).Ref);
            if (x !== -1)
                this._propertyChanged.splice(x, 1);
            else
                return false;
            return true;
        }
        public addListener(v: (ev: EventArgs<any, this>) => void ) {
            if (this._propertyChanged.indexOf(v) !== -1) return false;
            this._propertyChanged.push(v);
            return true;
        }
        protected onPropertyChanged(ev: EventArgs<any, any>): void {
            for (var i = 0; i < this._propertyChanged.length; i++) {
                let dlg = this._propertyChanged[i];
                dlg(ev);
            }
            var x = this.store[ev.prop.Index];
            if (x) var y = x.Bindings;
            else return;
            for (var i = 0; i < y.length; i++)
                y[i].handleEvent(ev);
        }

        OnPropertyChanged<T>(prop: DProperty<T, this>, ev: (sender: PropBinding, ev: EventArgs<T, this>) => void, owner?: any): PropBinding {            
            var ps:any = this.store[prop.Index] || (this.store[prop.Index] = new PropertyStore(prop.DefaultValue));
            ps.Bindings.push(ps = new PropBinding(ev, owner));
            return ps;
        }
        public addEvent<T>(prop: DProperty<T, this>, b: PropBinding) {
            var ps: any = this.store[prop.Index] || (this.store[prop.Index] = new PropertyStore(prop.DefaultValue));
            ps.Bindings.push(b);
        }

        public removeEvent<T>(prop: DProperty<T, this>, y: PropBinding) {
            var ps = this.store[prop.Index];
            if (ps) {
                var i = ps.Bindings.indexOf(y);
                if (i != -1) {
                    y.Dispose();
                    return ps.Bindings.splice(i, 1);
                }
            }
            return null;
        }
        public get Disposed() { return this.store.length === 0; }
        protected DisposingStat: DisposingStat;
        protected OnDispose(): boolean {
            if (this.DisposingStat === 2) return null;
            var h = this.DisposingStat == 1;
            this.DisposingStat = 1;
            if (!h && this.OnDisposing)
                this._onDisposing.Invoke(0, [this]);
            return h;
        }
        public Dispose() {
            var h = this.OnDispose();
            if (h === null) return;
            this._propertyChanged.length = 0;
            var t = DObject.getFields(this.GetType());
            //for (var i = 0; i < t.length; i++)
            //    this.set(t[i], undefined);
            for (var i = 0, l = this.store.length; i < l; i++)
                this.store[i] && this.store[i].Dispose();
            this.store.length = 0;
            if (!h) this.DisposingStat = 2;
        }
        private _onDisposing: bind.EventListener<(o: DObject) => void>;
        public set OnDisposing(v: (s: this) => void) { if (this._onDisposing === undefined) this._onDisposing = new bind.EventListener<(x: this) => void>(0, true); this._onDisposing.On = v; }
        public set OffDisposing(v: (s: this) => void) { if (this._onDisposing == undefined) return; this._onDisposing.Off = v;}
        public CloneTo(o: DObject) {
            o._propertyChanged = this._propertyChanged;
            o.addListener = this.addListener;
            o.store = this.store;
        }

        public Freeze() {
            this._isFrozen = true;
            //for (var i = this.store.length - 1; i >= 0; i--)
                //Object.freeze(this.store[i]);
            //Object.freeze(this.store);
        }
        public UnFreeze() {
            this._isFrozen = false;
            //for (var i = this.store.length - 1; i >= 0; i--)
                //Object.freeze(this.store[i]);
        }

        public IsFrozen() { return this._isFrozen; }
        public CreateBackup(OnUndo?: (self: this, bl: BuckupList<this>) => void) {            
            var e: BuckupList<this>;
            backups.GetOrAdd(this.store, []).push(e = { OnUndo: OnUndo, values: this.store.map((p, i) => { return p.Value }) });
            return e;
        }
        public Commit(r?: BuckupList<any>) {
            var l = backups.Get(this.store);
            if (l == null || l.length === 0) return false;
            if (r) {
                var i = l.indexOf(r);
                if (i === -1) return;
                l.splice(i);
            } else l.pop();
        }
        public Rollback(b?: BuckupList<this>, walkTrougth?: boolean): boolean {
            if (b) return this.UndoTo(b, walkTrougth);
            var l = backups.Get(this.store);
            if (l == null || l.length === 0) return false;
            var x = l.pop();
            var ps = DObject._dpStore[(this.constructor as any).__id__];
            var c = x.values;
            for (var i = 0; i < c.length; i++)
                this.set(ps.Fields[i], c[i]);
            if (x.OnUndo) x.OnUndo(this, x);
            return true;
        }

        private UndoTo(b: BuckupList<this>, walkTrougth: boolean): boolean {
            var l = backups.Get(this.store);
            if (l == null || l.length === 0) return;
            var i = l.indexOf(b);
            if (i === -1) return false;
            var arr = l.splice(i, l.length - i);
            var ps = DObject._dpStore[(this.constructor as any).__id__];
            if (walkTrougth)
                for (var i = arr.length; i >= 0; i--) {
                    var x = arr[i];
                    var c = x.values;
                    for (var i = 0; i < c.length; i++)
                        this.set(ps.Fields[i], c[i]);
                }
            else {
                var x = arr[0];
                var c = x.values;
                for (var i = 0; i < c.length; i++)
                    this.set(ps.Fields[i], c[i]);
            }
            return true;
        }
    }
    
    
    export enum DisposingStat { None=0, Disposing=1, Disposed=2 }
    export class XPath {
        Name: string;
        Property: bind.DProperty<any, DObject>;
        Value: any;
        Binding: any;
        d: DObject;
        constructor(name: string) {
            this.Name = name;
        }
        public ListenTo(d: bind.DObject, callback: (sender: bind.PropBinding, e: bind.EventArgs<any, any>) => void) {
            if (!this.Property && d) this.Property = d.GetProperty(this.Name);
            if (this.Property) {
                if (this.Binding != null && this.d != null)
                    this.d.removeEvent(this.Property, this.Binding);
                if (d) {
                    this.Value = d.GetValue(this.Property);
                    this.Binding = d.OnPropertyChanged(this.Property, callback);
                }
            }
            else this.Value = d[this.Name];
            this.d = d;
        }
        
        public Dispose() {
            if (this.Property)
                if (this.Binding != null && this.d != null)
                    this.d.removeEvent(this.Property, this.Binding);

            this.Value = null;
            this.Binding = null;
        }
    }
    export class Observer extends bind.DObject {

        public static DPMe = bind.DObject.CreateField<any, Observer>("Me", Object, null,
            function (e: bind.EventArgs<any, Observer>) { e.__this.Start(0); },
            function (e: bind.EventArgs<any, Observer>) { e.__this.disposePath(); }
        );
        public get Me(): any { return this.get<any>(Observer.DPMe); }
        public set Me(value: any) { this.set<any>(Observer.DPMe, value); }

        public static DPPath = bind.DObject.CreateField<string[], Observer>("Path", Array, null, function (e) { e.__this.rebuidPath(e._new); });
        public get Path(): string[] { return this.get<string[]>(Observer.DPPath); }
        public set Path(value: string[]) { this.set<string[]>(Observer.DPPath, value); }

        public static DPValue = bind.DObject.CreateField<any, Observer>("Value", Object, null);
        public get Value(): any { return this.get<any>(Observer.DPValue); }
        public set Value(value: any) { this.set(Observer.DPValue, value); }

        public static __fields__() {
            return [
                Observer.DPMe, Observer.DPPath, Observer.DPValue
            ];
        }

        GenType() { return Observer; }

        public xpath: XPath[] = [];
        constructor(me: any, path: string[]) {
            super();
            this.Me = me;
            this.Path = path;
            if (!window['obsers']) window['obsers'] = [];
            window['obsers'].push(this);
        }
        private rebuidPath(path: string[]) {
            this.disposePath();
            this.xpath = new Array<XPath>(path.length);
            for (var i = 0; i < path.length; i++) {
                var p = path[i];
                this.xpath[i] = new XPath(p);
            }
            this.Start(0);
        }
        private disposePath() {
            let r = this.xpath;
            let l = r.length;
            for (let i = 0; i < l; i++) {
                var p = r[i];
                p.Dispose();p.ListenTo
            }
            this.Value = null;
        }
        public getValue(l: number) {
            let t = this.Me;
            let r = this.xpath;
            for (let i = 0; i < l; i++) {
                var p = r[i];
                if (t == null) return null;
                if (p.Property)
                    t = t.get(p.Property);
                else
                    t = t[p.Name];
            }
            return t;
        }

        private callme: (e) => void = null;
        private Start(i?: number) {
            if (i == void 0) i = 0;
            this.callme = this.callme || this.callMe.bind(this);            
            var r = this.xpath;
            let t = this.getValue(i);
            for (var j = i; j < r.length; j++) {
                var p = r[j];
                if (t) {
                    if (t instanceof bind.DObject)
                        p.ListenTo(t as bind.DObject, this.callme);
                    else p.Value = t[p.Name];
                    t = p.Value;
                }
                else
                    p.Dispose();
            }
            this.Value = t;
        }

        public ESetValue(value: any) {
            var l = this.xpath.length;
            if (l < 1) return;
            var last = this.xpath[l - 1];
            var prevlast = l - 2 < 0 ? this.Me : this.xpath[l - 2].Value;
            if (prevlast)
                if (last.Property)
                    (prevlast as bind.DObject).SetValue(last.Property, value);
                else {
                    this.Value = value;
                    prevlast[last.Name] = value;
                }
        }
        private callMe(binding: bind.PropBinding, e: bind.EventArgs<any, any>) {
            for (var i = this.xpath.length - 1; i >= 0; i--) {
                var p = this.xpath[i];
                if (p.Binding == binding) {
                    this.Start(i + 1);
                    break;
                }
            }
            this.Value = this.getValue(this.xpath.length);
        }
        Dispose() {
            var h = this.OnDispose();
            if (h === null) return;
            this.callme = null;            
            this.disposePath();
            super.Dispose();
            if (!h) this.DisposingStat = 2;
        }

    }

    export interface IJobScop {
        IsNew: boolean;
        Scop: Scop;
        Jobs: JobInstance[];
        Control: UI.JControl;
        dom?: Node;
        events?: bind.events
    }
    export enum ProcessStat {
        NotProcessed = 0,
        Processing = 1,
        Processed = 2,
    }
    
    export class Controller extends DObject implements basic.IDisposable {
        get MainControll(): UI.JControl { return this.JCParent[0]; }
        public static Attach(control: UI.JControl, data?: any | Scop) {
            var t = new Controller(control);
            t.Scop = data instanceof Scop || data == null ? data : new ValueScop(data);
            t.View = control.View;
            return t;
        }

        public getStat(): ProcessStat { return this._stat; };
        private set Stat(v: ProcessStat) {
            if (v <= this._stat) return;
            this._stat = v;
            if (v === 1 || v === 2)
                this.processEvent(v);
        }
        private _stat: ProcessStat = 0;
        public get processHowEver() { return false; }
        public set processHowEver(v) { }
        
        static __feilds__() { return [Controller.DPView]; }
        public static DPView = bind.DObject.CreateField<HTMLElement, Controller>("View", HTMLElement, null, (e) => e.__this.ViewChanged(e), (e) => e.__this.PDispose());
        public get View(): HTMLElement { return this.get<HTMLElement>(Controller.DPView); }
        public set View(value: HTMLElement) { this.set<HTMLElement>(Controller.DPView, value); }
        public JCParent: UI.JControl[] = [];
        
        private _onCompiled: basic.ITBindable<(t: this) => void>[] = [];
        public set OnCompiled(callback: basic.ITBindable<(t: this) => void>) {
            if (this._stat > 1)
                callback.Invoke.call(callback.Owner, this);
            else this._onCompiled.push(callback);
        }
        private _onCompiling: basic.ITBindable<(t: this) => void>[] = [];
        public set OnCompiling(callback: basic.ITBindable<(t: this) => void>) {
            if (this._stat > 0)
                callback.Invoke.call(callback.Owner, this);
            else this._onCompiling.push(callback);
        }
        private ViewChanged(e: bind.EventArgs<HTMLElement, Controller>) {
            var dom = e._new;
            var odom = e._old;
            if (dom === odom) return;
            if (odom)
                this.unlistenForNodeInsertion(odom), odom.removeAttribute('controlled');
            if (dom == null) return;
            dom.setAttribute('controlled', '');
            if (this.processHowEver || this.implemented(dom)) {
                this.Stat = 0;
                this.ProcessBinding();
            }
            else
                this.listenForNodeInsertion(dom);
        }
        
        unlistenForNodeInsertion(odom: Node) {
            this.PDispose(), odom.removeEventListener(OnNodeInserted, this);
        }
        private listenForNodeInsertion(dom: Node) {
            dom.addEventListener(OnNodeInserted, this);
        }
        private implemented(d: HTMLElement): boolean {
            return document.body.contains(d);
        }
        public handleEvent(e: Event) {
            var v = this.View;
            if (e.srcElement == e.target && e.currentTarget == v) {
                e.preventDefault();
                v.removeEventListener(e.type, this);
                this.ProcessBinding(e);
            }
        }
        private ProcessBinding(e?: Event) {
            if (this._stat) return;
            thread.Dispatcher.Push(Controller.explorerJob, [this]);
        }
        private static _dic: collection.Dictionary<HTMLElement, Controller>;
        private static get dic() { return this._dic || (this._dic = new collection.Dictionary<HTMLElement, Controller>("test")); }
 
        private static pb(t: Controller) {
            if (t._stat) return;
            t.Stat = 1;
            try {
                t.ParseBinding(t.View, t.Scop, t.CurrentControl);
            } catch (e) {

            }
            t.Stat = 2;
        }
        public Scop: Scop;
        public static explorerJob = thread.Dispatcher.cretaeJob(Controller.pb, [null], null, false);
        private ExploreTree(dom: HTMLElement, parent: bind.Scop,control:UI.JControl) {
            for (var i = 0; i < dom.childElementCount; i++) {
                var el = <HTMLElement>dom.children.item(i);
                if (el.hasAttribute('controlled'))
                    continue;
                this.ParseBinding(el, parent, control);
            }
        }
        public get CurrentControl() { return this.JCParent[this.JCParent.length - 1];}
        private instances: IJobScop[] = [];
        private ParseBinding(dom: Node, parent: bind.Scop, control: UI.JControl) {
            var scop: IJobScop = { dom: dom, Scop: null, Control: null, IsNew: false, Jobs: [] };
            var scop = bind.Compiler.Compile(parent, control, this, scop);
            dom = scop.dom;
            if (scop) {
                if (scop.Jobs.length !== 0 || scop.IsNew) {
                    this.instances.push(scop);
                    var cnt = scop.Control;
                    if (cnt) {
                        if (cnt.Parent == null)
                            cnt.Parent = this.CurrentControl;
                        this.JCParent.push(cnt);
                    }
                }
                if (cnt)
                {
                    if (this.CurrentControl == cnt) this.JCParent.length > 1 && this.JCParent.pop();
                    if (cnt.Parent == null)
                        cnt.Parent = this.CurrentControl;
                    if (dom instanceof Element)
                        dom.removeAttribute('compiled');
                }
                else {
                    this.ExploreTree(dom as HTMLElement, scop.Scop, this.CurrentControl);
                    if (cnt)
                        this.JCParent.length > 1 && this.JCParent.pop();
                }
            } else this.ExploreTree(dom as HTMLElement, scop as any, this.CurrentControl);            
        }
        private processEvent(v: number) {
            var c = v === 1 ? this._onCompiling : this._onCompiled;

            var x = c.slice();
            c.length = 0;
            for (var i = 0; i < x.length; i++)
                try {
                    var t = x[i];
                    t.Invoke.call(t.Owner, this);
                } catch (e) {
                }
        }
        constructor(parent:UI.JControl) {
            super();
            if (parent)
                this.JCParent.push(parent);
        }
        PDispose() {
            var s: IJobScop;
            var j: bind.JobInstance;
            var v = this.View;
            if (v != null) {
                this.unlistenForNodeInsertion(v);
            }
            
            for (var i = 0, s = this.instances[0]; i < this.instances.length; ++i, s = this.instances[i]) {
                if (s.IsNew)
                    s.Scop.Dispose();
                for (var ii = 0, j = s.Jobs[0]; ii < s.Jobs.length; ii++ , j = s.Jobs[ii])
                    j.Dispose();
                s.Jobs = null;
                s.Scop = null;
            }
            this.Stat = 0;
            this.instances.length = 0;
        }
        Dispose() {
            var h = this.OnDispose();
            if (h === null) return;
            this.PDispose();
            super.Dispose();            
            if (!h) this.DisposingStat = 2;
            
        }
    }
}

export module utils {
    export interface Node<T> {
        Depth: number;
        Value: T;
        param?: any;
        children: Node<T>[];
        Parent: Node<T>;
    }

    export class Tree<T> {
        private dic = new collection.Dictionary<T, Node<T>>("nodes");
        constructor(private source: collection.List<T>, private getParent: (item: T) => T, listen: (base: Node<T>, target: Node<T>, add_remove_clear: boolean) => void) {
            this.OnChange.On = listen;
            this.Reset();
        }
        Remove(c: T) {
            if (this.OnRemove(c))
                this.source.Remove(c);
        }
        Add(c: T) {
            this.OnAdd(c);
            this.source.Add(c);
        }
        Clear() {
            this.OnClear();
            this.source.Clear();
        }

        Reset() {
            this.OnClear();
            var e = this.source.AsList();
            for (var i = 0; i < e.length; i++)
                this.OnAdd(e[i]);
        }
        private OnAdd(target: T) {
            var parent = this.getParent(target);
            var node_parent;
            var node_target = this.dic.GetOrAdd(target, <any>{
                children: [], Value: target, Parent: null, get Depth(): number {
                    return this._depth ? this._depth : (this._depth = this.Parent ? this.Prent.Depth + 1 : 0);
                }
            });
            if (parent) {
                (node_parent = this.dic.GetOrAdd(parent, {
                    children: [], Value: parent, Parent: null, get Depth(): number {
                        return this._depth ? this._depth : (this._depth = this.Parent ? this.Prent.Depth + 1 : 0);
                    }
                })).children.push(node_target);
                node_target.Parent = node_parent;
            }            
            this.OnChange.Invoke(this.source, [node_parent, node_target, true]);
        }
        public getNodes() { return this.dic.getValues();}
        public getBases() {
            var t: Node<T>[] = [];
            var e = this.dic.getValues();
            for (var i = 0; i < e.length; i++)
                if (e[i].Parent == null)
                    t.push(e[i]);
            return t;
        }
        private OnRemove(item: T):boolean {
            var node_target = this.dic.Get(item), parent = this.getParent(item);
            if (node_target)
                if (node_target.children.length > 0)
                    return false;
                else
                    if (parent) {
                        var node_parent = this.dic.Get(parent);
                        var t = node_parent.children.indexOf(node_target);
                        if (t >= 0)
                            node_parent.children.splice(t, 1);
                    }
            this.OnChange.Invoke(this.source, [node_parent, node_target, false]);
            return true;
        }
        private OnClear() {
            this.OnChange.Invoke(this.source, []);
            this.dic.Clear();
        }
        public OnChange = new bind.EventListener<(base: Node<T>, target: Node<T>, add_remove_clear: boolean) => void>(this.source);
    }
    export class RemoveRef<T> {
        public Ref: T;
        constructor(ref: T) {
            this.Ref = ref;
        }
    }



    export class ListEventArgs<P, T> implements basic.IDisposable {
        constructor(
            public oldItem: T,
            public newItem: T,
            public startIndex: P,
            public event: collection.CollectionEvent,
            public collection?: T[]
        ) { }
        public Dispose() {
            this.oldItem = null;
            this.newItem = null;
            this.startIndex = null;
            this.event = null;
        }
        public static get ResetEvent() {
            return this._r || (this._r = new ListEventArgs(null, null, 0, collection.CollectionEvent.Reset, []));
        }
        private static _r;
    }
    export interface IPatent<T> {
        Check(s: T): boolean;
        equals(p: IPatent<T>): boolean;
    }
    export abstract class Filter<T, P extends IPatent<T>> extends bind.DObject {
        protected _patent: P;
        public get Patent(): P | string { return this._patent; }
        protected abstract convertFromString(x: string): P;
        public abstract Begin(deb: number, count: number);
        public set Patent(p: P | string) {
            if (typeof p == 'string') v = this.convertFromString(p as any);
            var v: P = p as any;
            if (!v) {
                if (!this._patent) return;
                else if (this._patent.equals(null)) return;
            }
            else if (this._patent) { if (v.equals(this._patent)) return; }
            //else return;
            
            this._patent = v as P;
            var s = this._store;
            for (var i = 0; i < s.length; i++) {
                var e = s[i];
                e.callback(this, e.data);
            }
        }
        private _store: utils.filterCallback<T, P>[] = [];

        constructor() {
            super();
        }
        public OnChanged(callback: (filter: Filter<T, P>, data: any) => void, data: any, name?: string) {
            var t = new filterCallback(callback, data, name, Date.now());
            this._store.push(t);
            return t.id;
        }
        public OffChanged(name_id: string | number) {
            if (typeof (name_id) == 'string') {
                var name = name_id as string;
                var s = this._store;
                for (var i = s.length - 1; i >= 0; i--) {
                    var e = s[i]; if (e.name == name) { s.splice(i, 1); }
                }
            }
            else if (typeof (name_id) == 'number') {
                let id = name_id as number;
                var s = this._store;
                for (var i = s.length - 1; i >= 0; i--) {
                    var e = s[i]; if (e.id == id) { s.splice(i, 1); return; }
                }
            }
        }

        protected _ismath(str: string[]) {
            for (var i = 0; i < str.length; i++)
                if (str[i].indexOf(this._patent as any) !== -1) return true;
            
            return false;
        }
        public abstract IsMatch(index: number, item: T);
    }
    export class CostumeFilter<T, P extends IPatent<T>> extends Filter<T, P> {
        constructor(public _isMatch: (patent: P, item: T) => boolean) { super(); }
        public IsMatch(index: number, item: T): boolean {
            return this._isMatch == null ? true : this._isMatch(this._patent, item);
        }
        public convertFromString(x: string): P { return x as any as P; }
        public Begin(deb: number, count: number) { }
    }

    export class filterCallback<T, P extends IPatent<T>> {
        constructor(
            public callback: (filter: utils.Filter<T, P >, data: any) => void,
            public data: any,
            public name?: string, public id?: number) { if (id == void 0) id = Date.now(); }
    }
}

export module collection {

    export enum CollectionEvent {
        Added,
        Removed,
        Replace,
        Cleared,
        Reset
    }
    export declare type ListEventInvoker<T> = (e: utils.ListEventArgs<number, T>) => void;
    export declare type ListEventHandler<T> = ListEventInvoker<T> | (basic.ITBindable<ListEventInvoker<T>>);
    export declare type ListEventBindable<T> = basic.ITBindable<ListEventInvoker<T>>;

    export class List<T> extends bind.DObject {
        static __fields__(): any[] { return [List.DPCount]; }
        public static DPCount = List.CreateField<number, List<any>>('Count', Number, 0, null, null, 2);
        
        private UCount() { this.set(List.DPCount, this._list.length); }
        protected _list: T[] = [];
        public get ArgType() { return this.argType; }
        
        GetType(): Function | reflection.GenericType { return reflection.GenericType.GetType(this.constructor, [this.argType]) as reflection.GenericType }
        constructor(protected argType: Function, array?: T[]) {
            super();
            if (array)
                if (array.length)
                    for (var i = 0, len = array.length; i < len; i++)
                        this._list.push(array[i]);
            this.UCount();
        }
        public AsList():T[] {
            return this._list;
        }
        public Order(comp: (a:T, b:T) => boolean) {
            var p = this._list;
            var l = p.length;
            for (var i = 0; i < l; i++)
                for (var j = i + 1; j < l; j++) {
                    if (!comp(p[i], p[j])) {
                        var c = p[j];
                        p[j] = p[i];
                        p[i] = c;
                    }
                }           
        }
        public OrderBy(comp: (a: T, b: T) => number) {
            var x = this._list.sort(comp);
            this.OnChanged(null, 0, CollectionEvent.Reset, null, x);
        }
        
        Filtred(filter: utils.Filter<T, utils.IPatent<T>>): ExList<T,utils.IPatent<T>> {
            var c = new ExList<T, utils.IPatent<T>>(this.argType);
            c.Filter = filter;
            c.Source = this;
            return c;
            
        }
        public Set(i: number, value: T) {
            throw 'not implimented';
        }
        public Get(i: number): T {
            if (i < 0) return null;
            if (this._list.length <= i) return null;
            return this._list[i as number];
        }
        public Insert(i: number, item: T): boolean {
            if (this._isFrozen) return;
            if (i >= 0 && i <= this._list.length) {
                this._list.splice(i, 0, item);
                this.OnChanged(item, i, CollectionEvent.Added, null);
                return true;
            }
            return false;
        }        
        public Add(item: T) {
            if (this._isFrozen) return;
            if (item == null) throw 'NullArgument detected';
            this._list.push(item);
            this.OnChanged(item, this._list.length - 1, CollectionEvent.Added, null);
            return this;
        }
        public AddRange(items: T[]) {
            if (this._isFrozen) return;
            for (var i = 0; i < items.length; i++) {
                this.Add(items[i]);
            }
        }

        public CheckIndex(i: number) {
            return i >= 0 && i < this._list.length;
        }
        public Remove(item: T | number) {
            if (this._isFrozen) return;
            if (typeof item != "number")
                item = this.IndexOf(item as any);
            return this.RemoveAt(item as any);
        }

        public RemoveAt(item: number) {
            if (this._isFrozen) return;
            if (typeof item != "number") return;
            if (this.CheckIndex(item)) {
                var t = this._list[item];
                this._list.splice(item, 1);
                this.OnChanged(t, item, CollectionEvent.Removed, t);
                return true;
            }
            return false;
        }
        public Clear() {
            if (this._isFrozen) return;
            var l = this._list.length;
            if (l > 0) {
                this.OnChanged(null, 0, CollectionEvent.Cleared, null, this._list.splice(0, this._list.length));
            }
        }

        public get Count(): number { return this._list.length; }

        public IndexOf(item: T) {
            return this._list.indexOf(item);

        }
        set Listen(delegate: ListEventHandler<T>) {
            this._changed.push(delegate);
        }
        set Unlisten(delegate: ListEventHandler<T>) {
            var x = this._changed.indexOf(delegate);
            if (x < 0) return;
            this._changed.splice(x, 1);
        }
        private OnChanged(item: T, startIndex: number, event: CollectionEvent, oldItem: T, collection?: T[]) {
            var e = new utils.ListEventArgs<number, T>(oldItem, item, startIndex, event, collection);
            var l = this._changed.length;
            this.UCount();
            for (var i = 0; i < l; i++) {
                var con = this._changed[i];
                if (typeof con === 'function')
                    (con as ListEventInvoker<T>)(e);
                else {
                    (<basic.ITBindable<ListEventInvoker<T>>>con).Invoke.call((<basic.ITBindable<ListEventInvoker<T>>>con).Owner, e);
                }
            }
        }

        private _changed: ListEventHandler<T>[] = [];
        private _changing: ListEventHandler<T>[] = [];

        protected getArgType(json): Function {
            var type = this.ArgType;
            if (type != null) return type;
            var typeName = json['__argtype__'];
            type = (typeName == undefined ? Object as Function : context.GetType(typeName)) as Function;
            return (type == undefined) ? this.argType == undefined ? Object : this.argType : type;
        }

        public ToJson(x: encoding.SerializationContext, indexer: encoding.IIndexer) {
            indexer = indexer == undefined ? x.getJson(this) : indexer;
            var ret: any | encoding.IRef = x.getJson(this);
            if (indexer.valid)
                return indexer.ref;
            else ret = super.ToJson(x, indexer);

            indexer.valid = true;
            var list = [];
            var t = this._list;
            for (var i = 0; i < t.length; i++) {
                var d = t[i];
                d = x.ToJson(d);
                list.push(d);
            }
            ret['__list__'] = list;
            ret['__argtype__'] = context.NameOf(this.argType);
            return ret;
        }
        FromJson(json: any, x: encoding.SerializationContext, update?: boolean, callback?: (prop: string, val: any) => Object) {        
            var list = json['__list__'] as Array<any> || [];
            this._list = new Array<any>(0);
            var type = this.argType = this.getArgType(json);
            for (var i = 0; i < list.length; i++) {
                var c = list[i];
                if (c === undefined) continue;
                var st = List.getType(c);
                if (st === undefined) st = this.argType;
                x.FromJson(c, st === undefined ? type : st, new encoding.LPath(this, i));
            }
            super.FromJson(json, x, update);
            this.OnDeserialize(this._list);
            if (json != null && json.IsFrozen)
                this.Freeze();
            return this;
        }
        OnDeserialize(list: T[]) {
        }
        private static getType(json) {
            var tn = json['__type__'];
            if (tn == undefined) return undefined;
            return context.GetType(tn);
        }
        UpdateDelegate: () => T[];

        public static GenType(T: Function) { return reflection.GenericType.GetType(this, [T]); }
    }
    export interface IKeyValuePair<T, P> {
        Key: T;
        Value: P;
    }
    export class Dictionary<T, P> extends bind.DObject {
        private keys: T[] = [];
        private values: P[] = [];

        constructor(public Name: string, public ReadOnly?: boolean) {
            super();
            ReadOnly = ReadOnly == null ? true : false;
        }
        public GetKeyAt(i: number) { return this.keys[i]; }
        public GetValueAt(i: number) { return this.values[i]; }
        public get Count() { return this.keys.length; }
        public Clear() {
            this.keys.length = 0;
            this.values.length = 0;
            this.OnChanged(null, null, CollectionEvent.Cleared, null);
        }
        public IndexOf(key: T, fromIndex?: number) {
            return this.keys.indexOf(key, fromIndex);
        }
        public IndexOfValue(val: P, fromIndex?:number) {
            return this.values.indexOf(val,fromIndex);
        }
        public Set(key: T, value: P) {
            var i = this.keys.indexOf(key);
            if (i === -1) {
                i = this.keys.length;
                this.keys.push(key);
            } else
                if (this.ReadOnly) if (this.values[i] === value) return; else throw "key is exist";
            this.values[i] = value;
        }
        public Remove(key: T) {
            var i = this.keys.indexOf(key);
            if (i === -1)
                return undefined;
            var val = this.values[i];
            this.values.splice(i, 1);
            this.keys.splice(i, 1);
            return val;
        }
        public RemoveAllValues(val: P):T[] {
            var keys = [];
            do {
                var i = this.values.indexOf(val, i);
                if (i === -1)
                    return keys;
                keys.push(this.keys[i]);
                this.values.splice(i, 1);
                this.keys.splice(i, 1);
            } while (true);
        }

        public RemoveAt(i: number):IKeyValuePair<T,P> {            
            if (i < this.keys.length && i >= 0) {
                var r: IKeyValuePair<T, P> = { Key: this.keys[i], Value: this.values[i] };
                this.values.splice(i, 1);
                this.keys.splice(i, 1);
                return r;
            }
            return undefined;
        }
        public getValues() { return this.values; }
        public Get(key: T):P {
            var i = this.keys.indexOf(key);
            return i === -1 ? null : this.values[i];
        }
        public GetOrAdd(key: T,value?:P): P {
            var i = this.keys.indexOf(key);
            if (i !== -1) return this.values[i];
            this.keys.push(key);
            this.values.push(value);
            return value;
        }
        public GetOrCreate(key: T, New: (key: T, param: any) => P, param: any): P {
            var i = this.keys.indexOf(key);
            if (i !== -1) return this.values[i];
            var value = New(key, param);
            this.keys.push(key);
            this.values.push(value);
            return value;
        }
        public GetKeyOf(val: P):T {
            var i = this.values.indexOf(val);
            return i === -1 ? undefined : this.keys[i];
        }
        set Listen(delegate: (e: utils.ListEventArgs<T, P>) => void) {
            this._changed.push(delegate);
        }
        set Unlisten(delegate: (e: utils.ListEventArgs<T, P>) => void) {
            var x = this._changed.indexOf(delegate);
            if (x < 0) return;
            this._changed.splice(x, 1);
        }
        private OnChanged(item: P, startIndex: T, event: CollectionEvent, oldItem: P) {
            var e = new utils.ListEventArgs<T, P>(oldItem, item, startIndex, event);
            var l = this._changed.length;
            for (var i = 0; i < l; i++) {
                var con = this._changed[i];
                con(e);
            }
        }
        private _changed: ((e: utils.ListEventArgs<T, P>) => void)[] = [];
        UpdateDelegate: () => T[];
    }
    export class ExList<T, P extends utils.IPatent<T>> extends List<T>{
        public static DPSource = bind.DObject.CreateField<List<any>, ExList<any, any>>("Source", List, null, (e) => { e.__this.sourceChanged(e); });
        public get Source(): List<T> { return this.get<List<T>>(ExList.DPSource); }
        public set Source(value: List<T>) { this.set(ExList.DPSource, value); }

        public static DPFilter = bind.DObject.CreateField<utils.Filter<any, any>, ExList<any, any>>("Filter", utils.Filter, null, (e) => { e.__this.filterChanged(e); });
        public get Filter(): utils.Filter<T, P> { return this.get<utils.Filter<T, P>>(ExList.DPFilter); }
        public set Filter(value: utils.Filter<T, P>) { this.set(ExList.DPFilter, value); }

        public static DPMaxResult = bind.DObject.CreateField<number, ExList<any, any>>("MaxResult", Number, Infinity, (e) => { e.__this.MaxResultChanged(e); });
        public get MaxResult(): number { return this.get(ExList.DPMaxResult); }
        public set MaxResult(value: number) { this.set(ExList.DPMaxResult, value); }

        public static DPShift = bind.DObject.CreateField<number, ExList<any, any>>("Shift", Number, 0, (e) => { e.__this.MaxResultChanged(e); });
        public get Shift(): number { return this.get(ExList.DPShift); }
        public set Shift(value: number) { this.set(ExList.DPShift, value); }

        static __fields__() { return [ExList.DPFilter, ExList.DPMaxResult, ExList.DPShift, ExList.DPSource]; }

        private _fid: number = null;
        private filterChanged(e: bind.EventArgs<utils.Filter<T, P>, ExList<T, P>>) {
            if (e._old)
                e._old.OffChanged(this._fid);
            if (e._new) this._fid = e._new.OnChanged(ExList.patentChanged, this);
            this.Reset();
        }
        private sourceChanged(e: bind.EventArgs<List<T>, ExList<T, P>>) {
            if (e._old)
                e._old.Unlisten = this.sicd;
            if (e._new) e._new.Listen = this.sicd;
            this.Reset();
        }
        private sicd: basic.IBindable = { Owner: this, Invoke: this.sourceItemChanged };
        private MaxResultChanged(e: bind.EventArgs<number, ExList<T, P>>) {
            this.Reset();
        }
        public static New<T, P extends utils.IPatent<T>>(source: List<T>, filter: utils.Filter<T, P>,argType?:Function) {
            var t = new ExList<T, P>(source == null ? argType : source.ArgType);
            t.Filter = filter;
            t.Source = source;
            return t;
        }
        constructor(argType: Function) {
            super(argType);
        }
        private static patentChanged<T, P extends utils.IPatent<T>>(e: utils.Filter<T, P>, t: ExList<T, P>) {
            t.Reset();
        }
        private sourceItemChanged(e: utils.ListEventArgs<number, T>) {
            switch (e.event) {
                case CollectionEvent.Added:
                    if (this.MaxResult <= this.Count) return;
                    if (this.isMatch(e.startIndex, e.newItem)) this.Add(e.newItem);
                    return;
                case CollectionEvent.Cleared:
                    return this.Clear();
                case CollectionEvent.Removed:
                    this.Remove(e.oldItem);
                    return;
                case CollectionEvent.Replace:
                    var i = this.IndexOf(e.oldItem);
                    var m = this.isMatch(e.startIndex, e.newItem);
                    if (m) {
                        if (i == -1) this.Add(e.newItem);
                        else
                            this.Set(i, e.newItem);
                    }
                    else if (i != -1) this.RemoveAt(i);
                    return;
                case CollectionEvent.Reset:
                    return this.Reset();
            }
        }
        private isMatch(i: number, item: T): boolean {
            var f = this.Filter;
            if (f == null) return true;
            return f.IsMatch(i, item);
        }
        public start: number;
        public Reset() {
            this.Clear();
            var s = this.Source;
            if (s == null) return;
            var f = this.Filter;
            var fin = f == null;
            var max = this.MaxResult;
            if (!fin)
                if (f.Begin(this.Shift, this.MaxResult))
                    this.AddRange(s.AsList());
                else
                    for (var i = 0, l = s.Count; i < l && max > 0; i++) {
                        var e = s.Get(i);
                        if (fin) this.Add(e);
                        else {
                            var r = f.IsMatch(i, e);
                            if (r === null) break;
                            if (r)
                                this.Add(e);
                        }
                    }
        }
    }

    export interface Converter< A, B> {
        ConvertA2B(sender: TransList<A,B>, index: number, a: A, d): B;
        ConvertB2A(sender: TransList<A,B>, index: number, b: B, d): A;
    }

    export class TransList<From, To> extends List<To> {
        static __fields__() { return [this.DPSource]; }
        private sli: basic.IBindable = <basic.IBindable>{ Owner: this, Invoke: this.OnSourceChanged };
        private SourceChanged<T, U>(e: bind.EventArgs<List<From>, this>): void {
            var o = e._old;
            var n = e._new;
            if (o) o.Unlisten = this.sli;
            if (n) n.Listen = this.sli;
            this.Reset();
        }

        public static DPSource = bind.DObject.CreateField<List<any>, TransList<any, any>>("Source", List, null, TransList.prototype.SourceChanged);
        public Source: List<any>;
        constructor(argType: Function, private converter: Converter<From,To>, private stat?: any) {
            super(argType);
        }
        private _internal: boolean;
        private OnSourceChanged(e: utils.ListEventArgs<number, From>) {
            this._internal = true;
            try {
                switch (e.event) {
                    case CollectionEvent.Added:
                        var x = this.converter.ConvertA2B(this, e.startIndex, e.newItem, this.stat);
                        super.Add(x);
                        break;
                    case CollectionEvent.Cleared:
                        super.Clear();
                        break;
                    case CollectionEvent.Removed:
                        super.Remove(e.startIndex);
                        break;
                    case CollectionEvent.Replace:
                        var x = this.converter.ConvertA2B(this, e.startIndex, e.newItem, this.stat);
                        super.Set(e.startIndex, x);
                        break;
                    case CollectionEvent.Reset:
                        this.Reset();
                        break;
                }
            } catch (e) {

            }
            this._internal = false;
        }
        private Reset() {
            super.Clear();
            var n:any = this.Source;
            if (!n) return;
            n = n.AsList();
            for (var i = 0, l = n.length; i < l; i++) {
                var x = this.converter.ConvertA2B(this, i, n[i], this.stat);
                super.Add(x);
            }
        }
        Add(t: To) {
            if (this._internal) return super.Add(t);
            this.Source.Add(this.converter.ConvertB2A(this, this._list.length, t, this.stat));
        }
        Remove(x: To): boolean {
            if (this._internal) return super.Remove(x);
            this.Source.Remove(this.converter.ConvertB2A(this, this._list.indexOf(x), x, this.stat))
        }
        Insert(i: number, item: To) {
            if (this._internal) return super.Insert(i, item);
            this.Source.Insert(i, this.converter.ConvertB2A(this, i, item, this.stat));
        }
        Clear() {
            if (this._internal) return super.Clear();
            this.Source.Clear();
        }
        Order(n: (a:To, b:To) => boolean) {
        }
        OrderBy(n: (a: To, b: To) => number) {

        }
        Set(i: number, item: To) {
            if (this._internal) return super.Set(i, item);
            this.Source.Set(i, this.converter.ConvertB2A(this, i, item, this.stat));
        }
    }


    export abstract class Binding<T> {
        GetType() { return Binding; }
        private _dataContext: collection.List<T>;
        get DataContext(): collection.List<T> { return this._dataContext; }
        set DataContext(value: collection.List<T>) {
            if (value == this._dataContext) return;
            var t = this._dataContext;
            if (t != null) t.Unlisten = this.initChanged;
            if (value != null) value.Listen = this.initChanged;
            this._dataContext = value;
            this.OnSourceInitialized(t, value);
        }

        constructor(dataContext: collection.List<T>) {
            this.DataContext = dataContext;

        }
        abstract OnItemAdded(item: T, index: number);
        abstract OnItemRemoved(item: T, index: number);
        abstract OnSourceCleared();
        abstract OnSourceInitialized(_old: collection.List<T>, _nex: collection.List<T>);
        abstract OnSourceReset();
        abstract OnSourceReplace(oldItem: T, newItem: T, index: number);
        private initChanged(e: utils.ListEventArgs<number, T>) {
            switch (e.event) {
                case collection.CollectionEvent.Added:
                    this.OnItemAdded(e.newItem, e.startIndex);
                    break;
                case collection.CollectionEvent.Removed:
                    this.OnItemRemoved(e.oldItem, e.startIndex);
                    break;
                case collection.CollectionEvent.Cleared:
                    this.OnSourceCleared();
                    break;
                case collection.CollectionEvent.Reset:
                    this.OnSourceReset();
                    break;
                case collection.CollectionEvent.Replace:
                    this.OnSourceReplace(e.oldItem, e.newItem, e.startIndex);
            }
        }
    }

    export abstract class Render<T, P> extends Binding<T> {
        GetType() { return Render; }
        private _rendredList: collection.List<P>;
        public get RendredList(): collection.List<P> {
            if (this._rendredList == null) this._rendredList = new collection.List<P>(Object, []);
            return this._rendredList;
        }
        constructor(dataContext: collection.List<T>) {
            super(dataContext);
        }
        abstract Render(item: T): P;

        OnItemAdded(item: T, index: number) {
            this.RendredList.Insert(index, this.Render(item));
        }
        OnItemRemoved(item: T, index: number) {
            this.RendredList.RemoveAt(index);
        }
        OnSourceCleared() {
            this.RendredList.Clear();
        }
        OnSourceInitialized(_old: collection.List<T>, _nex: collection.List<T>) {
            if (_nex != null) {
                var c = _nex.Count;
                this.RendredList.Clear();
                for (var i = 0; i < c; i++) {
                    var e = _nex.Count;
                    this._rendredList.Add(this.Render(_nex.Get(e)));
                }
            }
        }
    }
    /*
    export class Enum extends collection.List<basic. EnumValue> {
        private x = {};
        Add(v: basic.EnumValue) { return this; }
        Get(n: number) {
            var l = this.AsList();
            if (typeof n === 'number')
                for (var i = 0; i < l.length; i++)
                    if (l[i].Value === n) return l[i]; else;
            else for (var i = 0; i < l.length; i++)
                if (l[i].Name === (n as any)) return l[i];
            return null;
        }
        static gen(_enum) {
            var o = [];
            for (var i in _enum)
                if (isNaN(parseFloat(i)))
                    o.push(new basic.EnumValue(i, _enum[i]));
            return o;
        }
        constructor(_enum: any) {
            super(basic.EnumValue, Enum.gen(_enum));
            this.Freeze();
        }
    }*/
}

export module mvc {
    interface IContext {
        _this: mvc.Initializer;
        tmpl: mvc.iTemplate;
    }
    interface IGContext {
        _this: mvc.Initializer;
        tmpl: mvc.ITemplateGroup;
    }

    export abstract class ITemplate {
        abstract Create(): HTMLElement;
        constructor(public Category: string) {
        }
    }
    
    export class iTemplate extends ITemplate{
        private _Url: string;
        public get Url(): string {
            return this._Url;
        }  
        private _Shadow: HTMLTemplateElement;
        public get Shadow(): HTMLTemplateElement {
            return this._Shadow;
        }
        public set Shadow(v: HTMLTemplateElement) {
            if (v != null) {
                if (!(v instanceof HTMLElement))
                    throw 'shadow is not HTMLElement';
            }
            this._Shadow = v;
        }
        public Create(): HTMLElement {
            var s = this._Shadow;            
            return s == null ? null : (s.content as any).firstElementChild.cloneNode(true) as HTMLElement;
        }
        constructor(relativeUrl: string, category: string, shadow?: HTMLTemplateElement) {
            super(category);
            if (relativeUrl == null) throw "url is null";
            if (category == null) throw "category is null";
            this._Url = relativeUrl;
            if (shadow == undefined) return;
            this.Shadow = shadow;
        }
        public Load() {
        }
    }
    export interface ITemplateGroup {
        Url: string;
        OnError(init: Initializer);
        OnSuccess(init: Initializer);
    }
    var fromI = false;
    export class MvcDescriptor {
        private static _store: { [name: string]: MvcDescriptor } = {};
        public DataType: Function;

        public Name: string;
        private Templates: collection.List<ITemplate> = new collection.List<ITemplate>(ITemplate);

        constructor(name: string, dataType: Function) {
            if (!fromI) throw "Direct Access UnAlowed";
            fromI = false;
            if (name == null) throw "name is null";
            if (typeof name != 'string') throw "name is not string";
            name = name.trim()
            if (name == "") throw "name is empty";
            if (!(dataType instanceof Function)) dataType = this.Get;// throw "dataType is not a Type";

            this.Name = name;
            this.DataType = dataType;
            if (MvcDescriptor._store[name]) stop();
            MvcDescriptor._store[name] = this;
        }
        public static New(name: string, dataType: Function) {
            var t = MvcDescriptor._store[name];
            if (t) {
                if (t.DataType != dataType) throw "UnCompatible Type";
                return t;
            }
            fromI = true;
            return new MvcDescriptor(name, dataType);
        }
        public get Count(): number {
            return this.Templates.Count;
        }
        public Get(index: number | string) :ITemplate {
            if (typeof index == 'number')
                return this.Templates.Get(index as number);
            if (typeof index == 'string')
                for (var i = 0; i < this.Templates.Count; i++) {
                    var t = this.Templates.Get(i);
                    if (t.Category == index) return t;
                }
            return null;
        }
        public static GetByType(datatype: Function): MvcDescriptor {
            for (var mcv in MvcDescriptor._store) {
                if (MvcDescriptor._store.hasOwnProperty(mcv)) {
                    var p = MvcDescriptor._store[mcv];
                    if (p.DataType == datatype) return p;
                }
            }
            return null;
        }

        public static GetByName(templateName: string): MvcDescriptor {
            return MvcDescriptor._store[templateName];
        }
        public static Add(template: HTMLTemplateElement, path: string) {
            if (path == null) path = template.getAttribute('name');
            var ps = path.split('.');
            if (ps.length == 0) throw "invalid template name";
            if (ps.length == 1)
                var mvc = this.GetByName('templates') || (this._store['templates'] =  MvcDescriptor.New('templates', bind.DObject));
            else if (ps.length == 2)
                var mvc = this.GetByName(ps[0]) || (this._store[ps[0]] =  MvcDescriptor.New(ps[0], Object)),
                    path = ps[1];            
            else throw "invalid template path argument";
            mvc.registerTemplate(template, './#templates/' + mvc.Name + '/' + path, path);
        }

        public Add(templ: ITemplate) {
            if (templ instanceof mvc.ITemplate)
                this.Templates.Add(templ);
            return this;
        }
        public static Get(templatePath: string) {
            var path = templatePath.split(/[\s\\\/\.]+/);
            if (path.length == 0) return null;
            var p1 = path[0];
            var mvc = this.GetByName(p1);
            if (mvc != null) {
                var p2 = path[1];
                if (p2)
                    return mvc.Get(p2) || mvc.Get(0);
                return mvc.Get(0);
            }
            return null;
        }

        public registerTemplate(cat: HTMLTemplateElement, url: string, name?: string) {
            if (cat.tagName !== 'TEMPLATE') throw 'unresolved tag ' + cat.tagName;
            let templateName = name || cat.getAttribute('name');
            if (templateName == null) throw 'template must have a name \r\nfrom :' + url;
            if (cat.children.length > 1) {
                console.warn('the template must be encapsuled in single tag');
                var v = document.createElement('div');
                v.innerHTML = cat.innerHTML;
                cat.innerHTML = '';
                cat.appendChild(v);
            }
            this.Add(new mvc.iTemplate(url + '#' + name + '+' + templateName, templateName, cat));
        }
    }
    interface ITypeResolverCollection {
        [typeName: string]: Function;
    }


    
    export  class Initializer {
        
        public static get Instances(): Initializer {
            return _Instance || (_Instance = new Initializer(require));
        }

        constructor(private require: (modules: string, onsuccss?: (result: any) => void, onerror?: (result: any) => void, context?: any) => void) {
            if (require == null) throw 'require argument is null';
            if (_Instance) throw "App cannot have more than initializer";
            _Instance = this;
            this.Init();
        }
        Init() { }
        Dispose() { }
        get System(): collection.List<MvcDescriptor> { return this._system; }
        private readonly _system: collection.List<mvc.MvcDescriptor> = new collection.List<mvc.MvcDescriptor>(mvc.MvcDescriptor);
        public Add(templGroup: ITemplateGroup, require?: (modules: string, onsuccss?: (result: any) => void, onerror?: (result: any) => void, context?: any) => any) {
            this.pending++;
            (require || this.require)('template|' + templGroup.Url, Initializer.gonsuccess, Initializer.gonerror, { _this: this, tmpl: templGroup });
        }
        private static typeResolvers: ITypeResolverCollection = {};
        public static SetTypeResolver(name, typeResolver: (typeName: string) => Function) {
            Initializer.typeResolvers[name] = typeResolver;
        }
        private _pending: number = 0;
        private get pending() {
            return this._pending;
        }
        private set pending(v: number) {
            if (v < 0) throw "pending cannot be less then 0";
            if (v === this._pending) return;
            this._pending = v;
            if (v === 0) Initializer.onfinish(this);
        }
        private static gonsuccess(r: ITemplateExport) {
            var t = this as any as IGContext;
            var __this = t._this;
            try {
                Initializer.MakeAsParsed(r);
                __this.ExcecuteTemplate(t.tmpl.Url, r.html);
                if (t.tmpl.OnSuccess)
                    thread.Dispatcher.call(t.tmpl, t.tmpl.OnSuccess, t._this);
            } catch (e) {
            }
            __this.pending--;
        }
        private static gonerror(r: any) {
            var t = this as any as IGContext;
            try {
                console.error(" Group of templates [" + t.tmpl.Url + "]: error downloading");
                if (t.tmpl.OnError)
                    thread.Dispatcher.call(t.tmpl, t.tmpl.OnError, t._this);
            } catch (e) {
            }
            t._this.pending--;
        }
        private static onsuccess(r: any) {
            var t = this as any as IContext;
            var tmpl = t.tmpl;
            var __this = t._this;
            __this.pending--;            

            tmpl.Shadow = Initializer.htmlToElements(r) as any;
            if (__this.pending === 0) Initializer.onfinish(t._this);
        }
        private static onerror(r: any) {
            var t = this as any as IContext;
            t._this.pending--;
            console.error("template [" + t.tmpl.Url + "] error downloading");
            t.tmpl.Shadow = Initializer.html2Template("<error>Error Downloading Template</error>");
            if (t._this.pending === 0)
                Initializer.onfinish(t._this);
        }
        static html2Template(html: string) {
            var t = document.createElement('template') as HTMLTemplateElement;
            t.innerHTML = html;
            return t;
        }
        static htmlToElements(html) {
            var t = document.createElement('div');
            t.innerHTML = html;
            return t;
        }
        public then(call: (Initializer: Initializer) => void) {
            if (this.pending <= 0) return call(this);
            Initializer.callbacks.push(call);
        }
        public static then(call: (Initializer: Initializer) => void) {
            Initializer.callbacks.push(call);
        }
        private static callbacks: ((Initializer: Initializer) => void)[] = [];
        protected onfinish() {
            var c = Initializer.callbacks;
            while (c.length)
                c.shift()(this);
        }
        private static onfinish(t: Initializer) {
            for (var i = 0; i < Initializer.callbacks.length; i++)
                Initializer.callbacks[i](t);
        }
        public static Get(type: Function) {
            var n = _Instance.System;
            {
                var l = n.Count;
                for (var i = 0; i < l; i++) {
                    var e = n.Get(i);
                    if (e.DataType == type) return e;
                }
            }
            return null;
        }
        public getDescriptor(name: string, type: Function): MvcDescriptor {
            if (!name && !type) return this.templatesDescrpt;
            if (name) var descipter = MvcDescriptor.GetByName(name);
            if (!descipter && type) descipter = MvcDescriptor.GetByType(type);
            if (!descipter) this.System.Add(descipter =  MvcDescriptor.New(name, type));
            else if (descipter.Name !== name || descipter.DataType !== type)
                throw "Conflit with others template";
            return descipter;
        }
        private templatesDescrpt = this.getDescriptor("templates", bind.DObject);
        public ExcecuteTemplate(url: string, templ: HTMLElement, typeResolver?: (typeName: string) => Function) {
            var types = {};
            var templatesDescrpt = this.getDescriptor("templates", bind.DObject);
            function getType(name) {
                var t = types[name];
                if (t != null) return t;
                if (typeResolver) t = typeResolver(name);
                if (t == null || !(t instanceof Function)) {
                    t = context.GetType(name);
                    if (t == undefined || !(t instanceof Function))
                        throw "type " + name + " unresolved";
                }
                types[name] = t;
                return t;
            }
            this.registerTemplates(templ, url, getType, templatesDescrpt);
        }
        
        private registerTemplates(dom: HTMLElement, url: string, getType: (name: string) => Function, descriptor: MvcDescriptor) {
            var des: HTMLElement;
            var name = dom.getAttribute('name');
            var type = dom.hasAttribute('type') ? getType(dom.getAttribute('type')) : undefined;

            var templatesDescrpt1 = dom.hasAttribute('name') ? this.getDescriptor(name, type) || descriptor : descriptor;
            for (var i = 0; i < dom.children.length; i++) {
                des = dom.children.item(i) as HTMLElement;
                if (des.tagName === 'DESCRIPTOR')
                    this.registerDescriptor(des, url, getType);
                else if (des.tagName === "TEMPLATE")
                    this.registerTemplate(des as HTMLTemplateElement, templatesDescrpt1, url);
                else if (des.tagName === "TEMPLATES")
                    this.registerTemplates(des, url, getType, descriptor);
                else if (des.tagName === 'DEBUGGER') stop();
                else if (des.tagName !== 'REQUIRE' && des.tagName!=='DEBUGGER') console.error('unresolved tag ' + des.tagName);
            }
        }
        private registerDescriptor(des: HTMLElement, url: string, getType: (name: string) => Function) {
            var name = des.getAttribute('name');
            var type: any = getType(des.getAttribute('type'));
            var descipter = this.getDescriptor(name, type);
            for (var j = 0; j < des.children.length; j++) {
                var tmpl = des.children.item(j) as HTMLTemplateElement;
                this.registerTemplate(tmpl, descipter, url);
            }
        }

        private registerTemplate(cat: HTMLTemplateElement, descipter: MvcDescriptor, url: string) {
            if (cat.tagName !== 'TEMPLATE') throw 'unresolved tag ' + cat.tagName;
            let templateName = cat.getAttribute('name');
            if (templateName == null) throw 'template must have a name \r\nfrom :' + url;
            if (cat.children.length > 1) {
                console.warn('the template must be encapsuled in single tag');
                var v = document.createElement('div');
                v.innerHTML = cat.innerHTML;
                cat.innerHTML = '';
                cat.appendChild(v);
            }
            descipter.Add(new mvc.iTemplate(url + '#' + name + '+' + templateName, templateName, cat));
        }


       
        static Register(e: PluginsEvent) {
            var tempate = e.exports as ITemplateExport;
            if (this.parsed.indexOf(tempate) !== -1)
                return;
            else if (tempate.html.hasAttribute('private')) return;
            else this.Instances.ExcecuteTemplate(e.url.toString(), tempate.html);
        }
        static MakeAsParsed(r: ITemplateExport) {
            this.parsed.push(r);
        }
        private static parsed: ITemplateExport[] = [];
    }
    export class Template {
        private static _store;
        public static TempplatesPath: string = "./templates/";
        private _type: any;
        private _view: HTMLElement;
        private _name: string = "";
        private _for: string = "";

        public get forType(): any { return this._type; }
        public get View() { return this._view; }
        public get Name() { return this._name; }
        public get For() { return this._for; }

        constructor(templateDOM: HTMLElement) {
            if (Template._store === undefined) Template._store = new collection.List<Template>(Template);
            if (Template.fromInside == true) {
                this._view = templateDOM;
                this._name = templateDOM.getAttribute("name");
                this._for = templateDOM.getAttribute("for");

                if (this._name == null) throw "name is null";

                Template._store.Add(this);
            } else throw "Access violatile";

        }

        public static getTemplates(type): Template[] {
            var c = Template._store;
            var rt: Template[] = [];
            for (var i = c.Count - 1; i >= 0; i--) {
                var t = c.Get(i);
                if (t.forType == type) rt.push(t);
            }
            return rt;
        }
        private static fromInside = false;
        public static LoadTemplate(templateName: string, context: basic.IContext) {
            var templatePath = Template.TempplatesPath + templateName;
            Template.getWebRequest().Download(new net.RequestUrl(templatePath, context), null);
        }
        public static getWebRequest() {
            if (Template._webRequest) return Template._webRequest;
            var c = <basic.ICrypto>basic.Crypto;
            var w = new net.WebRequest(c);
            w.OnComplete.On = Template.OnRecieveTemplates;
            return Template._webRequest = w;
        }
        private static _webRequest;
        private static OnRecieveTemplates(result: net.WebRequest) {
            if (Template.getWebRequest().IsSuccess == false) 
                return;
            var x = Template.getWebRequest();
            var r = x.Response;
            var templates = document.createElement("templates");
            templates.innerHTML = r;
            templates = <HTMLElement>templates.firstChild;
            for (var i = 0; i < templates.childElementCount; i++) {
                
                Template.createTemplate(<HTMLElement>templates.children.item(i));
            }
        }
        private static createTemplate(tmplate: HTMLElement) {
            Template.fromInside = true;
            var t = null;
            try {
                t = new Template(tmplate);
            } catch (error) {
            }
            Template.fromInside = false;
            return t;
        }
        public static GetAll(name: string) {
            if (arguments.length == 2)
                var a = Template._store;
            var x = [];
            for (var i = 0; i < a.Count; i++) {
                var t = a.Get(i);
                if (t._name == name) x.push(t);
            }
            return x;
        }
        public static Get(name: string, vtype: string) {
            var a = Template._store;
            for (var i = 0; i < a.Count; i++) {
                var t = a.Get(i);
                if (t._name == name && vtype == t._for) return t;
            }
            return null;
        }
        public static Foreach(callback: (tmplate: Template) => boolean) {
            var s = Template._store;
            for (var i = s.Count - 1; i >= 0; i--) {
                var t = s.Get(i);
                if (callback(t)) return;
            }
        }
    }
}

export module bind {
    export interface IJobCollection { [s: string]: basic.IJob; }
    export abstract class Scop extends bind.DObject {
        private _scops: basic.scopCollection;
        public getScop(path: string, createIfNotEist?: boolean) {
            return Scop.getAttribute(this, path.split(/[\s\\\/\.]+/), createIfNotEist);
        }
        public findScop(path: string[]) {
            var cs: Scop = this;
            do {
                var t = path.pop();
                switch (t) {
                    case '.':
                        continue;
                    case '..':
                        cs = cs.getParent();
                        break;
                    default:
                        var c = t.charCodeAt(0);
                        if (c === 36 || c === 126)
                            throw "optimize your code by delete the first part befor ($|~)";
                        if (c === 64) {

                        }
                        cs = cs._scops && cs._scops[t];
                        break;
                }
            } while (path.length > 0);
        }
        public abstract getParent(): Scop;
        protected abstract setParent(v: Scop);
        private static getAttribute(scp: Scop, name: string[], createIfNotEist?: boolean): Scop {
            while (true) {
                if (name.length === 0) return scp;
                var fname = name.shift();
                let s: Scop;
                if (scp._scops && scp._scops.hasOwnProperty(fname))
                    s = scp._scops && scp._scops[fname];
                else if (createIfNotEist) {
                    if (!scp._scops) scp._scops = {};
                    scp._scops[fname] = s = new ValueScop(null);
                    s.setParent(scp);
                }
                else return null;
                scp = s;
            }
        }
        public setAttribute(name: string, value: any) {
            var s = this.getScop(name, true);
            s.Value = value;
        }
        public getAttribute(name: string, createIfNotEist?: boolean): Scop {
            return Scop.getAttribute(this, [name], createIfNotEist);
        }
        public static __fields__() {

            return [Scop.DPValue];
        }
        public static DPValue = bind.DObject.CreateField<any, Scop>("Value", Object, null, null);
        public get Value(): any { return this.get<any>(Scop.DPValue); }
        public set Value(value: any) {
            var e = this.set<any>(Scop.DPValue, value, true) as EventArgs<any, this>;
            if (this._bindingMode && e != null)
                this._OnValueChanged(e);
            if (e) e.Dispose();
        }
        public get BindingMode() { return this._bindingMode; }
        protected _bindingMode: BindingMode;
        public set BindingMode(value: BindingMode) { this._bindingMode = value == null ? 1 : value; }

        constructor(_bindingMode: BindingMode) {
            super();
            if ((<any>this).constructor == Scop) throw "abstract class";
            this._bindingMode = _bindingMode == null ? 1 : _bindingMode;
        }
        protected valueChanged(sender: bind.PropBinding, e: bind.EventArgs<any, any>) {
            (<Scop>e.__this)._OnValueChanged(e);

        }
        protected abstract _OnValueChanged(e: bind.EventArgs<any, any>);
        public static Create(s: string, parent?: Scop, bindingMode?: BindingMode, controller?: Controller): Scop {
            bindingMode = bindingMode == null ? 1 : bindingMode;
            var e = s.split('|');
            if (e.length === 1) return this.process(s, parent, bindingMode, controller);
            for (var i = 0; i < e.length; i += 2) {
                var f1 = e[i], f2 = e[i + 1];
                parent = f1.length === 0 ? parent : this.process(f1, parent, bindingMode, controller);
                parent = f2.length == 0 ? parent : CreateFilter(f2, parent, bindingMode || 3) || parent;
            }
            return parent;
        }
        private static process(pathS: string, parent: Scop, bindngMode: BindingMode, controller?: Controller) {
            var path = this.parse(pathS);
            for (var i = 0; i < path.length; i++) {
                var t = path[i];
                if (t[0] == '[') {
                    parent = new TypedScop(parent, t.substr(1, t.length - 2), bindngMode);
                    continue;
                } else {
                    parent = this.GetScop(t.split('.'), parent, bindngMode, controller);
                }
            }
            return parent;
        }

        private static parse(s: string) {
            s = s || "";
            var u = this.simplePath;
            u.exec("");
            //var word = /(?:[\$\@\*\~\^]?[\w\d]+)/.source;
            //var cword = "(?:" + word + '(?:\\.' + word + ")*)";
            //var typePath = "(?:\\[" + cword + "\\])";
            //var simplePath = "(" + cword + "|" + typePath + ")";
            //var u = new RegExp(simplePath, "gim");
            var arr: string[] = [];
            var m: RegExpExecArray;
            while (m = u.exec(s)) {
                arr.push(m[0]);
            }
            return arr;

        }
        private static simplePath = /(?:(?:(?:(\^)*[\$\@\*\~]?[\w\d]+)(?:\.(?:(\^)*[\$\@\*\~]?\$?[\w\d]+))*)|(?:\[(?:\=)?(?:\:)?(?:(?:(\^)*[\$\@\*\~]?[\w\d]+)(?:\.(?:(\^)*[\$\@\*\~]?\$?[\w\d]+))*)\]))/gim;
        public static GetScop(path: string[], parent: Scop, bindngMode: BindingMode, controller?: Controller) {
            while (path.length > 0) {
                var t = path[0];
                switch (t.charAt(0)) {
                    case '[':
                        t = t.substr(1, t.length - 2);
                        parent = new TypedScop(parent, t, bindngMode);
                        path.shift();
                        continue;
                    case '$':
                        if (t.charAt(1) == '$') {
                            throw "MethodNotImplimented";
                        } else {
                            t = t.substring(1);
                            parent = NamedScop.Create(t, bindngMode);
                            path.shift();
                        }
                        continue;
                    case '*':
                        t = t.substring(1);
                        parent = Scop.getAttribute(parent, t.split('*'), true);
                        path.shift();
                        continue;
                    case '~':
                        parent = AnonymouseScop.UnRegister(parseInt(t.substring(1)));
                        path.shift();
                        continue;
                    case '^':
                        parent = parent.getParent();
                        path[0] = t.substr(1);
                        continue;
                    case '@':
                        t = t.substring(1).trim();
                        if (t.length > 0) parent = new bind.Bind(path.join('.'), parent, bindngMode);
                        parent = new bind.StringScop("", parent);
                        break;
                    case '':
                        return parent;
                    default:
                        if (t === 'this') {
                            parent = controller.MainControll;
                            path.shift();
                            continue;
                        } else
                            return new bind.Bind(path.join('.'), parent, bindngMode);
                }
            }
            return parent;
        }

        public AddJob(job: basic.IJob, dom: Node) {
            var ji: bind.JobInstance = new bind.JobInstance(this, job, dom);
            if (!this.__jobs__) this.__jobs__ = [ji];
            else this.__jobs__.push(ji);
            if (job.OnInitialize != null)
                job.OnInitialize(ji, null);
            return ji;
        }
        private __jobs__: bind.JobInstance[];
        Dispose() {
            var h = this.OnDispose();
            if (h === null) return;
            if (this.__jobs__) {
                for (var i = 0; i < this.__jobs__.length; i++) {
                    var ji = this.__jobs__[i];
                    if (ji.IsDisposed) continue;
                    ji.Dispose();
                    basic.Url
                }
                this.__jobs__.length = 0;
                this.__jobs__ = null;
            }
            super.Dispose();
            if (!h) this.DisposingStat = 2;
        }
        public RegisterJob(job: basic.IJob) {
            if (!this.__mjobs__) this.__mjobs__ = {};
            this.__mjobs__[job.Name] = job;
        }
        public GetJob(name: string) {
            return this.__mjobs__ && this.__mjobs__[name];
        }
        protected __mjobs__: IJobCollection;
        __Controller__: Controller;
        public getThis() {
            return this.__Controller__ && this.__Controller__.CurrentControl;
        }
        get __hasSegments__() { return false; }
        forEach<T>(callback: (s: any, param: T) => boolean, param?: T) {
        }
        get ParentValue(): any { var p = this.getParent(); return p && p.Value; }
    }

    export class StringScop extends bind.Scop {
        private sc: basic.StringCompile;
        private pb: bind.PropBinding;
        constructor(s: string, private parent: bind.Scop) {
            super(bind.BindingMode.SourceToTarget);            
            this.sc = basic.StringCompile.Compile(s || "");
        }
        protected _OnValueChanged(e: bind.EventArgs<any, any>) { }
        public  getParent() { return this.parent; }
        protected  setParent(v: Scop) {
            var lp = this.parent;
            if (lp && this.pb)
                lp.removeEvent(bind.Scop.DPValue, this.pb);
            if (v)
                v.addEvent(bind.Scop.DPValue, this.pb = new bind.PropBinding(this.ParentValueChanged, this));
            else this.pb = null;
            this.parent = v;
            this.sc.bind(v ? v.Value : null);
        }
        ParentValueChanged(sender: bind.PropBinding, e: bind.EventArgs<any, any>) {
            this.sc.bind(e._new);
        }
        FromJson(json, context: encoding.SerializationContext, update) {
            return this;
        }
        ToJson(context: encoding.SerializationContext, iintexder?: encoding.IIndexer) {
            var o = super.ToJson(context, iintexder);
            return o;
        }
    }
    var scops = {};
    export class NamedScop extends Scop {
        
        private _name: string;
        public get Name(): string { return this._name; }
        constructor(name: string, bindingMode: BindingMode) {
            super(bindingMode);
            if (name.charAt(0) == '$') throw "Name of scop cannot be started with '$' char";
            if (vars.names_scop_fromIn != true) throw "Access violatil";
            this._name = name;
            if (name)
                scops[name] = this;
            vars.names_scop_fromIn = false;
        }
        public static Get(name: string):bind.NamedScop {
            return scops[name];
        }

        protected _OnValueChanged(e: bind.EventArgs<any, any>) {

        }
        public static Create(name: string, value?: any, twoWay?: BindingMode) {
            var t: NamedScop = scops[name];
            if (t != null) return t;
            vars.names_scop_fromIn = true;
            t = new NamedScop(name, twoWay);
            t.Value = value;
            return t;
        }
        public Dispose() {
            var h = this.OnDispose();
            if (h === null) return;
            super.Dispose();
            scops[this.Name] = undefined;
            delete scops[this.Name];
            if (!h) this.DisposingStat = 2;
        }
        getParent() { return null; }
        setParent(v: Scop) { }
    }

    export class Bind extends Scop {
        public static __fields__() {
            return [Bind.DPParent, Bind.DPPath];
        }
        private static PathChanged(e: bind.EventArgs<any, Bind>) {
            e.__this.int = true;
            e.__this.observer.Path = e._new == null || e._new == '' ? [] : (<string>e._new).split('.');
            e.__this.int = false;
        }
        private pb: bind.PropBinding = null;
        private static ParentChanged(e: bind.EventArgs<Scop, Bind>) {
            var t = e.__this;
            var n = e._new;
            var o = e._old;
            if (o != null && t.pb != null) {
                o.removeEvent(Scop.DPValue, t.pb);
            }
            if (n != null) {
                t.pb = n.OnPropertyChanged(Scop.DPValue, t.ParentValueChanged, t);
                t.observer.Me = n.Value;
            } else t.observer.Me = null;
        }

        Dispose() {
            var h = this.OnDispose();
            if (h === null) return;
            this.removeEvent(Scop.DPValue as any, this.pb);
            this.observer.removeEvent(Observer.DPValue, this.observerBinding);
            this.observer.Dispose();
            this.pb = null;
            this.observerBinding = null;
            this.observer = null;
            super.Dispose();
            if (!h) this.DisposingStat = 2;
        }

        ParentValueChanged(sender: bind.PropBinding, e: bind.EventArgs<any, any>) {
            this.int = true;
            this.observer.Me = e._new;
            this.int = false;
        }

        private static DPPath = bind.DObject.CreateField<string, Bind>("Path", String, null, Bind.PathChanged);
        public get Path(): string { return this.get<string>(Bind.DPPath); }
        public set Path(value: string) { this.set<string>(Bind.DPPath, value); }

        private static DPParent = bind.DObject.CreateField<Scop, Bind>("Parent", Scop, null, Bind.ParentChanged);
        public get Parent(): Scop { return this.get<Scop>(Bind.DPParent); }
        public set Parent(value: Scop) { this.set<Scop>(Bind.DPParent, value); }

        private observer: bind.Observer = new bind.Observer(null, []);

        private observerBinding: PropBinding;
        constructor(path: string | string[], parent: Scop, bindMode?: BindingMode) {
            super(bindMode);
            if (path instanceof Array) path = (<string[]>path).join('/');
            this.Path = path as any;
            if (typeof (parent) == "string") parent = NamedScop.Create(parent as any, undefined);
            this.int = true;
            this.Parent = parent;
            this.Value = this.observer.Value;
            if ((bindMode & 1) == 1)
                this.observerBinding = this.observer.OnPropertyChanged(Observer.DPValue, this.__OnValueChanged, this);
            this.int = false;
        }
        private isChanging: boolean;
        private __OnValueChanged(sender: bind.PropBinding, e: bind.EventArgs<any, any>) {
            this.isChanging = true;
            this.Value = e._new;
            this.isChanging = false;
        }
        protected AttributeChanged(e: Event) {
        }
        private int: boolean = false;
        protected _OnValueChanged(e: bind.EventArgs<any, any>) {
            if (this.isChanging) return;
            if (((this.BindingMode & 2) === 2) && !this.int) {
                var o = this.observer;
                var p = o.xpath;
                var l = p.length;
                if (l === 0) return;
                var parent;

                var lp = p[l - 1];
                if (l === 1)
                    parent = o.Me;
                else
                    parent = p[l - 2].Value;

                if (parent)
                    if (lp.Property != null)
                        (parent as any).set(lp.Property, e._new);
                    else
                        parent[lp.Name] = e._new;
            }
        }
        getParent() { return this.get(Bind.DPParent); }
        setParent(v: Scop) { this.set(Bind.DPParent, v); }
        getChildren() { return [] as Scop[]; }
        get Values() { return this.observer.xpath; }
        get Segments() { return this.observer.xpath; }
        forEach<T>(callback: (s: any, param: T) => boolean, param?: T) {
            var t = this.observer.xpath;
            for (var i = t.length - 1; i >= 0; i--) {
                if (callback(t[i].Value, param)) return <basic.IRef<any>>{ value: t[i].Value };
            }
        }
        get ParentValue(): any {
            var pth = this.observer.xpath;
            if (pth.length == 1) { var p = this.getParent(); return p && p.Value; }
            return pth[pth.length - 2].Value;
        }
    }
    var i = -1;
    var ascops: Scop[] = [];
    export namespace AnonymouseScop   {        
        export function Register(scop: Scop): number {
            ascops[++i] = scop;
            return i;
        }
        export function UnRegister(i: number): Scop{
            var t = ascops[i];
            ascops[i] = undefined;
            return t;
        }
        export function Get(i: number): Scop {
            return ascops[i];
        }
    }
    export class ValueScop extends Scop {
        constructor(value: any, bindMode?:BindingMode) {
            super(bindMode);
            this.Value = value;
        }
        _OnValueChanged(e: EventArgs<any, any>) {
        }
        getParent() { return this._parent; }
        setParent(v: Scop) { this._parent = v; }
        private _parent: Scop;
    }

    export class TypedScop extends Scop {
        itself: boolean;
        private pB: PropBinding;
        private parent: Scop
        public getParent(): Scop {
            return this.parent;
        }
        protected setParent(v: Scop) {
            if (v == this.parent) return;
            if (this.parent && this.pB)
                this.parent.removeEvent(Scop.DPValue, this.pB);
            this.pB = v.OnPropertyChanged(Scop.DPValue, this.OnParentValueChanged, this);
            this.parent = v;
            this.reProcess();
        }
        protected _OnValueChanged(e: EventArgs<any, any>) {
        }
        private type: Function | string;
        private eq: boolean;
        constructor(parent: Scop, type: string, bindingMode: BindingMode) {
            super(bindingMode);
            var i = 0;
            if (type[0] == '=' || type[1] == '=') { this.eq = true; i++; }
            if (type[0] == ':' || type[1] == ':') { this.itself = true; i++; }
            if (i) type = type.substr(i);

            this.type = context.GetType(type) || type;
            this.setParent(parent);

        }
        private OnParentValueChanged(pB: PropBinding, e: EventArgs<any, Scop>) {
            this.reProcess();
        }
        private reProcess() {
            var pS = this.parent;
            var tiss = typeof this.type === 'string';
            while (pS) {
                if (pS.__hasSegments__ && pS.forEach((s, p) => p.checkType(s, tiss, true), this) !== undefined) return;
                else if (this.checkType(pS, tiss, this.itself)) return;
                pS = pS.getParent();
                this.setAttribute
            }
        }
        private checkType(pS, tiss, itself) {
            var pv = itself ? pS : pS.Value;
            if (pv != null)
                if (tiss) {
                    if (pv.constructor.name == this.type) {
                        this.Value = pv;
                        return true;
                    }
                }
                else if (this.eq ? pv.constructor === this.type : pv instanceof (this.type as Function)) {
                    this.Value = pv;
                    return true;
                }
        }
    }
    var tx = {
        '3': 3,
        '2': 2,
        '1': 1,
        '': 0,
        'false': 1,
        'true': 3
    }
    function getDbTwoWay(t) {
        if (t == null) return 1;
        return tx[t] || BindingMode[t];
    }
    export class db {
        public todo: string;
        public init: { [n: string]: any };
        public bind:string;
        public name:string;
        public job:string;
        public twoway: BindingMode;
        public filter: string;
        public cmd: string;
        public exec: string;
        public template: string;
        public control: string;
        public stop: string;
        public events: { [eventName: string]: string } = {};

        constructor(dom: Element) {
            var a = dom.attributes;
            for (var i = 0; i < a.length; i++) {
                var n = a[i].name;
                if (n.indexOf('db-') === 0)
                    this[n.substr(3)] = a[i].value;
                else if (n.indexOf('on-') === 0) {
                    this.events[n.substr(3)] = a[i].value;
                }
            }
            if (this.twoway)
                this.twoway = getDbTwoWay(this.twoway);
            try {
                if (this.init)
                    this.init = JSON.parse(this.init as any);
            } catch (e) {
            }
            if (this.stop != undefined) { if (typeof stop !== undefined) stop(); stop(); }
        }
    }
    export interface DomCompilerArgs {
        parentScop: Scop;
        parentControl: UI.JControl;
        controller: Controller;
        e: bind.IJobScop;
        attributes?: db;
    }

    export class Compiler {
        public static GetParentScop(dom: HTMLElement): Scop {
            let s, d = dom.parentElement || dom.parentNode as HTMLElement, c;
            while (<any>d != document) {
                if (d == null) return;
                c = NamedScop.Get(d['']);
                if (c instanceof Scop) return c as Scop;
                s = d.getAttribute("db-bind");
                if (s != null) {
                    return Scop.Create(s);
                }
                d = <HTMLElement>d.parentElement || <HTMLElement>d.parentNode;
            }
            return null;
        }
        public static processComplicatedAttribute(dom: Element, parent: Scop, _scop: Scop, tsm: JobInstance[], attribute: string) {
            var isCmd;
            var x = attribute.split("->");
            var _bind = x[0] || '';
            var job = x[1] || '';
            if (job.length === 0) return;
            if (job[0] === '#')
                isCmd = true, job = job.substr(1);

            if (job.length === 0) return;
            if (_bind[0] == '.') {
                parent = _scop || parent;
                _bind = _bind.substr(1);
            }
            else if (parent == null) parent = _scop;
            if (_bind.length > 0)
                _scop = Scop.Create(_bind, parent,
                    attribute.indexOf('<->') !== -1 ? BindingMode.TwoWay :
                        attribute.indexOf('->') ? BindingMode.SourceToTarget : BindingMode.TargetToSource 
                );
            if (isCmd) return ScopicCommand.Call(job, dom, _scop);
            var ijob = job == '.' ? _scop.GetJob(job.substring(1)) : bind.GetJob(job);
            var ji = _scop.AddJob(ijob, dom);
            tsm.push(ji);
        }
        private static _UI: typeof UI;
        private static get UI() {
            if (this._UI != null) return this._UI;
            this._UI = (require as any)('./UI');
            this._UI = this._UI && (this._UI as any).UI;
            return this._UI;
        }

        private static createTemplate(templatePath: string, dom: Element): HTMLElement {
            if (templatePath) {
                var template = mvc.MvcDescriptor.Get(templatePath);
                if (!templatePath)
                    console.log("the template " + templatePath + "Cannot be found");
                else dom = template.Create();
            } else throw "template args not setted";
            return dom as HTMLElement;
        }

        public static Compile(parentScop: Scop, parentControl: UI.JControl, controller: Controller, e: bind.IJobScop): bind.IJobScop {
            var dom = e.dom as Element;
            if (dom.hasAttribute('compiled')) return e;
            dom.setAttribute('compiled', '');
            var t = new db(dom);
            this.extraxtScop(t, parentScop, e, controller);

            if (t.template) {
                var ndom = this.createTemplate(t.template, dom);
                if (dom != ndom) {
                    for (var i = 0; i < dom.attributes.length; i++) {
                        var c = dom.attributes.item(i);
                        if (c.name === 'compiled' || c.name.indexOf('db-') === 0) {
                            continue;
                        }
                        ndom.setAttribute(c.name, c.value);
                    }
                    dom.parentNode.replaceChild(ndom, dom);
                    dom = ndom;
                }
                var e = <IJobScop>{ Control: null, dom: dom, IsNew: false, Scop: null, Jobs: [] };
                var e1 = this.Compile(e.Scop || parentScop, parentControl, controller, e);
                if (!e1) stop();
                return e1 || e;
            }

            if (t.job != null)
                this.execJobs(t, e, parentControl, parentScop);

            if (t.cmd)
                for (var xi of t.cmd.split('|'))
                    ScopicCommand.Call(xi, dom, e.Scop);
            if (t.exec)
                this.processComplicatedAttribute(dom, parentScop, e.Scop, e.Jobs, t.exec);
            if (t.todo)
                this.Todo(t, parentScop, e, controller);
            if (t.control)
                this.createControl(t, parentScop, parentControl, controller, e);
            else if (t.name)
                this.setName(t.name, controller.CurrentControl, e);
            this.initEvents(t, e, parentScop, controller);
            if (!e) stop();
            return e;
        }

        private static extraxtScop(t: db, parentScop: bind.Scop, e: IJobScop, controller: Controller) {
            e.Scop = t.bind ? Scop.Create(t.bind, parentScop, t.twoway,controller) || parentScop : parentScop;
            if (t.init)
                for (var ic in t.init)
                    e.Scop.setAttribute(ic, t.init[ic]);

            if (t.filter)
                e.Scop = bind.CreateFilter(t.filter, e.Scop, t.twoway || 3);
            e.IsNew = e.Scop != parentScop;
        }
        private static execJobs(t: db, e: IJobScop, control: UI.JControl, parentScop: bind.Scop) {
            var tsm: JobInstance[] = [];
            var ts = t.job.split('|');
            for (var i = 0, l = ts.length; i < l; i++) {
                var jn = ts[i];
                var job = jn[0] == '.' ? e.Scop.GetJob(jn.substring(1)) : bind.GetJob(ts[i]);
                var ji = e.Scop.AddJob(job, e.dom);
                tsm.push(ji);
                if (!e.Control)
                    ji.Control && (ji.Control.Parent = control);
            }
            return tsm;
        }
        private static getFirstChild(dom: Element) {
            var f = dom.firstChild;
            var node: Node;
            while (f) {
                if (f instanceof Element) return f;
                if (!node && f instanceof Node) node = f;
                f = f.nextSibling;
            }
            return node;
        }
        private static createControl(t: db, parentScop: Scop, parentControl: UI.JControl, controller: Controller, e: bind.IJobScop) {
            var child = this.getFirstChild(e.dom as Element);
            (e.dom as Element).removeAttribute('db-control');
            var cnt = ScopicControl.create(t.control, child, e.Scop || parentScop, parentScop, parentControl, controller);
            e.Control = cnt;
            cnt.Parent = parentControl;
            var parent = e.dom.parentNode || e.dom.parentElement;
            if (parent) {
                parent.replaceChild(child, e.dom);
                e.dom = child;
            }
            if (t.name)
                this.setName(t.name, controller.CurrentControl, e);
        }
        private static _setName(name: string, cnt: UI.JControl, e: bind.IJobScop) {
            var x = <any>cnt;
            while (x) {
                try {
                    if (x.setName) {
                        x.setName(name, e.dom, cnt, e);
                        return true;
                    }
                    else
                        x = x.Parent;
                } catch (w) { }
            }
        }
        private static setName(name: string, parentControl: UI.JControl, e: bind.IJobScop) {
            return this._setName(name, e.Control, e) || this._setName(name, parentControl, e);
        }
        private static Todo(t: db, parentScop: bind.Scop, e: IJobScop, controller: Controller) {
            var s = Scop.Create(t.todo, parentScop, 0, controller);
            if (!s) return;
            e.Scop.AddJob(<basic.IJob><any>{
                scopFunction: s,
                Todo: Todo.prototype.Todo,
            }, e.dom);
        }

        private static initEvents(t: db,e:IJobScop,parentScop:Scop,controller:Controller): events {
            if (!t.events) return;
            var x: events;
            for (var i in t.events) {
                if (!x) x = new events(e.Scop);
                x.Register(i, e.dom, Scop.Create(t.events[i], parentScop, 0, controller), controller);
            }
            return x;
        }
    }
    class DBPath {
        private filter: string;
        private 
        constructor(private s: string) {
        }
    }
     class Todo implements basic.IJob{
        get Name() { return "Todo"; }
         Todo?(job: JobInstance, e: EventArgs<any, any>): void {
             var v: (job: JobInstance, e: EventArgs<any, any>) => void = this.scopFunction.Value;
             if (!(v instanceof Function)) return;
             var p = this.scopFunction.getParent();
             v.call(p && p.Value, job, e);
         }
         constructor(private scopFunction: bind.Scop) { }
    }

    export type delg = (ovalue, value, scop: bind.Scop, job: JobInstance, event: EventArgs<any,any>) => void;
    class FnJob implements basic.IJob {
        private static fns: { [name: string]: delg } = {};
        get Name() { return "FnTodo"; }
        private fn: delg;
        Todo?(job: JobInstance, e: EventArgs<any, any>): void {
            var v = this.fn;
            if (!(v instanceof Function)) return;
            var scp = job.Scop;
            var p = scp.__Controller__ && scp.__Controller__.MainControll
            v.call(p, e._old, e._new, scp, job, e);
        }
        constructor(private fns: string) {
            if (fns.indexOf('=') == 0) fns = fns.substr(1);
            
        }
        public static register(fn: string) {
            var t = basic.EvalCode.CompileExpression(fn, ["ovalue", "value", "scop", "job", "event"], (fn, b) => { stop(); }, this, true);
        }
    }

    export interface EventData {
        dom: Node; scop: Scop; controller: Controller
    }

    export class events implements basic.IJob, EventListenerObject {         
        private events: { [eventType: string]: EventData[] };
        Name: string="Events";
        Todo?(job: JobInstance, e: EventArgs<any, any>): void {
            throw new Error("Method not implemented.");
        }
        Register(eventType: string, dom: Node, scop: Scop,controller: Controller) {
            if (!this.events) this.events = {};
            var a = this.events[eventType];
            var s = { scop: scop, controller: controller, dom: dom };
            if (!a) {
                this.events[eventType] = a = [s];
                dom.addEventListener(eventType, this);
            }
            else a.push(s);
        }
        handleEvent(e: Event) {
            var scps = this.events[e.type];
            for (var i = 0; i < scps.length; i++) {
                var scp = scps[i];
                try {
                    this.exec(scp, this.scop, e);
                } catch (e) {
                }
            }
        }

        private exec(dt: EventData, scopValue: Scop, e: Event) {

            var scp = dt.scop;
            var scpv = scp.Value;
            if (typeof scpv === 'function') {
                var p = scp.ParentValue;
                scpv.call(p, e, dt, scopValue, this);
            } else if (scpv instanceof Object && scpv.handleEvent) {
                scpv.handleEvent(e, dt, scopValue, this);
            }
        }

        constructor(public scop: Scop) { }
    }
    export abstract class Filter<T, CT> extends Scop {
        private dbb: PropBinding;

        constructor(protected source: Scop, bindingMode?: BindingMode) {
            super(bindingMode);
        }
        public Initialize() {
            if (this.source)
                this.dbb = this.source.OnPropertyChanged(Scop.DPValue, this.SourceChanged, this);
            this.Value = this.Convert(this.source ? this.source.Value : null);
        }
        protected isChanging: boolean;
        protected SourceChanged(p: PropBinding, e: EventArgs<any, Scop>) {
            if ((this._bindingMode & 1) === 0) return;
            if (this.isChanging) return;
            this.isChanging = true;
            this.Value = this.Convert(e._new);
            this.isChanging = false;
        }
        protected _OnValueChanged(e: bind.EventArgs<any, any>) {
            if ((this._bindingMode & 2) === 0) return;
            if (this.isChanging) return;
            this.isChanging = true;
            this.source.Value = this.ConvertBack(e._new);
            this.isChanging = false;
        }

        public Update() {
            this.Value = this.Convert(this.source.Value);
        }
        public UpdateBack() {
            this.source.Value = this.ConvertBack(this.Value);
        }
        protected abstract Convert(data: T): CT;
        protected abstract ConvertBack(data: CT): T;
        getParent() { return this.source; }
        setParent(v: Scop) {
            if (this.source)
                this.source.removeEvent(Scop.DPValue, this.dbb);
            if (v)
                this.dbb = v.OnPropertyChanged(Scop.DPValue, this.SourceChanged, this);
            this.source = v;
            this.Initialize();
        }
        Dispose() {
            if (this.source)
                this.source.removeEvent(Scop.DPValue, this.dbb);
            this.source = null;
            super.Dispose();
        }
    }
    export class DoubleFilter extends Filter<number, number> {
        public set Fraction(v: number) {
            if (this.fraction === v) return;
            this.fraction = v;
            switch (this._bindingMode) {
                case 0:
                    return;
                case 2:
                    this.UpdateBack();
                    return;
                case 1:
                case 3:
                    this.Update();
                    return;
            }
        }
        private fraction: number = 0.3333;
        protected Convert(data: number): number { return data / this.fraction; }
        protected ConvertBack(data: number): number { return data * this.fraction; }
    }

    export interface IFilter {
        Name: string;
        BindingMode: BindingMode;
        CreateNew(source: Scop, bindingMode: BindingMode, param: string): Filter<any, any>;
    }
    var filters = {};
    export function RegisterFilter(filter:IFilter) {
        if (filters[filter.Name]) return false;
        Object.defineProperty(filters, filter.Name, { value: filter, writable: false, configurable: false, enumerable: false });
        return true;
    }
    export function CreateFilter(filterName: string, parent: Scop, bindingMode: BindingMode) {
        var i = filterName.indexOf(':');
        if (i == -1) var p = null, name = filterName;
        else {
            name = filterName.substring(0, i);
            p = filterName.substring(i + 1);
        }
        var f = filters[name] as IFilter;
        if (!f) return parent;
        
        var e = f.CreateNew(parent, bindingMode & f.BindingMode, p);
        e.Initialize();
        return e;
    }
    
    export enum BindingMode {
        SourceToTarget = 1,
        TwoWay = 3,
        TargetToSource = 2,
    }
    /*
    export class ScopBinder {
        private events = { eventA: null, eventB: null, eventO: null };
        private obs: Observer;
        private get IsSourceToTarget() { return (this.mode & BindingMode.SourceToTarget) === BindingMode.SourceToTarget; }
        private get IsTargetToSource() { return (this.mode & BindingMode.TargetToSource) === BindingMode.TargetToSource; }

        constructor(private a: Scop, private mode: BindingMode, private path: string[], private b: Scop) {
            if (0 === (mode & 3)) return;
            var o = new Observer(a.Value, path);
            if (1 === (mode & 1))
                this.events.eventA = a.OnPropertyChanged(Scop.DPValue, this.aChanged);
            if (2 === (mode & 2))
                this.events.eventB = b.OnPropertyChanged(Scop.DPValue, this.bChanged);
            
            this.events.eventB = o.OnPropertyChanged(Observer.DPValue, this.oChanged);
        }
        private initialize() {
        }
        private aChanged(s: PropBinding, ev: EventArgs<any, Scop>) {
            if ((this.mode & BindingMode.SourceToTarget) === BindingMode.SourceToTarget)
                this.obs.Me = ev._new;
        }
        private bChanged(s: PropBinding, ev: EventArgs<any, Scop>) {

        }
        private oChanged(s: PropBinding, ev: EventArgs<any, Observer>) {

        }
    }

    */

    export class TwoBind<T> {
        private dba: PropBinding;
        private dbb: PropBinding;
        private IsChanging: boolean;
        constructor(private bindingMode:BindingMode,private a: DObject, private b: DObject, private pa: DProperty<T, any>, private pb: DProperty<T, any>) {
            this.dba = a.OnPropertyChanged(pa, this.pac, this);
            this.dbb = b.OnPropertyChanged(pb, this.pab, this);
            this.Dispose = this.Dispose.bind(this);
            a.OnDisposing = this.Dispose;
            b.OnDisposing = this.Dispose;

            if (bindingMode == 2)
                this.initB();
            else
                this.init();
        }

        protected init() {
            var va = this.a.GetValue(this.pa);
            (this.b as any).set(this.pb, va);
        }

        protected initB() {
            var vb = this.b.GetValue(this.pb);
            (this.a as any).set(this.pa, vb);
        }
        protected pac(p: PropBinding, e: EventArgs<any, any>) {
            
            if ((this.bindingMode & 1) == 0) return;
            if (this.IsChanging) return;
            this.IsChanging = true;
            (this.b as any).set(this.pb, e._new);
            this.IsChanging = false;
        }
        protected pab(p: PropBinding, e: EventArgs<any, any>) {
            
            if ((this.bindingMode & 2) == 0) return;
            if (this.IsChanging) return;
            this.IsChanging = true;
            (this.a as any).set(this.pa, e._new);
            this.IsChanging = false;
        }
        private disposed
        Dispose() {
            if (this.disposed) return;
            this.disposed = true;
            this.a.OffDisposing = this.Dispose;
            this.b.OffDisposing = this.Dispose;
            this.disposed = null;
            this.a.removeEvent(this.pa, this.dba);
            this.b.removeEvent(this.pb, this.dbb);
            this.a = null;
            this.b = null;
            this.dba = null;
            this.dbb = null;
            this.pa = null;
            this.pb = null;

        }
    }
    export class TwoDBind<T,P> {
        private dba: PropBinding;
        private dbb: PropBinding;
        private IsChanging: boolean;
        constructor(private bindingMode:BindingMode, private a: DObject, private b: DObject, private pa: DProperty<T, any>, private pb: DProperty<P, any>,private con:(v:T)=>P,private conBack:(v:P)=>T) {
            this.dba = a.OnPropertyChanged(pa, this.pac, this);
            this.dbb = b.OnPropertyChanged(pb, this.pab, this);
            this.Dispose = this.Dispose.bind(this);
            a.OnDisposing = this.Dispose;
            b.OnDisposing = this.Dispose;
            if (bindingMode == 2)
                this.initB();
            else
                this.init();
        }
        protected pac(p: PropBinding, e: EventArgs<any, any>) {
            if ((this.bindingMode & 1) == 0) return;
            if (this.IsChanging) return;
            this.IsChanging = true;
            (this.b as any).set(this.pb, this.con ? this.con(e._new) : e._new);
            this.IsChanging = false;
        }
        protected pab(p: PropBinding, e: EventArgs<any, any>) {
            if ((this.bindingMode & 2) == 0) return;
            if (this.IsChanging) return;
            this.IsChanging = true;
            (this.a as any).set(this.pa, this.conBack ? this.conBack(e._new) : e._new);
            this.IsChanging = false;
        }
        protected init() {
            var va = this.a.GetValue(this.pa);
            (this.b as any).set(this.pb, this.con ? this.con(va) : va);
        }
        protected initB() {
            var vb = this.b.GetValue(this.pb);
            (this.a as any).set(this.pa, this.con ? this.conBack(vb) : vb);
        }
        private disposed
        Dispose() {
            if (this.disposed) return;
            this.disposed = true;
            this.a.OffDisposing = this.Dispose;
            this.b.OffDisposing = this.Dispose;
            this.disposed = null;
            this.a.removeEvent(this.pa, this.dba);
            this.b.removeEvent(this.pb, this.dbb);
            this.a = null;
            this.b = null;
            this.dba = null;
            this.dbb = null;
            this.pa = null;
            this.pb = null;

        }
    }
}

bind.RegisterFilter({
    Name: '2bl', BindingMode: 3, CreateNew(s, b,p) {
        var e = new bind.DoubleFilter(s, b);
        if (p)
            e.Fraction = parseFloat(p);
        return e;
    }
});

export module ScopicControl {
    export declare type IControlCreater = (name: string, dom: Node,currentScop:bind.Scop, parentScop: bind.Scop, parentControl: UI.JControl, controller: bind.Controller) => UI.JControl;
    var _stor: { [name: string]: IControlCreater } = {};
    export function register(name: string, creator: IControlCreater) {
        _stor[name] = creator;
    }
    export function create(name: string, dom: Node, currentScop: bind.Scop, parentScop: bind.Scop, parentControl: UI.JControl, controller: bind.Controller) {
        var c = _stor[name];
        if (c) return c(name, dom, currentScop, parentScop, parentControl, controller);
    }
}

export module ScopicCommand {
    interface scmd<T> {
        callback: basic.ITBindable<(n: string, dom: HTMLElement, scop: bind.Scop, param: T) => void>;
        Param: T;
    }
    interface cb { [i: string]:scmd<any> }
    var store: cb = {};
    var i= 0;
    export function Register<T>(callback: basic.ITBindable<(n:string,dom: HTMLElement, scop: bind.Scop, param: T) => void>,param?:T,name?:string): string {
        var n = name ? name : '@' + ++i;
        store[n] = {
            callback: callback, Param: param
        };
        return n;
    }
    export function Call(n: string, dom: Node, scop: bind.Scop) {
        var cb = store[n];
        return cb ? cb.callback.Invoke.call(cb.callback.Owner, n, dom, scop, cb.Param) : void 0;
    }
    export function Delete(n: string) {
        delete store[n];
    }
    export function contains(n: string) {
        return store[n] != null;
    }

}

export module Api {
    var $freeze = Object.freeze;
    var _apis: apiGarbage = {};
    export interface IApiTrigger {
        Name: string;
        Filter: (cmdCallback: IApiCallback, params: any) => boolean;
        CheckAccess: (t: IApiTrigger) => boolean;
        Params?: any;
    }

    export interface IApiCallback {
        hash?: string;
        Name: string;
        DoApiCallback: (trigger: IApiTrigger, callback: IApiCallback, params: IApiParam) => void;
        Owner?: any;
        Params?: any;
    }
    export function RegisterApiCallback(api: IApiCallback) {
        if (typeof api.Name !== 'string') return false;
        if (api.DoApiCallback instanceof Function === false) return false;
        var c = _apis[api.Name];
        if (c == null) {
            c = { Callback: [api], Trigger: undefined };
            Object.defineProperty(_apis, api.Name, { value: c, configurable: false, enumerable: false, writable: false });
        } else {
            if (c.Callback.indexOf(api) !== -1) return;
            c.Callback.push(api);
        }
        $freeze(api);
    }
    export function RegisterTrigger(api: IApiTrigger) {
        if (typeof api.Name !== 'string') return false;
        if (api.Filter && !(api.Filter instanceof Function)) return false;
        var c = _apis[api.Name];
        if (c == null) {
            c = { Callback: [], Trigger: api };
            _apis[api.Name] = c;
            $freeze(c);
        } else if (c.Trigger == null) {
            c.Trigger = api;
            $freeze(c);
        } else throw "This Command Exist";
        $freeze(api);
        
    }
    export function RiseApi(apiName: string, params: IApiParam) {
        var api = _apis[apiName];
        if (!api) throw "Cmd Is Not Exist";
        var t = api.Trigger;
        if (t) {
            if (t.CheckAccess) if (!t.CheckAccess(t)) throw "Access denied";
            var f = t.Filter;
        }

        var cs = api.Callback;
        for (var i = 0, l = cs.length; i < l; i++) {
            var c = cs[i];
            if (f && !t.Filter(c, params)) continue;
            try {
                c.DoApiCallback(t, c, params);
            } catch (e) { }
        }
    }
    export interface IApiParam {
        data: any;
        callback?(p: IApiParam, args);
    }
    export interface IApi {
        Trigger: IApiTrigger;
        Callback: IApiCallback[]
    }
    export interface apiGarbage {
        [name: string]: IApi;
    }

}

export module encoding {
    interface IDRef {
        val: any;
        paths?: IPath<any, any>[];
        setted?: boolean

    }
    export interface IPath<OB, DP> {
        Owner: OB;
        Property: DP;
        Set<T>(value: T): T;
        executed: boolean;
    }
    export class BPath implements IPath<bind.DObject, bind.DProperty<any, any>> {
        executed: boolean;
        public Set(value: any) {
            (this.Owner as any).set(this.Property, value);
            this.executed = true;
            return value;
        }
        constructor(public Owner: bind.DObject, public Property: bind.DProperty<any, any>) {

        }
    }
    export class Path implements IPath<any | bind.DObject, string | bind.DProperty<any, any>> {
        executed: boolean;
        public Set(value: any) {
            if (this.Property instanceof bind.DProperty)
                (this.Owner as any).set(this.Property, value);
            else
                this.Owner[this.Property as string] = value;
            this.executed = true;
            return value;
        }
        constructor(public Owner: any | bind.DObject, public Property: string | bind.DProperty<any, any>) {

        }
    }
    export class LPath implements IPath<collection.List<any>, number> {
        executed: boolean;
        public Set(value: any) {
            if (!this.Owner.Insert(this.Property, value))
                this.Owner.Add(value);
            this.executed = true;
            return value;
        }
        constructor(public Owner: collection.List<any>, public Property: number) {

        }
    }

    export interface Serialization<T> {
        FromJson(json, context: SerializationContext, ref: IRef): T;
        ToJson(data: T, context: SerializationContext, indexer: encoding.IIndexer);
    }
    export interface IRef {
        __ref__: number;
    }
    export interface IIndexer {
        ref: IRef;
        json: any;
        valid: boolean;
    }
    var _sstore = new collection.Dictionary<Function, Serialization<any>>("SerializationContext", false);
    export class SerializationContext {
        public static GlobalContext = new SerializationContext(true);
        private _store;
        private _ext: SerializationContext[] = [];
        public RequireNew: (json: any, type: Function | reflection.GenericType) => boolean;
        public Dispose() {
            this.reset();
            this._ext = null;
            this._store = null;
            this.cnt = null;
            this.indexer = null;
            this.refs = null;
        }
        constructor(isDefault: boolean) {
            if (isDefault) this._store = _sstore;
            else this._store = new collection.Dictionary<Function, Serialization<any>>("SerializationContext", false);
        }
        public Register<T>(type: Function, ser: Serialization<T>) {
            this._store.Set(type, ser);
        }
        public Append(con: SerializationContext) {
            this._ext.push(con);
        }
        public Get(type: Function): Serialization<any> {
            var v = this._store.Get(type);
            if (v) return v;
            var c = this._ext;
            for (var i = c.length - 1; i >= 0; i--)
                if ((v = c[i].Get(type)) != null) return v;
            return null;
        }
        private indexer = new collection.Dictionary<any, IIndexer>("Indexer", true);
        private refs: IDRef[] = [];
        public get(ref: number, path: IPath<any, any>) {
            var dref = this.refs[ref];
            if (dref) {
                if (dref.setted)
                    return path ? path.Set(this.refs[ref].val) : this.refs[ref].val;
                else
                    if (path) {
                        if (!dref.paths) dref.paths = [path];
                        else dref.paths.push(path);
                    }
                    else throw "entry Point not Found";
            }
            else {
                var i: IDRef = { val: undefined, paths: [path] };
                this.refs[ref] = i;

            }
            return undefined;
        }
        public set(ref: number, obj) {
            var x = this.refs[ref];
            if (x) {
                x.val = obj;
                x.setted = true;
                if (x.paths)
                    for (var i = 0; i < x.paths.length; i++)
                        x.paths[i].Set(obj);
            } else
                this.refs[ref] = { val: obj, setted: true };
        }

        private cnt: number = 0;
        public getJson(obj): IIndexer {
            var l = this.indexer.Get(obj);
            if (l == null) {
                var ref = { __ref__: ++this.cnt };
                var json = { '@ref': ref };
                this.indexer.Set(obj, l = { ref: ref, json: json, valid: false });
                if (obj instanceof bind.DObject) {
                    var type = context.NameOf(obj.constructor);
                    if (type != null) json['__type__'] = type;
                }
            }
            return l;
        }
        public reset() {
            this.indexer.Clear();
            this.cnt = 0;
            this.refs.length = 0;
            return this;
        }
        public static getType(type: Function) {
            while (true) {
                if (type instanceof reflection.DelayedType)
                    type = (type as any as reflection.DelayedType).Type;
                else if (type instanceof reflection.GenericType)
                    type = (type as any as reflection.GenericType).Constructor;
                else return type;
            }
        }

        public FromJson(json: any, type: Function | reflection.GenericType, path: IPath<any, any>) {
            if (json == null) return path ? path.Set(json) : json;
            if (type instanceof reflection.DelayedType)
                type = (type as any as reflection.DelayedType).Type;
            if (type instanceof reflection.GenericType)
                type = (type as any as reflection.GenericType).Constructor;
            if (type === String || type === Number || type === Boolean)
                return path ? path.Set(json) : json;
            else if (type === Date)
                return path.Set(new Date(json));
            if (typeof json.__ref__ == 'number')
                return this.get(json.__ref__, path);
            var obj;
            var ref = json['@ref'] as IRef;
            delete json['@ref'];

            if (reflection.IsInstanceOf(type, bind.DObject)) {
                if ((type as any).CreateFromJson)
                    obj = (type as any).CreateFromJson(json, type, this.RequireNew ? this.RequireNew(json, type) : false);

                if (obj == null)
                    obj = new (type as any)() as bind.DObject;

                if (ref) this.set(ref.__ref__, obj);
                obj = (obj as bind.DObject).FromJson(json, this);
            }
            else {
                if (type.prototype != null && type.prototype.hasOwnProperty('fromJson'))
                    obj = type.prototype.fromJson(json, context, ref);
                else {

                    var c = this.Get(type as any);
                    obj = c != null ? c.FromJson(json, this, ref) : json;

                } if (ref) this.set(ref.__ref__, obj);
            }
            return path ? path.Set(obj) : obj;
        }

        public ToJson(obj: any) {
            if (obj === null) return null;
            switch (typeof obj) {
                case 'string':
                case 'number':
                case 'boolean':
                case 'undefined':
                    return obj;
                case 'function':
                    return (obj as Function).toString();
                default:
                    var ref_json: encoding.IIndexer = this.getJson(obj);
                    if (ref_json.valid) return ref_json.ref;
                    if (obj === Object) return this._toJson(obj, ref_json);
                    else if (obj instanceof bind.DObject)
                        return (obj as bind.DObject).ToJson(this, ref_json);
                    else {
                        var c = this.Get(obj.constructor);
                        if (c) {
                            return c.ToJson(obj, this, ref_json);
                        }
                        else return this._toJson(obj, ref_json);
                    }
            }
        }
        private _toJson(obj, ret: IIndexer) {
            ret.valid = true;
            for (var i in obj)
                ret[i] = this.ToJson(obj[i]);
            return ret;
        }
        public toString() {
            JSON.stringify(this);
        }
    }
    declare var TextDecoder;
    export class UTF8 {

        static UTF8Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf8') : undefined;
        static ToArray(str: string, outU8Array: (Uint8Array | number[]), outIdx: number, maxBytesToWrite: number) {
            if (!(maxBytesToWrite > 0)) // Parameter maxBytesToWrite is not optional. Negative values, 0, null, undefined and false each don't write out any bytes.
                return 0;

            var startIdx = outIdx;
            var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
            for (var i = 0; i < str.length; ++i) {
                // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
                // See http://unicode.org/faq/utf_bom.html#utf16-3
                // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
                var u = str.charCodeAt(i); // possibly a lead surrogate
                if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
                if (u <= 0x7F) {
                    if (outIdx >= endIdx) break;
                    outU8Array[outIdx++] = u;
                } else if (u <= 0x7FF) {
                    if (outIdx + 1 >= endIdx) break;
                    outU8Array[outIdx++] = 0xC0 | (u >> 6);
                    outU8Array[outIdx++] = 0x80 | (u & 63);
                } else if (u <= 0xFFFF) {
                    if (outIdx + 2 >= endIdx) break;
                    outU8Array[outIdx++] = 0xE0 | (u >> 12);
                    outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
                    outU8Array[outIdx++] = 0x80 | (u & 63);
                } else if (u <= 0x1FFFFF) {
                    if (outIdx + 3 >= endIdx) break;
                    outU8Array[outIdx++] = 0xF0 | (u >> 18);
                    outU8Array[outIdx++] = 0x80 | ((u >> 12) & 63);
                    outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
                    outU8Array[outIdx++] = 0x80 | (u & 63);
                } else if (u <= 0x3FFFFFF) {
                    if (outIdx + 4 >= endIdx) break;
                    outU8Array[outIdx++] = 0xF8 | (u >> 24);
                    outU8Array[outIdx++] = 0x80 | ((u >> 18) & 63);
                    outU8Array[outIdx++] = 0x80 | ((u >> 12) & 63);
                    outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
                    outU8Array[outIdx++] = 0x80 | (u & 63);
                } else {
                    if (outIdx + 5 >= endIdx) break;
                    outU8Array[outIdx++] = 0xFC | (u >> 30);
                    outU8Array[outIdx++] = 0x80 | ((u >> 24) & 63);
                    outU8Array[outIdx++] = 0x80 | ((u >> 18) & 63);
                    outU8Array[outIdx++] = 0x80 | ((u >> 12) & 63);
                    outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
                    outU8Array[outIdx++] = 0x80 | (u & 63);
                }
            }
            // Null-terminate the pointer to the buffer.
            outU8Array[outIdx] = 0;
            return outIdx - startIdx;
        }
        static lengthOf(str: string) {
            var len = 0;
            for (var i = 0; i < str.length; ++i) {
                var u = str.charCodeAt(i); // possibly a lead surrogate
                if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
                if (u <= 0x7F) {
                    ++len;
                } else if (u <= 0x7FF) {
                    len += 2;
                } else if (u <= 0xFFFF) {
                    len += 3;
                } else if (u <= 0x1FFFFF) {
                    len += 4;
                } else if (u <= 0x3FFFFFF) {
                    len += 5;
                } else {
                    len += 6;
                }
            }
            return len;
        }
        static ToString(u8Array: Uint8Array, idx: number) {
            var endPtr = idx;
            // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
            // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
            while (u8Array[endPtr])++endPtr;

            if (endPtr - idx > 16 && u8Array.subarray && UTF8.UTF8Decoder) {
                return UTF8.UTF8Decoder.decode(u8Array.subarray(idx, endPtr));
            } else {
                var u0, u1, u2, u3, u4, u5;

                var str = '';
                while (1) {
                    // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
                    u0 = u8Array[idx++];
                    if (!u0) return str;
                    if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
                    u1 = u8Array[idx++] & 63;
                    if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
                    u2 = u8Array[idx++] & 63;
                    if ((u0 & 0xF0) == 0xE0) {
                        u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
                    } else {
                        u3 = u8Array[idx++] & 63;
                        if ((u0 & 0xF8) == 0xF0) {
                            u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | u3;
                        } else {
                            u4 = u8Array[idx++] & 63;
                            if ((u0 & 0xFC) == 0xF8) {
                                u0 = ((u0 & 3) << 24) | (u1 << 18) | (u2 << 12) | (u3 << 6) | u4;
                            } else {
                                u5 = u8Array[idx++] & 63;
                                u0 = ((u0 & 1) << 30) | (u1 << 24) | (u2 << 18) | (u3 << 12) | (u4 << 6) | u5;
                            }
                        }
                    }
                    if (u0 < 0x10000) {
                        str += String.fromCharCode(u0);
                    } else {
                        var ch = u0 - 0x10000;
                        str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
                    }
                }
            }
        }
        static GetBytes(str: string) {
            var l = this.lengthOf(str) + 1;
            var buffer = new Array(l);
            this.ToArray(str, buffer, 0, l);
            return buffer;
        }
    }
    export class UTF16 {
        static UTF16Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-16le') : undefined;
        static ToString(HEAP16: Uint16Array, ptr: number) {
            console.assert(ptr % 2 == 0, 'Pointer passed to UTF16ToString must be aligned to two bytes!');
            var endPtr = ptr;
            // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
            // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
            var idx = endPtr >> 1;
            while (HEAP16[idx])++idx;
            endPtr = idx << 1;

            if (endPtr - ptr > 32 && UTF16.UTF16Decoder) {
                return UTF16.UTF16Decoder.decode(new Uint8Array(HEAP16, ptr, endPtr - ptr + 1));
            } else {
                var i = 0;

                var str = '';
                while (1) {
                    var codeUnit = HEAP16[(((ptr) + (i * 2)) >> 1)];
                    if (codeUnit == 0) return str;
                    ++i;
                    // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
                    str += String.fromCharCode(codeUnit);
                }
            }
        }


        static ToArray(str: string, HEAP16: Uint16Array, outPtr: number, maxBytesToWrite: number) {
            console.assert(outPtr % 2 == 0, 'Pointer passed to stringToUTF16 must be aligned to two bytes!');
            console.assert(typeof maxBytesToWrite == 'number', 'stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
            // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
            if (maxBytesToWrite === undefined) {
                maxBytesToWrite = 0x7FFFFFFF;
            }
            if (maxBytesToWrite < 2) return 0;
            maxBytesToWrite -= 2; // Null terminator.
            var startPtr = outPtr;
            var numCharsToWrite = (maxBytesToWrite < str.length * 2) ? (maxBytesToWrite / 2) : str.length;
            for (var i = 0; i < numCharsToWrite; ++i) {
                // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
                var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
                HEAP16[((outPtr) >> 1)] = codeUnit;
                outPtr += 2;
            }
            // Null-terminate the pointer to the HEAP.
            HEAP16[((outPtr) >> 1)] = 0;
            return outPtr - startPtr;
        }

        static lengthBytesUTF16(str: string) {
            return str.length * 2;
        }
    }
    export class UTF32 {
        static UTF32ToString(HEAP32: Uint32Array, ptr: number) {
            console.assert(ptr % 4 == 0, 'Pointer passed to UTF32ToString must be aligned to four bytes!');
            var i = 0;

            var str = '';
            while (1) {
                var utf32 = HEAP32[(((ptr) + (i * 4)) >> 2)];
                if (utf32 == 0)
                    return str;
                ++i;
                // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
                // See http://unicode.org/faq/utf_bom.html#utf16-3
                if (utf32 >= 0x10000) {
                    var ch = utf32 - 0x10000;
                    str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
                } else {
                    str += String.fromCharCode(utf32);
                }
            }
        }
        /**@description  
         Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
         null-terminated and encoded in UTF32 form. The copy will require at most str.length*4+4 bytes of space in the HEAP.
         Use the function lengthBytesUTF32() to compute the exact number of bytes (excluding null terminator) that this function will write.
         Parameters:
           str: the Javascript string to copy.
           outPtr: Byte address in Emscripten HEAP where to write the string to.
           maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
                            terminator, i.e. if maxBytesToWrite=4, only the null terminator will be written and nothing else.
                            maxBytesToWrite<4 does not write any bytes to the output, not even the null terminator.
         Returns the number of bytes written, EXCLUDING the null terminator.
        */
        static stringToUTF32(str: string, HEAP32: Uint32Array, outPtr: number, maxBytesToWrite: number) {
            console.assert(outPtr % 4 == 0, 'Pointer passed to stringToUTF32 must be aligned to four bytes!');
            console.assert(typeof maxBytesToWrite == 'number', 'stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
            // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
            if (maxBytesToWrite === undefined) {
                maxBytesToWrite = 0x7FFFFFFF;
            }
            if (maxBytesToWrite < 4) return 0;
            var startPtr = outPtr;
            var endPtr = startPtr + maxBytesToWrite - 4;
            for (var i = 0; i < str.length; ++i) {
                // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
                // See http://unicode.org/faq/utf_bom.html#utf16-3
                var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
                if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
                    var trailSurrogate = str.charCodeAt(++i);
                    codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
                }
                HEAP32[((outPtr) >> 2)] = codeUnit;
                outPtr += 4;
                if (outPtr + 4 > endPtr) break;
            }
            // Null-terminate the pointer to the HEAP.
            HEAP32[((outPtr) >> 2)] = 0;
            return outPtr - startPtr;
        }

        // Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.
        static lengthBytesUTF32(str: string) {
            var len = 0;
            for (var i = 0; i < str.length; ++i) {
                // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
                // See http://unicode.org/faq/utf_bom.html#utf16-3
                var codeUnit = str.charCodeAt(i);
                if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF)++i; // possibly a lead surrogate, so skip over the tail surrogate.
                len += 4;
            }

            return len;
        }


    }

    export module Utf8 {
        const root = () => {
        };
        const stringFromCharCode = String.fromCharCode;

        // Taken from https://mths.be/punycode
        export function ucs2decode(string) {
            const output = [];
            let counter = 0;
            const length = string.length;
            let value;
            let extra;
            while (counter < length) {
                value = string.charCodeAt(counter++);
                if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
                    // high surrogate, and there is a next character
                    extra = string.charCodeAt(counter++);
                    if ((extra & 0xFC00) == 0xDC00) { // low surrogate
                        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
                    } else {
                        // unmatched surrogate; only append this code unit, in case the next
                        // code unit is the high surrogate of a surrogate pair
                        output.push(value);
                        counter--;
                    }
                } else {
                    output.push(value);
                }
            }
            return output;
        }

        // Taken from https://mths.be/punycode
        export function ucs2encode(array) {
            const length = array.length;
            let index = -1;
            let value;
            let output = '';
            while (++index < length) {
                value = array[index];
                if (value > 0xFFFF) {
                    value -= 0x10000;
                    output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
                    value = 0xDC00 | value & 0x3FF;
                }
                output += stringFromCharCode(value);
            }
            return output;
        }

        function checkScalarValue(codePoint) {
            if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
                throw Error(
                    `Lone surrogate U+${codePoint.toString(16).toUpperCase()} is not a scalar value`
                );
            }
        }
        /*--------------------------------------------------------------------------*/

        function createByte(codePoint, shift) {
            return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
        }

        function encodeCodePoint(codePoint) {
            if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
                return stringFromCharCode(codePoint);
            }
            let symbol = '';
            if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
                symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
            }
            else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
                checkScalarValue(codePoint);
                symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
                symbol += createByte(codePoint, 6);
            }
            else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
                symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
                symbol += createByte(codePoint, 12);
                symbol += createByte(codePoint, 6);
            }
            symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
            return symbol;
        }

        export function utf8encode(string) {
            const codePoints = ucs2decode(string);
            const length = codePoints.length;
            let index = -1;
            let codePoint;
            let byteString = '';
            while (++index < length) {
                codePoint = codePoints[index];
                byteString += encodeCodePoint(codePoint);
            }
            return byteString;
        }

        /*--------------------------------------------------------------------------*/

        function readContinuationByte() {
            if (byteIndex >= byteCount) {
                throw Error('Invalid byte index');
            }

            const continuationByte = byteArray[byteIndex] & 0xFF;
            byteIndex++;

            if ((continuationByte & 0xC0) == 0x80) {
                return continuationByte & 0x3F;
            }

            // If we end up here, it’s not a continuation byte
            throw Error('Invalid continuation byte');
        }

        function decodeSymbol() {
            let byte1;
            let byte2;
            let byte3;
            let byte4;
            let codePoint;

            if (byteIndex > byteCount) {
                throw Error('Invalid byte index');
            }

            if (byteIndex == byteCount) {
                return false;
            }

            // Read first byte
            byte1 = byteArray[byteIndex] & 0xFF;
            byteIndex++;

            // 1-byte sequence (no continuation bytes)
            if ((byte1 & 0x80) == 0) {
                return byte1;
            }

            // 2-byte sequence
            if ((byte1 & 0xE0) == 0xC0) {
                byte2 = readContinuationByte();
                codePoint = ((byte1 & 0x1F) << 6) | byte2;
                if (codePoint >= 0x80) {
                    return codePoint;
                } else {
                    throw Error('Invalid continuation byte');
                }
            }

            // 3-byte sequence (may include unpaired surrogates)
            if ((byte1 & 0xF0) == 0xE0) {
                byte2 = readContinuationByte();
                byte3 = readContinuationByte();
                codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
                if (codePoint >= 0x0800) {
                    checkScalarValue(codePoint);
                    return codePoint;
                } else {
                    throw Error('Invalid continuation byte');
                }
            }

            // 4-byte sequence
            if ((byte1 & 0xF8) == 0xF0) {
                byte2 = readContinuationByte();
                byte3 = readContinuationByte();
                byte4 = readContinuationByte();
                codePoint = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0C) |
                    (byte3 << 0x06) | byte4;
                if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
                    return codePoint;
                }
            }

            throw Error('Invalid UTF-8 detected');
        }

        var byteArray;
        var byteCount;
        var byteIndex;
        export function utf8decode(byteString) {
            byteArray = ucs2decode(byteString);
            byteCount = byteArray.length;
            byteIndex = 0;
            const codePoints = [];
            let tmp;
            while ((tmp = decodeSymbol()) !== false) {
                codePoints.push(tmp);
            }
            return ucs2encode(codePoints);
        }

        /*--------------------------------------------------------------------------*/

        export var version = '3.0.0';
        export var encode = utf8encode;
        export var decode = utf8decode;
    }
}


export module net {
    export class Header {
        private _key: string;

        public get key(): string {
            return this._key;
        }

        private _value: string;

        public get value(): string {
            return this._value;
        }

        constructor(key, value) {
            this._key = key;
            this._value = value;
        }
    }

    export enum ResponseType {
        json,
        Document,
        Text,
        ArrayBuffer,
        Blob
    }

    export enum WebRequestMethod {
        Get,
        Post,
        Head,
        Put,
        Delete,
        Options,
        Connect,
        Create,
        Open,
        Close,
        Validate,
        FastValidate,
        Print,
        UPDATE,
        SUPDATE,
    }

    export class WebRequest implements basic.IDisposable {
        private http: XMLHttpRequest = new XMLHttpRequest();
        private _responseType: ResponseType = null;

        public getResponseType(): ResponseType {
            return this._responseType || ResponseType.Text;
        }

        public setResponseType(v: ResponseType): ResponseType {
            this._responseType = v;
            return v;
        }
        public set Crypto(v: basic.ICrypto) {
            this.crypt = v;
        }

        private key: Object = new Object();
        private downloadDelegate: basic.IDelegate;

        constructor(public crypt?: basic.ICrypto) {
            this.OnComplete = new bind.EventListener<(e: WebRequest) => void>(this.key);
            this.http.addEventListener('loadend',
                this.downloadDelegate = new basic.Delegate(this,
                    this._onprogress,
                    (p) => {
                        p.Owner.http.removeEventListener('loadend', p);
                        p.Owner.http.removeEventListener('error', p);
                    }));
            this.crypt = new crypto.AesCBC(key.slice(0));
            this.http.addEventListener('error', this.downloadDelegate);

        }

        Dispose() {
            /*
            this.OnInitialized.Dispose();
            this.OnSetup.Dispose();
            this.OnSended.Dispose();
            this.OnProgress.Dispose();*/
            this.OnComplete.Dispose();
            this.downloadDelegate.Dispose();
            this.key = null;
            this.http = null;
            /*
            this.OnInitialized = null;
            this.OnSetup = null;
            this.OnSended = null;
            this.OnProgress = null;*/
            this.OnComplete = null;
            this.downloadDelegate = null;
        }

        private _onprogress(e) {
            var cur: bind.EventListener<any> = null;
            switch (this.http.readyState) {
                //case 0:
                //    cur = this.OnInitialized;
                //    break;
                //case 1:
                //    cur = this.OnSetup;
                //    break;
                //case 2:
                //    cur = this.OnSended;
                //    break;
                //case 3:
                //    cur = this.OnProgress;
                //    break;
                case 4:
                    cur = this.OnComplete;
                    break;
            }

            if (cur) {
                var t = this;
                cur.Invoke(this.key, [t]); // function (dlg) { dlg(t); });
            }
        }

        public get IsSuccess() { return this.http.status == 200 && this.http.readyState == 4; }

        public Download(req: IRequestUrl, data: any) {
            this.http.open(WebRequestMethod[req.Method], req.Url, true);
            this.http.responseType = <any>ResponseType[this.getResponseType()].toLowerCase();
            if (req.Method === WebRequestMethod.Get)
                this.http.send();
            else this.http.send(JSON.stringify(data));
        }
        
		public Download2(c: Request) {
			if (c.url.beforRequest)
				if (!c.url.beforRequest(c.url)) {
					
						var cur = this.OnComplete;
						if (cur) {
							var t = this;
							cur.Invoke(this.key, [t]); // function (dlg) { dlg(t); });
						}
                }
            var req = c.url;
            var url = req.Url;
            if (c.params) {
                var s = url.lastIndexOf('?') != -1;
                for (var i in c.params)
                    url += (!s ? ((s = true) && '?') : '&') + (encodeURI(i) + '=' + encodeURI(String(c.params[i])));
            }
            this.http.open(WebRequestMethod[req.Method], url, true);
            this.http.setRequestHeader('Access-Control-Allow-Origin', 'true');
            this.http.responseType = <any>ResponseType[this.getResponseType()].toLowerCase();
            if (req.HasBody===false || req.Method === WebRequestMethod.Get )
                this.http.send();
            else {
                if (c.data)
                    try {
                        //var x = btoa(c.data.OutputData());
                        //var bytes = crypto.string2bytes(x);
                        var bytes = encoding.Utf8.ucs2decode(c.data.OutputData());
                        if (this.crypt)
                            bytes = this.crypt.Encrypt(bytes) as any;
                        this.http.send(new Uint8Array(bytes));
                    } catch (err) {
                    }
                else this.http.send();
            }
        }

        GetFileSize(url, callback) {
            this.http.open("HEAD", url, true);
            this.http.onreadystatechange = function () {
                if (this.readyState == this.DONE) {
                    if (callback)
                        callback(parseInt(this.getResponseHeader("Content-Length")));
                }
            };
            this.http.send();
        }

        GetHeader(url, callback) {
            this.http.open("HEAD", url, true);
            this.http.onreadystatechange = function () {
                if (this.readyState == this.DONE) {
                    if (callback) {

                        var h = this.getAllResponseHeaders().split('\r\n');
                        var t: Header[] = [];
                        for (var i = h.length - 1; i >= 0; i--) {
                            var p: string = h[i];
                            if (p) {
                                var vk = p.split(': ');
                                t.push(new Header(vk[0], vk[1]));
                            }
                        }
                        //Object.freeze(t);
                        callback(t);
                    }
                }
            };
            this.http.send();
        }

        //public OnInitialized: bind.EventListener<(e: WebRequest) => void>; //0
        //public OnSetup: bind.EventListener<(e: WebRequest) => void>; //1
        //public OnSended: bind.EventListener<(e: WebRequest) => void>; //2
        //public OnProgress: bind.EventListener<(e: WebRequest) => void>; //3
        public OnComplete: bind.EventListener<(e: WebRequest) => void>; //4

        public get Response() {
            return this.http.response;
        }

    }
    export abstract class RequestParams<T, S>
    {
        public IsSuccess: boolean = null;

        constructor(protected callback: (sender: S, result: any) => void, public data: T, public isPrivate?: boolean) {
            if (isPrivate == void 0) this.isPrivate = false;
        }

        public Callback(sender: S, result: any) {
            if (this.callback)
                this.callback(sender, result);
        }
        public abstract OutputData(): string;
        public InputData: string;
    }
    export interface RequestMethodShema {
        Method: WebRequestMethod;
        Name: string;
        SendData: boolean;
        ParamsFormat?: basic.StringCompile;
    }
    export interface IRequestParams{
        [name: string]: string|number|boolean;
    }
    export class Request {        
        public fail: boolean = undefined;
        constructor(public url: IRequestUrl, public data: RequestParams<any, QueeDownloader>, public params: IRequestParams) {
        }
    }

    export class QueeDownloader {
        private webr: net.WebRequest;

        public get Request(): net.WebRequest { return this.webr; }

        private quee: Request[] = [];
        private isRunning: boolean = false;
        private isDownloading = false;

        public set Crypto(v: basic.ICrypto) {
            this.webr.Crypto = v;
        }

        constructor(public crypt: basic.ICrypto) {
            this.webr = new net.WebRequest(crypt);
            this.webr.setResponseType(net.ResponseType.Text);
            this.webr.OnComplete.Add(this.DownloadComplete.bind(this), "DCT");
        }

        public current: Request;

        private DownloadComplete(xmlRequest) {

            this.isDownloading = false;
            var x = this.webr.IsSuccess ? this.OnSuccess : this.OnFail;            
            try {
                var ip = true;
                var th = this;
                if (th.current.data instanceof RequestParams) {
                    try {
                        var c = th.current.data;
                        c.IsSuccess = th.webr.IsSuccess;
                        c.Callback(this, this.webr);
                    } catch (e) {
                    }
                    ip = !(c.isPrivate);
                }
                if (ip)
                    x.Invok(1, function (arg: (d: QueeDownloader, data: any) => void) { arg(th, th.current.data); });
            } catch (error) {
            }
            this.Next();
        }

        public Push(url: IRequestUrl, data: RequestParams<any, QueeDownloader>,params:IRequestParams) {
            url.Url = (url.Url as any).startsWith('http://') ? url.Url : basic.host + url.Url;
            this.quee.push(new Request(url, data, params));
            if (!this.isRunning) this.Start();
        }

        public Insert(dcall: Request) {
            this.quee.push(dcall);
            if (!this.isRunning) this.Start();
        }

        public Start() {
            if (this.isDownloading) return;
            this.isRunning = true;
            this.Next();
        }

        Next() {
            if (0 == this.quee.length) {
                this.isRunning = false;
                this.isDownloading = false;
                var ___this = this;
                this.OnFinish.Invoke(1, [___this, ___this.current.data]);
                return;
            }
            this.webr.Download2(this.current = this.quee.shift());
            this.isDownloading = true;
        }

        public Restart() {
            this.isDownloading = false;
            this.Start();
        }

        public OnSuccess: bind.EventListener<any> = new bind.EventListener<any>(1);
        public OnFail: bind.EventListener<any> = new bind.EventListener<any>(1);
        public OnFinish: bind.EventListener<any> = new bind.EventListener<any>(1);
    }
}


export module net{

    export interface IRequestHeader {
        [key: string]: string;
    }

    export interface IRequestUrl {
        beforRequest?: (req: net.IRequestUrl) => void;
        Url: string;
        Method?: net.WebRequestMethod;
        Header?: IRequestHeader;
        HasBody?: boolean;
    }

    export class RequestUrl implements IRequestUrl {
		beforRequest: (req: net.IRequestUrl) => void;
        public get Url() {
            if (this.context)
                return this.context.GetPath(this._url);
            return this._url;
        }
		public set Url(v: string) { this._url = v; }

        constructor(private _url: string, private context: basic.IContext,
            public Header?: IRequestHeader, public Method?: net.WebRequestMethod, public HasBody?:boolean) {
            if (Header == null) Header = {};
            if (Method == undefined) this.Method = net.WebRequestMethod.Get;
            if (HasBody == undefined) HasBody = true;
        }
    }
}

export namespace basic {
    var _events = new collection.Dictionary<DomEventHandler<any, any>, EventTarget>("ethandler");
    export class DomEventHandler<T extends Event, P> implements IEventHandler, EventListenerObject {
        Started: boolean = false;
        constructor(public dom: Element, public event: string,private owner:any, private handle: (eh: DomEventHandler<T, P>, ev: T, param: P) => void, private param?: P) {
            _events.Set(this, dom);
        }
        Start() {
            if (this.Started === false) {                
                this.Started = true;
                this.dom.addEventListener(this.event, this);
            }
        }
        Pause() {
            if (this.Started === true) {
                this.Started = false;
                this.dom.removeEventListener(this.event, this);
            }
        }
        Dispose() {
            if (this.Started === undefined) return;
            this.Pause();
            _events.Remove(this);
            this.dom = undefined;
            this.event = undefined;
            this.handle = undefined;
            this.Started = undefined;
            this.param = undefined;
        }
        Reset() {
            this.Pause();
            this.Start();
        }
        handleEvent(evt: Event): void {
            this.handle.call(this.owner, this, evt, this.param);
            //this.handle(this, evt as T, this.param);
        }
        public static Dispose(dom: EventTarget, event?: string) {
            let i;
            if (event == null)
                for (let i = 0, ks = _events.RemoveAllValues(dom); i < ks.length; i++)
                    ks[i].Dispose();
            else
                do
                    if ((i = _events.IndexOfValue(dom, i)) === -1) break;
                    else _events.RemoveAt(i).Key.Dispose();
                while (true);
        }
    }

}


export module crypto {

    var Sbox = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22];
    var ShiftRowTab = [0, 5, 10, 15, 4, 9, 14, 3, 8, 13, 2, 7, 12, 1, 6, 11];
    var ShiftRowTab_Inv: number[];
    var Sbox_Inv: number[], xtime: number[];

    export function string2bytes_16(a: string): Uint16Array {
        var c = new Uint16Array(a.length);
        for (var d = 0; d < a.length; d++)
            c[d] = a.charCodeAt(d);
        return c;
    }

    export function bytes2string_16(a: Uint16Array) {
        for (var c = "", d = 0; d < a.length; d++)
            c += String.fromCharCode(a[d]);
        return c;
    }


    export function string2bytes(a: string | number[]) {
        if (a instanceof Array) return a.slice(0);
        var c = new Array(a.length);
        for (var d = 0; d < a.length; d++) {
            var x = (a as string).charCodeAt(d);
            if (x > 255)
                throw "Invalid ASCII Charactere";
            c[d] = x;
        }
        return c;
    }

    export function bytes2string(a) {
        for (var c = "", d = 0; d < a.length; d++)
            c += String.fromCharCode(a[d]);
        return c
    }

    ;
    Sbox_Inv = Array(256);
    for (var b = 0; b < 256; b++)
        Sbox_Inv[Sbox[b]] = b;
    ShiftRowTab_Inv = Array(16);
    for (b = 0; b < 16; b++)
        ShiftRowTab_Inv[ShiftRowTab[b]] = b;
    xtime = Array(256);
    for (b = 0; b < 128; b++)
        xtime[b] = b << 1,
            xtime[128 + b] = b << 1 ^ 27;


    export class Aes implements basic.ICrypto {

        protected Key: number[];
        constructor(key: string | number[] | Uint8Array) {
            if ('string' === typeof (key))
                this.Key = this.InitKey(string2bytes(key));
            else if (key instanceof Array)
                this.Key = this.InitKey(key);
            else throw "Invalid Key";
        }
        InitKey(key: number[]): number[] {
            return key;
        }

        static ExpandKey(b: number[]) {
            var c = b.length, d, e = 1;
            var c1 = c;
            if (c <= 16) { c1 = 16; d = 176; }
            else if (c <= 24) { c1 = 24; d = 208; }
            else if (c <= 32) { c1 = 32; d = 240; }
            else throw "my.ExpandKey: Only key lengths of 16, 24 or 32 bytes allowed!"
            b.length = c1;
            for (; c < c1; c++) {
                b[c] = 0;
            }

            for (var g = c; g < d; g += 4) {
                var h = b.slice(g - 4, g);
                if (g % c == 0) {
                    if (h = [Sbox[h[1]] ^ e, Sbox[h[2]], Sbox[h[3]], Sbox[h[0]]], (e <<= 1) >= 256)
                        e ^= 283;
                } else
                    c > 24 && g % c == 16 && (h = [Sbox[h[0]], Sbox[h[1]], Sbox[h[2]], Sbox[h[3]]]);
                for (var f = 0; f < 4; f++)
                    b[g + f] = b[g + f - c] ^ h[f]
            }
        }

        Encrypt(data: number[]): number[] {
            ;
            var Key = this.Key;
            var d = Key.length;
            Aes.AddRoundKey(data, Key.slice(0, 16));
            for (var e = 16; e < d - 16; e += 16)
                Aes.SubBytes(data, Sbox),
                    Aes.ShiftRows(data, ShiftRowTab),
                    Aes.MixColumns(data),
                    Aes.AddRoundKey(data, Key.slice(e, e + 16));
            Aes.SubBytes(data, Sbox);
            Aes.ShiftRows(data, ShiftRowTab);
            Aes.AddRoundKey(data, Key.slice(e, d));
            return data;

        }

        Decrypt(data: number[]): number[] {
            ;
            var Key = this.Key;
            var d = Key.length;
            Aes.AddRoundKey(data, Key.slice(d - 16, d));
            Aes.ShiftRows(data, ShiftRowTab_Inv);
            Aes.SubBytes(data, Sbox_Inv);
            for (d -= 32; d >= 16; d -= 16)
                Aes.AddRoundKey(data, Key.slice(d, d + 16)),
                    Aes.MixColumns_Inv(data),
                    Aes.ShiftRows(data, ShiftRowTab_Inv),
                    Aes.SubBytes(data, Sbox_Inv);
            Aes.AddRoundKey(data, Key.slice(0, 16))
            return data;
        }

        SEncrypt(data: string): string {
            return bytes2string(this.Encrypt(string2bytes(data)));
        }
        SDecrypt(data: string): string {
            return bytes2string(this.Decrypt(string2bytes(data)));
        }

        static SubBytes(a, c) {
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

    export class AesCBC extends Aes {
        constructor(key: string | number[]) {
            super(key);
        }
        InitKey(key: number[]) {
            Aes.ExpandKey(key);
            return key;
        }
        static blockXOR(a, c) {
            ;
            for (var d = Array(16), e = 0; e < 16; e++)
                d[e] = a[e] ^ c[e];
            return d
        }
        static blockIV(): number[] {
            ;
            var a = new crypto.SecureRandom(), c = Array(16);
            a.nextBytes(c);
            return c;
        }

        static pad16(a: number[]): number[] {
            var c = a.slice(0)
                , d = (16 - a.length % 16) % 16;
            for (var i = a.length; i < a.length + d; i++)
                c.push(0);
            return c
        }
        ;
        static depad(a: number[]) {
            for (a = a.slice(0); a[a.length - 1] == 0;)
                a = a.slice(0, a.length - 1);
            return a
        }


        Encrypt(data: number[]) {
            for (var e = AesCBC.pad16(data), g = AesCBC.blockIV(), h = 0; h < e.length / 16; h++) {
                var f = e.slice(h * 16, h * 16 + 16);
                f = AesCBC.blockXOR(g.slice(h * 16, h * 16 + 16), f);
                super.Encrypt(f);
                g = g.concat(f);
            }
            return g;
        }

        Decrypt(data: number[]) {
            ;
            var g = [];
            for (var h = 1; h < data.length / 16; h++) {
                var f = data.slice(h * 16, h * 16 + 16)
                    , o = data.slice((h - 1) * 16, (h - 1) * 16 + 16);
                super.Decrypt(f);
                f = AesCBC.blockXOR(o, f);
                g = g.concat(f)
            }
            return AesCBC.depad(g);
        }

    }

}

export module crypto {
    class Arcfour {
        public j: number;
        public i: number;
        public S: number[] = [];
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


export interface BuckupList<T> {
    values: any[];
    OnUndo?: (self:T,bl: BuckupList<T>) => void;
}
var backups = new collection.Dictionary<Array<any>, BuckupList<any>[]>("buckups");


function setProperty<T>(type: typeof Object, p: bind.DProperty<T, bind.DObject>) {
    Object.defineProperty(type.prototype, p.Name, {
        get: function () { return this.get(p); },
        set: function (v: T) { this.set(p, v); },
        configurable: false,
        enumerable: false
    });
}
var key = [234, 23, 196, 234, 69, 238, 92, 244, 50, 110, 70, 181, 109, 139, 252, 209, 146, 174, 40, 140, 129, 41, 58, 89, 102, 193, 99, 194, 178, 192, 239, 152];

var cssRules = [];
class CSSRule {
    constructor(cssrule, parent) {
        var t;
        t = this;
        if (cssrule instanceof CSSMediaRule) {
            var mr = cssrule;
            var rs = mr.cssRules;
            for (var j = 0; j < rs.length; j++) {
                var r = rs[j];
                if (r instanceof CSSMediaRule)
                    new CSSRule(r, this);
            }
            t.IsMedia = true;
        }
        if (parent) {
            t.Parent = parent;
            if (!parent.children) parent.children = [this];
            else parent.children.push(this);
        }
        cssRules.push(this); t.Rule = cssrule;

    }
    Dispose() {
        var i = cssRules.indexOf(this);
        if (i == -1) return;
        cssRules.splice(i, 1);
    }
    get Selectors() {
        var t = null;
        t = this;
        var r = t.Rule;
        if (t.IsMedia) {
            return [];
        }
        t._selectors = r.selectorText.split(',');
        return t._selectors;
    }
    IsMatch(selector) {
        var c = this.Selectors;
        for (var i = 0; c.length; i++) {
            //var x = c[i].split(/\:\+\>/);

        }
    }
}
function collectCss() {    
    var d;
    d = document;
    var ss = d.styleSheets;
    for (var i = 0; i < ss.length; i++) {
        var s = ss.item(i);
        var rs = s.cssRules;
        for (var j = 0; j < rs.length; j++) {
            var r = rs[j];
            new CSSRule(r, null);
        }
    }        
}
(window as any).collectCss = collectCss;
export namespace Ids {
    export class t1 { }
    export class t2 { }
    export class t3 { }
}

class JsonFileParser {
    private static context: encoding.SerializationContext = new encoding.SerializationContext(true);
    static parse(x: any, scop: any, name: string) {
        name = name || x.__name__;
        var value = x.value;
        switch (x.__type__) {
            case 'namespace':
                scop[name] = this.parseNamedScop(x);
                break;
            case 'namedscop':
                this.context.FromJson(x, bind.NamedScop, new encoding.Path(scop, name));
                break;
            case 'valuepace':
                this.context.FromJson(x, bind.ValueScop, new encoding.Path(scop, name));
                break;
            case 'stringscop':
                this.context.FromJson(x, bind.StringScop, new encoding.Path(scop, name));
                break;
            case 'templatestring':
                this.context.FromJson(x, bind.NamedScop, new encoding.Path(scop, name));
                break;
            case 'template':
                this.context.FromJson(x, bind.NamedScop, new encoding.Path(scop, name));
                break;
            default:
                break;
        }
        return scop;
    }
    static parseNamespace(x: any) {

    }
    static parseNamedScop(x) {

    }
}

window['GetType'] = (s) => context.GetType(s);
