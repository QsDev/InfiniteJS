import { UI } from "../../sys/UI";
import { collection, bind, reflection, ScopicControl } from "../../sys/Corelib";
import { template } from "template|./dom.htm";
import *  as css from 'style|./style.css';
import { value as data } from 'json|data.json';



ValidateImport(css);
export namespace Material {
    export class HeavyTable<T> extends UI.ListAdapter<T, any> {
        public visibleCols: number[];
        private Controller: bind.Controller;
        constructor(private cols: UI.help.IColumnTableDef[]) {
            super(template.get("heavyTable") as any, UI.help.createTemplate(cols));
            this.Controller = bind.Controller.Attach(this, this);
            this.activateClass = 'selected';
            this.Controller.OnCompiled = {
                Invoke: this.OnCompileEnd, Owner: this
            };
            this.OnPropertyChanged(UI.ListAdapter.DPSelectedIndex, function (e, b) { this.setXY(undefined, b._new); }, this);
        }
        initialize() {
            super.initialize();
            this.editCell.addEventListener('blur', (e) => {
                if (this.isfocussed)
                    this.endEdit(true);
            });
        }
        protected OnCompileEnd(cnt: bind.Controller) {

        }
        public setName(name: string, dom: HTMLElement, cnt: UI.JControl, e: bind.IJobScop) {
            if (name == '_tbl_head')
                UI.help.createHeader(dom as any, this.cols);
        }
        private endEdit(save: boolean) {
            if (!this.isfocussed) return false;
            this.isfocussed = false;
            try { this.editCell.remove(); } catch{ }
            if (save)
                this._selectedCell.textContent = this.editCell.value;
            else
                this._selectedCell.textContent = this.oldInnerText;
            return true;
        }
        private beginEdit():boolean {
            return this.edit(this.selectCell());
        }
        edit(currentElement: HTMLTableDataCellElement) {
            if (!this.cols[this._x].editable) return false;
            var input = this.editCell;
            this.oldInnerText = currentElement.textContent;
            input.value = this.oldInnerText;
            currentElement.innerText = "";
            currentElement.appendChild(input);
            input.focus();
            this.isfocussed = true;
            return true;
        }

        get EOF() {
            return this._x === this.ColCount() - 1 && this._y === this.Source.Count - 1;
        }

        OnKeyDown(e: KeyboardEvent):boolean {
            if (this.isfocussed && e.keyCode === 27) {
                if (this.isfocussed)
                    this.endEdit(false);
                else return false;
            }
            else if (e.keyCode == 13) {
                if (this.isfocussed)
                    if (this.endEdit(true)) return true;
                else
                    if (this.beginEdit()) return true;
            } else if (e.keyCode == 9) {
                if (this.isfocussed)
                    this.endEdit(true);
                if (this.EOF) return;
                this.setXY(this.x + (e.shiftKey ? -1 : 1), undefined);
                e.stopImmediatePropagation();
                e.stopPropagation();
                e.preventDefault();
                return true;
            }
            else if (!this.isfocussed && e.keyCode >= 37 && e.keyCode <= 40) {
                switch (e.keyCode) {
                    case 37: this.setXY(this.x - 1, undefined);
                        break;
                    case 38: this.setXY(undefined, this._y - 1);
                        break;
                    case 39: this.setXY(this.x + 1, undefined);
                        break;
                    case 40: this.setXY(undefined, this._y + 1);
                        break;
                    default: return false;
                }
                return true;
            } else return false;
            return super.OnKeyDown(e);
        }
        _x: number = 0; _y: number = 0;
        oldInnerText;
        private get x(): number { return this._x; }
        private ColCount() { return this.visibleCols ? this.visibleCols.length : this.cols.length; }
        private set x(v: number) {
            if (this.cols.length == 0) return;
            var vc = this.ColCount();
            var i = v < 0 ? -1 : v < vc ? 0 : 1;
            if (i === -1) this._x = vc - 1;
            else if (i === +1) this._x = 0;
            else this._x = v;
            if (i)
                this.y += i;
        }
        private set y(v: number) {
            var vr = this.Source.Count;
            if (vr == 0) return;
            var i = v < 0 ? -1 : v < vr ? 0 : 1;
            if (i === -1) this._y = vr - 1;
            else if (i === +1) this._y = 0;
            else this._y = v;
            if (i)
                this.x += i;
        }
        private get y() { return this._y; }
        private stat: { x: number, y: number }[] = [];
        private _selectedCell: HTMLTableDataCellElement;
        public setXY(x: number, y: number) {
            this.deselectCell();
            if (x != undefined)
                this.x = x;
            if (y != undefined)
                this.y = y;
            this._selectedCell = this.getCurrentCell();
            this.selectCell();
            this.SelectedIndex = this._y;
        }
        private isfocussed;
        private getStat() {
            return { x: this._x, y: this._y };
        }
        getCurrentCell() {
            var t = this.Content.getChild(this._y);
            if (!t) return;
            return t.View.children.item(this.visibleCols == null ? this.x : this.visibleCols[this.x]) as HTMLTableDataCellElement;
        }

        selectCell() {
            this._selectedCell && this._selectedCell.classList.add('selected');
            return this._selectedCell;
        }
        deselectCell() {
            this._selectedCell && this._selectedCell.classList.remove('selected');
        }

        private editCell: HTMLInputElement = document.createElement('input');
    }
}

export function test() {
    
    document.body.innerHTML = "";
    var x = new Material.HeavyTable(data.tableDef);
    x.visibleCols = data.visibleCols;
    x.Parent = UI.Desktop.Current;
    document.body.appendChild(x.View);
    function crt(i) {
        return {
            FullName: "AchourBrahim",
            Tel: "023942332",
            MontantTotal: 433,
            VersmentTotal: 432,
            SoldTotal: 123 * i
        }
    }
    var e = [];
    for (var i = 0; i < 126; i++)
        e.push(crt(i - 2));
    x.Source = new collection.List(Object, e);
    document.body.appendChild(x.View);
    return e;
}

ScopicControl.register('heavytable', (name: string, dom: HTMLElement, currentScop: bind.Scop, parentScop: bind.Scop, parentControl: UI.JControl, controller: bind.Controller) => {
    var tableDef = dom.getAttribute('tableDef');
    var x = new Material.HeavyTable(currentScop.getScop(tableDef, false).Value);
    if (currentScop)
        currentScop.OnPropertyChanged(bind.Scop.DPValue, (s, e) => {
            x.Source = e._new;
        }, x);
    x.OnInitialized = x => x.Source = currentScop.Value;
    return x;
});