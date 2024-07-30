interface ObjectConstructor {
  keys<T>(obj: T): Array<keyof T>
}
interface IToDo {
  id?: number,
  title: string,
  task: string,
  color: string,
}
interface IToDoRaw extends IToDo{
  bg_color: string,
}

interface IToDoSer extends IToDo{
  bgColor: string,
  isNew?: boolean,  // used only on client
}
