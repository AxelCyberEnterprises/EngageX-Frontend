import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import AppRoutes from "./components/AppRoutes";
import ProfileLoader from "./components/profileLoader/ProfileLoader";
import "./styles/index.scss";
import { ThemeProvider } from "./context/ThemeContext";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            retry: 0,
            staleTime: 60 * 1000,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        },
        mutations: {
            retry: 0,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <ProfileLoader />
                <AppRoutes />
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
