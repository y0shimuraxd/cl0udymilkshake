import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

const EventList = ({ events }) => {
  if (!events || events.length === 0) {
    return <Typography variant="body1">Событий не найдено</Typography>;
  }

  return (
    <Grid container spacing={3}>
      {events.map(event => (
        <Grid item xs={12} sm={6} md={4} key={event.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{event.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {event.date} в {event.time}
              </Typography>
              <Typography variant="body2">{event.address}</Typography>
              <Typography variant="body2">
                {event.is_free ? 'Бесплатно' : `Цена: ${event.price} руб.`}
              </Typography>
              {event.category && (
                <Typography variant="caption" color="primary">
                  {event.category.name}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default EventList;