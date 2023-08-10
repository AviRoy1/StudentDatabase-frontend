import { createReducer } from '@reduxjs/toolkit';

export const adminReducer = createReducer(
  {},
  {
    addStudentRequest: state => {
      state.loading = true;
    },
    addStudentsuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    addStudentFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addSubjectRequest: state => {
      state.loading = true;
    },
    addSubjectsuccess: (state, action) => {
      state.loading = false;
      state.allsubjects = action.payload.subjects;
      state.message = action.payload.message;
    },
    addSubjectFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getSubjectRequest: state => {
      state.loading = true;
    },
    getSubjectsuccess: (state, action) => {
      state.loading = false;
      state.allsubjects = action.payload.subjects;
    },
    getSubjectFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getUserRequest: state => {
      state.loading = true;
    },
    getUsersuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    getUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    pendingAttendanceRequest: state => {
      state.loading = true;
    },
    pendingAttendanceSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    },
    pendingAttendanceFail: (state, action) => {
      state.loading = false;
    },
    addAttendanceRequest: state => {
      state.loading = true;
    },
    addAttendanceSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    addAttendanceFail: (state, action) => {
      state.loading = false;
    },

    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  }
);

export const studentReducer = createReducer(
  {},
  {
    studentLoginRequest: state => {
      state.loading = true;
    },
    studentLoginSuccess: (state, action) => {
      state.loading = false;
      state.student = action.payload.user;
      state.message = action.payload.message;
      state.isStudent = action.payload.isStudent;
      state.accessToken = action.payload.accessToken;
    },
    studentLoginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    myProfileRequest: state => {
      state.loading = true;
    },
    myProfileSuccess: (state, action) => {
      state.loading = false;
      state.student = action.payload.user;
      state.message = action.payload.message;
      state.isStudent = action.payload.isStudent;
    },
    myProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  }
);
