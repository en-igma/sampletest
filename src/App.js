import React from 'react';
import JobApplicationForm from './components/JobApplicationForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>求人応募フォーム</h1>
      </header>
      <main className="App-main">
        <JobApplicationForm />
      </main>
    </div>
  );
}

export default App;