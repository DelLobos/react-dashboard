import React from "react";
import "./DiagnosisHistory.scss";
import type { Patient } from "../../types/patient.type";
import { BloodPressureChart } from "../BloodPressureChart/BloodPressureChart";
import { Vitals } from "../Vitals/Vitals";

type DiagnosisHistoryProps = {
  patient: Patient | null;
};

export function DiagnosisHistory({ patient }: DiagnosisHistoryProps) {
  if (!patient) {
    return (
      <div className="diagnosis-history-container">
        No patient data available.
      </div>
    );
  }

  return (
    <div className="diagnosis-history-container">
      <h2>Diagnosis History</h2>
      <BloodPressureChart patient={patient} />
      <Vitals patient={patient} />
    </div>
  );
}
