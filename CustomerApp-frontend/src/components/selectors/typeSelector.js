const typeSelector = (merchants, type) => {
    return merchants.filter((merchant) => {
        return merchant.type === type
    })
}

export default typeSelector