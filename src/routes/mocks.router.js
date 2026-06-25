import { Router } from "express";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import Users from "../dao/Users.dao.js";
import Pets from "../dao/Pets.dao.js";

const router = Router();
const usersDAO = new Users();
const petsDAO = new Pets();

// Generar usuarios
const generateMockUsers = (num) => {
  return Array.from({ length: num }, () => ({
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync("coder123", 10),
    role: faker.helpers.arrayElement(["user", "admin"]),
    pets: [],
  }));
};

// Generar mascotas
const generateMockPets = (num) => {
  return Array.from({ length: num }, () => ({
    name: faker.animal.petName(),
    specie: faker.helpers.arrayElement(["Perro", "Gato", "Pájaro", "Conejo"]),
    birthDate: faker.date.past(),
    adopted: false,
    owner: null,
    image: faker.image.url(),
  }));
};

// Genera 50 usuarios
router.get("/mockingusers", (req, res) => {
  const users = generateMockUsers(50);
  res.json(users);
});

// Genera 25 mascotas
router.get("/mockingpets", (req, res) => {
  const pets = generateMockPets(25);
  res.json(pets);
});

// Genera e inserta usuarios y mascotas. Guarda en db
router.post("/generateData", async (req, res) => {
  try {
    const { users, pets } = req.body;

    const mockUsers = generateMockUsers(users);
    await Promise.all(mockUsers.map((user) => usersDAO.save(user)));

    const mockPets = generateMockPets(pets);
    await Promise.all(mockPets.map((pet) => petsDAO.save(pet)));

    res.status(201).json({
      message: "Usuarios y mascotas generados e insertados correctamente",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
