import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { X, Check, Navigation, MapPin, Loader2, Search } from 'lucide-react';

interface MapPinPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (locationData: {
    address: string;
    locationUrl: string;
    latitude: number;
    longitude: number;
  }) => void;
  initialAddress?: string;
}

export const MapPinPickerModal: React.FC<MapPinPickerModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialAddress
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Default to Bangalore, India (center) or fallback
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({
    lat: 12.9716,
    lng: 77.5946
  });

  const [addressPreview, setAddressPreview] = useState<string>(
    initialAddress?.trim() || 'Locating on map...'
  );
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [isLocatingUser, setIsLocatingUser] = useState(false);
  const [isMapMoving, setIsMapMoving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Reverse geocode latitude and longitude using Nominatim (OpenStreetMap)
  const fetchAddress = async (lat: number, lng: number) => {
    setIsLoadingAddress(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'en'
          }
        }
      );

      if (!response.ok) throw new Error('Geocoding request failed');
      const data = await response.json();

      if (data && data.display_name) {
        // Build clean readable address
        const addr = data.address || {};
        const parts = [
          addr.road || addr.pedestrian || addr.building,
          addr.neighbourhood || addr.suburb || addr.residential,
          addr.city || addr.town || addr.village,
          addr.state,
          addr.postcode
        ].filter(Boolean);

        const formatted = parts.length > 0 ? parts.join(', ') : data.display_name;
        setAddressPreview(formatted);
      } else {
        setAddressPreview(`Location (${lat.toFixed(5)}, ${lng.toFixed(5)})`);
      }
    } catch {
      setAddressPreview(`Dropped Pin at ${lat.toFixed(5)}, ${lng.toFixed(5)}`);
    } finally {
      setIsLoadingAddress(false);
    }
  };

  // Search places via Nominatim
  const handleSearchPlace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || !mapInstanceRef.current) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&limit=1`,
        {
          headers: {
            'Accept-Language': 'en'
          }
        }
      );
      const results = await response.json();
      if (results && results.length > 0) {
        const item = results[0];
        const newLat = parseFloat(item.lat);
        const newLng = parseFloat(item.lon);
        mapInstanceRef.current.setView([newLat, newLng], 17);
      }
    } catch {} finally {
      setIsSearching(false);
    }
  };

  // Locate user GPS
  const handleLocateMe = () => {
    if (!navigator.geolocation) return;
    setIsLocatingUser(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocatingUser(false);
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lng: longitude });
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([latitude, longitude], 17);
        }
      },
      () => {
        setIsLocatingUser(false);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  // Initialize Leaflet map
  useEffect(() => {
    if (!isOpen || !mapContainerRef.current) return;

    // Destroy existing instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView([coords.lat, coords.lng], 16);

    // OpenStreetMap standard tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map);

    // Zoom control in bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    mapInstanceRef.current = map;

    // Auto-locate GPS on modal open if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setCoords({ lat: latitude, lng: longitude });
          map.setView([latitude, longitude], 17);
        },
        () => {
          // Keep default
          fetchAddress(coords.lat, coords.lng);
        },
        { timeout: 5000, enableHighAccuracy: true }
      );
    } else {
      fetchAddress(coords.lat, coords.lng);
    }

    // Map drag and move handlers
    map.on('movestart', () => {
      setIsMapMoving(true);
    });

    map.on('moveend', () => {
      setIsMapMoving(false);
      const center = map.getCenter();
      setCoords({ lat: center.lat, lng: center.lng });
      fetchAddress(center.lat, center.lng);
    });

    // Invalidate size once visible
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    const mapsLink = `https://www.google.com/maps?q=${coords.lat},${coords.lng}`;
    onConfirm({
      address: addressPreview,
      locationUrl: mapsLink,
      latitude: coords.lat,
      longitude: coords.lng
    });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-60 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-2xl h-[92vh] sm:h-[85vh] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E5DCD1] flex flex-col overflow-hidden animate-slide-up sm:animate-modal-in"
      >
        {/* Top Bar */}
        <div className="p-4 bg-white border-b border-[#E5DCD1] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#B86B3D]/10 text-[#B86B3D] flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#241E1A]">
                Pin Delivery Location
              </h3>
              <p className="text-[11px] text-[#756B63]">
                Move the map to place the pin on your exact entrance
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-[#756B63] hover:text-[#241E1A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input overlay */}
        <div className="px-4 py-2.5 bg-[#F7F3EC] border-b border-[#E5DCD1] shrink-0">
          <form onSubmit={handleSearchPlace} className="flex items-center gap-2">
            <div className="relative flex-1 flex items-center bg-white rounded-xl border border-[#E5DCD1] px-3 py-1.5 shadow-2xs">
              <Search className="w-4 h-4 text-[#756B63] mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search area, landmark, street..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-[#241E1A] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-3 py-1.5 rounded-xl bg-[#241E1A] text-white text-xs font-semibold hover:bg-black transition-colors cursor-pointer shrink-0 disabled:opacity-50"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>

        {/* Map Area */}
        <div className="relative flex-1 w-full bg-[#F0E6D8] overflow-hidden">
          {/* Leaflet container */}
          <div ref={mapContainerRef} className="w-full h-full z-0" />

          {/* Fixed Center Pin with floating drop animation */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
            <div
              className={`flex flex-col items-center transition-transform duration-200 ${
                isMapMoving ? '-translate-y-3 scale-110' : 'translate-y-0 scale-100'
              }`}
            >
              {/* Pin bubble */}
              <div className="bg-[#B86B3D] text-white p-2.5 rounded-full shadow-xl border-2 border-white flex items-center justify-center">
                <MapPin className="w-6 h-6 fill-white stroke-[#B86B3D]" />
              </div>

              {/* Pin point needle */}
              <div className="w-1.5 h-3 bg-[#241E1A] rounded-b-full -mt-0.5 shadow-sm"></div>

              {/* Pin shadow on map */}
              <div
                className={`w-3 h-1.5 bg-black/40 rounded-full blur-[1px] transition-all duration-200 mt-0.5 ${
                  isMapMoving ? 'scale-75 opacity-20' : 'scale-100 opacity-60'
                }`}
              ></div>
            </div>
          </div>

          {/* GPS "Locate Me" Button */}
          <button
            type="button"
            onClick={handleLocateMe}
            disabled={isLocatingUser}
            className="absolute top-4 right-4 z-20 bg-white/95 hover:bg-white text-[#241E1A] p-2.5 rounded-2xl shadow-lg border border-[#E5DCD1] transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer text-xs font-bold"
            title="Locate my GPS"
          >
            {isLocatingUser ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#B86B3D]" />
            ) : (
              <Navigation className="w-4 h-4 text-[#B86B3D]" />
            )}
            <span className="hidden sm:inline">My GPS</span>
          </button>
        </div>

        {/* Bottom Address Confirmation Bar */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#E5DCD1] space-y-3 shrink-0">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#756B63]">
                  Selected Address
                </span>
                {isLoadingAddress && (
                  <span className="text-[10px] text-[#B86B3D] flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Detecting street...</span>
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#241E1A] line-clamp-2 mt-0.5">
                {addressPreview}
              </p>
              <span className="text-[10px] text-[#756B63] block font-mono mt-0.5">
                {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
              </span>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full py-3.5 px-4 bg-[#B86B3D] hover:bg-[#A05A30] active:scale-[0.99] text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Confirm & Use This Location</span>
          </button>
        </div>
      </div>
    </div>
  );
};
