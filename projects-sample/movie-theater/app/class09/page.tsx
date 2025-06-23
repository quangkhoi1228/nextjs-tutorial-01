import React, { useState } from 'react';

function Class09() {
  const [name, setName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div>
      <label>
        Tên:
        <input type='text' value={name} onChange={handleChange} />
      </label>
      <p>Bạn đã nhập: {name}</p>
    </div>
  );
}

export default Class09;
