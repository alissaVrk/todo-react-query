import React from "react";
import { useMutation, useQuery } from "react-query";
import { addTodoMutationConfig } from "../data/todosActions";
import { getFilteredMyTodoConfig } from "../data/todosFilter";
import { TodosFilter, MyTodo } from "../data/todoTypes";
import TodoItem from "./TodoItem";

function Todos({filter}: {filter?: TodosFilter}) {
    const todosQueryConfig = getFilteredMyTodoConfig(filter || {isDone: false});
    const {data} = useQuery({
        ...todosQueryConfig,
        notifyOnChangeProps: "tracked"
    });

    const { mutate: addTodoMutate, isLoading: isLoadingAddTodo } = useMutation(addTodoMutationConfig);

    const titleRef = React.createRef<HTMLInputElement>();
    const descRef = React.createRef<HTMLTextAreaElement>()

    function addTodo() {
        const todo: Omit<MyTodo, "id"> = {
            title: titleRef.current?.value || "",
            description: descRef.current?.value || "",
            isDone: false
        }
        addTodoMutate(todo);
    }

    console.log("render list", isLoadingAddTodo, data?.length);
    return (
        <div style={{textAlign: "start"}}>
            <ul>
                {data?.map(todo => (
                <li key={todo.id}>
                    <TodoItem todoItem={todo} />
                </li>
                ))}
            </ul>
            {isLoadingAddTodo ? <h6>Loading....</h6> : (
                <div>
                <h5>Add Todo</h5>
                <label htmlFor="title">title: </label>
                <input type="text" name="title" ref={titleRef}/>
                <label htmlFor="desc">description: </label>
                <textarea name="desc" ref={descRef} />
                <input type="button" value="Add" onClick={addTodo}/>
            </div>
            )}
        </div>
    )
}

export default Todos;