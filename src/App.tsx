/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, Zap, Shield, Wand2, RefreshCw, Smartphone, Wifi, Coffee, Cat } from 'lucide-react';

interface KhodamResult {
  name: string;
  khodam: string;
  description: string;
  auraColor: string;
  auraText: string;
}

const KHODAMS = [
  { name: 'Kucing Oren Tantrum', description: 'Memiliki aura kekacauan murni dan nafsu makan tak terbatas. Berpotensi menguasai dunia (atau minimal kursi tamu kamu).', icon: <Cat className="w-8 h-8 text-orange-400" /> },
  { name: 'Pecel Lele Kesiangan', description: 'Sangat santai namun sering terlambat dalam segala hal. Aromanya menenangkan tapi lambat merambat.', icon: <Sparkles className="w-8 h-8 text-yellow-400" /> },
  { name: 'Kabel Charger Putus', description: 'Hubunganmu dengannya sering tidak stabil. Perlu digoyang dulu baru nyambung, persis kayak hubungan mantan.', icon: <Zap className="w-8 h-8 text-blue-400" /> },
  { name: 'Sinyal E', description: 'Sabar tingkat dewa. Bergerak sangat pelan namun pasti akan membuat orang sekitar kamu frustasi.', icon: <Wifi className="w-8 h-8 text-red-400" /> },
  { name: 'Remote TV Hilang', description: 'Selalu ada saat tidak dicari, menghilang secara misterius saat dibutuhkan. Master of hide and seek.', icon: <Smartphone className="w-8 h-8 text-slate-400" /> },
  { name: 'Gorengan Dingin', description: 'Kurang gairah di pagi hari, tapi tetap menjadi pilihan darurat saat dompet sudah menipis.', icon: <Coffee className="w-8 h-8 text-amber-600" /> },
  { name: 'Galon Kosong', description: 'Selalu berisik saat ada masalah kecil, sangat vokal namun sebenarnya butuh diisi dengan kasih sayang.', icon: <Shield className="w-8 h-8 text-blue-300" /> },
  { name: 'Setrikaan Nyala', description: 'Panas di dalam tapi tetap tenang di luar. Sangat berbahaya jika kamu terlalu dekat dengannya saat emosi.', icon: <Zap className="w-8 h-8 text-red-500" /> },
  { name: 'Kurir Paket Salah Alamat', description: 'Sering salah paham terhadap instruksi, namun niatnya selalu baik meskipun hasilnya membingungkan.', icon: <Wand2 className="w-8 h-8 text-green-400" /> },
  { name: 'Tutup Odol Ilang', description: 'Kecil tapi dampaknya bikin berantakan kemana-mana. Master of "hal sepele yang merusak suasana".', icon: <Zap className="w-8 h-8 text-purple-400" /> },
];

const AURAS = [
  { gradient: 'from-blue-500 to-cyan-400', text: 'Aura Futuristik', color: '#22d3ee' },
  { gradient: 'from-purple-600 to-pink-500', text: 'Aura Ethereal', color: '#ec4899' },
  { gradient: 'from-orange-500 to-yellow-400', text: 'Aura Membara', color: '#fbbf24' },
  { gradient: 'from-green-500 to-emerald-400', text: 'Aura Alami (sedikit lag)', color: '#34d399' },
  { gradient: 'from-red-600 to-rose-400', text: 'Aura Brutal', color: '#fb7185' },
  { gradient: 'from-indigo-500 to-purple-400', text: 'Aura Mystical', color: '#a855f7' },
];

export default function App() {
  const [userName, setUserName] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleScan = () => {
    if (!userName.trim()) return;

    setIsScanning(true);
    setResult(null);

    // Simulate scanning for 3 seconds
    setTimeout(() => {
      const randomKhodamIdx = Math.floor(Math.random() * KHODAMS.length);
      const randomAuraIdx = Math.floor(Math.random() * AURAS.length);
      
      const khodam = KHODAMS[randomKhodamIdx];
      const aura = AURAS[randomAuraIdx];

      setResult({
        name: userName,
        khodam: khodam.name,
        description: khodam.description,
        auraGradient: aura.gradient,
        auraText: aura.text,
        auraColor: aura.color
      });
      setIsScanning(false);
    }, 3000);
  };

  const handleReset = () => {
    setUserName('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 selection:bg-cyan-500/30 font-sans">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <header className="text-center mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block p-3 rounded-full bg-slate-900 border border-slate-800 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
          >
            <Sparkles className="w-8 h-8 text-cyan-400" />
          </motion.div>
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
            KHODAM DETECTOR
          </h1>
          <p className="text-slate-400 font-medium">Temukan Entitas Digital yang Mengawalmu</p>
        </header>

        <AnimatePresence mode="wait">
          {!result && !isScanning && (
            <motion.div
              key="input-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest text-slate-500 font-bold mb-2 ml-1">
                    Identitas Subjek
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Masukkan Nama Kamu (Mantan juga boleh)"
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all text-lg placeholder:text-slate-600"
                    onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                  />
                </div>

                <button
                  onClick={handleScan}
                  disabled={!userName.trim()}
                  className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 group relative overflow-hidden transition-all duration-300 ${
                    userName.trim() 
                    ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] cursor-pointer' 
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <span className="relative z-10">SCAN SEKARANG</span>
                  <Zap className={`w-5 h-5 relative z-10 transition-transform ${userName.trim() ? "group-hover:scale-125" : ""}`} />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                </button>
              </div>
            </motion.div>
          )}

          {isScanning && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-12 rounded-3xl shadow-2xl flex flex-col items-center justify-center space-y-8 relative overflow-hidden"
            >
              <div className="relative w-32 h-32">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-t-cyan-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border-2 border-t-pink-500 border-r-transparent border-b-cyan-500 border-l-transparent rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Search className="w-10 h-10 text-cyan-400 animate-pulse" />
                </div>
              </div>

              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-white animate-pulse">MEMINDAI AURA...</h2>
                <div className="flex gap-1 justify-center">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [8, 20, 8] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                      className="w-1 bg-cyan-500 rounded-full"
                    />
                  ))}
                </div>
                <p className="text-slate-500 text-sm font-mono mt-4">Analisa metafisika sedang berlangsung untuk {userName}</p>
              </div>
              
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1)_0%,transparent_70%)] animate-pulse" />
            </motion.div>
          )}

          {result && !isScanning && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              {/* Result Aura Background */}
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${result.auraGradient} shadow-[0_4px_15px_-3px_rgba(0,0,0,0.3)]`} />
              <div className={`absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br ${result.auraGradient} opacity-20 blur-3xl rounded-full`} />
              
              <div className="relative text-center">
                <div className="mb-6 flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
                    className={`p-6 rounded-2xl bg-gradient-to-br ${result.auraGradient} shadow-lg shadow-black/20`}
                  >
                    {KHODAMS.find(k => k.name === result.khodam)?.icon || <Sparkles className="w-10 h-10 text-white" />}
                  </motion.div>
                </div>

                <div className="space-y-1 mb-6">
                  <span 
                    className="text-[10px] uppercase tracking-[0.3em] font-black px-3 py-1 rounded-full border border-current mb-2 inline-block bg-white/5 opacity-80" 
                    style={{ color: result.auraColor }}
                  >
                    {result.auraText}
                  </span>
                  <h3 className="text-slate-400 text-sm font-medium">Khodam Pendamping {result.name}:</h3>
                  <h2 className="text-3xl font-black text-white tracking-tight uppercase">
                    {result.khodam}
                  </h2>
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl mb-8 relative"
                >
                  <p className="text-slate-300 leading-relaxed text-sm italic">
                    "{result.description}"
                  </p>
                  <div className="absolute -top-3 -left-3">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-6 h-6 text-yellow-500/50" />
                    </motion.div>
                  </div>
                </motion.div>

                <button
                  onClick={handleReset}
                  className="px-8 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 hover:text-white transition-all flex items-center gap-2 mx-auto border border-slate-700 shadow-xl group"
                >
                  <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  COBA LAGI
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-12 text-center text-slate-600 text-xs tracking-wider font-mono">
          <p>© 2026 KHODAM SYSTEM v2.0 // ENCRYPTION: ACTIVE</p>
          <p className="mt-1">DISCLAIMER: HANYA UNTUK HEY KOK KAMU SERIUS AMAT SIH</p>
        </footer>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
}
