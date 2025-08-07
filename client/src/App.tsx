import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Home } from "@/pages/Home.tsx";
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    HttpLink,
    from
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { Toaster } from "sonner";
import {getToken} from "@/lib/token.ts";
import {ProductProvider} from "@/components/context/ProductContext.tsx";

function App() {
    const httpLink = new HttpLink({
        uri: 'http://localhost:8080/api',
    });

    const authLink = setContext((_, { headers }) => {
        const token = getToken();
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            },
        };
    });

    const client = new ApolloClient({
        link: from([authLink, httpLink]),
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <ProductProvider>
                    <Home />
                    <Toaster />
                </ProductProvider>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
