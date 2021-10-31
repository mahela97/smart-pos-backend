import {Request, Response, Router} from "express";
import * as admin from "firebase-admin";
import userRouter from "../userRoutes/userRouter";
import adminRouter from "../adminRoutes/adminRouter";
import salespersonRouter from "../salespersonRoutes/salespersonRouter";
import managerRouter from "../managerRoutes/managerRouter";
import UserDAO from "../../dao/userDAO";

const apiRouter = Router();

declare module "express" {
    interface Request {
        user?: admin.auth.DecodedIdToken;
    }
}

apiRouter.use("/users", userRouter);

const validateFirebaseIdToken = async (
    req: Request,
    res: Response,
    next: any
) => {
    console.log("Check if request is authorized with Firebase ID token");

    if (
        (!req.headers.authorization ||
            !req.headers.authorization.startsWith("Bearer ")) &&
        !(req.cookies && req.cookies.__session)
    ) {
        console.error(
            "No Firebase ID token was passed as a Bearer token in the Authorization header.",
            "Make sure you authorize your request by providing the following HTTP header:",
            "Authorization: Bearer <Firebase ID Token>",
            'or by passing a "__session" cookie.'
        );
        res.status(401).send("Unauthorized");
        return;
    }

    let idToken;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        console.log('Found "Authorization" header');
        // Read the ID Token from the Authorization header.
        // eslint-disable-next-line prefer-destructuring
        idToken = req.headers.authorization.split("Bearer ")[1];
    } else {
        // No cookie
        res.status(401).send("Unauthorized");
        return;
    }

    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        console.log("Successfully decoded");
        if (decodedIdToken) {
            req.user = decodedIdToken;
            next();
            return;
        }
        res.status(403).send("Forbidden");
    } catch (error) {
        console.error("Error while verifying Firebase ID token:", error);
        res.status(401).send("Unauthorized");
    }
};

const isAdmin = async (req: Request,
                       res: Response,
                       next: any) => {
    const userDao = new UserDAO();
    const uid =<string> req.user?.uid;
    const user = await userDao.getUserByUid(uid.toString());
    console.log(user);
    if (user.role==="admin"){
        next();
    }else{
        res.status(403).send("Forbidden");
    }
};

const isManager = async (req: Request,
                       res: Response,
                       next: any) => {
    const userDao = new UserDAO();
    const uid =<string> req.user?.uid;
    const user = await userDao.getUserByUid(uid.toString());
    if (user.role==="manager"){
        next();
    }else{
        res.status(403).send("Forbidden");
    }

};

const isSalesperson = async (req: Request,
                       res: Response,
                       next: any) => {
    const userDao = new UserDAO();
    const uid =<string> req.user?.uid;
    const user = await userDao.getUserByUid(uid.toString());
    console.log(user);
    if (user.role==="salesperson"){
        next();
    }else{
        res.status(403).send("Forbidden");
    }

};

apiRouter.use("/", validateFirebaseIdToken);

apiRouter.use("/admin",isAdmin, adminRouter);
apiRouter.use("/salesperson",isSalesperson, salespersonRouter);
apiRouter.use("/manager",isManager, managerRouter);

export default apiRouter;
