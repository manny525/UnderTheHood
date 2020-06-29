const typeSelector = (merchants, type) => {
    console.log(merchants)
    return merchants.filter((merchant) => merchant.type === type)
}

export default typeSelector