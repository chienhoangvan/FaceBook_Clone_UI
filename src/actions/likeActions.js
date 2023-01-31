import {likeActions} from '../constants'
import axios from 'axios'
export const FetchLikeRequest = (token, postId)=>{
    const taskURI = `/like/like?token=${token}&id=${postId}`
    return (dispatch)=>{
        dispatch(FetchDefaultState())
        axios.post(taskURI).then(v => {
            const like = v.data
            dispatch(FetchLikeSuccess(like))
        }).catch(error =>{
            dispatch(FetchLikeFailure(error))
        })
    }
}
const FetchDefaultState = ()=>{
    return {
        type:likeActions.FETCH_LIKE_REQUEST,
    }
}
export const FetchLikeFailure = (error)=>{
    return {
        type:likeActions.FETCH_LIKE_FAILURE,
        error
    }
}
export const FetchLikeSuccess = (like)=>{
    return {
        type:likeActions.FETCH_LIKE_SUCCESS,
        payload:like
    }
}
