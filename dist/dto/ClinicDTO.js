export class ClinicDTO {
    clinicName;
    fullAddress;
    city;
    website;
    phone;
    latitude;
    longitude;
    constructor(clinic) {
        this.clinicName = clinic.clinicName;
        this.fullAddress = clinic.fullAddress;
        this.website = clinic.website;
        this.phone = clinic.phone;
        this.city = clinic.city;
        this.latitude = clinic.latitude;
        this.longitude = clinic.longitude;
    }
}
//# sourceMappingURL=ClinicDTO.js.map