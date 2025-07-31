import React from 'react';

interface Props {
  value: [number, number];
  onChange: (v: [number, number]) => void;
}

const PriceSlider: React.FC<Props> = ({ value, onChange }) => (
  <div className="flex flex-col gap-1">
    <label>Цена: {value[0]}₽ — {value[1]}₽</label>
    <input
      type="range"
      min={0}
      max={10000}
      value={value[0]}
      onChange={e => onChange([+e.target.value, value[1]])}
      className="w-full"
    />
    <input
      type="range"
      min={0}
      max={10000}
      value={value[1]}
      onChange={e => onChange([value[0], +e.target.value])}
      className="w-full"
    />
  </div>
);

export default PriceSlider;