import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, useRouteMatch } from 'react-router-dom';

import {
  setFile,
  setFileName,
  uploadFile
} from '../../../redux/file/file.actions';

const FileUpload = ({ setFile, setFileName, file, uploadFile }) => {
  const match = useRouteMatch();
  const onChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    uploadFile(formData, match.params.spotSlug);
  };

  const { fileName } = file;
  return (
    <div className="file-upload">
      <form onSubmit={onSubmit}>
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label htmlFor="customFile" className="custom-file-label">
            {fileName}
          </label>
        </div>

        <input type="submit" value="Upload" />
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  file: state.file.file
});

const mapDispatchToProps = dispatch => ({
  setFile: file => dispatch(setFile(file)),
  setFileName: fileName => dispatch(setFileName(fileName)),
  uploadFile: (formData, spotSlug) => dispatch(uploadFile(formData, spotSlug))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FileUpload)
);
