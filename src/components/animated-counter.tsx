"use client";

import { useState, useEffect, useRef } from 'react';

type AnimatedCounterProps = {
  value: number;
  isApproximate?: boolean;
};

const AnimatedCounter = ({ value, isApproximate = false }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const duration = 2000;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = value;
          if (start === end) return;

          const startTime = Date.now();

          const animate = () => {
            const currentTime = Date.now();
            const progress = Math.min(1, (currentTime - startTime) / duration);
            const currentCount = Math.floor(progress * (end - start) + start);
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {isApproximate && count === value ? `${value.toLocaleString()}+` : count.toLocaleString()}
    </span>
  );
};

export default AnimatedCounter;
