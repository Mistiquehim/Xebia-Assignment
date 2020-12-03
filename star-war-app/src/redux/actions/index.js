import axios from 'axios';

export const LOGIN = 'LOGIN';
export const SEARCH_PLANET_SUCCESS = 'SEARCH_PLANET_SUCCESS';
export const SEARCH_PLANET_FAILURE = 'SEARCH_PLANET_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const UPDATE_PROGRESS = 'UPDATE_PROGRESS';

const updateProgress = (data) => {
    return {
        type: UPDATE_PROGRESS,
        data
    }
}

const loginSuccess = (data) => {
    return {
        type: LOGIN_SUCCESS,
        data
    }
}

const loginFailure = (data) => {
    return {
        type: LOGIN_FAILURE,
        data
    }
}

const searchSuccess = (data) => {
    return {
        type: SEARCH_PLANET_SUCCESS,
        data
    }
}

const searchFailure = (data) => {
    return {
        type: SEARCH_PLANET_FAILURE,
        data
    }
}

export const loginRequest = (data) => {
    return (dispatch) => {
        let { username, password } = data;
        dispatch(updateProgress({ isSpinner: true, text: 'Logging in...' }));
        axios.get('https://swapi.dev/api/people', {
            params: {
                search: username
            }
        })
            .then(function (response) {
                let resData = response.data;
                let alertText = 'Username or password is incorrect';
                if (resData && resData.results && resData.results.length > 0) {
                    let user = resData.results[0];
                    if (user.name === username && user.birth_year === password) {
                        dispatch(loginSuccess({ success: true, message: 'Login Successful' }));
                        return;
                    }
                }
                dispatch(loginFailure({ success: false, showAlert: true, alertText }));

            })
            .catch(function (error) {
                dispatch(loginFailure({ success: false, showAlert: true, alertText: error }));
            });
    }
}

export const searchPlanet = text => {
    return (dispatch) => {
        dispatch(updateProgress({ isSpinner: true, text: 'Searching...' }));
        axios.get('https://swapi.dev/api/planets', {
            params: {
                search: text
            }
        })
            .then(function (response) {
                console.log(response);
                let data = response.data;
                if (data && data.results && data.results.length > 0) {
                    dispatch(searchSuccess({ success: true, results: data.results }));
                }
                else {
                    dispatch(searchFailure({ success: false, message: 'No data found' }));
                }
            })
            .catch(function (error) {
                dispatch(searchSuccess({ success: false, message: error }));
            });
    }
}