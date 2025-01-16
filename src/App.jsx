import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Header from "./components/Header";


export default function App() {
  return (

    <AuthProvider>
      <Header />
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </AuthProvider>
  )
}