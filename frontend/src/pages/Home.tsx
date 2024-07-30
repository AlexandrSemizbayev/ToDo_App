import { getTodos, createTodo, updateTodo, deleteTodo } from '@/api/api';
import { serializeToDo } from "../serializers/ToDo";
import { useEffect, useState } from "react";
import ImgButton from '@/components/reusable/ImgButton';
import ToDo from '@/components/ToDo';

type fetchWriteFunc = (task: IToDoSer, callback?: (arg: IToDoSer) => void) => void;

const Home = () => {
	const [isThereANewTask, changeStateOfNewTask] = useState<boolean>(false);
	const [todos,setTodos] = useState<IToDoSer[]>([]);
	const [newTodos, setNewTodos] = useState<IToDoSer[]>([]);
	function fetchTodos() {
		getTodos().then((todoArray: IToDoSer[]) => {
			setTodos((arr) => {
				return [...arr,...todoArray]
			});
		});
	}
	useEffect(() => {
		fetchTodos()
	}, []);
	function createNewTask() {
		const newTask = serializeToDo({} as IToDoRaw);
		newTask.isNew = true;
		changeStateOfNewTask(() => true);
		setNewTodos((arr) => {
			return [...arr, newTask];
		});
	}
	const createTask: fetchWriteFunc = function (task) {
		createTodo(task).then((createdTask: IToDoSer) => {
			setTodos((arr) => [...arr,createdTask]);
			setNewTodos(() =>[]);
			changeStateOfNewTask(() => false);
		});
	}

	const updateTask: fetchWriteFunc = function(task, callback) {
		updateTodo(task).then((updatedTask: IToDoSer) => {
			if (callback) {
				callback(updatedTask);
			}
		});
	}
	function removeTaskLocal(taskIndex: number) {
		const tempTodos = todos.filter((_,idx) => idx !== taskIndex);
		setTodos(tempTodos);
	}
	function onDeleteAction(taskId: number = 0, index: number) {
		if(taskId) {
			deleteTodo(taskId).then(() => {
				removeTaskLocal(index);
			})
		} else {
			setNewTodos([]);
			changeStateOfNewTask(() => false);
		}
	}

	return <div>
		<div className="w-full flex flex-wrap z-10 min-h-screen">
			{isThereANewTask}
			<div className="new-task fixed bottom-4 right-4">
				<ImgButton
					callback={createNewTask}
					imageSrc={`/icons/add.png`}
					wrapperClasses={`p-4 bg-blue-400 rounded-full`}
					sizes={[4,4]}
					disabled={isThereANewTask}
				/>
			</div>
			{
				todos.map((todo, idx) => <ToDo
					onSaveAction={(task: IToDoSer, callback: (updatedTask: IToDoSer) => void) => {updateTask(task,(updatedTask: IToDoSer) => callback(updatedTask) )}}
					onDeleteAction={() => {onDeleteAction(todo.id, idx)}}
					key={`${todo.id}-${idx}`} todo={todo}
					idx={idx}
				/>)
			}
			{
				newTodos.map((todo, idx) => <ToDo
					onSaveAction={(task: IToDoSer) => {createTask(task)}}
					onDeleteAction={() => {onDeleteAction(todo.id, idx)}}
					key={`${todo.id}-${idx}`} todo={todo}
					idx={idx}
				/>)
			}
		</div>
		<section className="source-of-icons my-4 w-full text-center">
			<a
				href="https://www.flaticon.com/free-icons/fill-color"
				title="icons"
				target="_blank"
				className="text-blue-500 text-xl underline hover:text-red-600"
			>
				Icons created by Ranah Pixel Studio - Flaticon
			</a>
		</section>
	</div>
};
export default Home;