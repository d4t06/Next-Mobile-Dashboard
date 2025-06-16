import { Button } from "@/share/components";
import {
  Bars3Icon,
  BookmarkSquareIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // hooks

  const classes = {
    toggleSidebar: "menu-btn !absolute left-0 block sm:hidden top-1/2",
    container: `block sm:hidden fixed z-[99] top-0 left-0 bottom-0 w-[160px] max-w-[60vw] bg-white  transition-[transform, opacity] duration-[.3s] `,
    open: "translate-x-0 opacity-[1]",
    hide: "translate-x-[-100%] opacity-[0.5] pointer-events-none",
    closeBtn: "absolute right-[10px] top-[10px]",
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
    else return "";
  };

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[90] bg-black/60"
        ></div>
      )}
      <div
        className={`${classes.container} ${open ? classes.open : classes.hide}`}
      >
        <div className={classes.linkList}>
          <Link
            onClick={() => setOpen(false)}
            to="/"
            className={`${getActive("/")}`}
          >
            <DevicePhoneMobileIcon />
            <span>Product</span>
          </Link>

          <Link
            className={`${getActive("/dashboard/category")}`}
            to="/category"
            onClick={() => setOpen(false)}
          >
            <BookmarkSquareIcon />
            <span>Category</span>
          </Link>
        </div>
      </div>

      <Button
        colors={"second"}
        size={"clear"}
        className="p-[4px]"
        onClick={() => setOpen(true)}
      >
        <Bars3Icon className="w-6" />
      </Button>
    </>
  );
}
