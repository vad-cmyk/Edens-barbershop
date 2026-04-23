"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "solid",
      size = "md",
      className,
      children,
      as = "button",
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center font-sans font-medium tracking-[0.15em] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 select-none";

    const variants = {
      solid:
        "bg-near-black text-bone border border-near-black hover:bg-transparent hover:text-near-black active:scale-[0.98]",
      ghost:
        "bg-transparent text-near-black border border-near-black hover:bg-near-black hover:text-bone active:scale-[0.98]",
      outline:
        "bg-transparent text-bone border border-bone hover:bg-bone hover:text-near-black active:scale-[0.98]",
    };

    const sizes = {
      sm: "px-5 py-2 text-[10px]",
      md: "px-7 py-3 text-[11px]",
      lg: "px-10 py-4 text-xs",
    };

    const classes = cn(base, variants[variant], sizes[size], className);

    if (as === "a" && href) {
      return (
        <a href={href} target={target} rel={rel} className={classes}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
