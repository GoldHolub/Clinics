import { db } from "../drizzle/db.js";
import { eq } from 'drizzle-orm';
import { Suburb } from "../drizzle/schema.js";
export class SuburbRepository {
    async findClinicByName(suburbName) {
        try {
            const query = db
                .select()
                .from(Suburb)
                .where(eq(Suburb.suburbName, suburbName))
                .limit(1);
            const suburb = await query;
            return suburb;
        }
        catch (error) {
            throw new Error(`Can't find suburb in DB by name: ${suburbName}`);
        }
    }
}
//# sourceMappingURL=SuburbRepository.js.map