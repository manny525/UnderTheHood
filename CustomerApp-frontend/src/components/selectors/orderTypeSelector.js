const orderTypeSelector = (orders, type) => {
    return orders.filter((order) => {
        return order.status === type
    })
}

export default orderTypeSelector