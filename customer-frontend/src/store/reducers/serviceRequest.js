const serviceRequestReducer = (state = {requests: []}, action) => {
    switch (action.type) {
        case 'SET_SERVICE_REQUESTS':
            return {
                requests: state.requests.concat(action.requests)
            }
        case 'ADD_SERVICE_REQUEST':
            return {
                requests: state.requests.concat(action.request)
            }
        default:
            return state
    }
}

export default serviceRequestReducer