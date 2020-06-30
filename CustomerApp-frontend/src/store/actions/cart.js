export const setCarts = (carts) => ({
    type: "SET_CARTS",
    carts
})

export const addCart = (cart) => {
    return {
        type: "ADD_CART",
        cart
    }
}

export const updateCart = (cart) => {
    return {
        type: "UPDATE_CART",
        cart
    }
}

export const deleteCustomerCart = (cart) => {
    console.log(cart)
    return {
        type: "DELETE_CART",
        cart
    }
}