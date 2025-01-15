import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";



export default function App() {
  return (
    <AuthProvider>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </AuthProvider>
  )
}