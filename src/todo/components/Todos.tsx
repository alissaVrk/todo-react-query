import { partial } from "lodash";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { addTodo } from "../data/todosActions";
import { getMyTodosConfig } from "../data/todosFetch";
import { filterTodos } from "../data/todosFilter";
import { TodosFilter, MyTodo } from "../data/todoTypes";
import TodoItem from "./TodoItem";

function Todos({filter}: {filter?: TodosFilter}) {
    const {data} = useQuery({
        ...getMyTodosConfig(),
        select: filter ? partial(filterTodos, filter) : undefined,
        notifyOnChangeProps: "tracked"
    });

    const [isAdding, setIsAdding] = useState(false);
    const titleRef = React.createRef<HTMLInputElement>();
    const descRef = React.createRef<HTMLTextAreaElement>()

    function addNewTodo() {
        const todo: Omit<MyTodo, "id"> = {
            title: titleRef.current?.value || "",
            description: descRef.current?.value || "",
            isDone: false
        }
        setIsAdding(true);
        addTodo(todo).then(() => setIsAdding(false));
    }

    console.log("render list", isAdding, data?.length);
    return (
        <div style={{textAlign: "start"}}>
            <ul>
                {data?.map(todo => (
                <li key={todo.id}>
                    <TodoItem todoItem={todo} />
                </li>
                ))}
            </ul>
            {isAdding ? <h6>Loading....</h6> : (
                <div>
                <h5>Add Todo</h5>
                <label htmlFor="title">title: </label>
                <input type="text" name="title" ref={titleRef}/>
                <label htmlFor="desc">description: </label>
                <textarea name="desc" ref={descRef} />
                <input type="button" value="Add" onClick={addNewTodo}/>
            </div>
            )}
        </div>
    )
}

export default Todos;