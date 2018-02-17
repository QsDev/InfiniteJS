import { basic, bind } from './Corelib';
import { UI as _UI } from './UI';
export module defs {
    export namespace UI {
        export interface IPage extends _UI.JControl {

        }

        export interface IApp extends _UI.JControl {
            Name: string;
            SearchBox: _UI.ActionText;
            Foot: _UI.ServiceNavBar<_UI.IItem>;
            Update();
            OnContextMenu(e: MouseEvent);
            OnKeyDown(e: KeyboardEvent): any | void;
            OnPrint(): any;
            OnDeepSearche();
            OpenPage(pageNme: string);
            Logout();
            //OnPageSelected: bind.EventListener<(s: this, p: IPage) => void>;
            Open(page: IPage);
            AddPage(child: IPage);
            Show();
            SelectedPage: IPage;
            SelectNaxtPage();
            SelectPrevPage();
        }

    }
}