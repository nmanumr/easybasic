import { repeatArray } from "app/services/consoleServices/utils";

export class Variables {

    private arrays = []

    private stringVariables = [];
    private intVariables = [];
    private doubleVariables = [];
    private singleVariable = []

    private DataType = repeatArray(DataType.Integer, 26);
    private defaultDataType = DataType.Integer;

    private _vars = {}
    private _varMemory = {}
    private current = 0;

    constructor() { }


    /** clear all the variables */
    public clear() {
        this._vars = {}
        this._varMemory = {}
        this.current = 0
    }

    /** Check if variable is al ready declared */
    public hasDefined(name: string) {
        this._vars.hasOwnProperty(name);
    }

    private DataTypeSize(sigil: DataType) {
        var size = [3, 2, 4, 8];
        return size[sigil];
    }

    /** asign value to a variable */
    public setVariable(name: string, value: any, varType = this.defaultDataType) {
        if (!this._varMemory.hasOwnProperty(name)) {
            var size = (Math.max(3, name.length) + 1 + this.DataTypeSize(varType));
            var namePtr = 4720 + this.current;
            var varPtr = namePtr + Math.max(3, name.length) + 1;
            this.current += Math.max(3, name.length) + 1 + this.DataTypeSize(varType);
            this._varMemory[name] = [namePtr, varPtr];
        }
        
        this._vars[name] = value;
    }

    /** Return value of a variable */
    public getVariable(name: string) {
        return this._vars[name];
    }
}

export enum DataType {
    String = 0,
    Integer = 1,
    Single = 2,
    Double = 3,
}