"use client";

import TravelPlannerHero from "@/components/TravelPlannerHero";
import TravelPlannerProcess from "@/components/TravelPlannerProcess";
import TravelPlannerServices from "@/components/TravelPlannerServices";
import { ViewTransitionProvider } from "@/components/ViewTransitionProvider";
import WhyTravelPlanner from "@/components/WhyTravelPlanner";

export default function TravelPlannerPage() {
  return (
    <ViewTransitionProvider>
      <main className="flex flex-col">
        <TravelPlannerHero />
        <WhyTravelPlanner />
        <TravelPlannerServices />
        <TravelPlannerProcess />
      </main>
    </ViewTransitionProvider>
  );
}
