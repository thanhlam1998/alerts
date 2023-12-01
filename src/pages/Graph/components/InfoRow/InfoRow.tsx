const InfoRow = ({ label, value }: any) => {
	return (
		<div className="info-row flex flex-col gap-1">
			<div className="info-row__label text-gray500 mb-1 text-sm leading-4">
				{label}
			</div>
			<div className="info-row__value font-semibold text-base leading-5 min-h-[16px] whitespace-pre-wrap">
				{value}
			</div>
		</div>
	);
};

export default InfoRow;
