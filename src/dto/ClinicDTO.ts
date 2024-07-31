import { ClinicType } from "../drizzle/DrizzleTypes.js";
export class ClinicDTO {
    clinicName: string;
    fullAddress: string;
    city: string;
    website: string;
    phone: string;
    latitude: number;
    longitude: number;

    constructor(clinic: ClinicType) {
        this.clinicName = clinic.clinicName!;
        this.fullAddress = clinic.fullAddress!;
        this.website = clinic.website!;
        this.phone = clinic.phone!;
        this.city = clinic.city!;
        this.latitude = clinic.latitude!;
        this.longitude = clinic.longitude!;
    }
} 