import { LOCAL_HOST } from 'react-native-dotenv'

const findUserByToken = async (token) => {
    try {
        const res = await fetch(`http://${LOCAL_HOST}/customer/loginByToken`, {
            method: "POST",
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

export default findUserByToken