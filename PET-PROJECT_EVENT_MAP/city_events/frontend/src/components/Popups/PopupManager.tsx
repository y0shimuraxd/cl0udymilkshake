import React from 'react';
import { useMapContext } from '../../contexts/MapContext';
import EventPopup from './EventPopup';
import AuthPopup from './AuthPopup';
import AddEventPopup from './AddEventPopup';
import { useUIContext } from '../../contexts/UIContext';

const PopupManager: React.FC = () => {
  const { selectedEvent, setSelectedEvent } = useMapContext();
  const { isSidebarOpen, setSidebarOpen } = useUIContext();
  // You can add more popup state here

  return (
    <>
      <EventPopup event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      {/* Example usage: */}
      {/* <AuthPopup isOpen={isAuthOpen} onClose={closeAuth} mode="login" /> */}
      {/* <AddEventPopup isOpen={isAddOpen} onClose={closeAdd} /> */}
    </>
  );
};

export default PopupManager;