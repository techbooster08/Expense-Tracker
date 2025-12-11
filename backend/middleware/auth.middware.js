import { decodeToken } from "../helpers/jwt.helper.js";

export const authMddleware =  async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).send('Authentication token is required');
            return;
        }

        const token = authHeader.split(' ');
        const decoded = await decodeToken(token[1]);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send('Invalid token');
        return;
    }
};