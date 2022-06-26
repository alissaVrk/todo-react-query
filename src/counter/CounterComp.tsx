import Button from "src/components/Button";
import Switch from "src/components/Switch";
import { useCounterContext } from "./counterContext"

export function CounterComp() {
    const {count, increment} = useCounterContext();

    return (
        <div>
            <p>this is the count {count}</p>
            <Button onClick={increment}>increment</Button> <br/>
            <span>and just for fun </span><Switch/>
        </div>
    );
}//asd sdf