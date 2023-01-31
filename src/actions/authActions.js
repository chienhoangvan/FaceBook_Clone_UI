import {authActions} from '../constants'
import axios from 'axios'
export const FetchChangePasswordRequest = (token, password, new_password) => {
    const taskURI = `/auth/change_password?token=${token}&password=${password}&new_password=${new_password}`
    return (dispatch) => {
        axios.post(taskURI).then(v => {
            const password = v.data
            dispatch(FetchChangePasswordSuccess(password))
        }).catch(error => {
            dispatch(FetchChangePasswordFailure(error))
        })
    }
}
export const FetchChangePasswordFailure = (error) => {
    return {
        type: authActions.FETCH_CHANGE_PASSWORD_FAILURE,
        error
    }
}
export const FetchChangePasswordSuccess = (password) => {
    return {
        type: authActions.FETCH_CHANGE_PASSWORD_SUCCESS,
        payload: password
    }
}

export const FetchLogoutRequest = (token) => {
    const taskURI = `/auth/logout?token=${token}`
    return (dispatch) => {
        axios.post(taskURI).then(v => {
            const logout = v.data
            dispatch(FetchLogoutSuccess(logout))
        }).catch(error => {
            dispatch(FetchLogoutFailure(error))
        })
    }
}
export const FetchLogoutFailure = (error) => {
    return {
        type: authActions.FETCH_LOGOUT_FAILURE,
        error
    }
}
export const FetchLogoutSuccess = (logout) => {
    return {
        type: authActions.FETCH_LOGOUT_SUCCESS,
        payload: logout
    }
}

export const FetchSignupRequest = (phonenumber, password) => {
    const taskURI = `/auth/signup?phonenumber=${phonenumber}&password=${password}`
    return (dispatch) => {
        axios.post(taskURI).then(v => {
            const user = v.data
            dispatch(FetchSignupSuccess(user))
        }).catch(error => {
            dispatch(FetchSignupFailure(error))
        })
    }
}
export const FetchSignupFailure = (error) => {
    return {
        type: authActions.FETCH_SIGNUP_FAILURE,
        error
    }
}
export const FetchSignupSuccess = (user) => {
    return {
        type: authActions.FETCH_SIGNUP_SUCCESS,
        payload: user
    }
}

export const FetchGetVerifyCodeRequest = (phonenumber) => {
    const taskURI = `/auth/get_verify_code?phonenumber=${phonenumber}`
    return (dispatch) => {
        axios.post(taskURI).then(v => {
            const user = v.data
            dispatch(FetchGetVerifyCodeSuccess(user))
        }).catch(error => {
            dispatch(FetchGetVerifyCodeFailure(error))
        })
    }
}
export const FetchGetVerifyCodeFailure = (error) => {
    return {
        type: authActions.FETCH_GET_VERIFY_CODE_FAILURE,
        error
    }
}
export const FetchGetVerifyCodeSuccess = (user) => {
    return {
        type: authActions.FETCH_GET_VERIFY_CODE_SUCCESS,
        payload: user
    }
}

export const FetchCheckVerifyCodeRequest = (phonenumber, code_verify) => {
    const taskURI = `/auth/check_verify_code?phonenumber=${phonenumber}&code_verify=${code_verify}`
    return (dispatch) => {
        axios.post(taskURI).then(v => {
            const user = v.data
            dispatch(FetchCheckVerifyCodeSuccess(user))
        }).catch(error => {
            dispatch(FetchCheckVerifyCodeFailure(error))
        })
    }
}
export const FetchCheckVerifyCodeFailure = (error) => {
    return {
        type: authActions.FETCH_CHECK_VERIFY_CODE_FAILURE,
        error
    }
}
export const FetchCheckVerifyCodeSuccess = (user) => {
    return {
        type: authActions.FETCH_CHECK_VERIFY_CODE_SUCCESS,
        payload: user
    }
}

export const FetchChangeInfoAfterSignupRequest = (token, username) => {
    const taskURI = `/auth/change_info_after_signup?token=${token}&username=${username}`
    return (dispatch) => {
        axios.post(taskURI).then(v => {
            const user = v.data
            dispatch(FetchChangeInfoAfterSignupSuccess(user))
        }).catch(error => {
            dispatch(FetchChangeInfoAfterSignupFailure(error))
        })
    }
}
export const FetchChangeInfoAfterSignupFailure = (error) => {
    return {
        type: authActions.FETCH_CHECK_VERIFY_CODE_FAILURE,
        error
    }
}
export const FetchChangeInfoAfterSignupSuccess = (user) => {
    return {
        type: authActions.FETCH_CHECK_VERIFY_CODE_SUCCESS,
        payload: user
    }
}
