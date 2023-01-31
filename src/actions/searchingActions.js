import { searchingActions } from '../constants'
import axios from 'axios'

export const commonSearchRequest = (keyword) => {
    return dispatch => {
        dispatch(SearchGroupsRequest(keyword))
        dispatch(SearchPostsRequest(keyword))
        dispatch(SearchPagesRequest(keyword))
        dispatch(SearchUsersRequest(keyword))
    }
}
export const SearchUsersRequest = (keyword) => {
    const taskURI = '/users?name_like=' + keyword.trim()
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const users = v.data
            dispatch(SearchUsersSuccess(users))
        }).catch(error => {
            dispatch(SearchUsersFailure(error))
        })
    }
}
const FetchDefaultState = () => {
    return {
        type: searchingActions.SEARCH_USERS_REQUEST,
    }
}
export const SearchUsersFailure = (error) => {
    return {
        type: searchingActions.SEARCH_USERS_FAILURE,
        error
    }
}
export const SearchUsersSuccess = (users) => {
    return {
        type: searchingActions.SEARCH_USERS_SUCCESS,
        payload: users
    }
}
//
export const SearchPagesRequest = (keyword) => {
    const taskURI = '/pages?name_like=' + keyword
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const pages = v.data
            dispatch(SearchPagesSuccess(pages))
        }).catch(error => {
            dispatch(SearchPagesFailure(error))
        })
    }
}
export const SearchPagesFailure = (error) => {
    return {
        type: searchingActions.SEARCH_PAGES_FAILURE,
        error
    }
}
export const SearchPagesSuccess = (pages) => {
    return {
        type: searchingActions.SEARCH_PAGES_SUCCESS,
        payload: pages
    }
}
//
//
export const SearchPostsRequest = (token, index, count, keyword) => {
    const taskURI = `/search/search?token=${token}&index=${index}&count=${count}&keyword=${keyword}`
    return (dispatch) => {
        axios.post(taskURI).then(v => {
            const posts = v.data
            dispatch(SearchPostsSuccess(posts))
        }).catch(error => {
            dispatch(SearchPostsFailure(error))
        })
    }
}
export const SearchPostsFailure = (error) => {
    return {
        type: searchingActions.SEARCH_POSTS_FAILURE,
        error
    }
}
export const SearchPostsSuccess = (posts) => {
    return {
        type: searchingActions.SEARCH_POSTS_SUCCESS,
        payload: posts
    }
}
//
export const FetchGetSaveSearchRequest = (token, index, count) => {
    const taskURI = `/search/get_saved_search?token=${token}&index=${index}&count=${count}`
    return (dispatch) => {
        axios.post(taskURI).then(v => {
            const searchs = v.data
            dispatch(FetchGetSaveSearchSuccess(searchs))
        }).catch(error => {
            dispatch(FetchGetSaveSearchFailure(error))
        })
    }
}
export const FetchGetSaveSearchFailure = (error) => {
    return {
        type: searchingActions.FETCH_GET_SAVE_SEARCH_FAILURE,
        error
    }
}
export const FetchGetSaveSearchSuccess = (searchs) => {
    return {
        type: searchingActions.FETCH_GET_SAVE_SEARCH_REQUEST,
        payload: searchs
    }
}
//
export const FetchDeleteSavedSearchRequest = (token, all, search_id) => {
    const taskURI = `/search/del_saved_search?token=${token}&all=${all}&search_id=${search_id}`
    return (dispatch) => {
        axios.post(taskURI).then(v => {
            const search = v.data
            dispatch(FetchDeleteSavedSearchSuccess(search))
        }).catch(error => {
            dispatch(FetchDeleteSavedSearchFailure(error))
        })
    }
}
export const FetchDeleteSavedSearchFailure = (error) => {
    return {
        type: searchingActions.FETCH_DELETE_SAVED_SEARCH_FAILURE,
        error
    }
}
export const FetchDeleteSavedSearchSuccess = (search) => {
    return {
        type: searchingActions.FETCH_DELETE_SAVED_SEARCH_REQUEST,
        payload: search
    }
}
//
export const SearchGroupsRequest = (keyword) => {
    const taskURI = '/groups?name_like=' + keyword
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const groups = v.data
            dispatch(SearchGroupsSuccess(groups))
        }).catch(error => {
            dispatch(SearchGroupsFailure(error))
        })
    }
}
export const SearchGroupsFailure = (error) => {
    return {
        type: searchingActions.SEARCH_GROUPS_FAILURE,
        error
    }
}
export const SearchGroupsSuccess = (groups) => {
    return {
        type: searchingActions.SEARCH_GROUPS_SUCCESS,
        payload: groups
    }
}
//
