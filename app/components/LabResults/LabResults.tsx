import React from "react";
import "./LabResults.scss";
import type { Patient } from "~/types/patient.type";
import { getAssetPath } from "../../utils/assetPath";

type LabResultsProps = {
  patient: Patient | null;
};

export function LabResults({ patient }: LabResultsProps) {
  if (!patient || !patient.lab_results?.length) return null;

  return (
    <div className="lab-results-container">
      <h2>Lab Results</h2>
      <div className="lab-results overflow-y-auto max-h-60">
        {patient.lab_results.map((result, idx) => (
          <div key={result} className="lab-result-row">
            <span className="text-base">{result}</span>
            <button aria-label={`Download ${result}`}>
              <img
                src={getAssetPath("/images/download-icon.svg")}
                alt={`Download ${result}`}
                className="icon"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
