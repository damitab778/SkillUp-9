import './App.css';

import Header from 'components/Header';
import NoteListPage from 'views/NoteListPage';

function App() {
  return (
    <div className="App">
      <Header />
      <NoteListPage />
    </div>
  );
}

export default App;
