import type { Route } from "./+types/home";
import { HomeDashboard } from "../pages/HomeDashboard";
import "./home.scss";
import { PatientEE } from "~/components/PatientEE/PatientEE";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tech.Care Dashboard" },
    { name: "description", content: "Welcome to Tech.Care Dashboard!" },
  ];
}

export default function Home() {
  const show = import.meta.env.VITE_SHOW_CONSOLE_LOG_WELCOME_MESSAGE === "true";

  return (
    <main className="home flex justify-center pb-4">
      <HomeDashboard />
      {show && <PatientEE />}
    </main>
  );
}
