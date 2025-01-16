import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./app/login/page";
import BudgetsPage from "./app/budgets/page";
import TransactionsPage from "./app/transactions/page";

export default function App() {
  return (

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/budgets" element={<BudgetsPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}