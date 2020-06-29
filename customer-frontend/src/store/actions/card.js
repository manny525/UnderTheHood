export const setCustomerCards = (cards) => ({
    type: 'SET_CARDS',
    cards
})

export const addCustomerCard = (cardDetails) => ({
    type: 'ADD_CARD',
    cardDetails
})

export const deleteCustomerCard = (key) => ({
    type: 'DELETE_CARD',
    key
})