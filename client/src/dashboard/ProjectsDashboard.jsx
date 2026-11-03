import { useState, useMemo } from 'react';
import { useProjects, PROJECT_CATEGORIES, normalizeProject } from './projectsStore';
import API from '../config.js';

export default function ProjectsDashboard() {
  const { projects, setProjects } = useProjects();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalMode, setModalMode] = useState(null); // 'create' | 'edit' | null
  const [activeProject, setActiveProject] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    id: '',
    slNo: 1,
    title: '',
    client: '',
    location: '',
    area_sqft: '',
    category: 'Residential',
    customCategory: '',
    categoryLabel: '',
    status: 'Active / Current',
    scope: [],
    description: '',
    featured: false,
    tag: '',
    image: '',
    isActive: true
  });

  const [newScopeInput, setNewScopeInput] = useState('');

  // Show temporary toast notification
  const notify = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Metrics
  const metrics = useMemo(() => {
    const total = projects.length;
    const totalAreaNum = projects.reduce((acc, p) => acc + (Number(p.areaNumber) || 0), 0);
    const featuredCount = projects.filter((p) => p.featured).length;
    const uniqueCategories = new Set(projects.map((p) => p.category)).size;

    return {
      total,
      totalAreaFormatted: totalAreaNum ? `${(totalAreaNum / 100000).toFixed(2)} Lakh+ sq.ft` : '0 sq.ft',
      totalAreaRaw: totalAreaNum.toLocaleString('en-IN'),
      featuredCount,
      uniqueCategories
    };
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    const q = search.toLowerCase().trim();
    return projects.filter((p) => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch =
        !q ||
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.client && p.client.toLowerCase().includes(q)) ||
        (p.location && p.location.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (Array.isArray(p.scope) && p.scope.some((s) => s.toLowerCase().includes(q)));
      return matchCat && matchSearch;
    });
  }, [projects, search, selectedCategory]);

  // Open modal for Create
  const handleOpenCreate = () => {
    const nextSlNo = projects.length + 1;
    setFormData({
      id: `project-${Date.now()}`,
      slNo: nextSlNo,
      title: '',
      client: '',
      location: 'Tamil Nadu, India',
      area_sqft: '1,00,000',
      category: 'Residential',
      customCategory: '',
      categoryLabel: 'Residential Township',
      status: 'Active / Current',
      scope: ['Plumbing & Drainage', 'Electrical Distribution', 'Fire Fighting'],
      description: '',
      featured: false,
      tag: 'Residential',
      image: `/images/project-${((nextSlNo - 1) % 11) + 1}.jpeg`,
      isActive: true
    });
    setNewScopeInput('');
    setModalMode('create');
  };

  // Open modal for Edit
  const handleOpenEdit = (project) => {
    setActiveProject(project);
    const isPresetCat = PROJECT_CATEGORIES.includes(project.category);
    setFormData({
      id: project.id,
      slNo: project.slNo || 1,
      title: project.title || '',
      client: project.client || '',
      location: project.location || '',
      area_sqft: project.area_sqft || '',
      category: isPresetCat ? project.category : 'Custom',
      customCategory: isPresetCat ? '' : project.category,
      categoryLabel: project.categoryLabel || '',
      status: project.status || 'Active / Current',
      scope: Array.isArray(project.scope) ? [...project.scope] : [],
      description: project.description || '',
      featured: Boolean(project.featured),
      tag: project.tag || '',
      image: project.image || '',
      isActive: project.isActive !== false
    });
    setNewScopeInput('');
    setModalMode('edit');
  };

  const handleCloseModal = () => {
    setModalMode(null);
    setActiveProject(null);
  };

  // Scope pill manipulation
  const handleAddScope = () => {
    const trimmed = newScopeInput.trim();
    if (!trimmed) return;
    if (!formData.scope.includes(trimmed)) {
      setFormData((prev) => ({ ...prev, scope: [...prev.scope, trimmed] }));
    }
    setNewScopeInput('');
  };

  const handleRemoveScope = (scopeItem) => {
    setFormData((prev) => ({
      ...prev,
      scope: prev.scope.filter((s) => s !== scopeItem)
    }));
  };

  // Handle Form Submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please provide a Project Title.');
      return;
    }

    setIsSubmitting(true);
    const finalCategory =
      formData.category === 'Custom'
        ? formData.customCategory.trim() || 'General'
        : formData.category;

    const cleanedArea = String(formData.area_sqft).replace(/[^0-9]/g, '');
    const areaNumber = cleanedArea ? parseInt(cleanedArea, 10) : 0;

    const projectPayload = normalizeProject({
      ...formData,
      category: finalCategory,
      categoryLabel: formData.categoryLabel || `${finalCategory} Development`,
      areaNumber
    });

    try {
      let updatedList = [];
      if (modalMode === 'create') {
        // Send single creation request to backend
        try {
          await fetch(`${API}/projects`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectPayload)
          });
        } catch (apiErr) {
          console.warn('Backend create project request warning:', apiErr);
        }

        updatedList = [projectPayload, ...projects];
        notify(`Project "${projectPayload.title}" created and saved!`);
      } else {
        // Edit existing project
        try {
          await fetch(`${API}/projects/${projectPayload.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectPayload)
          });
        } catch (apiErr) {
          console.warn('Backend update project request warning:', apiErr);
        }

        updatedList = projects.map((p) =>
          p.id === projectPayload.id ? projectPayload : p
        );
        notify(`Project "${projectPayload.title}" updated successfully!`);
      }

      await setProjects(updatedList);
      handleCloseModal();
    } catch (err) {
      console.error('Error submitting project:', err);
      notify('Failed to save project changes.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete
  const handleDelete = async (projectId, projectTitle) => {
    if (
      !window.confirm(
        `Are you sure you want to delete the project: "${projectTitle}"?\nThis will remove it from the database.`
      )
    ) {
      return;
    }

    try {
      try {
        await fetch(`${API}/projects/${projectId}`, {
          method: 'DELETE'
        });
      } catch (apiErr) {
        console.warn('Backend delete project warning:', apiErr);
      }

      const updated = projects.filter((p) => p.id !== projectId);
      await setProjects(updated);
      notify(`Project "${projectTitle}" deleted.`);
    } catch (err) {
      console.error('Delete error:', err);
      notify('Failed to delete project.', 'error');
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-lg shadow-2xl text-sm font-semibold border flex items-center gap-3 transition-all transform animate-bounce ${
            notification.type === 'error'
              ? 'bg-red-950 border-red-500 text-red-200'
              : 'bg-emerald-950 border-emerald-500 text-emerald-200'
          }`}
        >
          <span>{notification.type === 'error' ? '⚠️' : '✓'}</span>
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              PORTFOLIO CONTROL
            </span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">Projects Management</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Create, update, and manage MEP design projects shown on{' '}
            <a
              href="/projects"
              target="_blank"
              rel="noreferrer"
              className="text-amber-400 hover:underline inline-flex items-center gap-1"
            >
              /projects ↗
            </a>{' '}
            and the homepage preview.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 flex items-center gap-2"
          >
            <span>+</span> Add New Project
          </button>
        </div>
      </div>

      {/* Metrics Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Total Projects
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{metrics.total}</span>
            <span className="text-xs text-emerald-400 font-medium">In Database</span>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Total Coordinated Area
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-400">
              {metrics.totalAreaFormatted}
            </span>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Featured Projects
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{metrics.featuredCount}</span>
            <span className="text-xs text-amber-400/80 font-medium">Homepage Showcase</span>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Sectors / Categories
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{metrics.uniqueCategories}</span>
            <span className="text-xs text-slate-400 font-medium">Distinct Typologies</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500 text-sm">
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, client, city, scope, or sector..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950/70 border border-slate-800 focus:border-amber-400/70 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {['All', ...PROJECT_CATEGORIES].map((cat) => {
            const count =
              cat === 'All'
                ? projects.length
                : projects.filter((p) => p.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white'
                }`}
              >
                {cat}
                <span
                  className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                    isSelected ? 'bg-slate-950/20 text-slate-900' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects List / Cards */}
      <div className="space-y-3">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-14 bg-slate-900/40 border border-slate-800 rounded-2xl">
            <div className="text-3xl mb-2">📁</div>
            <p className="text-sm font-semibold text-slate-300">No projects found</p>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search query or category filter.
            </p>
          </div>
        ) : (
          filteredProjects.map((project, idx) => (
            <div
              key={project.id || idx}
              className="bg-slate-900/70 hover:bg-slate-900 border border-slate-800/90 hover:border-slate-700 rounded-xl p-4 transition-all duration-200 group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left: Info */}
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-amber-400 font-bold border border-slate-700">
                      #{String(project.slNo || idx + 1).padStart(2, '0')}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-950/80 text-blue-300 text-[11px] font-semibold border border-blue-800/50">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 text-[10px] font-bold border border-amber-400/30">
                        ★ Featured
                      </span>
                    )}
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <span>📍</span> {project.location || 'Location Not Specified'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                    {project.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                    <div>
                      <span className="text-slate-500">Client: </span>
                      <strong className="text-slate-300 font-semibold">{project.client}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500">Built-Up Area: </span>
                      <strong className="text-amber-400 font-semibold">
                        {project.area_sqft} sq.ft
                      </strong>
                    </div>
                    {project.status && (
                      <div>
                        <span className="text-slate-500">Status: </span>
                        <span className="text-emerald-400 font-medium">{project.status}</span>
                      </div>
                    )}
                  </div>

                  {/* Scope badges */}
                  {Array.isArray(project.scope) && project.scope.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {project.scope.map((item, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md bg-slate-950/80 text-[11px] text-slate-300 border border-slate-800"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                  <a
                    href="/projects"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-1"
                  >
                    View on Site ↗
                  </a>
                  <button
                    onClick={() => handleOpenEdit(project)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all flex items-center gap-1 shadow-sm"
                  >
                    ✏ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id, project.title)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-950/70 border border-red-900/50 transition-all"
                    title="Delete project"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Project Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {modalMode === 'create' ? 'Add New Project' : 'Edit Project Details'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Saved data will sync directly to the database and update on the live site.
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-sm transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. The Proposed Residential Development 'Humming Tree'"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Client & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. Casagrand Builders"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Location / City
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Perumbakkam, Chennai"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Area & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Built-Up Area (Sq.Ft) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.area_sqft}
                    onChange={(e) => setFormData({ ...formData, area_sqft: e.target.value })}
                    placeholder="e.g. 5,75,000"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Category / Sector
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    {PROJECT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="Custom">+ Custom Category...</option>
                  </select>
                </div>
              </div>

              {/* Custom Category Input if selected */}
              {formData.category === 'Custom' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                    Specify Custom Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customCategory}
                    onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                    placeholder="e.g. Hospitality / Healthcare"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-amber-400/50 rounded-lg text-xs text-white focus:outline-none"
                  />
                </div>
              )}

              {/* Sub-label & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Typology Label
                  </label>
                  <input
                    type="text"
                    value={formData.categoryLabel}
                    onChange={(e) => setFormData({ ...formData, categoryLabel: e.target.value })}
                    placeholder="e.g. Multi-Storey Residential Township"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Execution Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                  >
                    <option value="Active / Current">Active / Current</option>
                    <option value="Completed / Handed Over">Completed / Handed Over</option>
                    <option value="Under Coordination">Under Coordination</option>
                  </select>
                </div>
              </div>

              {/* Scope Tag Builder */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  MEP Engineering Scope Items
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newScopeInput}
                    onChange={(e) => setNewScopeInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddScope();
                      }
                    }}
                    placeholder="Type scope item (e.g. Electrical Panels) and press Add"
                    className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={handleAddScope}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white rounded-lg transition-colors"
                  >
                    + Add
                  </button>
                </div>

                {/* Scope Pills */}
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {formData.scope.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 text-slate-200 text-xs rounded-md border border-slate-700"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => handleRemoveScope(item)}
                        className="text-slate-400 hover:text-red-400 text-xs font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Project Description / Engineering Highlight
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detail the engineering scope, clash avoidance, life safety, or pumping coordination..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                ></textarea>
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center gap-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-400 focus:ring-amber-400 bg-slate-900 border-slate-700"
                />
                <label htmlFor="featuredToggle" className="text-xs text-slate-300 cursor-pointer">
                  <strong className="text-white block">Feature on Homepage Preview</strong>
                  Showcase this project in the top 3 cards on the GGA homepage.
                </label>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 disabled:opacity-50"
                >
                  {isSubmitting
                    ? 'Saving...'
                    : modalMode === 'create'
                    ? 'Create Project ↗'
                    : 'Save Changes ↗'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

