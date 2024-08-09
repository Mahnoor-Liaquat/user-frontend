import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate('/main');
  };

  return (
    <div className="dashboard">
      <div className="container-fluid">
        <div className="container-md md">
          <div className="row frst">
            <div className="col-12 rap">
              <div className="pak">
                <h4>Welcome back</h4>
                <p>
                  "Welcome to the Student Dashboard! We're excited to have you here. This portal is designed to make managing your academic journey easier and more efficient. Explore the features, stay updated with your progress, and feel free to reach out if you need any assistance. Thank you for being a part of our community!"
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-md">
          <div className="row">
            <div className="col-12 stus">
              <h4>Fees Status</h4>
            </div>
          </div>
        </div>
        <div className="container-md">
          <div className="row">
            <div className="col-6 red">
              <div className="pay">
                <div className="pack">
                  <i className="fa-solid fa-coins" style={{ fontSize: 22, color: "blue" }} />
                  <p style={{ fontWeight: "bold" }}>12000</p>
                  <p>Total payable</p>
                </div>
              </div>
            </div>
            <div className="col-6 red">
              <div className="pay">
                <div className="pack">
                  <i className="fa-solid fa-coins" style={{ fontSize: 22, color: "blue" }} />
                  <p style={{ fontWeight: "bold" }}>1000</p>
                  <p>Total paid</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-md">
          <div className="row">
            <div className="col-12 stus">
              <h4>Enrolled courses</h4>
            </div>
          </div>
        </div>
        <div className="container-md">
          <div className="row lst" style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="col-4 red cd">
              <div className="pack">
                <p>Web and App Development</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleViewClick}
                >
                  View
                </button>
              </div>
            </div>
            <div className="col-4 red cd">
              <div className="pack">
                <p>Graphic Designing</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleViewClick}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
