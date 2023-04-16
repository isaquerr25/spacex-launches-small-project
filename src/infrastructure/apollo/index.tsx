import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apollo = new ApolloClient({
  uri: "https://spacex-production.up.railway.app/",
  cache: new InMemoryCache()
});
