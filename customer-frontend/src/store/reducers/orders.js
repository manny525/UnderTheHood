const ordersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case 'SET_ORDERS':
            return {
                orders: [...action.orders]
            }
        case 'ADD_ORDER':
            return {
                orders: state.orders.concat(action.order)
            }
        case 'UPDATE_ORDERS': {
            const orders = state.orders.filter((order) => order._id !== action.order._id)
            orders.push(action.order)
            return {
                orders
            }
        }
        default:
            return state
    }
}

export default ordersReducer