import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import LoginPage from './components/login/login';
import RegisterPage from './components/login/register';
import About from './components/home/about/about';
import Reviews from './components/home/reviews/reviews';
import Pavlo from './components/home/pavlo/pavlo';
import Catalog from './components/catalog/catalogPage';
import ItemPage from './components/catalog/itemPage/ItemPage';
import Cart from './components/cart/cartPage';
import CheckoutPage from './components/formik/CheckoutPage';
import SuccessPage from './components/formik/SuccessPage';
import DescriptionPage from './components/description/description';
import { ItemsProvider } from './context/itemscontext';
import { PrivateRoute } from './route/private';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <ItemsProvider>
            <Router>
                <Routes>
                    {/* Публічні маршрути */}
                    <Route
                        path="/login"
                        element={
                            <>
                                <LoginPage />
                            </>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <>
                                <RegisterPage />
                            </>
                        }
                    />

                    {/* Приватні маршрути */}
                    <Route
                        path="/"
                        element={
                            <PrivateRoute
                                component={
                                    <>
                                        <Header isAuthenticated={isAuthenticated} logout={logout} />
                                        <About />
                                        <Pavlo />
                                        <Reviews />
                                        <Footer />
                                    </>
                                }
                            />
                        }
                    />
                    <Route
                        path="/services"
                        element={
                            <PrivateRoute
                                component={
                                    <>
                                        <Header isAuthenticated={isAuthenticated} logout={logout} />
                                        <Catalog />
                                        <Footer />
                                    </>
                                }
                            />
                        }
                    />
                    <Route
                        path="/item/:id"
                        element={
                            <PrivateRoute
                                component={
                                    <>
                                        <Header isAuthenticated={isAuthenticated} logout={logout} />
                                        <ItemPage />
                                        <Footer />
                                    </>
                                }
                            />
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <PrivateRoute
                                component={
                                    <>
                                        <Header isAuthenticated={isAuthenticated} logout={logout} />
                                        <Cart />
                                        <Footer />
                                    </>
                                }
                            />
                        }
                    />
                    <Route
                        path="/description"
                        element={
                            <PrivateRoute
                                component={
                                    <>
                                        <Header isAuthenticated={isAuthenticated} logout={logout} />
                                        <DescriptionPage />
                                        <Footer />
                                    </>
                                }
                            />
                        }
                    />
                    <Route
                        path="/checkout"
                        element={
                            <PrivateRoute
                                component={
                                    <>
                                        <Header isAuthenticated={isAuthenticated} logout={logout} />
                                        <CheckoutPage />
                                        <Footer />
                                    </>
                                }
                            />
                        }
                    />
                    <Route
                        path="/success"
                        element={
                            <PrivateRoute
                                component={
                                    <>
                                        <Header isAuthenticated={isAuthenticated} logout={logout} />
                                        <SuccessPage />
                                        <Footer />
                                    </>
                                }
                            />
                        }
                    />
                </Routes>
            </Router>
        </ItemsProvider>
    );
}

export default App;
