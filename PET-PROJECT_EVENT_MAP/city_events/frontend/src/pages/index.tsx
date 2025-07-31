import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMapContext } from '../contexts/MapContext';
import { useUIContext } from '../contexts/UIContext';
import { useAuthContext } from '../contexts/AuthContext';
import { useFilters } from '../hooks/useFilters';
import { Event } from '../types/event';

// Components
import MainLayout from '../components/Layout/MainLayout';
import MapContainer from '../components/Map/MapContainer';
import EventList from '../components/Events/EventList';
import FilterPanel from '../components/Filters/FilterPanel';
import SearchBar from '../components/Filters/SearchBar';
import ViewToggle from '../components/UI/ViewToggle';
import GlassCard from '../components/UI/GlassCard';
import AnimatedButton from '../components/UI/AnimatedButton';
import IconButton from '../components/UI/IconButton';
import EventPopup from '../components/Popups/EventPopup';
import AddEventPopup from '../components/Popups/AddEventPopup';
import AuthPopup from '../components/Popups/AuthPopup';
import GradientLoader from '../components/UI/GradientLoader';

type ViewMode = 'map' | 'list';

const IndexPage: React.FC = () => {
  const { events, selectedEvent, setSelectedEvent, center, zoom, loading: mapLoading } = useMapContext();
  const { isAuthenticated, user } = useAuthContext();
  const { showPopup, hidePopup, popupType } = useUIContext();
  
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  
  const { filters, updateFilter, resetFilters, hasActiveFilters } = useFilters();

  // Filter events based on current filters
  useEffect(() => {
    let filtered = [...events];
    
    if (filters.searchQuery) {
      filtered = filtered.filter(event => 
        event.name.toLowerCase().includes(filters.searchQuery!.toLowerCase()) ||
        (event.shortDescription && event.shortDescription.toLowerCase().includes(filters.searchQuery!.toLowerCase()))
      );
    }
    
    if (filters.category) {
      filtered = filtered.filter(event => event.category === filters.category);
    }
    
    if (filters.dateRange?.[0]) {
      filtered = filtered.filter(event => event.date >= filters.dateRange![0]);
    }
    
    if (filters.dateRange?.[1]) {
      filtered = filtered.filter(event => event.date <= filters.dateRange![1]);
    }
    
    if (filters.priceRange) {
      filtered = filtered.filter(event => 
        event.price && 
        event.price >= filters.priceRange![0] && 
        event.price <= filters.priceRange![1]
      );
    }
    
    setFilteredEvents(filtered);
  }, [events, filters]);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    showPopup('event');
  };

  const handleAddEvent = () => {
    if (!isAuthenticated) {
      showPopup('auth');
    } else {
      showPopup('addEvent');
    }
  };

  const handleCloseEventPopup = () => {
    setSelectedEvent(null);
    hidePopup();
  };

  if (mapLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <GradientLoader />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
        {/* Header Section */}
        <motion.div 
          className="relative z-10 pt-8 pb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-primary mb-2">
                  События Ярославля
                </h1>
                <p className="text-dark/70 text-lg">
                  Откройте для себя лучшие события в городе
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <ViewToggle 
                  mode={viewMode} 
                  onModeChange={setViewMode}
                />
                
                <AnimatedButton 
                  onClick={handleAddEvent}
                  variant="primary"
                  className="hidden sm:flex"
                >
                  Добавить событие
                </AnimatedButton>
                
                {!isAuthenticated && (
                  <AnimatedButton 
                    onClick={() => showPopup('auth')}
                    variant="secondary"
                  >
                    Войти
                  </AnimatedButton>
                )}
              </div>
            </div>

            {/* Search and Filters */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SearchBar 
                  onSearch={(query) => updateFilter('searchQuery', query)}
                  placeholder="Поиск событий в Ярославле..."
                />
              </div>
              
              <div className="lg:col-span-1">
                <GlassCard className="p-4">
                  <FilterPanel
                    filters={filters}
                    updateFilter={updateFilter}
                    resetFilters={resetFilters}
                    hasActiveFilters={hasActiveFilters}
                  />
                </GlassCard>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <AnimatePresence mode="wait">
            {viewMode === 'map' ? (
              <motion.div
                key="map"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative"
              >
                <GlassCard className="p-0 overflow-hidden">
                  <div className="w-full h-[600px] rounded-2xl overflow-hidden">
                    <MapContainer />
                  </div>
                  
                  {/* Floating Add Event Button */}
                  <motion.div
                    className="absolute top-4 right-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <IconButton
                      onClick={handleAddEvent}
                      variant="primary"
                      size="lg"
                      className="shadow-glass-lg"
                      aria-label="Добавить событие на карту"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </IconButton>
                  </motion.div>
                </GlassCard>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <EventList
                  events={filteredEvents}
                  onEventClick={handleEventClick}
                  onAddEvent={handleAddEvent}
                  isLoading={mapLoading}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Popups */}
      <AnimatePresence>
        {popupType === 'event' && selectedEvent && (
          <EventPopup
            event={selectedEvent}
            onClose={handleCloseEventPopup}
          />
        )}
        
        {popupType === 'addEvent' && (
          <AddEventPopup 
            isOpen={true}
            onClose={() => hidePopup()} 
          />
        )}
        
        {popupType === 'auth' && (
          <AuthPopup onClose={() => hidePopup()} />
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default IndexPage;