import React from "react";
import "./Vitals.scss";
import type { Patient } from "../../types/patient.type";

type DiagnosisHistoryProps = {
  patient: Patient | null;
};

export function Vitals({ patient }: DiagnosisHistoryProps) {
  if (!patient) {
    return (
      <div className="blood-pressure-history-container">
        No patient data available.
      </div>
    );
  }

  // Get the latest diagnosis entry
  const latestEntry =
    patient.diagnosis_history?.[0];

  if (!latestEntry) {
    return (
      <div className="blood-pressure-history-container">
        No vitals data available.
      </div>
    );
  }

  return (
    <div className="vitals-container flex justify-between items-center">
      <div className="vital-card respiratory">
        <div className="vital-icon">
          <img src="/images/respiratory.png" alt="Respiratory Rate" />
        </div>
        <div className="vital-label">Respiratory Rate</div>
        <div className="vital-value">
          {latestEntry.respiratory_rate.value}{" "}
          <span className="vital-unit">bpm</span>
        </div>
        <div
          className={`vital-status ${
            latestEntry.respiratory_rate.levels || "normal"
          }`}
        >
          {latestEntry.respiratory_rate.levels ? (
            latestEntry.respiratory_rate.levels
              .toLowerCase()
              .includes("lower") ? (
              <div className="vital-status-info">
                <img src="/images/ArrowDown.svg" alt="Arrow Down" className="icon" /> Lower than Average
              </div>
            ) : latestEntry.respiratory_rate.levels
                .toLowerCase()
                .includes("higher") ? (
              <div className="vital-status-info">
                <img src="/images/ArrowUp.svg" alt="Arrow Up" className="icon" /> Higher than Average
              </div>
            ) : (
              latestEntry.respiratory_rate.levels
            )
          ) : (
            "Normal"
          )}
        </div>
      </div>
      <div className="vital-card temperature">
        <div className="vital-icon">
          <img src="/images/temperature.png" alt="Temperature" />
        </div>
        <div className="vital-label">Temperature</div>
        <div className="vital-value">
          {latestEntry.temperature.value}
          <span className="vital-unit">°F</span>
        </div>
        <div
          className={`vital-status ${
            latestEntry.temperature.levels || "normal"
          }`}
        >
          {latestEntry.temperature.levels ? (
            latestEntry.temperature.levels.toLowerCase().includes("lower") ? (
              <div className="vital-status-info">
                <img src="/images/ArrowDown.svg" alt="Arrow Down" className="icon" /> Lower than Average
              </div>
            ) : latestEntry.temperature.levels
                .toLowerCase()
                .includes("higher") ? (
              <div className="vital-status-info">
                <img src="/images/ArrowUp.svg" alt="Arrow Up" className="icon" /> Higher than Average
              </div>
            ) : (
              latestEntry.temperature.levels
            )
          ) : (
            "Normal"
          )}
        </div>
      </div>
      <div className="vital-card heart">
        <div className="vital-icon">
          <img src="/images/heartBPM.png" alt="Heart Rate" />
        </div>
        <div className="vital-label">Heart Rate</div>
        <div className="vital-value">
          {latestEntry.heart_rate.value} <span className="vital-unit">bpm</span>
        </div>
        <div
          className={`vital-status ${
            latestEntry.heart_rate.levels || "normal"
          }`}
        >
          {latestEntry.heart_rate.levels ? (
            latestEntry.heart_rate.levels.toLowerCase().includes("lower") ? (
              <div className="vital-status-info">
                <img src="/images/ArrowDown.svg" alt="Arrow Down" className="icon" /> Lower than Average
              </div>
            ) : latestEntry.heart_rate.levels
                .toLowerCase()
                .includes("higher") ? (
              <div className="vital-status-info">
                <img src="/images/ArrowUp.svg" alt="Arrow Up" className="icon" /> Higher than Average
              </div>
            ) : (
              latestEntry.heart_rate.levels
            )
          ) : (
            "Normal"
          )}
        </div>
      </div>
    </div>
  );
}
