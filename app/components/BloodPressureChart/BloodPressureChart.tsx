import React from "react";
import "./BloodPressureChart.scss";
import { Line } from "react-chartjs-2";
import { BloodPressureChartConfig } from "./chartConfig";
import type { Patient } from "../../types/patient.type";
import { getAssetPath } from "../../utils/assetPath";

type DiagnosisHistoryProps = {
  patient: Patient | null;
};


export function BloodPressureChart({ patient }: DiagnosisHistoryProps) {
  if (!patient) {
    return (
      <div className="blood-pressure-history-container">
        No patient data available.
      </div>
    );
  }

  const history = [...patient.diagnosis_history].reverse().slice(-6);


  const { data, options } = BloodPressureChartConfig(history);

  const latest = history[history.length - 1];

  return (
    <div className="blood-pressue-history-container">
      <div className="blood-pressue-history-content">
        <div className="blood-pressue-history-chart">
          <div className="blood-pressue-history-header">
            <div className="blood-pressue-history-title">
              <h3>Blood Pressure</h3>
            </div>
            <div className="blood-pressue-history-range">
              Last 6 months{" "}
              <span className="blood-pressue-history-dropdown">
                <img
                  src={getAssetPath("/images/expand-icon.svg")}
                  alt="Expand Date"
                  className="expand-icon"
                />
              </span>
            </div>
          </div>
          <Line data={data} options={options} height={160} />
        </div>
        <div className="blood-pressue-history-stats">
          <div className="blood-pressue-history-stat-row">
            <span className="blood-pressue-history-dot systolic" />
            <span className="blood-pressue-history-label">Systolic</span>
          </div>
          <div className="blood-pressue-history-value">
            {latest.blood_pressure.systolic.value}
          </div>
          <div className="blood-pressue-history-meta higher">
            <span className="blood-pressue-history-arrow">
              {latest.blood_pressure.systolic.levels === "Higher than Average"
                ? <img src={getAssetPath("/images/ArrowDown.svg")} alt="Arrow Down" className="icon" />
                : <img src={getAssetPath("/images/ArrowUp.svg")} alt="Arrow Up" className="icon" />}
            </span>
            {latest.blood_pressure.systolic.levels}
          </div>
          <hr className="blood-pressue-history-divider" />
          <div
            className="blood-pressue-history-stat-row"
            style={{ marginTop: 16 }}
          >
            <span className="blood-pressue-history-dot diastolic" />
            <span className="blood-pressue-history-label">Diastolic</span>
          </div>
          <div className="blood-pressue-history-value">
            {latest.blood_pressure.diastolic.value}
          </div>
          <div className="blood-pressue-history-meta lower">
            <span className="blood-pressue-history-arrow">
              {latest.blood_pressure.diastolic.levels === "Lower than Average"
                ? <img src={getAssetPath("/images/ArrowDown.svg")} alt="Arrow Down" className="icon" />
                : <img src={getAssetPath("/images/ArrowUp.svg")} alt="Arrow Up" className="icon" />}
            </span>
            {latest.blood_pressure.diastolic.levels}
          </div>
        </div>
      </div>
    </div>
  );
}
