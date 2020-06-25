const deleteItemInventory = async (body, token) => {
    try {
        const res = await fetch('http://192.168.1.6:3000/inventory/deleteItem', {
            method: "DELETE",
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

export default deleteItemInventory