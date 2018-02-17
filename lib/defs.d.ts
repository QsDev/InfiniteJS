/// <reference path="./Module.ts" />

declare interface ITemplateModule {
    get(name: string): HTMLTemplateElement;
    get(i: number): ITemplateModule;
}
declare module "json|*" {
    export function require(path: string, callback: (e) => void, onError: () => void): any;
    export var value: any;
}
declare module "html|*" {
    const value: any;
    export default value;
    export function Validate();
}
declare module "style|*" {
    export function require(path: string, callback: (e) => void, onError: () => void): any;
    export var style: StyleSheet;
    export function Validate();
}

declare module "template|*" {
    export function require(path: string, callback: (e) => void, onError: () => void): any;
    export var template: ITemplateModule;
    export function Validate();
}

declare module "plugin|*" {
    export var moduleType: ModuleType;
    export function addEventListener(stat: string | number, callback: IPluginEventCallback, data: any);
    export function removeEventlistenr(stat: string | number, callback: IPluginEventCallback);
}
declare module "xml|*" {
    export function require(path: string, callback: (e) => void, onError: () => void): any;
    export var xml: XMLDocument;
    export function Validate();
}

declare module "code|*" {
    export var [s]: any;
}
declare module "context" {
    export function canAccessToMe(type: any, folder: any, name: any): boolean;
    export function GetPath(url: string): string;
    export function NameOf(type: Function): string;
    export function GetType(path: any): Function;
    export function GetEnum(path: any): Object;
    export function GetStat(path: any): ModuleStat;
    export function OnStat(module: any, stat: any, callback: any): void;
    export function OnGStat(stat: any, callback: any): void;
}

declare module "|*" {
    export var [s]: any
}
declare module "*|?" {
    export var moduleType: ModuleType;
    export function addEventListener(stat: string, callback: IPluginEventCallback, data: any);
    export function removeEventlistenr(stat: string, callback: IPluginEventCallback);
}

declare interface PluginsEvent {
    exports: any;
    url: IUrl;
    data: any;
}
declare interface IEvent {

    moduleType: ModuleType;
    addEventListener(stat: string, callback: IPluginEventCallback, data: any);
    removeEventlistenr(stat: string, callback: IPluginEventCallback);
}
declare interface IUrl {
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
    toString(): string;
}
declare type IPluginEventCallback = (e: PluginsEvent) => void;
declare interface ITemplateExport {
    require: (m: any) => void;
    template: ITemplateModule;
    html: HTMLElement;
}
declare var require: (modules: string, onsuccss?: (result: any) => void, onerror?: (result: any) => void, context?: any) => any;