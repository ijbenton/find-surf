import {
  SET_FILE,
  SET_FILE_NAME,
  FILE_UPLOAD_FAILED,
  FILE_UPLOAD_STARTED,
  FILE_UPLOAD_SUCCESS
} from './file.types';

const initialState = {
  file: '',
  fileName: '',
  isUploading: false,
  uploadedFileName: null,
  uploadedFilePath: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_FILE:
      return {
        ...state,
        file: action.payload
      };
    case SET_FILE_NAME:
      return {
        ...state,
        fileName: action.payload
      };
    case FILE_UPLOAD_STARTED:
      return {
        ...state,
        isUploading: true
      };
    case FILE_UPLOAD_SUCCESS:
      return {
        ...state,
        isUploading: false,
        uploadedFileName: action.payload.fileName,
        uploadedFilePath: action.payload.filePath
      };
    case FILE_UPLOAD_FAILED:
      return {
        ...state,
        uploadedFileName: null,
        uploadedFilePath: null,
        isUploading: false
      };
    default:
      return state;
  }
}
