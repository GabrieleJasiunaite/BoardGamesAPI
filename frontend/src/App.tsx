import Nav from './components/Nav/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CategoriesContextProvider from './context/CategoriesContext';

//PAGES
import Home from './pages/Home';
import Details from './pages/Details/Details';
import Edit from './pages/Edit/Edit';
import New from './pages/New/New';
import Error404 from './pages/Error404/Error404';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/game/:id' element={<Details />} />
          <Route path='/edit/:id' element={<CategoriesContextProvider><Edit /></CategoriesContextProvider>} />
          <Route path='/new' element={<CategoriesContextProvider><New /></CategoriesContextProvider>} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
