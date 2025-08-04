import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppContent } from "@/components/auth/AppContent.tsx";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

function App() {

    const client = new ApolloClient({
        uri: 'http://localhost:8080/api',
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
