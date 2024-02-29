const generateUserErrorInfo = (user) => {
    return  `One or more propertires were incomplete or not valid.
    listo f require properties:
    *first_name: needs to be a string, recived ${user.first_name}
    *last_name: needs to be a string, recived ${user.last_name}
    *email: needs to be a string, recived ${user.email}`
}

module.exports = {
    generateUserErrorInfo
}