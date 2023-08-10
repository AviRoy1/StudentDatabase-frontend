import axios from 'axios';
import { server } from '../store';

export const addStudent =
  (name, password, Class, username, age, subjects) => async dispatch => {
    try {
      dispatch({ type: 'addStudentRequest' });

      const { data } = await axios.post(
        `${server}/api/user/addStudent`,
        { name, password, Class, username, age, subjects },
        {
          withCredentials: true,
        }
      );
      dispatch({ type: 'addStudentsuccess', payload: data });
    } catch (error) {
      dispatch({
        type: 'addStudentFail',
        payload: error.response.data.message,
      });
    }
  };

export const addSubject = subject => async dispatch => {
  try {
    dispatch({ type: 'addSubjectRequest' });

    const { data } = await axios.post(
      `${server}/api/subject/add`,
      { subject },
      {
        withCredentials: true,
      }
    );
    dispatch({ type: 'addSubjectsuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'addSubjectFail',
      payload: error.response.data.message,
    });
  }
};
export const getAllSubjects = () => async dispatch => {
  try {
    dispatch({ type: 'getSubjectRequest' });

    const { data } = await axios.get(`${server}/api/subject/all`, {
      withCredentials: true,
    });
    dispatch({ type: 'getSubjectsuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'getSubjectFail',
      payload: error.response.data.message,
    });
  }
};

export const allUser = () => async dispatch => {
  try {
    dispatch({ type: 'getUserRequest' });

    const { data } = await axios.post(`${server}/api/user/alluser`, {
      withCredentials: true,
    });
    dispatch({ type: 'getUsersuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'getUserFail',
      payload: error.response.data.message,
    });
  }
};

export const allUserFilter = selectedClass => async dispatch => {
  try {
    dispatch({ type: 'getUserRequest' });
    const { data } = await axios.post(
      `${server}/api/user/alluser`,
      { Class: selectedClass },
      {
        withCredentials: true,
      }
    );
    dispatch({ type: 'getUsersuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'getUserFail',
      payload: error.response.data.message,
    });
  }
};

export const penDingAttendanceStudents =
  (selectedClass, selectedDate) => async dispatch => {
    try {
      dispatch({ type: 'pendingAttendanceRequest' });
      const { data } = await axios.post(
        `${server}/api/attendance/get`,
        { Class: selectedClass, date: selectedDate },
        {
          withCredentials: true,
        }
      );
      console.log('ST--  ', data);
      dispatch({ type: 'pendingAttendanceSuccess', payload: data });
    } catch (error) {
      dispatch({
        type: 'pendingAttendanceFail',
        payload: error.response.data.message,
      });
    }
  };

export const addAttendance =
  (studentId, selectedDate, selectedSubjects) => async dispatch => {
    try {
      dispatch({ type: 'addAttendanceRequest' });
      const { data } = await axios.post(
        `${server}/api/attendance/add`,
        {
          studentId: studentId,
          date: selectedDate,
          subjects: selectedSubjects,
        },
        {
          withCredentials: true,
        }
      );
      dispatch({ type: 'addAttendanceSuccess', payload: data });
    } catch (error) {
      dispatch({
        type: 'addAttendanceFail',
        payload: error.response.data.message,
      });
    }
  };

export const studentLogin = (studentName, studentPass) => async dispatch => {
  try {
    dispatch({ type: 'studentLoginRequest' });

    const { data } = await axios.post(
      `${server}/api/user/login`,
      { username: studentName, password: studentPass },
      {
        withCredentials: true,
      }
    );
    dispatch({ type: 'studentLoginSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'studentLoginFail',
      payload: error.response.data.message,
    });
  }
};

export const myProfile = accessToken => async dispatch => {
  try {
    dispatch({ type: 'myProfileRequest' });

    const { data } = await axios.post(`${server}/api/user/me`, {
      headers: { token: accessToken },
    });
    dispatch({ type: 'myProfileSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'myProfileFail',
      payload: error.response.data.message,
    });
  }
};
