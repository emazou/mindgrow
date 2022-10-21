import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/header.css';
import Home from './pages/Home';
import WhyMindGrowPage from './pages/WhyMindGrowPage'
import NotFound from './pages/NotFound';
import WebsiteLayout from './layouts/WebsiteLayout'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp'
import ProductsPage from './pages/ProductsPage';
import DetailsPage from './pages/DetailsPage';
import { useDispatch, useSelector } from 'react-redux';
import { useSignInTokenMutation } from './features/userAPI'
import { setUser } from './features/loggedSlice';
import BlogDetails from './pages/BlogDetails'
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage'
import PaymentSuccess from './pages/PaymentSuccess'
import ScrollToTop from './components/ScrollToTop';
import AdminPage from './pages/AdminPage';



function App() {
  const cart = useSelector(state => state.cart.productsCart)
  const user = useSelector((state) => state.logged.user);
  const admin = user?.role === 'admin';
  const [signInToken] = useSignInTokenMutation();
  const dispatch = useDispatch()
  async function verifyToken() {
    try {
      let res = await signInToken(localStorage.getItem('token'));
      if (res.data?.success) {
        localStorage.setItem('token', res.data.response.token)
        dispatch(setUser(res.data?.response.user));
      } else {
        console.log(res)
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem('token');
    }
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      verifyToken();
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <WebsiteLayout>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/whymindgrow' element={<WhyMindGrowPage />} />
          <Route path='/signin' element={!user ? <SignIn /> : <Home />} />
          <Route path='/signup' element={!user ? <SignUp /> : <Home />} />
          <Route path='/products/:id' element={<DetailsPage />} />
          <Route path='/blog/:id' element={<BlogDetails />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/profile/:id' element={<ProfilePage />} />
          <Route path='/*' element={<NotFound />} />
          <Route path='/adminpanel' element={admin ? <AdminPage /> : <NotFound />} />
          <Route path='/payment-success' element={<PaymentSuccess />} />
        </Routes>
      </WebsiteLayout>
    </BrowserRouter>
  );
}

export default App;
