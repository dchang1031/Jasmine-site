import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { VoiceSamplesSection } from './components/VoiceSamplesSection';
import { HobbiesSection } from './components/HobbiesSection';
import { BookingSection } from './components/BookingSection';
import { AnimatedSection } from './components/AnimatedSection';

export default function App() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#6d1822] text-[#1a1a1a] selection:bg-[#e65c26] selection:text-white">
      <Navbar onDirectBooking={() => scrollTo('booking')} />
      <main>
        <AnimatedSection id="hero">
          <Hero
            onScrollToSamples={() => scrollTo('samples')}
            onScrollToBooking={() => scrollTo('booking')}
          />
        </AnimatedSection>

        <AnimatedSection id="about">
          <AboutSection />
        </AnimatedSection>

        <AnimatedSection id="samples">
          <VoiceSamplesSection />
        </AnimatedSection>

        <AnimatedSection id="hobbies">
          <HobbiesSection />
        </AnimatedSection>

        <AnimatedSection id="booking">
          <BookingSection />
        </AnimatedSection>
      </main>
    </div>
  );
}
