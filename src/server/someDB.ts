export type UserDB = {
  id: string
  name: string
}

export type TodoDB = {
  id: string,
  userId: string,
  title: string,
  isDone: boolean
  descId: string
}

export type TodoDescriptionDB = {
  id: string,
  description: string
}

export const defUsers: Array<UserDB> = [{
  id: "u_1",
  name: "yossi"
}, {
  id: "u_2",
  name: "moshe"
}, {
  id: "u_3",
  name: "Sigalit"
}];

export const defDescs: Array<TodoDescriptionDB> = [{
  id: "desc_1",
  description: "asdasdasd"
}, {  
  id: "desc_2",
  description: "kgkgk dkdkfjj dldkfj eir"
}];

export const defTodos: Array<TodoDB> = [{
  id: "t_1",
  userId: "u_1",
  title: "todo 1",
  isDone: false,
  descId: "desc_1"
}, {
  id: "t_2",
  userId: "u_1",
  title: "todo 2",
  isDone: false,
  descId: "desc_2"
}, {
  id: "t_2",
  userId: "u_2",
  title: "todo 3",
  isDone: false,
  descId: "desc_2"
}, {
  id: "t_4",
  userId: "u_2",
  title: "todo 4",
  isDone: false,
  descId: "desc_1"
}, {
  id: "t_5",
  userId: "u_2",
  title: "todo 5",
  isDone: false,
  descId: "desc_2"
}, {
  id: "t_6",
  userId: "u_3",
  title: "todo 6",
  isDone: false,
  descId: "desc_1"
}]