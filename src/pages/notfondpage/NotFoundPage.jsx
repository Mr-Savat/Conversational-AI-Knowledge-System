import { Link } from "react-router-dom";
import "./notfound.css"

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="card">
        <div className="orb orb--1"></div>
        <div className="orb orb--2"></div>
        <div className="orb orb--3"></div>
        <div className="orb orb--4"></div>

        <div className="error-container">
          <div className="error-code">404</div>
          <div className="error-msg">Nothing to see here.</div>

          <Link to="/" className="home-btn">
            Go Home
          </Link>
        </div>

        <div className="duck__wrapper">
          <div className="duck">
            <div className="duck__inner">
              <div className="duck__mouth"></div>
              <div className="duck__head">
                <div className="duck__eye"></div>
                <div className="duck__white"></div>
              </div>
              <div className="duck__body"></div>
              <div className="duck__wing"></div>
            </div>
            <div className="duck__foot duck__foot--1"></div>
            <div className="duck__foot duck__foot--2"></div>
            <div className="surface"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;