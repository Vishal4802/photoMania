import { FC, useRef, useState } from 'react';
import './App.css';
import Result from './pages/result/result';
import Home from './pages/home/home';
import Navbar from './NavBar/Navbar';

const App: FC = () => {

  const [gotData, setGotData] = useState<boolean>(false)
  const search = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>('')

  return (
    <>
      <Navbar search={search} setSearchValue={setSearchValue} gotData={gotData} setGotData = {setGotData}/>
      {gotData ? <Result searchValue={searchValue}/> : <Home />}
    </>
  );
};

export default App;
