import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div>
      <Header/>
      <Hero/>
      <Footer/>
    </div>
  )
}

export default App
