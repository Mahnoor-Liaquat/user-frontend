import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './YourProfile.css';

const YourProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    rollNo: '',
    trainer: '',
    batchNo: '',
    phoneNo: '',
    joiningDate: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await axios.get('/api/users/1'); // Replace with actual user ID or endpoint
      setProfile(data);
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Your Profile</h1>
      </div>
      <div className="profile-details">
        <div className="profile-detail-item">
          <strong>Name:</strong> {profile.name}
        </div>
        <div className="profile-detail-item">
          <strong>Email:</strong> {profile.email}
        </div>
        <div className="profile-detail-item">
          <strong>Roll No:</strong> {profile.rollNo}
        </div>
        <div className="profile-detail-item">
          <strong>Trainer:</strong> {profile.trainer}
        </div>
        <div className="profile-detail-item">
          <strong>Batch No:</strong> {profile.batchNo}
        </div>
        <div className="profile-detail-item">
          <strong>Phone No:</strong> {profile.phoneNo}
        </div>
        <div className="profile-detail-item">
          <strong>Joining Date:</strong> {new Date(profile.joiningDate).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default YourProfile;
