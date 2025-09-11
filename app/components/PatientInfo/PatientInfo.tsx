import {
  FaCalendar,
  FaVenus,
  FaMars,
  FaCreditCard,
  FaPhone,
  FaShieldAlt,
} from "react-icons/fa";
import "./PatientInfo.scss";
import type { Patient } from "~/types/patient.type";

type PatientInfoProps = {
  patient: Patient | null;
};

export function PatientInfo({ patient }: PatientInfoProps) {
  if (!patient) return null;

  return (
    <div className="patient-info-container flex flex-col items-center mx-auto bg-white rounded-2xl p-6">
      <img
        src={patient.profile_picture}
        alt={patient.name}
        className="rounded-full object-cover mb-4 border-4 border-white"
      />
      <h2 className="text-2xl mb-6 font-bold">{patient.name}</h2>
      <div className="w-full flex flex-col gap-5 mb-6">
        <div className="flex items-center gap-4">
          <span className="icon-wrap rounded-full">
            <img src="/images/BirthIcon.svg" alt="Date of Birth Icon" className="icon" />
          </span>
          <div>
            <div>Date Of Birth</div>
            <div className="font-semibold">
              {new Date(patient.date_of_birth).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="icon-wrap rounded-full">
            {patient.gender.toLowerCase() === "male" ? (
              <FaMars className="icon male" />
            ) : patient.gender.toLowerCase() === "female" ? (
            <img src="/images/FemaleIcon.svg" alt="Female Icon" className="icon" />
            ) : null}
          </span>
          <div>
            <div>Gender</div>
            <div className="font-semibold">{patient.gender}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="icon-wrap rounded-full">
            <img src="/images/PhoneIcon.svg" alt="Contact Info." className="icon" />
          </span>
          <div>
            <div>Contact Info.</div>
            <div className="font-semibold">{patient.phone_number}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="icon-wrap rounded-full">
            <img src="/images/PhoneIcon.svg" alt="Emergency Contact Info." className="icon" />
          </span>
          <div>
            <div>Emergency Contacts</div>
            <div className="font-semibold">{patient.emergency_contact}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="icon-wrap rounded-full">
            <img src="/images/InsuranceIcon.svg" alt="Insurance Provider Info." className="icon" />
          </span>
          <div>
            <div>Insurance Provider</div>
            <div className="font-semibold">{patient.insurance_type}</div>
          </div>
        </div>
      </div>
      <button className="w-full mt-2 py-3 rounded-full font-semibold transition">
        Show All Information
      </button>
    </div>
  );
}
