import { GoogleGenAI, Type } from "@google/genai";
import { CelestialBody } from '../types';

// For development, we'll use fallback data
// In production, you would set up proper API key handling
let ai: GoogleGenAI | null = null;
try {
    // Only initialize if API key is available
    const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
    if (apiKey) {
        ai = new GoogleGenAI({ apiKey });
    }
} catch (error) {
    console.log('Gemini API not configured, using fallback data');
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

const responseSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            name: {
                type: Type.STRING,
                description: "The name of the celestial body or concept."
            },
            description: {
                type: Type.STRING,
                description: "A short, captivating description (2-3 sentences max)."
            }
        },
        required: ["name", "description"]
    }
};

export const fetchCosmicContent = async (topic: 'stars' | 'galaxies' | 'planets' | 'constellations'): Promise<CelestialBody[]> => {
    const cacheKey = `cosmic_genesis_cache_${topic}`;

    // 1. Check for valid cached data
    try {
        const cachedItemJSON = localStorage.getItem(cacheKey);
        if (cachedItemJSON) {
            const cachedItem = JSON.parse(cachedItemJSON);
            if (cachedItem.expiry > Date.now()) {
                console.log(`Serving '${topic}' data from cache.`);
                return cachedItem.data as CelestialBody[];
            } else {
                console.log(`Cache expired for '${topic}'.`);
                localStorage.removeItem(cacheKey); // Clean up expired cache
            }
        }
    } catch (e) {
        console.error(`Error reading from localStorage for key ${cacheKey}:`, e);
        // In case of parsing error, remove the corrupted item
        localStorage.removeItem(cacheKey);
    }
    
    // 2. For now, use fallback data (can be enhanced with API later)
    console.log(`Using fallback data for '${topic}'.`);
    const data = getFallbackData(topic);
    
    // Cache the fallback data
    try {
        const itemToCache = {
            data,
            expiry: Date.now() + CACHE_DURATION
        };
        localStorage.setItem(cacheKey, JSON.stringify(itemToCache));
    } catch (e) {
        console.error(`Error writing to localStorage for key ${cacheKey}:`, e);
    }
    
    return data;

    /* Commented out API code - can be re-enabled when API key is configured
    // 2. If no valid cache, fetch from API
    try {
        if (!ai) {
            console.log('API not configured, using fallback data');
            return getFallbackData(topic);
        }
        
        console.log(`Fetching '${topic}' data from Gemini API.`);
        const prompt = topic === 'constellations' 
            ? `Generate a list of 16 well-known constellations. For each, provide a short, captivating description of its mythological origin or significance.`
            : `Generate a list of 16 fascinating and visually distinct types of ${topic}. For each, provide a short, captivating, and awe-inspiring description suitable for a space discovery website.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.8
            }
        });

        const jsonText = response.text.trim();
        const data = JSON.parse(jsonText);

        if (Array.isArray(data) && data.length > 0) {
            // 3. Cache the new data
            try {
                const itemToCache = {
                    data,
                    expiry: Date.now() + CACHE_DURATION
                };
                localStorage.setItem(cacheKey, JSON.stringify(itemToCache));
            } catch (e) {
                console.error(`Error writing to localStorage for key ${cacheKey}:`, e);
            }
            return data as CelestialBody[];
        }
        
        console.warn(`Gemini API returned empty or invalid data for ${topic}, using fallback.`);
        return getFallbackData(topic);

    } catch (error) {
        console.error(`Error fetching content for ${topic}:`, error);
        // 4. On API error, return fallback data (do not cache this)
        return getFallbackData(topic);
    }
    */
};

const getFallbackData = (topic: 'stars' | 'galaxies' | 'planets' | 'constellations'): CelestialBody[] => {
    const fallback = {
        stars: [
            { name: "Protostar", description: "A young star gathering mass from its parent molecular cloud. A stellar nursery where gravity ignites the first fusion reactions." },
            { name: "Red Giant", description: "An aging star that has exhausted its core hydrogen fuel, swelling to immense sizes and glowing with a cool, reddish hue." },
            { name: "White Dwarf", description: "The dense, hot remnant of a low-mass star's core after it has shed its outer layers. A stellar ghost, slowly fading into darkness." },
            { name: "Neutron Star", description: "An incredibly dense object from a supernova's collapsed core. A city-sized star with the mass of the sun, spinning at incredible speeds." },
            { name: "Supernova", description: "A cataclysmic explosion of a massive star, briefly outshining entire galaxies and forging the heavy elements necessary for life." },
            { name: "Black Hole", description: "A region of spacetime where gravity is so strong that nothing, no particles or even electromagnetic radiation such as light, can escape from it." },
            { name: "Pulsar", description: "A highly magnetized rotating neutron star that emits beams of electromagnetic radiation out of its magnetic poles." },
            { name: "Magnetar", description: "A type of neutron star with an extremely powerful magnetic field, which powers the emission of high-energy electromagnetic radiation." },
            { name: "Blue Supergiant", description: "One of the hottest, brightest, and most massive stars known. They live fast and die young, often in spectacular supernova explosions." },
            { name: "Wolf-Rayet Star", description: "Massive, evolved stars that have lost their outer hydrogen envelope, revealing a searingly hot core and creating powerful stellar winds." },
            { name: "T Tauri Star", description: "A very young, pre-main-sequence star that is still contracting. They are variable and have very strong stellar winds." },
            { name: "Brown Dwarf", description: "A 'failed star' that lacks the mass to sustain nuclear fusion of hydrogen in its core. They occupy the boundary between giant planets and stars." },
            { name: "Red Dwarf", description: "The smallest and coolest kind of star on the main sequence. They are by far the most common type of star in the Milky Way." },
            { name: "Variable Star", description: "A star whose brightness as seen from Earth fluctuates. This variation may be caused by a change in emitted light or by something partly blocking the light." },
            { name: "Binary Star System", description: "A system of two stars in which one star revolves around the other or both revolve around a common center of mass." },
            { name: "Type Ia Supernova", description: "Occurs in a binary system where a white dwarf accretes matter from its companion, eventually triggering a runaway nuclear fusion reaction." },
            { name: "Planetary Nebula", description: "The glowing, expanding shell of gas ejected from a dying Red Giant star. A beautiful, fleeting final act before the core becomes a White Dwarf." },
            { name: "Cepheid Variable", description: "A type of star that pulsates radially, varying in brightness with a well-defined, stable period. They are crucial 'standard candles' for measuring cosmic distances." },
            { name: "O-type Star", description: "The hottest, most massive, and most luminous type of star. Their intense ultraviolet light energizes entire nebulae, but their lives are incredibly short." },
            { name: "Herbig-Haro Object", description: "Small patches of nebulosity associated with newborn stars, formed when jets of gas ejected by the star collide with nearby clouds of gas and dust at high speed." }
        ],
        galaxies: [
            { name: "Spiral Galaxy", description: "Characterized by majestic, swirling arms of stars, gas, and dust. Our own Milky Way is a prime example of this beautiful cosmic structure." },
            { name: "Elliptical Galaxy", description: "A smooth, featureless halo of older stars. These cosmic giants are thought to form from the titanic collisions of other galaxies." },
            { name: "Irregular Galaxy", description: "A galaxy without a distinct regular shape. Often chaotic in appearance, they are rich in gas and dust, with furious bursts of star formation." },
            { name: "Barred Spiral", description: "A spiral galaxy with a central bar-shaped structure of stars. This stellar bar funnels gas inwards, fueling star birth and feeding a central black hole." },
            { name: "Quasar", description: "An extremely luminous active galactic nucleus, powered by a supermassive black hole consuming vast amounts of matter. The brightest beacons in the universe." },
            { name: "Lenticular Galaxy", description: "An intermediate form between an elliptical and a spiral galaxy, featuring a disk but no prominent spiral arms." },
            { name: "Ring Galaxy", description: "A galaxy with a circle-like appearance, where stars and gas are concentrated in a ring. Formed by galactic collisions." },
            { name: "Seyfert Galaxy", description: "A type of active galaxy with a quasar-like nucleus but with the host galaxy clearly detectable." },
            { name: "Starburst Galaxy", description: "A galaxy undergoing an exceptionally high rate of star formation, compared to the long-term average rate of star formation in the galaxy." },
            { name: "Dwarf Galaxy", description: "A small galaxy composed of up to several billion stars, a small number compared to our own Milky Way's 200–400 billion." },
            { name: "Tadpole Galaxy", description: "A distorted spiral galaxy that has undergone a near-collision, resulting in a long, spectacular tail of stars and gas." },
            { name: "Hoag's Object", description: "A rare and peculiar ring galaxy featuring a nearly perfect ring of young, hot blue stars circling an older, yellow nucleus." },
            { name: "Sombrero Galaxy", description: "An unbarred spiral galaxy with a brilliant white core encircled by a thick, dark lane of cosmic dust, resembling a sombrero." },
            { name: "Cartwheel Galaxy", description: "A lenticular and ring galaxy about 500 million light-years away. Its appearance is the result of a high-speed collision with a smaller galaxy." },
            { name: "Cosmic Web", description: "The vast, filamentary structure of galaxies, gas, and dark matter that spans the entire universe, connecting galactic superclusters." },
            { name: "Active Galactic Nucleus", description: "A compact region at the center of a galaxy that has a much higher than normal luminosity over some portion of the electromagnetic spectrum." },
            { name: "Andromeda Galaxy", description: "The nearest major spiral galaxy to the Milky Way. It's on a collision course with our own galaxy, destined to merge in about 4.5 billion years." },
            { name: "Triangulum Galaxy", description: "The third-largest member of the Local Group of galaxies. A beautiful spiral known for its bright pink star-forming regions." },
            { name: "Centaurus A", description: "A peculiar galaxy notable for its spectacular dust lane across the middle and a supermassive black hole at its core spewing out relativistic jets." },
            { name: "Ultra Diffuse Galaxy", description: "A galaxy with an extremely low luminosity, the same size as the Milky Way but with a star count about 1,000 times lower. Ghostly islands in the cosmic sea." }
        ],
        planets: [
            { name: "Gas Giant", description: "A massive planet composed primarily of hydrogen and helium. Lacking a solid surface, they host turbulent atmospheres and storms larger than Earth." },
            { name: "Terrestrial Planet", description: "A rocky planet with a solid surface, like Earth. These worlds are prime candidates for finding life beyond our solar system." },
            { name: "Exoplanet", description: "A planet that orbits a star outside our solar system. Thousands have been found, ranging from scorching hot Jupiters to potentially habitable 'super-Earths'." },
            { name: "Ice Giant", description: "A planet like Uranus or Neptune, with a thick atmosphere and a core of rock, ice, and fluid 'ices' of water, ammonia, and methane." },
            { name: "Rogue Planet", description: "A planetary-mass object that does not orbit a star. These lonely wanderers drift through the vast, cold emptiness of interstellar space." },
            { name: "Super-Earth", description: "An extrasolar planet with a mass higher than Earth's, but substantially below those of the Solar System's ice giants." },
            { name: "Hot Jupiter", description: "A class of gas giant exoplanets that are inferred to be physically similar to Jupiter but that have very short orbital periods." },
            { name: "Protoplanet", description: "A large planetary embryo that originated within a protoplanetary disk and has undergone internal melting to produce a differentiated interior." },
            { name: "Ocean Planet", description: "A hypothetical type of planet whose surface is entirely covered by a deep ocean of water, with potentially unique forms of life in its depths." },
            { name: "Carbon Planet", description: "A terrestrial planet with more carbon than oxygen. These worlds could have landscapes of graphite and diamond instead of silicate rock." },
            { name: "Chthonian Planet", description: "The remnant core of a gas giant that has had its atmosphere stripped away by orbiting too close to its star. A scorched, dead world." },
            { name: "Pulsar Planet", description: "A planet orbiting a rapidly rotating neutron star, or pulsar. These worlds endure intense radiation, making them unlikely candidates for life." },
            { name: "Gas Dwarf", description: "A low-mass planet with a rocky core and a very thick envelope of hydrogen and helium, smaller than a gas giant." },
            { name: "Tidally Locked Planet", description: "A planet that always presents the same face to its star, resulting in one side of perpetual day and extreme heat, and the other of eternal night and cold." },
            { name: "Circumbinary Planet", description: "A planet that orbits two stars instead of one. These 'Tatooine' worlds would experience spectacular double sunrises and sunsets." },
            { name: "Lava Planet", description: "A terrestrial planet with a surface mostly or entirely covered by molten lava. They orbit so close to their star that their rocky surfaces are constantly molten." },
            { name: "Mini-Neptune", description: "A planet smaller than Neptune but larger than Earth, likely with a thick atmosphere of hydrogen and helium over a core of rock and ice. Common in our galaxy." },
            { name: "Iron Planet", description: "A hypothetical type of planet that consists primarily of an iron-rich core with little or no mantle. A world of incredible density and gravity." },
            { name: "Puffy Planet", description: "A gas giant with a large radius and very low density, sometimes called a 'hot Saturn'. Their atmospheres are puffed up by intense heat from their host star." },
            { name: "Helium Planet", description: "A theoretical planet that may form from a low-mass white dwarf that loses mass to a companion star, leaving a core of helium." }
        ],
        constellations: [
            { name: "Orion", description: "The Hunter, easily recognizable by the three bright stars of Orion's Belt. Home to the spectacular Orion Nebula." },
            { name: "Ursa Major", description: "The Great Bear, containing the famous Big Dipper asterism, used by navigators for centuries to find the North Star." },
            { name: "Scorpius", description: "The Scorpion, a zodiac constellation with the bright red supergiant Antares at its heart, representing the scorpion's fiery sting." },
            { name: "Cassiopeia", description: "The Queen, a W-shaped constellation representing a vain queen chained to her throne in the heavens." },
            { name: "Cygnus", description: "The Swan, flying down the Milky Way. Its brightest star, Deneb, is one of the vertices of the Summer Triangle." },
            { name: "Lyra", description: "The Lyre, a small constellation featuring Vega, one of the brightest stars in the night sky, and the beautiful Ring Nebula." },
            { name: "Leo", description: "The Lion, another zodiac constellation, which looks like a crouching lion with a distinctive sickle-shaped group of stars for its head." },
            { name: "Andromeda", description: "The Chained Maiden, famous for containing the Andromeda Galaxy, the most distant object visible to the naked eye." },
            { name: "Aquila", description: "The Eagle, representing the bird that carried Zeus's thunderbolts. Its brightest star is Altair." },
            { name: "Sagittarius", description: "The Archer, depicted as a centaur. The center of the Milky Way lies in the direction of this constellation." },
            { name: "Taurus", description: "The Bull, a prominent constellation known for the bright star Aldebaran and the Pleiades star cluster." },
            { name: "Pegasus", description: "The Winged Horse from Greek mythology. It's easily found by the Great Square of Pegasus asterism." },
            { name: "Canis Major", description: "The Great Dog, which follows Orion the Hunter. It contains Sirius, the brightest star in the night sky." },
            { name: "Virgo", description: "The Maiden, the largest constellation of the zodiac, often associated with fertility and agriculture." },
            { name: "Gemini", description: "The Twins, represented by the bright stars Castor and Pollux, who were brothers in Greek mythology." },
            { name: "Draco", description: "The Dragon, a long, winding constellation that snakes its way around the north celestial pole." },
            { name: "Crux", description: "The Southern Cross, a small but prominent constellation essential for navigation in the Southern Hemisphere as it points towards the south celestial pole." },
            { name: "Carina", description: "The Keel of the mythical ship Argo Navis. Home to Canopus, the second-brightest star, and the spectacular Carina Nebula." },
            { name: "Centaurus", description: "A large, bright southern constellation representing a centaur. It contains Alpha Centauri, the closest star system to our Sun." },
            { name: "Pleiades", description: "The Seven Sisters, an open star cluster often mistaken for a constellation. A beautiful, dusty grouping of young, hot blue stars, visible to the naked eye." }
        ]
    };
    return fallback[topic];
};