import { Router } from "express";
import * as admin from "firebase-admin";
import userRouter from "../userRoutes/userRouter";
import adminRouter from "../adminRoutes/adminRouter";
import salespersonRouter from "../salespersonRoutes/salespersonRouter";
import managerRouter from "../managerRoutes/managerRouter";

const apiRouter = Router();

declare module "express" {
    interface Request {
        user?: admin.auth.DecodedIdToken;
    }
}

apiRouter.use("/users", userRouter);
//
// const validateFirebaseIdToken = async (
//     req: Request,
//     res: Response,
//     next: any,
//     tenantId: string
// ) => {
//     console.log("Check if request is authorized with Firebase ID token");
//
//     if (
//         (!req.headers.authorization ||
//             !req.headers.authorization.startsWith("Bearer ")) &&
//         !(req.cookies && req.cookies.__session)
//     ) {
//         console.error(
//             "No Firebase ID token was passed as a Bearer token in the Authorization header.",
//             "Make sure you authorize your request by providing the following HTTP header:",
//             "Authorization: Bearer <Firebase ID Token>",
//             'or by passing a "__session" cookie.'
//         );
//         res.status(401).send("Unauthorized");
//         return;
//     }
//
//     let idToken;
//
//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith("Bearer ")
//     ) {
//         console.log('Found "Authorization" header');
//         // Read the ID Token from the Authorization header.
//         // eslint-disable-next-line prefer-destructuring
//         idToken = req.headers.authorization.split("Bearer ")[1];
//     } else if (req.cookies) {
//         console.log('Found "__session" cookie');
//         // Read the ID Token from cookie.
//         idToken = req.cookies.__session;
//     } else {
//         // No cookie
//         res.status(401).send("Unauthorized");
//         return;
//     }
//
//     try {
//         const decodedIdToken = await admin.auth().verifyIdToken(idToken);
//         console.log("ID Token correctly decoded", decodedIdToken);
//         console.log(decodedIdToken);
//         if (tenantId === "admin") {
//             if (!decodedIdToken.email || decodedIdToken.firebase.tenant) {
//                 res.status(403).send("Forbidden");
//                 return;
//             }
//             req.user = decodedIdToken;
//             next();
//             return;
//         }
//
//         if (tenantId && decodedIdToken.firebase.tenant) {
//             if (req.path.includes("cms")) {
//                 if (decodedIdToken.email) {
//                     req.user = decodedIdToken;
//                     next();
//                     return;
//                 }
//                 res.status(403).send("Forbidden");
//                 return;
//             }
//             req.user = decodedIdToken;
//             next();
//             return;
//         }
//         res.status(403).send("Forbidden");
//     } catch (error) {
//         console.error("Error while verifying Firebase ID token:", error);
//         res.status(401).send("Unauthorized");
//     }
// };
//
// apiRouter.param("admin",validateFirebaseIdToken);
apiRouter.use("/admin", adminRouter);
apiRouter.use("/salesperson", salespersonRouter);
apiRouter.use("/manager", managerRouter);

export default apiRouter;
