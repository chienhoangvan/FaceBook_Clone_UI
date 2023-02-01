import {postsActions} from '../constants'
import axios from 'axios'
export const FetchPostsRequest = (token, lastId, index, count)=>{
    const taskURI = `/post/get_list_posts?token=${token}&last_id=${lastId}&index=${index}&count=${count}`
    return (dispatch)=>{
        dispatch(FetchDefaultState())
        axios.post(taskURI).then(v => {
            const posts = v.data
            dispatch(FetchPostsSuccess(posts))
        }).catch(error =>{
            dispatch(FetchPostsFailure(error))
        })
    }
}
const FetchDefaultState = ()=>{
    return {
        type:postsActions.FETCH_POSTS_REQUEST,
    }
}
export const FetchPostsFailure = (error)=>{
    return {
        type:postsActions.FETCH_POSTS_FAILURE,
        error
    }
}
export const FetchPostsSuccess = (posts)=>{
    return {
        type:postsActions.FETCH_POSTS_SUCCESS,
        payload:posts
    }
}
//Profie posts
export const FetchGetListPostsProfileRequest = (token, count, index, target_id)=>{
    const taskURI = `/post/get_list_posts_in_profile?token=${token}&count=${count}&index=${index}&targetId=${target_id}`
    return (dispatch)=>{
        dispatch(FetchDefaultState())
        axios.post(taskURI).then(v => {
            const posts = v.data
            dispatch(FetchPostsSuccess(posts))
        }).catch(error =>{
            dispatch(FetchPostsFailure(error))
        })
    }
}

export const FetchAddPostsRequest = (token, described, status)=>{
    const taskURI = `/post/add_post?token=${token}&described=${described}&status=${status}`
    return (dispatch)=>{
        dispatch(FetchAddDefaultState())
        axios.post(taskURI).then(v => {
            const post = v.data
            dispatch(FetchAddPostsSuccess(post))
        }).catch(error =>{
            dispatch(FetchAddPostsFailure(error))
        })
    }
}
const FetchAddDefaultState = ()=>{
    return {
        type:postsActions.FETCH_ADD_POSTS_REQUEST,
    }
}
export const FetchAddPostsFailure = (error)=>{
    return {
        type:postsActions.FETCH_ADD_POSTS_FAILURE,
        error
    }
}
export const FetchAddPostsSuccess = (post)=>{
    return {
        type:postsActions.FETCH_ADD_POSTS_SUCCESS,
        payload:post
    }
}

export const FetchEditPostsRequest = (token, id, described, status, image_del)=>{
    const taskURI = `/post/edit_post?token=${token}&id=${id}&described=${described}&status=${status}&image_del=${image_del}`
    return (dispatch)=>{
        dispatch(FetchEditDefaultState())
        axios.post(taskURI).then(v => {
            const post = v.data
            dispatch(FetchEditPostsSuccess(post))
        }).catch(error =>{
            dispatch(FetchEditPostsFailure(error))
        })
    }
}
const FetchEditDefaultState = ()=>{
    return {
        type:postsActions.FETCH_EDIT_POSTS_REQUEST,
    }
}
export const FetchEditPostsFailure = (error)=>{
    return {
        type:postsActions.FETCH_EDIT_POSTS_FAILURE,
        error
    }
}
export const FetchEditPostsSuccess = (post)=>{
    return {
        type:postsActions.FETCH_EDIT_POSTS_SUCCESS,
        payload:post
    }
}

export const FetchDeletePostsRequest = (token, id)=>{
    const taskURI = `/delete_post?token=${token}&id=${id}`
    return (dispatch)=>{
        dispatch(FetchDeleteDefaultState())
        axios.post(taskURI).then(v => {
            const post = v.data
            dispatch(FetchDeletePostsSuccess(post))
        }).catch(error =>{
            dispatch(FetchDeletePostsFailure(error))
        })
    }
}
const FetchDeleteDefaultState = ()=>{
    return {
        type:postsActions.FETCH_DELETE_POSTS_REQUEST,
    }
}
export const FetchDeletePostsFailure = (error)=>{
    return {
        type:postsActions.FETCH_DELETE_POSTS_FAILURE,
        error
    }
}
export const FetchDeletePostsSuccess = (post)=>{
    return {
        type:postsActions.FETCH_DELETE_POSTS_SUCCESS,
        payload:post
    }
}
