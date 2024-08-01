import { jest } from '@jest/globals';
import { ClinicsRepository } from '../../repositories/ClinicsRepository.js';
import { ClinicsService } from '../../services/ClinicsService.js';
import { ClinicDTO } from '../../dto/ClinicDTO.js';

jest.mock('../../repositories/ClinicsRepository.js');
const mockClinics = [
    {
        longNameVersion: null,
        typeformRegistrationLink: null,
        pms: null,
        metaTitle: null,
        metaDescription: null,
        slug: 'clinic-a',
        website: null,
        clinicName: 'Clinic A',
        displayOnWeb: null,
        linkToClinicSuburbPage: null,
        fullAddress: null,
        city: 'CityA',
        suburb: 'SuburbA',
        state: 'StateA',
        postcode: 'ZipA',
        email: null,
        phone: null,
        nearby1Txt: null,
        nearby1Link: null,
        nearby2Txt: null,
        nearby2Link: null,
        nearby3Txt: null,
        nearby3Link: null,
        nearby4Txt: null,
        nearby4Link: null,
        aboutClinic: null,
        latitude: 0,
        longitude: 0,
    },
    {
        longNameVersion: null,
        typeformRegistrationLink: null,
        pms: null,
        metaTitle: null,
        metaDescription: null,
        slug: 'clinic-b',
        website: null,
        clinicName: 'Clinic B',
        displayOnWeb: null,
        linkToClinicSuburbPage: null,
        fullAddress: null,
        city: 'CityB',
        suburb: 'SuburbB',
        state: 'StateB',
        postcode: 'ZipB',
        email: null,
        phone: null,
        nearby1Txt: null,
        nearby1Link: null,
        nearby2Txt: null,
        nearby2Link: null,
        nearby3Txt: null,
        nearby3Link: null,
        nearby4Txt: null,
        nearby4Link: null,
        aboutClinic: null,
        latitude: 0,
        longitude: 0,
    },
];
describe('ClinicsService', () => {
    let clinicsService: ClinicsService;
    let mockClinicsRepository: jest.Mocked<ClinicsRepository>;

    beforeEach(() => {
        mockClinicsRepository = new ClinicsRepository() as jest.Mocked<ClinicsRepository>;
        clinicsService = new ClinicsService();
        clinicsService['clinicsRepository'] = mockClinicsRepository; // Inject the mock repository
    });

    describe('searchClinics', () => {
        it('should return a list of ClinicDTO objects when valid search parameters are provided', async () => {
            mockClinicsRepository.searchClinics.mockResolvedValue(mockClinics);

            const params = { clinicName: 'Clinic' };
            const result = await clinicsService.searchClinics(params);

            expect(result).toEqual(mockClinics.map(clinic => new ClinicDTO(clinic)));
            expect(mockClinicsRepository.searchClinics).toHaveBeenCalledWith(params);
        });

        it('should handle empty search parameters gracefully', async () => {
            mockClinicsRepository.searchClinics.mockResolvedValue([]);

            const params = {};
            const result = await clinicsService.searchClinics(params);

            expect(result).toEqual([]);
            expect(mockClinicsRepository.searchClinics).toHaveBeenCalledWith(params);
        });
    });

    describe('findClinicByName', () => {
        it('should return the clinic when a valid name is provided', async () => {
            mockClinicsRepository.findClinicBySlug.mockResolvedValue(mockClinics);

            const clinicName = 'Clinic A';
            const result = await clinicsService.findClinicBySlug(clinicName);

            expect(result[0]).toEqual(mockClinics[0]);
            expect(mockClinicsRepository.findClinicBySlug).toHaveBeenCalledWith(clinicName);
        });

        it('should handle case when no clinic is found by name', async () => {
            mockClinicsRepository.findClinicBySlug.mockResolvedValue([]);

            const clinicName = 'Nonexistent Clinic';
            const result = await clinicsService.findClinicBySlug(clinicName);

            expect(result).toEqual([]);
            expect(mockClinicsRepository.findClinicBySlug).toHaveBeenCalledWith(clinicName);
        });
    });
});