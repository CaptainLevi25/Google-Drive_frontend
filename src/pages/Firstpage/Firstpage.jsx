import React from "react";
import App from "../../App";
import "./Firstpage.css";
// import metamaskLogo from "./metamask.png";
import lockerImg from "./digital-locker.jpeg";
import metamaskLogo from "./metamask-icon.png";
import governmentIdLogo from "./government-id.png";
import medicalRecordsLogo from "./medical-records.png";
import educationalCertificateLogo from "./educational-certificate.png";
import generalPhotosLogo from "./general-photos.png";
import { useNavigate } from "react-router-dom";
export default function Firstpage({
  isConnected,
  sett,
  connect,
  account,
  provider,
  contract,
}) {
  const nav = useNavigate();
  const add = async () => {
    sett();
    try {
      await contract.Resgister();
      nav("/homepage");
    } catch {
      nav("/homepage");
    }
  };
  return (
    <div>
      <div className="cover-page">
        <div className="background-overlay" />
        <img
          className="background-image"
          src={lockerImg}
          alt="Digital Locker"
        />
        <div className="content">
          <img
            className="logo metamask-logo"
            src={metamaskLogo}
            alt="Metamask"
          />
          <h1 className="title">Decentralised Google Drive</h1>
          <p className="description">
            Welcome to the future of cloud storage - a decentralized solution
            for secure and reliable file storage.
          </p>
          <div className="f">
            <button
              className="get-started-button"
              onClick={() => {
                connect();
                sett();
              }}
            >
              Connect to Metamask
            </button>
            <button
              className="get-started-button"
              onClick={() => {
                add();
              }}
            >
              Add yourself / Access Our features
            </button>
          </div>
          <div className="scroll-down">One Stop solutions for your Images</div>
        </div>
      </div>
      {/* <div className="features">
        <div className="feature-section government-id">
          <img
            className="feature-logo"
            src={governmentIdLogo}
            alt="Government ID"
          />
          <h2 className="feature-title">Government ID</h2>
          <p className="feature-description">
            Securely store and access your government identification documents.
          </p>
        </div>
        <div className="feature-section medical-records">
          <img
            className="feature-logo"
            src={medicalRecordsLogo}
            alt="Medical Records"
          />
          <h2 className="feature-title">Medical Records</h2>
          <p className="feature-description">
            Keep your medical records organized and easily accessible.
          </p>
        </div>
        <div className="feature-section educational-certificate">
          <img
            className="feature-logo"
            src={educationalCertificateLogo}
            alt="Educational Certificate"
          />
          <h2 className="feature-title">Educational Certificate</h2>
          <p className="feature-description">
            Upload and manage your educational certificates securely.
          </p>
        </div>
        <div className="feature-section general-photos">
          <img
            className="feature-logo"
            src={generalPhotosLogo}
            alt="General Photos"
          />
          <h2 className="feature-title">General Photos</h2>
          <p className="feature-description">
            Organize and share your general photos with ease.
          </p>
        </div>
      </div> */}
      {/* <button onClick={connect}>connect to metamask</button>
      <button
        onClick={() => {
          sett();
          console.log(isConnected);
        }}
      >
        hello
      </button>
      <button
        onClick={() => {
          add();
          nav("/homepage");
        }}
      >
        add user
      </button> */}
    </div>
  );
}
