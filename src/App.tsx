import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchListComponent from './components/search/search-list/SearchListComponent';

const App: React.FC = () => {
  return (
    <div className="App">
      <SearchListComponent />
    </div>
  );
};

export default App;
