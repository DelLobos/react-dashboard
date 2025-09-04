import React from "react";
import "./DiagnosticList.scss";
import type { Patient, Diagnostic } from "../../types/patient.type";

type DiagnosisHistoryProps = {
  patient: Patient | null;
};

export function DiagnosticList({ patient }: DiagnosisHistoryProps) {
  const diagnostics: Diagnostic[] = patient?.diagnostic_list || [];

  return (
    <div className="diagnostic-list-container flex justify-center items-center">
      <div className="diagnostic-list-content">
        <h2 className="diagnostic-list-title">Diagnostic List</h2>
        <div className="diagnostic-list-table-wrapper">
          <table className="diagnostic-list-table">
            <thead>
              <tr>
                <th>Problem/Diagnosis</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {diagnostics.length > 0 ? (
                diagnostics.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    style={{ textAlign: "center", color: "#888" }}
                  >
                    No diagnostic data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
