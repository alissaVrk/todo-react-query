export type Todo = {
  id: string
  title: string
  isDone: boolean
}

export type MyTodo = Todo & {
  description: string
}

export type TodosFilter = {
  isDone: boolean
} 