// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import gql from "graphql-tag";
// import {

//   ApolloServerPluginLandingPageLocalDefault,

//   ApolloServerPluginLandingPageProductionDefault,

// } from '@apollo/server/plugin/landingPage/default';

import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';


const environment = process.env.NODE_ENV;

export const typeDefs = gql`
  type LatLong {
    latitude: Float
    longitude: Float
  }

  type User {
    id: Int
    name: String
  }

  type Vehicle{
    id: String!
    kind: String
    priority: priority!
    location: String!
    cc: Int
  }

  type Weather{
    Humidity: Float
    TemperatureDegC: Float
    WindSpeedKmph: Int
    SkyCondition: Sky
    Location: String
  }

  type Test{
    Name: String
  }

  enum Sky{
    clear
    cloudy
    rainy
    
  }

  enum priority {
    High
    Medium
    Low
    VIP
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    coordinates: [LatLong]
    vehicles: [Vehicle]
    weather: [Weather]
    users: [User]
    tests: [Test]
  }
`;

const tests = [{"Name": "This is a test"}]

const coordinates = [{"latitude":-6.6111441,"longitude":106.8473377},
{"latitude":35.9704988,"longitude":139.6477598},
{"latitude":7.9414261,"longitude":122.3862362},
{"latitude":58.3986162,"longitude":15.5385144},
{"latitude":15.933333,"longitude":44.066667},
{"latitude":-10.0396,"longitude":120.754},
{"latitude":47.0302849,"longitude":28.7847456},
{"latitude":-7.2331881,"longitude":112.5692082},
{"latitude":16.3762123,"longitude":44.0865232},
{"latitude":-8.5803424,"longitude":116.3654707},
{"latitude":-26.8214685,"longitude":-55.0199394},
{"latitude":36.809895,"longitude":116.428916},
{"latitude":38.1307978,"longitude":140.8423085},
{"latitude":-16.4962793,"longitude":-68.1372784},
{"latitude":38.6002724,"longitude":-9.0119332},
{"latitude":50.5801021,"longitude":-113.8707312},
{"latitude":50.71966,"longitude":16.345569},
{"latitude":40.74,"longitude":-74.17},
{"latitude":36.23154,"longitude":40.77214},
{"latitude":36.0720984,"longitude":49.7013486}]

const users = [{
  "id": 1,
  "name": "Zoé",
  "email": "mbeadon0@psu.edu",
  "password": "KT194wc9b5VEAsCmAm721t7BERBjDpJcwkWM",
  "roles": "Marketing Manager",
  "permissions": ["read:any_user", "read: own_user"]
}, {
  "id": 2,
  "name": "Salomé",
  "email": "dmcmeekan1@mashable.com",
  "password": "KT1PkBuVoEqLfuDYktZgFBqaSU7roDqwuhMt",
  "roles": "Geological Engineer",
  "permissions": ["read: own_user"]
}, {
  "id": 3,
  "name": "Simplifiés",
  "email": "wbrelsford2@ning.com",
  "password": "KT1GfNGNBqAkCBW2DmSkjxeBfmQkGHrGmFx1",
  "roles": "Geologist IV",
  "permissions": null
}]

const vehicle = [{"id":"TW-09-RB-4291","kind":"Bike","cc":1292,"priority":"Medium","location":"16.3762123,44.0865232"},
{"id":"IP-89-QW-3875","kind":"Bike","cc":147,"priority":"VIP","location":"7.9414261,122.3862362"},
{"id":"UJ-94-PZ-3875","kind":"Bike","cc":146,"priority":"High","location":"-6.6111441,106.8473377"},
{"id":"XY-53-XD-6779","kind":"Bike","cc":613,"priority":"High","location":"38.6002724,-9.0119332"},
{"id":"SG-32-BA-8687","kind":"Bike","cc":1116,"priority":"Low","location":"15.933333,44.066667"},
{"id":"MC-88-XW-0429","kind":"Bus","cc":734,"priority":"High","location":"-6.6111441,106.8473377"},
{"id":"CX-13-TG-5911","kind":"Bus","cc":970,"priority":"High","location":"36.809895,116.428916"},
{"id":"VH-54-EF-2443","kind":"Bus","cc":1099,"priority":"High","location":"-7.2331881,112.5692082"},
{"id":"AP-76-YO-5846","kind":"Bike","cc":737,"priority":"Low","location":"36.23154,40.77214"},
{"id":"KZ-07-EF-9204","kind":"Bus","cc":751,"priority":"VIP","location":"-16.4962793,-68.1372784"},
{"id":"BG-44-UX-4538","kind":"Car","cc":978,"priority":"Low","location":"36.0720984,49.7013486"},
{"id":"MW-40-OO-9349","kind":"Car","cc":357,"priority":"High","location":"36.23154,40.77214"},
{"id":"RI-98-PC-8163","kind":"Bike","cc":604,"priority":"Medium","location":"47.0302849,28.7847456"},
{"id":"NO-87-QK-1466","kind":"Car","cc":158,"priority":"Low","location":"15.933333,44.066667"},
{"id":"KO-34-MI-0238","kind":"Bus","cc":885,"priority":"VIP","location":"40.74,-74.17"},
{"id":"GX-66-GQ-0240","kind":"Car","cc":1338,"priority":"VIP","location":"15.933333,44.066667"},
{"id":"GA-99-TA-3033","kind":"Bike","cc":490,"priority":"Low","location":"40.74,-74.17"},
{"id":"VB-14-FN-1778","kind":"Bike","cc":1203,"priority":"Low","location":"15.933333,44.066667"},
{"id":"BZ-23-VU-9641","kind":"Bus","cc":307,"priority":"High","location":"58.3986162,15.5385144"},
{"id":"UA-76-GK-1182","kind":"Bus","cc":1438,"priority":"High","location":"40.74,-74.17"}]

const weather = [{"Humidity":30.52,"TemperatureDegC":29.2,"WindSpeedKmph":8,"SkyCondition":"clear","Location":"36.809895,116.428916"},
{"Humidity":34.94,"TemperatureDegC":-10.2,"WindSpeedKmph":22,"SkyCondition":"cloudy","Location":"15.933333,44.066667"},
{"Humidity":47.92,"TemperatureDegC":-3.2,"WindSpeedKmph":79,"SkyCondition":"rainy","Location":"-10.0396,120.754"},
{"Humidity":39.42,"TemperatureDegC":6.4,"WindSpeedKmph":73,"SkyCondition":"rainy","Location":"15.933333,44.066667"},
{"Humidity":49.22,"TemperatureDegC":-5.7,"WindSpeedKmph":69,"SkyCondition":"rainy","Location":"35.9704988,139.6477598"},
{"Humidity":36.14,"TemperatureDegC":48.5,"WindSpeedKmph":61,"SkyCondition":"rainy","Location":"-8.5803424,116.3654707"},
{"Humidity":32.07,"TemperatureDegC":32.0,"WindSpeedKmph":50,"SkyCondition":"cloudy","Location":"-26.8214685,-55.0199394"},
{"Humidity":40.65,"TemperatureDegC":44.3,"WindSpeedKmph":66,"SkyCondition":"cloudy","Location":"-10.0396,120.754"},
{"Humidity":44.99,"TemperatureDegC":41.6,"WindSpeedKmph":10,"SkyCondition":"rainy","Location":"36.23154,40.77214"},
{"Humidity":42.13,"TemperatureDegC":10.8,"WindSpeedKmph":32,"SkyCondition":"clear","Location":"-26.8214685,-55.0199394"},
{"Humidity":45.55,"TemperatureDegC":22.1,"WindSpeedKmph":76,"SkyCondition":"clear","Location":"50.5801021,-113.8707312"},
{"Humidity":38.32,"TemperatureDegC":20.9,"WindSpeedKmph":72,"SkyCondition":"rainy","Location":"38.1307978,140.8423085"},
{"Humidity":41.55,"TemperatureDegC":-9.4,"WindSpeedKmph":55,"SkyCondition":"clear","Location":"50.71966,16.345569"},
{"Humidity":38.2,"TemperatureDegC":3.3,"WindSpeedKmph":34,"SkyCondition":"clear","Location":"-26.8214685,-55.0199394"},
{"Humidity":44.44,"TemperatureDegC":-5.5,"WindSpeedKmph":76,"SkyCondition":"cloudy","Location":"47.0302849,28.7847456"},
{"Humidity":46.55,"TemperatureDegC":-10.5,"WindSpeedKmph":32,"SkyCondition":"clear","Location":"35.9704988,139.6477598"},
{"Humidity":37.59,"TemperatureDegC":0.6,"WindSpeedKmph":51,"SkyCondition":"rainy","Location":"50.71966,16.345569"},
{"Humidity":38.78,"TemperatureDegC":3.4,"WindSpeedKmph":22,"SkyCondition":"rainy","Location":"-6.6111441,106.8473377"},
{"Humidity":43.61,"TemperatureDegC":49.4,"WindSpeedKmph":29,"SkyCondition":"cloudy","Location":"50.5801021,-113.8707312"},
{"Humidity":41.8,"TemperatureDegC":9.0,"WindSpeedKmph":35,"SkyCondition":"rainy","Location":"38.6002724,-9.0119332"}]

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
export const resolvers = {
    Query: {
        coordinates: () => coordinates,
        vehicles: () => vehicle,
        weather: () => weather,
        tests: () => tests,
        users: () => users
    },
  };




interface MyContext {

  token?: string;

}


const app = express()

// Our httpServer handles incoming requests to our Express app.

// Below, we tell Apollo Server to "drain" this httpServer,

// enabling our servers to shut down gracefully.

const httpServer = http.createServer(app);
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
// Same ApolloServer initialization as before, plus the drain plugin

// for our httpServer.

const server = new ApolloServer<MyContext>({

  typeDefs,

  resolvers,

  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // ApolloServerPluginLandingPageDisabled(),

    // environment === 'production'
    // ? ApolloServerPluginLandingPageProductionDefault()
    // : ApolloServerPluginLandingPageLocalDefault({ embed: false }),
  ],

});

await server.start();

// Set up our Express middleware to handle CORS, body parsing,

// and our expressMiddleware function.

app.use(

  '/',

  cors<cors.CorsRequest>(),

  bodyParser.json(),

  // expressMiddleware accepts the same arguments:

  // an Apollo Server instance and optional configuration options

  expressMiddleware(server, {

    context: async ({ req }) => ({ token: req.headers.token }),

  }),

);



  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
// Modified server startup

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000/`);