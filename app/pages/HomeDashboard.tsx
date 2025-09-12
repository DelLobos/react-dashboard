import { MainNavigation } from "../components/MainNavigation/MainNavigation";
import React, { useState, useEffect } from "react";
import "./HomeDashboard.scss";
import { Patients } from "~/components/Patients/Patients";
import { DiagnosisHistory } from "~/components/DiagnosisHistory/DiagnosisHistory";
import { fetchPatients } from "~/api/patientsAPI";
import type { Patient } from "~/types/patient.type";
import { DiagnosticList } from "~/components/DiagnosticList/DiagnosticList";
import { PatientInfo } from "~/components/PatientInfo/PatientInfo";
import { LabResults } from "~/components/LabResults/LabResults";

export function HomeDashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    fetchPatients()
      .then((data) => setPatients(data))
      .finally(() => setLoading(false));
  }, []);

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  function useIsTablet() {
    const getIsTablet = () =>
      typeof window !== "undefined" && window.innerWidth <= 1024;

    const [isTablet, setIsTablet] = useState(getIsTablet());

    useEffect(() => {
      if (typeof window === "undefined") return;
      const handleResize = () => setIsTablet(getIsTablet());
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isTablet;
  }

  const isTablet = useIsTablet();

  if (loading) return <div>Loading...</div>;
  if (isTablet) {
    return (
      <main className="home-dashboard flex flex-col items-center justify-center pb-4">
        <MainNavigation isTablet={isTablet} />
        <div className="home-dashboard__content flex flex-row">
          <div className="home-dashboard__content__column patients-info">
            <PatientInfo patient={selectedPatient} />
            <Patients
              patients={patients}
              onPatientSelect={handlePatientSelect}
            />
          </div>
          <div className="home-dashboard__content__column diagnostics-info">
            <DiagnosisHistory patient={selectedPatient} />
            <DiagnosticList patient={selectedPatient} />
            <LabResults patient={selectedPatient} />
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <main className="home-dashboard flex flex-col items-center justify-center pb-4">
        <MainNavigation isTablet={isTablet} />
        <div className="home-dashboard__content flex flex-row justify-space-between">
          <div className="home-dashboard__content__column patients">
            <Patients
              patients={patients}
              onPatientSelect={handlePatientSelect}
            />
          </div>
          <div className="home-dashboard__content__column diagnostics">
            <DiagnosisHistory patient={selectedPatient} />
            <DiagnosticList patient={selectedPatient} />
          </div>
          <div className="home-dashboard__content__column profile-labs">
            <PatientInfo patient={selectedPatient} />
            <LabResults patient={selectedPatient} />
          </div>
        </div>
      </main>
    );
  }
}
