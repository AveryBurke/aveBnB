import React from "react";

interface ListingCategoryProps {
	category: Category;
}

const ListingCategory: React.FC<ListingCategoryProps> = ({ category: { icon: Icon, description, location } }) => {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-row items-center gap-4">
				<Icon size={40} className="text-neutral-600" />
				<div className="flex flex-col">
					<div className="text-lg font-semibold">{location}</div>
					<div className="text-sm font-light text-neutral-500">{description}</div>
				</div>
			</div>
		</div>
	);
};

export default ListingCategory;
