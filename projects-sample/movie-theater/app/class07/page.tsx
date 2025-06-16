'use client';

import { useState } from 'react';
import ShowContent from './components/ShowContent';
import HiddenContent from './components/HiddenContent';

function Class07Page() {
  const [isShow, setIsShow] = useState(true);

  // let content;
  // if (isShow) {
  //   content = <p>Đây là nội dung được hiển thị.</p>;
  // } else {
  //   content = <p>Nội dung bị ẩn.</p>;
  // }

  const fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry'];

  return (
    <div>
      {isShow ? <ShowContent /> : <HiddenContent />}

      {isShow && <ShowContent />}

      {fruits.map((fruit) => (
        <p key={fruit}>{fruit}</p>
      ))}

      <button
        className='bg-blue-500 text-white p-2 rounded-md'
        onClick={() => setIsShow(!isShow)}
      >
        Toggle
      </button>
    </div>
  );
}

export default Class07Page;
