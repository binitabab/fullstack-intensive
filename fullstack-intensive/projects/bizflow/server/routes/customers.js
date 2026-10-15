import { Router } from "express";
import { normalizeCustomerInput } from "../../shared/customerValidation.js";
import { requireAuth } from "../middleware/auth.js";
import { Customer } from "../models/Customer.js";

const router = Router();

router.use(requireAuth);

router.get("/", async (req, res, next) => {
  try {
    const rows = await Customer.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(rows.map((r) => r.toJSON()));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const clean = normalizeCustomerInput(req.body ?? {});
    const customer = await Customer.create({
      ...clean,
      owner: req.user._id,
    });
    res.status(201).json(customer.toJSON());
  } catch (err) {
    next(err);
  }
});

export default router;
