const cardReducer = (state = {cardList: []}, action) => {
    switch (action.type) {
        case 'SET_CARDS':
            return {
                cardList: [...action.cards]
            }
        case 'ADD_CARD':
            return {
                ...state,
                cardList: [...state.cardList, action.cardDetails]
            }
        case 'DELETE_CARD':
            return {
                ...state,
                cardList: state.cardList.filter((item) =>
                    item.number !== action.key)
            }
        default:
            return state;

    }
}
export default cardReducer;