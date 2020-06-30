import { LOCAL_HOST } from 'react-native-dotenv'

const getInventory = async (token, merchantId) => {
    const url = `http://${LOCAL_HOST}/inventory/customer?merchantId=${merchantId}`
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const inventory = await res.json()
        console.log(inventory)
        return inventory
    } catch(e) {
        console.log(e)
    }
}

export default getInventory