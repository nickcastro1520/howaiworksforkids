export function RoundLabel({ current, total }: { current: number; total: number }) {
  return (
    <p className="text-sm font-extrabold tracking-wide text-muted uppercase">
      Round {current} of {total}
    </p>
  );
}

export function WhyBox({ copy }: { copy: string }) {
  return (
    <p className="why-box mt-3" role="status">
      {copy}
    </p>
  );
}

export function ChoiceButton({
  pressed,
  onClick,
  children,
}: {
  pressed?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button type="button" className="choice" aria-pressed={pressed ?? false} onClick={onClick}>
      {children}
    </button>
  );
}
