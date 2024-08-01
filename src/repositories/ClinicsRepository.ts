import { db } from "../drizzle/db.js";
import { eq, like, and } from 'drizzle-orm';
import { Clinic } from "../drizzle/schema.js";
import { ClinicType } from "../drizzle/DrizzleTypes.js";

export interface SearchParams {
    city?: string;
    state?: string;
    zip?: string;
    clinicName?: string;
    suburb?: string;
}

export class ClinicsRepository {
    static ITEMS_PER_PAGE = 4;
    async searchClinics(params: SearchParams): Promise<ClinicType[]> {
        try {
            const { city, state, zip, clinicName, suburb } = params;

            const conditions = [];
            if (city) conditions.push(eq(Clinic.city, city));
            if (state) conditions.push(eq(Clinic.state, state));
            if (zip) conditions.push(eq(Clinic.postcode, zip));
            if (clinicName) conditions.push(like(Clinic.clinicName, `%${clinicName}%`));
            if (suburb) conditions.push(eq(Clinic.suburb, suburb));

            const query = db
                .select()
                .from(Clinic)
                .where(and(...conditions));

            const clinics = await query;
            return clinics;
        } catch (error) {
            throw new Error(`Can't find clinics in DB by params: ${params}`);
        }
    }

    async findClinicBySlug(clinicSlug: string): Promise<ClinicType[]> {
        try {
            const query = db
                .select()
                .from(Clinic)
                .where(eq(Clinic.slug, clinicSlug))
                .limit(1);

            const clinic = await query;
            return clinic;
        } catch (error) {
            throw new Error(`Can't find clinic in DB by name: ${clinicSlug}`);
        }
    }
}

