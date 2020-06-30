const serviceRequestReducer = (state = {requests: []}, action) => {
    switch (action.type) {
        case 'SET_SERVICE_REQUESTS':
            return {
                requests: [...action.requests]
            }
        case 'ADD_SERVICE_REQUEST':
            return {
                requests: state.requests.concat(action.request)
            }
            case 'UPDATE_SERVICES': {
                const requests = state.requests.filter((request) => request._id !== action.service._id)
                requests.push(action.service)
                return {
                    requests
                }
            }
        default:
            return state
    }
}

export default serviceRequestReducer