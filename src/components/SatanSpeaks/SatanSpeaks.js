// src/components/SatanSpeaks/SatanSpeaks.js

import React, { useRef } from 'react';


const SatanSpeaks = () => {
  const audioRefs = useRef([]);

  const audioFiles = [
    '/1. 666.mp3',
    '/2. Burn in hell.mp3',
    '/3. Do it you bitch.mp3',
    '/4. Fuck you.mp3',
    '/5. Hail Satan.mp3',
    '/6. Satan laugh.mp3',
    '/7. Suck my balls.mp3',
    '/8. What god.mp3',
    '/9. You are puny.mp3'
  ];

  const handleSatanSpeaksClick = () => {
    // Pause all currently playing audio
    audioRefs.current.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    
    // Get a random index and play the corresponding audio
    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    audioRefs.current[randomIndex].play();
  };

  return (
    <div className='satan-speaks-icon' onClick={handleSatanSpeaksClick}>
      <img className='satan-speaks-icon-image' src="/images/speaker-sign.png" alt="speaker-icon-footer-nav" />
      {audioFiles.map((src, index) => (
        <audio key={index} ref={el => audioRefs.current[index] = el} src={src} />
      ))}
    </div>
  );
};

export default SatanSpeaks;
