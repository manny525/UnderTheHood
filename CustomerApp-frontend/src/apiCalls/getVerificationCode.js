import { LOCAL_HOST } from 'react-native-dotenv'

const getVerificationCode = async (body) => {
    try {
        const res = await fetch(`http://${LOCAL_HOST}/users/verifyEmail`, {
                method: "POST",
                body,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        return await res.json()
    } catch (e) {
        console.log(e)
    }
}

export default getVerificationCode