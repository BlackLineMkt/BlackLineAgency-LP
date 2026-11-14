export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex items-center gap-2">
        <span className="font-display text-lg font-extrabold tracking-tight text-foreground">
          BL
        </span>
        <span className="block h-5 w-[2px] bg-foreground" />
        <span className="font-display text-base font-extrabold tracking-tight text-foreground">
          BLACK LINE
        </span>
      </div>
    </div>
  );
}
