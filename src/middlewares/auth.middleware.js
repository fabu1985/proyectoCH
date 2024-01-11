function authentication(req, res, next) {
    // pedir el user a la base de datos 

    if (req.session.user.email === 'adminCoder@coder.com') {
        return res.send('Bienvenido superusuario')
    }
    if( !req.session?.user?.admin ) {
        return res.status(401).send('error de autenticación')
    };
    next();
};

module.exports = {
    authentication
};