import { LOCAL_HOST } from 'react-native-dotenv'

const updateOrderStatus = async (body, token) => {
    try {
        const res = await fetch(`http://${LOCAL_HOST}/orders/status`, {
            method: "PATCH",
            body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        return await res.json()
    } catch(e) {
        console.log(e)
    }
}

export default updateOrderStatus