import { Request, Response } from 'express';
import { ClinicsService } from '../services/ClinicsService.js';

export class ClinicsController {
  private clinicsService: ClinicsService;

  constructor() {
    this.clinicsService = new ClinicsService();
  }

  async searchClinics(req: Request, res: Response) {
    const { city, state, zip, clinicName, suburb, page } = req.query;
    const searchParams = {
      city: city as string,
      state: state as string,
      zip: zip as string,
      clinicName: clinicName as string,
      suburb: suburb as string,
    };
    try {
      const clinics = await this.clinicsService.searchClinics(searchParams);
      res.status(200).json(clinics);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch clinics' });
    }
  }

  async findClinicBySlug(req: Request, res: Response) {
    const { slug } = req.params;
    try {
      const clinic = await this.clinicsService.findClinicBySlug(slug as string);
      res.status(200).json(clinic);
    } catch(error) {
      res.status(500).json({ error: `Failed to find clinic. ${error}` });
    }
  }
}
