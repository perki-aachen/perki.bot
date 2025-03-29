// BirthdayCheckerComponents.tsx
import React from "react";

interface CountdownProps {
  readonly nextExecution: Date;
}

export default function Countdown({ nextExecution }: CountdownProps) {
  const [timeLeft, setTimeLeft] = React.useState("");

  React.useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = nextExecution.getTime() - now.getTime();
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [nextExecution]);

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-2">Time until next execution</h2>
      <p className="text-3xl font-mono">{timeLeft}</p>
    </div>
  );
}
