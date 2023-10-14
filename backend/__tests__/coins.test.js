const supertest = require("supertest");
const app = require("../app");

describe("Coins", () => {
  describe("Get All Coins", () => {
    it("should return 200", async () => {
      const currency = "inr";
      const response = await supertest(app).get(`/coins?currency=${currency}`);
      expect(response.status).toEqual(200);
      expect(response.body.success).toEqual(true);
    });
  });
  describe("Get Single Coin Data", () => {
    it("should return 200", async () => {
      const id = "bitcoin";
      const response = await supertest(app).get(`/coin/${id}`);
      expect(response.status).toEqual(200);
      expect(response.body.success).toEqual(true);
    });
  });
  describe("Get Single Coin Historic Data", () => {
    it("should return 200", async () => {
      const currency = "inr";
      const id = "bitcoin";
      const days = 365;
      const response = await supertest(app).get(
        `/historic?id=${id}&currency=${currency}&days=${days}`
      );
      expect(response.status).toEqual(200);
      expect(response.body.success).toEqual(true);
    });
  });
  describe("Get Trending Coins Data", () => {
    it("should return 200", async () => {
      const response = await supertest(app).get(`/trending`);
      expect(response.status).toEqual(200);
      expect(response.body.success).toEqual(true);
    });
  });
});
