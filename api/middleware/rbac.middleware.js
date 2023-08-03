const isAdmin = (req, res, next) => {
    let user = req.auth_user;
    if(!user) {
        next({status: 401, msg: "Unauthenticated"})
    } else {
        if(user.role === 'admin') {
            next();
        } else {
            next({status: 403, msg: "Unauthorized access"})
        }
    }
}

const isCustomer = (req, res, next) => {
    let user = req.auth_user;
    if(!user) {
        next({status: 401, msg: "Unauthenticated"})
    } else {
        if(user.role === 'customer') {
            next();
        } else {
            next({status: 403, msg: "Unauthorized access"})
        }
    }
}


const isSeller = (req, res, next) => {
    let user = req.auth_user;
    if(!user) {
        next({status: 401, msg: "Unauthenticated"})
    } else {
        if(user.role === 'seller') {
            next();
        } else {
            next({status: 403, msg: "Unauthorized access"})
        }
    }
}


const isAdminOrSeller = (req, res, next) => {
    let user = req.auth_user;
    if(!user) {
        next({status: 401, msg: "Unauthenticated"})
    } else {
        if(user.role === 'seller' || user.role === 'admin') {
            next();
        } else {
            next({status: 403, msg: "Unauthorized access"})
        }
    }
}



module.exports = {isAdmin, isCustomer, isSeller, isAdminOrSeller};