import React from "react";
import Wrapper from "../assets/wrappers/LandingPage";
import mainImg from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";

function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span>app
          </h1>
          <p>
            Jobify is your all-in-one job-tracking app designed to streamline
            your job search. Effortlessly manage applications, track interviews,
            monitor rejections, and visualize your progress. Stay organized and
            focused as you navigate your career journey with confidence.💼📊
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/register" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={mainImg} alt="job-hunt-main_img" className="img main-img" />
      </div>
    </Wrapper>
  );
}

export default Landing;
