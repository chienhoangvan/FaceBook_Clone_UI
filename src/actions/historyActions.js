import { historyActions } from '../constants'
import axios from 'axios'
export const FetchGroupHistoriesRequest = () => {
    const taskURI = '/history'
    return (dispatch) => {
        axios.get(taskURI).then(result => {
            const groups = result.data.groups
            dispatch(FetchGroupHistoriesSuccess(groups))
        }).catch(error => {
            dispatch(FetchGroupHistoriesFailure(error))
        })
    }
}
const FetchDefaultState = () => {
    return {
        type: historyActions.FETCH_GROUP_HISTORIES_REQUEST,
    }
}
export const FetchGroupHistoriesFailure = (error) => {
    return {
        type: historyActions.FETCH_GROUP_HISTORIES_FAILURE,
        error
    }
}
export const FetchGroupHistoriesSuccess = (groups) => {
    return {
        type: historyActions.FETCH_GROUP_HISTORIES_SUCCESS,
        payload: groups
    }
}
export const FetchHomeHistoriesRequest = (token,index, count) => {
    const taskURI = `/search/get_saved_search?token=${token}&index=${index}&count=${count}`
    return (dispatch) => {
        axios.post(taskURI).then(result => {
            const searchs = result.data
            dispatch(FetchHomeHistoriesSuccess(searchs))
        }).catch(error => {
            dispatch(FetchHomeHistoriesFailure(error))
        })
    }
}
export const FetchHomeHistoriesFailure = (error) => {
    return {
        type: historyActions.FETCH_HOME_HISTORIES_FAILURE,
        error
    }
}
export const FetchHomeHistoriesSuccess = (searchs) => {
    return {
        type: historyActions.FETCH_HOME_HISTORIES_SUCCESS,
        payload: searchs
    }
}