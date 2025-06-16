import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { cva, type VariantProps } from "class-variance-authority";
import type { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";

const classes = {
   active: "before:shadow-none font-[500] translate-y-[2px] text-[#cd1818]",
   button__children: "flex items-center  space-x-1 justify-center",
   button:
      "relative z-0 hover:brightness-[0.95]",
};

const ButtonVariant = cva(classes.button, {
   variants: {
      variant: {
         primary:
            "before:border-2 before:absolute before:z-[-1] before:inset-0 active:translate-y-[2px] active:before:shadow-none",
         clear: "before:content-none",
      },
      size: {
         primary: "px-5 py-1.5",
         clear: "",
      },
      colors: {
         primary:
            "before:border-[#a00000] text-[#fff] bg-[#cd1818] before:shadow-[0_2px_0_#a00000]",
         second:
            "before:border-[#ccc] text-[#333] bg-[#f6f6f6] before:shadow-[0_2px_0_#ccc]",
         clear: "",
      },
      rounded: {
         xl: "before:rounded-xl rounded-xl",
         lg: "before:rounded-lg rounded-lg",
         md: "before:rounded-md rounded-md",
      },
   },

   defaultVariants: {
      variant: "primary",
      size: "primary",
      colors: "primary",
      rounded: "lg",
   },
});

interface Props extends VariantProps<typeof ButtonVariant> {
   onClick?: MouseEventHandler;
   loading?: boolean;
   children: ReactNode;
   disabled?: boolean;
   className?: string;
   type?: HTMLButtonElement["type"];
   href?: string;
   active?: boolean;
   blank?: boolean;
}
export default function Button({
   onClick,
   disabled,
   type = "button",
   children,
   loading,
   className,
   size,
   rounded,
   variant,
   colors,
   href,
   active,
   blank,
}: Props) {
   const content = (
      <>
         {loading && <ArrowPathIcon className="w-[24px] animate-spin" />}
         {!loading && children}
      </>
   );

   return (
      <>
         {href ? (
            <Link
               to={href}
               aria-disabled={disabled}
               target={blank ? "_blank" : ""}
               className={`inline-block ${ButtonVariant({
                  variant,
                  size,
                  colors,
                  className,
               })} ${active ? classes.active : ""}`}
            >
               <span className={classes.button__children}>{content}</span>
            </Link>
         ) : (
            <button
               type={type || "button"}
               onClick={onClick}
               disabled={loading || disabled}
               className={`${ButtonVariant({
                  variant,
                  size,
                  colors,
                  className,
                  rounded
               })} ${active ? classes.active : ""}`}
            >
               {/* need to wrapped children into span
               cause' on old browser display:flex property doesn't work on button element */}
               <span className={classes.button__children}>{content}</span>
            </button>
         )}
      </>
   );
}
