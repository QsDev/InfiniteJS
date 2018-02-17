import { thread, basic, bind,mvc, reflection } from './Corelib';
import { sdata } from './System';

export module db {
    declare var openDatabase: (databaseName: string, sqlLiteDBVersion: string, databaseDesc: string, databaseSize: number) => IDatabase;
    interface IExecCmd {
        cmd: string;
        callback: (iss: boolean, sender: Database, sqlTrans, result?) => void;
    }

    export interface IDatabase {
        transaction(callback: (db) => void, onerror: (db, b) => void);
    }


    export class Database {
        databaseName = "data_store";
        databaseDesc = "Data store";
        sqlLiteDBVersion = "1.0";
        FIVE_MB = 5120;
        tableName = "data-store";
        database: IDatabase;
        initialize() {
            this.database = openDatabase(this.databaseName, this.sqlLiteDBVersion, this.databaseDesc, this.FIVE_MB);
            this._transaction = this._transaction.bind(this);
            this._OnError = this._OnError.bind(this);
            this._OnSuccess = this._OnSuccess.bind(this);
        }
        execute(command, callback?: (iss: boolean, sender: this, sqlTrans, result?) => void) {
            this.database.transaction((db) => {
                db.executeSql(command, [], callback ? (s, r) => callback(true, this, s, r) : void 0);
            }, callback ? (err) => callback(false, this, err) : void 0);
        }
        syncExecute(command, callback?: (iss: boolean, sender: this, sqlTrans, result?) => void) {
            this._Push({ cmd: command, callback: callback });
        }

        private _commands: IExecCmd[] = [];
        private _current: basic.IRef<IExecCmd> = { value: null };
        private _IsExecuting: boolean = false;

        private _Push(cmd: IExecCmd) {
            this._commands.push(cmd);
            if (!this._IsExecuting) return this._next();
        }
        private _job = thread.Dispatcher.cretaeJob(this._runCmd, [], this, false);
        private _runCmd() {
            this.database.transaction(this._transaction, this._OnError);
        }
        private _transaction(db) {
            db.executeSql(this._current.value.cmd, [], this._OnSuccess);
        }
        private _OnSuccess(sql, rslt) {
            try {
                this._current.value.callback && this._current.value.callback(true, this, sql, rslt);
            } catch (e) {
            }
            this._next();
        }
        private _OnError(sqlE) {
            try {
                this._current.value.callback && this._current.value.callback(false, this, sqlE);
            } catch (e) {
            }
            this._next();
        }
        private _next() {
            if (this._commands.length === 0) {
                this._IsExecuting = false;
                return;
            }
            this._IsExecuting = true;
            this._current.value = this._commands.pop();
            thread.Dispatcher.Push(this._job, [this._current]);
        }
    }

    export class SQLInstructureBuilder {
        private _key: bind.DProperty<any, bind.DObject>;
        private _map: { [n: string]: Function } = {};
        cretaeCmd: basic.StringCompile;
        insertCmd: basic.StringCompile;
        updateCmd: basic.StringCompile;
        selectCmd: basic.StringCompile;
        deleteCmd: basic.StringCompile;

        public get Key() {
            return this._key;
        }

        constructor(private tableName, private type: Function) {
            this.init();
        }
        init() {
            var flds = bind.DObject.getFields(this.type);
            for (var i = 0; i < flds.length; i++) {
                var fld = flds[i];
                if (fld.IsKey)
                    this._key = fld;
                this._map[fld.Name] = fld.Type as Function;
            }
            this.cretaeCmd = this.getCreateCmd();
            this.insertCmd = this.getInsertCmd();
            this.updateCmd = this.getUpdateCmd();
            this.selectCmd = this.getSelectCmd();
            this.deleteCmd = this.getDeleteCmd();
        }
        private getSB(s: string) {
            return basic.CompileString(s, this.getDbValue, this);
        }
        getCreateCmd() {
            var flds = bind.DObject.getFields(this.type);
            var s = "CREATE TABLE IF NOT EXISTS [" + this.tableName + "] (";

            for (var i = 0; i < flds.length; i++) {
                var fld = flds[i];
                var type = this.getTypeName(fld.Type as any);
                if (type == undefined) {
                    console.error("Filed [" + fld.Name + "] of table " + this.tableName + " cannot be created");
                    continue;
                }
                if (i !== 0) s += ",";
                s += "[" + fld.Name + "] " + type + ((fld.Attribute & bind.PropertyAttribute.IsKey) === bind.PropertyAttribute.IsKey ? " PRIMARY KEY" : " ");
            }
            s += ")";
            return this.getSB(s);
        }

        getInsertCmd() {
            var flds = bind.DObject.getFields(this.type);
            var names = "", values = "";
            for (var i = 0; i < flds.length; i++) {
                var fld = flds[i];
                if (i !== 0) {
                    names += ","; values += ",";
                }
                names += "[" + fld.Name + "]";
                values += "@" + fld.Name;
            }
            return this.getSB("INSERT INTO [" + this.tableName + "] (" + names + ") VALUES (" + values + ')');
        }

        getUpdateCmd() {
            var flds = bind.DObject.getFields(this.type);
            var inst = "";
            var key: typeof fld = null;
            for (var i = 0; i < flds.length; i++) {
                var fld = flds[i];
                if (i !== 0)
                    inst += ",";
                if (!key && fld.IsKey)
                    key = fld;
                inst += "[" + fld.Name + "] = @" + fld.Name + "";
            }
            inst = "UPDATE [" + this.tableName + "] SET " + inst + " WHERE [" + key.Name + "] = @" + key.Name;
            return this.getSB(inst);
        }

        getSelectCmd() {
            return this.getSB("SELECT * FROM [" + this.tableName + "] WHERE [" + this._key.Name + "] = @" + this._key.Name + " LIMIT 1");
        }

        getDeleteCmd() {
            return this.getSB("DELETE FROM [" + this.tableName + "] WHERE [" + this._key.Name + "] = @" + this._key.Name);
        }

        private getTypeName(type: Function) {
            if (type === String) return 'TEXT';
            if (type === Number) return 'Number';
            if (type === Boolean) return 'Boolean';

            if (reflection.IsInstanceOf(type, sdata.DataRow))
                return 'number';

            if (reflection.IsInstanceOf(type, sdata.DataTable))
                return undefined;
            console.error("Unresolved Type = " + type, type);
            throw "unresolved type";
        }

        private getDbValue(name, v) {
            var _this = (this as any as basic.StringCompile).params as this;
            var type = _this._map[name] as Function;
            switch (type) {
                case String:
                    return v == null ? "null" : "'" + v + "'";
                case Number:
                    return v == undefined ? 'null' : String(v);
                case Boolean:
                    return v == undefined ? 'null' : v ? '1' : '0';
                default:
                    if (reflection.IsInstanceOf(type, sdata.DataRow)) {
                        var id = v && v.Id;
                        if (id == null) return 'null';
                        return String(id);
                    }
                    else return undefined;
            }
        }
        private static parseBool(v) {
            if (v == null) return null;
            switch (typeof v) {
                case 'string':
                    if (v === 'true') return true;
                    if (v === 'false') return false;
                    v = parseFloat(v);
                    return !!v;
                case 'number':
                    break;
                case 'boolean':
                    return v;
                default:
                    return !!v;
            }
        }
        private getJsValue(name, v) {
            var _this = (this as any as basic.StringCompile).params as this;
            var type = _this._map[name] as Function;
            switch (type) {
                case String:
                    return v;
                case Number:
                    return typeof v === 'string' ? parseFloat(v) : v;
                case Boolean:
                    return SQLInstructureBuilder.parseBool(v);
                default:
                    if (reflection.IsInstanceOf(type, sdata.DataRow)) {
                        var id = v && v.Id;
                        if (id == null) return 'null';
                        return String(id);
                    }
                    else return undefined;
            }
        }
    }
    export class DatabaseTable<T> {
        private builder: SQLInstructureBuilder;
        constructor(private database: Database, tableName: string, type: Function) {
            if (!reflection.IsInstanceOf(type, bind.DObject)) throw "Type not implimented";
            this.builder = new SQLInstructureBuilder(tableName, type);
        }
        public Insert(row: T, callback: (iss: boolean, sender: Database, sqlTrans, result) => void) {
            this.database.syncExecute(this.builder.insertCmd.apply(row), callback);
        }
        public Delete(row: T, callback: (iss: boolean, sender: Database, sqlTrans, result) => void) {
            this.database.syncExecute(this.builder.deleteCmd.apply(row), callback);
        }
        public Update(row: T, callback: (iss: boolean, sender: Database, sqlTrans, result) => void) {
            this.database.syncExecute(this.builder.updateCmd.apply(row), callback);
        }
        public Select(row: T, callback: (iss: boolean, sender: Database, sqlTrans, result) => void) {
            this.database.syncExecute(this.builder.selectCmd.apply(row), callback);
        }
        public Create(callback: (iss: boolean, sender: Database, sqlTrans, result) => void) {
            this.database.syncExecute(this.builder.cretaeCmd.apply({}), callback);
        }
    }
}

//window['test'] = () => {
//    var _db = new db.Database();
//    _db.initialize();
//    var tbl = new db.DatabaseTable(_db, 'Product', models.Product);
//    tbl.Create((iss, db, sql, rslt) => {
//        if (iss) {
//            var vls = window["__data"].Products._list as models.Product[];
//            tbl.Insert(vls[2220], (iss, db, sql, rslt) => {
//            });
//        } else {

//        }
//    });
//}