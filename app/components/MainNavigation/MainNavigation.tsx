import React from "react";
import "./MainNavigation.scss";
// You can use react-icons or your own SVGs
import { FaEllipsisV } from "react-icons/fa";
import { getAssetPath } from "../../utils/assetPath";

export function MainNavigation({ isTablet }: { isTablet: boolean }) {
  return (
    <nav className="main-navigation">
      <div className="main-navigation__logo">
        <img src={getAssetPath("/images/TestLogo.svg")} alt="Tech.Care Logo" className="logo-img" />
      </div>
      <ul className="main-navigation__links">
        <li>
          <a href="#" className="nav-link">
            <img src={getAssetPath("/images/home-icon.svg")} alt="Home" className="nav-icon" />
            Overview
          </a>
        </li>
        <li>
          <a href="#" className="nav-link nav-link--active">
            <img src={getAssetPath("/images/patients-icon.svg")} alt="Patients" className="nav-icon" />
            Patients
          </a>
        </li>
        <li>
          <a href="#" className="nav-link">
            <img src={getAssetPath("/images/calendar-icon.svg")} alt="Schedule" className="nav-icon" />
            Schedule
          </a>
        </li>
        <li>
          <a href="#" className="nav-link">
            <img src={getAssetPath("/images/chat-icon.svg")} alt="Message" className="nav-icon" />
            Message
          </a>
        </li>
        <li>
            <a href="#" className="nav-link">
            <img src={getAssetPath("/images/credit-card-icon.svg")} alt="Credit card" className="nav-icon" />
            Transactions
            </a>
        </li>
      </ul>
      <div className="main-navigation__profile">
        <img src={getAssetPath("/images/doctor.png")} alt="Dr. Jose Simmons" className="profile-img" />
        {!isTablet && (
          <div className="profile-info">
            <span className="profile-name">Dr. Jose Simmons</span>
            <span className="profile-role">General Practitioner</span>
          </div>
)}
        <img src={getAssetPath("/images/settings-cog.svg")} alt="Settings" className="profile-icon" />
        <FaEllipsisV className="profile-ellipses" />
      </div>
    </nav>
  );
}
