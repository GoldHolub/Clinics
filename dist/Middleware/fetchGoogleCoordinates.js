import { db } from '../drizzle/db.js';
import { City, Clinic, Suburb } from '../drizzle/schema.js';
const GOOGLE_API_KEY = 'AIzaSyB-LKr0fSOI3RITm8piaolqnS1hrI788c4';
//AIzaSyB-LKr0fSOI3RITm8piaolqnS1hrI788c4
async function fetchCoordinates(address) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`);
    const data = await response.json();
    if (data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return {
            latitude: location.lat,
            longitude: location.lng,
        };
    }
    return null;
}
async function updateCoordinates() {
    const cities = await db.select().from(City);
    const clinics = await db.select().from(Clinic);
    const suburbs = await db.select().from(Suburb);
    // for (const city of cities) {
    //   const coordinates = await fetchCoordinates(`${city.cityName}, ${city.state}`);
    //   if (coordinates) {
    //     await db.update(City).set(coordinates).where(eq(City.citySlug, city.citySlug));
    //   }
    // }
    // for (const clinic of clinics) {
    //   const coordinates = await fetchCoordinates(clinic.fullAddress!);
    //   if (coordinates) {
    //     await db.update(Clinic).set(coordinates).where(eq(Clinic.slug, clinic.slug));
    //   }
    // }
    // for (const suburb of suburbs) {
    //   const coordinates = await fetchCoordinates(`${suburb.suburbName}, ${suburb.city}, ${suburb.state}`);
    //   if (coordinates) {
    //     await db.update(Suburb).set(coordinates).where(eq(Suburb.suburbSlug, suburb.suburbSlug));
    //   }
    // }
}
updateCoordinates().then(() => {
    console.log('Coordinates updated');
    process.exit(0);
}).catch(error => {
    console.error('Error updating coordinates:', error);
    process.exit(1);
});
//# sourceMappingURL=fetchGoogleCoordinates.js.map