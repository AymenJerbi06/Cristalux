'use client';

import { Gift } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function RewardsBubble() {
  const [visible, setVisible] = useState(false);
  const showTimer = useRef<number | null>(null);
  const scrollingTimer = useRef<number | null>(null);

  useEffect(() => {
    const scheduleReveal = (delay: number) => {
      if (showTimer.current) {
        window.clearTimeout(showTimer.current);
      }

      showTimer.current = window.setTimeout(() => {
        setVisible(true);
      }, delay);
    };

    const handleScroll = () => {
      setVisible(false);

      if (showTimer.current) {
        window.clearTimeout(showTimer.current);
        showTimer.current = null;
      }

      if (scrollingTimer.current) {
        window.clearTimeout(scrollingTimer.current);
      }

      scrollingTimer.current = window.setTimeout(() => {
        scheduleReveal(1800);
      }, 450);
    };

    scheduleReveal(4200);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (showTimer.current) {
        window.clearTimeout(showTimer.current);
      }
      if (scrollingTimer.current) {
        window.clearTimeout(scrollingTimer.current);
      }
    };
  }, []);

  return (
    <button
      type="button"
      className={visible ? 'rewards-bubble visible' : 'rewards-bubble'}
      aria-label="Rewards program preview"
    >
      <Gift size={22} />
      <span>Rewards</span>
    </button>
  );
}
