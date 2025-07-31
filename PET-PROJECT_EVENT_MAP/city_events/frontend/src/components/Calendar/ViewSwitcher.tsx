import React from 'react';

interface Props {
  mode: 'map' | 'list' | 'calendar';
  setMode: (mode: 'map' | 'list' | 'calendar') => void;
}

const ViewSwitcher: React.FC<Props> = ({ mode, setMode }) => (
  <div className="flex gap-2">
    <button className={`animated-btn ${mode === 'map' ? 'bg-accent' : ''}`} onClick={() => setMode('map')}>Карта</button>
    <button className={`animated-btn ${mode === 'list' ? 'bg-accent' : ''}`} onClick={() => setMode('list')}>Список</button>
    <button className={`animated-btn ${mode === 'calendar' ? 'bg-accent' : ''}`} onClick={() => setMode('calendar')}>Календарь</button>
  </div>
);

export default ViewSwitcher;