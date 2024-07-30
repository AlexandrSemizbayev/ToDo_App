interface DefaultLayoutProps {
	slots: {
		el: React.FunctionComponent,
		props?: {
			[key: string]: any
		};
	}[];
}
const DefaultLayout: React.FC<DefaultLayoutProps> = ({slots}) => {
	return <>
		{
			slots.map((Slot, index) => {
				const props = Slot.props || {};
				return <Slot.el key={index} {...props} />
			})
		}
	</>
};

export default DefaultLayout;