const permit = (requiredRole) => {
  return (req, res, next) => {
    if (req.user && req.user.role === requiredRole) {
      next(); // User has the required role, proceed to the next middleware
    } else {
      return res
        .status(403)
        .json({ message: `Access restricted to ${requiredRole}s only` });
    }
  };
};

module.exports = permit;
