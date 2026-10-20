import React from 'react';

export const HeroIntro: React.FC = () => {
  return (
    <section className="hidden sm:block pt-6 pb-4 sm:pt-10 sm:pb-6 text-center max-w-2xl mx-auto px-4">
      <div className="inline-block mb-2 text-xs uppercase tracking-[0.25em] font-medium text-[#756B63]">
        Specialty Coffee & Kitchen
      </div>
      <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#241E1A] tracking-tight leading-tight">
        Good coffee.<br />
        <span className="italic font-light text-[#B86B3D]">Good moments.</span>
      </h1>
      <p className="mt-3 text-sm sm:text-base text-[#756B63] font-light max-w-lg mx-auto leading-relaxed">
        Explore carefully crafted coffee, signature cold brews, artisanal teas, and fresh café favourites.
      </p>
    </section>
  );
};

