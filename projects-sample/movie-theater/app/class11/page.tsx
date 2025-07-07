'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRef, useState } from 'react';

function FormPage() {
  const [name, setName] = useState('');
  const [isAbove18, setIsAbove18] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  // inputRef.current <-- lưu giá trị

  return (
    <div className='flex justify-center items-center h-screen '>
      <form className='block my-4 '>
        <Input
          className='my-2'
          ref={inputRef}
          type='text'
          value={name}
          onChange={(e) => {
            console.log(e.target.value);
            setName(e.target.value);
          }}
        />
        <Input
          className='my-2'
          type='checkbox'
          checked={isAbove18}
          onChange={() => setIsAbove18(!isAbove18)}
        />
      </form>
      <Button onClick={() => inputRef.current?.focus()}>
        Say hello
      </Button>
    </div>
  );
}

export default FormPage;
