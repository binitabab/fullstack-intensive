import { Router } from "express";
import { normalizeCustomerInput } from "../../shared/customerValidation.js";
import { requireAuth } from "../middleware/auth.js";
import {
  createCustomerForOwner,
  listCustomersForOwner,
} from "../repos/customers.js";

const router = Router();

router.use(requireAuth);

router.get("/", async (req, res, next) => {
  try {
    const ownerId = req.user._id ?? req.user.id;
    const rows = await listCustomersForOwner(ownerId);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const clean = normalizeCustomerInput(req.body ?? {});
    const ownerId = req.user._id ?? req.user.id;
    const customer = await createCustomerForOwner(ownerId, clean);
    res.status(201).json(customer);
  } catch (err) {
    next(err);
  }
});

export default router;
