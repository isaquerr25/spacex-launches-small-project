import { ApolloProvider } from '@apollo/client';
import { apollo } from './infrastructure/apollo';
import { ListRockets } from './components/listRockets';
import './index.css';

export default function App() {
  return (
    <ApolloProvider client={apollo}>
      <div className="App">
        <img
          className="mx-[auto] w-[30rem] my-[2rem]"
          src={'./SpaceX-Logo.svg.png'}
          alt=""
        />
        <div className=" bg-[#36d7b7] h-[2px] rounded-md  mb-[1rem] max-w-[80%] mx-[auto] " />
        <ListRockets />
      </div>
    </ApolloProvider>
  );
}
