import { ADD_CARD ,DELETE_CARD} from "../actions/ActionTypes";

const initialState={
    cardList:[]
}
function cardReducer(state = initialState, action){
    switch(action.type)
    {
        case ADD_CARD:
            return {
                ...state,
                cardList:[...state.cardList,action.cardDetails]
            }
        case DELETE_CARD:
            return{
                ...state,
                cardList:state.cardList.filter((item) =>
                item.number !== action.key)
            }
        default:
            return state;

    }
}
export default cardReducer;