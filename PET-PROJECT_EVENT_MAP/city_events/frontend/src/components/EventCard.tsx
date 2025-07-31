import GlassCard from './UI/GlassCard';
import AnimatedButton from './UI/AnimatedButton';

export default function EventCard({ event }: { event: any }) {
  return (
    <GlassCard className="max-w-md mx-auto mb-8">
      <img src={event.image} alt={event.name} className="rounded-xl w-full h-48 object-cover mb-4" />
      <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
      <div className="text-accent mb-2">{event.date}</div>
      <div className="mb-4">{event.place}</div>
      <AnimatedButton className="w-full">Купить билет</AnimatedButton>
    </GlassCard>
  );
}
