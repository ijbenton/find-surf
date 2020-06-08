import React from 'react';

import FileUpload from './FileUpload/FileUpload';
import UpdateSpot from './UpdateSpot/UpdateSpot';

import './AdminControls.scss';

const AdminControls = () => {
  return (
    <div>
      <div className="admin-controls">
        <FileUpload />
        <UpdateSpot />
      </div>
    </div>
  );
};

export default AdminControls;
