import { describe, it, expect, vi } from "vitest";
import Movies from "../Models/Movie.js";

import { getAllMovies } from "./MovieControllers.js";

vi.mock("../Models/Movie");

describe("MovieController", () => {
  // testing to get all movies
  describe("getAllMovies", () => {
    it("retourne la liste des films", async () => {
      const mockMovies = [
        { id: 1, name: "Harry Potterie" },
        { id: 2, name: "La vie secrète de Boba l'éponge" },
      ];
      Movies.findAll.mockResolvedValue(mockMovies);

      // Mock answer

      const res = {
        json: vi.fn(),
        status: vi.fn().mockReturnThis(),
      };
      // Mock objet
      const req = {};

      // testing get all movies

      await getAllMovies(req, res);
      expect(res.json).toHaveBeenCalledWith(mockMovies);
    });
  });
});
