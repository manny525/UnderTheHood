import { LOCAL_HOST } from 'react-native-dotenv'

const addCard = async (body, token) => {
    try {
        const res = await fetch(`http://${LOCAL_HOST}/cards/add`, {
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

export default addCard