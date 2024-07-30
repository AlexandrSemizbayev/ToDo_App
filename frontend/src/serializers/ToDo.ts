export const serializeToDo = (todo: IToDoRaw): IToDoSer  => ({
	id: todo.id,
	title: todo.title || '',
	task: todo.task || '',
	color: todo.color || '#ffffff',
	bgColor: todo.bg_color || '#2c94ea',
});

export const serializeToDos = (todos: IToDoRaw[]): IToDoSer[] => todos.map(serializeToDo);

export const deserializeToDo = (todo: IToDoSer): IToDoRaw => ({
	id: todo.id,
	title: todo.title || '',
	task: todo.task || '',
	color: todo.color || '#000000',
	bg_color: todo.bgColor || '#ffffff',
});

export const deserializeToDos = (todos: IToDoSer[]): IToDoRaw[] => todos.map(deserializeToDo);
