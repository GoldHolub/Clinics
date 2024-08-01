import { db } from "../drizzle/db.js";
import { eq, like, and, sql } from 'drizzle-orm';
import { City } from "../drizzle/schema.js";
import { CityType } from "../drizzle/DrizzleTypes.js";

export class CityRepository {
    async findCityByName(cityName: string): Promise<CityType[]> {
        try {
            const query = db
                .select()
                .from(City)
                .where(eq(City.cityName, cityName))
                .limit(1);

            const city = await query;
            return city;
        } catch (error) {
            throw new Error(`Can't find city in DB by name: ${cityName}`);
        }
    }
}