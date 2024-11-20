import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import About from './components/home/about/about';
import Reviews from './components/home/reviews/reviews';
import Pavlo from './components/home/pavlo/pavlo';
import Footer from './components/footer/footer';
import Catalog from './components/catalog/catalogPage';
import ItemPage from './components/catalog/itemPage/ItemPage';
import { ItemsProvider } from './context/itemscontext';
import Cart from "./components/cart/cartPage";
import CheckoutPage from './components/formik/CheckoutPage';
import SuccessPage from './components/formik/SuccessPage';

function App() {
    return (
        <ItemsProvider>
            <Router>
                <Header />

                <Routes>
                    <Route path="/" element={
                        <>
                            <About />
                            <Pavlo />
                            <Reviews />
                        </>
                    } />
                    <Route path="/services" element={<Catalog />} />
                    <Route path="/item/:id" element={<ItemPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/success" element={<SuccessPage />} />
                </Routes>

                <Footer />
            </Router>
        </ItemsProvider>
    );
}

export default App;