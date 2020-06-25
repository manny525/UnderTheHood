const editItemInventory = async (body, token) => {
    try {
        const res = await fetch('http://192.168.1.6:3000/inventory/updateItem', {
            method: "PATCH",
            body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const inventory = await res.json()
        return inventory
    } catch(e) {
        console.log(e)
    }
}

export default editItemInventory