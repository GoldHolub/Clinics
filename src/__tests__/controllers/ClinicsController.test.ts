import request from 'supertest';
import express from 'express';
import { ClinicsController } from '../../controllers/ClinicsController.js';
import { ClinicsService } from '../../services/ClinicsService.js';

jest.mock('../../services/ClinicsService.js');

const app = express();
app.use(express.json());

const clinicsController = new ClinicsController();
app.get('/clinics/search', (req, res) => clinicsController.searchClinics(req, res));
app.get('/clinics/:clinicName', (req, res) => clinicsController.findClinicByName(req, res));

describe('ClinicsController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('searchClinics', () => {
    it('should return 200 and a list of clinics for valid search parameters', async () => {
      const mockClinics = [
        { id: 1, clinicName: 'Clinic A' },
        { id: 2, clinicName: 'Clinic B' },
      ];

      (ClinicsService.prototype.searchClinics as jest.Mock).mockResolvedValue(mockClinics);

      const res = await request(app).get('/clinics/search').query({ clinicName: 'Clinic' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockClinics);
      expect(ClinicsService.prototype.searchClinics).toHaveBeenCalledWith({ clinicName: 'Clinic', city: undefined, state: undefined, zip: undefined, suburb: undefined });
    });

    it('should return 500 if the search fails', async () => {
      (ClinicsService.prototype.searchClinics as jest.Mock).mockRejectedValue(new Error('Failed to fetch clinics'));

      const res = await request(app).get('/clinics/search').query({ clinicName: 'Clinic' });

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Failed to fetch clinics' });
    });
  });

  describe('findClinicByName', () => {
    it('should return 200 and the clinic for a valid name', async () => {
      const mockClinic = { id: 1, clinicName: 'Clinic A' };

      (ClinicsService.prototype.findClinicByName as jest.Mock).mockResolvedValue(mockClinic);

      const res = await request(app).get('/clinics/Clinic A');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockClinic);
      expect(ClinicsService.prototype.findClinicByName).toHaveBeenCalledWith('Clinic A');
    });

    it('should return 500 if finding the clinic fails', async () => {
      (ClinicsService.prototype.findClinicByName as jest.Mock).mockRejectedValue(new Error('Failed to find clinic'));

      const res = await request(app).get('/clinics/Clinic A');

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Failed to find clinic. Error: Failed to find clinic' });
    });
  });
});
