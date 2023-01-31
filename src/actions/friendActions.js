import { friendActions } from '../constants'
import axios from 'axios'

export const FetchRecommendFriendsRequest = (token, index, count) => {
    const taskURI = `/friend/get_list_suggested_friends?token=${token}&index=${index}&count=${count}`
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const friends = v.data
            dispatch(FetchRecommendFriendsSuccess(friends))
        }).catch(error => {
            dispatch(FetchRecommendFriendsFailure(error))
        })
    }
}
const FetchDefaultState = () => {
    return {
        type: friendActions.FETCH_RECOMMEND_FRIENDS_REQUEST,
    }
}
export const FetchRecommendFriendsFailure = (error) => {
    return {
        type: friendActions.FETCH_RECOMMEND_FRIENDS_FAILURE,
        error
    }
}
export const FetchRecommendFriendsSuccess = (friends) => {
    return {
        type: friendActions.FETCH_RECOMMEND_FRIENDS_SUCCESS,
        payload: friends
    }
}
//
export const FetchFriendRequestsRequest = (token, index, count) => {
    const taskURI = `/friend/get_requested_friends?token=${token}&index=${index}&count=${count}`
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const friends = v.data
            dispatch(FetchFriendRequestsSuccess(friends))
        }).catch(error => {
            dispatch(FetchFriendRequestsFailure(error))
        })
    }
}
export const FetchFriendRequestsFailure = (error) => {
    return {
        type: friendActions.FETCH_FRIEND_REQUESTS_FAILURE,
        error
    }
}
export const FetchFriendRequestsSuccess = (friends) => {
    return {
        type: friendActions.FETCH_FRIEND_REQUESTS_SUCCESS,
        payload: friends
    }
}

export const FetchSetRequestFriendRequest = (token, user_id) => {
    const taskURI = `/friend/set_request_friend?token=${token}&user_id=${user_id}`
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const friend = v.data
            dispatch(FetchSetRequestFriendSuccess(friend))
        }).catch(error => {
            dispatch(FetchSetRequestFriendFailure(error))
        })
    }
}
export const FetchSetRequestFriendFailure = (error) => {
    return {
        type: friendActions.FETCH_SET_REQUEST_FRIEND_FAILURE,
        error
    }
}
export const FetchSetRequestFriendSuccess = (friend) => {
    return {
        type: friendActions.FETCH_SET_REQUEST_FRIEND_SUCCESS,
        payload: friend
    }
}

export const FetchSetAcceptFriendRequest = (token, user_id) => {
    const taskURI = `/friend/set_accept_friend?token=${token}&user_id=${user_id}&is_accept=1`
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const friend = v.data
            dispatch(FetchSetAcceptFriendSuccess(friend))
        }).catch(error => {
            dispatch(FetchSetAcceptFriendFailure(error))
        })
    }
}
export const FetchSetAcceptFriendFailure = (error) => {
    return {
        type: friendActions.FETCH_SET_FRIEND_ACCEPT_FAILURE,
        error
    }
}
export const FetchSetAcceptFriendSuccess = (friend) => {
    return {
        type: friendActions.FETCH_SET_FRIEND_ACCEPT_SUCCESS,
        payload: friend
    }
}

export const FetchGetUserFriendsRequest = (token, user_id, page) => {
    const taskURI = `/friend/get_user_friends?token=${token}&user_id=${user_id}&page=${page}`
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const friends = v.data
            dispatch(FetchGetUserFriendsSuccess(friends))
        }).catch(error => {
            dispatch(FetchGetUserFriendsFailure(error))
        })
    }
}
export const FetchGetUserFriendsFailure = (error) => {
    return {
        type: friendActions.FETCH_GET_USER_FRIENDS_FAILURE,
        error
    }
}
export const FetchGetUserFriendsSuccess = (friends) => {
    return {
        type: friendActions.FETCH_GET_USER_FRIENDS_SUCCESS,
        payload: friends
    }
}
