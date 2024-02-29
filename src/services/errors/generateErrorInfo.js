const generateUserErrorInfo = (user) => {
    return  `One or more properties were incomplete or not valid.
    listo f require properties:
    *first_name: needs to be a string, received ${user.first_name}
    *last_name: needs to be a string, received ${user.last_name}
    *email: needs to be a string, received ${user.email}`
}

const generateProductErrorInfo = (product) => {
    return  `One or more properties were incomplete or not valid.
    listo f require properties:
    *name: needs to be a string, received ${product.name}`
}

const generateUserManagementErrorInfo = (user) => {
    return  `One or more properties were incomplete or not valid.
    listo f require properties:
    *first_name: needs to be a string, received ${user.first_name}
    *email: needs to be a string, received ${user.email}`}

module.exports = {
    generateUserErrorInfo,
    generateProductErrorInfo,
    generateUserManagementErrorInfo
}