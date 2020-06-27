import {SET_USER,LOGOUT} from './ActionTypes';

const setUser=(userData)=>{
    return {
        type:SET_USER,
        userData:userData
    }
}

const logout=()=>{
    return{
        type:LOGOUT
    }
}

export default {setUser,logout}