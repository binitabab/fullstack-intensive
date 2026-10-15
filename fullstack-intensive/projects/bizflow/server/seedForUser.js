import { Customer } from "./models/Customer.js";

const DEMO = [
  {
    name: "Ada Okonkwo",
    email: "ada@brightkitchen.co",
    status: "active",
  },
  {
    name: "Ben Hale",
    email: "ben@hale.studio",
    status: "lead",
  },
  {
    name: "Carla Mendes",
    email: "carla@mendes.supply",
    status: "active",
  },
];

/** Give a brand-new account a few sample customers so the UI is not empty. */
export async function seedCustomersForUser(userId) {
  const count = await Customer.countDocuments({ owner: userId });
  if (count > 0) return;

  await Customer.insertMany(
    DEMO.map((row) => ({
      ...row,
      owner: userId,
    })),
  );
}
