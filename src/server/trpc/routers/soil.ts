import { fetchVegetation } from "@/lib/satellite/agro";
import { fetchFires } from "@/lib/satellite/firms";
import { fetchSoilProfile } from "@/lib/satellite/open-meteo";
import { Coordinates } from "@/types/dto/coordinates";
import { publicProcedure, router } from "../trpc";

export const soilRouter = router({
  moisture: publicProcedure.input(Coordinates).query(({ input }) => fetchSoilProfile(input)),
  vegetation: publicProcedure.input(Coordinates).query(({ input }) => fetchVegetation(input)),
  fires: publicProcedure.input(Coordinates).query(({ input }) => fetchFires(input)),
});
