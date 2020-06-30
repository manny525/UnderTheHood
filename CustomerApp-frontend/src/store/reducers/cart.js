const ordersReducer = (state = { carts: [] }, action) => {
    switch (action.type) {
        case 'SET_CARTS':
            return {
                carts: [...action.carts]
            }
        case 'ADD_CART':
            return {
                carts: state.carts.concat(action.cart)
            }
        case 'UPDATE_CART': {
            state.carts.forEach(cart => {
                if (cart.cartId === action.cart.cartId) {
                    cart = action.cart
                }
            })
            return state
        }
        case 'DELETE_CART':{ 
            return {
                carts: state.carts.filter(cart => cart._id !== action.cart._id)
            }
        }
        default:
            return state
    }
}

export default ordersReducer