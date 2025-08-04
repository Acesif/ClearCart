import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppContent } from "@/components/auth/AppContent.tsx";

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;
