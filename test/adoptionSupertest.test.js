import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userModel from "../src/dao/models/User.js";
import petModel from "../src/dao/models/Pet.js";
import adoptionModel from "../src/dao/models/Adoption.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URL);

const requester = supertest("http://localhost:8080");

let testUser;
let testPet;
let testAdoption;

describe("Pruebas router adoptions", () => {
  before(async () => {
    // Usuario
    testUser = await userModel.create({
      first_name: "Max",
      last_name: "Test",
      email: "maxt@test.com",
      password: "123456",
    });

    // Mascota
    testPet = await petModel.create({
      name: "Haru",
      specie: "Perro",
      birthDate: "2026-02-27",
      adopted: false,
    });
  });

  after(async () => {
    if (testAdoption) {
      await adoptionModel.deleteOne({ _id: testAdoption._id });
    }

    if (testPet) {
      await petModel.deleteOne({ _id: testPet._id });
    }

    if (testUser) {
      await userModel.deleteOne({ _id: testUser._id });
    }

    await mongoose.connection.close();
  });

  it("POST /api/adoptions/:uid/:pid - Crear adopción", async () => {
    const response = await requester.post(
      `/api/adoptions/${testUser._id}/${testPet._id}`,
    );

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("status", "success");
    expect(response.body).to.have.property("message", "Pet adopted");

    const adoption = await adoptionModel.findOne({
      owner: testUser._id,
      pet: testPet._id,
    });

    expect(adoption).to.exist;

    testAdoption = adoption;
  });

  it("GET /api/adoptions - Obtener todas las adopciones", async () => {
    const response = await requester.get("/api/adoptions");

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("status", "success");
    expect(response.body.payload).to.be.an("array");
  });

  it("GET /api/adoptions/:aid - Obtener adopción por ID", async () => {
    const response = await requester.get(`/api/adoptions/${testAdoption._id}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("status", "success");
    expect(response.body.payload)
      .to.have.property("_id")
      .that.equals(testAdoption._id.toString());
  });

  it("GET /api/adoptions/:aid - Error si no existe", async () => {
    const response = await requester.get(
      "/api/adoptions/000000000000000000000000",
    );

    expect(response.status).to.equal(404);
    expect(response.body).to.have.property("status", "error");
  });

  it("POST /api/adoptions/:uid/:pid - Error usuario inexistente", async () => {
    const response = await requester.post(
      `/api/adoptions/000000000000000000000000/${testPet._id}`,
    );

    expect(response.status).to.equal(404);
    expect(response.body.error).to.equal("user Not found");
  });
});
