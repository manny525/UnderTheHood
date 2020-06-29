const ordersReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case 'SET_ORDERS':
            return {
                orders: state.orders.concat(action.orders)
            }
        case 'ADD_ORDER':
            return {
                orders: state.orders.concat(action.order)
            }
        default:
            return state
    }
}

export default ordersReducer