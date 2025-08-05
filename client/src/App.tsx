import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Home } from "@/pages/Home.tsx";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {Toaster} from "sonner";

function App() {

    const client = new ApolloClient({
        uri: 'http://localhost:8080/api',
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Home />
                <Toaster />
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
