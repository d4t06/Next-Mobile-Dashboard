import {
	BookmarkSquareIcon,
	DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
	const location = useLocation();

	const classes = {
		container:
			"hidden z-[99] sm:block fixed left-0 top-0 bottom-0 w-[160px] bg-[#fff] border-r border-black/10",
		itemActive: "text-[#cd1818] bg-black/5",
		linkList: `[&_a]:flex
			[&_a]:items-center
			[&_a]:space-x-1
			[&_a]:py-2
			[&_a]:pl-3	
			hover:[&_a]:bg-[#f8f8f8]
			[&_svg]:w-6
			[&_svg]:flex-shrink-0
			mt-[60px]`,
	};

	const getActive = (path: string) => {
		if (location.pathname === path) return classes.itemActive;
		else return ''
	};

	return (
		<div className={`${classes.container}`}>
			<div className={classes.linkList}>
				<Link
					to="/"
					className={`${getActive("/")}`}
				>
					<DevicePhoneMobileIcon />
					<span>Product</span>
				</Link>

				<Link
					className={`${getActive("/dashboard/category")}`}
					to="/category"
				>
					<BookmarkSquareIcon />
					<span>Category</span>
				</Link>
			</div>
		</div>
	);
}
