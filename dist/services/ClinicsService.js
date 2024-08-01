import { ClinicsRepository } from "../repositories/ClinicsRepository.js";
import { ClinicDTO } from "../dto/ClinicDTO.js";
export class ClinicsService {
    clinicsRepository;
    constructor() {
        this.clinicsRepository = new ClinicsRepository();
    }
    async searchClinics(params) {
        const clinics = await this.clinicsRepository.searchClinics(params);
        return clinics.map((clinic) => new ClinicDTO(clinic));
    }
    async findClinicBySlug(clinicSlug) {
        return await this.clinicsRepository.findClinicBySlug(clinicSlug);
    }
}
//# sourceMappingURL=ClinicsService.js.map