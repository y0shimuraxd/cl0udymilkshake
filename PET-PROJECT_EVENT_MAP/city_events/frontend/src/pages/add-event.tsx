import React from 'react';
import MainLayout from '../components/Layout/MainLayout';
import AddEventPopup from '../components/Popups/AddEventPopup';

const AddEventPage: React.FC = () => (
  <MainLayout>
    <AddEventPopup isOpen={true} onClose={() => {}} />
  </MainLayout>
);

export default AddEventPage;