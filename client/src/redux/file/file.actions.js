import axios from 'axios';
import {
  SET_FILE,
  SET_FILE_NAME,
  FILE_UPLOAD_STARTED,
  FILE_UPLOAD_FAILED,
  FILE_UPLOAD_SUCCESS
} from './file.types';
import { returnErrors } from '../error/error.actions';

export const setFile = file => ({
  type: SET_FILE,
  payload: file
});

export const setFileName = fileName => ({
  type: SET_FILE_NAME,
  payload: fileName
});

export const uploadFile = (formData, spotId) => dispatch => {
  dispatch({ type: FILE_UPLOAD_STARTED });
  axios
    .put(`/api/v1/spots/${spotId}/photos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res =>
      dispatch({
        type: FILE_UPLOAD_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'FILE_UPLOAD_FAIL')
      );
      dispatch({
        type: FILE_UPLOAD_FAILED
      });
    });
};
