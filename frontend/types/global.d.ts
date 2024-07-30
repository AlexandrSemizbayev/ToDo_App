declare global {
  interface IToDo {
    id?: number,
    task: string,
    completed: boolean,
    user: number,
    status: string,
  }
  interface IToDoRaw extends IToDo{
    created_at: string,
    updated_at: string,
    target_time_at: string,
  }

  interface IToDoSer extends IToDo{
    createdAt: string,
    updatedAt: string,
    targetTimeAt: string,
  }
}