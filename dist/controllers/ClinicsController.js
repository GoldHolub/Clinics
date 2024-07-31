import { ClinicsService } from '../services/ClinicsService.js';
export class ClinicsController {
    clinicsService;
    constructor() {
        this.clinicsService = new ClinicsService();
    }
    async searchClinics(req, res) {
        const { city, state, zip, clinicName, suburb, page } = req.query;
        const searchParams = {
            city: city,
            state: state,
            zip: zip,
            clinicName: clinicName,
            suburb: suburb,
        };
        try {
            const clinics = await this.clinicsService.searchClinics(searchParams);
            res.status(200).json(clinics);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch clinics' });
        }
    }
    async findClinicByName(req, res) {
        const { clinicName } = req.params;
        try {
            const clinic = await this.clinicsService.findClinicByName(clinicName);
            res.status(200).json(clinic);
        }
        catch (error) {
            res.status(500).json({ error: `Failed to find clinic. ${error}` });
        }
    }
}
//# sourceMappingURL=ClinicsController.js.map