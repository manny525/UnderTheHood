const typeSelector = (merchants, type) => {
    return merchants.filter((merchant) => merchant.type === type)
}

export default typeSelector