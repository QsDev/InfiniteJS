import {thread, basic, bind, encoding, mvc,reflection } from "./Corelib";
import {UI} from './UI';
import { context } from 'context';
declare var $: any;
var t = [1, 10, 100, 1000, 10000, 100000, 1e6, 1e7, 1e8, 1e9];

function hasValueProperty(dom) {
    return dom instanceof HTMLInputElement || dom instanceof HTMLTextAreaElement;
}
export function round1(_n, x) {
  
    var n = _n + '';
    var i = n.indexOf('.');
    var e = n.indexOf('e');
    if (i === -1) i = n.length;
    var ex = 0;
    if (e !== -1)
        if (i > e) return n;
        else {

            ex = parseFloat(n.substring(e + 1));
            if (ex < x - 1) return '0';
            n = n.substring(0, e);
        }
    var l = n.length;
    if (ex !== 0) {
        if (i + ex > 1) {
            var fi = n.substr(0, i);
            var li = n.substring(i + 1);
            var shift = l - i <= ex ? l - i : ex;
            shift--;
            ex -= shift;
            i += shift;
            if (shift > 0) {
                n = fi + li.substr(0, shift);
                var lm = li.substring(shift);
                if (lm.length > 0) n += lm;
                i = n.indexOf('.');
            }
            if (i === -1) i = n.length;
            l = n.length;
        }
    }

    var l1 = x == 0 ? i : i + x + 1;
    var r = l1 - l;
    if (r > 0) l1 = l;
    n = n.substr(0, l1);

    if (r > 0) {
        if (i == l) { n += '.'; r--; }
        for (; r > 0; r--)
            n += '0';
    }
    n = ex !== 0 ? n + 'e' + ex : n;
    return n;
}

export function round(_n, x) {
    var n = _n + '';
    var i = n.indexOf('.');
    var e = n.indexOf('e');
    if (i === -1) i = e === -1 ? n.length : e;
    var ex = 0;
    if (e !== -1)
        if (i <= e) {
            ex = parseFloat(n.substring(e + 1));
            if (ex < x - 1) return '0';
            n = n.substring(0, e);
        } else {
            ex = parseFloat(n.substring(e + 1));
            n = n.substring(0, e);
        }
    var l = n.length;
    if (ex !== 0) {
        if (i + ex > 1) {
            var fi = n.substr(0, i);
            var li = n.substring(i + 1);
            var shift = l - i <= ex ? l - i : ex;
            shift = Math.abs(shift + shift === 0 ? 0 : (shift < 0 ? 1 : -1));
            ex -= shift;
            i += shift;
            if (shift > 0) {
                n = fi + li.substr(0, shift);
                var lm = li.substring(shift);
                if (lm.length > 0) n += lm;
                i = n.indexOf('.');
            }
            if (i === -1) i = n.length;
            l = n.length;
        }
    }
    
    var l1 = x == 0 ? i : i + x + 1;
    var r = x - (n.length - i);
    if (r > 0) l1 = l;
    n = n.substr(0, l1);
    
    if (r > 0) {
        if (i == l) { n += '.'; r--; }
        for (; r >= 0; r--)
            n += '0';
    }
    n = ex !== 0 ? n + 'e' + ex : n;
    return n;
}

export module Jobs {
    export function InputChecks(name: string, check: (value: string) => boolean) { }
    
    export function Load() { }

    module InputJob  {
        export function Register(name: string, check: (value: any) => boolean, freeze: boolean) {
            Object.defineProperty(checks, name, { value: check, configurable: !freeze, writable: !freeze, enumerable: false });
        }
        var checks: basic.IValueCheck = {};
        var Name: string = 'input';
        export function init() {
            var telM = /(0{1}[5|7|6|9]{1}\d{8})/;
            var telF = /(0{1}[2|3]{1}\d{7})/;
            var mail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
            var name = /^[a-z|A-Z\s]*$/;
            var username = /^([a-zA-Z\@][a-zA-Z\d\@\._]{5,20})$/;            
			var dimention = /[\w\s\.\d\/\*\ \+\-\%\=°]*/;
            var url = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i
            checks['readonly'] = (i) => false;
            checks['alphanumeric'] = (str): boolean => !!str.match(/^[a-zA-Z0-9]*$/);
            checks['ip'] = str => !!str.match(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
            checks['numeric'] = (str) => !!str.match(/^-?[0-9]+$/);
            checks['int'] = str => !!str.match(/^(?:-?(?:0|[1-9][0-9]*))$/);
            checks['decimal'] = str => !!str.match(/^(?:-?(?:0|[1-9][0-9]*))?(?:\.[0-9]*)?$/);

            checks['text'] = (str): boolean => true;
            checks['password'] = (str): boolean => !!str.match(/^[a-zA-Z0-9\s\.\@\!\?]+$/);
            checks['any'] = (str): boolean => true;
            checks['ref'] = (str): boolean => !!str.match(/^[A-Z]{2}[0-9]{1,5}$/);
            checks['creditcard'] = function (str) {
                str = str.replace(/[^0-9]+/g, "");
                if (!str.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
                    return false;
                } var t = 0; var r; var e; var i = false;
                for (var s = str.length - 1; s >= 0; s--) {
                    r = str.substring(s, s + 1); e = parseInt(r, 10); if (i) {
                        e *= 2;
                        if (e >= 10) {
                            t += e % 10 + 1
                        } else {
                            t += e
                        }
                    } else { t += e } if (i) {
                        i = false
                    }
                    else { i = true }
                } if (t % 10 !== 0)
                    return false;
                return true;
            }
            checks['tel'] = (i: string) => {                
                i = i.trim();
                return (telF.test(i) && i.length === 9) || (telM.test(i) && i.length === 10);
            };
            checks['mail'] = (i) => {
                var t = mail.exec(i);
                return t !== null && t[0].length === i.length;
            };
            checks['name'] = (i) => {
                var r = name.exec(i);
                return r !== null && r[0].length === i.length;
            };
            checks['username'] = (i) => {
                var r = username.exec(i);
                return r !== null && r[0].length === i.length;
            };
            checks['dimention'] = (i) => {
                var r = dimention.exec(i);
                return r !== null && r[0].length === i.length;
            };

            checks['select'] = (i) => {
                var r = username.exec(i);
                return r !== null && r[0].length === i.length;
            };

            Object.freeze(InputJob);
            Object.freeze(telM);
            Object.freeze(telF);
        }
        function Todo(job: bind.JobInstance, e: bind.EventArgs<any, any>): void {            
            if (job.Ischanging) return;
            job.Ischanging = true;
            try {
                (job.dom as HTMLInputElement).value = job.Scop.Value || '';
            } catch (e) {
            }
            job.Ischanging = false;
        }
        function Check(job: bind.JobInstance, e: bind.EventArgs<any, any>): void {

        }
        function OnError(job: bind.JobInstance, e: bind.EventArgs<any, any>): void {
        }
        function OnInitialize(ji: bind.JobInstance, e: bind.EventArgs<any, any>): void {

            var check = (ji.dom as HTMLElement).getAttribute('db-check');
            if (check === 'readonly')
                (ji.dom as HTMLInputElement).contentEditable = 'false';
            ji.Checker =checks[check];
            ji.Handle = this.handleEvent;
            this.Todo(ji, e);
            ji.addEventListener('ochange', hasValueProperty(ji.dom) ? 'change' : 'textContentChanged', ji);
        }
        function handleEvent(t: bind.JobInstance, e: Event) {
            if (t.Ischanging) return;
            t.Ischanging = true;
            try {
                var b = (t.dom as HTMLInputElement).value;
                if (t.Checker) {
                    if (!t.Checker(b))
                        (t.dom as HTMLInputElement).value = t.Scop.Value;
                    else t.Scop.Value = b;
                } else
                    t.Scop.Value = b;
            } catch (e) {
            }
            t.Ischanging = false;
        }
        function callback(e: Event) {            
            
        }
        function OnDispose(job: bind.JobInstance, e: bind.EventArgs<any, any>): void {
            job.removeEventListener('ochange');
        }
        
        export function Instance():basic.IJob {
            return <basic.IJob>{ Name: Name, Todo: Todo, OnInitialize: OnInitialize, Check: Check, OnScopDisposing: OnDispose, OnError: OnError, handleEvent: handleEvent };
        }
        init();
    }
    var compiler = new basic.CodeCompiler();
    
    export class interpolation implements basic.IJob{
        Name: string="$";
        Todo(job: bind.JobInstance, e: bind.EventArgs<any, any>): void {
            var regs = job.getValue('regs') as basic.IReg[];
            var scp = job.Scop;
            var val = job.Scop.Value;
            var params = [val, scp, undefined, job, undefined];
            for (var i = 0; i < regs.length; i++) {
                var reg = regs[i];
                params[2] = reg.stat || job.dom;
                params[4] = reg.evalCode;
                params[2].textContent = reg.evalCode.apply(scp, params);
            }
        }
        Check(job: bind.JobInstance, e: bind.EventArgs<any, any>): void {
        }
        OnError(job: bind.JobInstance, e: bind.EventArgs<any, any>): void {
        }
        OnInitialize(job: bind.JobInstance, e: bind.EventArgs<any, any>): void {
            var d = job.dom.firstChild;
            var arr = [];
            job.addValue("regs", arr);
            do {
                if (d instanceof Text) {
                    var reg = compiler.push(d.textContent) as basic.IReg;
                    if (reg.IsString) compiler.remove(reg);
                    else {
                        reg.stat = d;
                        arr.push(reg);bind.Observer
                    }
                }
            } while ((d = d.nextSibling));
            compiler.onload = (t) => { t.reset(); this.Todo(job, e); }
            compiler.Compile();
        }
        OnScopDisposing(job: bind.JobInstance, e: bind.EventArgs<any, any>): void {
            var regs = job.getValue('regs') as basic.IReg[];
            regs.length = 0;
        }
    }
    bind.Register(new interpolation());
    export class CheckBox implements basic.IJob {

        Name = 'checkbox';
        Todo(job: bind.JobInstance, e: bind.EventArgs<any, any>): void {
            
            (job.dom as HTMLInputElement).checked = job.Scop.Value;
        }
        Check(job: bind.JobInstance, e: bind.EventArgs<any, any>): void {
        }
        OnError(job: bind.JobInstance, e: bind.EventArgs<any, any>): void {
        }
        OnInitialize(job: bind.JobInstance, e: bind.EventArgs<any, any>): void {
            
            this.Todo(job, e);
            job.addEventListener('change', 'change', job);
            job.Handle = this.Handle;
        }
        OnScopDisposing(job: bind.JobInstance, e: bind.EventArgs<any, any>): void {
        }
        Handle(ji: bind.JobInstance, e: Event) {
            
            var v = (ji.dom as HTMLInputElement).checked;
            ji.Scop.Value = v == null ? null : !!v;
        }
    }
    bind.Register(new CheckBox());
    export class FloatJob implements basic.IJob {
        private checks: basic.IValueCheck = {};
        Name: string = 'number';
        reg = str => !!str.match(/^[+-]?\d+(?:\.\d+)?$/);
        Todo(job: bind.JobInstance, e: bind.EventArgs<any, any>): void {
            if (job.Ischanging) return;
            job.Ischanging = true;
            try {
                var val = job.Scop.Value;
				val = val == null ? (job._store as any).def : val;
                if (job.dom instanceof HTMLInputElement)
                    (job.dom as HTMLInputElement).value = val;
                else (job.dom as HTMLInputElement).textContent = val;
            } catch (e) {
            }
            job.Ischanging = false;
        }
        OnInitialize(ji: bind.JobInstance, e: bind.EventArgs<any, any>): void {
            var d = ji.dom as HTMLElement;            
			var check = d.getAttribute('db-check');
            ji.addValue('max', parseFloat(d.getAttribute('max') || '9999999999'));
            ji.addValue('min', parseFloat(d.getAttribute('min') || '-9999999999'));
			ji.addValue('def', parseFloat(d.getAttribute('default') || '0.00'));


            if (check === 'readonly')
                (d as HTMLInputElement).contentEditable = 'false';
            else {
                ji.Handle = this.handleEvent;
                ji.addEventListener('ochange', hasValueProperty(d) ? 'change' : 'textContentChanged', (e) => { this.handleEvent(ji, e); });
            }
            this.Todo(ji, e);
        }
        handleEvent(ji: bind.JobInstance, e: Event) {
            if (ji.Ischanging) return;
            ji.Ischanging = true;
            try {

                var dm = ji.dom;
                var b = (dm as HTMLInputElement).value;
                if (this.reg(b)) {
                    var v = Math.round(parseFloat(b) * 1000) / 1000;
                    var nv = Math.max(ji.getValue('min'), Math.min(v, ji.getValue('max')));
                    ji.Scop.Value = nv;
                    if (v != nv)
                        (dm as HTMLInputElement).value = nv.toString();
                }
                else
                    (dm as HTMLInputElement).value = String(Math.round((ji.Scop.Value || 0) * 1000) / 1000);
                
            } catch (e) {
            }
            ji.Ischanging = false;
        }
        OnScopDisposing(job: bind.JobInstance, e: bind.EventArgs<any, any>): void {
            job.removeEventListener('ochange');
        }
    }
    
    export class AccordionSelectJob implements basic.IJob {
        private checks: basic.IValueCheck = {};
        Name: string = 'select';
        Todo(ji: bind.JobInstance, e: bind.EventArgs<any, any>): void {
            var val = ji.getValue('db-const');
            var style = ji.getValue('db-style');
            var dval = ji.Scop.Value;
            try {

                var dm = ji.dom as HTMLElement;
                if (val === dval)
                    dm.classList.add(style);
                else dm.classList.remove(style);
            } catch (e) {
            }
        }
        Check(job: bind.JobInstance, e: bind.EventArgs<any, any>): void {

        }
        OnError(job: bind.JobInstance, e: bind.EventArgs<any, any>): void {
        }
        OnInitialize(ji: bind.JobInstance, e: bind.EventArgs<any, any>): void {

            var dm = ji.dom as HTMLElement;
            var t = this.callback.bind(ji);
            ji.addValue('__', t);
            ji.addValue('db-const', dm.getAttribute('db-const'));
            ji.addValue('db-style', dm.getAttribute('db-style'));
            this.Todo(ji, e);
            dm.addEventListener('click', t);
        }
        callback(e: Event) {
            var t = this as any as bind.JobInstance;
            try {
                var val = t.getValue('db-const');
                t.Scop.Value = val;
            } catch (e) {
            }
            
        }
        OnScopDisposing(job: bind.JobInstance, e: bind.EventArgs<any, any>): void {
        }
    }
    export var LabelJob = bind.Register({
        Name: "readonly",
        Todo: function (ji, e) {
            var dm = ji.getValue('target');
            var val = !ji.Scop.Value;
            var w = document.createTreeWalker(dm, NodeFilter.SHOW_ELEMENT);
            while (w.nextNode()) {
                var node = w.currentNode as HTMLInputElement;
                typeof node.readOnly === 'boolean' && (node.readOnly = val);
            }
        },
        OnInitialize: function (ji, e) {
            ji.addValue('target', getTarget(ji));
            this.Todo(ji, e);
        }
    });
    export var LabelJob = bind.Register({
        Name: "toggleText",
        Todo: function (ji, e) {
            var dm = ji.getValue('data');
            var v = ji.Scop.Value;
            ji.dom.textContent = dm[v];
        },
        OnInitialize: function (ji, e) {
            var c = ji.dom.attributes.getNamedItem('data');
            if (c)
                try {
                    ji.addValue('data', JSON.parse(c.value));
                } catch (e) {
                    ji.addValue('data', {});
                }
            else ji.addValue('data', {});
            this.Todo(ji, e);
        }
    });

    export var LabelJob = bind.Register(new bind.Job("label",
        (ji, e) => {
            var dm = ji.dom as HTMLElement;
            dm.textContent = ji.Scop.Value || '';
        }, null, null,
        (ji, e) => {
            var dm = ji.dom as HTMLElement;
            dm.textContent = ji.Scop.Value || '';
        },
        (ji, e) => {
        }));
    export var LabelJob = bind.Register({
        Name: "html",
        Todo: function (ji, e) {
            var dm = ji.dom as HTMLElement;
            dm.innerHTML = ji.Scop.Value || '';
        },
        OnInitialize: function (ji, e) {
            this.Todo(ji, e);
        }
    });

    export var LabelJob = bind.Register({
        Name: 'date',
        OnInitialize(ji, e) {
            var c = ji.dom;
            ji.addEventListener('change', hasValueProperty(c)? 'change':'textContentChanged', {
                handleEvent(e) {                    
                    (this.self as bind.JobInstance).Scop.Value = (ji.dom as HTMLInputElement).valueAsDate;
                }, self: ji
            });
            this.Todo(ji, e);
        }, Todo(ji, e) {            
            var d = ji.dom;
            var v = ji.Scop.Value;
            var dt: Date = (v == null ? new Date(0) : v instanceof Date ? v as Date : typeof v === 'number' ? new Date(v) : typeof v === 'string' ? Date.parse(v) : new Date(0)) as any;
            if (d instanceof HTMLInputElement)
                (ji.dom as HTMLInputElement).valueAsDate = dt;
            else ji.dom.textContent = dt.toLocaleString()
        }
    });

    export var LabelJob = bind.Register(new bind.Job("rinput",
        (ji, e) => {
            (ji.dom as HTMLInputElement).value = ji.Scop.Value;
        }, null, null,
        (ji, e) => {
            (ji.dom as HTMLInputElement).value = ji.Scop.Value;
        },
        (ji, e) => {
        }));

    export var textboxJob = bind.Register(new bind.Job("textbox",
        (ji, e) => {

            var dm = ji.dom as HTMLElement;
            dm.innerText = ji.Scop.Value;
        }, null, null,
        (ji, e) => {
            var dm = ji.dom as HTMLElement;
            dm.innerText = ji.Scop.Value;
        },
        (ji, e) => {

        }));
    export var LabelJob = bind.Register(new bind.Job("price",
        (ji, e) => {
            var dm = ji.dom as HTMLElement;
            dm.innerText = round(ji.Scop.Value || 0, 2) + ' DZD';
        }, null, null,
        (ji, e) => {
            var dm = ji.dom as HTMLElement;
            dm.innerText = round(ji.Scop.Value || 0, 2) + ' DZD';
        },
        (ji, e) => {
        }));
	export var ratingJob = bind.Register(new bind.Job("rateing",
		 (ji, e) => {
			var dm = <HTMLElement> ji.dom ;
			var v = Math.round(ji.Scop.Value || 0);
			var length = dm.childElementCount;
			for (var i = 0; i < v; i++) {
				(<HTMLElement>dm.children[i]).style.visibility = "visible";
			}
			for (var i = v; i < length; i++) {
				(<HTMLElement>dm.children[i]).style.visibility = "hidden";
			}
		}, null, null,
		(ji, e) => {
			ratingJob.Todo(ji, e);
        }));
    export var LabelJob = bind.Register({
        Name: "enable",
        Todo(ji, i) {
            (ji.dom as HTMLElement).style.pointerEvents = ji.Scop.Value ? 'all' : 'none';
        },
        OnInitialize(ji, e) {
            this.Todo(ji, e);
        }
    });

    export var LabelJob = bind.Register(<any>{
        Name: "applyStyle",
        Todo(ji: bind.JobInstance, i) {
            var d = ji.getValue('target') as HTMLElement;
            var dt = ji.getValue('data') || defaultDispaly;
            var type = this.getType(ji);
            var x = ji.Scop.Value;
            if (type)
                x = x instanceof type;
            d.classList.add.apply(d.classList, x ? dt[1] : dt[0]);
            d.classList.remove.apply(d.classList, x ? dt[0] : dt[1]);
        },
        OnInitialize(ji: bind.JobInstance, e) {
            var d = ji.dom as HTMLElement;
            var dt: any = d.getAttribute('db-data');
            if (dt) {
                dt = dt.split(',');
                if (dt.length == 1) dt = [dt[0].split(' '), 'none'];
                else {
                    dt[0] = dt[0].split(' ');
                    dt[1] = dt[1].split(' ');
                }
                ji.addValue('data', dt);
            }
            var ofType: any = d.getAttribute('ofType');
            if (ofType)
                ji.addValue('ofType', ofType);
            ji.addValue('target', getTarget(ji));
            this.Todo(ji, e);
        },
        getType(ji: bind.JobInstance) {
            var type = ji.getValue('ofType');
            if (typeof type === 'string') {
                type = context.GetType(type);
                if (type instanceof Function)
                    ji.addValue('ofType', type);
            }
            return type;
        },
        getTarget(ji: bind.JobInstance) {
            var target = (ji.dom as HTMLElement).getAttribute('target');
            if (!target) return;
            var opt = target.split('/');
            var num = parseInt(opt[0]) || 0;
            var id = opt[1];
            var d = ji.dom;
            while (num != 0) {
                num--;
                d = d.parentElement || d;
            }
            if (id) {
                var sd = $(id, d);
                if (sd) {
                    if (sd instanceof Array) {
                        if (sd.length != 0)
                            d = sd[0];
                    } else
                        d = sd;
                }
            }
            ji.addValue('target', d || ji.dom.parentElement || ji.dom);

        }
    });
    function getTarget(ji: bind.JobInstance) {
        var target = (ji.dom as HTMLElement).getAttribute('target');
        if (!target) return ji.dom;
        var opt = target.split('/');
        var num = parseInt(opt[0]) || 0;
        var id = opt[1];
        var d = ji.dom;
        while (num != 0) {
            num--;
            d = d.parentElement || d;
        }
        if (id) {
            var sd = $(id, d);
            if (sd) {
                if (sd instanceof Array) {
                    if (sd.length != 0)
                        d = sd[0];
                } else
                    d = sd;
            }
        }
        return d || ji.dom;
    }
    export var LabelJob = bind.Register(<any>{
        Name: "show",
        Todo(ji: bind.JobInstance, i) {
            var d = ji.getValue('target');
            var dt = ji.getValue('data') || defaultDispaly;
            var type = this.getType(ji);
            var x = ji.Scop.Value;
            if (type)
                x = x instanceof type;
            d.style.display = x ? dt[1] : dt[0];
        },
        OnInitialize(ji: bind.JobInstance, e) {
            var d = ji.dom as HTMLElement;
            var dt:any = d.getAttribute('db-data');
            if (dt) {
                dt = dt.split(',');
                if (dt.length == 1) dt = [dt[0], 'none'];
                ji.addValue('data', dt);
            }
            var ofType:any = d.getAttribute('ofType');
            if (ofType)
                ji.addValue('ofType', ofType);
            ji.addValue('target', getTarget(ji));
            this.Todo(ji, e);
        },
        getType(ji: bind.JobInstance) {
            var type = ji.getValue('ofType');
            if (typeof type === 'string') {
                type = context.GetType(type);
                if (type instanceof Function)
                    ji.addValue('ofType', type);
            }
            return type;
        }
    });

    export var LabelJob = bind.Register({
        Name: "editable",
        Todo(ji, e) {            
            var c = !ji.Scop.Value;
            var ins = $('input', ji.dom) as HTMLInputElement[];
            for (var i = 0; i < ins.length; i++) {
                var b = ins[i] ;
                b.disabled = c;
            }
        },
        OnInitialize(ji, e) {
            this.Todo(ji);
        }, OnScopDisposing(ji, e) {
        }
    });
    var defaultDispaly = ['none', ''];
    export var LabelJob = bind.Register({
        Name: "toggle",
        Todo(ji, i) {            
        },
        OnInitialize(ji, e) {
            ji.addEventListener('domclick', 'click', (e) => {
                ji.Scop.Value = !!!ji.Scop.Value;
            });
        }, OnScopDisposing(ji, e) {
            ji.removeEventListener('domclick');
        }
    });

    export var LabelJob = bind.Register(new bind.Job("showIf",
        (ji, e) => {
            var dm = ji.dom;
            var d = dm.parentElement;
            var dsp = d.style.display;
            var val = ji.Scop.Value;
            if (val === false) {
                if (dsp == 'none') return;
                ji.addValue('display', dsp);
                d.style.display = 'none';
            } else
                d.style.display = dsp == 'none' ? ji.getValue('display') : dsp;
        }, null, null,
        (ji, e) => {
            var dm = ji.dom;
            var d = dm.parentElement;
            var dsp = d.style.display;
            var val = ji.Scop.Value;
            {}
            if (val===false) {
                if (dsp == 'none') return;
                ji.addValue('display', dsp);
                d.style.display = 'none';
            } else
                d.style.display = dsp == 'none' ? ji.getValue('display') : dsp;
        },
        (ji, e) => {

        }));
    export var LabelJob = bind.Register(new bind.Job("hideIf",
        (ji, e) => {
            var dm = ji.dom;
            var d = dm.parentElement;
            var dsp = d.style.display;
            var val = ji.Scop.Value;
            if (val === true) {
                if (dsp == 'none') return;
                ji.addValue('display', dsp);
                d.style.display = 'none';
            } else
                d.style.display = dsp == 'none' ? ji.getValue('display') : dsp;
        }, null, null,
        (ji, e) => {
            var dm = ji.dom;
            var d = dm.parentElement;
            var dsp = d.style.display;
            var val = ji.Scop.Value;
            if (val === true) {
                if (dsp == 'none') return;
                ji.addValue('display', dsp);
                d.style.display = 'none';
            } else
                d.style.display = dsp == 'none' ? ji.getValue('display') : dsp;
        },
        (ji, e) => {
        }));
    export var TextJob = bind.Register(InputJob.Instance());
    export var TextJob = bind.Register(new FloatJob());

    export var TextJob = bind.Register(new AccordionSelectJob());
 
   

    export var CheckJob = bind.Register(new bind.Job("check",
        (ji, e) => {
            var dm = ji.dom as HTMLElement;
            dm.innerText = ji.Scop.Value;
        }, null, null,
        (ji, e) => {
            var dm = ji.dom as HTMLElement;
            dm.innerText = ji.Scop.Value;
        },
        (ji, e) => {

        }));
}

