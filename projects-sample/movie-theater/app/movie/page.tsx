'use client';

import React from 'react';
import Title from './components/Title';
import UtilityContainer from './components/UtilityContainer';
import AddNewButton from './components/AddNewButton';

function MoviePage() {
  return (
    <section className=' bg-white h-screen text-black'>
      <Title />
      <UtilityContainer>
        <AddNewButton />
      </UtilityContainer>
    </section>
  );
}

export default MoviePage;
