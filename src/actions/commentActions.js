import {commentActions} from '../constants'
import axios from 'axios'
export const FetchSetCommentRequest = (token, id, comment, index, count)=>{
    const taskURI = `/comment/set_comment?token=${token}&id=${id}&comment=${comment}&index=${index}&count=${count}`
    return (dispatch)=>{
        dispatch(FetchDefaultState())
        axios.post(taskURI).then(v => {
            const comment = v.data
            dispatch(FetchSetCommentSuccess(comment))
        }).catch(error =>{
            dispatch(FetchSetCommentFailure(comment))
        })
    }
}
const FetchDefaultState = ()=>{
    return {
        type:commentActions.FETCH_SET_COMMENT_REQUEST,
    }
}
export const FetchSetCommentFailure = (error)=>{
    return {
        type:commentActions.FETCH_SET_COMMENT_FAILURE,
        error
    }
}
export const FetchSetCommentSuccess = (comment)=>{
    return {
        type:commentActions.FETCH_SET_COMMENT_SUCCESS,
        payload:comment
    }
}

export const FetchGetCommentRequest = (token, id, index, count)=>{
    const taskURI = `/comment/get_comment?token=${token}&id=${id}&index=${index}&count=${count}`
    return (dispatch)=>{
        dispatch(FetchGetDefaultState())
        axios.post(taskURI).then(v => {
            const comments = v.data
            dispatch(FetchGetCommentSuccess(comments))
        }).catch(error =>{
            dispatch(FetchGetCommentFailure(error))
        })
    }
}
const FetchGetDefaultState = ()=>{
    return {
        type:commentActions.FETCH_GET_COMMENT_REQUEST,
    }
}
export const FetchGetCommentFailure = (error)=>{
    return {
        type:commentActions.FETCH_GET_COMMENT_FAILURE,
        error
    }
}
export const FetchGetCommentSuccess = (comments)=>{
    return {
        type:commentActions.FETCH_GET_COMMENT_SUCCESS,
        payload:comments
    }
}