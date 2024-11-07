import jwt from 'jsonwebtoken';
export const auth = async (req, res, next) => {
    let token;
    if (req.header.authorization?.startsWith('Bearer')) {
        token = req.header.authorization.split(' ')[1];
    } else {
        return res.status(401).json({ error: 'No token found.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Not authorized to access this route.' });
    }
};