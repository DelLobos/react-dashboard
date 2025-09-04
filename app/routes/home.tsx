import type { Route } from "./+types/home";
import { HomeDashboard } from "../pages/HomeDashboard";
import "./home.scss";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tech.Care Dashboard" },
    { name: "description", content: "Welcome to Tech.Care Dashboard!" },
  ];
}

export default function Home() {
  return (
    <main className="home flex justify-center pb-4">
      <HomeDashboard />
    </main>
  );
}
