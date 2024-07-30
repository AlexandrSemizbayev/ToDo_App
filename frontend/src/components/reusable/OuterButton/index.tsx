import styles from "./styles.module.scss";
import { useState, useEffect } from "react";

interface OuterButtonProps {
	callback: () => void,
	toggleImages?: boolean,
	images?: [string,string],
	imageSrc?: string,
	imageHeightAndWidth?: number | string,	// based on tailwind sizes, example: (8) => w-8 -> where 8 == 2rem
	wrapperClasses?: string,
	orientation: 'vertical' | 'horizontal',
	bg?: string,
	children?: React.JSX.Element
}
const OuterButton: React.FC<OuterButtonProps> = (
	{
		children,
		callback,
		toggleImages = false,
		images = [],
		imageSrc = '/icons/color-palette.png',
		imageHeightAndWidth = 8,
		wrapperClasses = '',
		orientation = 'horizontal',
		bg = 'bg-blue-500',

	}
) => {
	const imageSizeInRems = (typeof imageHeightAndWidth == 'string' ? parseInt(imageHeightAndWidth) : imageHeightAndWidth) / 4;
	const horLeft = '-2.75rem';
	const horBottom = (1.4 + 0.1 * (imageSizeInRems - 2)) + 'rem';
	const wrapperClassesAssignment = wrapperClasses ?
		wrapperClasses :
		orientation === 'horizontal' ?
			'absolute bottom-[-13%] left-[calc(50%-2.5rem-4px)]' :
			'absolute top-[-5%] right-[-10%]';
	const [imagesToggler, setToggle] = useState(!toggleImages)
	function defineImageToShow() {
		return toggleImages ?
			imagesToggler ? images[0] : images[1]
			:	imageSrc;
	}
	const [imageToShow, setImageToShow] = useState(defineImageToShow());
	useEffect(() => {
		setImageToShow(defineImageToShow());
	}, [imagesToggler]);

	function callCallback() {
		if(toggleImages) {
			setToggle((val: boolean) => {
				return !val
			});
		}
		callback();
	}
	return <>
			{ orientation === 'horizontal' ?
				<div className={`${styles['button-wrapper']} ${wrapperClassesAssignment}`}>
					<div
						className={`${styles['button-image-wrapper']} ${styles['horizontal-element']} ${bg} p-4 relative flex items-center`}>
						<div className={`${styles['left-corner']} h-full w-full relative`} style={{left:horLeft,bottom: horBottom}}></div>
						<img
							src={imageToShow}
							alt="color settings selector"
							style={{
								height: imageSizeInRems + 'rem',
								width: imageSizeInRems + 'rem',
							}}
							onClick={callCallback}
						/>
						<div className={`${styles['right-corner']} h-full w-full relative`} style={{right:horLeft, bottom: horBottom}}></div>
					</div>
				</div>
				:
				<div className={`${styles['button-wrapper']} ${wrapperClassesAssignment}`}>
					<div
						className={`${styles['button-image-wrapper']} ${styles['vertical-element']} ${bg} p-4 relative flex items-center`}
					>

						{children}

						<div className={`${styles['top-corner']} h-full w-full relative`}></div>
						<img
							src={imageToShow}
							alt="color settings selector"
							style={{
								height: imageSizeInRems + 'rem',
								width: imageSizeInRems + 'rem',
							}}
							className={`z-10`}
							onClick={callCallback}
						/>
						<div className={`${styles['bottom-corner']} h-full w-full relative`}></div>
					</div>
				</div>
			}
	</>
}

export default OuterButton;