import { countCustomersForOwner, seedCustomers } from "./repos/customers.js";

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

export async function seedCustomersForUser(userId) {
  const count = await countCustomersForOwner(userId);
  if (count > 0) return;
  await seedCustomers(userId, DEMO);
}
