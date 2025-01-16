import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Header from "./components/Header";
import LoginPage from "./app/login/page";


export default function App() {
  return (

    <AuthProvider>
      <Header />
      <LoginPage />
    </AuthProvider>
  )
}