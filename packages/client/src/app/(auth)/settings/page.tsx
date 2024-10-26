import React from "react";

import Profile from "./components/Profile";
import Password from "./components/Password";
import OrganizationDetails from "./components/OrganizationDetails";

const Settings = () => {
  return (
    <div className="space-y-5">
      <Profile />
      <Password/>
      <OrganizationDetails/>
    </div>
  );
};

export default Settings;
