import { LOCAL_HOST } from 'react-native-dotenv'

const updateServiceStatus = async (body, token) => {
    try {
        const res = await fetch(`http://${LOCAL_HOST}/service/status`, {
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

export default updateServiceStatus