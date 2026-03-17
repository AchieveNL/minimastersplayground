import { ReactNode } from "react";

export default function InfoCard({
  icon,
  title,
  description,
  iconWidth,
  posDesktop,
  posMobile,
  index = 0,
}: {
  icon?: string;
  title?: ReactNode;
  description?: string;
  iconWidth?: number;
  posDesktop?: number;
  posMobile?: number;
  index?: number;
}) {
  const totalIcons = 3;
  const shakeDuration = 0.5;
  const pauseBetween = 2;
  const cycleLength = totalIcons * pauseBetween;
  const delay = index * pauseBetween;
  const shakePercent = (shakeDuration / cycleLength) * 100;

  const animationName = `shake-${index}`;

  return (
    <div className="">
      <style>{`
        @keyframes ${animationName} {
          0%, ${shakePercent}%, 100% { transform: rotate(0deg); }
          ${shakePercent * 0.2}% { transform: rotate(-8deg); }
          ${shakePercent * 0.4}% { transform: rotate(8deg); }
          ${shakePercent * 0.6}% { transform: rotate(-5deg); }
          ${shakePercent * 0.8}% { transform: rotate(5deg); }
        }
      `}</style>
      <div className="flex items-center relative justify-center xl:w-[75%] xl:mx-auto mx-5 m-auto bg-linear-to-r from-[#67CD8A] via-[#67CD8A] to-[#A5DEB9] rounded-br-4xl">
        <img loading="lazy"
          src={icon}
          className="absolute md:hidden"
          style={{
            width: (iconWidth ?? 100) * 0.65,
            left: (posMobile ?? 0) * 0.55,
            animation: `${animationName} ${cycleLength}s ease-in-out ${delay}s infinite`,
          }}
          alt=""
        />
        <img loading="lazy"
          src={icon}
          className="absolute hidden md:block"
          style={{
            width: iconWidth,
            left: posDesktop,
            animation: `${animationName} ${cycleLength}s ease-in-out ${delay}s infinite`,
          }}
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
