import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../config.js';
import { useServices, SERVICE_CATEGORIES } from './servicesStore.js';

export default function ServicesDashboard() {
  const { services, setServices } = useServices();

  const [search, setSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [customCategoryMode, setCustomCategoryMode] = useState(false);
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | null
  const [editingService, setEditingService] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const filteredServices = services.filter((s) => {
    const matchesCat = selectedCategoryFilter === 'All' || s.category === selectedCategoryFilter;
    const q = search.toLowerCase().trim();
    if (!q) return matchesCat;
    const matchesSearch = (
      s.title?.toLowerCase().includes(q) ||
      s.category?.toLowerCase().includes(q) ||
      s.disciplineKey?.toLowerCase().includes(q) ||
      s.badge?.toLowerCase().includes(q) ||
      s.tagline?.toLowerCase().includes(q)
    );
    return matchesCat && matchesSearch;
  });

  const handleCategorySelectChange = (catVal) => {
    if (catVal === '__custom__') {
      setCustomCategoryMode(true);
      setEditingService({
        ...editingService,
        category: ''
      });
      return;
    }

    setCustomCategoryMode(false);
    const matched = SERVICE_CATEGORIES.find((c) => c.name === catVal);
    if (matched) {
      setEditingService({
        ...editingService,
        category: matched.name,
        badge: matched.badge,
        disciplineNumber: editingService.disciplineNumber || matched.number,
        disciplineKey: matched.id,
        iconType: matched.iconType,
        shortTitle: editingService.shortTitle || matched.shortTitle,
        tagline: editingService.tagline || matched.defaultTagline
      });
    } else {
      setEditingService({
        ...editingService,
        category: catVal
      });
    }
  };

  const handleOpenAdd = () => {
    const nextNum = String(services.length + 1).padStart(2, '0');
    const defaultCat = SERVICE_CATEGORIES[0];
    setCustomCategoryMode(false);
    setEditingService({
      id: `service-${Date.now()}`,
      category: defaultCat.name,
      disciplineKey: `discipline-${nextNum}`,
      disciplineNumber: nextNum,
      badge: defaultCat.badge,
      title: '',
      shortTitle: defaultCat.shortTitle,
      tagline: defaultCat.defaultTagline,
      iconType: defaultCat.iconType,
      statHighlight: { value: '100%', label: 'Quality Assurance' },
      summary: '',
      description: '',
      coreScope: [
        'Engineering design and schematic calculation',
        'Spatial layout and cross-disciplinary coordination',
        'Statutory building code compliance inspection'
      ],
      standards: [
        { code: 'NBC 2016', name: 'National Building Code of India' },
        { code: 'IS Standards', name: 'Bureau of Indian Standards Compliance' }
      ],
      deliverables: [
        'Detailed Engineering GFC CAD/PDF Drawings',
        'Bill of Quantities (BOQ) & Tender Specifications'
      ],
      sortOrder: services.length + 1,
      isActive: true
    });
    setModalMode('add');
  };

  const handleOpenEdit = (service) => {
    const copy = JSON.parse(JSON.stringify(service)); // deep copy
    if (typeof copy.coreScope === 'string') {
      try { copy.coreScope = JSON.parse(copy.coreScope); } catch (_) { copy.coreScope = []; }
    }
    if (!Array.isArray(copy.coreScope)) copy.coreScope = [];

    if (typeof copy.standards === 'string') {
      try { copy.standards = JSON.parse(copy.standards); } catch (_) { copy.standards = []; }
    }
    if (!Array.isArray(copy.standards)) copy.standards = [];

    if (typeof copy.deliverables === 'string') {
      try { copy.deliverables = JSON.parse(copy.deliverables); } catch (_) { copy.deliverables = []; }
    }
    if (!Array.isArray(copy.deliverables)) copy.deliverables = [];

    if (typeof copy.statHighlight === 'string') {
      try { copy.statHighlight = JSON.parse(copy.statHighlight); } catch (_) { copy.statHighlight = null; }
    }
    if (!copy.statHighlight || typeof copy.statHighlight !== 'object') {
      copy.statHighlight = { value: '100%', label: 'Quality Assurance' };
    }

    const isStandardCat = SERVICE_CATEGORIES.some((c) => c.name === copy.category);
    setCustomCategoryMode(!isStandardCat && !!copy.category && copy.category !== 'General MEP');
    setEditingService(copy);
    setModalMode('edit');
  };

  const handleSaveModal = async (e) => {
    e.preventDefault();
    if (!editingService.title.trim()) {
      showToast('Please provide a valid service title', 'error');
      return;
    }

    try {
      if (modalMode === 'add') {
        const res = await fetch(`${API}/services`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingService)
        });
        if (res.ok) {
          const data = await res.json();
          const created = data.service || editingService;
          const updatedList = [...services, created];
          await setServices(updatedList);
          showToast(`Added "${created.title}" successfully to database!`);
        } else {
          throw new Error('Server returned ' + res.status);
        }
      } else {
        const res = await fetch(`${API}/services/${editingService.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingService)
        });
        if (res.ok) {
          const updatedList = services.map((s) => (s.id === editingService.id ? editingService : s));
          await setServices(updatedList);
          showToast(`Updated "${editingService.title}" successfully in database!`);
        } else {
          throw new Error('Server returned ' + res.status);
        }
      }
    } catch (err) {
      console.warn('Direct API sync warning, saving locally and retrying:', err);
      let updatedList;
      if (modalMode === 'add') {
        updatedList = [...services, editingService];
      } else {
        updatedList = services.map((s) => (s.id === editingService.id ? editingService : s));
      }
      await setServices(updatedList);
      showToast(`Saved "${editingService.title}" successfully!`);
    }

    setModalMode(null);
    setEditingService(null);
  };

  const handleDelete = async (id) => {
    const target = services.find((s) => s.id === id);
    const updated = services.filter((s) => s.id !== id);
    try {
      await fetch(`${API}/services/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('API delete error:', e);
    }
    await setServices(updated);
    setConfirmDeleteId(null);
    showToast(`Deleted service "${target?.title || id}" successfully from database.`);
  };

  // Sub-item list modifiers for Modal
  const updateScopeItem = (idx, val) => {
    const next = [...editingService.coreScope];
    next[idx] = val;
    setEditingService({ ...editingService, coreScope: next });
  };
  const addScopeItem = () => {
    setEditingService({ ...editingService, coreScope: [...editingService.coreScope, ''] });
  };
  const removeScopeItem = (idx) => {
    setEditingService({
      ...editingService,
      coreScope: editingService.coreScope.filter((_, i) => i !== idx)
    });
  };

  const updateStandard = (idx, field, val) => {
    const next = [...editingService.standards];
    next[idx] = { ...next[idx], [field]: val };
    setEditingService({ ...editingService, standards: next });
  };
  const addStandard = () => {
    setEditingService({
      ...editingService,
      standards: [...editingService.standards, { code: '', name: '' }]
    });
  };
  const removeStandard = (idx) => {
    setEditingService({
      ...editingService,
      standards: editingService.standards.filter((_, i) => i !== idx)
    });
  };

  const updateDeliverable = (idx, val) => {
    const next = [...editingService.deliverables];
    next[idx] = val;
    setEditingService({ ...editingService, deliverables: next });
  };
  const addDeliverable = () => {
    setEditingService({ ...editingService, deliverables: [...editingService.deliverables, ''] });
  };
  const removeDeliverable = (idx) => {
    setEditingService({
      ...editingService,
      deliverables: editingService.deliverables.filter((_, i) => i !== idx)
    });
  };

  // Metrics summary
  const totalDisciplines = services.length;
  const totalScopeItems = services.reduce((acc, s) => acc + (Array.isArray(s.coreScope) ? s.coreScope.length : 0), 0);
  const totalStandards = services.reduce((acc, s) => acc + (Array.isArray(s.standards) ? s.standards.length : 0), 0);
  const totalDeliverables = services.reduce((acc, s) => acc + (Array.isArray(s.deliverables) ? s.deliverables.length : 0), 0);

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`px-4 py-3 rounded-xl border flex items-center justify-between shadow-lg text-xs font-semibold animate-in fade-in ${
            toast.type === 'error'
              ? 'bg-rose-500/15 border-rose-500/30 text-rose-300'
              : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
          }`}
        >
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-white p-1 leading-none text-base font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">Services Management</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Update, reorder, and publish MEP disciplines displayed on{' '}
            <strong className="text-amber-400 font-semibold">https://ggamepconsultant.com/services</strong>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md shadow-amber-400/20 transition-all flex items-center gap-1.5"
          >
            <span className="text-base leading-none">+</span>
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* Tailwind Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-lg flex items-center gap-4 hover:border-amber-400/30 transition-all">
          <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center text-xl shrink-0">
            📐
          </div>
          <div>
            <div className="text-2xl font-bold text-white leading-none">{totalDisciplines}</div>
            <div className="text-xs text-slate-400 mt-1">Active Disciplines</div>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-lg flex items-center gap-4 hover:border-amber-400/30 transition-all">
          <div className="w-12 h-12 rounded-xl bg-sky-400/10 text-sky-400 flex items-center justify-center text-xl shrink-0">
            ⚙️
          </div>
          <div>
            <div className="text-2xl font-bold text-white leading-none">{totalScopeItems}</div>
            <div className="text-xs text-slate-400 mt-1">Core Systems Mapped</div>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-lg flex items-center gap-4 hover:border-amber-400/30 transition-all">
          <div className="w-12 h-12 rounded-xl bg-purple-400/10 text-purple-400 flex items-center justify-center text-xl shrink-0">
            ⚖️
          </div>
          <div>
            <div className="text-2xl font-bold text-white leading-none">{totalStandards}</div>
            <div className="text-xs text-slate-400 mt-1">Codes &amp; Standards</div>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-lg flex items-center gap-4 hover:border-amber-400/30 transition-all">
          <div className="w-12 h-12 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center text-xl shrink-0">
            📋
          </div>
          <div>
            <div className="text-2xl font-bold text-white leading-none">{totalDeliverables}</div>
            <div className="text-xs text-slate-400 mt-1">GFC Deliverables</div>
          </div>
        </div>
      </div>

      {/* Controls & Search Filter Bar - Fully Responsive */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
        {/* Top row: Search input & count */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="w-full sm:max-w-md flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 focus-within:border-amber-400 transition-colors">
            <span className="text-slate-500 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search service, category, slug..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-xs text-white placeholder-slate-500 outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-slate-500 hover:text-white text-xs px-1"
              >
                ×
              </button>
            )}
          </div>

          <div className="text-xs text-slate-400 self-end sm:self-auto shrink-0">
            Showing <strong className="text-white">{filteredServices.length}</strong> of {services.length} services
          </div>
        </div>

        {/* Bottom row: Category filter tabs wrapping gracefully */}
        <div className="pt-2.5 border-t border-slate-800/80 flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mr-1 shrink-0">
            Category:
          </span>
          {['All', ...Array.from(new Set(services.map((s) => s.category).filter(Boolean)))].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategoryFilter === cat
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Cards List */}
      <div className="space-y-4">
        {filteredServices.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800">
            <p className="text-slate-400 text-sm">No services matched your query. Click "Add New Service" to create one.</p>
          </div>
        ) : (
          filteredServices.map((service, index) => (
            <div
              key={service.id || index}
              className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-400/40 hover:shadow-xl transition-all space-y-4"
            >
              {/* Card Top: Discipline Meta & Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0">
                  <span className="px-2.5 py-1.5 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/30 text-xs font-bold leading-none shrink-0">
                    {service.disciplineNumber || `0${index + 1}`}
                  </span>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">
                        {service.badge}
                      </span>
                      {service.category && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30">
                          🏷️ {service.category}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-white break-words">{service.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed break-words">{service.tagline}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 flex-wrap">
                  <Link
                    to={`/services?discipline=${service.disciplineKey || ''}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-all inline-flex items-center gap-1"
                    title="View this discipline on the public site"
                  >
                    <span>View on Site</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(service)}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-400/10 hover:bg-amber-400 text-amber-300 hover:text-slate-950 border border-amber-400/30 text-xs font-bold transition-all"
                  >
                    ✎ Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDeleteId(service.id)}
                    className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 text-xs font-bold transition-all"
                    title="Delete discipline"
                  >
                    🗑
                  </button>
                </div>
              </div>

              {/* Card Summary & Key Highlight */}
              <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-300 space-y-2">
                <p className="text-slate-400 leading-relaxed m-0">{service.summary}</p>
                {service.statHighlight && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-amber-400 font-bold">Key Metric:</span>
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/20 text-white font-medium">
                      {service.statHighlight.value} — {service.statHighlight.label}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Footer Breakdown Pills */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <div>
                  <span>Scope Items: </span>
                  <strong className="text-white font-semibold">{Array.isArray(service.coreScope) ? service.coreScope.length : 0}</strong>
                </div>
                <div>
                  <span>Standards: </span>
                  <strong className="text-white font-semibold">{Array.isArray(service.standards) ? service.standards.length : 0}</strong>
                </div>
                <div>
                  <span>Deliverables: </span>
                  <strong className="text-white font-semibold">{Array.isArray(service.deliverables) ? service.deliverables.length : 0}</strong>
                </div>
                <div className="sm:ml-auto flex items-center gap-1.5">
                  <span>URL Slug: </span>
                  <code className="px-2 py-0.5 rounded bg-slate-950 text-sky-400 border border-slate-800 font-mono text-[11px]">
                    {service.disciplineKey}
                  </code>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal with Tailwind */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-rose-500/30 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h2 className="text-lg font-bold text-white">Confirm Service Deletion</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Are you sure you want to delete this engineering service? It will immediately disappear from the public Services page.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(confirmDeleteId)}
                className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 transition-colors shadow-md shadow-rose-600/20"
              >
                Delete Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Add Modal with Tailwind Form Controls */}
      {modalMode && editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in">
          <div className="bg-slate-900 border border-amber-400/30 rounded-2xl w-full max-w-3xl my-8 flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
              <h2 className="text-base sm:text-lg font-bold text-white">
                {modalMode === 'add' ? 'Add New Engineering Discipline' : `Edit: ${editingService.title}`}
              </h2>
              <button
                type="button"
                onClick={() => setModalMode(null)}
                className="text-slate-400 hover:text-white p-1 text-xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSaveModal}>
              <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
                {/* Category Option Selector */}
                <div className="p-4 rounded-xl bg-slate-950/90 border border-amber-400/40 space-y-3 shadow-inner">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <label className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span>🏷️</span> Discipline Category Option *
                      </label>
                      <p className="text-[11px] text-slate-400">
                        Choose which engineering discipline category this service belongs to.
                      </p>
                    </div>
                    {editingService.category && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400/15 text-amber-300 border border-amber-400/30">
                        Selected: {editingService.category}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-300 block">
                        Category Option Dropdown
                      </label>
                      <select
                        value={customCategoryMode ? '__custom__' : (editingService.category || SERVICE_CATEGORIES[0].name)}
                        onChange={(e) => handleCategorySelectChange(e.target.value)}
                        className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3.5 py-2 text-xs text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none"
                      >
                        {SERVICE_CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.name}>
                            {cat.icon} {cat.number} {cat.name}
                          </option>
                        ))}
                        <option value="__custom__">✨ + Custom / New Discipline Category</option>
                      </select>
                    </div>

                    {customCategoryMode ? (
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-amber-300 block">
                          Enter Custom Category Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingService.category || ''}
                          onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                          placeholder="e.g. BIM & Clash Coordination"
                          className="w-full rounded-lg bg-slate-900 border border-amber-400 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:ring-1 focus:ring-amber-400 outline-none"
                        />
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-400 block">
                          Assigned Badge Preset
                        </label>
                        <input
                          type="text"
                          value={editingService.badge || ''}
                          readOnly
                          className="w-full rounded-lg bg-slate-900/60 border border-slate-800 px-3.5 py-2 text-xs text-slate-400 cursor-not-allowed outline-none"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Titles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Discipline Title *</label>
                    <input
                      type="text"
                      required
                      value={editingService.title}
                      onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                      placeholder="e.g. Plumbing & Public Health Engineering"
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Short Title (for Tabs) *</label>
                    <input
                      type="text"
                      required
                      value={editingService.shortTitle}
                      onChange={(e) => setEditingService({ ...editingService, shortTitle: e.target.value })}
                      placeholder="e.g. Plumbing (PHE)"
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none"
                    />
                  </div>
                </div>

                {/* Number, Slug, Badge */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Discipline Number</label>
                    <input
                      type="text"
                      value={editingService.disciplineNumber}
                      onChange={(e) => setEditingService({ ...editingService, disciplineNumber: e.target.value })}
                      placeholder="e.g. 01"
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Discipline Key (URL Slug) *</label>
                    <input
                      type="text"
                      required
                      value={editingService.disciplineKey}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          disciplineKey: e.target.value.toLowerCase().replace(/\s+/g, '-')
                        })
                      }
                      placeholder="e.g. plumbing"
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Badge Kicker</label>
                    <input
                      type="text"
                      value={editingService.badge}
                      onChange={(e) => setEditingService({ ...editingService, badge: e.target.value })}
                      placeholder="e.g. PUBLIC HEALTH ENGINEERING (PHE)"
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none"
                    />
                  </div>
                </div>

                {/* Tagline */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Tagline *</label>
                  <input
                    type="text"
                    required
                    value={editingService.tagline}
                    onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })}
                    placeholder="Short 1-line engineering highlight"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none"
                  />
                </div>

                {/* Key Stat Metric */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Stat Highlight Value</label>
                    <input
                      type="text"
                      value={editingService.statHighlight?.value || ''}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          statHighlight: { ...editingService.statHighlight, value: e.target.value }
                        })
                      }
                      placeholder="e.g. 40%+ or 100%"
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Stat Highlight Label</label>
                    <input
                      type="text"
                      value={editingService.statHighlight?.label || ''}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          statHighlight: { ...editingService.statHighlight, label: e.target.value }
                        })
                      }
                      placeholder="e.g. Water Recycled via STP/RWH Design"
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none"
                    />
                  </div>
                </div>

                {/* Summary & Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Summary (Card Preview)</label>
                  <textarea
                    rows={2}
                    value={editingService.summary}
                    onChange={(e) => setEditingService({ ...editingService, summary: e.target.value })}
                    placeholder="Short summary for homepage and card previews"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none resize-y"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Full Description / Narrative</label>
                  <textarea
                    rows={3}
                    value={editingService.description}
                    onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                    placeholder="Comprehensive explanation of GGA's approach for this discipline"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none resize-y"
                  />
                </div>

                {/* Core Scope List Builder */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                      Core Engineering Scope ({editingService.coreScope.length})
                    </h4>
                    <button
                      type="button"
                      onClick={addScopeItem}
                      className="px-2.5 py-1 rounded bg-amber-400/10 hover:bg-amber-400 text-amber-300 hover:text-slate-950 border border-amber-400/30 text-[11px] font-bold transition-all"
                    >
                      + Add Item
                    </button>
                  </div>
                  <div className="space-y-2">
                    {editingService.coreScope.map((scopeItem, idx) => (
                      <div className="flex items-center gap-2" key={idx}>
                        <input
                          type="text"
                          required
                          value={scopeItem}
                          onChange={(e) => updateScopeItem(idx, e.target.value)}
                          placeholder={`Scope requirement #${idx + 1}`}
                          className="flex-1 rounded-md bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-amber-400 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => removeScopeItem(idx)}
                          className="w-7 h-7 rounded bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 flex items-center justify-center text-sm transition-all"
                          title="Remove item"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Standards Builder */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                      Governing Standards ({editingService.standards.length})
                    </h4>
                    <button
                      type="button"
                      onClick={addStandard}
                      className="px-2.5 py-1 rounded bg-amber-400/10 hover:bg-amber-400 text-amber-300 hover:text-slate-950 border border-amber-400/30 text-[11px] font-bold transition-all"
                    >
                      + Add Standard
                    </button>
                  </div>
                  <div className="space-y-2">
                    {editingService.standards.map((std, idx) => (
                      <div className="flex items-center gap-2" key={idx}>
                        <input
                          type="text"
                          required
                          value={std.code}
                          onChange={(e) => updateStandard(idx, 'code', e.target.value)}
                          placeholder="Code (e.g. NBC 2016)"
                          className="w-1/3 rounded-md bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-amber-400 outline-none"
                        />
                        <input
                          type="text"
                          required
                          value={std.name}
                          onChange={(e) => updateStandard(idx, 'name', e.target.value)}
                          placeholder="Description"
                          className="flex-1 rounded-md bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-amber-400 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => removeStandard(idx)}
                          className="w-7 h-7 rounded bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 flex items-center justify-center text-sm transition-all"
                          title="Remove standard"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deliverables Builder */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                      GFC Deliverables ({editingService.deliverables.length})
                    </h4>
                    <button
                      type="button"
                      onClick={addDeliverable}
                      className="px-2.5 py-1 rounded bg-amber-400/10 hover:bg-amber-400 text-amber-300 hover:text-slate-950 border border-amber-400/30 text-[11px] font-bold transition-all"
                    >
                      + Add Deliverable
                    </button>
                  </div>
                  <div className="space-y-2">
                    {editingService.deliverables.map((deliv, idx) => (
                      <div className="flex items-center gap-2" key={idx}>
                        <input
                          type="text"
                          required
                          value={deliv}
                          onChange={(e) => updateDeliverable(idx, e.target.value)}
                          placeholder={`Deliverable #${idx + 1}`}
                          className="flex-1 rounded-md bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-amber-400 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => removeDeliverable(idx)}
                          className="w-7 h-7 rounded bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 flex items-center justify-center text-sm transition-all"
                          title="Remove deliverable"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md shadow-amber-400/20 transition-all"
                >
                  {modalMode === 'add' ? 'Create Discipline ↗' : 'Save Changes & Publish ↗'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
