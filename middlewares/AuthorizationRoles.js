// Middleware de autorización por rol
function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        const userRole = req.user.role;  // role viene del token

        if (!allowedRoles.includes(userRole)) {
            console.log(userRole);
            return res.status(403).json({ message: "Access denied: Unauthorized role"  });
        }

        next();
    };
}

module.exports = authorizeRoles ;
