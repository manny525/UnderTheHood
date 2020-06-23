const initalState = {
    items: []
}

const inventoryReducer = (state = initalState, action) => {
    switch(action.type) {
        case 'SET_INVENTORY':
            return {
                inventory: action.inventory
            }
        case 'UPDATE_INVENTORY': {
            return {
                
            }
        }
        default: 
            return state
    }
}

export default inventoryReducer