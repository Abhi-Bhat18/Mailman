import React from 'react'

const OrganizationDetails = () => {
  return (
    <div className="p-5 flex bg-card rounded-md shadow-md items-center">
      <div className="text-2xl basis-1/4">
        <p>Organization Details</p>
      </div>
      <div className="basis-3/4 text-lg">
        <div className="flex space-x-5 items-center">
          <p className="">Role</p>
          <p>Owner</p>
        </div>
      </div>
    </div>
  );
}

export default OrganizationDetails