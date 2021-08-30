import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { CartProvider } from './hooks/useCart';
import { Header } from './components/Header';
import { Routes } from "./routes";
import { GlobalStyle } from "./styles/global";

export function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />
        <Routes />
        <ToastContainer autoClose={3000} />
        <GlobalStyle />
      </CartProvider>
    </BrowserRouter>
  );
}
