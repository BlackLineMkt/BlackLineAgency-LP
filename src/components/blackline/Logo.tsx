export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex items-center gap-1.5">
        <span className="font-display text-lg font-bold tracking-tight text-foreground">
          BL
        </span>
        <span className="block h-5 w-px bg-gold" />
        <span className="font-display text-base font-bold tracking-tight text-foreground">
          BLACK LINE
        </span>
      </div>
    </div>
  );
}
