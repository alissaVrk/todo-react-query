import {useLiveQuery} from "dexie-react-hooks"
import { getDixieDB } from "./dt";

export function ItemsCount(){
    const count = useLiveQuery(
        () => {
            const db = getDixieDB();
            if (!db) {
                console.log("NONENONENON");
                return -1;
            }    
            console.log("RRRRR");
            console.log("TTTTTTTTTT","trying to render", db.tables);
            return db.items.count();
        }
    );

    return (<div>items count is {count}</div>)
}