
import React, { useState, useMemo, useEffect } from 'react';
import { MaterialType, ModelStats, PrintConfig, PriceBreakdown } from './types';
import { MATERIALS, NOZZLE_FACTORS, NOZZLES, BASE_SETUP_FEE, LABOR_RATE, ENABLE_MULTICOLOR, PRINTER_PROFILES, DEFAULT_PRINTER } from './constants';
import { calculateModelStats, formatNumber, roundToNearest005 } from './utils/stlUtils';
import Viewer3D from './components/Viewer3D';
import { Upload, Settings, DollarSign, Box, AlertCircle, Palette, Layers, Clock, Send } from 'lucide-react';
import { Language, TRANSLATIONS, MATERIAL_DESCRIPTIONS } from './translations';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [stats, setStats] = useState<ModelStats | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lang, setLang] = useState<Language>('de');

  const t = TRANSLATIONS[lang];
  const matDesc = MATERIAL_DESCRIPTIONS[lang];

  const [config, setConfig] = useState<PrintConfig>({
    material: MaterialType.PLA,
    infill: 20,
    layerHeight: 0.2,
    quantity: 1,
    color: (MATERIALS[MaterialType.PLA].colors?.find(c => c.name === 'Black')?.hex || MATERIALS[MaterialType.PLA].colors?.[0].hex || '#000000'), // Default Black if available
    isMulticolor: false,
    nozzleSize: 0.4,
    colorsCount: 2
  });

  // ensure selected material is enabled; if not, pick first enabled material
  useEffect(() => {
    const enabledMaterials = Object.values(MATERIALS).filter(m => m.enabled !== false).map(m => m.name);
    if (enabledMaterials.length && !enabledMaterials.includes(config.material)) {
      setConfig({ ...config, material: enabledMaterials[0] as MaterialType });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ensure selected color is valid for the chosen material. If not, pick a sensible default.
  useEffect(() => {
    const available = MATERIALS[config.material].colors || [];
    if (!available.length) return;
    if (!available.some(c => c.hex === config.color)) {
      setConfig(prev => ({ ...prev, color: (available.find(c => c.name === 'Black')?.hex || available[0].hex) }));
    }
  }, [config.material]);

  const showMulticolor = ENABLE_MULTICOLOR && config.isMulticolor;

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setIsProcessing(true);
      setFile(uploadedFile);
      try {
        const result = await calculateModelStats(uploadedFile);
        setStats(result);
      } catch (err) {
        console.error(err);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const breakdown = useMemo((): PriceBreakdown => {
    if (!stats) return { materialCost: 0, laborCost: 0, machineCost: 0, printTime: 0, total: 0 };

    const material = MATERIALS[config.material];
    const infillFactor = config.infill / 100;
    
    const usedVolumeCm3 = (stats.volume / 1000) * infillFactor;
    const weightG = usedVolumeCm3 * material.density;
    const materialCostRaw = (weightG / 1000) * material.costPerKg * config.quantity;
    // Time calculations affected by nozzle, layer height, and printer profile
    const profile = PRINTER_PROFILES[DEFAULT_PRINTER] || PRINTER_PROFILES.Default;
    const baseTimeHours = (stats.volume / 10000) * profile.speedFactor; 
    const layerFactor = 0.2 / config.layerHeight; 
    const nozzleFactor = NOZZLE_FACTORS[config.nozzleSize];
    const multicolorFactor = config.isMulticolor ? profile.multicolorFactor : 1.0;

    const printTimeHours = baseTimeHours * layerFactor * infillFactor * nozzleFactor * multicolorFactor;

    // Labor cost: basic prep + multicolor complexity (adjusted by printer profile if needed)
    const multicolorLaborFlat = config.isMulticolor ? (2.5 * (config.colorsCount || 2) * (profile.multicolorFactor / 1.5)) : 0.0;
    const laborCostRaw = (0.2 * LABOR_RATE * config.quantity) + multicolorLaborFlat;

    const machineCostRaw = printTimeHours * profile.hourlyRate * config.quantity;

    // Round individual components to nearest 0.05 CHF
    const materialCost = roundToNearest005(materialCostRaw);
    const laborCost = roundToNearest005(laborCostRaw);
    const machineCost = roundToNearest005(machineCostRaw);

    const setupFee = roundToNearest005(BASE_SETUP_FEE);
    const total = roundToNearest005(setupFee + materialCost + laborCost + machineCost);

    return { materialCost, laborCost, machineCost, printTime: printTimeHours, total };
  }, [stats, config]);

  const handleSendEmail = () => {
    if (!file) return;

    const email = '3d-druck@zinit.ch';
    const subject = encodeURIComponent(`${t.emailSubject}: ${file.name}`);
    
    const colorName = config.isMulticolor ? `${config.colorsCount} colors` : (MATERIALS[config.material].colors?.find(c => c.hex === config.color)?.name || config.color);
    
    const body = encodeURIComponent(
      `${t.emailBodyHeader}\n\n` +
      `- ${t.material}: ${config.material}\n` +
      `- ${t.color}: ${colorName}\n` +
      `- ${t.multicolor}: ${config.isMulticolor ? 'Yes' : 'No'}\n` +
      `- ${t.nozzleSize}: ${config.nozzleSize}mm\n` +
      `- ${t.infill}: ${config.infill}%\n` +
      `- ${t.layerHeight}: ${config.layerHeight}mm\n` +
      `- ${t.quantity}: ${config.quantity}\n` +
      `- ${t.estTotalCost}: ${t.currency} ${formatNumber(breakdown.total)}\n\n` +
      `${t.emailBodyFooter}`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const selectedColorDisplay = config.isMulticolor
    ? t.multicolor
    : (MATERIALS[config.material].colors?.find(c => c.hex === config.color)?.name || config.color);

  const renderWarningText = (text: string) => {
    const email = '3d-druck@zinit.ch';
    const parts = text.split(email);
    if (parts.length === 1) return text;
    return (
      <>
        {parts[0]}
        <a href={`mailto:${email}`} className="underline font-medium hover:text-white transition-colors">
          {email}
        </a>
        {parts[1]}
      </>
    );
  };

  const formatDuration = (hours: number) => {
    if (hours === 0) return "0h 0m";
    const totalMinutes = Math.round(hours * 60);
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 p-4 md:p-8 selection:bg-indigo-500/30">
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            {t.title}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-neutral-900 border border-white/10 rounded-xl p-1">
            {(['de', 'fr', 'it', 'en'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === l ? 'bg-indigo-600 text-white shadow-lg' : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

            <label className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-colors px-6 py-3 rounded-xl cursor-pointer font-semibold shadow-lg shadow-indigo-500/20">
            <Upload size={20} />
            <span>{t.upload}</span>
            <input type="file" accept=".stl,.3mf,.step,.stp" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-8 space-y-6">
          <div className="relative group">
            <Viewer3D 
              file={file} 
              labels={{
                placeholderTitle: t.placeholderTitle,
                placeholderSub: t.placeholderSub,
                engineReady: t.engineReady
              }} 
            />
            {isProcessing && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-medium animate-pulse">{t.analyzing}</span>
                </div>
              </div>
            )}
          </div>

          {/** Cost Distribution Analysis removed as requested **/}
        </div>

        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-6 shadow-2xl shadow-indigo-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <DollarSign size={80} />
            </div>
            <div className="relative z-10">
              <p className="text-indigo-200 text-sm font-medium mb-1">{t.estTotalCost}</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-5xl font-black text-white">{t.currency} {formatNumber(breakdown.total)}</h3>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3 text-sm text-indigo-100">
                <div className="flex justify-between">
                  <span>{t.material} ({config.material})</span>
                  <span className="font-mono">{t.currency} {formatNumber(breakdown.materialCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.machineTime}</span>
                  <span className="font-mono">{t.currency} {formatNumber(breakdown.machineCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.laborPost}</span>
                  <span className="font-mono">{t.currency} {formatNumber(breakdown.laborCost)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/5 font-bold">
                  <span>{t.setupFee}</span>
                  <span className="font-mono">{t.currency} {formatNumber(roundToNearest005(BASE_SETUP_FEE))}</span>
                </div>
              </div>

              {file && (
                <button 
                  onClick={handleSendEmail}
                  className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 transition-all text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-emerald-900/40 group active:scale-[0.98]"
                >
                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  <span>{t.sendInquiry}</span>
                </button>
              )}
            </div>
          </div>

          {stats && (
            <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4 text-neutral-400">
                <Box size={18} />
                <h4 className="font-semibold text-sm uppercase tracking-wider">{t.modelAnalysis}</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <p className="text-xs text-neutral-500 mb-1">{t.volume}</p>
                  <p className="text-lg font-mono">{formatNumber(stats.volume / 1000)} <span className="text-xs text-neutral-600">cm³</span></p>
                </div>
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <p className="text-xs text-neutral-500 mb-1">{t.surfaceArea}</p>
                  <p className="text-lg font-mono">{formatNumber(stats.surfaceArea / 100)} <span className="text-xs text-neutral-600">cm²</span></p>
                </div>
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <p className="text-xs text-neutral-500 mb-1">{t.boundingBox}</p>
                  <p className="text-sm font-mono">{stats.boundingBox.x.toFixed(1)}x{stats.boundingBox.y.toFixed(1)}x{stats.boundingBox.z.toFixed(1)}<span className="text-xs text-neutral-600">mm</span></p>
                </div>
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <p className="text-xs text-neutral-500 mb-1">{t.printTime}</p>
                  <p className="text-lg font-mono flex items-center gap-1.5">
                    <Clock size={14} className="text-indigo-400" />
                    {formatDuration(breakdown.printTime)}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6 text-neutral-400">
              <Settings size={18} />
              <h4 className="font-semibold text-sm uppercase tracking-wider">{t.printSettings}</h4>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-500 uppercase">{t.material}</label>
                <select 
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                  value={config.material}
                  onChange={(e) => setConfig({ ...config, material: e.target.value as MaterialType })}
                >
                  {Object.values(MATERIALS).filter(m => m.enabled !== false).map(m => (
                    <option key={m.name} value={m.name} className="bg-neutral-900">{m.name}</option>
                  ))}
                </select>
                <p className="text-[10px] text-neutral-600 px-1">
                  {matDesc[config.material as keyof typeof matDesc]}
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-medium text-neutral-500 uppercase flex items-center gap-2">
                  <Palette size={14} /> {t.color}
                </label>
                <div className="mt-2 flex items-center gap-2 text-sm text-neutral-300">
                  {!config.isMulticolor && (
                    <span className="w-4 h-4 rounded-sm border" style={{ backgroundColor: config.color }} />
                  )}
                  <span className="font-medium">{selectedColorDisplay}</span>
                </div>
                {!showMulticolor ? (
                  <div className="flex flex-wrap gap-2">
                    {(MATERIALS[config.material].colors || []).map((c) => (
                      <button
                        key={c.hex}
                        onClick={() => setConfig({ ...config, color: c.hex })}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${config.color === c.hex ? 'border-indigo-500 scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-6 gap-2">
                    {[2,3,4,5,6,7].map(n => (
                      <button
                        key={n}
                        onClick={() => setConfig({ ...config, colorsCount: n })}
                        className={`py-2 rounded-lg border text-sm transition-all ${config.colorsCount === n ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400' : 'bg-black/40 border-white/10 text-neutral-500 hover:border-white/20'}`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {ENABLE_MULTICOLOR && (
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <Layers size={16} className="text-neutral-500" />
                      <span className="text-sm text-neutral-300">{t.multicolor}</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={config.isMulticolor}
                      onChange={(e) => setConfig({ ...config, isMulticolor: e.target.checked })}
                      className="w-10 h-5 bg-neutral-800 rounded-full appearance-none relative checked:bg-indigo-500 transition-all cursor-pointer before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 checked:before:translate-x-5 before:transition-transform"
                    />
                  </label>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-500 uppercase">{t.nozzleSize}</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(NOZZLES)
                    .map(k => parseFloat(k))
                    .filter(n => NOZZLES[n].enabled)
                    .map(val => (
                      <button
                        key={val}
                        onClick={() => setConfig({ ...config, nozzleSize: val as 0.2 | 0.4 | 0.6 })}
                        className={`py-2 rounded-lg border text-sm transition-all ${config.nozzleSize === val ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400' : 'bg-black/40 border-white/10 text-neutral-500 hover:border-white/20'}`}
                      >
                        {NOZZLES[val].label || val}
                      </button>
                    ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium text-neutral-500 uppercase">{t.infill}</label>
                  <span className="text-xs font-mono text-indigo-400">{config.infill}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  step="5"
                  value={config.infill}
                  onChange={(e) => setConfig({ ...config, infill: parseInt(e.target.value) })}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-500 uppercase">{t.layerHeight}</label>
                <div className="grid grid-cols-3 gap-2">
                  {[0.1, 0.2, 0.3].map(val => (
                    <button
                      key={val}
                      onClick={() => setConfig({ ...config, layerHeight: val })}
                      className={`py-2 rounded-lg border text-sm transition-all ${config.layerHeight === val ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400' : 'bg-black/40 border-white/10 text-neutral-500 hover:border-white/20'}`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-500 uppercase">{t.quantity}</label>
                <div className="flex items-center gap-4 bg-black/40 border border-white/10 rounded-xl p-2">
                  <button 
                    onClick={() => setConfig({ ...config, quantity: Math.max(1, config.quantity - 1) })}
                    className="w-10 h-10 rounded-lg hover:bg-white/5 transition-colors text-xl"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-mono text-lg">{config.quantity}</span>
                  <button 
                    onClick={() => setConfig({ ...config, quantity: config.quantity + 1 })}
                    className="w-10 h-10 rounded-lg hover:bg-white/5 transition-colors text-xl"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex gap-3">
            <AlertCircle size={20} className="text-orange-500 shrink-0 mt-0.5" />
            <p className="text-xs text-orange-200/80 leading-relaxed">
              {renderWarningText(t.warning)}
            </p>
          </div>

        </div>
      </main>

      <footer className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center text-neutral-600 text-sm">
        <p>&copy; {new Date().getFullYear()} {t.title}. {t.rights}</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="hover:text-neutral-400 transition-colors">{t.terms}</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
