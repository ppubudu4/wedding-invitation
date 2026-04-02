"use client";

import { useMemo } from "react";

const PETAL_COUNT = 25;

const PETAL_COLORS = [
  "#d4a0a0",
  "#e8c5c5",
  "#c98b8b",
  "#ebd4d4",
  "#dbb0b0",
  "#f0dede",
] as const;

type PetalConfig = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  rotation: number;
  swayAmount: number;
  opacity: number;
};

const generatePetals = (): PetalConfig[] =>
  Array.from({ length: PETAL_COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 6,
    size: 10 + Math.random() * 14,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    rotation: Math.random() * 360,
    swayAmount: 30 + Math.random() * 50,
    opacity: 0.4 + Math.random() * 0.4,
  }));

const RosePetalsShower = () => {
  const petals = useMemo(generatePetals, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      <style>{`
        @keyframes petalFall {
          0% {
            transform: translateY(-5vh) rotate(var(--start-rot));
            opacity: 0;
          }
          10% {
            opacity: var(--petal-opacity);
          }
          90% {
            opacity: var(--petal-opacity);
          }
          100% {
            transform: translateY(105vh) rotate(calc(var(--start-rot) + 360deg));
            opacity: 0;
          }
        }

        @keyframes petalSway {
          0%, 100% {
            translateX(0);
          }
          25% {
            translate: var(--sway-amount);
          }
          75% {
            translate: calc(var(--sway-amount) * -1);
          }
        }

        .petal {
          position: absolute;
          top: 0;
          animation:
            petalFall var(--fall-duration) var(--fall-delay) ease-in-out infinite,
            petalSway var(--sway-duration) var(--fall-delay) ease-in-out infinite;
          will-change: transform, opacity;
        }
      `}</style>

      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}%`,
            "--start-rot": `${petal.rotation}deg`,
            "--petal-opacity": petal.opacity,
            "--fall-duration": `${petal.duration}s`,
            "--fall-delay": `${petal.delay}s`,
            "--sway-amount": `${petal.swayAmount}px`,
            "--sway-duration": `${petal.duration * 0.5}s`,
          } as React.CSSProperties}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 20 26"
            fill="none"
          >
            <path
              d="M10 0C10 0 0 8 0 16C0 21.5 4.5 26 10 26C15.5 26 20 21.5 20 16C20 8 10 0 10 0Z"
              fill={petal.color}
            />
            <path
              d="M10 4C10 4 6 10 6 16C6 19 7.8 22 10 22"
              stroke={petal.color}
              strokeOpacity={0.4}
              strokeWidth={0.5}
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export { RosePetalsShower };
