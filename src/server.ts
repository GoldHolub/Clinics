import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { ClinicsController } from './controllers/ClinicsController.js';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './GraphQL/schema.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const clinicsController = new ClinicsController();

app.use(bodyParser.json());
app.get('/clinics', (req, res) => clinicsController.searchClinics(req, res));
app.get('/clinic/:clinicName', (req, res) => clinicsController.findClinicBySlug(req, res));
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true, // Enable GraphiQL UI for testing
}));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});