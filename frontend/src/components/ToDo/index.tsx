import { useState } from 'react';
import OuterButton from '@/components/reusable/OuterButton';
import styles from './styles.module.scss';

interface ToDoProps {
	todo: IToDoSer,
	onSaveAction: (
		task: IToDoSer,
		callback: (createdTask: IToDoSer) => void
	) => void,
	onDeleteAction: () => void,
	idx: number,
}

const ToDo: React.FC<ToDoProps> = ({todo, onDeleteAction, onSaveAction, idx = 0}) => {
	const [unchangedTask, setUnchangedTask] = useState(todo)
	const [hasChanged, setHasChanged] = useState<boolean>(false);
	const [showPickers, setShowPickers] = useState(false);
	const [task, setTask] = useState<IToDoSer>(todo);
	function updateTask(key: string, value: string) {
		setHasChanged(() => true);
		setTask((obj: IToDoSer) => {
			const oldTask = {
				...obj,
			}
			Object.assign(oldTask, {[key as keyof IToDoSer]:value});
			return oldTask;
		})
	}
	function resetTask() {
		setTask(() => unchangedTask);
		setHasChanged(false);
	}

	function onTaskSaved(createdTask: IToDoSer) {

		setTask((obj: IToDoSer) => {
			const temp = obj;
			Object.assign(temp, createdTask);
			setUnchangedTask(temp);
			return temp;
		});

		setHasChanged(() => false);
	}

	const styleAttr = {
		style:{
			backgroundColor: task.bgColor,
			color: task.color
		}
	}
	return <>
		<section className={`${styles.todo} rounded-3xl mx-4 flex flex-wrap items-start w-80 max-h-96 pt-4 pb-12 px-4 relative mt-4 mb-8`} {...styleAttr}>
			<div className="edge absolute" {...styleAttr}></div>
			<input
				type="text"
				{...styleAttr}
				className="title w-[80%] border-b border-slate-200 mb-4 py-2 text-2xl"
				placeholder="Title"
				value={task.title}
				onChange={(e) => updateTask('title', e.target.value)}
			/>
			<textarea
				className={`w-full mb-4 max-h-[235px]`}
				{...styleAttr}
				name="todo-text"
				id={`task-${task.id}-${idx}`}
				cols={10}
				rows={5}
				value={task.task}
				placeholder="What to do?"
				onChange={(e) => updateTask('task', e.target.value)}
			/>
			<div>
        <OuterButton
          callback={onDeleteAction}
          imageSrc={`/icons/garbage.png`}
          wrapperClasses={`absolute bottom-[-2.2rem] right-[calc(14.5rem-15px)]`}
					bg={`bg-red-500`}
          imageHeightAndWidth='6'
          orientation='horizontal'
        />
			</div>
			{ hasChanged && <div>
				<OuterButton
					callback={() => onSaveAction(task, (createdTask) => onTaskSaved(createdTask))}
					imageSrc={`/icons/accept.png`}
					wrapperClasses={`absolute bottom-[-2.2rem] left-[calc(50%-1.5rem-4px)]`}
					imageHeightAndWidth='8'
					orientation='horizontal'
				/>
				<OuterButton
					callback={() => resetTask()}
					imageSrc={`/icons/cancel.png`}
					wrapperClasses={`absolute bottom-[-2.2rem] right-[calc(2.5rem-15px)]`}
					imageHeightAndWidth='6'
					orientation='horizontal'
				/>
      </div>
			}
			<OuterButton
				callback={() => setShowPickers((val) => !val)}
				toggleImages={true}
				images={['/icons/close.png','/icons/draw.png']}
				imageHeightAndWidth='8'
				orientation='vertical'
			>
					<div
						className={`${styles['color-pickers']} w-16 right-[0%] top-[110%] rounded-xl z-20 bg-amber-950 ${!showPickers ? `h-0 ${styles['make-unvisible']}` : `h-20 ${styles['make-visible']}`} absolute`}>
						<div className="background-color-picker flex ml-4 my-1">
							<label htmlFor={`bg-color${task.id}-${idx}`}>
								<img src="/icons/paint-bucket.png" alt="background color selector" className={`h-8 w-8`}/>
							</label>
							<input
								id={`bg-color${task.id}-${idx}`}
								type="color"
								{...styleAttr}
								className={`h-0 w-0 z-[-1]`}
								value={task.color}
								onChange={(e) => updateTask('bgColor', e.target.value)}
							/>
						</div>
						<div className="text-color-picker flex ml-4">
							<label htmlFor={`color${task.id}-${idx}`}>
								<img src="/icons/color-palette.png" alt="text color selector" className={`h-8 w-8`}/>
							</label>
							<input
								id={`color${task.id}-${idx}`}
								type="color"
								className={`h-0 w-0 z-[-1]`}
								{...styleAttr}
								value={task.bgColor}
								onChange={(e) => updateTask('color', e.target.value)}
							/>
						</div>
					</div>
			</OuterButton>
		</section>
	</>
};

export default ToDo;