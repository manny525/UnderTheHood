const initalState = {
    carts: [{
        _id: '1234',
        customerName: 'Manthan',
        shopName: 'Manthan Shop',
        customerId: '_id11',
        merchantId: 'm_id1',
        items: [{
            itemName: 'GoodDay 250gm',
            itemId: '_id1',
            quantity: 3,
            sellingPrice: "20"
        }, {
            itemName: 'Amul Milk 500ml',
            itemId: '_id2',
            quantity: 1
        }, {
            itemName: 'Kanha White Bread(Big)',
            itemId: '_id3',
            quantity: 2
        }],
        pickUpTime: {
            date: '26/06',
            start: '5:30 PM',
            end: '6:00 PM'
        }
    }, {
        _id: '12345',
        customerName: 'Suruchi',
        shopName: 'Manthan Shop',
        customerId: '_id12',
        items: [{
            itemName: 'GoodDay 250gm',
            itemId: '_id1',
            quantity: 3
        }, {
            itemName: 'Amul Milk 500ml',
            itemId: '_id2',
            quantity: 1
        }, {
            itemName: 'Kanha White Bread(Big)',
            itemId: '_id3',
            quantity: 2
        }],
        pickUpTime: {
            date: '26/06',
            start: '11:00 AM',
            end: '11:15 AM'
        }
    }, {
        _id: '12356',
        customerName: 'Suruchi',
        shopName: 'Manthan Shop',
        customerId: '_id12',
        items: [{
            itemName: 'GoodDay 250gm',
            itemId: '_id1',
            quantity: 3
        }, {
            itemName: 'Amul Milk 500ml',
            itemId: '_id2',
            quantity: 1
        }, {
            itemName: 'Kanha White Bread(Big)',
            itemId: '_id3',
            quantity: 2
        }],
        pickUpTime: {
            date: '26/06',
            start: '11:00 AM',
            end: '11:15 AM'
        }
    }, {
        _id: '12346',
        customerName: 'Manthan',
        shopName: 'Manthan Shop',
        customerId: '_id11',
        items: [{
            itemName: 'GoodDay 250gm',
            itemId: '_id1',
            quantity: 3
        }, {
            itemName: 'Amul Milk 500ml',
            itemId: '_id2',
            quantity: 1
        }, {
            itemName: 'Kanha White Bread(Big)',
            itemId: '_id3',
            quantity: 2
        }],
        pickUpTime: {
            date: '26/06',
            start: '5:30 PM',
            end: '6:00 PM'
        }
    }, {
        _id: '123466',
        customerName: 'Manthan',
        shopName: 'Manthan Shop',
        customerId: '_id11',
        items: [{
            itemName: 'GoodDay 250gm',
            itemId: '_id1',
            quantity: 3
        }, {
            itemName: 'Amul Milk 500ml',
            itemId: '_id2',
            quantity: 1
        }, {
            itemName: 'Kanha White Bread(Big)',
            itemId: '_id3',
            quantity: 2
        }],
        pickUpTime: {
            date: '26/06',
            start: '5:30 PM',
            end: '6:00 PM'
        }
    }, {
        _id: '123612',
        customerName: 'Papa',
        shopName: 'Manthan Shop',
        customerId: '_id12',
        items: [{
            itemName: 'GoodDay 250gm',
            itemId: '_id1',
            quantity: 3
        }, {
            itemName: 'Amul Milk 500ml',
            itemId: '_id2',
            quantity: 1
        }, {
            itemName: 'Kanha White Bread(Big)',
            itemId: '_id3',
            quantity: 2
        }],
        pickUpTime: {
            date: '26/06',
            start: '11:00 AM',
            end: '11:15 AM'
        }
    }, {
        _id: '123532',
        customerName: 'Suruchi',
        shopName: 'Manthan Shop',
        customerId: '_id12',
        items: [{
            itemName: 'GoodDay 250gm',
            itemId: '_id1',
            quantity: 3
        }, {
            itemName: 'Amul Milk 500ml',
            itemId: '_id2',
            quantity: 1
        }, {
            itemName: 'Kanha White Bread(Big)',
            itemId: '_id3',
            quantity: 2
        }],
        pickUpTime: {
            date: '26/06',
            start: '11:00 AM',
            end: '11:15 AM'
        }
    }, {
        _id: '123456',
        customerName: 'Manthan',
        shopName: 'Manthan Shop',
        customerId: '_id11',
        items: [{
            itemName: 'GoodDay 250gm',
            itemId: '_id1',
            quantity: 3
        }, {
            itemName: 'Amul Milk 500ml',
            itemId: '_id2',
            quantity: 1
        }, {
            itemName: 'Kanha White Bread(Big)',
            itemId: '_id3',
            quantity: 2
        }],
        pickUpTime: {
            date: '26/06',
            start: '5:30 PM',
            end: '6:00 PM'
        }
    }]
}

const ordersReducer = (state = initalState, action) => {
    switch (action.type) {
        case 'SET_ORDERS':
            return {
                orders: action.orders
            }
        default:
            return state
    }
}

export default ordersReducer