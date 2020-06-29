const initalState = {
    requests: [{
        _id: '1234',
        customerName: 'Manthan',
        merchantName: 'Ashutosh',
        customerId: '_id11',
        merchantId: 'm_id1',
        status: 'new',
        date: '26/06',
        time: '',
        description: 'Broski need help'
    }, {
        _id: '12345',
        customerName: 'Suruchi',
        merchantName: 'Ashutosh',
        customerId: '_id12',
        merchantId: 'm_id1',
        status: 'new',
        date: '26/06',
        time: '',
        description: 'Broski need help'
    }, {
        _id: '12356',
        customerName: 'Suruchi',
        merchantName: 'Ashutosh',
        customerId: '_id12',
        merchantId: 'm_id1',
        status: 'upcoming',
        date: '26/06',
        time: '11:00 AM',
        description: 'Broski need help'
    }, {
        _id: '12346',
        customerName: 'Manthan',
        merchantName: 'Ashutosh',
        customerId: '_id11',
        merchantId: 'm_id1',
        status: 'completed',
        date: '26/06',
        time: '5:30 PM',
        description: 'Broski need help'
    }, {
        _id: '123466',
        customerName: 'Manthan',
        merchantName: 'Ashutosh',
        customerId: '_id11',
        merchantId: 'm_id1',
        status: 'upcoming',
        date: '26/06',
        time: '5:30 PM',
        description: 'Broski need help'
    }]
}

const serviceRequestReducer = (state = initalState, action) => {
    switch (action.type) {
        case 'SET_SERVICE_REQUESTS':
            return {
                requests: action.requests
            }
        case 'UPDATE_SERVICE_REQUEST': {
            const requests = state.requests.filter((request) => request._id !== action.request._id)
            requests.push(action.request)
            return {
                requests
            }
        }
        default:
            return state
    }
}

export default serviceRequestReducer