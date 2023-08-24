import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Screen/Home';
import Result from './Screen/Result/Result';
// import { useEffect, useState } from 'react';

function App() {
  // const [counter, setcounter] = useState(0)

  // useEffect(() => {
  //   let timeout
  //   console.log(timeout)

  //   return () => {
  //     timeout = setTimeout(() => {
  //       setcounter(counter + 1)
  //     }, 1000);
  //     clearTimeout(timeout)
  //     console.log(timeout)
  //   }

  // }, [counter])


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/result/:id' element={<Result />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
