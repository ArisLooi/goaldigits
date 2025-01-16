import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./app/login/page";
import BudgetsPage from "./app/budgets/page";
import TransactionsPage from "./app/transactions/page";
import ErrorPage from "./app/ErrorPage"
import RegisterPage from "./app/register/page"

export default function App() {
  return (

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
  )
}