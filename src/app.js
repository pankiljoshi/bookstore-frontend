import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './styles/index.css';
import ProductScreen from './screens/ProductScreen';
import HomScreen from './screens/HomScreen';

function App() {
  return (
    <BrowserRouter>
    <header class="py-3 border border-color-grey-200 flex justify-center">
      <Link to="/" className="mr-4">Home</Link>
    </header>

    <main class="container mx-auto">
      <Route exact path="/" component={HomScreen} />
      <Route path="/books/:id" component={ProductScreen} />
    </main>
    </BrowserRouter>
  );
}

export default App;