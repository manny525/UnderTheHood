const cartItmesReducer = (state = {items: []}, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            return {
                items: state.items.concat(action.item)
            }
        } 
        case 'RESET_ITEMS': {
            console.log(action.type)
            return {
                items: []
            }
        }
        default:
            return state
    }
}

export default cartItmesReducer