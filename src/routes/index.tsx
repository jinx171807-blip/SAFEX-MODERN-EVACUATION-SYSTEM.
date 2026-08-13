import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/safepath/Hero";
import { Simulation } from "@/components/safepath/Simulation";
import { Features, Roadmap, Team, Footer } from "@/components/safepath/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SafePath — Adaptive Emergency Evacuation Guidance" },
      {
        name: "description",
        content:
          "SafePath models a building as a live hazard graph and reroutes occupants to the safest reachable exit in under a second.",
      },
      { property: "og:title", content: "SafePath — Adaptive Emergency Evacuation Guidance" },
      {
        property: "og:description",
        content:
          "Live evacuation simulation: routes that rebuild themselves as fire, smoke and crowds spread.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <Simulation />
      <Features />
      <Roadmap />
      <Team />
      <Footer />
    </main>
  );
}
