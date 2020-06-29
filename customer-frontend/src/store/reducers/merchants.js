const initalState = {
    goodsProviders: [],
    serviceProviders: []
}

const merchantsReducer = (state = initalState, action) => {
    switch (action.type) {
        case 'SET_GOODS_PROVIDERS':{
        // console.log(action.goodsProviders)
            return {
                ...state,
                goodsProviders: state.goodsProviders.concat(action.goodsProviders)
            }
        }
        case 'SET_SERVICE_PROVIDERS':
            return {
                ...state,
                serviceProviders: state.serviceProviders.concat(action.serviceProviders)
            }
        default:
            return state
    }
}

export default merchantsReducer