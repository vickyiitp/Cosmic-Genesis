export interface CelestialBody {
  name: string;
  description: string;
}

export interface CosmicData {
  stars: CelestialBody[];
  galaxies: CelestialBody[];
  planets: CelestialBody[];
  constellations: CelestialBody[];
}
