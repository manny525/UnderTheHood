export const setCarts = (carts) => ({
    type: "SET_CARTS",
    carts
})
export const addCart = (cart) => {
    console.log(cart)
    return {
        type: "ADD_CART",
        cart
    }
}