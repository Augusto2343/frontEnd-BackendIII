import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes,Route} from "react-router-dom"
import './App.css'
import Navbar from './components/Navbar'
import Inicio from './components/Inicio'
import PetsControl from './components/PetsControl'
import MocksControl from './components/MocksControl'
import UserControl from './components/UserControl'
import PetContextProvider from './components/context/PetsContext'
import UserContextProvider from './components/context/UsersContext'
import MockContextProvider from './components/context/MockingContext'
function App() {
  
  return (
    <>
    <MockContextProvider>
    <UserContextProvider>
    <PetContextProvider>
    <Navbar></Navbar>
      <Routes>
        <Route path={"/"} element={<Inicio/>}></Route>
        <Route path={"/pets"} element={<PetsControl/>}></Route>
        <Route path={"/users"} element={<UserControl/>}></Route>
        <Route path={"/mocks"} element={<MocksControl/>}></Route>
        <Route path={"/*"}></Route>
      </Routes>
      </PetContextProvider>
      </UserContextProvider>
      </MockContextProvider>
    </>
  )
}

export default App
