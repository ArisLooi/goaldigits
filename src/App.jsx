import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './context/AuthProvider'
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './app/login/page';
import BudgetsPage from './app/budgets/page';
import TransactionsPage from './app/transactions/page';
import ErrorPage from './app/ErrorPage'
import RegisterPage from './app/register/page'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './store';

export default function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/budgets" element={<BudgetsPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/404" element={<ErrorPage />} />
            <Route path="/*" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
        <Footer />
        <ToastContainer />
      </Provider>
    </AuthProvider>
  )
}