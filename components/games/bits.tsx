import { pickAge, type AgeCopy, type AgeId } from "@/lib/types";

export function RoundLabel({ current, total }: { current: number; total: number }) {
  return (
    <p className="text-sm font-extrabold tracking-wide text-muted uppercase">
      Round {current} of {total}
    </p>
  );
}

export function WhyBox({ age, copy }: { age: AgeId; copy: AgeCopy }) {
  return (
    <p className="why-box mt-3" role="status">
      {pickAge(age, copy)}
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
