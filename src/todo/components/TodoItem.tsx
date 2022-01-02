import { markAsDone } from "../data/todosActions";
import { MyTodo } from "../data/todoTypes";

function TodoItem({todoItem}: {todoItem: MyTodo}){
    console.log("render item", todoItem.id);

    return (
        <div key={todoItem.id}>
            <h5>{todoItem.title}</h5>
            <input type="checkbox" 
                checked={todoItem.isDone} 
                onChange={(event) => markAsDone({id: todoItem.id, isDone: event.target.checked})}/>
            <span>{todoItem.description}</span>
        </div>
    )
}

// export default React.memo(TodoItem);
export default TodoItem;