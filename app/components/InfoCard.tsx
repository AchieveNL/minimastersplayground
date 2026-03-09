import { ReactNode } from "react";

export default function InfoCard({
  icon,
  title,
  description,
  iconWidth,
  posDesktop,
  posMobile,
}: {
  icon?: string;
  title?: ReactNode;
  description?: string;
  iconWidth?: number;
  posDesktop?: number;
  posMobile?: number;
}) {
  return (
    <div className="">
      <div className="flex items-center relative justify-center xl:w-[75%] xl:mx-auto mx-5 m-auto bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] rounded-br-4xl">
        <img
          src={icon}
          className="absolute md:hidden"
          style={{ width: iconWidth, left: posMobile }}
          alt=""
        />
        <img
          src={icon}
          className="absolute hidden md:block"
          style={{ width: iconWidth, left: posDesktop }}
          alt=""
        />
        {title}
      </div>
      <p className="text-[#67CD8A] font-medium text-center m-auto xl:w-[75%] mt-8 md:text-base text-sm">
        {description}
      </p>
    </div>
  );
}
