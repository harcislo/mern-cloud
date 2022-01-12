const SET_FILES = 'SET_FILES'
const SET_CURRENT_DIR = 'SET_CURRENT_DIR'
const ADD_FILE = 'ADD_FILE'
const SET_POPUP_DISPLAY = 'SET_POPUP_DISPLAY'
const REMOVE_POPUP_DISPLAY = 'REMOVE_POPUP_DISPLAY'
const PUSH_TO_STACK = 'PUSH_TO_STACK'
const PUSH_FROM_STACK = 'PUSH_FROM_STACK'
const DELETE_FILE = 'DELETE_FILE'
const SET_VIEW = 'SET_VIEW'

const defaultState = {
    files: [],
    currentDir: null,
    popupDisplay: false,
    dirStack: [],
    view: 'list'
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case SET_FILES:
            return {
                ...state,
                files: action.payload
            }
        case SET_CURRENT_DIR:
            return {
                ...state,
                currentDir: action.payload
            }
        case ADD_FILE:
            return {
                ...state,
                files: [...state.files, action.payload]
            }

        case SET_POPUP_DISPLAY:
            return {
                ...state,
                popupDisplay: true
            }
        case REMOVE_POPUP_DISPLAY:
            return {
                ...state,
                popupDisplay: false
            }
        case PUSH_TO_STACK:
            return {
                ...state,
                dirStack: [...state.dirStack, action.payload]
            }

        case DELETE_FILE: {
            return {
                ...state,
                files: [...state.files.filter(file => file._id != action.payload)]
            }
        }

        case SET_VIEW: return {...state, view: action.payload}
        default:
            return state
    }
}

export const setFiles = (files) => ({type: SET_FILES, payload: files})
export const setCurrentDir = (dir) => ({type: SET_CURRENT_DIR, payload: dir})
export const addFile = (file) => ({type: ADD_FILE, payload: file})
export const pushToStack = (dir) => ({type: PUSH_TO_STACK, payload: dir})
export const deleteFileAction = (dirId) => ({type: DELETE_FILE, payload: dirId})
export const setFileAction = (payload) => ({type: SET_VIEW, payload})

export const setPopup = {type: SET_POPUP_DISPLAY}
export const removePopup = {type: REMOVE_POPUP_DISPLAY}
