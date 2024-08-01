import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList } from 'graphql';
import { db } from "../drizzle/db.js";
import { Clinic, City, Suburb } from "../drizzle/schema.js";
import { ClinicsRepository } from '../repositories/ClinicsRepository.js';
import { SuburbRepository } from '../repositories/SuburbRepository.js';
import { CityRepository } from '../repositories/CitiesRepository.js';
import { ClinicType, CityType, SuburbType } from './types.js';

const clinicsRepository = new ClinicsRepository();
const cityRepository = new CityRepository();
const suburbRepository = new SuburbRepository();

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    clinics: {
      type: new GraphQLList(ClinicType),
      resolve: () => db.select().from(Clinic),
    },
    cities: {
      type: new GraphQLList(CityType),
      resolve: () => db.select().from(City),
    },
    suburbs: {
      type: new GraphQLList(SuburbType),
      resolve: () => db.select().from(Suburb),
    },
    getClinicBySlug: {
      type: new GraphQLList(ClinicType),
      args: { slug: { type: GraphQLString } },
      resolve(parent, args) {
        return clinicsRepository.findClinicBySlug(args.slug);
      }
    },
    searchClinics: {
      type: new GraphQLList(ClinicType),
      args: {
        clinicName: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        zip: { type: GraphQLString },
        suburb: { type: GraphQLString }
      },
      resolve(parent, args) {
        const { clinicName, city, state, zip, suburb } = args;
        return clinicsRepository.searchClinics({ clinicName, city, state, zip, suburb });
      }
    },
    getCityByName: {
      type: new GraphQLList(CityType),
      args: { cityName: { type: GraphQLString } },
      resolve(parent, args) {
        const { cityName } = args;
        return cityRepository.findCityByName(cityName);
      }
    },
    getSuburbByName: {
      type: new GraphQLList(SuburbType),
      args: { suburbName: { type: GraphQLString } },
      resolve(parent, args) {
        const { suburbName } = args;
        return suburbRepository.findSuburbByName(suburbName);
      }
    }
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
});