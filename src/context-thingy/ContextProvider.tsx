import React, { PropsWithChildren, useEffect, useMemo, useRef} from "react";
import { createSimpleReactiveStore } from './SimpleReactiveStore'

type Item = {
    id: string
    name: string
}

const defaultItems: Item[] = [{id: '1', name: 'item 1'}, {id: '2', name: 'item 2'}, {id: '3', name: 'item 3'}]

export const MyContext = React.createContext({}); 

export function MyProvider(props: PropsWithChildren<{}>) {
    const store = useRef(createSimpleReactiveStore());    

    const value = useMemo(() => ({
        useItem: (itemId: string) => store.current.useValue(itemId),
        setItem: (item: Item) => store.current.setValue(item.id, item),
        useSelectedItem: () => store.current.useValue('selectedItem'),
        setSelectedItem: (selectedItemId: string) => store.current.setValue('selectedItem', selectedItemId),
    }), []);

    return (
        <MyContext.Provider value={value}>
            {props.children}
        </MyContext.Provider>
    );
}
//asdf asdf asdf