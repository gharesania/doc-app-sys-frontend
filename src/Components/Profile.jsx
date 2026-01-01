import React from "react";

const Profile = ({ user }) => {
  if (!user) {
    return <h5>Loading profile...</h5>;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header text-center">
              <h4>My Profile</h4>
            </div>

            <div className="card-body">
              <ProfileItem label="Name" value={user.name} />
              <ProfileItem label="Email" value={user.email} />
              <ProfileItem label="Address" value={user.address || "N/A"} />
              <ProfileItem label="Role" value={user.role} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ======================
   REUSABLE ROW
======================*/
const ProfileItem = ({ label, value }) => (
  <div className="mb-3">
    <strong>{label}:</strong>
    <p className="mb-0">{value}</p>
  </div>
);

export default Profile;
