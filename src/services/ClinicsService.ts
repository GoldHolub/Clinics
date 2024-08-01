import { ClinicsRepository } from "../repositories/ClinicsRepository.js";
import { SearchParams } from "../repositories/ClinicsRepository.js";
import { ClinicDTO } from "../dto/ClinicDTO.js";
export class ClinicsService {
    private clinicsRepository: ClinicsRepository;
    
    constructor() {
        this.clinicsRepository = new ClinicsRepository();
    }
    async searchClinics(params: SearchParams) {
        const clinics = await this.clinicsRepository.searchClinics(params);
        return clinics.map((clinic) => new ClinicDTO(clinic));
    }

    async findClinicBySlug(clinicSlug: string) {
        return await this.clinicsRepository.findClinicBySlug(clinicSlug);
    }
}