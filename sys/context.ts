import {ModuleStat} from './Consts';
declare module "context" {
    export var context: IContext;
    export interface IContext {
        CanAccessToMe(type: string, folder: string, name: string);
        GetPath(path: string): string;
        NameOf(type: Function): string;
        GetType(path: string): Function;
        GetEnum(path: string): IEnum;
        GetStat(): ModuleStat;
        OnStat(target: string, stat: ModuleStat, callback: (me: string, target: string, cstat: ModuleStat, stat: ModuleStat) => void);
        OnGStat(stat: ModuleStat, callback: (me: string, target: string, cstat: ModuleStat, stat: ModuleStat) => void);
        Assemblies;
    }
    export interface IEnum {
        [n: string]: number;

    }
}
