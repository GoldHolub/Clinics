import { db } from "../drizzle/db.js";
import { eq, like, and, sql } from 'drizzle-orm/';
import { Clinic } from "../drizzle/schema.js";

interface SearchParams {
    city?: string;
    state?: string;
    zip?: string;
    clinicName?: string;
    suburb?: string;
}

export class ClinicsRepository {
    static ITEMS_PER_PAGE = 4;
    async searchClinics(params: SearchParams, page: number = 1) {
        const { city, state, zip, clinicName, suburb } = params;
        const offset = (page - 1) * ClinicsRepository.ITEMS_PER_PAGE;

        const conditions = [];
        if (city) conditions.push(eq(Clinic.city, city));
        if (state) conditions.push(eq(Clinic.state, state));
        if (zip) conditions.push(eq(Clinic.postcode, zip));
        if (clinicName) conditions.push(like(Clinic.clinicName, `%${clinicName}%`));
        if (suburb) conditions.push(eq(Clinic.suburb, suburb));

        const query = db
            .select()
            .from(Clinic)
            .where(and(...conditions))
            .limit(ClinicsRepository.ITEMS_PER_PAGE)
            .offset(offset);

        const clinics = await query;
        return clinics;
    }
}

