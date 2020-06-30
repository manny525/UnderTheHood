import { LOCAL_HOST } from 'react-native-dotenv'

const addCart = async (body, token) => {
    try {
        const res = await fetch(`http://${LOCAL_HOST}/carts/create`, {
            method: "POST",
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

export default addCart