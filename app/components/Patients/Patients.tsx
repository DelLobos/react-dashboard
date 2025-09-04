import React, { useState, useEffect } from "react";
import "./Patients.scss";
import { FaSearch, FaEllipsisH } from "react-icons/fa";
import type { Patient } from "../../types/patient.type";

type PatientsProps = {
  patients: Patient[];
  onPatientSelect: (patient: Patient) => void;
};

export function Patients({ patients, onPatientSelect }: PatientsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Select the first patient on initial load if none is selected
  useEffect(() => {
    if (patients.length > 0 && activeIndex === null) {
      setActiveIndex(3);
      onPatientSelect(patients[3]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patients]);

  const handleSelect = (patient: Patient, idx: number) => {
    setActiveIndex(idx);
    onPatientSelect(patient);
  };

  return (
    <div className="patients-container">
      <header className="patients-header">
        <h2>Patients</h2>
        <FaSearch className="search-icon" />
      </header>
      <ul className="patients-list">
        {patients.map((patient, idx) => (
          <li
            key={patient.name}
            className={`patient-row${activeIndex === idx ? " active" : ""}`}
            onClick={() => handleSelect(patient, idx)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={patient.profile_picture}
              alt={patient.name}
              className="patient-avatar"
            />
            <div className="patient-info">
              <span className="patient-name">{patient.name}</span>
              <span className="patient-meta">
                {patient.gender}, {patient.age}
              </span>
            </div>
            <FaEllipsisH className="patient-menu" />
          </li>
        ))}
      </ul>
    </div>
  );
}
