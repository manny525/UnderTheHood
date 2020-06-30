import { LOCAL_HOST } from 'react-native-dotenv'

const updateCart = async (body, token) => {
    try {
        const res = await fetch(`http://${LOCAL_HOST}/carts/update`, {
            method: "PATCH",
            body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return await res.json()
    } catch(e) {
        console.log(e)
    }
}

export default updateCart