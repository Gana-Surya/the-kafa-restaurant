import React, { useState, useEffect, useRef } from 'react';

/**
 * MobileIntroLoader
 * Exclusively displayed on mobile devices (< 640px).
 * Plays the provided THE KAFA vertical intro video (/mobile-intro.mp4).
 * - Full-screen overlay with matching cream background (#F7F3EC)
 * - Centered video preserving aspect ratio via object-fit: contain (never stretched or cropped)
 * - Muted autoplay and playsInline for seamless mobile browser compatibility
 * - Preserves original 1.0x playback speed, timing, logo, and animations intact
 * - Immediate non-blocking fallback if video fails to load or autoplay
 */
const MobileIntroLoader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dismissedRef = useRef(false);

  const handleDismiss = (immediate = false) => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;

    // Restore body scroll
    document.body.style.overflow = '';

    if (immediate) {
      setIsVisible(false);
      return;
    }

    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 700);
  };

  useEffect(() => {
    if (!isVisible) return;

    // Prevent body scroll during video playback
    document.body.style.overflow = 'hidden';

    // Attempt video playback
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.playbackRate = 1.0;
      videoRef.current.play().catch((err) => {
        console.warn('Mobile intro autoplay prevented or failed, showing site directly:', err);
        handleDismiss(true);
      });
    }

    // Safety fallback timer (video is ~5s; 7s maximum timeout)
    const timer = setTimeout(() => {
      handleDismiss();
    }, 7000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 w-screen h-screen h-[100dvh] overflow-hidden bg-[#F7F3EC] flex items-center justify-center transition-opacity duration-700 ease-in-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ backgroundColor: '#F7F3EC' }}
    >
      <video
        ref={videoRef}
        src="/mobile-intro.mp4"
        autoPlay
        muted
        playsInline
        onEnded={() => handleDismiss()}
        onError={(err) => {
          console.warn('Mobile intro video error, dismissing:', err);
          handleDismiss(true);
        }}
        className="w-full h-full max-w-full max-h-full object-contain mx-auto my-auto block border-none outline-none"
        style={{ backgroundColor: '#F7F3EC' }}
      />
    </div>
  );
};

/**
 * DesktopIntroLoader
 * Preserves the exact, 100% untouched desktop experience.
 * Plays /intro-loader.mp4 at 2.0x speed with object-cover scaling.
 */
const DesktopIntroLoader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleDismiss = () => {
    setIsFadingOut(true);
    // Restore body scroll
    document.body.style.overflow = '';
    setTimeout(() => {
      setIsVisible(false);
    }, 700);
  };

  useEffect(() => {
    // Prevent scrollbar during intro video playback
    document.body.style.overflow = 'hidden';

    if (videoRef.current) {
      videoRef.current.playbackRate = 2.0;
      videoRef.current.play().catch((err) => {
        console.warn('Autoplay failed:', err);
        handleDismiss();
      });
    }

    // Safety fallback timer for 2x speed (6s max)
    const timer = setTimeout(() => {
      handleDismiss();
    }, 6000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.0;
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 w-screen h-screen overflow-hidden bg-[#F7F3EC] flex items-center justify-center transition-opacity duration-700 ease-in-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Scaled video to overbleed subpixel edge lines on right and bottom */}
      <video
        ref={videoRef}
        src="/intro-loader.mp4"
        autoPlay
        muted
        playsInline
        onPlay={handlePlay}
        onEnded={handleDismiss}
        onError={handleDismiss}
        className="w-full h-full object-cover scale-[1.05] transform origin-center border-none outline-none block bg-[#F7F3EC]"
      />
    </div>
  );
};

export const VideoIntroLoader: React.FC = () => {
  // Use project responsive breakpoint (sm: 640px)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 640 || window.matchMedia('(max-width: 639px)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 640 || window.matchMedia('(max-width: 639px)').matches);
    };

    window.addEventListener('resize', updateIsMobile);
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    mediaQuery.addEventListener('change', updateIsMobile);

    return () => {
      window.removeEventListener('resize', updateIsMobile);
      mediaQuery.removeEventListener('change', updateIsMobile);
    };
  }, []);

  if (isMobile) {
    return <MobileIntroLoader />;
  }

  return <DesktopIntroLoader />;
};
