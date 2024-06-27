import type { NextPage } from "next";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as ToasterSonner } from "@/components/ui/sonner";
import Event from "components/Event";
import { ApolloProvider, useQuery } from '@apollo/client';
import { GET_BETS } from '../../graphql/queries';
import client from '../../lib/apolloClient';
const Home: NextPage = () => {
  const { loading, error, data } = useQuery(GET_BETS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log("@@@data=", data)
  // TODO: 

  return (
    <div className="flex flex-col">
      <div className="flex flex-grow justify-center mt-8">
        <Event />
      </div>
      <Toaster />
      <ToasterSonner position="bottom-right" />
    </div>
  );
};

export default Home;
