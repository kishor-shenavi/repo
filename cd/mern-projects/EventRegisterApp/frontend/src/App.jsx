import React, { useState, useEffect } from 'react';
import EventList from './pages/EventList';
import RegistrationForm from './pages/RegistrationForm';
import RegistrationList from './pages/RegistrationList';
import CreateEvent from './pages/CreateEvent';

function App() {
  const [currentView, setCurrentView] = useState('events');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const navigateTo = (view, event = null) => {
    setCurrentView(view);
    if (event) setSelectedEvent(event);
  };

  return (
    <div className="container">
      <header>
        <h1>EventHub</h1>
        <p className="subtitle">Discover and Register for the most exciting events</p>
      </header>

      <nav className="nav-links">
        <a 
          href="#" 
          className={currentView === 'events' ? 'active' : ''} 
          onClick={(e) => { e.preventDefault(); navigateTo('events'); }}
        >
          Events
        </a>
        <a 
          href="#" 
          className={currentView === 'add-event' ? 'active' : ''} 
          onClick={(e) => { e.preventDefault(); navigateTo('add-event'); }}
        >
          Add Event
        </a>
        <a 
          href="#" 
          className={currentView === 'registrations' ? 'active' : ''} 
          onClick={(e) => { e.preventDefault(); navigateTo('registrations'); }}
        >
          My Registrations
        </a>
      </nav>

      <main>
        {currentView === 'events' && (
          <EventList onRegisterClick={(event) => navigateTo('form', event)} />
        )}
        
        {currentView === 'add-event' && (
          <CreateEvent onSuccess={() => navigateTo('events')} />
        )}
        
        {currentView === 'form' && (
          <RegistrationForm 
            event={selectedEvent} 
            onCancel={() => navigateTo('events')} 
            onSuccess={() => navigateTo('registrations')}
          />
        )}

        {currentView === 'registrations' && (
          <RegistrationList />
        )}
      </main>
    </div>
  );
}

export default App;
