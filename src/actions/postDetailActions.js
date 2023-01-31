import { postDetailActions } from '../constants'
import axios from 'axios'
export const FetchPostDetailRequest = (token, id) => {
    const taskURI = `/post/get_post?token=${token}&id=${id}`
    return (dispatch) => {
        axios.post(taskURI).then(result => {
            const showingPost = {
                postDetail: result.data,
                isShowModal,
                isShowCommentModal: false
            }
            dispatch(FetchPostDetailSuccess(showingPost))
        }).catch(error => {
            dispatch(FetchPostDetailFailure(error))
        })
    }
}
export const closePostDetailModal = () => {
    return {
        type: postDetailActions.CLOSE_POST_DETAIL_MODAL
    }
}
export const openCommentModal = () => {
    return {
        type: postDetailActions.OPEN_COMMENTS_MODAL
    }
}
export const closeCommentModal = () => {
    return {
        type: postDetailActions.CLOSE_COMMENTS_MODAL
    }
}
const FetchDefaultState = () => {
    return {
        type: postDetailActions.FETCH_POST_DETAIL_REQUEST,
    }
}
export const FetchPostDetailFailure = (error) => {
    return {
        type: postDetailActions.FETCH_POST_DETAIL_FAILURE,
        error
    }
}
export const FetchPostDetailSuccess = (showingPost) => {
    return {
        type: postDetailActions.FETCH_POST_DETAIL_SUCCESS,
        payload: showingPost
    }
}
