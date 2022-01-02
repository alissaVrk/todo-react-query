import React from "react";
import { useQuery } from "react-query";
import { getMyTodosConfig } from "../data/todosFetch";
import { getFilteredMyTodoConfig } from "../data/todosFilter";
import { TodosFilter, MyTodo } from "../data/todoTypes";
import TodoItem from "./TodoItem";

function Todos({filter}: {filter?: TodosFilter}) {
    const todosQueryConfig = getFilteredMyTodoConfig(filter || {isDone: false});
    const {data} = useQuery({
        ...todosQueryConfig,
        notifyOnChangeProps: "tracked"
    });
    const titleRef = React.createRef<HTMLInputElement>();
    const descRef = React.createRef<HTMLTextAreaElement>()

    function addTodo() {
        const todo: Omit<MyTodo, "id"> = {
            title: titleRef.current?.value || "",
            description: descRef.current?.value || "",
            isDone: false
        }
        // dispatch({name: "add", todo});
    }

    console.log("render list");
    return (

        <div style={{textAlign: "start"}}>
            <ul>
                {data?.map(todo => (
                <li key={todo.id}>
                    <TodoItem todoItem={todo} />
                </li>
                ))}
            </ul>
            <div>
                <h5>Add Todo</h5>
                <label htmlFor="title">title: </label>
                <input type="text" name="title" ref={titleRef}/>
                <label htmlFor="desc">description: </label>
                <textarea name="desc" ref={descRef} />
                <input type="button" value="Add" onClick={addTodo}/>
            </div>
        </div>
    )
}

export default Todos;