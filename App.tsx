
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Cpu, 
  Monitor, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Menu, 
  X, 
  ShoppingBag,
  ExternalLink,
  Globe,
  Code,
  Layers
} from 'lucide-react';

// --- Tipos ---
interface Product {
  image: string;
  title: string;
  desc: string;
  price: string;
  category: string;
  subCategory?: string;
}

type NavTarget = 'TODOS' | 'NOTEBOOKS' | 'COMPUTADORES' | 'PERIFERICOS' | 'INICIO';

// --- Utilitários ---
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// --- Componentes ---

const Header = ({ onNavigate }: { onNavigate: (target: NavTarget, e: React.MouseEvent) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trava o scroll do body quando o menu mobile está aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    }
  }, [mobileMenuOpen]);

  const navLinks: { name: string; target: NavTarget }[] = [
    { name: 'Início', target: 'INICIO' },
    { name: 'Computadores', target: 'COMPUTADORES' },
    { name: 'Notebooks', target: 'NOTEBOOKS' },
    { name: 'Periféricos', target: 'PERIFERICOS' },
  ];

  const handleItemClick = (target: NavTarget, e: React.MouseEvent) => {
    setMobileMenuOpen(false);
    onNavigate(target, e);
  };

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
          isScrolled ? 'glass py-3 shadow-2xl' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center relative z-[110]">
          <a 
            href="#" 
            onClick={(e) => handleItemClick('INICIO', e)} 
            className="font-tech text-2xl font-bold tracking-tighter group"
          >
            TECH<span className="text-neon-blue group-hover:text-neon-green transition-colors">CORE</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href="#"
                onClick={(e) => handleItemClick(link.target, e)}
                className="text-xs font-bold hover:text-neon-blue transition-all uppercase tracking-widest relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-neon-blue after:transition-all hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Toggle Button */}
          <button 
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors active:scale-90 relative z-[120]" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 w-full h-full bg-[#020617] z-[9999] transition-opacity duration-300 md:hidden flex flex-col items-center justify-center ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="absolute top-0 w-full py-6 px-6 flex justify-between items-center border-b border-white/5 bg-[#020617]">
          <span className="font-tech text-2xl font-bold tracking-tighter">
            TECH<span className="text-neon-blue">CORE</span>
          </span>
          <button 
            className="text-white p-2" 
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={32} />
          </button>
        </div>

        <nav className="flex flex-col items-center space-y-10 px-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href="#"
              className="text-2xl font-tech uppercase tracking-widest text-white hover:text-neon-blue active:scale-95 transition-all text-center font-bold"
              onClick={(e) => handleItemClick(link.target, e)}
            >
              {link.name}
            </a>
          ))}
          <button 
             onClick={(e) => handleItemClick('TODOS', e)}
             className="mt-10 px-12 py-6 bg-neon-blue text-[#020617] font-black rounded-2xl uppercase tracking-tighter text-lg shadow-[0_0_40px_rgba(56,189,248,0.4)] active:scale-95 transition-transform"
          >
            Ver Catálogo Tech
          </button>
        </nav>
      </div>
    </>
  );
};

const Hero = ({ onCtaClick }: { onCtaClick: (e: React.MouseEvent) => void }) => (
  <section className="relative min-h-screen flex items-center pt-20 hero-gradient overflow-hidden">
    <div className="absolute top-1/4 -right-20 w-96 h-96 bg-neon-blue/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
    <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-neon-green/10 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>

    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div className="z-10 text-center md:text-left">
        <span className="inline-block py-1 px-4 mb-6 border border-neon-blue/30 rounded-full bg-neon-blue/5 text-neon-blue text-[10px] font-black tracking-[0.3em] uppercase">
          Tecnologia de Elite
        </span>
        <h1 className="text-5xl md:text-8xl font-tech font-bold leading-none mb-6">
          Poder sem <span className="text-neon-blue italic">limites</span>.
        </h1>
        <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed mx-auto md:mx-0">
          Escolha a máquina que vai elevar seu nível. De gamers a profissionais, entregamos a melhor curadoria de hardware do Brasil.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button 
            onClick={onCtaClick}
            className="px-10 py-5 bg-neon-blue hover:bg-sky-400 text-slate-950 font-black rounded-xl transition-all duration-300 flex items-center justify-center gap-3 glow-blue shadow-lg active:scale-95"
          >
            VER CATÁLOGO TECH
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <div className="relative group perspective-1000 hidden md:block">
        <div className="absolute -inset-4 bg-gradient-to-r from-neon-blue to-neon-green rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <img 
          src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=1200" 
          alt="Hardware Premium TechCore" 
          className="relative rounded-3xl object-cover w-full aspect-[4/3] shadow-2xl transition-all duration-700 group-hover:scale-[1.02] border border-white/10"
        />
      </div>
    </div>
  </section>
);

const ProductCard: React.FC<Product> = ({ image, title, desc, price }) => {
  const mlSearchLink = `https://lista.mercadolivre.com.br/${encodeURIComponent(title)}`;

  return (
    <div className="glass p-5 rounded-3xl group transition-all duration-500 hover:-translate-y-3 glow-blue flex flex-col h-full border border-white/5 hover:border-neon-blue/30">
      <div className="overflow-hidden rounded-2xl mb-5 h-56 relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <span className="text-neon-green font-black text-xs">OFFER</span>
        </div>
      </div>
      <div className="flex-grow">
        <h3 className="text-xl font-tech font-bold mb-3 group-hover:text-neon-blue transition-colors leading-tight">{title}</h3>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3">{desc}</p>
      </div>
      <div className="mt-auto pt-5 border-t border-white/5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-slate-500 text-xs uppercase font-bold tracking-widest">Preço Sugerido</span>
          <span className="text-neon-green font-black text-2xl">{price}</span>
        </div>
        <a 
          href={mlSearchLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full py-4 bg-white/5 hover:bg-neon-blue text-white hover:text-slate-950 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 group/btn active:scale-[0.98]"
        >
          COMPRAR NO MERCADO LIVRE
          <ShoppingBag size={18} className="transition-transform group-hover/btn:scale-110" />
        </a>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('TODOS');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('TODOS');

  const products: Product[] = useMemo(() => [
    // COMPUTADORES (8)
    { 
      image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=600", 
      title: "PC Gamer Dominator V1", 
      desc: "RTX 4070 Ti 12GB, Intel i7-14700K, 32GB RAM DDR5 6000MHz, SSD 2TB NVMe Gen4.", 
      price: "R$ 8.490", 
      category: 'COMPUTADORES' 
    },
    { 
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600", 
      title: "PC Elite 4K Beast", 
      desc: "RTX 4090, i9-14900KS, Watercooling Custom. Performance sem compromissos.", 
      price: "R$ 18.490", 
      category: 'COMPUTADORES' 
    },
    { 
      image: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?auto=format&fit=crop&q=80&w=600", 
      title: "Setup Office Pro", 
      desc: "Processador i5, 16GB RAM, SSD 1TB. Estabilidade e velocidade para o dia a dia.", 
      price: "R$ 2.990", 
      category: 'COMPUTADORES' 
    },
    { 
      image: "https://images.unsplash.com/photo-1593640495253-23196b27a05f?auto=format&fit=crop&q=80&w=600", 
      title: "Workstation Pro X", 
      desc: "Ryzen Threadripper PRO, 128GB RAM ECC, Dual RTX 6000 Ada. O ápice para renderização 3D.", 
      price: "R$ 45.000", 
      category: 'COMPUTADORES' 
    },
    { 
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=600", 
      title: "Mini PC Nano Tech", 
      desc: "i7 Ultra, 32GB RAM, 1TB SSD em apenas 10cm. Potência invisível para seu setup minimalista.", 
      price: "R$ 3.850", 
      category: 'COMPUTADORES' 
    },
    { 
      image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&q=80&w=600", 
      title: "Streamer Station V2", 
      desc: "i9 14th Gen, Placa de captura 4K embutida, 64GB RAM. Feito para transmitir sem lag.", 
      price: "R$ 11.200", 
      category: 'COMPUTADORES' 
    },
    { 
      image: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?auto=format&fit=crop&q=80&w=600", 
      title: "Gamer Entry Level", 
      desc: "RTX 3060, i5-12400F, 16GB RAM. A porta de entrada perfeita para o mundo 1080p Ultra.", 
      price: "R$ 4.150", 
      category: 'COMPUTADORES' 
    },
    { 
      image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=600", 
      title: "Workstation AI Dev", 
      desc: "Otimizada para Machine Learning. RTX 4080 Super, 64GB RAM, Linux Pre-installed.", 
      price: "R$ 13.900", 
      category: 'COMPUTADORES' 
    },
    // NOTEBOOKS (8)
    { 
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600", 
      title: "Notebook Pro Elite 16\"", 
      desc: "MacBook Killer. i9 13th Gen, RTX 4060, Tela 4K OLED, Bateria 99Wh.", 
      price: "R$ 6.199", 
      category: 'NOTEBOOKS' 
    },
    { 
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=600", 
      title: "Laptop Gamer Nitro Z", 
      desc: "Ryzen 9 7945HX, RTX 4080 Mobile, Tela 165Hz QHD. O topo do gaming portátil.", 
      price: "R$ 12.500", 
      category: 'NOTEBOOKS' 
    },
    { 
      image: "https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?auto=format&fit=crop&q=80&w=600", 
      title: "Ultrabook Carbon Air 13\"", 
      desc: "Design em fibra de carbono, i7 de ultra baixo consumo, 18h de bateria. Peso: 900g.", 
      price: "R$ 5.800", 
      category: 'NOTEBOOKS' 
    },
    { 
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=600", 
      title: "Workstation Mobile Precision", 
      desc: "RTX A3000 certificada, 64GB RAM, Tela 100% Adobe RGB. Para engenheiros e designers.", 
      price: "R$ 15.200", 
      category: 'NOTEBOOKS' 
    },
    { 
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600", 
      title: "Notebook Slim Creator 14\"", 
      desc: "Otimizado para edição de vídeo. i7 13th Gen, 32GB RAM, Tela calibrada de fábrica.", 
      price: "R$ 7.400", 
      category: 'NOTEBOOKS' 
    },
    { 
      image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=600", 
      title: "Notebook Ultra Slim Go", 
      desc: "O melhor custo benefício para estudantes. Ryzen 5, 16GB RAM, SSD 512GB.", 
      price: "R$ 3.100", 
      category: 'NOTEBOOKS' 
    },
    { 
      image: "https://images.unsplash.com/photo-1514328525431-eac296c00d27?auto=format&fit=crop&q=80&w=600", 
      title: "MacBook Pro Style M3", 
      desc: "Eficiência energética imbatível. Processador ARM de 8 núcleos, Tela Liquid Retina.", 
      price: "R$ 9.900", 
      category: 'NOTEBOOKS' 
    },
    { 
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=600", 
      title: "Notebook Office Go Plus", 
      desc: "Focado em durabilidade. Corpo em liga de magnésio, teclado resistente a respingos.", 
      price: "R$ 4.250", 
      category: 'NOTEBOOKS' 
    },
    // PERIFERICOS -> MOUSE (8)
    { 
      image: "https://images.unsplash.com/photo-1527814732934-94a85e4839d9?auto=format&fit=crop&q=80&w=600", 
      title: "Mouse Precision Elite", 
      desc: "26.000 DPI, Sensor Óptico de Próxima Geração, 60g de peso. O sonho do pro-player FPS.", 
      price: "R$ 490", 
      category: 'PERIFERICOS',
      subCategory: 'MOUSE'
    },
    { 
      image: "https://images.unsplash.com/photo-1615663248861-2446a855502a?auto=format&fit=crop&q=80&w=600", 
      title: "Mouse Gamer RGB Neon", 
      desc: "Custo benefício extremo. Sensor estável, 8000 DPI, cabo trançado e iluminação vibrante.", 
      price: "R$ 150", 
      category: 'PERIFERICOS',
      subCategory: 'MOUSE'
    },
    { 
      image: "https://images.unsplash.com/photo-1563297007-0686b7003af7?auto=format&fit=crop&q=80&w=600", 
      title: "Mouse Wireless Ultralight X", 
      desc: "Conexão 2.4GHz sem latência, peso de 52g, bateria para 70h de gameplay intenso.", 
      price: "R$ 780", 
      category: 'PERIFERICOS',
      subCategory: 'MOUSE'
    },
    { 
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600", 
      title: "Mouse Ergonômico Vertical", 
      desc: "Reduz o cansaço do punho. Design anatômico a 57 graus, ideal para longas horas de trabalho.", 
      price: "R$ 320", 
      category: 'PERIFERICOS',
      subCategory: 'MOUSE'
    },
    { 
      image: "https://images.unsplash.com/photo-1527860299272-3abc6230f69f?auto=format&fit=crop&q=80&w=600", 
      title: "Mouse MMO Pro Hero", 
      desc: "12 botões laterais programáveis, macros ilimitadas. Essencial para RPGs e fluxos produtivos.", 
      price: "R$ 550", 
      category: 'PERIFERICOS',
      subCategory: 'MOUSE'
    },
    { 
      image: "https://images.unsplash.com/photo-1599387737834-60e03e7e0242?auto=format&fit=crop&q=80&w=600", 
      title: "Mouse Ambidestro Stealth", 
      desc: "Design simétrico perfeito para canhotos ou destros. Switches ópticos ultra silenciosos.", 
      price: "R$ 410", 
      category: 'PERIFERICOS',
      subCategory: 'MOUSE'
    },
    { 
      image: "https://images.unsplash.com/photo-1629429464245-48749429398a?auto=format&fit=crop&q=80&w=600", 
      title: "Mouse Retro Classic", 
      desc: "Visual nostálgico dos anos 90 com hardware moderno de 16000 DPI. Estilo único no setup.", 
      price: "R$ 290", 
      category: 'PERIFERICOS',
      subCategory: 'MOUSE'
    },
    { 
      image: "https://images.unsplash.com/photo-1551135020-39e4ca508d9e?auto=format&fit=crop&q=80&w=600", 
      title: "Mouse Trackball Expert", 
      desc: "Controle absoluto sem mover o braço. Scroll ring patenteado, conforto máximo industrial.", 
      price: "R$ 680", 
      category: 'PERIFERICOS',
      subCategory: 'MOUSE'
    },
    // PERIFERICOS -> TECLADO (8)
    { 
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600", 
      title: "Teclado Mecânico Pro X", 
      desc: "Switches Hot-swap, RGB Chroma, Construção em Alumínio Aeroespacial. Latência zero.", 
      price: "R$ 850", 
      category: 'PERIFERICOS',
      subCategory: 'TECLADO'
    },
    { 
      image: "https://images.unsplash.com/photo-1616410224348-5117ad7f7313?auto=format&fit=crop&q=80&w=600", 
      title: "Teclado RGB Stealth", 
      desc: "Silent switches, design minimalista, conexão wireless tri-mode. Discreto e letal.", 
      price: "R$ 620", 
      category: 'PERIFERICOS',
      subCategory: 'TECLADO'
    },
    { 
      image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=600", 
      title: "Teclado Custom Elite G60", 
      desc: "Switches Gateron lubrificados, keycaps PBT Double-shot, estrutura em alumínio maciço. O ápice da experiência tátil.", 
      price: "R$ 1.150", 
      category: 'PERIFERICOS',
      subCategory: 'TECLADO'
    },
    { 
      image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=600", 
      title: "Teclado 60% Ghost Edition", 
      desc: "Design ultra compacto, cabo espiralado incluso, iluminação RGB sob as teclas. Ganhe espaço no seu mousepad.", 
      price: "R$ 480", 
      category: 'PERIFERICOS',
      subCategory: 'TECLADO'
    },
    { 
      image: "https://images.unsplash.com/photo-1618384800394-22121990c092?auto=format&fit=crop&q=80&w=600", 
      title: "Teclado Low Profile Slim", 
      desc: "Switches mecânicos de perfil baixo, apenas 20mm de altura. Agilidade máxima com conforto superior.", 
      price: "R$ 720", 
      category: 'PERIFERICOS',
      subCategory: 'TECLADO'
    },
    { 
      image: "https://images.unsplash.com/photo-1626956083953-27593bc14f6b?auto=format&fit=crop&q=80&w=600", 
      title: "Teclado Óptico Speedforce", 
      desc: "Atuadores ópticos com 1.0mm de curso. O tempo de resposta mais rápido do mercado para jogos competitivos.", 
      price: "R$ 980", 
      category: 'PERIFERICOS',
      subCategory: 'TECLADO'
    },
    { 
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83aca2?auto=format&fit=crop&q=80&w=600", 
      title: "Teclado Ergonômico Wave", 
      desc: "Design em onda para posição natural do punho. Descanso de mão acolchoado e switches silenciosos.", 
      price: "R$ 540", 
      category: 'PERIFERICOS',
      subCategory: 'TECLADO'
    },
    { 
      image: "https://images.unsplash.com/photo-1560762484-813fc97650a0?auto=format&fit=crop&q=80&w=600", 
      title: "Teclado Wireless Master K8", 
      desc: "Conectividade tri-mode (Bluetooth, 2.4G, Cabo). Bateria para 200h e compatibilidade total com Mac e Windows.", 
      price: "R$ 890", 
      category: 'PERIFERICOS',
      subCategory: 'TECLADO'
    },
    // PERIFERICOS -> MONITOR (8)
    { 
      image: "https://images.unsplash.com/photo-1558977551-d0df18930994?auto=format&fit=crop&q=80&w=600", 
      title: "Monitor Curvo 165Hz", 
      desc: "27 polegadas, 1ms de resposta, Cores sRGB 120%. Imersão total para gaming competitivo.", 
      price: "R$ 1.290", 
      category: 'PERIFERICOS',
      subCategory: 'MONITOR'
    },
    { 
      image: "https://images.unsplash.com/photo-1527860299272-3abc6230f69f?auto=format&fit=crop&q=80&w=600", 
      title: "Monitor Ultrawide 34\"", 
      desc: "Resolução 1440p, taxa de atualização 144Hz. Espaço de sobra para produtividade e jogos ultra-imersivos.", 
      price: "R$ 3.490", 
      category: 'PERIFERICOS',
      subCategory: 'MONITOR'
    },
    { 
      image: "https://images.unsplash.com/photo-1547119957-637f8679db1e?auto=format&fit=crop&q=80&w=600", 
      title: "Monitor 4K Studio 32\"", 
      desc: "Painel IPS com 99% DCI-P3, HDR 600. Calibrado de fábrica para precisão absoluta em cores.", 
      price: "R$ 4.800", 
      category: 'PERIFERICOS',
      subCategory: 'MONITOR'
    },
    { 
      image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=600", 
      title: "Monitor OLED Gaming 240Hz", 
      desc: "Contraste infinito e 0.03ms de resposta. A melhor experiência visual disponível para entusiastas.", 
      price: "R$ 6.990", 
      category: 'PERIFERICOS',
      subCategory: 'MONITOR'
    },
    { 
      image: "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?auto=format&fit=crop&q=80&w=600", 
      title: "Super Ultrawide 49\" QLED", 
      desc: "Equivalente a dois monitores de 27\", curva de 1000R. Multitarefa levado ao extremo.", 
      price: "R$ 8.250", 
      category: 'PERIFERICOS',
      subCategory: 'MONITOR'
    },
    { 
      image: "https://images.unsplash.com/photo-1551739440-5dd934d3a94a?auto=format&fit=crop&q=80&w=600", 
      title: "Monitor Portátil 15.6\" Touch", 
      desc: "Painel Full HD, conexão USB-C única. Perfeito para segunda tela em viagens ou apresentações.", 
      price: "R$ 1.150", 
      category: 'PERIFERICOS',
      subCategory: 'MONITOR'
    },
    { 
      image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&q=80&w=600", 
      title: "Competitive 360Hz Esports", 
      desc: "Painel Fast IPS, taxa de atualização de elite. Utilizado pelos maiores pro-players do mundo.", 
      price: "R$ 3.890", 
      category: 'PERIFERICOS',
      subCategory: 'MONITOR'
    },
    { 
      image: "https://images.unsplash.com/photo-1616763355603-9755a640a287?auto=format&fit=crop&q=80&w=600", 
      title: "Monitor Vertical Ergo", 
      desc: "Base pivotante completa 90 graus. Ideal para programação e leitura de documentos longos.", 
      price: "R$ 1.650", 
      category: 'PERIFERICOS',
      subCategory: 'MONITOR'
    },
    // PERIFERICOS -> PLACA DE VIDEO (8)
    { 
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=600", 
      title: "Placa de Vídeo RTX 4080", 
      desc: "Tecnologia DLSS 3, Ray Tracing avançado, 16GB GDDR6X. A evolução do processamento visual em alta escala.", 
      price: "R$ 7.200", 
      category: 'PERIFERICOS',
      subCategory: 'PLACA DE VIDEO'
    },
    { 
      image: "https://images.unsplash.com/photo-1632759162353-1999aa29824b?auto=format&fit=crop&q=80&w=600", 
      title: "Placa RTX 4090 Extreme", 
      desc: "24GB GDDR6X, o monstro definitivo do 4K. Performance bruta para IA, render 3D e jogos no ultra.", 
      price: "R$ 13.500", 
      category: 'PERIFERICOS',
      subCategory: 'PLACA DE VIDEO'
    },
    { 
      image: "https://images.unsplash.com/photo-1587202392491-e0e0c5963920?auto=format&fit=crop&q=80&w=600", 
      title: "RTX 4070 Super Edition", 
      desc: "12GB GDDR6X, equilíbrio perfeito para 1440p. Eficiência energética de ponta com suporte a DLSS 3.5.", 
      price: "R$ 4.200", 
      category: 'PERIFERICOS',
      subCategory: 'PLACA DE VIDEO'
    },
    { 
      image: "https://images.unsplash.com/photo-1591489383431-70233479698d?auto=format&fit=crop&q=80&w=600", 
      title: "AMD Radeon RX 7900 XTX", 
      desc: "24GB VRAM, a topo de linha da AMD. Excelente custo-benefício para quem busca performance pura em rasterização.", 
      price: "R$ 6.800", 
      category: 'PERIFERICOS',
      subCategory: 'PLACA DE VIDEO'
    },
    { 
      image: "https://images.unsplash.com/photo-1555617766-c94804975da3?auto=format&fit=crop&q=80&w=600", 
      title: "Radeon RX 7800 XT OC", 
      desc: "16GB VRAM, ideal para rodar tudo no ultra in QHD. Design térmico otimizado para sessões intensas.", 
      price: "R$ 3.600", 
      category: 'PERIFERICOS',
      subCategory: 'PLACA DE VIDEO'
    },
    { 
      image: "https://images.unsplash.com/photo-1544265852-a41581cab49a?auto=format&fit=crop&q=80&w=600", 
      title: "RTX 4060 Ti Master", 
      desc: "8GB GDDR6, a rainha do 1080p competitivo. Baixo consumo e suporte completo às novas tecnologias NVIDIA.", 
      price: "R$ 2.450", 
      category: 'PERIFERICOS',
      subCategory: 'PLACA DE VIDEO'
    },
    { 
      image: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&q=80&w=600", 
      title: "Intel Arc A770 16GB", 
      desc: "A alternativa inovadora. Ótima para produtividade e criadores de conteúdo com suporte nativo a AV1.", 
      price: "R$ 2.100", 
      category: 'PERIFERICOS',
      subCategory: 'PLACA DE VIDEO'
    },
    { 
      image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=600", 
      title: "Radeon RX 7600 Speed", 
      desc: "8GB VRAM, a melhor option de entrada atual. Rode seus jogos favoritos com fluidez sem pesar no orçamento.", 
      price: "R$ 1.850", 
      category: 'PERIFERICOS',
      subCategory: 'PLACA DE VIDEO'
    }
  ], []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'TODOS') {
      return shuffleArray(products).slice(0, 8);
    }
    
    let result = products;
    
    if (activeCategory !== 'TODOS') {
      result = result.filter(p => p.category === activeCategory);
    }
    
    if (activeCategory === 'PERIFERICOS') {
      if (activeSubCategory === 'TODOS') {
        return shuffleArray(result).slice(0, 8);
      } else {
        result = result.filter(p => p.subCategory === activeSubCategory);
      }
    }
    
    return result;
  }, [activeCategory, activeSubCategory, products]);

  const categories = ['TODOS', 'NOTEBOOKS', 'COMPUTADORES', 'PERIFERICOS'];
  const subCategories = [
    { name: 'TODOS', value: 'TODOS' },
    { name: 'MOUSE', value: 'MOUSE' },
    { name: 'TECLADO', value: 'TECLADO' },
    { name: 'MONITOR', value: 'MONITOR' },
    { name: 'PLACA DE VÍDEO', value: 'PLACA DE VIDEO' }
  ];

  const handleNavigation = useCallback((target: NavTarget, e: React.MouseEvent) => {
    e.preventDefault();
    
    if (target === 'INICIO') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveCategory('TODOS');
      setActiveSubCategory('TODOS');
    } else {
      setActiveCategory(target);
      setActiveSubCategory('TODOS');
      setTimeout(() => {
        const targetEl = document.getElementById('produtos');
        if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-neon-blue selection:text-slate-950 overflow-x-hidden">
      <Header onNavigate={handleNavigation} />
      <Hero onCtaClick={(e) => handleNavigation('TODOS', e)} />

      {/* Benefits Section */}
      <section className="py-24 bg-slate-950 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { icon: <Zap />, title: "Turbo Boost", desc: "Máquinas configuradas para extrair cada MHz extra." },
              { icon: <Cpu />, title: "Hardware Gen-X", desc: "Apenas componentes de última geração garantidos." },
              { icon: <ShoppingBag />, title: "Preço Real", desc: "Análise algorítmica do melhor custo do dia." },
              { icon: <ShieldCheck />, title: "Safe Trade", desc: "Proteção total Mercado Pago em cada clique." }
            ].map((item, idx) => (
              <div key={idx} className="group hover:bg-white/5 p-8 rounded-3xl transition-all duration-300 border border-transparent hover:border-white/10">
                <div className="mb-6 text-neon-blue group-hover:text-neon-green transition-colors transform group-hover:scale-110 duration-300">
                  {React.cloneElement(item.icon as React.ReactElement<any>, { size: 40 })}
                </div>
                <h4 className="text-xl font-tech font-bold mb-3 uppercase tracking-tighter">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section id="produtos" className="py-24 scroll-mt-24 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-16 gap-8 text-center lg:text-left">
            <div>
              <h2 className="text-4xl md:text-6xl font-tech font-bold mb-4 tracking-tight">Equipamento de <span className="text-neon-blue">Missão</span></h2>
              <p className="text-slate-400 max-w-xl">Filtre por categoria e encontre o hardware que vai transformar seu workflow ou gameplay.</p>
            </div>
            <div className="flex flex-col items-center lg:items-end gap-6">
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setActiveSubCategory('TODOS');
                    }}
                    className={`px-6 py-3 rounded-2xl text-[11px] font-black transition-all duration-500 uppercase tracking-widest active:scale-90 ${
                      activeCategory === cat 
                      ? 'bg-neon-blue text-slate-950 glow-blue shadow-lg shadow-sky-500/20 translate-y-[-2px]' 
                      : 'glass text-slate-400 hover:text-white hover:border-neon-blue/50 border border-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              
              {/* Sub-filters for PERIFERICOS */}
              <div className={`flex flex-wrap gap-2 justify-center transition-all duration-500 overflow-hidden ${activeCategory === 'PERIFERICOS' ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                {subCategories.map(sub => (
                  <button 
                    key={sub.value}
                    onClick={() => setActiveSubCategory(sub.value)}
                    className={`px-4 py-2 rounded-xl text-[9px] font-black transition-all duration-300 uppercase tracking-[0.15em] ${
                      activeSubCategory === sub.value 
                      ? 'bg-white text-slate-950 shadow-md translate-y-[-1px]' 
                      : 'bg-white/5 text-slate-500 hover:text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((p, i) => (
              <ProductCard key={p.title + i} {...p} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-32 glass rounded-[3rem] border-dashed border-2 border-white/10">
              <Cpu className="mx-auto text-slate-700 mb-6 animate-bounce" size={64} />
              <p className="text-slate-500 font-tech text-xl uppercase italic">Atualizando estoque para esta categoria...</p>
            </div>
          )}
        </div>
      </section>

      {/* Educational Section */}
      <section className="py-24 bg-slate-900/40 relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="glass p-12 md:p-20 rounded-[3rem] border border-white/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <Cpu size={300} />
             </div>
             <h2 className="text-4xl md:text-5xl font-tech font-bold mb-12 relative z-10">Manual de <span className="text-neon-green">Sobrevivência</span> Tech</h2>
             
             <div className="grid md:grid-cols-2 gap-12 relative z-10">
                <div className="space-y-6">
                  <h3 className="text-2xl font-tech font-bold text-neon-blue">A Mentira dos GHz</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">Não se engane por números altos de clock. O que importa em 2024 é a **Arquitetura** e o **Cache L3**. Um processador moderno de 3.5GHz destrói um antigo de 5.0GHz.</p>
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl font-tech font-bold text-neon-green">O Gargalo da RAM</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">Para produtividade pesada e games AAA, **32GB DDR5** se tornou o novo padrão. Menos que isso e seu SSD começará a ser usado como memória temporária, reduzindo a vida útil do hardware.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden bg-slate-950">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-block p-2 bg-neon-green/10 rounded-2xl mb-8 animate-bounce">
            <Zap className="text-neon-green" size={48} />
          </div>
          <h2 className="text-5xl md:text-8xl font-tech font-bold mb-10 tracking-tighter">SUA EVOLUÇÃO COMEÇA <span className="text-neon-blue">AQUI</span></h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
            Junte-se a milhares de profissionais e gamers que confiam na curadoria TechCore.
          </p>
          <button 
            onClick={(e) => handleNavigation('TODOS', e)}
            className="inline-flex items-center gap-4 px-16 py-6 bg-white text-slate-950 font-black rounded-2xl hover:bg-neon-blue transition-all duration-500 transform hover:scale-105 active:scale-95 glow-blue shadow-2xl uppercase tracking-tighter text-lg"
          >
            INICIAR UPGRADE
            <ArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* Network / Other Sites Section */}
      <section className="py-24 border-t border-white/5 bg-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-tech font-bold mb-4 tracking-tight text-white/90 uppercase">Ecossistema <span className="text-neon-blue">TechCore</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Explore outros projetos e plataformas desenvolvidos com o mesmo rigor técnico e paixão por tecnologia.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "BYTEFLOW", 
                desc: "Agência especializada em desenvolvimento de software de alta performance e escalabilidade.", 
                icon: <Code size={32} />, 
                color: "text-neon-blue", 
                link: "#" 
              },
              { 
                title: "CODEPULSE", 
                desc: "Seu portal diário de notícias, tutoriais e insights profundos sobre o futuro da programação.", 
                icon: <Globe size={32} />, 
                color: "text-neon-green", 
                link: "#" 
              },
              { 
                title: "DEVSPHERE", 
                desc: "A maior comunidade de desenvolvedores do Brasil, focada em networking e crescimento profissional.", 
                icon: <Layers size={32} />, 
                color: "text-purple-400", 
                link: "#" 
              }
            ].map((site, idx) => (
              <a 
                key={idx} 
                href={site.link}
                className="glass p-8 rounded-3xl group transition-all duration-500 hover:bg-white/5 border border-white/5 hover:border-white/10 flex flex-col items-center text-center relative overflow-hidden active:scale-[0.98]"
              >
                <div className={`mb-6 ${site.color} group-hover:scale-110 transition-transform duration-500`}>
                  {site.icon}
                </div>
                <h4 className="text-xl font-tech font-bold mb-4 tracking-tighter text-white/80">{site.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{site.desc}</p>
                <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-neon-blue transition-colors">
                  Acessar Projeto <ExternalLink size={12} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-black border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <a 
                href="#" 
                onClick={(e) => handleNavigation('INICIO', e)}
                className="font-tech text-3xl font-bold tracking-tighter mb-8 block"
              >
                TECH<span className="text-neon-blue">CORE</span>
              </a>
              <p className="text-slate-500 text-lg leading-relaxed max-w-md">
                Líder em curadoria de hardware de alta performance no Brasil. Transformamos complexidade técnica em decisões inteligentes.
              </p>
            </div>
            <div>
              <h5 className="font-tech font-bold mb-8 text-slate-300 uppercase tracking-[0.2em] text-xs">Navegação</h5>
              <ul className="space-y-4 text-slate-500 text-sm font-bold uppercase tracking-widest">
                <li><a href="#" onClick={(e) => handleNavigation('INICIO', e)} className="hover:text-neon-blue transition-colors flex items-center gap-2"><ArrowRight size={14}/> Início</a></li>
                <li><a href="#" onClick={(e) => handleNavigation('COMPUTADORES', e)} className="hover:text-neon-blue transition-colors flex items-center gap-2"><ArrowRight size={14}/> Computadores</a></li>
                <li><a href="#" onClick={(e) => handleNavigation('NOTEBOOKS', e)} className="hover:text-neon-blue transition-colors flex items-center gap-2"><ArrowRight size={14}/> Notebooks</a></li>
                <li><a href="#" onClick={(e) => handleNavigation('PERIFERICOS', e)} className="hover:text-neon-blue transition-colors flex items-center gap-2"><ArrowRight size={14}/> Periféricos</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-tech font-bold mb-8 text-slate-300 uppercase tracking-[0.2em] text-xs">Conectividade</h5>
              <div className="flex gap-4 mb-8">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:text-neon-blue hover:border-neon-blue transition-all cursor-pointer group">
                  <Cpu size={20} className="group-hover:scale-110 transition-transform" />
                </div>
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:text-neon-blue hover:border-neon-blue transition-all cursor-pointer group">
                  <Zap size={20} className="group-hover:scale-110 transition-transform" />
                </div>
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:text-neon-blue hover:border-neon-blue transition-all cursor-pointer group">
                  <Monitor size={20} className="group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <p className="text-slate-600 text-[10px] leading-relaxed italic border-l border-white/10 pl-4">
                Programa de Afiliados Mercado Livre: Ganhamos comissão sobre compras qualificadas sem custo adicional para você.
              </p>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-700 text-[10px] uppercase tracking-[0.3em] font-black">
            <p>&copy; {new Date().getFullYear()} TECHCORE LABS • PERFORMANCE ENGINNERING</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">POLÍTICA DE PRIVACIDADE</a>
              <a href="#" className="hover:text-white transition-colors">TERMOS DE USO</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
