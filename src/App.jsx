import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Product from "./pages/Product/Product";
import Pricing from "./pages/Pricing/Pricing";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import AppLayout from "./pages/AppLayout/AppLayout";
import CityList from "./components/CityList/CityList";
import City from "./components/City/City";
import CountryList from "./components/CountryList/CountryList";
import Form from "./components/Form/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
    return (
        <>
            <AuthProvider>
                <CitiesProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route index element={<Homepage />} />
                            <Route path="product" element={<Product />} />
                            <Route path="pricing" element={<Pricing />} />
                            <Route
                                path="app"
                                element={
                                    <ProtectedRoute>
                                        <AppLayout />
                                    </ProtectedRoute>
                                }
                            >
                                <Route
                                    index
                                    element={<Navigate replace to="cities" />}
                                />
                                <Route path="cities" element={<CityList />} />
                                <Route path="cities/:id" element={<City />} />
                                <Route
                                    path="countries"
                                    element={<CountryList />}
                                />
                                <Route path="form" element={<Form />} />
                            </Route>
                            <Route path="login" element={<Login />} />
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </BrowserRouter>
                </CitiesProvider>
            </AuthProvider>
        </>
    );
}

export default App;
