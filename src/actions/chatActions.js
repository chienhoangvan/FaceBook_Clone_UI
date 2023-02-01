import {chatActions} from '../constants'
import axios from 'axios'
//get conversation
export const FetchGetConversationRequest = (token, partner_id, indexLast, count)=>{
    const taskURI = `/chat/get_conversation?token=${token}&partner_id=${partner_id}&indexLast=${indexLast}&count=${count}`
    return (dispatch)=>{
        dispatch(FetchGetConversationDefaultState())
        axios.post(taskURI).then(v => {
            const conversation = v.data
            dispatch(FetchGetConversationSuccess(conversation))
        }).catch(error =>{
            dispatch(FetchGetConversationFailure(error))
        })
    }
}
const FetchGetConversationDefaultState = ()=>{
    return {
        type:chatActions.FETCH_GET_CONVERSATION_REQUEST,
    }
}
export const FetchGetConversationFailure = (error)=>{
    return {
        type:chatActions.FETCH_GET_CONVERSATION_FAILURE,
        error
    }
}
export const FetchGetConversationSuccess = (conversation)=>{
    return {
        type:chatActions.FETCH_GET_CONVERSATION_SUCCESS,
        payload:conversation
    }
}
//get list conversation
export const FetchGetListConversationRequest = (token, page)=>{
    const taskURI = `/chat/get_list_conversation?token=${token}&page=${page}`
    return (dispatch)=>{
        dispatch(FetchGetListConversationDefaultState())
        axios.post(taskURI).then(v => {
            const conversations = v.data
            dispatch(FetchGetListConversationSuccess(conversations))
        }).catch(error =>{
            dispatch(FetchGetListConversationFailure(error))
        })
    }
}
const FetchGetListConversationDefaultState = ()=>{
    return {
        type:chatActions.FETCH_GET_LIST_CONVERSATION_REQUEST,
    }
}
export const FetchGetListConversationFailure = (error)=>{
    return {
        type:chatActions.FETCH_GET_LIST_CONVERSATION_FAILURE,
        error
    }
}
export const FetchGetListConversationSuccess = (conversations)=>{
    return {
        type:chatActions.FETCH_GET_LIST_CONVERSATION_SUCCESS,
        payload:conversations
    }
}
//Set read message
export const FetchSetReadMessageRequest = (token, conversation_id)=>{
    const taskURI = `/chat/set_read_message?token=${token}&conversation_id=${conversation_id}`
    return (dispatch)=>{
        dispatch(FetchSetReadMessageDefaultState())
        axios.post(taskURI).then(v => {
            const read = v.data
            dispatch(FetchSetReadMessageSuccess(read))
        }).catch(error =>{
            dispatch(FetchSetReadMessageFailure(error))
        })
    }
}
const FetchSetReadMessageDefaultState = ()=>{
    return {
        type:chatActions.FETCH_SET_READ_MESSAGE_REQUEST,
    }
}
export const FetchSetReadMessageFailure = (error)=>{
    return {
        type:chatActions.FETCH_SET_READ_MESSAGE_FAILURE,
        error
    }
}
export const FetchSetReadMessageSuccess = (read)=>{
    return {
        type:chatActions.FETCH_SET_READ_MESSAGE_SUCCESS,
        payload:read
    }
}
//delete message
export const FetchDeleteMessageRequest = (token,message_id, conversation_id)=>{
    const taskURI = `/chat/delete_message?token=${token}&message_id=${message_id}&conversation_id=${conversation_id}`
    return (dispatch)=>{
        dispatch(FetchDeleteMessageDefaultState())
        axios.post(taskURI).then(v => {
            const message = v.data
            dispatch(FetchDeleteMessageSuccess(message))
        }).catch(error =>{
            dispatch(FetchDeleteMessageFailure(error))
        })
    }
}
const FetchDeleteMessageDefaultState = ()=>{
    return {
        type:chatActions.FETCH_DELETE_MESSAGE_REQUEST,
    }
}
export const FetchDeleteMessageFailure = (error)=>{
    return {
        type:chatActions.FETCH_DELETE_MESSAGE_FAILURE,
        error
    }
}
export const FetchDeleteMessageSuccess = (message)=>{
    return {
        type:chatActions.FETCH_DELETE_MESSAGE_SUCCESS,
        payload:message
    }
}
//delete conversation
export const FetchDeleteConversationRequest = (token, conversation_id)=>{
    const taskURI = `/chat/delete_conversation?token=${token}&conversation_id=${conversation_id}`
    return (dispatch)=>{
        dispatch(FetchDeleteConversationDefaultState())
        axios.post(taskURI).then(v => {
            const conversation = v.data
            dispatch(FetchDeleteConversationSuccess(conversation))
        }).catch(error =>{
            dispatch(FetchDeleteConversationFailure(error))
        })
    }
}
const FetchDeleteConversationDefaultState = ()=>{
    return {
        type:chatActions.FETCH_DELETE_CONVERSATION_REQUEST,
    }
}
export const FetchDeleteConversationFailure = (error)=>{
    return {
        type:chatActions.FETCH_DELETE_CONVERSATION_FAILURE,
        error
    }
}
export const FetchDeleteConversationSuccess = (conversation)=>{
    return {
        type:chatActions.FETCH_DELETE_CONVERSATION_SUCCESS,
        payload:conversation
    }
}
//add dialog
export const FetchAddDialogRequest = (token, partner_id, message)=>{
    const taskURI = `/chat/add_dialog?token=${token}&partner_id=${partner_id}&message=${message}`
    return (dispatch)=>{
        dispatch(FetchAddDialogDefaultState())
        axios.post(taskURI).then(v => {
            const dialog = v.data
            dispatch(FetchAddDialogSuccess(dialog))
        }).catch(error =>{
            dispatch(FetchAddDialogFailure(error))
        })
    }
}
const FetchAddDialogDefaultState = ()=>{
    return {
        type:chatActions.FETCH_ADD_DIALOG_REQUEST,
    }
}
export const FetchAddDialogFailure = (error)=>{
    return {
        type:chatActions.FETCH_ADD_DIALOG_FAILURE,
        error
    }
}
export const FetchAddDialogSuccess = (dialog)=>{
    return {
        type:chatActions.FETCH_ADD_DIALOG_SUCCESS,
        payload:dialog
    }
}