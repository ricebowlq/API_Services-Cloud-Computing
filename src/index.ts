import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type LatLong {
    latitude: Float
    longitude: Float
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    coordinates: [LatLong]
  }
`;

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

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        coordinates: () => coordinates,
    },
  };

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);