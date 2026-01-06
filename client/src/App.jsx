import { useState } from 'react';
import ContactForm from './components/ContactForm.jsx';
import SubmissionsList from './components/SubmissionsList.jsx';

function App() {
  const [view, setView] = useState('form'); // 'form' | 'admin'

  return (
    <div style={{ 
      minHeight: '100vh',            
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center',      
      alignItems: 'center',          
      padding: '1rem', 
      fontFamily: 'Roboto, sans-serif'
    }}>
      <header style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <button onClick={() => setView('form')}>Contact Form</button>
        <button onClick={() => setView('admin')}>Admin View</button>
      </header>

      {view === 'form' ? <ContactForm /> : <SubmissionsList />}
    </div>
  );
}

export default App;