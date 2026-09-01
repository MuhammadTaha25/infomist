import { Router, type IRouter } from "express";
import healthRouter from "./health";
import bookingRouter from "./booking";
import contactRouter from "./contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use(bookingRouter);
router.use(contactRouter);

export default router;
