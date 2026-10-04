import { FACES, JEWELS, SLOTS } from "@/lib/catalog";
import { bloomOpen, foldClose, jewelInTray, revealShrine, useSanctum } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Overlay() {
  const open = useSanctum((s) => s.open);
  const core = useSanctum((s) => s.core);
  const held = useSanctum((s) => s.held);
  const placed = useSanctum((s) => s.placed);
  const intro = useSanctum((s) => s.intro);
  const toggleFace = useSanctum((s) => s.toggleFace);
  const hold = useSanctum((s) => s.hold);
  const fill = useSanctum((s) => s.fill);
  const clear = useSanctum((s) => s.clear);
  const dismissIntro = useSanctum((s) => s.dismissIntro);
  const filled = Object.keys(placed).length;

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-3 sm:p-5">
      <header className="pointer-events-auto flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div>
          <p className="text-[10px] tracking-[0.28em] text-muted-foreground">AZURE CAPSTONE</p>
          <h1 className="font-display text-2xl font-medium tracking-tight sm:text-4xl">Azure Capstone</h1>
          <p className="mt-0.5 text-xs tabular-nums text-muted-foreground">
            {filled}/{SLOTS.length} filled
            {held ? ` · placing ${JEWELS.find((j) => j.id === held)?.name}` : ""}
          </p>
        </div>
        {!intro && (
          <div className="flex gap-2 overflow-x-auto pb-0.5 sm:flex-col sm:overflow-visible">
            <div className="flex shrink-0 gap-2">
              {FACES.map((f) => (
                <Button
                  key={f.id}
                  size="sm"
                  className="min-h-11 min-w-16 sm:min-h-9"
                  variant={open[f.id] > 0.5 ? "default" : "secondary"}
                  onClick={() => toggleFace(f.id)}
                >
                  {f.label}
                </Button>
              ))}
            </div>
            <div className="flex shrink-0 gap-2">
              <Button size="sm" className="min-h-11 sm:min-h-9" variant="secondary" onClick={bloomOpen}>
                Open faces
              </Button>
              <Button
                size="sm"
                className="min-h-11 sm:min-h-9"
                variant={core > 0.5 ? "default" : "secondary"}
                onClick={revealShrine}
              >
                Shrine
              </Button>
              <Button size="sm" className="min-h-11 sm:min-h-9" variant="secondary" onClick={foldClose}>
                Close
              </Button>
              <Button size="sm" className="min-h-11 sm:min-h-9" variant="secondary" onClick={fill}>
                Fill
              </Button>
              <Button size="sm" className="min-h-11 sm:min-h-9" variant="ghost" onClick={clear}>
                Empty
              </Button>
            </div>
          </div>
        )}
      </header>

      {intro ? (
        <div className="pointer-events-auto mx-auto w-full max-w-md rounded-xl bg-card/95 p-4 shadow-[var(--shadow-border)] sm:p-5">
          <p className="text-[10px] tracking-[0.28em] text-muted-foreground">HANDMADE CABINET</p>
          <h2 className="mt-1 font-display text-2xl sm:text-3xl">Open a face. Dress the shrine.</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Each teal door swings away so the inner compartment faces you — pegs, coils, shelves, vials.
            Then open the shrine at the heart. Pick a piece, tap a ring.
          </p>
          <Button className="mt-4 min-h-12 w-full" onClick={dismissIntro}>
            Enter
          </Button>
        </div>
      ) : (
        <footer className="pointer-events-auto">
          <p className="mb-2 hidden text-center text-[11px] tracking-wide text-muted-foreground sm:block">
            Open a face first. Pick a piece, then tap a ring on that display.
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {JEWELS.map((j) => {
              const inTray = jewelInTray(placed, held, j.id);
              const selected = held === j.id;
              return (
                <button
                  key={j.id}
                  type="button"
                  disabled={!inTray && !selected}
                  onClick={() => hold(selected ? null : j.id)}
                  className={cn(
                    "flex min-h-12 min-w-28 shrink-0 flex-col items-start justify-center rounded-md px-3 text-left shadow-[var(--shadow-border)]",
                    selected ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground",
                    !inTray && !selected && "opacity-35",
                  )}
                >
                  <span className="font-display text-sm leading-tight">{j.name}</span>
                  <span className={cn("text-[10px]", selected ? "opacity-70" : "text-muted-foreground")}>
                    {inTray || selected ? "in tray" : "placed"}
                  </span>
                </button>
              );
            })}
          </div>
        </footer>
      )}
    </div>
  );
}
