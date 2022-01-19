import Switch from "src/components/Switch";
import { markAsDoneOptimistic } from "../data/todosActions";
import { MyTodo } from "../data/todoTypes";

function TodoItem({todoItem}: {todoItem: MyTodo}){
    console.log("render item", todoItem.id);

    return (
        <div key={todoItem.id}>
            <h5>{todoItem.title}</h5>
            <Switch 
                checked={todoItem.isDone} 
                onChange={(isChecked => markAsDoneOptimistic({id: todoItem.id, isDone: isChecked}))}
            />
            <span>{todoItem.description}</span>
        </div>
    )
}

// export default React.memo(TodoItem);
export default TodoItem;