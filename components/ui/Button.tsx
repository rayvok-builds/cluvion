"use client";

import React from "react";
import Link from "next/link";
import GlassSurface from "@/components/GlassSurface";

export interface ButtonProps {
  text?: string;
  children?: React.ReactNode;
  variant?: "white" | "transparent" | "glass";
  darkHover?: boolean;
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
  children,
  variant = "white",
  darkHover = true,
  className = "",
  onClick,
  type = "button",
  href,
  target,
  rel,
  ...props
}) => {
  const baseClasses =
    "font-medium rounded-full transition-all duration-300 ease-in-out cursor-pointer animate-elastic-scale transform-gpu font-secondary whitespace-nowrap inline-flex items-center justify-center select-none";

  const variantClasses: Record<string, string> = {
    transparent: "bg-transparent text-white btn-transparent px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base",
    white: "bg-white text-[#070709] border border-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base btn-white",
    glass: "bg-transparent text-white btn-glass px-5 sm:px-7 py-2.5 sm:py-3.5 text-sm sm:text-base tracking-tight",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant] ?? variantClasses.white} ${className}`;
  const content = children ?? text;

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
            {content}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClasses} onClick={onClick} {...props}>
          {content}
        </Link>
      );
    }
    return (
      <button type={type} className={combinedClasses} onClick={onClick} {...props}>
        {content}
      </button>
    );
  };

  if (variant === "glass") {
    return (
      <GlassSurface
        width="auto"
        height="auto"
        borderRadius={9999}
        borderWidth={0.15}
        brightness={28}
        backgroundOpacity={0.10}
        saturation={1.2}
        distortionScale={-120}
        className="inline-flex group border border-white/20 hover:border-white transition-colors duration-300"
        style={{ display: "inline-flex" }}
      >
        {renderContent()}
      </GlassSurface>
    );
  }

  return renderContent();
};

export default Button;
