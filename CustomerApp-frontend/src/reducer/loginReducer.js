import {SET_USER,LOGOUT} from '../actions/ActionTypes';

const initialState={
    user:{},
    token:null,
    loggedIn:false
}

function loginReducer(state=initialState,action){
    switch(action.type)
    {
        case SET_USER:
            return {
                ...state,
                user:action.userData.user,
                token:action.userData.token,
                loggedIn:true                 
            };
        case LOGOUT:
            return {
                ...state,
                user:{},
                token:null,
                loggedIn:true
            };
        default :
            return state; 
    }

}

export default loginReducer;