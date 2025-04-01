"use client";

import TravelPlannerAdvantages from "@/components/TravelPlannerAdvantages";
import TravelPlannerFormules from "@/components/TravelPlannerFormules";
import TravelPlannerHero from "@/components/TravelPlannerHero";
import TravelPlannerProcess from "@/components/TravelPlannerProcess";

export default function TravelPlannerPage() {
  return (
    <main className="flex flex-col">
      <TravelPlannerHero />
      <TravelPlannerAdvantages />
      <TravelPlannerFormules />
      <TravelPlannerProcess />
    </main>
  );
}
