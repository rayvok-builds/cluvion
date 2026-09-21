"use client";

import React from "react";
import Link from "next/link";
import GlassSurface from "@/components/GlassSurface";

export interface ButtonProps {
  text?: string;
  variant?: "white" | "transparent" | "glass";
  className?: string;
  onClick?: (e?: React.MouseEvent<any>) => void;
  type?: "button" | "submit" | "reset";
  href?: string;
  target?: string;
  rel?: string;
  [key: string]: any;
}

export const Button: React.FC<ButtonProps> = ({
  text = "Button",
  variant = "white",
  className = "",
  onClick,
  type = "button",
  href,
  target,
  rel,
  ...props
}) => {
  // Matches reference exactly — animate-elastic-scale + transform-gpu
  const baseClasses =
    "px-4 sm:px-5 py-2 sm:py-2.5 font-medium rounded-full transition-all duration-300 ease-in-out cursor-pointer animate-elastic-scale transform-gpu text-sm sm:text-base font-secondary whitespace-nowrap inline-flex items-center justify-center select-none";

  const variantClasses: Record<string, string> = {
    transparent: "bg-transparent text-white lg:hover:text-white btn-transparent",
    white: "bg-white text-[#070709] lg:hover:text-white btn-white",
    glass: "bg-transparent text-white lg:hover:text-black btn-glass",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant] ?? variantClasses.white} ${className}`;

  const renderContent = () => {
    if (href) {
      if (target === "_blank" || href.startsWith("http")) {
        return (
          <a
            href={href}
            target={target}
            rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
            className={combinedClasses}
            onClick={onClick}
            {...props}
          >
            {text}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClasses} onClick={onClick} {...props}>
          {text}
        </Link>
      );
    }
    return (
      <button type={type} className={combinedClasses} onClick={onClick} {...props}>
        {text}
      </button>
    );
  };

  // Glass variant: wrap in GlassSurface (matches reference structure)
  if (variant === "glass") {
    return (
      <div className="flex justify-center w-full">
        <GlassSurface
          width="auto"
          height="auto"
          borderRadius={50}
          borderWidth={0.2}
          brightness={60}
          backgroundOpacity={0.12}
          blur={15}
          saturation={1.2}
          distortionScale={-120}
          className="inline-block max-w-fit"
          style={{ display: "inline-flex" }}
        >
          {renderContent()}
        </GlassSurface>
      </div>
    );
  }

  return renderContent();
};

export default Button;
