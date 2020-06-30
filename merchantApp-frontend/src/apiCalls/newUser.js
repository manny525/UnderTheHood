import { LOCAL_HOST } from 'react-native-dotenv'

const newUser = async (body) => {
    try {
        const res = fetch(`http://${LOCAL_HOST}/users/newUser`, {
                method: "POST",
                body,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const user = await res.json()
        console.log('error')
        console.log(user)
        return user
    } catch (e) {
        console.log(e)
    }
}

export default newUser