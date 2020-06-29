const initalState = {
    goodsProviders: [{
        _id: 'm1',
        shopName: 'Guru Kirana',
        type: 'grocery',
        distance: '3 KM',
        location: {
            postalCode: "12345",
            lat: 25,
            lon: 30
        }
    }, {
        _id: 'm2',
        shopName: 'Shree General Store',
        type: 'medical',
        distance: '3 KM',
        location: {
            postalCode: "12345",
            lat: 25,
            lon: 30
        }
    }, {
        _id: 'm3',
        shopName: 'Shree General Store',
        type: 'grocery',
        distance: '3 KM',
        location: {
            postalCode: "12345",
            lat: 25,
            lon: 30
        }
    }, {
        _id: 'm4',
        shopName: 'Deep Medicose',
        type: 'medical',
        distance: '3 KM',
        location: {
            postalCode: "12345",
            lat: 25,
            lon: 30
        }
    }],
    serviceProviders: [{
        _id: 'm3',
        merchantName: 'Guru',
        type: 'barber',
        distance: '3 KM',
        location: {
            postalCode: "12345",
            lat: 25,
            lon: 30
        }
    }, {
        _id: 'm4',
        merchantName: 'Sharma',
        type: 'electrician',
        distance: '3 KM',
        location: {
            postalCode: "12345",
            lat: 25,
            lon: 30
        }
    }]
}

const merchantsReducer = (state = initalState, action) => {
    switch (action.type) {
        case 'SET_GOODS_PROVIDERS':
            return {
                ...state,
                goodsProviders: action.goodsProviders
            }
        case 'SET_SERVICE_PROVIDERS':
            return {
                ...state,
                serviceProviders: action.serviceProviders
            }
        default:
            return state
    }
}

export default merchantsReducer