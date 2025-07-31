import React from 'react';

interface Props {
  value: [string | null, string | null];
  onChange: (v: [string | null, string | null]) => void;
}

const DateRangePicker: React.FC<Props> = ({ value, onChange }) => (
  <div className="flex gap-2">
    <input
      type="date"
      value={value[0] || ''}
      onChange={e => onChange([e.target.value, value[1]])}
      className="form-input"
    />
    <span>—</span>
    <input
      type="date"
      value={value[1] || ''}
      onChange={e => onChange([value[0], e.target.value])}
      className="form-input"
    />
  </div>
);

export default DateRangePicker;