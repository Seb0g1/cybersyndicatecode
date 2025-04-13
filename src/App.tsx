import React, { useState } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { Monitor, Cpu, Cpu as Gpu, MemoryStick as Memory, HardDrive, Clock, Shield, Trophy, ChevronRight, Gamepad2, Menu, X, Joystick, Mouse, Keyboard, Headphones, Sun, Moon, ChevronDown, MapPin, Car } from 'lucide-react';

const DARK_MAP_STYLE = [
  {
    "elementType": "geometry",
    "stylers": [{ "color": "#1a1a1a" }]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#757575" }]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{ "color": "#1a1a1a" }]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "poi",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [{ "color": "#2c2c2c" }]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "transit",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{ "color": "#0e0e0e" }]
  }
];

const tiers = [
  {
    name: 'COMFORT',
    prices: {
      hour: { day: '150₽', night: '180₽' },
      threeHours: { day: '320₽', night: '440₽' },
      sixHours: { day: '490₽', night: '700₽' },
      overnight: '950₽'
    },
    specs: {
      cpu: 'I5-11400',
      gpu: 'NVIDIA RTX 3060',
      ram: '16GB DDR4',
      storage: '1TB NVMe SSD',
      monitor: '27" 144Hz',
      mouse: 'Logitech G102',
      keyboard: 'HyperX Alloy Origins',
      headphones: 'HyperX',
    },
    color: 'from-red-600 to-red-500',
    shadowColor: 'shadow-red-500/20',
  },
  {
    name: 'LUX',
    prices: {
      hour: { day: '170₽', night: '200₽' },
      threeHours: { day: '380₽', night: '500₽' },
      sixHours: { day: '590₽', night: '800₽' },
      overnight: '1050₽'
    },
    specs: {
      cpu: 'i5-12400F',
      gpu: 'NVIDIA RTX 4060',
      ram: '16GB DDR4',
      storage: '1TB NVMe SSD',
      monitor: '27" 144Hz',
      mouse: 'Logitech G102 LIGHTSYNC',
      keyboard: 'HyperX Alloy Origins',
      headphones: 'HyperX',
    },
    color: 'from-red-700 to-red-600',
    shadowColor: 'shadow-red-600/20',
  },
  {
    name: 'VIP',
    prices: {
      hour: { day: '210₽', night: '250₽' },
      threeHours: { day: '520₽', night: '650₽' },
      sixHours: { day: '880₽', night: '1100₽' },
      overnight: '1300₽'
    },
    specs: {
      cpu: 'i5-13400F',
      gpu: 'NVIDIA RTX 3070 TI',
      ram: '32GB DDR4',
      storage: '2TB NVMe SSD',
      monitor: '24" 240Hz',
      mouse: 'Logitech G Pro',
      keyboard: 'HyperX Alloy Origins',
      headphones: 'HyperX',
    },
    color: 'from-red-800 to-red-700',
    shadowColor: 'shadow-red-700/20',
  },
];

const ps5Prices = {
  hour: '400₽',
  threeHours: '1000₽',
  overnight: '1500₽'
};

const games = [
  { name: 'Counter-Strike 2', platforms: ['pc'] },
  { name: 'Dota 2', platforms: ['pc'] },
  { name: 'WARFACE', platforms: ['pc'] },
  { name: 'Fortnite', platforms: ['pc'] },
  { name: 'VALORANT', platforms: ['pc'] },
  { name: 'STARCRAFT II', platforms: ['pc'] },
  { name: 'Rage MP', platforms: ['pc'] },
  { name: 'Majestic', platforms: ['pc'] },
  { name: 'Legends Of Runeterra', platforms: ['pc'] },
  { name: 'OverWatch', platforms: ['pc'] },
  { name: 'Marvel Rivals', platforms: ['pc'] },
  { name: 'GTA V', platforms: ['pc', 'ps5'] },
  { name: 'FIFA 24', platforms: ['ps5'] },
  { name: 'FIFA 25', platforms: ['ps5'] },
  { name: 'Mortal Kombat 11', platforms: ['ps5'] },
  { name: 'UFC 4', platforms: ['ps5'] },
  { name: 'UFC 5', platforms: ['ps5'] },
  { name: 'NBA 2K25', platforms: ['ps5'] },
  { name: 'GranTurismo 7', platforms: ['ps5'] },
  { name: 'TEKKEN 8', platforms: ['ps5'] },
];

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

function App() {
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'pc' | 'ps5'>('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedSpec, setExpandedSpec] = useState<string | null>(null);
  const [map, setMap] = useState<any>(null);

  const filteredGames = games.filter(game => 
    selectedPlatform === 'all' || game.platforms.includes(selectedPlatform)
  );

  const Logo = () => (
    <div className="flex items-center gap-2">
      <img src="/cyber-syndicate-logo.png" alt="Cyber Syndicate" className="w-8 h-8" />
      <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
        CYBER SYNDICATE
      </span>
    </div>
  );

  const PriceCard = ({ label, dayPrice, nightPrice }: { label: string; dayPrice: string; nightPrice: string }) => (
    <div className="bg-black/30 rounded-xl p-4">
      <h4 className="text-lg font-semibold mb-3 text-gray-200">{label}</h4>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center justify-between bg-zinc-900/50 rounded-lg p-3">
          <Sun className="w-4 h-4 text-amber-500" />
          <span className="font-bold">{dayPrice}</span>
        </div>
        <div className="flex items-center justify-between bg-zinc-900/50 rounded-lg p-3">
          <Moon className="w-4 h-4 text-blue-400" />
          <span className="font-bold">{nightPrice}</span>
        </div>
      </div>
    </div>
  );

  const SpecsSection = ({ tier }: { tier: typeof tiers[0] }) => {
    const isExpanded = expandedSpec === tier.name;
    
    const toggleSpecs = () => {
      setExpandedSpec(isExpanded ? null : tier.name);
    };
    
    return (
      <div className="mt-6">
        <button 
          onClick={toggleSpecs}
          className="w-full flex items-center justify-between p-3 bg-black/30 rounded-xl text-left"
        >
          <span className="font-semibold">Характеристики</span>
          <ChevronDown 
            className={`w-5 h-5 transform transition-transform duration-300 ease-in-out ${isExpanded ? 'rotate-180' : ''}`} 
          />
        </button>
        
        <div 
          className={`grid transition-all duration-300 ease-in-out ${
            isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="p-4 bg-black/20 rounded-xl space-y-3 mt-3">
              <div className="flex items-center gap-3">
                <Cpu className="w-5 h-5 text-red-500" />
                <span>{tier.specs.cpu}</span>
              </div>
              <div className="flex items-center gap-3">
                <Gpu className="w-5 h-5 text-red-500" />
                <span>{tier.specs.gpu}</span>
              </div>
              <div className="flex items-center gap-3">
                <Memory className="w-5 h-5 text-red-500" />
                <span>{tier.specs.ram}</span>
              </div>
              <div className="flex items-center gap-3">
                <HardDrive className="w-5 h-5 text-red-500" />
                <span>{tier.specs.storage}</span>
              </div>
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5 text-red-500" />
                <span>{tier.specs.monitor}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mouse className="w-5 h-5 text-red-500" />
                <span>{tier.specs.mouse}</span>
              </div>
              <div className="flex items-center gap-3">
                <Keyboard className="w-5 h-5 text-red-500" />
                <span>{tier.specs.keyboard}</span>
              </div>
              <div className="flex items-center gap-3">
                <Headphones className="w-5 h-5 text-red-500" />
                <span>{tier.specs.headphones}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-sm border-b border-red-900/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('pc')} className="text-gray-300 hover:text-white transition-colors">PC Gaming</button>
              <button onClick={() => scrollToSection('ps5')} className="text-gray-300 hover:text-white transition-colors">PlayStation 5</button>
              <button onClick={() => scrollToSection('games')} className="text-gray-300 hover:text-white transition-colors">Игры</button>
              <button onClick={() => scrollToSection('contacts')} className="text-gray-300 hover:text-white transition-colors">Контакты</button>
              <a 
                href="https://langame.ru/654375375_computerniy_club_cyber-syndicate_moskva" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-red-700 to-red-600 px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300"
              >
                Забронировать
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden bg-black/95 border-b border-red-900/20 transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-4 py-4 space-y-4">
            <button onClick={() => { scrollToSection('pc'); setIsMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-white transition-colors">PC Gaming</button>
            <button onClick={() => { scrollToSection('ps5'); setIsMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-white transition-colors">PlayStation 5</button>
            <button onClick={() => { scrollToSection('games'); setIsMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-white transition-colors">Игры</button>
            <button onClick={() => { scrollToSection('contacts'); setIsMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-white transition-colors">Контакты</button>
            <a 
              href="https://langame.ru/654375375_computerniy_club_cyber-syndicate_moskva" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-red-700 to-red-600 px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300"
            >
              Забронировать
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div 
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'url("https://avatars.mds.yandex.net/get-altay/2366463/2a00000172b66303963838ce6a7910cbd600/XXXL")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
            CYBER SYNDICATE
          </h1>
          <p className="text-2xl mb-8 text-gray-300">
            Погрузись в мир киберспорта на максимальных настройках
          </p>
          <a 
            href="https://langame.ru/654375375_computerniy_club_cyber-syndicate_moskva" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-red-700 to-red-600 px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 inline-block"
          >
            Забронировать
          </a>
        </div>
      </div>

      {/* PC Gaming Section */}
      <div id="pc" className="py-20 px-4 bg-gradient-to-b from-black to-red-950/20 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent">
            Игровые PC
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div 
                key={tier.name}
                className={`rounded-2xl p-6 bg-zinc-900/50 backdrop-blur-sm border border-red-900/20 hover:border-red-500/50 transition-all duration-300 ${tier.shadowColor} hover:shadow-xl`}
              >
                <div className={`bg-gradient-to-r ${tier.color} text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4`}>
                  {tier.name}
                </div>

                <div className="space-y-4">
                  <PriceCard 
                    label="1 час" 
                    dayPrice={tier.prices.hour.day} 
                    nightPrice={tier.prices.hour.night} 
                  />
                  <PriceCard 
                    label="3 часа" 
                    dayPrice={tier.prices.threeHours.day} 
                    nightPrice={tier.prices.threeHours.night} 
                  />
                  <PriceCard 
                    label="6 часов" 
                    dayPrice={tier.prices.sixHours.day} 
                    nightPrice={tier.prices.sixHours.night} 
                  />
                  <div className="bg-black/30 rounded-xl p-4">
                    <h4 className="text-lg font-semibold mb-3 text-gray-200">Ночь (22:00-8:00)</h4>
                    <div className="flex items-center justify-between bg-zinc-900/50 rounded-lg p-3">
                      <Moon className="w-4 h-4 text-blue-400" />
                      <span className="font-bold">{tier.prices.overnight}</span>
                    </div>
                  </div>
                </div>

                <SpecsSection tier={tier} />

                <a 
                  href="https://langame.ru/654375375_computerniy_club_cyber-syndicate_moskva" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-full mt-8 bg-gradient-to-r ${tier.color} px-6 py-3 rounded-full font-semibold hover:shadow-lg ${tier.shadowColor} transition-all duration-300 block text-center`}
                >
                  Забронировать
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PS5 Section */}
      <div id="ps5" className="py-20 px-4 bg-black scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent">
            PlayStation 5
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Игровая зона PlayStation 5</h3>
              <p className="text-gray-400">Погрузитесь в мир эксклюзивных игр PlayStation на большом экране с максимальным комфортом</p>
              
              <div className="space-y-4">
                <div className="bg-black/30 rounded-xl p-4">
                  <h4 className="text-lg font-semibold mb-3 text-gray-200">1 час</h4>
                  <div className="flex items-center justify-between bg-zinc-900/50 rounded-lg p-3">
                    <Gamepad2 className="w-4 h-4 text-blue-400" />
                    <span className="font-bold">{ps5Prices.hour}</span>
                  </div>
                </div>

                <div className="bg-black/30 rounded-xl p-4">
                  <h4 className="text-lg font-semibold mb-3 text-gray-200">3 часа</h4>
                  <div className="flex items-center justify-between bg-zinc-900/50 rounded-lg p-3">
                    <Gamepad2 className="w-4 h-4 text-blue-400" />
                    <span className="font-bold">{ps5Prices.threeHours}</span>
                  </div>
                </div>

                <div className="bg-black/30 rounded-xl p-4">
                  <h4 className="text-lg font-semibold mb-3 text-gray-200">Ночь (22:00-8:00)</h4>
                  <div className="flex items-center justify-between bg-zinc-900/50 rounded-lg p-3">
                    <Moon className="w-4 h-4 text-blue-400" />
                    <span className="font-bold">{ps5Prices.overnight}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-3">
                  <Monitor className="w-5 h-5 text-red-500" />
                  <span>4K HDR Телевизор 55"</span>
                </div>
                <div className="flex items-center gap-3">
                  <Gamepad2 className="w-5 h-5 text-red-500" />
                  <span>DualSense беспроводной контроллер</span>
                </div>
              </div>

              <a 
                href="https://langame.ru/654375375_computerniy_club_cyber-syndicate_moskva" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-red-700 to-red-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 inline-block"
              >
                Забронировать PS5
              </a>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&q=80" 
                alt="PlayStation 5 Gaming Zone" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Games Section */}
      <div id="games" className="py-20 px-4 bg-gradient-to-b from-black to-red-950/20 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent">
            Доступные игры
          </h2>
          
          <div className="flex justify-center gap-4 mb-12">
            <button 
              onClick={() => setSelectedPlatform('all')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300
                ${selectedPlatform === 'all' 
                  ? 'bg-gradient-to-r from-red-700 to-red-600 text-white' 
                  : 'bg-zinc-900 text-gray-400 hover:text-white'}`}
            >
              Все
            </button>
            <button 
              onClick={() => setSelectedPlatform('pc')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300
                ${selectedPlatform === 'pc' 
                  ? 'bg-gradient-to-r from-red-700 to-red-600 text-white' 
                  : 'bg-zinc-900 text-gray-400 hover:text-white'}`}
            >
              PC
            </button>
            <button 
              onClick={() => setSelectedPlatform('ps5')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300
                ${selectedPlatform === 'ps5' 
                  ? 'bg-gradient-to-r from-red-700 to-red-600 text-white' 
                  : 'bg-zinc-900 text-gray-400 hover:text-white'}`}
            >
              PS5
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <div 
                key={game.name}
                className="bg-zinc-900/50 backdrop-blur-sm border border-red-900/20 rounded-xl p-4 hover:border-red-500/50 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold mb-2">{game.name}</h3>
                <div className="flex gap-2">
                  {game.platforms.map((platform) => (
                    <span 
                      key={platform}
                      className={`text-sm px-3 py-1 rounded-full ${
                        platform === 'pc' 
                          ? 'bg-red-900/30 text-red-400' 
                          : 'bg-blue-900/30 text-blue-400'
                      }`}
                    >
                      {platform.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-6xl mx-auto px-4">
        <div id="contacts" className="h-[500px] relative bg-black rounded-xl overflow-hidden border border-red-900/30 my-12 scroll-mt-16">
          <YMaps
            query={{
              apikey: 'b1b4b147-159f-45f9-aa7e-6a999e4d5409',
              lang: 'ru_RU',
              load: 'package.full'
            }}
          >
            <Map
              defaultState={{
                center: [55.802714, 37.591480],
                zoom: 16,
                controls: []
              }}
              width="100%"
              height="100%"
              options={{
                suppressMapOpenBlock: true,
                suppressObsoleteBrowserNotifier: true,
                yandexMapDisablePoiInteractivity: true,
                styles: DARK_MAP_STYLE
              }}
            >
              <Placemark 
                geometry={[55.802714, 37.591480]}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref: '/cyber-syndicate-logo.png',
                  iconImageSize: [40, 40],
                  iconImageOffset: [-20, -20]
                }}
                properties={{
                  balloonContentBody: `
                    <div style="padding: 15px; color: #fff; background: #111; border-radius: 8px; font-family: Arial, sans-serif;">
                      <strong style="font-size: 16px; color: #ef4444;">CYBER SYNDICATE</strong><br/>
                      <span style="color: #9ca3af;">Новодмитровская улица, 2к7, Москва</span><br/>
                      <a href="tel:+79585002100" style="color: #ef4444; text-decoration: none; margin-top: 8px; display: block;">+7 (958) 500-21-00</a>
                    </div>
                  `
                }}
              />
            </Map>
          </YMaps>

          {/* Map Controls */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            <a
              href="https://yandex.ru/maps/-/CHbIyBLN"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-black/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-red-900/30 hover:bg-red-900/20 transition-colors text-white"
            >
              <MapPin className="w-5 h-5" />
              Построить маршрут
            </a>
            
            <a
              href="https://3.redirect.appmetrica.yandex.com/route?end-lat=55.802462&end-lon=37.591934&ref=partner_link&appmetrica_tracking_id=1178268795219780156"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-black/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-red-900/30 hover:bg-red-900/20 transition-colors text-white"
            >
              <Car className="w-5 h-5" />
              Вызвать такси
            </a>
          </div>

          {/* Location Info */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm p-4 rounded-xl border border-red-900/30 z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="font-bold text-lg">CYBER SYNDICATE</h3>
                <p className="text-gray-300">Новодмитровская улица, 2к7, Москва</p>
                <a href="tel:+79585002100" className="text-red-500 hover:text-red-400 transition-colors">
                  +7 (958) 500-21-00
                </a>
              </div>
              
              <div className="flex gap-2">
                <a
                  href="tel:+79585002100"
                  className="flex items-center gap-2 bg-red-900/40 hover:bg-red-900/60 border border-red-800/50 px-4 py-2 rounded-lg transition-colors"
                >
                  Позвонить
                </a>
                <a
                  href="https://yandex.ru/maps/-/CHbIyBLN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-zinc-800/40 hover:bg-zinc-800/60 border border-zinc-700/50 px-4 py-2 rounded-lg transition-colors"
                >
                  Открыть в Картах
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-red-900/20 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <Logo />
              <p className="text-gray-400">Ваш путь в мир киберспорта и игр</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Контакты</h3>
              <p className="text-gray-400">Новодмитровская улица, 2к7, Москва</p>
              <p className="text-gray-400">+7 (958) 500-21-00</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Социальные сети</h3>
              <div className="flex gap-4">
                <a 
                  href="https://vk.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-red-700 to-red-600 p-2 rounded-full hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300"
                >
                  <img src="/vk-logo.svg" alt="VK" className="w-6 h-6" />
                </a>
                <a 
                  href="https://t.me" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-red-700 to-red-600 p-2 rounded-full hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300"
                >
                  <img src="/telegram-logo.svg" alt="Telegram" className="w-6 h-6" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-red-700 to-red-600 p-2 rounded-full hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300"
                >
                  <img src="/instagram-logo.svg" alt="Instagram" className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-red-900/20 text-center text-gray-400">
            © 2024 Cyber Syndicate. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;