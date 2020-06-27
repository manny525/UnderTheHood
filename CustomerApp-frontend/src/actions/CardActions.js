import {ADD_CARD,DELETE_CARD} from './ActionTypes';

const addCard=(cardDetails)=>{
    return {
        type:ADD_CARD,
        cardDetails:cardDetails
    }

}
const deleteCard=(key)=>{
    return {
        type:DELETE_CARD,
        key:key
    }
}
export default {addCard,deleteCard};
