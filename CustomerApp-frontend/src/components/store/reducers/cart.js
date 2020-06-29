const initalState = {
    carts: []
}

const ordersReducer = (state = {carts: []}, action) => {
    switch (action.type) {
        case 'SET_CARTS':
            return {
                carts: action.carts
            }
        case 'ADD_CART': 
            return {
                carts: state.carts.concat(action.cart)
            }
        default:
            return state
    }
}

export default ordersReducer