const initalState = {
    orders: {
        pending: [{
            _id: '1234',
            customerName: 'Manthan',
            customerId: '_id11',
            status: 'Pending',
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
            _id: '12345',
            customerName: 'Suruchi',
            customerId: '_id12',
            status: 'Pending',
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
        }],
        ready: [{
            _id: '12356',
            customerName: 'Suruchi',
            customerId: '_id12',
            status: 'Ready',
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
            customerId: '_id11',
            status: 'Ready',
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
            customerId: '_id11',
            status: 'Ready',
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
        }],
        completed: [{
            _id: '123612',
            customerName: 'Papa',
            customerId: '_id12',
            status: 'Completed',
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
            customerId: '_id12',
            status: 'Completed',
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
            customerId: '_id11',
            status: 'Completed',
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