

import './App.css'
import Homepage from './pages/Homepage';
import SignUp from './pages/SignUp';
import SignUp2 from './pages/SignUp2';
import SignIn from './pages/SignIn';
import Settings from './pages/Settings';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup2" element={<SignUp2 />} />
          <Route path='/settings' element={<Settings />} />

          <Route path="*" element={
            <div className='w-full h-screen flex justify-center items-center'>
            <h1 className='text-6xl md:text-7xl lg:text-8xl font-bold text-[#000000]'>404</h1> </div>} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
