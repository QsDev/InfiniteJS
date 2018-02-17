///. ULkit CSS Framework
/// Pure CSS Frame Work
///<references src="../dts/jquery.d.ts" >
import { basic, css, encoding, bind, mvc, thread, collection, utils, ScopicCommand, Api, BuckupList } from './Corelib';
import { defs } from './defs';
import { Controller } from './System';
import {filters } from './Filters';
import * as cssBootstrap from 'style|../style/bootstrap.min.css';
import * as cssApp from 'style|../style/app.css';
import * as cssHbar from 'style|../style/hbar.css';
import * as cssAApp from 'style|../style/aapp.css';
import * as cssSite from 'style|../style/site.css';
import * as tmplates from 'template|../templates/UITemplates.html';

ValidateImport(cssAApp, cssApp, cssSite, cssHbar, cssBootstrap, tmplates);
window['cnts'] = {};
declare var stop: () => void;
declare var _this;
declare var $: any;
declare type JQuery = { show(); hide();};
var $Error = Error;
export declare type conv2template = mvc.ITemplate | string | Function | UI.Template | HTMLElement;
var _primes = [2, 3];
const px = 'px';
var layout: IApplyStyle[] = [];
window.onbeforeunload = function (event) {
    var e = e || window.event;
    if (e) {
        e.returnValue = message;
    }
    return message;
}; var message = "You have not filled out the form.";

function closedWin() {
    confirm("close ?");
    return false; /* which will not allow to close the window */
}
if (window.addEventListener) {
    window.addEventListener("close", closedWin, false);
}
window['onclose'] = closedWin;

function getEvents() {
    return  ["MSContentZoom"
        , "MSGestureChange"
        , "MSGestureDoubleTap"
        , "MSGestureEnd", "MSGestureEnd"
        , "MSGestureHold" 
        , "MSGestureStart"
        , "MSGestureTap"
        , "MSGotPointerCapture"
        , "MSInertiaStart"
        , "MSLostPointerCapture"
        , "MSManipulationStateChanged"
        , "MSPointerCancel"
        , "MSPointerDown"
        , "MSPointerEnter"
        , "MSPointerLeave"
        , "MSPointerMove"
        , "MSPointerOut"
        , "MSPointerOver"
        , "MSPointerUp"
        , "abort"
        , "activate"
        , "ariarequest"
        , "beforeactivate"
        , "beforecopy"
        , "beforecut"
        , "beforedeactivate"
        , "beforepaste"
        , "blur"
        , "canplay"
        , "canplaythrough"
        , "change"
        , "click"
        , "command"
        , "contextmenu"
        , "copy"
        , "cuechange"
        , "cut"
        , "dblclick"
        , "deactivate"
        , "drag"
        , "dragend"
        , "dragenter"
        , "dragleave"
        , "dragover"
        , "dragstart"
        , "drop"
        , "durationchange"
        , "emptied"
        , "ended"
        , "error"
        , "focus"
        , "gotpointercapture"
        , "input"
        , "keydown"
        , "keypress"
        , "keyup"
        , "load"
        , "loadeddata"
        , "loadedmetadata"
        , "loadstart"
        , "lostpointercapture"
        , "mousedown"
        , "mouseenter"
        , "mouseleave"
        , "mousemove"
        , "mouseout"
        , "mouseover"
        , "mouseup"
        , "mousewheel"
        , "paste"
        , "pause"
        , "play"
        , "playing"
        , "pointercancel"
        , "pointerdown"
        , "pointerenter"
        , "pointerleave"
        , "pointermove"
        , "pointerout"
        , "pointerover"
        , "pointerup"
        , "progress"
        , "ratechange"
        , "reset"
        , "scroll"
        , "seeked"
        , "seeking"
        , "select"
        , "selectstart"
        , "stalled"
        , "submit"
        , "suspend"
        , "timeupdate"
        , "touchcancel"
        , "touchend"
        , "touchmove"
        , "touchstart"
        , "volumechange"
        , "waiting"
        , "webkitfullscreenchange"
        , "webkitfullscreenerror"
        , "wheel"];
}

function registerEvents(e, event) {
    var t = getEvents();
    e.handleEvent = event;
    for (var i = 0; i < t.length; i++)
        e.addEventListener(t[i], e);
}
function test(e) {
    registerEvents(e, function (e) {
        
    });
}
function prime(i) {
    var p = _primes;
    var l = p[_primes.length - 1];
    for (; p.length < i + 1;) {
        l += 2;
        var t = l;
        var s = Math.sqrt(l);
        s = s % 1 == 0 ? s + 1 : Math.ceil(s);
        for (var j = 0; j < s; j++) {
            var d = p[j];
            let a;                        
            if (((a = t / d) % 1) == 0) {
                t = 1;
                break;
            }
        }
        if (t !== 1) p.push(l);
    }
    return p[i];
}
function fractions(l) {
    var f = [1];
    var p = _primes;
    var t = l;
    var s = Math.sqrt(l);
    s = s % 1 == 0 ? s + 1 : Math.ceil(s);
    for (var j = 0; j < s; j++) {
        var d = p[j];
        let a;
        while (((a = t / d) % 1) == 0) {
            t = a;
            f.push(d);
        }
    }
    if (t !== 1) f.push(t);
    return f;;
}
function getPrime(x:number){
    var p = _primes[x];
    if (p) return p;
    return prime(p);
}

var onPatentchanged: ((patent: string) => void)[] = [];

export module UI {

    export enum Events {
        keydown = 2,
        keyup = 3,
        keypress = 5,
    }


    export abstract class JControl extends bind.Scop implements EventListenerObject {
        public getParent(): bind.Scop {
            return this.Parent;
        }
        protected _OnValueChanged(e: bind.EventArgs<any, any>) {
            //throw new (Error as any)("Method not implemented.");
        }
        setParent(v: bind.Scop) {
            if (v instanceof JControl) {
                v.Add(this);
            }
        }
        public static LoadCss(url) {
            var head = document.head;
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = url;
            link.media = 'all';
            head.appendChild(link);
            return link;
        }
        static __fields__(): any[] { return []; }
        public get InnerHtml() { return this._view.innerHTML; }
        public Float(v: HorizontalAlignement) {
            this._view.style.cssFloat = v === 0 ? 'left' : (v === 1 ? 'initiale' : 'right');
        }
        public Clear() {
            this._view.innerHTML = '';
        }
        protected parent: JControl;
        public _presenter: JControl;
        private _hotKey: HotKey;
        public _onInitialize: bind.EventListener<(s: JControl) => void> = new bind.EventListener<(s: JControl) => void>(this, true);
        public set OnInitialized(m: (s: this) => void) {
            if (this.init) m(this);
            else this._onInitialize.On = m;
        }

        public get Presenter() { return this._presenter || this; }
        public set Presenter(v: JControl) { this._presenter = v || this; }
        public setAttribute(name, value) {
            this.View.setAttribute(name, value);
            return this;
        }
        OnKeyDown(e: KeyboardEvent): any | void{}
        public setAttributes(attributes: { [s: string]: string }) {
            var v = this.View;
            for (var i in attributes) 
                v.setAttribute(i, attributes[i]);            
            return this;
        }
        public applyStyle(a: string, b: string, c: string, d: string, e: string, f: string);
        public applyStyle(a: string, b: string, c: string, d: string, e: string);
        public applyStyle(a: string, b: string, c: string, d: string);
        public applyStyle(a: string, b: string, c: string);
        public applyStyle(a: string, b: string);
        public applyStyle(a: string);
        public applyStyle() {
            //RegisterLayout(this._view, arguments);
            //let v = this.View;
            var v = this._view;
            v.classList.add.apply(v.classList, arguments);
            ////for (var i = 0; i < classNames.length; i++)
            ////    v.classList.add(classNames[i]);
            return this;
        }


        public disapplyStyle(a: string, b: string, c: string, d: string, e: string, f: string, x: string);
        public disapplyStyle(a: string, b: string, c: string, d: string, e: string, f: string);
        public disapplyStyle(a: string, b: string, c: string, d: string, e: string);
        public disapplyStyle(a: string, b: string, c: string, d: string);
        public disapplyStyle(a: string, b: string, c: string);
        public disapplyStyle(a: string, b: string);
        public disapplyStyle(a: string);
        
        public disapplyStyle() {
            var v = this._view;
            v.classList.remove.apply(v.classList, arguments);
            //RegisterLayout(this._view, arguments, true);
            //let v = this.View;
            //for (var i = 0; i < classNames.length; i++)
            //    v.classList.remove(classNames[i]);
            return this;
        }
        private _display = undefined;
        public set Visible(v: boolean) {
            v = v === true;
            if (v === this._display) return;
            this._display = this.View.style.display !== 'none' ? this.View.style.display : "";
            if (v)
                this.View.style.display = this._display;
            else this.View.style.display = 'none';
            //this.View.classList[v ? 'remove' : 'add']('collapse');
        }

        public set Wait(v: boolean) {
            if (v)
                this.applyStyle('Wait');
            else this.disapplyStyle('Wait');
        }

        public get Visible() {
            return this.View.style.display != 'none' && this.View.style.visibility == 'visible';
        }
        public set Enable(v: boolean) {
            this.View.style.pointerEvents = v ? 'all' : 'none';
        }
        public get Enable() {
            return this.View.style.pointerEvents != 'none';
        }


        public get Parent(): JControl {
            return this.parent;
        }
        private static counter = 0;
        private _id = ++JControl.counter;
        private init = false;
        

        /** @override */
        public get IsInit() { return this.init; }

        protected OnFullInitialized() {
            this._onInitialize.PInvok(this, [this], this);
        }
        private  _() {
            this.init = true;
            this.initialize();
            this.OnFullInitialized();
        }
        private __(v: JControl) {
            if (v != null && !this.init) {
                if (v.init) {
                    this._();
                } else {
                    var pv = this.parent;
                    if (pv && !pv.init) pv._onInitialize.Remove(this._id);
                    v._onInitialize.Add((_v) => {
                        if (this.parent == _v)
                            this._();
                        else throw "";
                    }, this._id);
                }
            }
        }
        public set Parent(v: JControl) {
            this.parent = v;
            this.__(v);

        }
        public set ToolTip(t: string) { this.View.title = t; }

        public get View() {
            return this._view;
        }
        constructor(protected _view: HTMLElement) {
            super(3);
            if (_view) {
                if (_view.id === '')
                    _view.id = this._id + "";
                window['cnts'][this._id] = this;
            }
            this.Value = this;
        }
        protected abstract initialize();
        public static createDiv() { return document.createElement('div'); }

        public addEventListener<T>(event: string, handle: (sender: this, e: Event, param: T) => void, param: T,owner?) {
            var x = new basic.DomEventHandler(this._view, event, owner, JControl._handle, { jc: this, handle: handle, p: param });
            x.Start();
            return x;
        }

        private static _handle(eth: basic.DomEventHandler<any, any>, ev: Event, p) {
            p.handle.call(this, p.jc, ev, p.p);
        }
        public AddRange(chidren: JControl[]) {
            for (var i = 0, l = chidren.length; i < l; i++)
                this.Add(chidren[i]);
            return this;
        }
        public Add(child: JControl) {
            if (child.parent != null) {
                if (child.parent === this)
                    return;
                
                child.parent.Remove(child, false);
            }
            child = this.getTemplate(child);
            child.Parent = this;
            this.View.appendChild(child.View);
            return this;
        }
        public IndexOf(child: JControl) {

        }
        public Insert(child: JControl, to: number) {
            if (child.parent != null) {
                child.parent.Remove(child, false);
            }
            child = this.getTemplate(child);
            child.Parent = this;
            (this.View as any).insertChildAtIndex(child.View, to);
            return this;
        }
        public Remove(child: JControl, dispose?: boolean): boolean {
            if (child.parent != this) return false;
            child.Parent = null;
            if (this.View.contains(child.View))
                this.View.removeChild(child.View);
            else if (child._view.parentNode != null) child.View.remove();
            if (dispose) child.Dispose();
            return true;
        }
        protected getTemplate(child: JControl): JControl {
            return child;
        }
        public get Id() {
            return this._id;
        }
        Dispose() {

            var h = this.OnDispose();
            if (h === null) return;
            if (this.parent) this.parent.Remove(this, false);
            if ((this._presenter != null) && (this._presenter != this)) this._presenter.Dispose();
            this._presenter = null;
            this.Parent = null;
            this._view = null;
            this._display = null;

            this._onInitialize.Dispose();
            this._presenter = null;
            this.parent = null;
            this.Presenter
            basic.DomEventHandler.Dispose(this._view);
            super.Dispose();
            if (!h) this.DisposingStat = 2;
        }

        protected OnHotKey() {
        }

        public set HotKey(v: HotKey) {
            if (!this.isEventRegistred(Events.keyup)) this.registerEvent(Events.keypress);
            this._hotKey = v;
        }
        public get HotKey() { return this._hotKey; }

        handleEvent(e: Event) {
            switch (Events[e.type]) {
                case Events.keydown:
                    break;
                case Events.keyup:
                    if (this._hotKey && this._hotKey.IsPressed(e as KeyboardEvent))
                        this.OnHotKey();
                    break;
                case Events.keypress:
                    break;
            }
        }

        private _events: Events = 0;
        private isEventRegistred(event: string | number) {
            var t = typeof (event) == 'number' ? event : Events[event];
            if (t === undefined) throw "event is not registred";
            return (this._events / t) % 1 === 0;
        }
        private registerEvent(event: Events) {
            this._view.addEventListener(Events[event], this);
        }
        static toggleClass(dom, className) {
            if (dom.classList.contains(className))
                dom.classList.remove(className);
            else dom.classList.add(className);
        }

    }

    export abstract class Control<T extends JControl> extends JControl {
        private _c: T[];
        private get Children(): T[] { return this._c || (this._c = []); }
        //private templates: JControl[] = [];
        public Add(child: T) {
            if (!this.Check(child)) throw 'Uncompatible';
            let t: JControl;
            if (child instanceof JControl) {
                t = child.Presenter;
                if (t === undefined) t = child;
                if (t.Parent != null) {
                    t.Parent.Remove(t, false);
                }
            }
            t = this.getTemplate(child);
            t.Parent = this;
            if (t !== child)
                child._presenter = t;
            this.Children.push(child);
            this.View.appendChild(t.View);
            this.OnChildAdded(child);
            return this;
        }

        public Insert(child: T, to: number) {
            if (!this.Check(child)) throw 'Uncompatible';
            let t: JControl;
            if (child instanceof JControl) {
                t = child.Presenter;
                if (t === undefined) t = child;
                if (t.Parent != null) {
                    t.Parent.Remove(t, false);
                }
            }
            t = this.getTemplate(child);
            t.Parent = this;
            this.Children.splice(to, 0, child);
            (this.View as any).insertChildAtIndex(child.View, to);
            this.OnChildAdded(child);
            return this;
        }
        public Remove(child: T, dispose?: boolean): boolean {
            let i = this.Children.indexOf(child);
            if (i == -1) return true;
            let t = child.Presenter;
            if (t.Parent != this) return false;
            t.Parent = null;
            if (this.Children.splice(i, 1).length != 0)
                this.View.removeChild(t.View);
            return true;
        }
        public RemoveAt(i: number, dispose: boolean): boolean {
            let child = this.Children[i];
            if (!child) return;
            let t = child.Presenter;
            t.Parent = null;
            this.Children.splice(i, 1);
            this.View.removeChild(this.Presenter ? t.Presenter.View : t.View);
            if (dispose)
                child.Dispose();
            return true;
        }

        protected abstract Check(child: T);
        protected get HasTemplate() { return false; }
        protected getTemplate(child: T): JControl {
            return child;
        }
        protected OnChildAdded(child: T) {

        }
        public getChild(i: number): T {
            return this.Children[i];
        }
        public IndexOf(item: T) {
            return this.Children.indexOf(item);
        }
        constructor(view: HTMLElement) {
            super(view);
        }

        public get Count() {
            return this.Children.length;
        }
        public CloneChildren() {
            var c = this.Children;
            var arr = new Array(c.length);
            for (var i = 0, l = arr.length; i < l; i++)
                arr[i] = c[i];
        }
        public Clear(dispose?: boolean) {
            for (var i = 0, l = this.Count; i < l; i++)
                this.RemoveAt(0, dispose);
        }

        Dispose() {

            var h = this.OnDispose();
            if (h === null) return;
            this.Clear(true);
            this._c.length = 0;
            this._c = null;
            super.Dispose();
            if (!h) this.DisposingStat = 2;
        }

    }

    var authApp: AuthApp;

    var isLogged = function (v) { _.AuthStatChanged(v); }
    var authApp: AuthApp;
    function TryCatch(owner: any, Try: Function, Catch?: Function, params?: any[]) {
        try {
            Try.apply(owner, params);
        } catch (e) {
            if (Catch)
                Catch.call(owner, e);
        }
    }
	export class Desktop extends Control<App> {
        Logout(): any {
            if (this.AuthenticationApp)
                this.AuthenticationApp.Logout();
            else this.CurrentApp.Logout();
        }
        OpenSignin() {
            this.CurrentApp = this.AuthenticationApp;
        }
        isReq: number;

        public static DPCurrentApp: bind.DProperty<App, Desktop>;
        public CurrentApp: App;
        static ctor() {
            Desktop.DPCurrentApp = bind.DObject.CreateField<App, Desktop>('CurrentApp', IApp, null, (e) => {
                e.__this.selectApp(e._old, e._new);
            });
        }
        private selectApp(oldApp: App, app: App) {
            if (oldApp) {
                this.Remove(oldApp, false);
                TryCatch(oldApp, oldApp.OnDetached);
            }
            if (app) {
                super.Add(app);
                TryCatch(app, app.OnAttached);
            }
            window.sessionStorage.setItem('app', app && app.Name);
        }
        static __fields__() {
            return [Desktop.DPCurrentApp];
        }
        public AuthStatChanged(v: boolean) {            
            if (v) this.Show(this.AuthenticationApp.RedirectApp);
            else this.Show(this.AuthenticationApp);
        }


        private apps: collection.List<defs.UI.IApp> = new collection.List<App>(Object);

        public IsSingleton = true;

        constructor() {
            super(document.body);
            (this as any)._();
            if (_ != null) throw '';
            _ = this;
        }
        initialize() {
            document.addEventListener('keydown', this);
            document.addEventListener('contextmenu', (e) => { e.stopImmediatePropagation(); e.preventDefault(); });
        }
        private mouseController(e) {
        }
        public GetKeyControl(owner: any, invoke: (e: KeyboardEvent, ...params: any[]) => boolean, params: any[]) {
            this._keyboardController = { owner: owner, invoke: invoke, params: params };
        }
        public ReleaseKeyControl() {
            this._keyboardController = null;
        }

        private _keyboardController: { owner: any, invoke: (e: KeyboardEvent) => boolean, params: any[] };
        private focuser: basic.focuser = new basic.focuser(this.View, true);
        private handleTab(e: KeyboardEvent, _view: HTMLElement) {
            this.focuser.bound = _view;
            this.focuser.focuse(true, e.shiftKey);
            e.stopImmediatePropagation();
            e.preventDefault();
        }
        handleEvent(e: KeyboardEvent) {
            var x = this._keyboardController;
            if (x) {
                var p = x.params.slice();
                p.unshift(e);
                var r = x.invoke.apply(this._keyboardController.owner, p);
                if (r)
                    this.ReleaseKeyControl();
                if (r !== -1)
                    return;
            }
            
            var cd = openedModal[openedModal.length - 1];

            if (e.keyCode > 111 && e.keyCode < 124) { e.stopPropagation(); e.preventDefault(); }
            
            if (cd) {
                if (!cd.OnKeyDown(e))
                    if (e.keyCode === 9)
                        this.handleTab(e, cd.View);
                    else;
                else {
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    e.preventDefault();
                }
                return;
            }
            let currentApp = this.CurrentApp;
            if (e.keyCode === 114) {
                if (e.ctrlKey)
                    this.CurrentApp.ToggleTitle();
                else this.CurrentApp.OnDeepSearche();
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            if (e.keyCode === Keys.F5) {
                e.preventDefault();
                e.stopImmediatePropagation();
                e.stopPropagation();
                this.CurrentApp.Update();
            }
            
            else if (e.keyCode == Keys.F12) {                
                if (e.ctrlKey) {
                    this.Logout();
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    return;
                }
                else if (currentApp) {
                    if (currentApp.SelectedPage instanceof UI.NavPage)
                        currentApp.SelectedPage.ToggleNav();
                }
                e.preventDefault();
                e.stopImmediatePropagation();
                e.stopPropagation();
            }
            else if (e.ctrlKey && e.keyCode == 66) {
                if ((Date.now() - this.isReq) < 500)
                {
                    Api.RiseApi('Settings', { data: e, callback: () => { } });
                }
                else
                    this.isReq = Date.now();
            }
            else if (e.ctrlKey && (e.keyCode == 112 || e.keyCode === 80))
            {
                currentApp.OnPrint();
                e.preventDefault();
                e.stopImmediatePropagation();
                e.stopPropagation();
            }

            else {
                if (currentApp) {
                    if (e.ctrlKey)
                        if (e.keyCode === 80)
                            this.CurrentApp.OnPrint();
                        //else if (e.keyCode == 9)
                        //    if (e.shiftKey)
                        //        return currentApp.SelectPrevPage();
                        //    else
                        //        return currentApp.SelectNaxtPage();
                        //else if (e.keyCode === 37)
                        //    return currentApp.SelectPrevPage();
                        //else if (e.keyCode === 39)
                        //    return currentApp.SelectNaxtPage();
                    (currentApp as any).OnKeyDown(e);
                }
            }
        }
        private ShowStart() {
            var t = this.apps;
            var s = "Select app :";
            var ap = this.CurrentApp == null ? null : this.CurrentApp.Name;
            for (var i = 0, l = t.Count; i < l; i++) {
                if (ap == null) ap = t.Get(i).Name;
                s += "\r        " + t.Get(i).Name;
            }

            var e = prompt(s, ap == null ? "" : ap);
            for (var i = 0, l = t.Count; i < l; i++)
                if (t.Get(i).Name.toLowerCase() == e) {
                    { this.Show(t.Get(i)); }
                    return;
                }
        }
        public static get Current() { return _; }
        Check(v: defs.UI.IApp) {
            return v instanceof IApp;
        }
        Show(app:defs.UI.IApp) {
            authApp.IsLogged((v, app) => {
                var currentApp = this.CurrentApp;
                if (!v) {
                    if (currentApp instanceof AuthApp) return;
                    if (app !== this.AuthenticationApp)
                        this.AuthenticationApp.RedirectApp = app;
                    app = this.AuthenticationApp;
                }
                else {
                    app = app instanceof AuthApp ? app.RedirectApp : app;
                    //currentApp instanceof AuthApp ? currentApp.RedirectApp : app;
                }
                if (!app)
                    for (var i = 0; i < this.apps.Count; i++) {
                        var appx = this.apps.Get(i);
                        if (!(appx instanceof AuthApp)) {
                            app = appx;
                            break;
                        }
                    }
                thread.Dispatcher.Push(this.loadApp.Set(app));
            }, app);
        }
        private to;
        private loadApp = thread.Dispatcher.cretaeJob((app: App) => {
            this.CurrentApp = app;
        }, [null], this, !true);
        Add(i:defs.UI. IApp) {            
            if (i instanceof AuthApp) this.AuthenticationApp = i;
            else this.Register(i);
            return this;
        }

        Register(app: defs.UI.IApp) {
            if (this.apps.IndexOf(app) !== -1) return;
            this.apps.Add(app);
            app.Parent = this;
        }
        
        public get AuthenticationApp(): AuthApp { return authApp; }
        public set AuthenticationApp(v: AuthApp) {
			if (authApp || v == null) throw '';
            authApp = v;
            v.OnStatStatChanged.On = (auth, v) => {
                if (v) {
                    this.Redirect(auth);
                } else {
                    this.Show(auth);
                }
            };
            //authApp.OnLogged = { Owner: this, Invoke: this.Redirect };

        }
        private Redirect(app: AuthApp) {
            this.Show(app.RedirectApp);
        }
        OnUsernameChanged(job, e) {

        }
    }
    export class Container extends Control<JControl>{
        constructor() {
            super(document.createElement('div'));
        }
        initialize() { this.applyStyle('container'); }
        Check(child: JControl) { return child instanceof JControl; }
    }
    export enum Icons {
        Bar, Next, Prev,
    }
    export enum Glyphs {
        none,
        asterisk, plus, eur, euro, minus, cloud, envelope, pencil, glass, music, search, heart, star, starEmpty, user, film, thLarge, th, thList, ok, remove, zoomIn, zoomOut, off, signal, cog, trash, home, file, time, road, downloadAlt, download, upload, inbox, playCircle, repeat, refresh, listAlt, lock, flag, headphones, volumeOff, volumeDown, volumeUp, qrcode, barcode, tag, tags, book, bookmark, print, camera, font, bold, italic, textHeight, textWidth, alignLeft, alignCenter, alignRight, alignJustify, list, indentLeft, indentRight, facetimeVideo, picture, mapMarker, adjust, tint, edit, share, check, move, stepBackward, fastBackward, backward, play, pause, stop, forward, fastForward, stepForward, eject, chevronLeft, chevronRight, plusSign, minusSign, removeSign, okSign, questionSign, infoSign, screenshot, removeCircle, okCircle, banCircle, arrowLeft, arrowRight, arrowUp, arrowDown, shareAlt, resizeFull, resizeSmall, exclamationSign, gift, leaf, fire, eyeOpen, eyeClose, warningSign, plane, calendar, random, comment, magnet, chevronUp, chevronDown, retweet, shoppingCart, folderClose, folderOpen, resizeVertical, resizeHorizontal, hdd, bullhorn, bell, certificate, thumbsUp, thumbsDown, handRight, handLeft, handUp, handDown, circleArrowRight, circleArrowLeft, circleArrowUp, circleArrowDown, globe, wrench, tasks, filter, briefcase, fullscreen, dashboard, paperclip, heartEmpty, link, phone, pushpin, usd, gbp, sort, sortByAlphabet, sortByAlphabetAlt, sortByOrder, sortByOrderAlt, sortByAttributes, sortByAttributesAlt, unchecked, expand, collapseDown, collapseUp, logIn, flash, logOut, newWindow, record, save, open, saved, import, export, send, floppyDisk, floppySaved, floppyRemove, floppySave, floppyOpen, creditCard, transfer, cutlery, header, compressed, earphone, phoneAlt, tower, stats, sdVideo, hdVideo, subtitles, soundStereo, soundDolby, sound$5$1, sound$6$1, sound$7$1, copyrightMark, registrationMark, cloudDownload, cloudUpload, treeConifer, treeDeciduous, cd, saveFile, openFile, levelUp, copy, paste, alert, equalizer, king, queen, pawn, bishop, knight, babyFormula, tent, blackboard, bed, apple, erase, hourglass, lamp, duplicate, piggyBank, scissors, bitcoin, btc, xbt, yen, jpy, ruble, rub, scale, iceLolly, iceLollyTasted, education, optionHorizontal, optionVertical, menuHamburger, modalWindow, oil, grain, sunglasses, textSize, textColor, textBackground, objectAlignTop, objectAlignBottom, objectAlignHorizontal, objectAlignLeft, objectAlignVertical, objectAlignRight, triangleRight, triangleLeft, triangleBottom, triangleTop, console, superscript, subscript, menuLeft, menuRight, menuDown, menuUp
    }
    export class Glyph extends JControl {

        public static AllGlyphs(panel: JControl) {
            for (var i in Glyphs) {
                if (isNaN(i as any)) {
                    panel.Add(new Glyph(Glyphs[i as string], false));
                }
            }
        }
        public static Test() {
            var c = new UI.Div().applyStyle('row');
            for (var i in Glyphs) {
                if (isNaN(i as any)) {
                    var v = new Glyph(Glyphs[i as string], false).applyStyle('col');
                    c.Add(v);
                    v.ToolTip = i;
                }
            }
            c.Parent = UI.Desktop.Current;
            var reg = document.getElementById('51');
            reg.appendChild(c.View);
            c.View.style.fontSize = '-webkit-xxx-large';
            c.View.style.padding = '15px';

            return c;
        }
        public static CreateGlyphDom(glyph: UI.Glyphs, toolTip: string,cssClass?:string):HTMLSpanElement {
            var v = document.createElement('span');
            v.classList.add('glyphicon', Glyph.GetGlyphCSS(glyph), 'bgr');
            if (cssClass) v.classList.add(cssClass);
            v.title = toolTip;
            return v;
        }
        private static GetGlyphCSS(name: Glyphs): string {
            let c = css.toValidCssName(Glyphs[name]);
            return 'glyphicon' + (c == null ? '' : '-' + c);
        }
        private static GetIconCSS(name: Icons): string {
            let c = Icons[name];
            return 'icon-' + (c == null ? '' : c.toLowerCase());
        }
        private getStyle() {
            if (this.isIcon) return Glyph.GetIconCSS(this.v as Icons);
            else return Glyph.GetGlyphCSS(this.v as Glyphs);
        }
        constructor(glyph: Glyphs | Icons, private isIcon?: boolean,toolTip?:string) {
            super(document.createElement('span'));
            isIcon = isIcon == true;
            this.Type = glyph;
            this._view.classList.add('bgr');
            this._view.title = toolTip;
        }
        initialize() {
        }
        private v: Glyphs | Icons;
        public set Type(v: Glyphs | Icons) {
            if (this.v != null)
                this.View.classList.remove(this.getStyle());
            this.v = v;
            if (v != null)
                this.applyStyle('glyphicon', this.getStyle());
        }
        public get Type() { return this.v; }
    }
    (window as any).Test = Glyph.Test;
    export class Button extends JControl {
        Focus(): any {
            this._view.focus();
        }
        private v: ButtonStyle = 0;
        set Style(v: ButtonStyle) {
            this.View.classList.remove('btn-' + ButtonStyle[this.v].toLowerCase());
            this.applyStyle('btn-' + ButtonStyle[v].toLowerCase());
            this.v = v;
        }
        initialize() {
            this.applyStyle('btn', 'btn-default');
            this.Type = 'button';
        }
        constructor() { super(document.createElement('button')); }
        public set Text(s: string) { this.View.innerHTML = s; }
        public set Type(s: string) { (this.View as HTMLButtonElement).type = s; }
    }
    export class GlyphButton extends Button {
        initialize() {
            let v = this.View;
            this.AddGlyphs(() => true, Icons.Bar, Icons.Bar, Icons.Bar);
            super.initialize();
        }
        AddGlyphs(isIcon: (i: number) => boolean, ...glyphs: (Glyphs | Icons)[]) {
            for (var i = 0; i < glyphs.length; i++)
                this.AddGlyph(glyphs[i], isIcon(i));
        }
        AddGlyph(glyph: Glyphs | Icons, isIcon?: boolean): Glyph {
            if (typeof glyph == 'number') {
                let g = new Glyph(glyph, isIcon);
                super.Add(g);
                return g;
            }
            return null;
        }
        protected Check(child: JControl) {
            return child instanceof Glyph;
        }
        private target: JControl;
        public set CollapsedZone(target: JControl) {
            let v = this.View;
            this.applyStyle('navbar-toggle');
            v.setAttribute('data-toggle', 'collapse');
            v.setAttribute('data-target', '#' + target.Id);
            target.applyStyle('collapse');
        }
    }
    export class Dom extends JControl {
        constructor(tagName: string | HTMLElement, classList?: string[]) {
            super(typeof tagName == 'string' ? document.createElement(tagName as string) : (tagName as HTMLElement));
            if (classList)
                for (var i = 0; i < classList.length; i++)
                    this.View.classList.add(classList[i]);
        }
        initialize() {
        }
    }
    export class Anchore extends JControl {
        constructor(content?: string | HTMLElement | JControl, href?: string) {
            super(f = document.createElement('a'));
            var f: HTMLAnchorElement;

            if (href != null && href != '#') f.href = href;
            if (content != null)
                if (content instanceof JControl)
                    this.Add(content);
                else if (content instanceof HTMLElement)
                    f.appendChild(content);
                else if(typeof content==='string')
                    f.text = content;
        }
        initialize() {
        }
        Add(child: JControl) {
            this.View.innerHTML = '';
            super.Add(child);
            return this;
        }
        Remove(child: JControl): boolean { return false; }

        get Text(): string {
            return (this.View as HTMLAnchorElement).text;
        }
        set Text(v: string) {
            (this.View as HTMLAnchorElement).text = v;
        }
        get Href(): string {
            return (this.View as HTMLAnchorElement).href;
        }
        set Href(v: string) {
            (this.View as HTMLAnchorElement).href = v;
        }
    }
    export class Label extends JControl {
        constructor(text: string) {
            super(f = document.createElement('label'));
            var f: HTMLLabelElement;
            f.textContent = text;
        }
        initialize() { /*this.applyStyle('mySearch');*/ }

        get Text(): string {
            return (this.View as HTMLLabelElement).textContent;
        }
        set Text(v: string) {
            (this.View as HTMLLabelElement).textContent = v;
        }
    }
    export class Text extends JControl {
        constructor(text: string) {
            super(f = document.createElement('div'));
            var f: HTMLDivElement;
            f.textContent = text;
        }
        initialize() {  }

        get Text(): string {
            return this.View.textContent;
        }
        set Text(v: string) {
            (this.View as HTMLLabelElement).textContent = v;
        }
    }

    export class Textbox extends JControl {
        constructor(text?: string) {
            super(f = document.createElement('input'));
            var f: HTMLInputElement;
            f.type = 'search';
            if (text != void 0)
                f.value = text;
		}
		public Focus() {
			this.View.focus();
		}
        initialize() {
        }
        Add(child: JControl) { return this; }
        Remove(child: JControl): boolean { return false; }

        get Text(): string {
            return (this.View as HTMLInputElement).value;
        }
        set Text(v: string) {
            (this.View as HTMLInputElement).value = v;
        }
        get PlaceHolder(): string {
            return this.View.getAttribute('placeholder');
        }
        set PlaceHolder(v: string) {
            this.View.setAttribute('placeholder', v);
        }
     
    }
    export enum ListType {
        Ordred,
        UnOrdred,
    }
    export class List extends Control<JControl>{
        constructor(type?: ListType) {
            super(document.createElement(type === undefined ? 'div' : (type === 0 ? 'ol' : (type === 1 ? 'ul' : 'ul'))));
        }
        initialize() {
            this._view.addEventListener('keydown', (e: KeyboardEvent) => {
                if (e.keyCode === Keys.Down)
                    this.SelectedIndex++;
                else if (e.keyCode === Keys.Up)
                    this.SelectedIndex--;
            });
        }

        Check(child: JControl): boolean {
            return child instanceof JControl;// || typeof (child) == 'string';
        }
        get HasTemplate() { return true; }
        getTemplate(child: JControl | HTMLElement | string): JControl {
            let l = new Dom('li');
            if (child instanceof JControl) {
                l.Add(child);
            }
            else if (child instanceof HTMLElement)
                l.View.appendChild(child);
            else {
                let a = new Anchore(child, '#');
                l.Add(a);
            }
            return l;
        }
        public AddText(item: string) {
            var t = new Div(); t.View.textContent = item;
            this.Add(t);
            return t;
        }
        protected OnChildAdded(child: JControl) {
            if (this._si == -1) this.SelectedIndex = 0;
        }
        private _si = -1;
        public set SelectedIndex(i: number) {
            let ox = this.getChild(this._si);
            if (ox) {
                if (ox.Presenter)
                    ox.Presenter.View.classList.remove('active');
                else if (ox.Parent)
                    ox.Parent.disapplyStyle('active');
            }
            let x = this.getChild(i);
            if (x)
                if (x.Presenter) x.Presenter.applyStyle('active');
                else if (x.Parent) x.Parent.applyStyle('active');
        }
        public get SelectedIndex(): number {
            return this._si;
        }
    }
    export class DivControl extends Control<JControl>{
        constructor(tag?: string | HTMLElement) {
            super(typeof tag === 'string' ? document.createElement(tag || 'div') : tag as HTMLElement);
        }
        initialize() {
            //this.applyStyle('list-group');
        }
        Check(child: JControl): boolean {
            return child instanceof JControl;
        }
    }

    export class Div extends Control<JControl> {
        constructor() {
            super(document.createElement('div'));
        }
        initialize() {

        }
        Check(item: JControl) { return true; }
    }

    export class ServiceNavBar<T extends IItem> extends JControl {
        constructor(public App:defs.UI.IApp,private autoInitializePanels: boolean) {
            super(document.createElement('div'));
            this.OnClick = this.OnClick.bind(this);
            this.serviceNotified = this.serviceNotified.bind(this);
        }
        initialize() {
            if (this.autoInitializePanels) {
                this.LeftTabs = this._lefttabs || new Navbar<T>();
                this.RightTabs = this._righttabs || new Navbar<T>();
                delete this.autoInitializePanels;
            }
            this.applyStyle('navbar', 'navbar-fixed-bottom', 'appFoot', 'uncolapsed');
        }
        private _lefttabs: Navbar<T>;
        private _righttabs: Navbar<T>;
        private bi;
        public set LeftTabs(v: Navbar<T>) {
            if (this._lefttabs === v) return;
            if (this._lefttabs) {
                super.Remove(this._lefttabs);
                this._lefttabs.OnSelectedItem.Remove(this);
            }
            if (v) {
                super.Add(v);
                v.OnSelectedItem.Add((s) => { if (this.OnPageSelected) this.OnPageSelected(s); }, this);
                v.Float(HorizontalAlignement.Left);
            }
            this._lefttabs = v;
        }
        public set RightTabs(v: Navbar<T>) {
            if (this._righttabs === v) return;
            if (this._righttabs) {
                super.Remove(this._righttabs);
                this._righttabs.OnSelectedItem.Remove(this);
            }
            if (v) {
                super.Add(v);
                v.OnSelectedItem.Add((s) => { if (this.OnPageSelected) this.OnPageSelected(s) }, this);
                v.Float(HorizontalAlignement.Right);
            }
            this._righttabs = v;
        }

        private createItem(page: Page): MenuItem {
            let x = new MenuItem(page);
            x.OnClick = this.OnClick;
            return x;
        }
        public OnPageSelected: (page: T) => void;
        public OnClick(page: T) {
            if (this.OnPageSelected) this.OnPageSelected(page);
        }
        public Add(child: JControl): this {
            throw "Not Allowed";
        }
        public AddRange(child: JControl[]): this {
            throw "Not Allowed";
        }
        public Remove(child: JControl): boolean {
            if (child === this._lefttabs)
                this.LeftTabs = null;
            else if (child === this._righttabs)
                this.RightTabs = null;
            else
                throw "Not Allowed";
            return true;
        }
        
        /////////
        public serviceNotified(s: IService, n: NotifyType) {
            if (this.App === App.CurrentApp)
                if (n === NotifyType.Focuse)
                    this.Push(s);
                else if (n === NotifyType.UnFocus)
                    this.Pop(s);
        }
        private services: BarStack[] = [];
        private get currentStack() { return this.services[this.services.length - 1]; }
        private CurrentService() { const t = this.services[this.services.length - 1]; if (t) return t.Current; return null; }
        public PushGBar(ser: IService) {
            this.HideCurrentService();
            this.services.push(new BarStack(ser));
            this.ShowCurrentService();
        }
        public PopGBar(ser: IService) {
            this.HideCurrentService();
            this.services.pop();
            this.Add(ser.GetLeftBar());
        }
        public ExitBar() {
            this.HideCurrentService();
            this.currentStack.Exit();
            this.ShowCurrentService();
        }
        public PushBar(ser: IService) {
            this.HideCurrentService();
            this.currentStack.Push(ser);
            this.ShowCurrentService();
        }
        public PopBar() {
            this.HideCurrentService();
            this.currentStack.Pop();
            this.ShowCurrentService();
        }

        private HideCurrentService() {
            const cs = this.currentStack;
            if (cs) {
                var l = cs.Current.GetLeftBar();
                var r = cs.Current.GetRightBar();
                if (l) {
                    if (l instanceof Navbar)
                        this.LeftTabs = null;
                    else
                        this.Remove(l);
                }
                if (r) {
                    if (r instanceof Navbar)
                        this.RightTabs = null;
                    else
                        this.Remove(r);
                }
            }
        }
        private ShowCurrentService() {
            const cs = this.currentStack;
            if (cs) {
                var l = cs.Current.GetLeftBar();
                var r = cs.Current.GetRightBar();
                UI.MenuItem
                if (l) {
                    if (l instanceof Navbar)
                        this.LeftTabs = l;
                    else
                        this.Add(l);
                }
                if (r) {
                    if (r instanceof Navbar)
                        this.RightTabs = r;
                    else {
                        this.Add(r);
                    }
                }
                this.Visible = l != null || r != null;
            }
        }
        public Push(s: IService) {
            if (s === this.CurrentService()) return;
            this.HideCurrentService();
            const c = this.CurrentService();
            if (c)
                if (c.ServiceType == ServiceType.Instantany)
                    this.currentStack.Pop();
            if (s.ServiceType == ServiceType.Main)
                this.services.push(new BarStack(s));
            else {
                const t = this.currentStack;
                if (t == null)
                    this.services.push(new BarStack(s));
                else
                    this.currentStack.Push(s);
            }
            this.ShowCurrentService();
        }
        private Has(s: IService) {
            const c = this.services;
            let r; let l = c.length;
            for (let i = l - 1; i >= 0; i--) {
                let x = c[i];
                if ((r = x.Has(s)) !== 0) return { stack: l - i + (r === -1 ? 0 : -1), serv: r };
            }
            return null;
        }

        public Pop(s?: IService) {
            this.HideCurrentService();
            if (s) {
                let t = this.Has(s);
                if (t) {
                    while (t.stack > 0) {
                        this.services.pop();
                        t.stack--;
                    }
                    let l = this.currentStack;
                    while (t.serv > 0) {
                        l.Pop();
                        t.serv--;
                    }
                }
            } else {
                let c = this.CurrentService();
                if (c)
                    if (c.ServiceType === ServiceType.Main)
                        this.services.pop();
                    else this.currentStack.Pop();
            }
            this.ShowCurrentService();
        }

        public Register(service: IService) {
            if (service.Handler && !service.Handled()) {
                service.Handler.addEventListener('pointerenter', (e) => {
                    App.CurrentApp.Foot.Push(service);
                });
                service.Handler.addEventListener('pointerout', (e) => {
                    App.CurrentApp.Foot.Pop(service);
                });
            }
            if (service.Notify)
                service.Notify.On = this.serviceNotified;
        }
        private _services: IService[] = [];

        ////////
    }

    export class Navbar<T extends IItem> extends List {
        private _items: collection.ExList<T, any> = new collection.ExList<T, any>(Object);
        constructor() {
            super();
        }
        initialize() {
            super.initialize();
            this.onClick = this.onClick.bind(this);
            this.applyStyle('nav', 'navbar-nav');
            this._items.Listen = this.oicd;//this.ItemsChanged.bind(this);
            this.ItemsChanged(utils.ListEventArgs.ResetEvent);
        }
        private oicd: basic.IBindable = { Owner: this, Invoke: this.ItemsChanged };
        private ItemsChanged(e: utils.ListEventArgs<number, Page>) {
            if (this.IsInit === false) return;
            let m = this;
            let _items = this._items;
            switch (e.event) {
                case collection.CollectionEvent.Added:
                    m.Add(this.createItem(e.newItem));
                    break;
                case collection.CollectionEvent.Cleared:
                    this.CClear(m);
                    break;
                case collection.CollectionEvent.Removed:
                    for (var i = 0, l = m.Count; i < l; i++) {
                        let c = m.getChild(i) as MenuItem;
                        if (c.Source == e.oldItem) {
                            m.RemoveAt(i + 1, true);
                            break;
                        }
                    }
                    break;
                case collection.CollectionEvent.Replace:
                    for (var i = 0, l = m.Count; i < l; i++) {
                        let c = m.getChild(i) as MenuItem;
                        if (c.Source == e.oldItem) {
                            m.RemoveAt(i + 1, true);
                            break;
                        }
                    }
                    m.Add(new MenuItem(e.newItem));
                    break;
                case collection.CollectionEvent.Reset:
                    this.CClear(m);
                    for (var i = 0, l = _items.Count; i < l; i++) {
                        let c = _items.Get(0);
                        m.Add(new MenuItem(c));
                    }
                    break;
            }

        }
        private createItem(page: Page): MenuItem {
            let x = new MenuItem(page);
            x.OnClick = this.onClick;
            return x;
        }
        public selectable: boolean = true;
        private _selectedItem: MenuItem;
        public get SelectedItem() { return this._selectedItem; }

        private onClick(page: T, sender: MenuItem) {
            if (this._selectedItem != null) {
                var p = this._selectedItem.Presenter;
                p.disapplyStyle('active');
            }
            if (sender != null) {
                var p = sender.Presenter;
                this._selectedItem = sender;
                p.applyStyle('active');
            }
            if (!this.selectable)
                setTimeout((nb: Navbar<T>, si: MenuItem) => si.Presenter.disapplyStyle('active'), 500, this, sender);
            this.OnSelectedItem.Invok(this, (c) => c(page));
        }

        public Float(v: HorizontalAlignement) {
            if (v == HorizontalAlignement.Right)
            { this.disapplyStyle('pull-left'); this.applyStyle('pull-right'); }
            else if (v == HorizontalAlignement.Left)
            { this.applyStyle('pull-left'); this.disapplyStyle('pull-right'); }
            else { this.disapplyStyle('pull-left'); this.disapplyStyle('pull-right'); }
        }

        private CClear(m: Navbar<T>) {
            for (var i = 2, l = m.Count; i < l; i++)
                m.RemoveAt(i, true);
        }

        public get Items() {
            return this._items;
        }

        public OnSelectedItem = new bind.EventListener<(item: T) => void>(this);
    }

    export class NavbarHeader extends JControl {
        public set Title(v: string) {
            this._brand.Text = v;
        }
        public get Title(): string {
            return this._brand.Text;
        }

        private _brand: Anchore;
        private _brandContainer: JControl;
        private _toggleButton: GlyphButton;
        public get Brand() { return this._brandContainer; }
        public get ToggleButton() { return this._toggleButton; }


        constructor() {
            super(document.createElement('div'));
        }

        initialize() {
            let v = this.View;
            //v.style.height = '50px';
            this.applyStyle('navbar-header');
            this._brand = new Anchore('QShop', '#');
            this._brandContainer = new Div();
            this._brandContainer.Add(this._brand);
            this._brandContainer.applyStyle('navbar-brand');

            bind.NamedScop.Create('GlobalPatent', {});
            let b = this._toggleButton = new GlyphButton();
            this.Add(this._brandContainer);
            this.Add(this._toggleButton);
        }
        public set IsFixedTop(v: boolean) {
            if (v)
                this.applyStyle('navbar-fixed-top');
            else this.View.classList.remove('navbar-fixed-top');
        }
        public set IsHeader(v: boolean) {
            if (v)
                this.applyStyle('navbar-header');
            else this.View.classList.remove('navbar-header');
        }
    }

    export interface IItem {
        Tag: any;
        Content: string | HTMLElement | JControl;
        Url: string;
        OnItemSelected(menuItem: MenuItem);
    }

    export class MenuItem extends Anchore implements EventListenerObject, basic.IDisposable {
        constructor(public Source: IItem) {
            super(Source.Content, Source.Url);
            this.View.addEventListener('click', this);
        }

        propChanged(p: bind.PropBinding, e: bind.EventArgs<string, Page>) {
            if (e.prop == Page.DPTitle)
                this.Text = e._new;
            else if (e.prop == Page.DPUrl)
                this.Href = e._new;
        }

        public handleEvent(e: Event) {
            if (this.OnClick) this.OnClick(this.Source, this);
            this.Source.OnItemSelected(this);
        }
        public OnClick: (page: IItem, sender: MenuItem) => void;
        Dispose() {
            var h = this.OnDispose();
            if (h === null) return;
            this.View.removeEventListener('click', this);
            this.Source = null;
            this.OnClick = null;
            super.Dispose();
            if (!h) this.DisposingStat = 2;
        }
    }

    export class ContentControl extends JControl {
        constructor() {
			super(document.createElement('div'));
        }
        initialize() {}
        private _content: JControl;
        public get Content() { return this._content; }
        public set Content(v: JControl) {
            if (this._content == v) return;
            if (this._content)
                this.Remove(this._content);
            this._content = v;
            if (v)
                this.Add(v);
        }
    }

    export enum ButtonStyle {
        Default,
        Primary,
        success,
        Info,
        Warning,
        Danger,
        Link,
        Block
    }

    export class Input extends JControl {
        Disable(disable: any) {
            var c = $('input', this._view) as HTMLInputElement[];
            for (var i = 0; i < c.length; i++) {
                c[i].disabled = disable;
            }
        }
        constructor(dom?) { super(dom || document.createElement('input')); }
        initialize() {
            this.applyStyle('input', 'form-control');
        }
        public set Placeholder(v: string) { (this.View as HTMLInputElement).placeholder = v; }
        public set Text(v: string) { (this.View as HTMLInputElement).value = v; }
        public get Text(): string { return (this.View as HTMLInputElement).value; }
    }
    export enum SearchActionMode {
        None,
        Validated,
        Instantany,
        NoSearch
    }

    export class ActionText extends JControl {
        private btn_ok: Button;
        private txtInput: Input;
        public get Box() { return this.txtInput; }
        public get Icon() { return this.btn_ok; }
        public OnAction: bind.EventListener<(sender: ActionText, oldText: string, newText: string) => void> = new bind.EventListener<() => void>(this.Id);

        constructor(input?:HTMLInputElement) {
            super(document.createElement('div'));
            this.txtInput = new Input(input);
        }
        initialize() {
            this.applyStyle('csTB', 'input-group');

            var btn = new Button().applyStyle('form-control', 'glyphicon', 'glyphicon-search');
            btn.Style = ButtonStyle.Primary;
            btn.Text = '';

            var sp = new Dom('span');
            sp.applyStyle('input-group-btn');

            var inp = this.txtInput;
            inp.ToolTip = 'Entrer you email';
            inp.Placeholder = 'Entrer you email';

            this.Add(inp);
            this.Add(sp);
            sp.Add(btn);
            this.btn_ok = btn;
            this.txtInput = inp;
            this.btnClicked = this.btnClicked.bind(this);
            //this.txtChanged = this.txtChanged.bind(this);
            btn.View.addEventListener('click', this.btnClicked);
        }
        private ia: SearchActionMode = 0;
        public set AutoAction(v: SearchActionMode) {
            if (v == this.ia) return;
            switch (v) {
                case 3:
                case 0:
                    this.txtInput.View.removeEventListener('change', this);
                    this.txtInput.View.removeEventListener('keyup', this);
                    break;
                case 1:
                    this.txtInput.View.addEventListener('change', this);
                    this.txtInput.View.removeEventListener('keyup', this);
                    break;
                case 2:
                    this.txtInput.View.removeEventListener('change', this);
                    this.txtInput.View.addEventListener('keyup', this);
                    break;
            }
            var x =
                (this.txtInput.View[v ? 'addEventListener' : 'removeEventListener'] as any)('change', this);
            this.ia = v;
        }
        public get AutoAction(): SearchActionMode {
            return this.ia;
        }

        btnClicked(ev: Event) {
            var n = this.txtInput.Text;
            var o = this.ls;
            this.ls = n;
            var t = this;
            this.OnAction.Invok(this.Id, function (e) { e(t, o, n); });
        }

        txtChanged(ev: Event) {
            var n = this.txtInput.Text;
            var o = this.ls;
            if (n == o) return;
            this.ls = n;
            var t = this;
            this.OnAction.Invok(this.Id, function (e) { e(t, o, n); });
        }
        handleEvent(e: Event) {
            switch (e.type) {
                case 'click':
                    this.txtChanged(e);
                    break;
                case 'change':
                    if (e.srcElement === this.txtInput.View)
                        return this.txtChanged(e);
                    break;
                case 'keyup':
                    if (e.srcElement === this.txtInput.View) {
                        if (this.isExecuting) return;
                        this.isExecuting = true;
                        //clearTimeout(this.tout);
                        this.tout = setTimeout((t, x) => { this.isExecuting = false; t.txtChanged(e); }, 500, this, e);
                        return;
                        //return this.txtChanged(e);
                    }
                default:
                    super.handleEvent(e);
            }
        }

        private isExecuting: boolean;
        private tout = -1;
        private job = thread.Dispatcher.cretaeJob(this.txtChanged, [null], this, true);
        private ls = "";
        public set Text(v: string) { (this.txtInput.View as HTMLInputElement).value = v; }
		public get Text(): string { return (this.txtInput.View as HTMLInputElement).value; }
		public Focus() {
			this.Box.View.focus();
		}
    }
    export class CItem implements IItem {
        OnPropertyChanged(e: bind.DProperty<string, any>, m: (p: bind.PropBinding, e: bind.EventArgs<string, Page>) => void): void {

        }
        constructor(public Tag, public Content: string | HTMLElement | JControl, public Url: string, private onselect: basic.ITBindable<(menuItem: MenuItem) => void>) {
            this.Content = new Anchore(Content);
        }
        OnItemSelected(menuItem: MenuItem) {
            if (this.onselect) this.onselect.Invoke.call(this.onselect.Owner, menuItem);
        }
    }

    export class QBar<T extends IItem> extends JControl {
        private _header: NavbarHeader;
        private _container: Container;
        private _lefttabs: Navbar<T>;
        private _righttabs: Navbar<T>;
        private _colapsedZone: Dom;
        private bi;
        public set LeftTabs(v: Navbar<T>) {
            if (this._lefttabs) {
                this._colapsedZone.Remove(this._lefttabs, false);
                this._lefttabs.OnSelectedItem.Remove(this);
            }
            if (v) {
                this._colapsedZone.Add(v);
                v.OnSelectedItem.Add((s) => { if (this.OnPageSelected) this.OnPageSelected(s); }, this);
            }
            this._lefttabs = v;
        }
        public set RightTabs(v: Navbar<T>) {
            if (this._righttabs) {
                this._colapsedZone.Remove(this._righttabs, false);
                this._righttabs.OnSelectedItem.Remove(this);
            }
            if (v) {
                this._colapsedZone.Add(v);
                v.OnSelectedItem.Add((s) => { if (this.OnPageSelected) this.OnPageSelected(s) }, this);
                v.Float(HorizontalAlignement.Right);
            }
            this._righttabs = v;
        }
        public get Header(): NavbarHeader { return this._header; }

        constructor(private top: boolean) {
            super(document.createElement('ul'));
            this.OnClick = this.OnClick.bind(this);
        }
        private createItem(page: Page): MenuItem {
            let x = new MenuItem(page);
            x.OnClick = this.OnClick;
            return x;
        }
        initialize() {
            this.bi = true;
            this.applyStyle('navbar', /*'navbar-inverse',*/ this.top ? 'navbar-fixed-top' : 'navbar-fixed-bottom');
            this._header = new NavbarHeader();
            this._container = new Div();
            this._colapsedZone = new Dom('div').applyStyle('collapse', 'navbar-collapse');
            this.Add(this._container.AddRange([this._header, this._colapsedZone]));
            this.bi = false;
            this._header.OnInitialized = (x) => x.ToggleButton.CollapsedZone = this._colapsedZone;

            this._header.ToggleButton.addEventListener('click', (h, e, p) => p.Open(), this);
        }
        public Open(on?: boolean) {
            var v = this._colapsedZone.View.classList;
            v[(on == undefined ? v.contains('in') : !on) ? 'remove' : 'add']('in');
        }
        
        public OnPageSelected: (page: T) => void;
        public OnClick(page: T) {
            if (this.OnPageSelected) this.OnPageSelected(page);
        }
        public Add(child: JControl) {
            if (this.bi) super.Add(child);
            else
                this._colapsedZone.Add(child);
            return this;
        }
        public Remove(child: JControl) {
            return this._colapsedZone.Remove(child);
        }
    }
    export class Head<T extends IItem> extends JControl {
        private _container: Container;
        private _header: NavbarHeader;
        private _tabs: Navbar<T>;
        private _stabs: Navbar<T>;
        public get Menu() { return this._tabs; }
        public get SubsMenu() { return this._tabs; }

        private _colapsedZone: Dom;
        public get Header(): NavbarHeader {
            return this._header;
        }
        public get Container() {
            return this._container;
        }
        constructor(private top: boolean) {
            super(document.createElement('ul'));
            this.OnClick = this.OnClick.bind(this);
        }
        private createItem(page: Page): MenuItem {
            let x = new MenuItem(page);
            x.OnClick = this.OnClick;
            return x;
        }
        static __fields__() { return [this.DPSelectedItem] as any;}
        public Clear() {
            this._tabs.Clear();
            this._stabs.Clear();
        }
        private CClear(m: Navbar<T>) {
            for (var i = 2, l = m.Count; i < l; i++)
                m.RemoveAt(i, true);
        }

        initialize() {
            this._header = new NavbarHeader();
            this._container = new Div();
            this._colapsedZone = new Dom('div').applyStyle('collapse', 'navbar-collapse');
            this._tabs = new Navbar<T>();
            this._stabs = new Navbar<T>();
            this._stabs.Float(HorizontalAlignement.Right);

            this._stabs.OnSelectedItem.Add((s) => this.SelectedItem = s, this);
            this._tabs.OnSelectedItem.Add((s) => this.SelectedItem = s, this);
            this.Add(this._container.AddRange([this._header, this._colapsedZone.AddRange([this._tabs])]));

            this._header.OnInitialized = (x) => x.ToggleButton.CollapsedZone = this._colapsedZone;
            
            this._header.ToggleButton.addEventListener('click', (h, e, p) => {
                var v = p._colapsedZone.View.classList;
                v[v.contains('in') ? 'remove' : 'add']('in');
            }, this);
        }
        public OnClick(item: T) {
            this.SelectedItem = item;
        }

        public static DPSelectedItem = bind.DObject.CreateField<IItem, Head<IItem>>("SelectedItem", Object);
        public SelectedItem: T; 
    }

    export class Foot extends JControl {
        constructor() {
            super(document.createElement('div'));
        }
        initialize() {
            this.applyStyle('navbar', 'navbar-fixed-bottom');
            this.View.style.width = '100%';
        }
        Check(c: JControl) { return c instanceof JControl; }
    }

    export enum Keys {
        Enter = 13,
        Tab = 9,
        Esc = 27,
        Escape = 27,
        Up = 38,
        Down = 40,
        Left = 37,
        Right = 39,
        PgDown = 34,
        PageDown = 34,
        PgUp = 33,
        PageUp = 33,
        End = 35,
        Home = 36,
        Insert = 45,
        Delete = 46,
        Backspace = 8,
        Space = 32,
        Meta = 91,
        Win = 91,
        Mac = 91,
        Multiply = 106,
        Add = 107,
        Subtract = 109,
        Decimal = 110,
        Divide = 111,
        Scrollock = 145,
        Pausebreak = 19,
        Numlock = 144,
        "5numlocked" = 12,
        Shift = 16,
        Capslock = 20,
        F1 = 112, F2 = 113, F3 = 114, F4 = 115, F5 = 116, F6 = 117, F7 = 118, F8 = 119, F9 = 120, F10 = 121, F11 = 122, F12 = 123,

        AltLeft = 18,
        AltRight = 18,

        ShiftLeft = 18,
        ShiftRight = 18,

        ControlLeft = 17,
        ControlRight = 17,

        MetaLeft = 91,
        MetaRight = 91,
    }

    export enum Controlkeys {
        Alt = 18,
        Shift = 16,
        Control = 17,
        Meta = 91
    }

    export class HotKey {
        private _key: Keys;
        private __ctrl: Controlkeys;
        public get Key(): Keys { return this._key; }
        public get Control(): Controlkeys { return this.__ctrl; };

        public set Key(v: Keys) { if (Keys[v] === undefined) throw "controls key is uncorrect"; this._key = v; }
        public set Control(v: Controlkeys) { if (Controlkeys[v] === undefined) throw "controls key is uncorrect"; this.__ctrl = v; };


        public IsPressed(e: KeyboardEvent) {
            return this.checkKey(e) && this.checkControl(e);
        }
        private checkKey(e: KeyboardEvent) {
            var l = this.Key;
            if (l == null) return true;
            return e.keyCode == l;
        }
        private checkControl(e: KeyboardEvent) {
            switch (this.Control) {
                case 18:
                    return e.altKey;
                case 16:
                    return e.shiftKey;

                case 17:
                    return e.ctrlKey;

                case 91:
                    return e.metaKey;
            }
            return true;
        }
    }

    export class Page extends Control<JControl> implements basic.IDisposable, IService, IItem {    
        Tag;
        Callback(args: any) {
        }
        _fl = true;
        public get FloatLeft(): boolean { return this._fl; }
        public set FloatLeft(v: boolean) { this._fl = v; }

        public static DPTitle = Page.CreateField<string | HTMLElement | JControl, Page>('Title', Object, 'Page', (e) => {
            var t = e.__this;
        });

        getDPTitle() { return Page.DPTitle; }
        getDPUrl() { return Page.DPUrl; }

        public get Content() { return this.get(Page.DPTitle); }
        public set Content(v: string | HTMLElement | JControl) { this.set(Page.DPTitle, v); }

        public ServiceType: ServiceType = ServiceType.Main;
        public Notify: bind.EventListener<(s: IService, notifyTYpe: NotifyType) => void> = new bind.EventListener<(s: IService, notifyTYpe: NotifyType) => void>(this);

        public static DPUrl = Page.CreateField('Url', String, '#');
        public get Url() { return this.get(Page.DPUrl); }
        public set Url(v: string) { this.set(Page.DPUrl, v); }

        public static __fields__() { return [Page.DPTitle, Page.DPUrl]; }

		public HasSearch: UI.SearchActionMode;

        public getSuggessions() { return Empty; }

        public OnSearche(oldPatent: string, newPatent: string) {
        }
       
        initialize() {
        }

        Update() {
        }

        private get intern(): boolean { return !false };

        Check(c: Page) {
            return this.intern && c instanceof JControl;
        }

        constructor(protected app:App,title: string | HTMLElement | JControl, public Name: string) {
            super(document.createElement('div'));
            this.Content = title;
        }

        Dispose() {
            this.Parent.Remove(this);
            bind.DObject.prototype.Dispose.call(this);
        }

        GetLeftBar(): JControl | QBar<any> {
            return null;
        }

        GetRightBar() { return null; }

        OnItemSelected(menuItem: MenuItem) {
            this.OnSelected.Invok(this, (p) => p(this));
        }

        public _onSelected: bind.EventListener<(p: Page) => void> = new bind.EventListener<(p: Page) => void>(this, false);

        public get OnSelected() { return this._onSelected; }

        public ContextMenu: ContextMenu;

        Handled() {
            return true;
        }

        OnKeyDown(e: KeyboardEvent) {

        }
        OnPrint(): any {
        }
        public OnDeepSearche() {

        }
    }
    export class BarStack {
        private _current: IService;
        private others: IService[] = [];
        constructor(current: IService) {
            this._current = current;
        }
        public get Current() {
            if (this.others.length == 0) return this._current;
            return this.others[this.others.length - 1];
        }
        public Push(s: IService) {
            this.others.push(s);
        }
        public Pop() {
            return this.others.pop();
        }
        public Has(s: IService) {
            let c = this.others, l = c.length;
            if (this._current == s) return -1;
            for (var i = l - 1; i >= 0; i--) {
                let x = c[i];
                if (x == s) return l - i;
            }
            return 0;
        }
        public Exit() { this.others.length = 0; }
    }

    export enum HorizontalAlignement { Left, Center, Right }
    export enum VerticalAlignement { Top, Center, Bottom }

    export class Point {
        constructor(public x: number, public y: number) {
        }
    }
    var ms = ['px', '%', 'in', 'em'];
    export enum MetricType {
        Pixel, Percentage, Inch, Em
    }
    export class Metric {
        public Value: number;
        public Type: MetricType
        constructor(value: number | string, type?: MetricType) {
            if (typeof value === 'string') {
                this.fromString(value);
            } else {
                this.Value = value;
                this.Type = type;
            }
        }
        minus(v): Metric {
            if (this.Type == MetricType.Pixel) return new Metric(this.Value - v, MetricType.Pixel);
            if (this.Type == MetricType.Percentage) return new Metric(this.Value - v, MetricType.Percentage);
            if (this.Type == MetricType.Em) return new Metric(this.Value - v, MetricType.Em);
            if (this.Type == MetricType.Inch) return new Metric(this.Value - v, MetricType.Inch);
        }
        toString() { return this.Value + ms[this.Type || 0]; }
        fromString(s: string) {
            for (var i = 0; i < ms.length; i++)
                if ((<any>s).endsWith(ms[i])) {
                    this.Value = parseFloat(s);
                    this.Type = <any>i;
                    return;
                }
        }
    }

    export class Error extends JControl {
        public IsInfo: boolean;
        private container: HTMLDivElement;
        private _text: string;
        public set Message(v: string) {
            this._text = v;
            if (this.container) this.container.textContent = v;
        }
        public Expire: number;
        public get Message() { return this._text; }
        constructor() {
            super(document.createElement('div'));
        }
        initialize() {
            this.applyStyle(this.IsInfo ? 'webix_info' : 'webix_error');
            this.container = document.createElement('div');
            this.container.innerHTML = this._text;
            this._view.appendChild(this.container);
            this._view.addEventListener('mousedown', this);
        }
        handleEvent(e) {
            if (e.type == 'mousedown') {
                this._view.removeEventListener('mousedown', this);
                this.Pop();
            } else super.handleEvent(e);
        }
        public Push() {
            InfoArea.Default.Add(this);
            this.timeout = setTimeout((t: this) => { t.Pop(); }, this.Expire || 3000, this);
        }
        private timeout;
        public Pop() {
            this.applyStyle('ihidden');
            var x: any = {};
            clearTimeout(this.timeout);
            x.id = setTimeout((t: this, x) => { clearTimeout(x.id); InfoArea.Default.Remove(t); t.Dispose(); }, 2000, this, x);
        }
        Dispose() {
            this.container = null;
            this._text = null;
            super.Dispose();
        }
    }
    var ia: InfoArea;
    export class InfoArea extends Control<JControl> {
        public static get Default(): InfoArea {
            if (!ia) {
                ia = new InfoArea();
                ia.Parent = Desktop.Current;
            }
            return ia;
        }
        constructor() {
            super(document.createElement('div'));
            this.initialize();
        }
        initialize() {
            this.applyStyle('webix_message_area');
            document.body.appendChild(this._view);
        }
        Check(j: JControl) {
            return j instanceof Error;
        }
        public static push(msg: string, isInfo?: boolean, expire?: number) {
            var t = new Error();
            t.Message = msg;
            t.IsInfo = isInfo;
            t.Expire = expire;
            t.Push();
        }
    }

    export class Size {
        public w: Metric;
        public h: Metric;
        constructor(w: Metric | string | number, h: Metric | number | string) {
            if (typeof w === 'number' || typeof w === 'string') this.w = new Metric(w, 0);
            else this.w = w;
            if (typeof h === 'number' || typeof h === 'string') this.h = new Metric(h, 0);
            else this.h = h;
        }
    }
    export class Badge extends JControl {
        constructor() {
            super(document.createElement('span'));
        }
        initialize() {
            this.applyStyle('badge');
        }
        public set Content(v: any) {
            this.Clear();
            if (v instanceof HTMLElement)
                this.Add(new DivControl(v));
            else this.View.innerText = v.toString();
        }
    }
    export class DragManager {
        private View: HTMLElement;
        private loc: Point = new Point(0, 0);
        constructor(private handler: JControl, private target: JControl) {
            handler.View.addEventListener('dragstart', this);
            this.handler.View.draggable = true;
            this.View = target.View;
        }
        private mouseloc = { x: undefined, y: undefined };
        private cntloc = { x: this.loc.x, y: this.loc.y };

        handleEvent(e: DragEvent) {
            if (e.type == 'dragstart') {
                this.mouseloc = { x: e.x, y: e.y };
                this.cntloc = { x: this.target.View.offsetLeft, y: this.target.View.offsetTop };
                this.handler.View.addEventListener('dragend', this);
            }
            else if (e.type == 'dragend') {
                var c = this.cntloc;
                var m = this.mouseloc;
                this.Location = { x: c.x + (e.x - m.x), y: Math.max(0, c.y + (e.y - m.y)) };
                this.handler.View.removeEventListener('dragend', this);
            }
            if (e.type === 'resize')
                thread.Dispatcher.Push(this.RelocationJob.Set(true, true));
        }
        public set Location(l: Point) {
            this.loc = l;
            this.RelocationJob[0] = true;
            this.RelocationJob[1] = true;
            thread.Dispatcher.Push(this.RelocationJob.Set(true, true));
        }
        private RelocationJob = thread.Dispatcher.cretaeJob(this.reLocation, [], this, true);
        reLocation(hr: boolean, vr: boolean) {
            var v = this.View;
            var s = v.style;
            var l = this.loc;
            var w = window;
            if (hr) {
                s.left = l.x + px;
            }
            if (vr) {
                s.top = l.y + px;

            }
        }
    }
    export class FixedPanel extends JControl {
        private ha: HorizontalAlignement;
        private va: VerticalAlignement;
        private loc: Point = new Point(0, 0);
        private body: JControl;

        private size: Size = new Size(window.screen.availWidth / 2, window.screen.availHeight / 2);
        constructor(view?: HTMLElement) {
            super(view || document.createElement('div'));
        }

        initialize() {
            window.addEventListener('resize', this);
            this.body = new Dom('div');

            var v = this.View.style;
            //v.zIndex = "2000";
            v.display = 'block';
            v.background = 'radial-gradient( #222,black)';
            v.position = 'fixed';
            v.border = '2px gray solid';
            this.HorizontalAlignement = HorizontalAlignement.Center;
            this.VerticalAlignement = VerticalAlignement.Center;

            this.Location = { x: 200, y: 200 };
            this.Size = new Size(new Metric(90, MetricType.Percentage), new Metric(90, MetricType.Percentage));

            this.body.OnInitialized = (b) => {
                var tt = this.Height;
                this.Height = new Metric(89, MetricType.Percentage);
            }
            this.body.View.style.marginTop = '50px';
            this.body.View.style.overflow = 'auto';

            super.Add(this.body);
        }
        Check(i) {
            return i instanceof JControl;
        }
        private mouseloc = { x: undefined, y: undefined };
        private cntloc = { x: this.loc.x, y: this.loc.y };

        handleEvent(e: DragEvent) {

            if (e.type == 'dragstart') {
                this.mouseloc = { x: e.x, y: e.y };
                this.cntloc = { x: this.View.offsetLeft, y: this.View.offsetTop };
                window.document.styleSheets.item(0)
            }
            else if (e.type == 'dragend') {
                var c = this.cntloc;
                var m = this.mouseloc;
                this.Location = { x: c.x + (e.x - m.x), y: c.y + (e.y - m.y) };
            }
            if (e.type === 'resize')
                thread.Dispatcher.Push(this.RelocationJob.Set(true, true));
        }
        private static resizeBody = thread.Dispatcher.cretaeJob((t: FixedPanel) => {
            t.body.View.style.height = t.View.clientHeight + 'px';
            t.body.View.style.width = t.View.clientWidth + 'px';
        }, [], null, false);
        public set Height(v: Metric) {
            var h = v.toString();
            this.View.style.maxHeight = h;
            this.View.style.minHeight = h;
            thread.Dispatcher.Push(this.RelocationJob.Set(undefined, true));
            thread.Dispatcher.Push(FixedPanel.resizeBody, [this]);
        }
        public set Width(v: Metric) {
            var w = v.toString();
            this.View.style.maxWidth = w;
            this.View.style.minWidth = w;
            this.body.View.style.width = v.minus(5).toString();
            thread.Dispatcher.Push(this.RelocationJob.Set(true, undefined));
            thread.Dispatcher.Push(FixedPanel.resizeBody, [this]);
        }
        public set HorizontalAlignement(ha: HorizontalAlignement) {
            this.ha = ha || 0;
            thread.Dispatcher.Push(this.RelocationJob.Set(true, undefined));
        }
        public set VerticalAlignement(va: VerticalAlignement) {
            this.va = va || 0;
            thread.Dispatcher.Push(this.RelocationJob.Set(undefined, true));
        }
        public set Location(l: Point) {
            this.loc = l;
            thread.Dispatcher.Push(this.RelocationJob.Set(true, true));
        }
        public set Size(s: Size) {
            this.size = s;
            this.Width = s.w;
            this.Height = s.h;
            thread.Dispatcher.Push(this.RelocationJob.Set(true, true));
            thread.Dispatcher.Push(FixedPanel.resizeBody, [this]);
        }
        private RelocationJob = thread.Dispatcher.cretaeJob(this.reLocation, [], this, true);
        private reLocation(hr: boolean, vr: boolean) {
            var v = this.View;
            var s = v.style;
            var l = this.loc;
            var w = window;
            const px = 'px';
            if (hr) {
                switch (this.ha) {

                    case HorizontalAlignement.Left:
                        s.left = l.x + px;
                        break;

                    case HorizontalAlignement.Center:
                        s.left = (w.innerWidth - this.View.clientWidth) / 2 + px;
                        break;

                    case HorizontalAlignement.Right:
                        s.left = (w.innerWidth - this.View.clientWidth - l.x) + px;
                        break;
                }
            }
            if (vr) {
                switch (this.va) {
                    case VerticalAlignement.Top:
                        s.top = l.y + px;
                        break;

                    case VerticalAlignement.Center:
                        s.top = (w.innerHeight - this.View.clientHeight) / 2 + px;
                        break;

                    case VerticalAlignement.Bottom:
                        s.top = (w.innerHeight - this.View.clientHeight - l.y) + px;
                        break;
                }
            }
        }
        Add(child: JControl) {
            this.body.Add(child);
            return this;
        }
        AddRange(childs: JControl[]) {
            for (var i = 0, l = childs.length; i < l; i++)
                this.body.Add(childs[i]);
            return this;
        }
    }

    let intern = false;
    let _app:defs.UI.IApp = null;
    var Empty = new collection.List<any>(String);
    Empty.Freeze();

    export abstract class IApp<T extends JControl> extends Control<defs.UI.IPage | T> implements defs.UI.IApp {
        protected OnPageChanging(e: bind.EventArgs<Page,IApp<any>>) {
            
        }
        protected OnPageChanged(e: bind.EventArgs<Page, IApp<any>>) {
            var page = e._new;
            this.silentSelectPage(e._old, e._new);
            page.OnSelected.Invoke(e._new, [e._new]);
        }

        public static DPSelectedPage = bind.DObject.CreateField<Page, IApp<any>>("SelectedPage", Page, null, (e) => e.__this.OnPageChanged(e),e=> e.__this.OnPageChanging(e));
        public SelectedPage: Page;
        static __fields__() { return [this.DPSelectedPage]; }

        public Name: string;
        public abstract Foot: ServiceNavBar<IItem>;
        public abstract SearchBox: ActionText;
        public Pages: collection.List<Page> = new collection.List<Page>(Page);
        protected abstract showPage(page: Page);
        Logout() {

        }
        constructor(view) {
            super(view)
            this.PagesChanged = this.PagesChanged.bind(this);
        }
        //**************************************************************************************************************************************
        //***** ************************************************************  Pages  **********************************************************
        //**************************************************************************************************************************************
        //protected cpage: Page;
        
        protected silentSelectPage(oldPage: Page, page: Page) {
            this.Foot.Pop(oldPage);
            this.showPage(page);
            this.Foot.Push(page);
        }
        //public OnPageSelected = new bind.EventListener<(s: this, p: Page) => void>('');
        public Open(page: Page) {
            this.SelectedPage = page;
        }
        private PagesChanged(e: utils.ListEventArgs<number, Page>) {
            if (e.event == collection.CollectionEvent.Added) {
                this.Foot.Register(e.newItem);
            }
        }

        public OpenPage(pageNme: string) {
            var ps = this.Pages.AsList();
            for (var i = 0, l = ps.length; i < l; i++) {
                var p = ps[i];
                if (p.Name !== pageNme) continue;
                this.SelectedPage = p;
                return true;
            }
            return false;
        }

        public AddPage(child: Page) {
            if (child == null) return;
            this.Pages.Add(child);
        }
        
        public SelectNaxtPage() {
            var t = this.Pages;
            var i = t.IndexOf(this.SelectedPage);
            var p = t.Get(i + 1);
            if (p)
                this.SelectedPage = p;
        }

        public SelectPrevPage() {
            var t = this.Pages;
            var i = t.IndexOf(this.SelectedPage);
            var p = t.Get(i - 1);
            if (p)
                this.SelectedPage = p;
        }

        private opcd: basic.IBindable = { Owner: this, Invoke: this.PagesChanged };
        
        public Update() { }
        public OnKeyDown(e: KeyboardEvent) {
            var s = this.SelectedPage as any;
            if (s) (s as any).OnKeyDown(e);
        }
        OnPrint(): any {
            var s = this.SelectedPage;
            if (s) s.OnPrint();
        }
        public OnDeepSearche() {
            var s = this.SelectedPage;
            if (s) s.OnDeepSearche();
        }

        public OnContextMenu(e: MouseEvent) {
            var cp = this.SelectedPage;
            if (cp && cp.ContextMenu)
                cp.ContextMenu.Show(e.pageX, e.pageY);
        }
        handleEvent(e: KeyboardEvent) {

        }
        public Show() {
            if (_app != null)
                document.body.removeChild(_app.View);
            _app = this;
            Desktop.Current.Show(this);
        }

        initialize() {            
            this.Pages.Listen = this.opcd;
        }
        protected static getView() {
            let app = document.createElement('app');
            app.id = 'app-' + Date.now();
            return app;
        }
        protected searchActioned(s: ActionText, o: string, n: string) {
            this.SelectedPage.OnSearche(o, n);
        }
        OnAttached() { }
        OnDetached() { }
    }



    export class App extends IApp<Head<Page> | Page | QBar<IItem> | Foot | ContentControl | ServiceNavBar<IItem>>{
        public static DPTitle = App.CreateField<String, App>('Title', String, 'App');
        public get Title() { return this.get(App.DPTitle); }
        public set Title(v: String) { this.set(App.DPTitle, v); }

        public static DPBadge = App.CreateField<String, App>('Badge', String, null);
        public get Badge() { return this.get(App.DPBadge); }
        public set Badge(v: String) {
            this.set(App.DPBadge, v);
        }
        private static Apps: collection.List<App> = new collection.List<App>(App);
        public static get CurrentApp(): defs.UI.IApp { return _app; }
        public get Name(): string { return this.name; }
        public Head: Head<Page>;
        private AppBody: DivControl;
        public Foot: ServiceNavBar<IItem>;

        public PageBody: ContentControl;
        private AppTitle: ContentControl;
        private _search: ActionText;
        public slogant: Dom;
        public get SearchBox(): ActionText {
            if (!this._search) {
                this.Show
                this._search = new ActionText();
                this._search.OnInitialized = n => {
                    n.Box.applyStyle("inputPage");
                    n.applyStyle("actionPage");
                    n.Box.View.style.borderWidth = '0';
                    n.Box.View.style.boxShadow = '0 0 transparent';
                    n.OnAction.Add(this.searchActioned.bind(this), 'ts');
                    n.AutoAction = UI.SearchActionMode.Instantany;
                    n.addEventListener('focusout', (s, e, p) => {
                        var cp = p._this.SelectedPage;
                        var hs = cp && cp.HasSearch;
                        if (hs == UI.SearchActionMode.Instantany)
                            p.wrapper.Content = p._this.slogant;
                    }, { _this: this, wrapper: this.AppTitle });
                }
            }
            return this._search;
        }



        createTitle(t: string) {
            var div = new ContentControl();
            div.applyStyle('page_title');
            var c = new Dom('div');
            div.Content = c;
            div.addEventListener('click', (s, e, p) => {
                var cp = this.SelectedPage;
                var hs = cp && cp.HasSearch;
                if (hs !== SearchActionMode.None && hs != null) {
                    var isLabel = p.wrapper.Content == p._this.slogant;
                    if (isLabel) {
                        p.wrapper.Content = p._this.SearchBox;
                        p._this.SearchBox.Focus();
                    }
                    else
                        p.wrapper.Content = p._this.slogant;
                }
                else {
                    if (!isLabel)
                        p.wrapper.Content = p._this.slogant;
                }
            }, { _this: this, wrapper: div });
            c.View.textContent = t;
            this.slogant = c;
            return div;
        }

        constructor(private name: string) {
            super(App.getView());
        }

        protected showPage(page: Page) {
            this.PageBody.Content = page;
        }
        protected OnPageChanged(e: bind.EventArgs<Page, this>) {
            document.title = this.Title as any;
            this.slogant.View.textContent = e._new.GetValue(e._new.getDPTitle()) as string;
            super.OnPageChanged(e);
        }
        initialize() {
            super.initialize();
            this.applyStyle('app');

            this.Head = new Head<Page>(true).applyStyle('top-navbar');
            this.AppBody = new DivControl('div').applyStyle('app-body');
            this.Foot = new ServiceNavBar<IItem>(this, false).applyStyle('bottom-navbar');

            this.AppTitle = this.createTitle(this.Title as any).applyStyle('app-title');
            this.PageBody = new ContentControl().applyStyle('app-page');

            this.AppBody.Add(this.AppTitle).Add(this.PageBody);

            intern = true;
            this.Add(this.Head).Add(this.AppBody).Add(this.Foot);
            intern = false;

            this.Foot.applyStyle('appFoot', 'app-foot');
            this.PageBody.disapplyStyle('container');
        
            this.Head.OnInitialized = (h) => h.Header.OnInitialized = (h) => h.Title = this.Name;
            this.Head.Menu.Items.Source = this.Pages;
            this.Head.OnPropertyChanged(Head.DPSelectedItem, (v, e) => { this.SelectedPage = (e._new || e._old) as Page; });
            if (basic.Settings.get("AppTitleHidden") == true)
                this.AppTitle.applyStyle('hideTitle');
            else this.AppTitle.disapplyStyle('hideTitle');
        }
        public ToggleTitle() {
            if (this.AppTitle.View.classList.contains('hideTitle')) {
                basic.Settings.set("AppTitleHidden", false);
                this.AppTitle.disapplyStyle('hideTitle');
            }
            else {
                basic.Settings.set("AppTitleHidden", true);
                this.AppTitle.applyStyle('hideTitle');
            }

        }
        public IsTitleBringged() { return this.AppTitle.View.classList.contains('hideTitle'); }

        private intern: boolean = true;
        Check(page: any) {
            return ((page instanceof JControl) || (page instanceof QBar) || (page instanceof Head) || (page instanceof Foot) || (page instanceof ContentControl));
        }
        public Add(child: Page | Head<IItem> | Foot | QBar<IItem> | ContentControl | ServiceNavBar<IItem>) {
            if (child instanceof Page)
                this.AddPage(child);
            else JControl.prototype.Add.call(this, child);
            return this;
        }

        public set JPage(v: Page) {

        }
        public set JTitle(v: JControl) {
        }

        static __fields__() { return [this.DPTitle, this.DPBadge] as any; }
    }

    export abstract class AuthApp extends App {
        constructor(key, b: bind.EventListener<(v: boolean) => void>) {
            super('Authentication');
            if (authApp || !(b instanceof bind.EventListener)) throw '';
            b.On = isLogged.bind(this);
            this.OnStatStatChanged = new bind.EventListener<(auth: AuthApp, isLogged: boolean) => void>(key);
        }
        public abstract IsLogged<T>(callback: (v: boolean, param: T) => void, param: T);
        public abstract RedirectApp: defs.UI.IApp;
        public OnStatStatChanged: bind.EventListener<(auth: AuthApp, isLogged: boolean) => void>;
    }

    export enum NotifyType {
        Focuse = 0,
        UnFocus = 1
    }
    export enum ServiceType {
        Main = 0,
        Stackable = 1,
        Instantany = 3
    }

    export interface IService {
        GetLeftBar(): JControl;
        GetRightBar(): JControl;
        Handler?: EventTarget;
        ServiceType: ServiceType;
        Notify?: bind.EventListener<(s: IService, notifyTYpe: NotifyType) => void>;
        Callback(args: any);
        Handled(): boolean;
    }

    var _ = new UI.Desktop();
    
    export class FunctionGroup<T extends Function> extends Function {
        private _: T[] = [];
        private map = {};
        constructor() {
            super();
        }
        public Push(f: T, name?: string) {
            this._.push(f);
            if (name !== undefined) {
                this.map[name] = f;
            }
        }
        public Remove(name: string) {
            var t: T = this.map[name];
            if (t !== undefined) {
                var c = this._.indexOf(t);
                if (c !== -1)
                    this._.splice(c, 1);
                delete this.map[name];
            }
            return t;
        }

        public Create(): Function {
            class FunctionGroup extends Function {
                private static _ = [];
                private static map = {};
                constructor(context: any, args: any[]) {
                    super();
                    for (var i = 0; i < FunctionGroup._.length; i++) {
                        var t = FunctionGroup._[i] as () => void;
                        t.apply(context, args);
                    }
                }
                public static Push<T extends Function>(f: T, name?: string) {
                    this._.push(f);
                    if (name !== undefined) {
                        this.map[name] = f;
                    }
                }
                public static Remove<T extends Function>(name: string) {
                    var t: T = this.map[name];
                    if (t !== undefined) {
                        var c = this._.indexOf(t);
                        if (c !== -1)
                            this._.splice(c, 1);
                        delete this.map[name];
                    }
                    return t;
                }
            }
            return FunctionGroup;
        }
    }

    
    var openedModal: Modal[] = [];
    export class Modal extends JControl {
        set Content(v: UI.JControl){
            this._body.Content = v;
        }
        protected focuser: basic.focuser;
        private _searchBox;
        private abonment: ProxyAutoCompleteBox<any>;
        private getSearchBox(d: collection.List<any>) {
            if (!this._searchBox) {
                var group_cnt: UI.Div = new UI.Div().applyStyle('pull-left', 'flat');
                var btn_filter = new Glyph(Glyphs.filter, false, 'Search');
                var div = group_cnt;
                div.Add(btn_filter);
                div.Add(btn_filter);
                this.abonment = new ProxyAutoCompleteBox(new UI.Input(document.createElement('input')), d);
                this.abonment.Box.Placeholder = 'Select a Client';
                div.Add(this.abonment.Box);
                div.Enable = true;
                this._searchBox = div;
                this.abonment.OnValueChanged(this, this.callBack);
                return div;
            }

            this.abonment.DataSource = d;
            return this._searchBox;
        }
        private callBack(b: ProxyAutoCompleteBox<any>, old: any, _new) {
            if (this.onSearch)
                this.onSearch(this, b, old, _new);
        }
        public get CurrentModal() { return openedModal[openedModal.length - 1]; }
        onSearch: (modal: this, s: ProxyAutoCompleteBox<any>, oldValue: any, newValue: any) => void;
        public OnSearch(i: (modal: this, s: ProxyAutoCompleteBox<any>, oldValue: any, newValue: any) => void) {
            this.onSearch = i;
        }
        private _container: Dom;
        private _container1: Dom;
        private _fm = false;
        private _head: JControl;
        private _body: ContentControl;
        private _foot: JControl;
        private _title: Dom;
        public OkTitle(v: string): this {
            return  this.createBtn(MessageResult.ok, v);
        }
        public AbortTitle(v: string) {
            return this.createBtn(MessageResult.abort, v);
        }
        public Canceltitle(v: string): this {
            return this.createBtn(MessageResult.cancel, v);
        }

        public Title(v: string):this {
            this._ts = v;
            if (this._dtitle) this._dtitle.View.innerHTML = v;
            this.asSearch = false;
            return this;
        }
        public Search(d: collection.List<any>) {
            if (this._dtitle) {

                this._dtitle.Clear();
                this._dtitle.View.innerHTML = '';
                this._dtitle.Add(this.getSearchBox(d));
            } else this.getSearchBox(d);
            this.asSearch = true;
        }
        private asSearch: boolean;
        private drgmngr: DragManager;
        
        public SetDialog(title: string, content: JControl) {
            var t: bind.Scop;
            
            if (!this.IsInit)
                this.OnInitialized = n => {
                    n._body.Clear();
                    n.Title(title);
                    n._body.Content = content;
                }
            else {
                this._body.Clear();
                this.Title(title);
                this._body.Add(content);
            }
        }
        private static zIndex = 10000;
        public static NextZIndex() { return ++this.zIndex; }
        private _openCount: number;
        public get IsOpen() { return this._openCount > 0; }
        public Open() {
            if (this._openCount)
                if (this._openCount++ > 5)
                    this.silentClose();
                else
                    return;
            this._view.style.zIndex = Modal.zIndex++ + "";
            this._openCount = 1;
            if (this.Parent == null) {
                this.Parent = UI.Desktop.Current;
                document.body.appendChild(this.View);
            }
            this.View.classList.add('in');
            this.Visible = true;
            this.Parent.applyStyle('modal-open');

            this._view.style.display = 'block';
            
            if (!document.body.contains(this._view))
                document.body.appendChild(this.View);            
            openedModal.push(this);
            this.OnInitialized = n => {
                var c = document.activeElement as HTMLInputElement;
                c && c.blur && c.blur();
                thread.Dispatcher.call(n.focuser, n.focuser.reFocuseOn);
            }
        }

        private silentClose() {
            if (!this._openCount) return;
            var im = openedModal.indexOf(this);
            if (im != -1) openedModal.splice(im, 1);
            
            this._openCount = 0;
            if (this.Parent == null) {
                this.Parent = UI.Desktop.Current;
                document.body.appendChild(this.View);
            }
            this.View.classList.remove('in');
            this.Visible = false;
            this.Parent.disapplyStyle('modal-open');
            this._view.remove();
        }
        public Close(msg:MessageResult) {
            var e = new MessageEventArgs(this, msg ,MessageResult[msg]);
            var r = this._onClick.Invok('test', (t) => t(e));
            if (!e.stayOpen) this.silentClose();
        }
        constructor() {
            super(document.createElement('div'));
        }
        initialize() {
            this.applyStyle('modal', 'fade');
            this.View.setAttribute('role', 'dialog');

            this._container = new Dom('div').applyStyle('modal-dialog');
            this._container1 = new Dom('div').applyStyle('modal-content');

            this._head = new Dom('div').applyStyle('modal-header');
            this._body = new ContentControl().applyStyle('modal-body');
            this._foot = new Dom('div').applyStyle('modal-footer');

            this.createHeader(this._head);
            this.createFoot(this._foot);
            this._container.Add(this._container1.AddRange([this._head, this._body, this._foot]));
            super.Add(this._container);
            this.drgmngr = new DragManager(this._head, this._container1);


            this._container1.View.style.top = 30 + px;
            this.focuser = new basic.focuser(this._view, false);
        }
        private _dtitle: Dom;
        private _ts: string;
        protected createHeader(head: JControl) {
            var b = new Dom('div')
                .applyStyle('close').setAttribute('data-dismiss', 'modal').setAttribute('aria-label', 'close');
            var sp = new Dom('span').setAttribute('aria-hidden', 'true');
            sp.View.innerHTML = '&times;';
            var h4 = new Dom('h4').applyStyle('modal-title');
            if (this.asSearch) h4.Add(this._searchBox);
            else h4.View.innerHTML = this._ts == null ? 'Dialog' : this._ts;
            head.AddRange([b.Add(sp), h4]);
            b.View.onclick = (e) => this.Close(MessageResult.Exit);
            this._dtitle = h4;
        }
        //protected btnAbort: Button;
        //protected bok: Button;
        //protected bcancel: Button;
        protected createFoot(foot: JControl) {
            this.createBtn(MessageResult.ok);
            this.createBtn(MessageResult.cancel);
            ///this.createBtn(MessageResult.abort);
            
            //var b1 = new Button().applyStyle('btn-danger');
            //var b2 = new Button().applyStyle('btn-primary');
            //var b3 = new Button().applyStyle('btn-warning');

            //b1.Text = this._cancelt == null ? 'Close' : this._cancelt;
            //b2.Text = this._okt == null ? 'Save Changes' : this._okt;
            //b3.Text = this.txt_abort == null ? 'Close' : this.txt_abort;
            

            ////b1.View.onclick = (e) => this.Close(MessageResult.cancel);
            ////b2.View.onclick = (e) => this.Close(MessageResult.ok);

            //b1.addEventListener('click', this._btnClicked, this);
            //b2.addEventListener('click', this._btnClicked, this);
            //b3.addEventListener('click', this._btnClicked, this);


            //this.bcancel = b1;
            //this.bok = b2;            
            //this.btnAbort = b3;

            //foot.AddRange([b1, b2, b3]);
        }
        private events: { event: basic.DomEventHandler<any, any>, btn: Button }[] = [];
        private static casses = ['', 'btn-primary', 'btn-danger', 'btn-warning'];
        private _setText(role: MessageResult, text: string) {
            var b1 = this.events[role];
            b1.btn.Visible = text !== null && text !== "";
            b1.btn.Text = text === undefined ? MessageResult[role].toUpperCase() : text == null ? "" : text;
        }

        public SetVisible(role: MessageResult, visible: boolean) {
            var b1 = this.events[role];
            if (b1)
                b1.btn.Visible = visible;
            else {
                this.OnInitialized = n => {
                    var b1 = this.events[role];
                    if (b1) b1.btn.Visible = visible;
                    else {
                        this.createBtn(role);
                        var b1 = this.events[role];
                        b1.btn.Visible = visible;
                    }
                };
            }
        }

        private createBtn(result: MessageResult, title?: string) {
            var b1 = this.events[result];
            if ((title !== null && title!=="")  || b1)
                if (this.IsInit)
                    if (b1)
                        this._setText(result, title);
                    else this._initBtn(title, result);
                else
                    this.OnInitialized = n => n._initBtn(title, result);
            return this;
        }
        private _initBtn(title: string, result: MessageResult) {
            var b1 = this.events[result];
            if (!b1)
                if (title === null || title === "") return;
                else {
                    this.events[result] = b1 = {
                        btn: new Button().applyStyle(Modal.casses[result]),
                        event: null
                    };
                    b1.event = b1.btn.addEventListener('click', this._btnClicked, result, this);
                    this._foot.Add(b1.btn);
                }
            this._setText(result, title);
        }
        private _btnClicked(sender: Button, e: Event, t: MessageResult) {
            return this.Close(t);
        }
        public Add(child: JControl) {
            if (!this._body) this.initialize();
            this._body.Add(child);
            return this;
        }
        public Clear() {
            this._body.Clear();
        }
        public Remove(child: JControl) {
            return this._body.Remove(child);
        }

        public Insert(child: JControl, i: number) {
            this._body.Insert(child, i);
            return this;
        }

        Dispose() {
            this.silentClose();
            super.Dispose();
        }

        private _onClick = new bind.EventListener<(e: MessageEventArgs) => void | void>('test');
        public get OnClosed() { return this._onClick; }
        public OnKeyDown(e: KeyboardEvent) {
            var c = this._body.Content;
            if (c && c['OnKeyDown'] && c['OnKeyDown'](e))
                return true;
            if (e.keyCode == 27)
                this.Close(MessageResult.cancel);
            else if (e.keyCode == 13) {
                var t = this.focuser.focuse(false, e.shiftKey);
                if (t == true) {
                    var x = this.events[MessageResult.ok] || this.events[2] || this.events[3];
                    if (x) { if (x.btn.View === document.activeElement) { return false; } x.btn.Focus(); e.stopImmediatePropagation(); e.preventDefault(); }
                }
                else return t;
            }
        }
        public static _ShowDialog(title: string,
            msg: string | HTMLElement | JControl,
            callback?: (r, m: Modal) => void,
            ok?: string,
            cancel?: string): (msg: any) => void | void {
            if (this.closedMessages.length == 0) {
                var message = new Modal();
            } else {
                message = this.closedMessages.pop();
            }
            //if (message == null) message = new Modal();
            //else if (message.IsOpen) {
            
            //}
            message.OnInitialized = (m) => {
                message.Title(title == null ? 'Confirm' : title);
                if (typeof msg === 'string')
                    message._body.View.innerHTML = '<h5>' + msg + '</h5>';
                else if (msg instanceof HTMLElement) {
                    message._body.View.innerHTML = '';
                    message._body.View.appendChild(msg);
                } else {
                    message._body.View.innerHTML = '';
                    message._body.Add(msg);
                }
                message.OkTitle(ok == null ? 'Ok' : ok);
                message.Canceltitle(cancel === undefined ? 'Cancel' : cancel);
                message.OnClosed.Add((s/*, l*/) => {
                    message.OnClosed.Remove(0);
                    if (callback) callback(s.msg, s.Modal);
                    var c = Modal.closedMessages.indexOf(message);
                    if (c == -1) Modal.closedMessages.push(message);
                },
                    0);
            }
            message.Open();
            return message.Close.bind(message);
        }
        private static closedMessages: Modal[] = [];

        public static ShowDialog(title: string, msg: string | HTMLElement | JControl, callback?: (e: MessageEventArgs) => void, ok?: string, cancel?: string, abort?: string): Modal// (msg: any) => void | void
        {
            if (this.closedMessages.length == 0) {
                var message = new Modal();
            } else {
                message = this.closedMessages.pop();
            }  
            message.OnInitialized = (m) => {
                message.Title(title == null ? 'Confirm' : title);
                if (typeof msg === 'string')
                    message._body.View.innerHTML = '<h5>' + msg + '</h5>';
                else if (msg instanceof HTMLElement) {
                    message._body.View.innerHTML = '';
                    message._body.View.appendChild(msg);
                } else {
                    message._body.View.innerHTML = '';
                    message._body.Add(msg);
                }
                message.OkTitle(ok == null ? 'Ok' : ok);
                message.Canceltitle(cancel === undefined ? 'Cancel' : cancel);
                message.AbortTitle(abort);
                message.OnClosed.Add((s/*, l*/) => {
                    if (callback) callback(s);
                    if (s.stayOpen) return;
                    message.OnClosed.Remove(0);
                    var c = Modal.closedMessages.indexOf(message);
                    if (c == -1) Modal.closedMessages.push(message);
                },
                    0);
            }
            message.Open();
            return message;
        }

        setStyle(name:string,value: string): this {
            this._container.View.style[name] = value;
            return this;
        }
        setWidth(value: string): this {
            this._container.View.style.width = value;
            return this;
        }

        setHeight(value: string): this {
            this._container.View.style.height = value;
            return this;
        }

    }
    export enum MessageResult {
        Exit,
        ok,
        cancel,
        abort = 3
    }

    export class MessageEventArgs {        

        private _stayOpen: boolean;

        get stayOpen(): boolean {
            return this._stayOpen;
        }


        StayOpen() {
            this._stayOpen = true;
        }
        Close() {
            this._stayOpen = true;
        }
        constructor(public Modal: Modal, public Result: MessageResult, public msg: string) {

        }
    }
    export class Image extends JControl {
        public get Source() { return (this._view as HTMLImageElement).src; }
        public set Source(v: string) { (this._view as HTMLImageElement).src = v; }

        constructor() {
            super(document.createElement('img'));
        }
        initialize() {

        }
    }
    export class CarouselItem extends JControl {
        public Indicator: any;
        private _image: Image;
        private _caption: Div;
        constructor(url: string, caption: any) {
            super(document.createElement('div'));
            this.OnInitialized = (x) => {
                x._image.Source = url;
                if (caption instanceof HTMLElement)
                    x._caption.View.appendChild(caption);
                else if (typeof caption === 'string')
                    x._caption.View.innerText = caption;
                else throw '';
            }
        }
        initialize() {
            this.applyStyle('item');
            this._image = new Image();
            this._caption = new Div().applyStyle('carousel-caption');
            this.AddRange([this._image, this._caption]);
        }
        public set Active(v: boolean) {
            if (v) this.applyStyle('active');
            else this.disapplyStyle('active');
        }
    }
    export class Carousel extends Control<CarouselItem> {
        private _items: collection.List<CarouselItem>;
        private _indecators: Dom;
        private _inner: Div;
        private leftButton: Dom;
        private rightButton: Dom;

        constructor() {
            super(document.createElement('div'));
            this.OnInitialized = (x) => x.ItemsChanged(utils.ListEventArgs.ResetEvent);
        }
        initialize() {
            this.applyStyle('carousel', 'slide');
            this.View.setAttribute('data-ride', 'carousel');
            this._indecators = new Dom('ol').applyStyle('carousel-indicators');
            this._inner = new Div().applyStyle('carousel-inner');
            this._items = new collection.List<CarouselItem>(CarouselItem);

            this._items.Listen = this.opcd;// this.ItemsChanged.bind(this);
            this.leftButton = this.createButton(true);
            this.rightButton = this.createButton(false);

            this.fromInit = true;
            super.Add(this._indecators as any);
            super.Add(this._inner as any);
            super.Add(this.leftButton as any);
            super.Add(this.rightButton as any);
            this.fromInit = false;
        }
        private opcd: basic.IBindable = { Owner: this, Invoke: this.ItemsChanged };
        private fromInit = false;
        protected createButton(isLeft: boolean) {
            var fl = isLeft === true ? 'left' : 'right';
            var i = new Dom('a').applyStyle(fl, 'carousel-control');
            var v = i.View;
            v.setAttribute('href', '#' + this.Id);
            v.setAttribute('role', 'button');
            v.setAttribute('data-slide', isLeft === true ? 'prev' : 'next');
            var x = document.createElement('span');
            x.classList.add('glyphicon', 'glyphicon-chevron-' + fl);
            v.appendChild(x);
            return i;
        }
        private createIndecator(i: number) {
            var d = new Dom('li');
            d.View.setAttribute('data-target', '#' + this.Id);
            d.View.setAttribute('data-slide-to', i + '');
            return d;
        }
        private b: boolean;
        private ItemsChanged(e: utils.ListEventArgs<number, CarouselItem>) {
            if (this.IsInit) {
                let m = this._inner;
                let n = this._indecators;
                let t = e.newItem;
                let ind, rit: CarouselItem;
                switch (e.event) {
                    case collection.CollectionEvent.Added:
                        ind = this.createIndecator(e.startIndex);
                        m.Add(t);
                        n.Add(ind);
                        t.Indicator = ind;
                    case collection.CollectionEvent.Cleared:
                        this.Clear();
                        return;
                    case collection.CollectionEvent.Removed:
                        rit = e.oldItem;
                        n.Remove(rit.Indicator);
                        m.Remove(rit);
                        break;
                    case collection.CollectionEvent.Replace:
                        rit = e.oldItem;
                        n.Remove(rit.Indicator);
                        m.Remove(rit);

                        ind = this.createIndecator(e.startIndex);
                        m.Add(t);
                        n.Add(ind);
                        t.Indicator = ind;
                        break;
                    case collection.CollectionEvent.Reset:
                        this.Clear();
                        for (var i = 0, l = this._items.Count; i < l; i++) {
                            let c = this._items.Get(0);
                            let ind = c.Indicator || this.createIndecator(e.startIndex);
                            m.Add(c);
                            n.Add(ind);
                            c.Indicator = ind;
                        }
                        break;
                }
                this.selectNext();
            }
        }
        private selectNext() {
            var t = this._items;
            for (var i = 0, l = t.Count; i < l; i++) {
                if (t.Get(i).View.classList.contains('active')) return;
            }
            if (l > 0) t.Get(0).Active = true;
        }
        public Clear() {
            this._indecators.Clear();
            this._inner.Clear();
        }
        Check(child: CarouselItem) { return this.fromInit || child instanceof CarouselItem; }
        Add(child: CarouselItem) {
            if (this.fromInit) super.Add(child);
            else this._items.Add(child);
            return this;
        }
        Remove(child: CarouselItem) {
            this._items.Remove(child as any);
            return true;

        } RemoveAt(i: number) {
            this._items.RemoveAt(i);
            return true;
        }
    }
    export class PaginationSurf extends JControl {
        private anchore: Anchore;
        private span: Dom;
        private text: Dom;
        constructor(private isNext?: boolean) {
            super(document.createElement('li'));
            var t: Node;
        }
        initialize() {
            var a = new Anchore();
            var s = new Dom('span');
            var t = new Dom('a');
            this.anchore = a;
            this.span = s;
            this.text = t;

            if (this.isNext != null) {
                a.View.setAttribute('aria-label', this.isNext ? 'Next' : 'Previous');
                s.View.setAttribute('aria-hidden', this.isNext ? 'true' : 'false');
                if (this.isNext)
                    s.View.innerHTML = '»';
                else s.View.innerHTML = '«';
            }
            this.View.addEventListener('click', this);

            this.Add(a.AddRange([s, t]));
        }
        public set Icon(v: string) {
            this.span.View.innerHTML = v;
        }
        public set Title(v: string) {
            this.text.View.innerHTML = v;
        }
        public OnClick: (e: PaginationSurf) => void;
        handleEvent(e: MouseEvent) {
            if (this.OnClick) this.OnClick(this);
        }

    }
    export class BiPagination extends JControl {
        static __fields__() {
            return [BiPagination.DPMax, BiPagination.DPIndex];
        }
        private isc: boolean = false;
        public static DPIndex: bind.DProperty<number, BiPagination>;

        public Index: number;
        public Max: number;
        public static DPMax: bind.DProperty<number, BiPagination>;
        private prev: PaginationSurf;
        private next: PaginationSurf;
        private list: Dom;
        private actionText: Textbox;
        constructor() {
            super(document.createElement('nav'));
        }
        initialize() {

            this.list = new Dom('ul').applyStyle('pager');
            this.prev = new PaginationSurf(false).applyStyle('previous');
            this.next = new PaginationSurf(true).applyStyle('next');
            var li = new Dom('li');
            this.actionText = new Textbox().applyStyle('text-center', 'borderless');
            this.actionText.View.addEventListener('change', this);
            this.actionText.View.style.width = '80px';
            this.actionText.View.style.border = '0px';
            this.actionText.Text = '0';

            li.Add(new Anchore(this.actionText));

            this.Add(this.list.AddRange([this.prev, li, this.next]));
            this.prev.Icon = '<';
            this.prev.Title = '<<<<';

            this.next.Icon = '>';
            this.next.Title = '>>>>';
            this.next.OnClick = () => { this.Index++; }
            this.prev.OnClick = () => { this.Index--; }

        }
        handleEvent(e: Event) {
            if (this.isc) return;
            var t: HTMLInputElement;
            this.Index = parseFloat(this.actionText.Text);
        }
        static ctor() {
            this.DPMax = BiPagination.CreateField<number, BiPagination>('Max', Number, Infinity, function (e) {
                var n = e._new;
                if (e.__this.Index > n) e.__this.Index = n;
            }, function (e) {
                if (e._new < 0) e._new = 0;
            });
            this.DPIndex = BiPagination.CreateField<number, BiPagination>('Index', Number, 0, function (e) {
                e.__this.isc = true;
                e.__this.actionText.Text = e._new + '';
                e.__this.isc = false;
            }, function (e) {
                if (e._new < 0) e._new = 0;
                else if (isNaN(e._new)) e._new = isNaN(e._old) ? 0 : e._old;
                else if (e._new > e.__this.Max) e._new = e.__this.Max;
            });
        }
    }
    export class Pagination extends JControl {
        private prev: UI.PaginationSurf;
        private next: UI.PaginationSurf;
        private items: collection.List<PaginationSurf> = new collection.List<PaginationSurf>(PaginationSurf);
        public static DPRange = Pagination.CreateField<number, Pagination>('Range', Number, 0, (e) => e.__this.OnRangeChanged(e._old, e._new));
        public static DPStartIndex = Pagination.CreateField<number, Pagination>('StartIndex', Number, 0, (e) => e.__this.OnStartIndexChanged(e._new));
        public static DPCount = Pagination.CreateField<number, Pagination>('Count', Number, 10, (e) => e.__this.OnCountChanged(e._old, e._new));

        public get SelectedRange() {
            return this.get(Pagination.DPRange);
        }
        public get Count() {
            return this.get(Pagination.DPCount);
        }
        public get StartIndex() {
            return this.get(Pagination.DPStartIndex);
        }
        public set StartIndex(v: number) {
            this.set(Pagination.DPStartIndex, v);
        }
        private OnCountChanged(o: number, n: number) {
            let t: PaginationSurf;
            for (var i = o; i < n; i++) {
                this.items.Add(t = new PaginationSurf());
                t.OnClick = this.OnClick;
            }
            for (var i = n; i < o; i++) {
                t = this.items.Get(i - 1);
                var j = this.items.RemoveAt(i - 1);
                t.OnClick = null;
            }
            this.StartIndex = n * this.SelectedRange;
        }

        private OnRangeChanged(o: number, n: number) {
            this.StartIndex = n * this.Count;
        }

        private OnStartIndexChanged(n: number) {
            var c = this.Count;
            for (var i = 0; i < c; i++) {
                var t = this.items.Get(i);
                t.Icon = i + '';
            }
        }

        constructor() {
            super(document.createElement('ul'));
        }

        AddItem(page: PaginationSurf) {

        }
        initialize() {
            this.applyStyle('pagination')
            this.prev = new PaginationSurf(false);
            this.next = new PaginationSurf(true);
            //this.items.AddRange([this.prev, this.next]);
            this.Add(this.prev);
            this.Add(this.next);
            this.items.Listen = this.opcd;// this.OnItemsChanged.bind(this);

            for (var i = 0; i < 10; i++) {
                var t = new PaginationSurf();
                ((i) => t.OnInitialized = (t) => t.Icon = i.toString())(i);
                this.items.Add(t);
            }

            for (var i = 0; i < this.items.Count; i++)
                this.Add(this.items.Get(i));
        }
        private opcd: basic.IBindable = { Owner: this, Invoke: this.OnItemsChanged };
        private sp: PaginationSurf;
        OnClick(e: PaginationSurf) {
            if (this.sp) this.sp.disapplyStyle('active');
            this.sp = e;
            this.sp.applyStyle('active');
        }
        private isInRange(i: number) {
            var s = i - this.SelectedRange * this.Count;
            return s < this.Count && s >= 0;
        }
        private convert(i: number) {
            return i - this.SelectedRange * this.Count;
        }

        private OnItemsChanged(e: utils.ListEventArgs<number, UI.PaginationSurf>) {

            switch (e.event) {
                case collection.CollectionEvent.Added:
                    e.newItem.OnClick = this.OnClick;
                    var t = e.startIndex;
                    if (t < 0 || t >= this.Count)
                        this.Insert(e.newItem, t + 1);
                    break;

                case collection.CollectionEvent.Removed:
                    this.Remove(e.oldItem)
                    e.oldItem.OnClick = null;
                    break;
                case collection.CollectionEvent.Cleared:
                    var c = e.collection;
                    for (var i = 0, l = this.Count; i < l; i++) {
                        var m = c[0];
                        this.Remove(m);
                        m.OnClick = null;
                    }
                    break;
                case collection.CollectionEvent.Reset:
                    var ci = this.items;
                    for (var i = 0, l = this.Count; i < l; i++) {
                        var m = ci.Get(0);
                        this.Remove(m);
                        m.OnClick = null;
                    }
                    break;
            }
        }
    }

    export class NumericUpDown extends JControl {
        private f = false;
        public static DPValue = bind.DObject.CreateField<number, NumericUpDown>('Value', Number, 0, (e) => {

            e.__this.text.Text = (e._new == null ? 0 : e._new) + '';

        }, (e) => {
            var t = e.__this;
            var n = e._new;
            if (n == null || !isFinite(n)) {
                e._new = t.defaultValue;
            } else if (n < t.minValue) e._new = t.minValue;
            else if (n > t.maxvalue) e._new = t.maxvalue;
        });
        public get Value() { return this.get(NumericUpDown.DPValue); }
        public set Value(v) { this.set(NumericUpDown.DPValue, v); }
        static __fields__() { return [NumericUpDown.DPValue]; }
        private minValue = -Number.MAX_VALUE;
        private defaultValue = 0;
        private maxvalue = Number.MAX_VALUE;
        private sleft: Dom;
        private sright: Dom;
        private text: Input;
        constructor() {
            super(document.createElement('div'));
        }
        initialize() {
            this.applyStyle('input-group', 'input-group-lg');
            var l = new Dom('a').applyStyle('btn', 'btn-primary', 'input-group-addon', 'glyphicon', 'glyphicon-minus-sign');
            var r = new Dom('a').applyStyle('btn', 'btn-primary', 'input-group-addon', 'glyphicon', 'glyphicon-plus-sign');
            var t = new Input();
            this.AddRange([this.sleft = l, this.text = t, this.sright = r]);
            this.text.Text = '0';
            this.text.View.onchange = this.textChanged.bind(this);
            l.View.onclick = () => {
                this.Value--;
            };
            r.View.onclick = () => {
                this.Value++;
            };

        }

        private textChanged(e) {

            this.Value = parseFloat(this.text.Text);
		}
		public Focus() {
			this.text.View.focus();
		}
		public SelectAll() {
			var inp = this.text.View as HTMLInputElement;
			inp.select();
		}
    }

    export interface pair<K, P> {
        Key: K;
        Value: P;
    }
    interface INavEventArgs {
        List: NavPage;
        Item: NavPanel;
    }
    class NavList extends JControl {
        private caption: HTMLDivElement = document.createElement('div');
        public set Caption(v: string) {
            this.caption.textContent = v;
        }
        constructor() {
            super(document.createElement('div'));
            this._view.appendChild(this.caption);
        }
        initialize() {
            this.applyStyle('inavigation');
            this.caption.classList.add('icaption');
        }
        public getTemplate(child: Button) {
            return new Div().applyStyle('itab-header').Add(child);
        }
        Add(panel: NavPanel): this {
            super.Add(panel.CaptionControl);
            
            return this;
        }
        AddRange(c: NavPanel[]): this {
            throw "Not Implimented";
        }
        Remove(c: NavPanel) {
            return super.Remove(c.CaptionControl);
        }
        Insert(c: NavPanel, i: number) {
            super.Insert(c.CaptionControl, i);
            return this;
        }
        SetSeparator() {
            var i = new Div();
            i.applyStyle('separator');
            super.Add(i);
        }
    }
    export class NavPanel extends JControl implements IService {
        OnPrint(): any {
            
        }
        private title = new Div().applyStyle('icontent-header', 'hidden');
        private container = new Div();
		private caption = new Button();
        public HasSearch: UI.SearchActionMode;
        public get CaptionControl() { return this.caption; }
        public set Title(v: string | HTMLElement) {
            if (v != null && v != "") {
                if (typeof v === 'string')
                    this.title.View.textContent = v;
                else this.title.View.appendChild(v);
                this.title.disapplyStyle('hidden');
            } else {
                this.title.View.innerHTML = '';
                this.title.applyStyle('hidden');
            }
        }
        public set Caption(v: string) {
            this.caption.Text = v;
        }
        constructor(public Name: string, caption: string) {
            super(document.createElement('div'));
            this.Caption = caption;
        }

        public initialize() {
            this.applyStyle('fitHeight');
            this.container.applyStyle('fitHeight', 'nav-panel');
            
            super.Add(this.title);
            super.Add(this.container);
        }
        public Add(item: JControl) {
            this.container.Add(item);
            return this;
        }
        public AddRange(items: JControl[]) {
            this.container.AddRange(items);
            return this;
        }
        public Remove(item: JControl) {
            return this.container.Remove(item);
        }
        public RemoveAt(i: number, dispose?: boolean) {
            return this.container.RemoveAt(i, dispose);
        }
        public Clear() {
            this.container.Clear();
        }
        Update() {
        }
        GetLeftBar() {
            return null;
        }
        GetRightBar() {
            return null;
        }
        Handled() {
            return true;
        }
        get ServiceType() {
            return ServiceType.Instantany;
        }
        Callback() { }

        public OnBringIntoFront() {
        
        }
        public IsActive: boolean;
        OnKeyDown(e: KeyboardEvent) {
        }
        public OnSearche(oldPatent: string, newPatent: string) {

        }
        public OnDeepSearch() {
         
        }
        public getHelp(t: Object) {
            var l = ["primary", "success", "danger", "info", "warning"]; var k = 0;
            var s = "";
            for (var i in t) {
                s += '<div class="input-group" style="background:gray"> <span class="input-group-btn"> <label class="btn btn-' + l[(k++) % l.length] + '">' + i + '</label> </span> <label class="form-control" >' + t[i] + '</label> </div>';
            }
            UI.InfoArea.push(s, true, 10000);
        }
    }
    export class IContent extends JControl {
        constructor(private navPage:NavPage) {
            super(document.createElement('div'));
        }
        initialize() {
            this.applyStyle('icontent');
        }
        Check(item: JControl) { return true; }

        public Add(p: NavPanel) {
            this._view.appendChild(p.View);
            p.Parent = this.navPage;
            return this;
        }
        public Remove(p: NavPanel) {
            this._view.removeChild(p.View);
            p.Parent = null;
            return true;
        }
    }    
    export class NavPage extends UI.Page {
        public static DPSelectedItem = bind.DObject.CreateField<NavPanel, NavPage>("SelectedItem", NavPanel, null, NavPage.prototype._onSelectedItemChanged);
        static __fields__() { return [NavPage.DPSelectedItem] as any; }

        private _onSelectedItemChanged(e: bind.EventArgs<NavPanel, NavPage>) {
            var o = e._old;
            var n = e._new;
            if (o) {
                this.con.Remove(o);
                o.IsActive = false;
                o.CaptionControl.Parent.disapplyStyle('selected');
                o.disapplyStyle('selected');
                this.app.Foot.Pop(o);
            }
            if (n) {
                this.con.Add(n);
                n.IsActive = true;
                n.CaptionControl.Parent.applyStyle('selected');
                n.applyStyle('selected');
                n.OnBringIntoFront();
                this.app.Foot.Push(n);
            }
        }

        private con = new IContent(this);
        private nav = new NavList();
        private caption = new Button();

        public set Caption(v: string) { this.nav.Caption = v; }

        constructor(app: App, title: string | HTMLElement | JControl, name: string) {
            super(app, title, name);
        }
        private islocal: boolean;
        initialize() {            
            super.initialize();
            this._view.classList.add('inavPanel');
            this.caption.applyStyle('icaption');
            this.islocal = true;
            super.Add(this.nav);            
            super.Add(this.con);
            delete this.islocal;
        }
        public ToggleNav() {
            var v = this.nav.View;
            var x = v.classList.contains('hideNav');
            if (x) v.classList.remove('hideNav');
            else v.classList.add('hideNav');
        }
        Add(c: JControl): this {
            throw "Not Implimented";
        }
        AddRange(c: JControl[]): this {
            throw "Not Implimented";
        }

        Check(j: JControl) { return !!this.islocal; }

        public get SelectedItem() {
            return this.get(NavPage.DPSelectedItem);
        }

        public set SelectedItem(v) {
            this.set(NavPage.DPSelectedItem, v);
        }
        private children: NavPanel[] = [];
        public SetPanel(panel: NavPanel) {
            var p = this.panels[panel.Name];
            if (p) throw "this panel exist";
            this.panels[panel.Name] = panel;
            this.children.push(panel);
            var itemList = this.nav.Add(panel);
            this.events.push(panel.CaptionControl.addEventListener('click', NavPage._onItemSelected, <INavEventArgs>{ Item: panel, List: this }));
            if (!this.get(NavPage.DPSelectedItem))
                this.SelectedItem = panel;
        }
        SetSeparator() {
            this.nav.SetSeparator();
        }

        OnKeyDown(e: KeyboardEvent) {
            var s = this.SelectedItem;
            if (e.altKey)
                if (e.keyCode === UI.Keys.Down) {
                    this.SelectedItem = this.children[(1 + this.children.indexOf(s)) % this.children.length];
                    e.stopPropagation();
                    return e.preventDefault();
                } else if (e.keyCode === UI.Keys.Up) {
                    var i = this.children.indexOf(s);
                    if (i == 0) i = this.children.length;
                    this.SelectedItem = this.children[(-1 + i) % this.children.length];
                    e.stopPropagation();
                    e.preventDefault();
                    return;
                };
                  
            if (!s) return;
            (s as any).OnKeyDown(e);
        }
        OnPrint(): any {
            var s = this.SelectedItem;
            if (s) s.OnPrint();
        }
        private static _onItemSelected(s, e, p: INavEventArgs) {
            var o = p.List.SelectedItem;
            if (o) o.IsActive = false;
            var n = p.Item;
            if (n) n.IsActive = true;
            p.List.SelectedItem = p.Item;
        }
    
        private events: basic.DomEventHandler<any, any>[] = [];
        public Select(name: string):boolean {
            var p = this.panels[name];
            if (p)
                this.SelectedItem = p;
            else return false;
            return true;
        }

        public GetLeftBar() {
            var p = this.SelectedItem;
            return p && p.GetLeftBar();
        }
		public get HasSearch(): UI.SearchActionMode {
			return this.SelectedItem && this.SelectedItem.HasSearch;
		}
		public set HasSearch(v) { }
        public GetRightBar() {
            var p = this.SelectedItem;
            return p && p.GetRightBar();
        }
        public Update() {
            var n = this.SelectedItem;
            if (n) n.Update();
        }

        private panels: d = {};

        public OnSearche(oldPatent: string, newPatent: string) {
            var p = this.SelectedItem;
            if (p) p.OnSearche(oldPatent, newPatent);
        }

        public OnDeepSearche() {
            var p = this.SelectedItem;
            if (p) p.OnDeepSearch();
        }
    }
    interface d { [s: string]: NavPanel; }

    
}



export namespace UI {
    export interface ITemplateShadow {
        setDataContext(data: any);
        getDataContext();
    }
    export abstract class TemplateShadow extends JControl implements ITemplateShadow {
        abstract setDataContext(data: any);
        abstract getDataContext();
        public static Create(item) {
            var isscop = item instanceof bind.Scop;
            var c = document.createElement('label');
            c.textContent = ((isscop ? item.Value : item) || '').toString();
            return new ScopicTemplateShadow(c, isscop ? item : new bind.ValueScop(item));
        }
        abstract getScop(): bind.Scop;
        public abstract get Controller(): bind.Controller;

    }
    export class ScopicTemplateShadow extends TemplateShadow {
        public get Controller(): bind.Controller { return this.cnt; }
        private cnt = new bind.Controller(this);
        setDataContext(data: any) { if (this.scop) this.scop.Value = data; }
        getDataContext() { return this.scop ? this.scop.Value : null; }
        constructor(dom: HTMLElement, private scop?: bind.Scop) {
            super(dom);
            if (!scop) stop();
        }
        initialize() {
            if (this.scop == undefined) {
                var c = this._view.getAttribute('db-bind');
                if (c)
                    if (c.indexOf('$')===0)
                        this.scop = bind.Scop.Create(c);// bind.NamedScop.Create(c.substring(1));
            }
            
            var oldAttribute = this._view.getAttribute('db-bind');
            this._view.setAttribute('db-bind', '~' + bind.AnonymouseScop.Register(this.scop) + (oldAttribute && oldAttribute != '' ? '.' + oldAttribute : ''));
            this.cnt.processHowEver = true;
            this.cnt.View = this._view;
        }
        Check(c: JControl) {
            return false;
        }
        public get Scop() { return this.scop; }
        public getScop() { return this.scop; }
        Dispose() {
            stop();
        }
    }


    export class EScopicTemplateShadow  {
        public get Controller(): bind.Controller { return this.cnt; }
        private cnt:bind.Controller;
        setDataContext(data: any) { if (this.scop) this.scop.Value = data; }
        getDataContext() { return this.scop ? this.scop.Value : null; }
        constructor(private control: JControl, private scop?: bind.Scop) {
            this.cnt = new bind.Controller(control);
            this.initialize();
        }
        initialize() {
            if (this.scop == undefined) {
                var c = this.control.View.getAttribute('db-bind');
                if (c)
                    if (c.indexOf('$') === 0)
                        this.scop = bind.Scop.Create(c);
            }

            var oldAttribute = this.control.View.getAttribute('db-bind');
            this.cnt.Scop = this.scop;
            this.control.View.setAttribute('db-bind', '~' + bind.AnonymouseScop.Register(this.scop) + (oldAttribute && oldAttribute != '' ? '.' + oldAttribute : ''));
            this.cnt.processHowEver = true;
            this.cnt.View = this.control.View;
        }
        Check(c: JControl) {
            return false;
        }
        public get Scop() { return this.scop; }
        public getScop() { return this.scop; }

    }

    export interface ITemplate {
        CreateShadow<T>(data: T | bind.Scop): TemplateShadow;

    }

    export abstract class Template implements ITemplate {
        //private template: mvc.ITemplate;
        /**
        *   if(data is scop) scop=data;
        *   if(data is undefined) scop=null;
        *   else scop=new ScopValue(data);
        **/
        abstract CreateShadow<T>(data?: T | bind.Scop): TemplateShadow;
        public static ToTemplate(itemTemplate: conv2template, asTemplate: boolean): Template {
            if (itemTemplate instanceof Template)
                return itemTemplate;
            else if (itemTemplate instanceof HTMLTemplateElement)
                return new HtmlTemplate(itemTemplate.content.firstElementChild as any, true);
            else if (itemTemplate instanceof HTMLElement)
                return new HtmlTemplate(itemTemplate, asTemplate);
            else
                return new ScopicTemplate(ListAdapter._getTemplate(itemTemplate));
        }

    }

    export class HtmlTemplate implements Template {
        private asTemplate: boolean;
        constructor(public dom: HTMLElement, asTemplate?: boolean) {
            if (dom instanceof HTMLTemplateElement) {
                this.dom = dom.content.firstElementChild as any;
                this.asTemplate = true;
            } else
                this.asTemplate = !!asTemplate;
            Object.freeze(this);
        }
        //private template: mvc.ITemplate;
        /**
        *   if(data is scop) scop=data;
        *   if(data is undefined) scop=null;
        *   else scop=new ScopValue(data);
        **/
        CreateShadow<T>(data?: T | bind.Scop): TemplateShadow {
            return new ScopicTemplateShadow(this.asTemplate ? this.dom.cloneNode(true) as HTMLElement : this.dom, data instanceof bind.Scop ? data : new bind.ValueScop(data));
        }

    }
    export class ScopicTemplate implements Template {
        private template: mvc.ITemplate;
        /**
        *   if(data is scop) scop=data;
        *   if(data is undefined) scop=null;
        *   else scop=new ScopValue(data);
        **/
        CreateShadow<T>(data?: T | bind.Scop): TemplateShadow {
            return new ScopicTemplateShadow(this.template.Create(), data instanceof bind.Scop ? data : (new bind.ValueScop(data)));
        }
        constructor(templatePath: string | mvc.ITemplate) {
            this.template = typeof templatePath === 'string' ? mvc.MvcDescriptor.Get(templatePath) : templatePath;
            if (this.template == null) { throw new $Error("the template { " + templatePath + " } was not found");  }
        }
    }
    var actions: ((e: utils.ListEventArgs<number, any>) => void)[];
    function OnItemClicked(s: TemplateShadow, e: Event, t: ListAdapter<any, any>) {
        e.stopPropagation();
        e.preventDefault();        
        t.Select(s);
    }
    export class TControl<T> extends JControl {

        public static DPData: bind.DProperty<any, TControl<any>>;
        public Data: T; 
        static __fields__() { return [this.DPData]; }
        static ctor() {
            this.DPData = bind.DObject.CreateField<any, TControl<any>>("Data", Object, null, TControl.prototype.OnDataChanged);
        }
        public static Me: any = new Object();
        constructor(itemTemplate: mvc.ITemplate | string | Function | Template | HTMLElement, private data: T | bind.Scop) {
            super(null);
            this._template = Template.ToTemplate(itemTemplate, false);
            if (this._template == null) {}
            this.Shadow = this._template.CreateShadow(data === TControl.Me ? this : data);
            this.Shadow.Parent = this;
            this._view = this.Shadow.View;
        }
        protected OnFullInitialized() {
            var c = this.Shadow.Controller;
            c && (c.OnCompiled = <basic.ITBindable<(cnt: bind.Controller) => void>>{ Owner: this, Invoke: this._onTemplateCompiled });
            super.OnFullInitialized();
        }
        private _onTemplateCompiled(cnt: bind.Controller) {
            this.compiled = true;
            this.OnCompileEnd(cnt);
            this._onCompiled.PInvok(this, [this, cnt]);
        }
        protected OnCompileEnd(cnt: bind.Controller) {

        }
        private Shadow: TemplateShadow;
        public getScop() { return this.Shadow instanceof ScopicTemplateShadow ? (this.Shadow as ScopicTemplateShadow).Scop : null; }
        private _template: Template;
        initialize() {
        }

        public _onCompiled = new bind.EventListener<(s: this, cnt: bind.Controller) => void>(this, true);
        private compiled = false;
        public set OnCompiled(m: (s: this) => void) {
            if (this.compiled) m(this);
            else this._onCompiled.On = m;
        }
        public get IsCompiled() {
            return this.compiled;
        }
        OnDataChanged(e: bind.EventArgs<T, this>) {
            this.Shadow.setDataContext(e._new);
        }
    }
    
    export class ListAdapter<T,P> extends TControl<P> {
        private garbage: TemplateShadow[] = [];
        public static __fields__() { return [ListAdapter.DPSelectedIndex, ListAdapter.DPTemplate, ListAdapter.DPSource]; }
        public static DPSource = bind.DObject.CreateField<collection.List<any>, ListAdapter<any, any>>('Source', collection.List, null, (e) => {
            var t = e.__this;
            if (e._old) e._old.Unlisten = e.__this.sli;
            if (e._new) e._new.Listen = e.__this.sli;
            if (t.IsInit)
                t.Reset(e as any);
        }, (e) => { if (e.__this.IsInit) e.__this.Clear(); });

        public get Source() { return this.get<collection.List<any>>(ListAdapter.DPSource); }
        public set Source(v: collection.List<any>) { this.set<collection.List<any>>(ListAdapter.DPSource, v); }

		public static DPSelectedIndex = bind.DObject.CreateField<number, ListAdapter<any, any>>('SelectedIndex', Number, -1,
			(e) => e.__this.OnSelectedIndexChanged(e._old, e._new),
			(e) => {
				var s = e.__this.Source;
				var l = s == null ? 0 : s.Count;
                var n = e._new;
                if (isNaN(n) || n == undefined) e._new = n = e.__this.AcceptNullValue ? -1 : l > 0 ? 0 : -1;
				else if (n < 0) e._new = e.__this.AcceptNullValue ? -1 : l > 0 ? 0 : -1;
				else if (n >= l) e._new = e.__this.AcceptNullValue ? l : l - 1;
			});
        public AcceptNullValue: boolean = true;
        private swap(i: number): number {
            var s = this.Source;
            var l = s == null ? 0 : s.Count;
            var n = i;
            if (n < 0) return -1;
            else if (n >= l)
                return l - 1;
            return i;
        }
        public get SelectedIndex() { return this.get<number>(ListAdapter.DPSelectedIndex); }
        public set SelectedIndex(v: number) { this.set<number>(ListAdapter.DPSelectedIndex, v); }

        public static DPItemStyle = bind.DObject.CreateField<string[], ListAdapter<any,any>>('ItemStyle', Array, undefined, (e) => {
            var t = e.__this._content;
            if (!t) return;
            var n = e._new;
            var o = e._old;
            for (var i = 0, l = t.Count; i < l; i++) {
                var c = t.getChild(i).View.classList;
                if (o)
                    c.remove.apply(c, o);
                if (n)
                    c.add.apply(c, n);
            }
        });

        public get ItemStyle(): string[] {
            return this.get(ListAdapter.DPItemStyle);
        }
        public set ItemStyle(v: string[]) {
            this.set<string[]>(ListAdapter.DPItemStyle, v);
        }

        public static DPTemplate = bind.DObject.CreateField<ITemplate, ListAdapter<any,any>>('Template', Object, null, (e) => e.__this.Recycle(), (e) => {
            if (e._new)
                if (typeof e._new.CreateShadow !== 'function') e.IsValid = false;
        });
        public get Template(): ITemplate {
            return this.get(ListAdapter.DPTemplate);
        }
        public set Template(v: ITemplate) {
            this.set<ITemplate>(ListAdapter.DPTemplate, v);
        }
        public OnItemSelected = new bind.EventListener<(s: ListAdapter<T,P>, index: number, template: TemplateShadow, oldIndex?: number, oldTemplate?: TemplateShadow) => void>('');
        public OnItemInserted = new bind.EventListener<(s: ListAdapter<T,P>, index: number, data: T, template: TemplateShadow) => void>('');
        public OnItemRemoved = new bind.EventListener<(s: ListAdapter<T,P>, index: number, data: T, template: TemplateShadow) => void>('');

        private _content: Control<TemplateShadow>;
        public get Content() { return this._content; }
        public _selectedItem: TemplateShadow;

        public get SelectedChild() { return this._selectedItem; }
        public get SelectedItem(): T { return this._selectedItem == null ? undefined : this._selectedItem.getDataContext(); }
        public activateClass: string;
        private OnSelectedIndexChanged(_old: number, _new: number) {
            var x = this._content.getChild(_new) as TemplateShadow;// this._selectedItem;
            var lx = this._content.getChild(_old) as TemplateShadow;// this._selectedItem;
            var li = _old;
            if (lx)
                lx.disapplyStyle(this.activateClass || 'active');
            if (x)
                x.applyStyle(this.activateClass || 'active');
            this._selectedItem = x;
            if ( _old !== _new) {
                this.OnItemSelected.Invoke('', [this, this.SelectedIndex, x, li, lx]);
                return true;
            }   
        }

        public Select(t: TemplateShadow) {
            this.SelectedIndex = this._content.IndexOf(t);
        }
        public SelectItem(t: T) {
            var s = this.Source;
            if (s)
                this.SelectedIndex = s.IndexOf(t);
        }
        public static _getTemplate(template: mvc.ITemplate | string | Function): mvc.ITemplate {
            switch (typeof template) {
                case 'string':
                    return mvc.MvcDescriptor.Get(template as string);
                case 'function':
                    return mvc.MvcDescriptor.GetByType(template as Function).Get(0);
                default:
                    if (template instanceof mvc.ITemplate)
                        return template;
                    var c = mvc.MvcDescriptor.GetByType(template as Function);
                    return c ? c.Get(0) : undefined;
            }
        }
        public static _getTemplateShadow(template: mvc.ITemplate | string | Function | HTMLElement): HTMLElement {
            if (template instanceof HTMLElement) return template;
            var t = ListAdapter._getTemplate(template as (mvc.ITemplate | string | Function));
            return t == undefined ? document.createElement('div') : t.Create();
        }

        static ctor() {
            actions = [this.prototype.OnAdd, this.prototype.OnRemove, this.prototype.OnReplace, this.prototype.OnClear, this.prototype.Reset];
        }

        constructor(template: conv2template, itemTemplate?: conv2template, data?: P,getSourceFromScop?:boolean) {
            super(template || document.createElement('div'), data);
            this.initTemplate(itemTemplate, getSourceFromScop);
        }
        private params: { template: conv2template, itemTemplate?: conv2template, data?: P, getSourceFromScop?: boolean };
        private initTemplate(itemTemplate?: conv2template, getSourceFromScop?: boolean) {
            var dom = this._view;
            var x = $('[db-content]', dom)[0] || dom;
            var attSI = $('[attach-SelectedItem]', dom)[0];
            if (attSI)
                this.AttachSelectedItem(attSI);
            if (getSourceFromScop)
                this.getSourceFromScop(x);
            this._content = new DivControl(x) as any;
            var itemStyle = dom.getAttribute('item-style') || x.getAttribute('item-style');
            if (itemStyle)
                this.ItemStyle = itemStyle.split(' ');
            this.Template = Template.ToTemplate(itemTemplate || ListAdapter.getTemplate(x) || this._content.View.getAttribute('item-template') || dom.getAttribute('item-template'), true);
            this._content.Parent = this;
        }
        private static getFirstChild(dom: DocumentFragment) {
            var f = dom.firstChild;
            var node: Node;
            while (f) {
                if (f instanceof Element) return f;
                if (!node && f instanceof Node) node = f;
                f = f.nextSibling;
            }
            return node;
        }
        private static getTemplate(d: HTMLElement) {
            var t = d.children;
            for (var i = 0, l = t.length; i < l; i++) {
                var x = t[i];
                if (basic.polyfill.IsTemplate(x)) {
                    var w = ListAdapter.getFirstChild((x as any).content) as HTMLElement;
                    x.remove();
                    return w;
                }
            }
        }
        private sli: basic.IBindable = <basic.IBindable>{ Owner: this, Invoke: this.OnSourceChanged };
        private getSourceFromScop(x:HTMLElement) {
            x.setAttribute('db-cmd', ScopicCommand.Register({ Invoke: this.CmdExecuter, Owner: this }));
        }
        private CmdExecuter(n: string, d: HTMLElement, s: bind.Scop) {
            ScopicCommand.Delete(n);
            this._scop = s;
            this.Source = s.Value;
            this.RlSourceScop = new bind.TwoBind(bind.BindingMode.TwoWay, s, this, bind.Scop.DPValue, ListAdapter.DPSource);
            this.Source = s.Value;
        }

        private AttachSelectedItem(x: HTMLElement) {
            x.setAttribute('db-cmd', ScopicCommand.Register({ Invoke: this.CmdAttacheSelectedItemExecuter, Owner: this }));
        }
        private CmdAttacheSelectedItemExecuter(n: string, d: HTMLElement, s: bind.Scop) {
            ScopicCommand.Delete(n);            
            this.OnPropertyChanged(ListAdapter.DPSelectedIndex, function(s, e)  {
                this.s.Value = this.t.SelectedItem;
            }, { t: this, s: s });
            //this.RlSourceScop = new bind.TwoBind(bind.BindingMode.BiDirection, this, s, ListAdapter.DPSelectedIndex, bind.Scop.DPValue);
        }

        private RlSourceScop: bind.TwoBind<collection.List<any>>;
        initialize() {
            //this.initTemplate(this.params[1], this.params[2], this.parent[3]);
            var s = this.Source;
            this.Content.OnInitialized = (n) =>
                this.Reset(s ? new utils.ListEventArgs(null, null, null, collection.CollectionEvent.Reset, s.AsList()) : undefined);
        }
        private OnSourceChanged(e: utils.ListEventArgs<number, T>) {
            if (this.Template)
                actions[e.event].call(this, e);
        }
        private ReSelect() {
            var i = this.get<number>(ListAdapter.DPSelectedIndex);
            var j = this.swap(i);
            if (i !== j) {
                this.SelectedIndex = j;
                return true;
            }
            return this.OnSelectedIndexChanged(i, j);
        }
        private _scop;
        private get Scop() {
            if (!this._scop) {
                var pscop = super.getScop();
                if (pscop) return pscop;                
                this._scop = bind.NamedScop.Create(null, this.Source)
                return this._scop;
            }
        }
        private _insert(item: T, i: number) {
            this.count++;
            var ch = this.garbage.pop();
            var t = this.Template;
            if (ch === undefined) {
                ch = t == null ? TemplateShadow.Create(item) : this.Template.CreateShadow(item);
                var sc = ch.getScop();
                if (sc && typeof sc["setParent"] === 'function')
                    (sc as bind.ValueScop).setParent(this.Scop);
            }
            else ch.setDataContext(item);

            if (i)
                this.Insert(ch, i);
            else this.Add(ch);
            if (i == undefined) i = this.Source.Count - 1;
            var h = (ch as any).__events;
            if (h != undefined)
                h.Dispose();
            (ch as any).__events = ch.addEventListener('click', OnItemClicked, this);
            var c = ch.View.classList;
            if (this.ItemStyle) c.add.apply(c, this.ItemStyle);
            this.OnItemInserted.Invok('', (f) => f(this, i, item, ch));
            var r = this.ReSelect();            
            if (!r && i == this.SelectedIndex)
                this.OnItemSelected.Invoke('', [this, i, ch, i, this._content.getChild(i)]);
            
        }
        private _remove(item: T, i: number) {
            var ch = this._content.getChild(i) as TemplateShadow;
            if (!ch) return;
            var res = i === this.SelectedIndex;
            this.garbage.push(ch);
            this.count--;
            ch.disapplyStyle(this.activateClass || 'active');
            this._content.RemoveAt(i, false);
            var h = (ch as any).__events;
            if (h != undefined) {
                h.Dispose();
                (ch as any).__events = undefined;
            }
            var c = ch.View.classList;
            if (this.ItemStyle)
                c.remove.apply(c, this.ItemStyle);
            this.OnItemRemoved.Invok('', (f) => f(this, i, item, ch));
            var r = this.ReSelect();
            if (!r && i == this.SelectedIndex)
                this.OnItemSelected.Invoke('', [this, i, this.Source.Get(i), i, ch]);
        }

        private count = 0;

        private OnAdd(e: utils.ListEventArgs<number, T>) {
            
            this._insert(e.newItem, e.startIndex);
        }

        private OnClear(e?: utils.ListEventArgs<number, T>) {
            this.SelectedIndex = -1;
            this.garbage.push.apply(this.garbage, this.CloneChildren());
            if (e && e.collection && this.count > 0)
                for (var i = e.collection.length - 1; i >= 0; i--)
                    this._remove(e.collection[i], i);
            
            this.count = 0;
        }

        private OnRemove(e: utils.ListEventArgs<number, T>) {
            this._remove(e.oldItem, e.startIndex);
        }

        private OnReplace(e: utils.ListEventArgs<number, T>) {
            (<TemplateShadow>this._content.getChild(e.startIndex)).setDataContext(e.newItem);
        }

        private Reset(e?: utils.ListEventArgs<number, T>) {
            var c = this.Source;
            this.OnClear(e);
            if (c)
                for (var i = 0, l = c.Count; i < l; i++)
                    this._insert(c.Get(i), i);
        }

        private clearGarbage() {
            for (var i = 0, l = this.garbage.length; i < l; i++)
                this.garbage[i].Dispose();
            this.garbage.length = 0;
        }

        private Recycle() {
            this.clearGarbage();
            this.Clear();
            this.Reset();
        }

        Dispose() {
            var h = this.OnDispose();
            if (h === null) return;
            this.Source.Unlisten = this.sli; this.sli = null;
            this.clearGarbage();
            this._content.Dispose();
            this._content = null;
            super.Dispose();
            if (!h) this.DisposingStat = 2;
        }

        Add(child: JControl) {
            this._content.Add(child as any);
            return this;
        }
        AddRange(children: JControl[]) {
            this._content.AddRange(children);
            return this;
        }
        Remove(child: JControl, dispose: boolean) {
            return this._content.Remove(child as any);
        }
        RemoveAt(i: number, dispose: boolean) {
            return this._content.RemoveAt(i, dispose);
        }
        Clear(dispose?: boolean) {
            var c = this.Source;
            if (c) {
                for (var i =this.Content.Count - 1; i >= 0; i--)
                    this._remove(c.Get(i), i);
            }
        }
        Insert(c: JControl, i: number) {
            this._content.Insert(c as any, i);
            return this;
        }
        CloneChildren() { return this._content.CloneChildren(); }
        Check(c: JControl) {
            return c instanceof TemplateShadow;
        }
        public OnKeyDown(e: KeyboardEvent):boolean {
            if (e.keyCode == UI.Keys.Down)
                this.SelectedIndex++;
            else if (e.keyCode == UI.Keys.Up)
                this.SelectedIndex--;
            else if (e.keyCode == UI.Keys.End)
                this.SelectedIndex = Number.MAX_VALUE;
            else if (e.keyCode == UI.Keys.Home)
                this.SelectedIndex = -1;
            else return false;
            e.preventDefault();
            e.stopPropagation();
            return true;
        }
    }

    export class Spinner extends JControl {
        private container: HTMLElement;
        private circle: HTMLDivElement;
        private message: HTMLParagraphElement;

        constructor(test) {
            super(document.createElement('div'));
        }
        initialize() {
            this.container = document.createElement('div');
            this.circle = document.createElement('div');
            this.message = document.createElement('p');
            this.message.textContent = 'Wait';

            this.applyStyle('full-fixedlayout');
            this.container.classList.add('spinner');
            this.circle.classList.add('spinner-circle');
            this.message.classList.add('spinner-message');

            this.container.appendChild(this.circle);
            this.container.appendChild(this.message);
            this._view.appendChild(this.container);

        }
        private isStarted = false;
        public Start(logo: string) {
            this.OnInitialized = (l) => l.circle.classList.add('spinner-start');
            this.Parent = Desktop.Current;
            this.Message = logo || 'Wait';
            document.body.appendChild(this.View);
            this.isStarted = true;
        }
        public Pause() {
            if (this.isStarted) {
                this.Parent = null;
                this.circle.classList.remove('spinner-start');
                document.body.removeChild(this.View);
            }
            this.isStarted = false;
        }
        public set Message(v: string) { this.message.textContent = v; }
        public static Default: Spinner = new Spinner(undefined);
    }
    (() => {
        var e = document.getElementById('spinner');
        if (e) {
            e.parentElement.removeChild(e);
        }
        Spinner.Default.Start("Loadding");
    })();
    var t = Date.now();
    export class RichMenu<T> extends JControl {
        private menu: Div;
        private adapter: ListAdapter<T, any>;
        private itemTemplate: Template;
        constructor(itemTemplate?: conv2template, data?: T[], parent?: JControl) {
            super(document.createElement('div'));
            this._view.classList.add('full-fixedlayout1');
            this._view.addEventListener('click', this);

            if (itemTemplate)
                this.itemTemplate = Template.ToTemplate(itemTemplate, false);
            if (parent === void 0)
                this.Parent = UI.Desktop.Current;
            else this.Parent = parent;
            if (data)
                this.OnInitialized = rm => rm.Data = data;
        }
        handleEvent(e) {
            this.Close(true);
        }
        initialize() {
            this.menu = new Div().applyStyle('contextmenu', 'panel');            
            
            this.adapter = new ListAdapter<T,any>(document.createElement('div'), 'menu.simple').applyStyle('panel-body', 'verticalList');            
            this.adapter.ItemStyle = ['focusable'];
            this.adapter.AcceptNullValue = true;
            this.Add(this.menu.Add(this.adapter));
            this.menu.View.style.backgroundColor = '#333';
            this.menu.View.style.color = 'white';

            this.adapter.OnItemSelected.On = (x, k, j) => {
                if (k == -1) return;
                if (!this.isOpen) return;
                this.Close(true);
                if (this.i && j)
                    this.i.Invoke.call(this.i.Owner, this, j.getDataContext());
            }          
        

            this.menu.addEventListener('mouseleave', function (s, e, p) {
                p.Close(false);
            }, this);

            this.menu.addEventListener('mouseenter', function (s, e, p) {
                clearTimeout(p.timeout);
            }, this);

            this._view.style.zIndex = '2000000';

        }
        private timeout: number;
        private isOpen: boolean = false;
        
        private i: basic.ITBindable<(r: RichMenu<T>, si: T) => void>
        private toInt(b: boolean) { return b === false ? 0 : b == null ? -0.5 : -1; }
        public Open(e: MouseEvent, callback:basic.ITBindable<(r: RichMenu<T>, si: T) => void>,left:boolean,bottom:boolean) {
            if (this.isOpen == true) return;
            this.adapter.SelectedIndex = -1;
            this.menu.disapplyStyle('chide');
            var mn = this.menu.View;
            var v = this.menu.View.style;            
            e = { x: e.x, y: e.y } as any;            
            this.adapter.SelectedIndex = -1;
            document.body.appendChild(this._view);
            this.i = callback;
            this.isOpen = true;
            thread.Dispatcher.call(this, () => {
                var l = (this.toInt(left) * mn.clientWidth + e.x);
                var p = (this.toInt(bottom) * mn.clientHeight + e.y);

                v.left = (l < 0 ? 0 : l) + px;
                v.top = (p < 0 ? 0 : p) + px;
            });
        }
        public Close(imediate: boolean) {
            if (this.isOpen==false) return;            
            if (imediate)
            {
                this.isOpen = null;
                this.menu.applyStyle('chide');
                setTimeout(() => {
                    this.isOpen = false;
                    this._view.remove();
                }, 500);
                this.adapter.SelectedIndex = -1;
            }
            else
                this.timeout = setTimeout((p) => p.Close(true), 1500, this);
        }
        public set Data(items: any[]) {
            var a = this.adapter;
            if (a.Source) {
                a.Source.Clear()
                a.Source.AddRange(items);
            } else
                a.Source = new collection.List(Object, items);
        }
    }

    (window as any).rm = RichMenu;
    (window as any).rmt = () => {
        var rm = new RichMenu();
        
        rm.Parent = UI.Desktop.Current;
        rm.OnInitialized = rm => {
            rm.Data = ["File", "Save", "Close", "Discart"];
            document.addEventListener('click', function (e) {
                ii = (ii + 1) % lst.length;
                rm.Open(e, { Owner: null, Invoke: function (r, s) {  } }, lst[ii], lst1[ii]);
                e.stopPropagation();
                e.preventDefault();
            });
        }
        var lst = [null, null, null, true, true, true, false, false, false];
        var lst1 = [null, true, false, null, true, false, null, true, false];

        var ii = 0;
    }
    export interface IContextMenuItem {
        Title: string;
        Shortcut?: string;
        Icon?: string;
    }
   export enum Location {
        Left = 1,
        Top = 2,
        Right = 4,
        Bottom = 8,

        HCenter = Left | Right,
        VCenter = Top | Bottom,

        Center = VCenter | HCenter,
        TopLeft = Left | Top
    }
    
   export class ExContextMenu extends JControl {
       public static DPTitle = bind.DObject.CreateField<string, ExContextMenu>('Title', String, 'Menu');
       public static DPItems = bind.DObject.CreateField<collection.List<IContextMenuItem>, ExContextMenu>('Items', collection.List);
       public Title: string;
       public Items: collection.List<IContextMenuItem>;
       static __fields__() { return [this.DPTitle, this.DPItems]; }
       private dic = new collection.Dictionary<TemplateShadow, any>('');
       private list = new UI.ListAdapter<IContextMenuItem, any>("templates.contextmenu", undefined, this, true);
       private static zIndex = 20000;
       public static get NextZIndex() { return ++this.zIndex; }
       constructor(items?: IContextMenuItem[]) {
           super(document.createElement('div'));
           this.Items = new collection.List<IContextMenuItem>(Object, items);
       }
       initialize() {
           this.applyStyle("fit");
           this.list.OnItemSelected.Add(this.OnItemSelected.bind(this));
           this.list.OnItemInserted.Add(this.OnItemInserted.bind(this));
           this.list.OnItemRemoved.Add(this.OnItemRemoved.bind(this));
           this.list.applyStyle('shadow')
           this._view.addEventListener('mousedown', this);
           this.Add(this.list);
       }
       private OnItemSelected(lst: UI.ListAdapter<IContextMenuItem, any>, i: number, tmp: UI.TemplateShadow, oldi: number, oldtmp: UI.TemplateShadow) {

       }
       private OnItemInserted(lst: UI.ListAdapter<IContextMenuItem, any>, i: number, data: IContextMenuItem, cnt: UI.TemplateShadow) {
           var t = { p: this, cnt: cnt, data: data, handleEvent: function (e) { this.p.Action(this.cnt, this.data, e); } };
           this.dic.Set(cnt, t);
           cnt.applyStyle('focusable');
           cnt.View.addEventListener('click', t);
       }

       private OnItemRemoved(lst: UI.ListAdapter<IContextMenuItem, any>, i: number, data: IContextMenuItem, cnt: TemplateShadow) {
           var t = this.dic.Get(cnt);
           var v = cnt.View;
           v.removeEventListener('click', t);
           this.dic.Remove(cnt);
       }
       private Action(cnt: TemplateShadow, data: IContextMenuItem, e: Event) {
           e.stopPropagation();
           e.preventDefault();
           this.OnAction.PInvok('', [this, data]);
           this.Close();
       }
       public OnAction = new bind.EventListener<(sender: this, selected: IContextMenuItem) => void>('', false);
       public location: Location = Location.TopLeft;
       ShowForTarget() {
           var v: any = this.target as any;
           v = v instanceof HTMLElement ? v : v instanceof JControl ? (<JControl>v).View:null;
           if (v == null) return;
           var x = v.offsetLeft + v.offsetWidth;
           var y = v.offsetTop + v.offsetHeight;
           this.Show(x, y + 7);
       }
       Show(x, y) {
           this.list.SelectedIndex = -1;
           var ths = this.list;
           this.disapplyStyle('hidden');
           this._view.style.zIndex = ExContextMenu.NextZIndex.toString();
           if (!this.parent)
               this.Parent = Desktop.Current;
           document.body.appendChild(this._view);

           thread.Dispatcher.call(this, () => {
               var mn = this.list.View;
               var l = (this.HorizontalFraction * mn.clientWidth + x);
               var p = (this.VerticalFraction * mn.clientHeight + y);
               var v = this.list.View.style;
               var tv = this.list.View;
               var wv = { w: this.View.clientWidth, h: this.View.clientHeight };
               l = l < 0 ? 0 : l;
               p = p < 0 ? 0 : p;

               l = l + tv.clientWidth > wv.w ? wv.w - tv.clientWidth : l;
               p = p + tv.clientHeight > wv.h ? wv.h - tv.clientHeight : p;

               v.left = l + px;
               v.top = p + px;

           });
       }
       private toInt(b: boolean) { return b === false ? 0 : b == null ? -0.5 : -1; }
       private get HorizontalFraction() {
           var v = this.location;
           if ((v & Location.HCenter) == Location.HCenter) return -0.5;
           if ((v & Location.Left) == Location.Left) return 0;
           return -1;
       }
       private get VerticalFraction() {
           var v = this.location;
           if ((v & Location.VCenter) == Location.VCenter) return -0.5;
           if ((v & Location.Top) == Location.Top) return 0;
           return -1;
       }
       handleEvent(e: MouseEvent) {
           switch (e.type) {
               case 'mousedown':
                   if (e.srcElement == this._view) this.Close();
                   return;
               case 'contextmenu':
                   this.OnContextMenu(this.target instanceof JControl ? this.target : null, this.target instanceof HTMLElement ? this.target : this.target.View, e);
                   return;
           }
       }

       private OnContextMenu(target: JControl, dom: HTMLElement, e: MouseEvent) {
           this.Show(e.x, e.y);
           e.preventDefault();
           e.stopPropagation();
       }
       Close() {
           this.applyStyle('hidden');
           this._view.remove();
       }

       public set Target(v: JControl | HTMLElement) {
           if (this.target) {
               var ov = this.target instanceof HTMLElement ? this.target : this.target.View;
               ov.removeEventListener('contextmenu', this);
               this.target = null;
           }
           if (!v) return;
           var nv = v instanceof HTMLElement ? v : v.View;
           nv.addEventListener('contextmenu', this);
           this.target = v;
       }
       private target: JControl | HTMLElement;
   }

    export class ContextMenu extends JControl {
        private dic = new collection.Dictionary<CItem, MenuItem>('');
        public Items: collection.List<CItem>;
        constructor(items?: (CItem | string)[]) {
            super(document.createElement('div'));
            if (items)
                for (var i = 0; i < items.length; i++) {
                    var e = items[i] as any;
                    if (e instanceof MenuItem) continue;
                    var c = items[i] = new CItem(e, e, '#', null);
                    (c.Content as JControl).applyStyle('col-xs-12');

                }
            this.Items = new collection.List<CItem>(CItem, items as CItem[]);
        }
        initialize() {
            this.applyStyle('contextmenu');
            this.reset();
            this.Items.Listen = this.itemChangedDlg;
        }
        private itemChangedDlg: basic.ITBindable<(e: utils.ListEventArgs<number, CItem>) => void> = { Invoke: this.SourceChanged, Owner: this };

        private SourceChanged(e: utils.ListEventArgs<number, CItem>): void {
            switch (e.event) {
                case collection.CollectionEvent.Added:
                    this.add(e.newItem);
                    break;
                case collection.CollectionEvent.Replace:
                    this.replace(e.oldItem, e.newItem);
                    break;
                case collection.CollectionEvent.Removed:
                    this.remove(e.oldItem);
                    break;
                case collection.CollectionEvent.Cleared:
                    this.clear();
                    break;
                case collection.CollectionEvent.Reset:
                    this.clear();
                    this.reset();
                    break;
            }
        }
        private add(t: CItem) {
            var jc = new MenuItem(t).applyStyle('row');
            super.Add(jc);
            this.dic.Set(t, jc);
            t.OnItemSelected = this.OnItemSelected;
        }

        private OnItemSelected = function (m: MenuItem) {
            this.OnMenuItemSelected.Invoke(this.OnItemSelected, [this, m]);
        }.bind(this);
        public OnMenuItemSelected = new bind.EventListener<(s: ContextMenu, i: MenuItem) => void>(this.OnItemSelected);
        private remove(t: CItem) {
            super.Remove(this.dic.Remove(t), true);
        }
        private replace(o: CItem, n: CItem) {
            throw 'not implimented';
        }
        private clear() {
            var d = this.dic;
            for (var i = d.Count - 1; i >= 0; i--)
                super.Remove(this.dic.RemoveAt(i).Value, true);
        }
        reset() {
            for (var i = 0, l = this.Items.Count; i < l; i++) {
                var t = this.Items.Get(i);
                this.add(t);
            }
        }

        Add(j: JControl): this {
            throw '';
        }
        AddRange(citem: JControl[]): this {
            throw '';
        }
        Remove(j: JControl, dispose: boolean): boolean {
            return false;
        }
        Show(x, y) {
            this.disapplyStyle('hidden');
            var s = this._view.style;
            s.left = x + "px";
            s.top = y + "px";
            this._view.addEventListener('mouseout', this);
            this._view.addEventListener('mousein', this);
            if (!this.parent)
                this.Parent = Desktop.Current;
            document.body.appendChild(this._view);
        }
        private thrid;
        private dateout: Date;
        handleEvent(e: MouseEvent) {
            switch (e.type) {
                case 'mouseout':
                    break;
                case 'mousein':
                    clearTimeout(this.thrid);
                    break;
                case 'contextmenu':
                    this.OnContextMenu(this.target, this.target instanceof HTMLElement ? this.target:this.target.View, e);
                    break;
            }
        }
        private OnContextMenu(target: JControl, dom: HTMLElement, e: MouseEvent) {
            this.Show(e.x, e.y);
            e.preventDefault();
            e.stopPropagation();
            
        }
        private timeout(t: this) {
            t.applyStyle('hidden');
            t._view.remove();
        }
        public set Target(v: JControl) {
            if (this.target) {
                var ov = this.target instanceof HTMLElement ? this.target : this.target.View;
                ov.removeEventListener('contextmenu', this);
                this.target = null;
            }
            if (!v) return;
            var nv = v instanceof HTMLElement ? v : v.View;
            nv.addEventListener('contextmenu', this);
            this.target = v;
        }
        private target: JControl;
    }

    (window as any).cm = ContextMenu;
    export class Gage {
        initialize() {
        }
        public static deg2str(diam: number, n: number) {
            return n * (2 * Math.PI * diam) / 360;
        }
        public static createDashArray(diam: number, degs: number[]) {
            var t = '';
            var c = (2 * Math.PI * diam) / 360;
            for (var i = 0; i < degs.length; i++)
                t += (i !== 0 ? ',' : '') + (c * degs[i]) + 'px';
        }
    }

    export class CostumizedShadow extends TemplateShadow {
        public Controller;
        setDataContext(data) { this.data = data; this._view.textContent = (this._view as HTMLOptionElement).label = data ? data.toString() : ""; }
        getDataContext() { return this.data; }
        constructor(dom: HTMLOptionElement, private data?: any) {
            super(dom);
            this.setDataContext(this.data);
        }
        initialize() {
            this.setDataContext(this.data);
        }
        getScop() { return this.data instanceof bind.Scop ? this.data : null; }

    }
    export class CostumizedTemplate extends Template {
        constructor() { super(); }
        CreateShadow(data): TemplateShadow {
            return new CostumizedShadow(document.createElement('option'), data);
        }
    }
    export class ComboBox extends ListAdapter<any,any> {
        constructor(dom: HTMLSelectElement, DataSource: collection.List<any>) {
            super(dom || document.createElement('select'), new CostumizedTemplate());
            this.Source = DataSource;
        }
    }
    export class TreeComboBox<T> extends JControl {

        constructor(private tree: utils.Tree<T>, private getString: (v: T) => string) {
            super(document.createElement('select'));
        }
        initialize() {
            this.Reset();
        }
        public Reset() {
            var t = this.tree;
            t.Reset();
            var b = t.getBases();
            for (var i = 0; i < b.length; i++) {
                this.add(<HTMLSelectElement>this._view, b[i]);
            }
            this._view.innerHTML = this._view.innerHTML;
        }
        private add(cont: HTMLSelectElement | HTMLOptGroupElement, node: utils.Node<T>) {
            if (node.children.length === 0) {
                var t = document.createElement('option');
                t.label = this.getString(node.Value);
                t.textContent = t.label;
                node.param = t;
                cont.appendChild(t);
                return;
            }
            var pt = document.createElement('optgroup');
            pt.label = this.getString(node.Value);
            var t = document.createElement('option');
            t.label = this.getString(node.Value);
            t.textContent = t.label;
            //pt.appendChild(t);            
            node.param = [pt, t];
            for (var i = 0; i < node.children.length; i++)
                this.add(pt, node.children[i]);
            cont.appendChild(pt);
            
        }

        //TODO::
        /*
        function createCategory(parent: models.Category, name: any) {
                ii += 2300;
                var e = new models.Category(ii);
                (e as any).set(models.Category.DPName, name.toString());
                (e as any).set(models.Category.DPBase, parent);
                t.push(e);
                return e;
            }
            function testx() {
                var e = {
                    Achour: { Slimane: ["Brahim", "Hammou", "Bakir"] , Bahmed: ["Salim", "Slimane", "Amine"] },
                    Abismail: { a: "achour", b: "slimane" }, test:["Mohamed"],
                    Hani: ["Karim", "Khodir"]
                };
                l(t[0], 'root', e);
            }
            function m(parent: models.Category, any: Object | string) {
                if (typeof any === 'string') {
                    createCategory(parent, any);
                } else {
                    for (var i in any)
                        l(parent, i, any[i]);
                }
            }
            function l(parent: models.Category, name, any: Object | Array<any>) {
                var e: models.Category[] = [];
                if (any instanceof Array) {
                    for (var i = 0; i < any.length; i++)
                        m(parent, any[i]);
                    return;
                }
                var cat = createCategory(parent, name);
                m(cat, any);
            }

        */
    }

    export module help {
        export function createHeader(hd: HTMLTableRowElement, cols: IColumnTableDef[]) {
            for (var i = 0; i < cols.length; i++) {
                var col = cols[i];
                if (typeof col.Header === 'string')
                    col.Header = { Content: col.Header as any };
                hd.appendChild(generateCell(col.Header, 'th'));
            }
            return hd;
        }
        export function createTemplate(cols: IColumnTableDef[],tmp?:HTMLTableRowElement) {
            tmp = tmp || document.createElement('tr');
            for (var i = 0; i < cols.length; i++) {
                var col = cols[i];
                if (typeof col.Header === 'string')
                    col.Header = { Content: col.Header as any };
                tmp.appendChild(generateCell(col.Cell, 'td'));
            }
            return tmp;
        }
        export function generateCell<T extends HTMLTableHeaderCellElement | HTMLTableDataCellElement>(h: IColumnCellDef<T>, stype: 'th' | 'td'): T {
            var type = HTMLTableCellElement;
            var hdr: T;
            if (h.Content == null) h.Content = "";
            if (h.Content instanceof type) {
                hdr = h.Content;
            }
            else if (h.Content instanceof Node) {
                hdr = document.createElement(stype) as any;
                /*if (h.TdAttributes)
                    applyAttrybute(hdr, h.TdAttributes);*/
                hdr.appendChild(h.Content);
            }
            else {
                hdr = document.createElement(stype) as any;
                h.ContentAsHtml ? (hdr.innerHTML = String(h.Content)) : (hdr.innerText = String(h.Content));
            }
            if (h.Attributes)
                applyAttrybute(hdr, h.Attributes);
            return hdr;
        }
        function applyAttrybute(hdr: Element, h: { [s: string]: IAttribute | string }) {
            for (var n in h) {
                var isb = false;
                var o = h[n];
                if (typeof o === 'object') {
                    if (hdr.hasAttribute(n)) {
                        var t = o.values.slice();
                        t.unshift(hdr.getAttribute(n));
                        hdr.setAttribute(n, t.join(o.spliter));
                    } else
                        hdr.setAttribute(n, o.values.join(o.spliter));
                } else hdr.setAttribute(n, o);
            }
        }
        export interface IAttribute {
            values: string[];
            spliter: string;
        }
        export interface IColumnCellDef<T extends HTMLTableHeaderCellElement | HTMLTableDataCellElement> {
            Attributes?: { [s: string]: IAttribute | string };
            TdAttributes?: { [s: string]: IAttribute | string };
            Content?: string | T | Node;
            ContentAsHtml?: boolean;
        }
        export interface IColumnCellHeaderDef extends IColumnCellDef<HTMLTableHeaderCellElement> {
        }
        export interface IColumnCellDataDef extends IColumnCellDef<HTMLTableDataCellElement> {
        }

        export interface IColumnTableDef {
            Header: IColumnCellHeaderDef | string,
            Cell: IColumnCellDataDef,
            editable?: boolean
        }
    }
    export class _Grid  {
        constructor() {
            Grid;
        }
    }

}
class SegmentRunner {
    public Disposed: Segment[] = [];
    public Last: Segment;
    public Reader: Segment;
    public Writer: Segment;
    public Cursor;
    public Next() {
        var s = this.Reader;
        while (s)
            if (this.Cursor <= s.End) {
                return this.Cursor++;
            }
            else {
                this.Disposed.push(s);
                this.Reader = s = this.Reader.NextSegment;
            }
        return undefined;
    }
    constructor(start: number, end: number) {
        this.Last = this.Writer = new Segment(null, start, end);
    }

}
class Iterator {
    private runner: SegmentRunner = new SegmentRunner(0, 1999);
    private array = new Array(2000);
    public Read(): number {
        return this.runner.Next();
    }
    public Write() {

    }
}
class Segment {
    public Cursor
    public NextSegment: Segment;    
    public constructor(parent: Segment, public Start = 0, public End = 0) {
        if (parent)
            parent.NextSegment = this;
    }
    
    
}
//class OArray {
//    private wcurs = 0; private rcurs = 0;
//    private Indexer: Segment;
//    public Next() {
//        if (this.Indexer) {
//            this
//        }
//    }
//}


export namespace UI {
    class Popup extends JControl {
        private _isOpen: boolean;
        constructor(private target: HTMLElement) {
            super(document.createElement('div'));
        }
    
        initialize() {
        }
        Close(valid) {
            this.applyStyle('ihide');
        }
        Open(acb: IAutoCompleteBox) {
            if (this._isOpen) return;
            this._isOpen = false;
            var l = this._view;
            l.classList.remove('ihide');

            var v = acb.View.getBoundingClientRect();
            l.style.left = v.left + "px";
            l.style.top = v.top + v.height + "px";
            l.style.width = v.width + "px";
            acb.Box.Text = (acb.Value || '').toString();
            acb.IsChanged = false;
        }
    }
}

export namespace UI {
    var list :ListAdapter<any,any>;
    var filtred: collection.ExList<any, filters.list.StringPatent<any>>;
    var sf = new filters.list. LStringFilter();
    var fisc;
    
    var tm: number;
    var lto = false;
    function keyup() {
        list.SelectedIndex--;
        var sc = list.SelectedChild;
        if (sc) sc.View.scrollIntoView(false);
    }
    function keydown() {
        list.SelectedIndex++;
        var sc = list.SelectedChild;
        if (sc) sc.View.scrollIntoView(false);
    }
    function keyleft() {
        list.SelectedIndex -= 4;
        var sc = list.SelectedChild;
        if (sc) sc.View.scrollIntoView(false);
    }
    function keyright() {
        list.SelectedIndex += 4;
        var sc = list.SelectedChild;
        if (sc) sc.View.scrollIntoView(false);
    }

    function pageDown() {
        list.SelectedIndex += 8;
        var sc = list.SelectedChild;
        if (sc) sc.View.scrollIntoView(false);
    }
    function pageUp() {
        list.SelectedIndex -= 8;
        var sc = list.SelectedChild;
        if (sc) sc.View.scrollIntoView(false);
    }
    function del(e: KeyboardEvent) {
        if (!isclosed) return others(e);
        if (e.shiftKey) {
            _ithis.Value = null;
            Close(true);
        }
    }
    function enter() {
        if (isclosed) return;
        fisc = false
        Close(true);
    }
    function esc() { fisc = false; Close(false);  }
    function isControlKey(k) {
        if (k === 8) return false;
        return k < 32 || (k > 126 && k < 160);
    }

    function others(e: KeyboardEvent) {
        if (isControlKey(e.keyCode)) return;
        var lt = tm;
        var nt = Date.now();
        if (lto) return;
        setTimeout(() => {
            filtred.Filter.Patent = new filters.list.StringPatent(_ithis.Box.Text || '');
            lto = false;
        }, 200);
        lto = true;
    }
    function initPopup() {
        var ex = document.createElement('ul');
        ex.classList.add('popup', 'ihide');
        list = new ListAdapter(ex, 'test.row');
        list.OnInitialized = (list) => list.Source = filtred;
        list.Parent = Desktop.Current;
        document.body.appendChild(list.View);
    }
    //mvc.Initializer.then((o) =>
    {
        var lt = Date.now();
        filtred = new collection.ExList<any, filters.list.StringPatent<any>>(null);
        filtred.Filter = sf;
        filtred.MaxResult = 10;

        initPopup();
        list.OnItemSelected.On = (s, i, t) => {
            if (i == -1) return;
            fisc = true;
            //_ithis.Box.Text = (list.SelectedItem || '').toString();
            thread.Dispatcher.call(_ithis.Box.View, _ithis.Box.View.focus);
        };
        list.Content.addEventListener('click', (s, e, p) => {
            fisc = true;
            if (lt - (lt = Date.now()) < -500) return;
            else lt = 0;
            _ithis.Value = list.SelectedItem || _ithis.Value;
            fisc = false;
            Close(false);
        }, list);        
        list.Content.View.addEventListener('pointerenter', () => clearTimeout(to));
        list.Content.View.onmouseleave = (e) => { if (!fisc) to = setTimeout(Close, 500, e); fisc = false; }
    };
    var fns = {
        //9: tab,
        40: keydown,
        38: keyup,
        37: keyleft,
        39: keyright,
        //46: del,
        13: enter,
        27: esc,
        33:pageUp,
        34: pageDown,


    }
    function Init(acb: IAutoCompleteBox) {
        clearTimeout(to);
        UI.Desktop.Current.GetKeyControl(null, _onkeydown, [acb]);
        if (_ithis !== acb)
            resetEvents(acb);
    }

    function resetEvents(acb: typeof _ithis) {
        acb.IsChanged = false;
        _ithis = acb;
        filtred.Source = acb.DataSource;
        thread.Dispatcher.call(null, () => { filtred.Filter.Patent = new filters.list.StringPatent(acb.Box.Text); });
        

        if (okd) okd.Dispose();
        if (ofo) ofo.Dispose();

        tm = Date.now();
        lto = false;
        UI.Desktop.Current.GetKeyControl(null, _onkeydown, [acb]);
        ofo = _ithis.Box.addEventListener('focusout', onfocus, null);
    }

    function relocate(acb: typeof _ithis) {
        var l = list.View;
        var v = acb.View.getBoundingClientRect();
        l.style.left = v.left + "px";
        l.style.top = v.top + v.height + "px";
        l.style.width = v.width + "px";
    }
    function onfocus(s: Input, e: KeyboardEvent, acb: typeof _ithis) {
        clearTimeout(to);
        to = setTimeout(focusOutImediate, 500, false);
        fisc = false;
    }
    function focusOutImediate(valid:boolean) {
        UI.Desktop.Current.ReleaseKeyControl();
        Close(valid);
    }
    function _onkeydown(e: KeyboardEvent, acb: typeof _ithis): boolean {
        relocate(acb);
        var kc = e.keyCode;
        if (isclosed)
            if (kc === 9 || kc === 13) return -1 as any;
            else if (kc === 27) { acb.View.blur(); return true; }
            else if (isControlKey(kc)) return false;
            else return Open(acb, true);
        else if (kc == 9) {
            fisc = false;
            Close(false);
            return true;
        }
        return (fns[e.keyCode] || others)(e, acb);
    }
    function __onkeydown(s: Input, e: KeyboardEvent, acb: typeof _ithis) {
        UI.Desktop.Current.GetKeyControl(_ithis, _onkeydown, [_ithis]);
    }
    
    function Open(acb: IAutoCompleteBox, forceOpen: boolean) {
        Init(acb);
        if (acb.AutoPopup || forceOpen) {
            isclosed = false;
            try {
                list.SelectedIndex = 0;
            } catch (e) {

            }
            var l = list.View;
            l.classList.remove('ihide');
            relocate(acb);
            return false;
        }
        return false;
    }
    function _Open(acb: IAutoCompleteBox, forceOpen: boolean) {
        Init(acb);
        if (acb.AutoPopup || forceOpen) {
            isclosed = false;
            try {
                list.SelectedIndex = 0;
            } catch (e) {

            }
            var l = list.View;
            l.classList.remove('ihide');
            relocate(acb);
        }
    }

    
    var isclosed = true;
    var to: number;
    var okd: basic.DomEventHandler<any, any>;
    var ofo: basic.DomEventHandler<any, any>;
    var _ithis: IAutoCompleteBox;
    var zindex = 100000;
    function Close(valid) {
        if (fisc) {
            fisc = false;
            return;
        }
        isclosed = true;
        list.applyStyle('ihide');

        if (valid == true)
            _ithis.Value = list.SelectedItem;
        if (valid) {
            _ithis.Box.Text = (_ithis.Value || '').toString();
        } else {
            if (_ithis.Value != null)
                _ithis.Box.Text = _ithis.Value.toString();
            else {
                _ithis.Box.Text = "";
            }
        }
    }

    export interface IAutoCompleteBox {
        Box: Input;
        DataSource: collection.List<any>;
        View: HTMLElement;
        IsChanged: boolean;
		Value: any;
		PrintSelection?: boolean;
        AutoPopup: boolean;
    }

    export class AutoCompleteBox extends ActionText implements IAutoCompleteBox {
        AutoPopup: boolean;
        private dataSource: collection.List<any> = new collection.List<any>(Object);
        public IsChanged: boolean;
        public get DataSource(): collection.List<any> { return this.dataSource; }
        public set DataSource(d: collection.List<any>) {
            if (d === this.dataSource) return;
            this.IsChanged
            this.dataSource.Clear();
            if (d)
                this.dataSource.AddRange(d.AsList());
        }
        constructor(input?: HTMLInputElement) {
            super(input);
            input.setAttribute('autocomplete', 'off');
        }
        initialize() {
            super.initialize();
            this.Box.View.addEventListener('focusin', (e) => Init(this));
        }
        Value: any;
    }
    export declare type AutoCompleteCallback<T> = (box: IAutoCompleteBox, oldValue: T, newValue: T) => void;
    export class ProxyAutoCompleteBox<T> implements IAutoCompleteBox {
        AutoPopup: boolean;
        private callback: basic.ITBindable<AutoCompleteCallback<T>>[] = [];
        private _value: T;
        public DataSource: collection.List<any>;
        public OnValueChanged(owner: any, invoke: AutoCompleteCallback<T>) {
            this.callback.push({ Invoke: invoke, Owner: owner });
        }
        get View() { return this.Box.View; }
        set Value(v: T) {
            var ov = this._value;
            if (v == ov) return;
            this._value = v;
            this.Box.Text = v ? v.toString() : '';
            for (var t of this.callback)
                t.Invoke.call(t.Owner, this, ov, v);
        }
        get Value(): T { return this._value;}
        public IsChanged: boolean;
        constructor(public Box: Input, source: collection.List<T>) {
            Box.View.setAttribute('autocomplete', 'off');
            this.DataSource = source;
        }
        initialize() {
            this.Box.View.addEventListener('focusin', (e) => Init(this));
            return this;
        }
    }
    
}
export module UI {
    export class Paginator<T> extends JControl {
        private content: Div;
        private paginator: BiPagination;
        private paginationFilter: filters.list.SubListFilter<T>;
        public get Filter() { return this.paginationFilter; }    
        constructor(public countPerPage:number,dom?:HTMLElement) {
            super(dom || document.createElement('div'));
        }
        initialize() {
            this.applyStyle('paginator');
            this.paginationFilter = new filters.list.SubListFilter<T>();
            super.Add(this.content = new Div().applyStyle('fitHeight'));
            super.Add(this.paginator = new BiPagination());
            this.paginator.OnPropertyChanged(BiPagination.DPIndex, this.whenIndexChanged, this);
            this.paginationFilter.Patent = new filters.list.SubListPatent(0, this.countPerPage - 1);
        }
        private _cnt: JControl;
        public set Content(v: JControl) {
            if (this._cnt)
                this.content.Remove(this._cnt, true);
            this._cnt = v;
            if (v)
                this.content.Add(v);
            
        }
        private whenIndexChanged(b: bind.PropBinding, e: bind.EventArgs<number, BiPagination>) {
            this.paginationFilter.Patent = new filters.list.SubListPatent(e._new * this.countPerPage, (e._new + 1) * this.countPerPage - 1);
        }
        public OnIndexChanged(ev: (b: bind.PropBinding, e: bind.EventArgs<number, BiPagination>) => void) {
            return this.paginator.OnPropertyChanged(BiPagination.DPIndex, ev, this);
        }
        public OffIndexChanged(b: bind.PropBinding) {
            return this.paginator.removeEvent(BiPagination.DPIndex ,b);
        }
        public set Max(v: number) { this.paginator.Max = v; }
        public get Max() { return this.paginator.Max; }
        public BindMaxToSourceCount(x: collection.List<any>) {
            this.bm2sc = x.OnPropertyChanged(collection.ExList.DPCount, function (s, e) { this.paginator.Max = Math.floor(e._new / this.countPerPage); }, this);
            this.paginator.Max = Math.floor(x.Count / this.countPerPage);
        }
        public UnbindMaxFromSourceCount(x: collection.List<T>) {
            if (this.bm2sc)
                x.removeEvent(collection.List.DPCount, this.bm2sc);
        }
        private bm2sc;
        public Next() {
            this.paginator.Index++;
        }
        public Previous() {
            this.paginator.Index--;
        }
    }
}

export module UI {
    export class Grid extends UI.JControl {
        initialize() {
            this._view.classList.add('grid');
        }
        private createRule() {
            var e = document.styleSheets.item(document.styleSheets.length - 1) as CSSStyleSheet;
            
        }
    }

}
var funcs = {
    BiPagination: {
        DPInex: null,
        DPMax: null,
    }
};

export module UI {
    export interface IStrechyButtonItemData {
        Title: string;
        Icon?: string;
    }
    export class StrechyButtonItemData extends bind.DObject  {

        public static DPTitle = bind.DObject.CreateField<string, StrechyButtonItemData>('Title', String, null);
        
        public static DPIcon = bind.DObject.CreateField<string, StrechyButtonItemData>('Icon', String, null);
        public Icon: string;

        static __fields__() { return [this.DPTitle, this.DPIcon]; }
        constructor(public Title: string) {
            super();
        }
    }


    export class StrechyButton extends UI.ListAdapter<IStrechyButtonItemData, collection.List<IStrechyButtonItemData>> {
        private triggerButton:HTMLElement;
        private listDom: HTMLDivElement;
        private itemTemplate;
        private IsOpen: boolean;
        constructor(private __data?: collection.List<IStrechyButtonItemData>) {
            super('controls.StretchyButton', 'controls.StretchyButtonItem');
        }
        
        initialize() {
            this.triggerButton = $('.cd-nav-trigger', this._view)[0];;
            this.triggerButton.addEventListener('click', this);
            this.Source = this.__data;
        }
        private static EventCloseIsRegistered: boolean;
        private static OpenedStrechyButtons: StrechyButton[] = [];
        private static RegisterEvents(enable: boolean) {
            if (this.EventCloseIsRegistered == enable) return;
            if (!enable)
                document.removeEventListener('click', this.handleEvent);
            else document.addEventListener('click', this.handleEvent);
            this.EventCloseIsRegistered = enable;
        }
        public static CloseAll(enableEvent:boolean) {
            for (var i = 0; i < StrechyButton.OpenedStrechyButtons.length; i++) {
                var x = StrechyButton.OpenedStrechyButtons[i];
                x.simpleClose();
            }
            StrechyButton.OpenedStrechyButtons = [];
            this.RegisterEvents(enableEvent);
        }

        public Open() {
            StrechyButton.CloseAll(true);
            StrechyButton.OpenedStrechyButtons = [this];
            this.simpleOpen();
        }
        public Close() {
            StrechyButton.CloseAll(false);
        }

        private simpleClose() {
            this.IsOpen = false;
            this._view.classList.remove('nav-is-visible');
            this._view.classList.add('cd-stretchy-nav-collapsed');
        }
        private simpleOpen() {
            this.IsOpen = true;
            this._view.classList.add('nav-is-visible');
            this._view.classList.remove('cd-stretchy-nav-collapsed');
        }
        public static handleEvent(event) {
            var target = event.target;
            var classList = target.classList;
            if (classList.contains('cd-nav-trigger')) return;
            if (classList.contains('cd-nav-trigger') || target.tagName === 'SPAN') return;
            StrechyButton.CloseAll(false);
        }
        public handleEvent(event: Event) {
            event.preventDefault();
            if (this.IsOpen)
                this.Close();
            else this.Open();
        }
    }

}  

export module UI.Modals {
    export function CreateGlyph(dom, icon, title, type, attri: any) {
        var t = document.createElement(dom);
        t.classList.add('btn', 'btn-' + type, 'glyphicon', 'glyphicon-' + icon);
        t.textContent = '  ' + title;
        for (var i in attri)
            t.setAttribute(i, attri[i]);
        return t;
    }


    /**
        if(return)
            then do not save or undo;
        else then save or undo
    **/
    export declare type ModalAction<T> = (product: T, isNew: boolean, err?: basic.DataStat, e?:MessageEventArgs) => boolean;
    export declare type ModalEditorResult<T> = basic.ITBindable<ModalAction<T>>;
    export type ModalListAction<T> = (s: ModalList<T>, selected: T, result: MessageResult, e: MessageEventArgs) => void;
    export class ModalEditer<T extends bind.DObject> extends UI.Modal {

        static __fields__() { return [this.DPIsEditable]; }
        public static DPIsEditable = bind.DObject.CreateField<boolean, ModalEditer<any>>("IsEditable", Boolean, true);
        public IsEditable: boolean;

        public set Data(v: T) {
            this.scop.Value = v;
        }
        constructor(private templateName: string) {
            super();
        }
        public ChangedStatControled;
        initialize() {
            super.initialize();
            this.Content = new UI.TControl<T>(this.templateName, this.scop);
            this.OnClosed.On = (e) => {
                var t = this.scop.Value as T;
                var action = false;           
                if (e.msg === 'ok' && this.IsEditable === true) {
                    if (this.ChangedStatControled || t.IsPropertiesChanged(this.backupData)) {
                        if (this.Action.OnSuccess)
                            action = this.Action.OnSuccess.Invoke.call(this.Action.OnSuccess.Owner, t, this.IsNew, e);

                        if (!action) t.Commit(this.backupData);
                        this.IsNew = false;
                        return;
                    }
                }

                if (this.Action.OnError) action = this.Action.OnError.Invoke.call(this.Action.OnError.Owner, t, this.IsNew, e);
                if (!action) t.Rollback(this.backupData);
            }
        }
        OnKeyDown(e: KeyboardEvent) {
            return super.OnKeyDown(e);
        }
        private scop: bind.Scop = new bind.ValueScop(null, 3);
        private IsNew: boolean;
        private backupData: BuckupList<T>;
        public edit(product: T, isNew: boolean, action: IEditorAction<T>,editable:boolean=true) {
            if (!product) return;
            this.IsNew = isNew;
            if (product !== undefined)
                this.scop.Value = product;
            this.backupData = product.CreateBackup();
            this.Action = action || emptyAction;
            this.IsEditable = editable;
            super.Open();
            this.SetVisible(MessageResult.ok, editable);
            //this.bok.Visible = editable;
        }
        Open() {
            this.edit(this.scop.Value, this.IsNew, this.Action);
        }
        private Action: IEditorAction<T>;
    }
    var emptyAction: IEditorAction<any> = {} as any;
    export interface IEditorAction<T> {
        OnSuccess?: ModalEditorResult<T>;
        OnError?: ModalEditorResult<T>;
    }
    export class EditorAction<T> implements IEditorAction<T>
    {
        private invoke(x: basic.ITBindable<(product: T, isNew: boolean) => boolean>, p: T, isNew: boolean) {
            if (x && x.Invoke) return x.Invoke.call(x.Owner, p, isNew, this.callback);
            return undefined;
        }
        OnSuccess: ModalEditorResult<T> = { Owner: this, Invoke: this.onSuccess }
        OnError: ModalEditorResult<T> = { Owner: this, Invoke: this.onError }
        constructor(private proxyAction: IEditorAction<T>, private callback: DBCallback<T>) {
        }

        onSuccess(p: T, isNew: boolean): boolean {
            return this.invoke(this.proxyAction.OnSuccess, p, isNew);
        }
        onError(p: T, isNew: boolean): boolean {
            return this.invoke(this.proxyAction.OnError, p, isNew);
        }

        public Clone(callback: DBCallback<T>) {
            return new EditorAction<T>(this.proxyAction, callback);
        }
        public static Create<T>(_this: any, onSuccess: ModalAction<T>, onError: ModalAction<T>, defaltCallback?: DBCallback<T>): EditorAction<T> {
            if (!onSuccess && !onError) return undefined;
            var t: IEditorAction<T> = {};
            if (onSuccess) t.OnSuccess = { Owner: _this, Invoke: onSuccess };
            if (onError) t.OnError = { Owner: _this, Invoke: onError };
            return new EditorAction(t, defaltCallback);
        }
    }

    export type DBCallback<T> = (data: T, isNew: boolean, error_data_notsuccess_iss?: basic.DataStat) => void | boolean;

}

export module UI.Modals {
    export class ModalList<T> extends UI.Modal {
        
        private Datacontext: UI.ListAdapter<T, any>;
        constructor(private source: collection.List<T>, private tableTmplate: string, private itemTemplate: string, private datas?: any, private asScopic?: boolean, public isMatch?: (p: utils.IPatent<T>, item: T) => boolean) {
            super();
        }
        public static IsMatch<T>(p: utils.IPatent<T>, item: T):boolean {
            return p.Check(item);
        }
        public set IsMatch(v: (p: utils.IPatent<T>, item: T) => boolean) {
            if (this._exList) {
                var flt = this._exList.Filter as utils.CostumeFilter<T, utils.IPatent<T>>;
                if (flt._isMatch === v) return;
                flt._isMatch = v;
                this._exList.Reset();
                //thread.Dispatcher.call(this._exList, this._exList.Reset);
            }
            this.isMatch = v;
        }
        public get IsMatch() { return this.isMatch; }
        private selectedItem;
        initialize() {
            super.initialize();
            var l = this.Datacontext = new UI.ListAdapter<T, any>(this.tableTmplate, this.itemTemplate, this.datas, this.asScopic);
            l.AcceptNullValue = true;
            if (this.isMatch)
                this.createFilter();
            var r1 = new Div().applyStyle('row');
            var r2 = new Div().applyStyle('row');
            var t = new UI.ActionText();
            t.AutoAction = UI.SearchActionMode.Instantany;
            
            var c1 = new Div().applyStyle('col-md-12', 'col-xs-12', 'col-sm-12');
            t.View.style.maxWidth = 'none';
            t.View.style.width = '100%';
            c1.View.style.padding = '0';
            c1.Add(t);
            r1.Add(c1);
            r2.Add(l);

            this.Add(r1);
            this.Add(r2);
            t.OnAction.On = (l, o, n) => {
                this._exList.Filter.Patent = new filters.list.StringPatent(n);filters.list.StringFilter
            }
            
            if (!this.asScopic) {
                this._exList = new collection.ExList<T, utils.IPatent<T>>(Object);
                this._exList.MaxResult = 30;
                var sf = new filters.list.BoundStringFilter();
                sf.Patent = new filters.list.StringPatent("");
                this._exList.Filter = sf;
                this._exList.Source = this.source;
                l.Source = this._exList;
            }
            l.OnItemSelected.On = (l, i, t) => this.selectedItem = t && t.getDataContext();
        }
        public get SelectedItem(): T { return this.selectedItem; }
        public set SelectedItem(v: T) { this.Datacontext.SelectItem(v); }
        public show(onc: UI.Modals.ModalListAction<T>, list?: collection.List<T>) {
            if (list) this.OnInitialized = n => {
                this._exList.Source = list;
                this.OnInitialized = n => n.Datacontext.Source = this._exList;
            }
            this.onc = onc;
            super.Open();
            
        }


        public set Source(l: collection.List<T>) {
            this.OnInitialized = n => {
                n._exList.Source = l;
                n.Datacontext.OnInitialized = c => {
                    c.Source = n._exList;
                }
            }
        }


        Open() { }
        public OnKeyDown(e: KeyboardEvent) {
            if (!this.Datacontext.OnKeyDown(e))
                return super.OnKeyDown(e);
        }
        Close(msg) {            
            var c = this.onc;
            var s = this.selectedItem;
            this.onc = null;
            super.Close(msg);
            try {
                this.Datacontext.SelectedIndex = -1;
            } catch (e) {

            }
            if (c)
                c.call(this, this, s, msg);
            
        }
        private onc: (s: this, i: T, result: MessageResult, e?: MessageEventArgs) => void;
        public _exList: collection.ExList<T, any>;
        private createFilter() {
            var v = this.Datacontext.Content.View;
            this._exList = new collection.ExList<T, utils.IPatent<T>>(Object);
            this._exList.Filter = new utils.CostumeFilter(this.IsMatch);
            var spec = basic.New() + '';
            v.setAttribute('db-filter', spec);
            bind.RegisterFilter({
                Name: spec, BindingMode: 1, CreateNew: (p, f, s) => {
                    
                    return new filters.scopic.ListFilter(p, 1, null, this._exList);
                }
            });
        }

    }
}


export module UI {
    export interface ITabControlData<OwnerClassType,ContentType> {
        Title: string;
        Content: ContentType;
        OnSelected?(sender: OwnerClassType, item: this);
    }
    export interface ITabControlItem extends ITabControlData<TabControl, JControl> {
        Title: string;
        Content: JControl;
        OnSelected?(sender: TabControl, item: this);
    }

    export class TabControl extends UI.NavPanel {

        public static DPItems = bind.DObject.CreateField<collection.List<ITabControlItem>, TabControl>("Items", collection.List);
        public Items: collection.List<ITabControlItem>;


        private static DPTabNav = bind.DObject.CreateField<UI.ListAdapter<any, any>, TabControl>("TabNav", UI.ListAdapter);
        private TabNav: UI.ListAdapter<ITabControlItem, any>;

        private static DPTabContent = bind.DObject.CreateField<UI.ContentControl, TabControl>("TabContent", UI.ContentControl);
        private TabContent: UI.ContentControl;


        public static DPSelectedItem = bind.DObject.CreateField<ITabControlItem, TabControl>("SelectedItem", Object, null, (e) => { e.__this.TabNav.SelectedIndex = e.__this.Items.IndexOf(e._new); });
        public SelectedItem: ITabControlItem;

        static __fields__() { return [this.DPItems, this.DPSelectedItem, this.DPTabContent, this.DPTabNav] as any; }

        initialize() {
            super.initialize();
            this.TabNav = new UI.ListAdapter('tabcontrol.navTabsItem', undefined);
            this.TabContent = new UI.ContentControl().applyStyle('tab-content');
            this.TabNav.AcceptNullValue = false;
            super.Add(this.TabNav);
            super.Add(this.TabContent);
            this.TabNav.OnItemSelected.On = (n, ind, indCNT, oind, oindCNT) => this.onSelectedTabChanged(ind, oind, indCNT, oindCNT);
            this.TabNav.OnInitialized = n => { n.Source = this.Items; n.SelectedIndex = 0; }
        }
        constructor(name: string, caption: string, items: ITabControlItem[]) {
            super(name, caption);

            this.Items = new collection.List(Object, items);
        }
        private onSelectedTabChanged(newIndex: number, oldIndex: number, newChild: TemplateShadow, oldChild: TemplateShadow) {
            var si = this.Items.Get(newIndex);
            if (si) {
                this.TabContent.Content = si.Content;
                if (si.OnSelected)
                    si.OnSelected(this, si);
            } else this.TabContent.Content = null;
            this.SelectedItem = si;
        }
        private Reslect() {
            var si = this.TabNav.SelectedItem;
            if (si) {
                this.TabContent.Content = si.Content;
                if (si.OnSelected)
                    si.OnSelected(this, si);
            } else this.TabContent.Content = null;
            this.SelectedItem = si;
        }
        OnKeyDown(e: KeyboardEvent) {
            var s = this.SelectedItem;
            if (e.ctrlKey) {
                var i = e.shiftKey ? 1 : -1;
                switch (e.keyCode) {
                    case UI.Keys.Left:
                        this.TabNav.SelectedIndex += i;
                        return true;
                    case UI.Keys.Right:
                        this.TabNav.SelectedIndex -= i;
                        return true;
                }
            }
            if (s && s.Content) return s.Content.OnKeyDown(e);
        }
        CloseTab(e: Event, dt: bind.EventData, scopValue: bind.Scop, events: bind.events) {
            var x = (dt.controller.MainControll as UI.ScopicTemplateShadow).getDataContext();
            if (x) {
                this.Items.Remove(x);
            }
        }
    }

    export class UniTabControl<T> extends UI.NavPanel {

        public static DPItems = bind.DObject.CreateField<collection.List<ITabControlData<UniTabControl<any>, any>>, UniTabControl<any>>("Items", collection.List);
        public Items: collection.List<ITabControlData<this, T>>;


        private static DPTabNav = bind.DObject.CreateField<UI.ListAdapter<ITabControlData<UniTabControl<any>, any>, any>, UniTabControl<any>>("TabNav", UI.ListAdapter);
        private TabNav: UI.ListAdapter<ITabControlData<this, T>, any>;

        private static DPTabContent = bind.DObject.CreateField<UI.ContentControl, UniTabControl<any>>("TabContent", UI.ContentControl);
        private TabContent: UI.ContentControl;


        public static DPSelectedItem = bind.DObject.CreateField<ITabControlData<UniTabControl<any>, any>, UniTabControl<any>>("SelectedItem", Object, null, (e) => { e.__this.TabNav.SelectedIndex = e.__this.Items.IndexOf(e._new); });
        public SelectedItem: ITabControlData<this, T>;

        static __fields__() { return [this.DPItems, this.DPSelectedItem, this.DPTabContent, this.DPTabNav] as any; }

        initialize() {
            super.initialize();
            this.TabNav = new UI.ListAdapter('unitabcontrol.navTabsItem', undefined);
            this.TabContent = new UI.ContentControl().applyStyle('tab-content');
            this.TabNav.AcceptNullValue = true;
            super.Add(this.TabNav);
            super.Add(this.TabContent);
            this.TabNav.OnItemSelected.On = (n, ind, indCNT, oind, oindCNT) => this.onSelectedTabChanged(ind, oind, indCNT, oindCNT);
            this.TabNav.OnInitialized = n => { n.Source = this.Items; n.SelectedIndex = 0; }            
            this.TabContent.Content = this.content;
            this.Items.Listen = (t) => {
                if (t.event == collection.CollectionEvent.Removed) {
                    var e: ITabControlEventArgs<T> = <ITabControlEventArgs<T>>{ Sender: <UniTabControl<T>>this, Cancel: false, Stat: 'closed', Target: t.newItem as any };
                    this.OnTabClosed.PInvok(0, [e]);
                }
            }
        }
        constructor(name: string, caption: string, items: collection.List<ITabControlData<UniTabControl<T>, T>>, private content: JControl, private onSelectedItemChanged: (s: UniTabControl<T>, cnt: JControl, selected: ITabControlData<UniTabControl<T>, T>) => string) {
            super(name, caption);
            this.Items = items;
        }
        private onSelectedTabChanged(newIndex: number, oldIndex: number, newChild: TemplateShadow, oldChild: TemplateShadow) {
            var si = this.Items.Get(newIndex);
            if (si && this.content) {
                this.content.Visible = true;
                this.TabContent.Content = this.content;
                si.Title = this.onSelectedItemChanged(this, this.content, si);
                if (si.OnSelected)
                    si.OnSelected(this, si);

            } else this.TabContent.Content = null;
            this.SelectedItem = si;
        }
        OnKeyDown(e: KeyboardEvent) {
            var s = this.SelectedItem;
            if (e.ctrlKey) {
                var i = e.shiftKey ? 1 : -1;
                switch (e.keyCode) {
                    case UI.Keys.Left:
                        this.TabNav.SelectedIndex += i;
                        return true;
                    case UI.Keys.Right:
                        this.TabNav.SelectedIndex -= i;
                        return true;
                }
            }
            if (this.content) return this.content.OnKeyDown(e);
        }
        CloseTab(e: Event, dt: bind.EventData, scopValue: bind.Scop, events: bind.events) {
            var x = (dt.controller.MainControll as UI.ScopicTemplateShadow).getDataContext();
            if (x) {
                this.Items.Remove(x);
                if (x.Dispose) x.Dispose(true);
            }
        }
        
        OnTabSelected = new bind.EventListener<(e: ITabControlEventArgs<T>) => void>(0);
        OnTabClosed = new bind.EventListener<(e: ITabControlEventArgs<T>) => void>(0);
        GetLeftBar() {
            if ((this.content as NavPanel).GetLeftBar) return (this.content as NavPanel).GetLeftBar();
        }
        GetRightBar() {
            if ((this.content as NavPanel).GetRightBar) return (this.content as NavPanel).GetRightBar();
        }
        OnPrint() {
            if ((this.content as NavPanel).OnPrint) return (this.content as NavPanel).OnPrint();
            else super.OnPrint();
        }
        Update() {
            if ((this.content as NavPanel).Update) return (this.content as NavPanel).Update();
            else super.Update();
        }
       
        public OnSearche(oldPatent: string, newPatent: string) {
            if ((this.content as NavPanel).OnSearche) return (this.content as NavPanel).OnSearche(oldPatent, newPatent);
        }
        OnDeepSearch() {
            if ((this.content as NavPanel).OnDeepSearch) return (this.content as NavPanel).OnDeepSearch();
        }
        get HasSearch() {
            var x = (this.content as NavPanel).HasSearch;
            if (x == undefined) return;
            return x;
        }
    }
    export interface ITabControlEventArgs<T> {
        Sender: UniTabControl<T>;
        Cancel: boolean;
        Target: ITabControlData<ITabControlData<UniTabControl<T>, T>, T>;
        Stat: 'opened' | 'closing' | 'closed';
    }

    export class TabControlItem<OwnerType, ContentType> extends bind.DObject implements ITabControlData<OwnerType, ContentType> {

        public static DPTitle = bind.DObject.CreateField<string, TabControlItem<any, any>>("Title", String);

        public static DPContent = bind.DObject.CreateField<any, TabControlItem<any, any>>("Content", Object);
        static __fields__() { return [this.DPContent, this.DPTitle]; }

        constructor(public Title: string, public Content: ContentType) {
            super();
        }
    }
}

window['UI'] = UI;
window['testSB'] = function () {
    var desk = UI.Desktop.Current;
    var data = new collection.List<UI.IStrechyButtonItemData>(Object, [
        { Title: "Slimane Is Perfecte" },
        new UI.StrechyButtonItemData('Home'),
        new UI.StrechyButtonItemData('Go'),
        new UI.StrechyButtonItemData('Apps'),
        new UI.StrechyButtonItemData('Test'),
    ]);
    var cnt_SB = new UI.StrechyButton(data);
    cnt_SB.OnItemSelected.On = (s, x, g) => {
        
    }
    document.body.appendChild(cnt_SB.View);
    cnt_SB.Parent = desk;
}
function x() { }
interface IApplyStyle {
    A: Element;
    B: string[];
    C?: boolean;
}
var _ex: number;
function RegisterLayout(View: Element, classList: IArguments, remove?: boolean) {
    if (thread.Dispatcher.InIdle()) thread.Dispatcher.call(null, x);
    layout.push({ A: View, B: classList as any, C: remove });
}
function apply() {
    var layout1 = layout.splice(0);
    for (var i = 0; i < layout1.length; i++) {
        var l = layout1[i];

        if (l.C)
            l.A.classList.remove.apply(l.A.classList, l.B);
        else l.A.classList.add.apply(l.A.classList, l.B);
    }
    if (layout.length !== 0) apply();
}
function animation() {
    apply();
}
thread.Dispatcher.OnIdle(null, apply);
//requestAnimationFrame(animation);