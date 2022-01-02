import { useMutation } from "react-query";
import { markAsDoneMutationconfig } from "../data/todosActions";
import { MyTodo } from "../data/todoTypes";

function TodoItem({todoItem}: {todoItem: MyTodo}){
    console.log("render item", todoItem.id);

    const {mutate} = useMutation(markAsDoneMutationconfig);

    return (
        <div key={todoItem.id}>
            <h5>{todoItem.title}</h5>
            <input type="checkbox" 
                checked={todoItem.isDone} 
                onChange={(event) => mutate({id: todoItem.id, isDone: event.target.checked})}/>
            <span>{todoItem.description}</span>
        </div>
    )
}

// export default React.memo(TodoItem);
export default TodoItem;