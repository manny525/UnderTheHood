const getUserFromToken = async (body) => {
    try {
        const res = await fetch('http://192.168.1.6:3000/users/getUserFromToken', {
            method: "POST",
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await res.json()
    } catch(e) {
        console.log(e)
    }
}

export default getUserFromToken