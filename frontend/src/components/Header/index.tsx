interface HeaderProps {
	title?: string;
}
const Header: React.FC<HeaderProps> = ({title = ''}) => {
	return <>
		<nav className="z-50 border-b mb-4 py-4 pl-6 overflow-hidden sticky bg-blue-500 top-0 left-0 z-10">
			<div className="h-15 w-screen">
				<h1 className={`text-xl font-bold text-white`}>{title}</h1>
			</div>
		</nav>
	</>
}
export default Header;