import React from "react";
import "./home.css";
import Header from "../../components/header/Header";

import backgroundHome from "../../images/backgroundHome.png";
import footerHome from "../../images/footerHome.png";
function Home() {
  return (
    <>
      <Header view="Home" />

      <div className="mainsection">
        <div className="imgcontainer">
          <img src={backgroundHome} alt="background" className="imrc" />
        </div>
        <div className="contentBox">
          <h1 className="homeHeader">GET DEMO</h1>
          <h2>ON EMPLOYEE PORTAL</h2>
          <p>
            Customisable Workflow Management Capablity Allows you to set up Your
            Business Processes. Optimize your operations with in-Bulit automated
            time sheet and attendance capture. Enable work from Home. improve
            Productivity. Employee Produvtivity.
          </p>

          <div className="btnBox">
            <div className="btns">View Demo</div>
          </div>
        </div>
      </div>

      <img src={footerHome} alt="footer" />
    </>
  );
}

export default Home;
