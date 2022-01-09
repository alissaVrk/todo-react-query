import { useCounterContext } from "./counterContext"

export function CounterComp() {
    const {count, increment} = useCounterContext();

    return (
        <div>
            <p>this is the count {count}</p>
            <button onClick={increment}>increment</button>
        </div>
    );
}