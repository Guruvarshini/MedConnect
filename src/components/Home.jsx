import React from 'react';
import Features from './Features';
import Carousel from './Carousel';
import Department from './Department';
import Disclaimer from './Disclaimer';
import Newscorner from './Newscorner';
import Statistics from './Statistics';
import Contact from './Contact';
function Home() {
  return (
    <div>
      <Carousel />
      <Department />
      <Features/>
      <Disclaimer />
      <Statistics/>
      <Newscorner />
      <Contact/>
    </div>
  );
}

export default Home;