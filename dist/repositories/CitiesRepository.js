import { db } from "../drizzle/db.js";
import { eq } from 'drizzle-orm';
import { City } from "../drizzle/schema.js";
export class CityRepository {
    async findCityByName(cityName) {
        try {
            const query = db
                .select()
                .from(City)
                .where(eq(City.cityName, cityName))
                .limit(1);
            const city = await query;
            return city;
        }
        catch (error) {
            throw new Error(`Can't find city in DB by name: ${cityName}`);
        }
    }
}
//# sourceMappingURL=CitiesRepository.js.map