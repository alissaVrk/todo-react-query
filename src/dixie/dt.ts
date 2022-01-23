import Dexie, { Table } from 'dexie';
import _ from 'lodash';

export interface Item {
    id: string,
    guid: string
}

export class MyDixie extends Dexie {
    items!: Table<Item>; 

    constructor() {
        super("craft");
        // this.version(1).stores({
        //     "items": "guid, id"
        // });
    }
}
let db: MyDixie;

export const initDixieDB = async  () => {
    const exists = await Dexie.exists("craft")
    if (exists) {
        const _db = new MyDixie(); 
        await _db.open();
        console.log("should be here");
        _db.items = _db.table("items");
        db = _db;
        //@ts-ignore
        window.__dexie = db;
    } else {
        return _.delay(initDixieDB, 100);
    }
}

export const getDixieDB = () => {
    if (!db) {
        return null;
    }
    return db;
}
