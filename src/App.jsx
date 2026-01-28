import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Trash2, 
  Download, 
  Briefcase, 
  User, 
  Layers, 
  Calendar, 
  CreditCard, 
  PenTool, 
  CheckCircle2,
  RefreshCcw
} from 'lucide-react';

// --- Signature Pad Component ---
const SignaturePad = ({ label, signatory, date, onSign }) => {
  const [isSigned, setIsSigned] = useState(false);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const endDrawing = () => {
    setIsDrawing(false);
    setIsSigned(true);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsSigned(false);
  };

  return (
    <div className="flex flex-col space-y-4 p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{label}</p>
      <div className="relative group">
        <canvas
          ref={canvasRef}
          width={400}
          height={150}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          className="bg-white border-b-2 border-gray-300 w-full cursor-crosshair touch-none print:border-b"
        />
        {!isSigned && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-gray-300 italic text-sm">
            Sign here
          </div>
        )}
        <button 
          onClick={clear}
          className="absolute top-0 right-0 p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
        >
          <RefreshCcw size={16} />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] text-gray-400 uppercase">Representative</label>
          <p className="font-medium text-gray-800">{signatory}</p>
        </div>
        <div>
          <label className="block text-[10px] text-gray-400 uppercase">Date</label>
          <p className="font-medium text-gray-800">{date}</p>
        </div>
      </div>
    </div>
  );
};

// --- Main Application ---
export default function App() {
  const [data, setData] = useState({
    client: {
      name: "Acme Corp",
      address: "123 Innovation Drive, Tech City",
      contact: "Jane Doe",
      email: "jane@acme.com",
      phone: "+1 (555) 000-0000"
    },
    project: {
      title: "NexGen E-Commerce Platform",
      description: "A premium, headless commerce solution designed to scale ARCODIC's digital presence through a mobile-first architectural approach."
    },
    scope: {
      pages: ["Home Page", "Product Gallery", "Checkout Flow", "User Dashboard"],
      features: ["Biometric Authentication", "Real-time Inventory Sync", "AI-driven Product Recommendations"],
      integrations: ["Stripe Connect", "AWS S3 Storage", "SendGrid API"]
    },
    timeline: [
      { desc: "Project Kickoff", date: "2024-06-01" },
      { desc: "UI/UX High Fidelity Design", date: "2024-06-15" },
      { desc: "Development Sprint 1", date: "2024-07-20" }
    ],
    pricing: {
      total: "25,000",
      currency: "USD",
      deposit: "50%",
      revisions: "3"
    }
  });

  const updateData = (path, value) => {
    const keys = path.split('.');
    const newData = { ...data };
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setData(newData);
  };

  const addItem = (category) => {
    const newData = { ...data };
    newData.scope[category].push("New Item");
    setData(newData);
  };

  const removeItem = (category, index) => {
    const newData = { ...data };
    newData.scope[category].splice(index, 1);
    setData(newData);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-sans antialiased selection:bg-blue-100 pb-20">
      {/* Header / Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 print:hidden">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">A</span>
            </div>
            <span className="font-semibold tracking-tight text-lg">ARCODIC <span className="text-gray-400 font-normal">SOW Portal</span></span>
          </div>
          <button 
            onClick={handlePrint}
            className="flex items-center space-x-2 bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-black/10"
          >
            <Download size={16} />
            <span>Generate PDF</span>
          </button>
        </div>
      </nav>

      {/* Main Document Content */}
      <main className="max-w-4xl mx-auto mt-12 px-6 print:mt-0 print:px-0">
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-200 overflow-hidden print:border-none print:shadow-none">
          
          {/* Header Section */}
          <header className="p-12 border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white print:p-8">
            <div className="flex justify-between items-start mb-12">
              <div>
                <h1 className="text-4xl font-bold tracking-tight mb-2 print:text-3xl">Statement of Work</h1>
                <p className="text-gray-500 font-medium">Agreement ID: #ARC-{new Date().getFullYear()}-001</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-xl">ARCODIC</p>
                <p className="text-sm text-gray-500">Digital Service Provider</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  <User size={14} />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Client Details</span>
                </div>
                <input 
                  className="w-full text-lg font-semibold bg-transparent border-b border-transparent focus:border-blue-500 focus:outline-none py-1 hover:bg-gray-50 px-1 transition-colors"
                  value={data.client.name}
                  onChange={(e) => updateData('client.name', e.target.value)}
                />
                <textarea 
                  className="w-full text-sm text-gray-600 bg-transparent border-none focus:ring-0 resize-none hover:bg-gray-50 px-1 py-1"
                  value={data.client.address}
                  rows={2}
                  onChange={(e) => updateData('client.address', e.target.value)}
                />
              </div>
              <div className="space-y-4 bg-gray-50 p-6 rounded-2xl print:bg-transparent print:p-0">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Primary Contact</span>
                  <input 
                    className="text-right font-medium bg-transparent border-none focus:ring-0"
                    value={data.client.contact}
                    onChange={(e) => updateData('client.contact', e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Email Address</span>
                  <input 
                    className="text-right font-medium bg-transparent border-none focus:ring-0"
                    value={data.client.email}
                    onChange={(e) => updateData('client.email', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </header>

          {/* Body Content */}
          <div className="p-12 space-y-16 print:p-8">
            
            {/* Section 1: Overview */}
            <section>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <Briefcase size={16} />
                </div>
                <h2 className="text-xl font-bold">Project Overview</h2>
              </div>
              <div className="space-y-4">
                <input 
                  className="w-full text-2xl font-bold text-gray-900 bg-transparent border-b border-transparent focus:border-blue-500 focus:outline-none mb-2"
                  value={data.project.title}
                  placeholder="Project Name"
                  onChange={(e) => updateData('project.title', e.target.value)}
                />
                <textarea 
                  className="w-full text-gray-600 leading-relaxed bg-transparent border-none focus:ring-0 text-base"
                  value={data.project.description}
                  rows={3}
                  onChange={(e) => updateData('project.description', e.target.value)}
                />
              </div>
            </section>

            {/* Section 2: Scope */}
            <section>
              <div className="flex items-center space-x-2 mb-8">
                <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                  <Layers size={16} />
                </div>
                <h2 className="text-xl font-bold">Scope of Work</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  { key: 'pages', label: 'Pages / Screens', color: 'blue' },
                  { key: 'features', label: 'Functionality', color: 'green' },
                  { key: 'integrations', label: 'Integrations', color: 'orange' }
                ].map((cat) => (
                  <div key={cat.key} className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 flex justify-between items-center">
                      {cat.label}
                      <button 
                        onClick={() => addItem(cat.key)}
                        className="p-1 hover:bg-gray-100 rounded-md text-gray-600 print:hidden"
                      >
                        <Plus size={14} />
                      </button>
                    </h3>
                    <ul className="space-y-3">
                      {data.scope[cat.key].map((item, idx) => (
                        <li key={idx} className="group flex items-start space-x-2">
                          <CheckCircle2 size={16} className="text-gray-300 mt-0.5 shrink-0" />
                          <input 
                            className="text-sm text-gray-700 bg-transparent border-none focus:ring-0 p-0 w-full hover:text-black transition-colors"
                            value={item}
                            onChange={(e) => {
                              const newArr = [...data.scope[cat.key]];
                              newArr[idx] = e.target.value;
                              updateData(`scope.${cat.key}`, newArr);
                            }}
                          />
                          <button 
                            onClick={() => removeItem(cat.key, idx)}
                            className="opacity-0 group-hover:opacity-100 p-1 text-gray-300 hover:text-red-500 transition-opacity print:hidden"
                          >
                            <Trash2 size={12} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: Timeline & Pricing */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-gray-100">
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                    <Calendar size={16} />
                  </div>
                  <h2 className="text-xl font-bold">Milestones</h2>
                </div>
                <div className="space-y-6">
                  {data.timeline.map((m, idx) => (
                    <div key={idx} className="flex justify-between items-end border-b border-gray-50 pb-2">
                      <input 
                        className="font-medium text-gray-800 bg-transparent border-none focus:ring-0 p-0 text-sm"
                        value={m.desc}
                        onChange={(e) => {
                          const newTimeline = [...data.timeline];
                          newTimeline[idx].desc = e.target.value;
                          setData({ ...data, timeline: newTimeline });
                        }}
                      />
                      <input 
                        type="date"
                        className="text-xs text-gray-400 bg-transparent border-none focus:ring-0 p-0 text-right"
                        value={m.date}
                        onChange={(e) => {
                          const newTimeline = [...data.timeline];
                          newTimeline[idx].date = e.target.value;
                          setData({ ...data, timeline: newTimeline });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 rounded-[24px] p-8 text-white shadow-xl">
                <div className="flex items-center space-x-2 mb-6">
                  <CreditCard size={18} className="text-gray-400" />
                  <h2 className="text-lg font-bold">Financial Summary</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 block mb-1">Total Fee</span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-gray-400 text-lg">$</span>
                      <input 
                        className="bg-transparent border-none focus:ring-0 text-4xl font-bold p-0 w-full"
                        value={data.pricing.total}
                        onChange={(e) => updateData('pricing.total', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 block mb-1">Deposit</span>
                      <input 
                        className="bg-transparent border-none focus:ring-0 text-lg font-semibold p-0 w-full"
                        value={data.pricing.deposit}
                        onChange={(e) => updateData('pricing.deposit', e.target.value)}
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 block mb-1">Revisions</span>
                      <input 
                        className="bg-transparent border-none focus:ring-0 text-lg font-semibold p-0 w-full"
                        value={data.pricing.revisions}
                        onChange={(e) => updateData('pricing.revisions', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Signature Area */}
            <section className="pt-12 border-t border-gray-100">
              <div className="flex items-center space-x-2 mb-8">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <PenTool size={16} />
                </div>
                <h2 className="text-xl font-bold">Acceptance & Signing</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <SignaturePad 
                  label="ARCODIC" 
                  signatory="A. Arcodic Representative"
                  date={new Date().toLocaleDateString()}
                />
                <SignaturePad 
                  label="CLIENT" 
                  signatory={data.client.name}
                  date={new Date().toLocaleDateString()}
                />
              </div>
            </section>

            {/* Legal Footnote */}
            <footer className="pt-8 border-t border-gray-100 text-[10px] text-gray-400 leading-relaxed uppercase tracking-wide italic">
              This SOW is governed by and incorporated into the Master Service Agreement between ARCODIC and the Client. 
              Any functionality, page, feature, or integration not expressly listed above is excluded. 
              ARCODIC reserves the right to adjust tools or libraries where technically necessary.
            </footer>
          </div>
        </div>
      </main>

      {/* Helper Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full border border-gray-200 shadow-2xl flex items-center space-x-8 print:hidden transition-all hover:scale-105">
        <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500 uppercase tracking-tighter">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Autosave Active</span>
        </div>
        <div className="h-4 w-px bg-gray-200" />
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xs font-bold text-black hover:text-blue-600 transition-colors uppercase tracking-widest"
        >
          Back to Top
        </button>
      </div>

      <style>{`
        @media print {
          @page {
            margin: 20mm;
            size: auto;
          }
          body {
            background-color: white;
            padding: 0;
          }
          input, textarea {
            border: none !important;
            padding: 0 !important;
            background: transparent !important;
          }
          .print\\:hidden { display: none !important; }
          .print\\:border-none { border: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:p-8 { padding: 2rem !important; }
          .print\\:mt-0 { margin-top: 0 !important; }
        }
      `}</style>
    </div>
  );
}
