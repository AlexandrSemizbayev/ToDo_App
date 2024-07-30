import { useState, useEffect } from "react";
import styles from './styles.module.scss';
interface ButtonProps {
	imageSrc: string,
	imageAlt?: string,
	sizes: number[],	// passed as tailwind size => 4 === 1rem || 8 === 2rem etc
	callback: () => void,
	wrapperClasses: string,
	disabled?: boolean
}
const Button: React.FC<ButtonProps> = ({
	imageSrc,
  callback,
	imageAlt = 'button',
	sizes = [8,8],
  wrapperClasses = '',
  disabled = false,
}) => {
	console.log(disabled);
	const [height, setHeight] = useState(sizes[0]);
	const [width, setWidth] = useState(sizes[1]);
	useEffect(() => {
		console.log('use effect');
		setHeight(sizes[0]);
		setWidth(sizes[1]);
	}, [sizes]);
	return <>
		<button
			disabled={disabled}
			onClick={callback}
			className={`${wrapperClasses} ${styles['image-button']}`}
			style={{
				opacity: `${disabled ? '0.4' : '1'}`,
				height: `${height}rem`,
				width: `${width}rem`,
			}}
		>
			<img
				src={imageSrc}
				alt={imageAlt}
				className="h-full w-full"
			/>
		</button>
	</>
}

export default Button;