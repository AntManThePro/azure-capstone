import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Overlay } from "@/components/pyramid/overlay";
import { PyramidScene } from "@/components/pyramid/scene";
import { useSanctum } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    void useSanctum.persist.rehydrate();
    setReady(true);
  }, []);

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-background">
      {ready ? <PyramidScene /> : <div className="h-full w-full bg-background" />}
      <Overlay />
    </main>
  );
}
