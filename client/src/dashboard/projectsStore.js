import { useState, useEffect } from 'react';
import API from '../config.js';

export const PROJECT_CATEGORIES = [
  'Residential',
  'Industrial',
  'Institutional',
  'Commercial'
];

export const DEFAULT_PROJECTS = [
  {
    id: 'project-1',
    slNo: 1,
    title: 'The Proposed Dormitory development "Tata Electronics"',
    client: 'Tata Electronics',
    location: 'Hosur, Tamil Nadu',
    area_sqft: '15,00,000',
    areaNumber: 1500000,
    category: 'Industrial',
    categoryLabel: 'Industrial & High-Tech Campus',
    status: 'Active / Current',
    scope: ['Electrical HT/LT', 'Substation', 'Fire Fighting', 'Hydraulics', 'Sanitary Plumbing'],
    description: 'High-density multi-building residential & facilities campus for industrial workforce, featuring coordinated sub-stations, high-capacity pumping mains, fire hydrants, and advanced life-safety networks.',
    featured: true,
    tag: 'Mega Campus',
    image: '/images/project-1.jpeg',
    sortOrder: 1,
    isActive: true
  },
  {
    id: 'project-2',
    slNo: 2,
    title: 'The proposed Residential Development "Humming Tree"',
    client: 'Residential Developers',
    location: 'Perumbakkam, Chennai',
    area_sqft: '3,50,000',
    areaNumber: 350000,
    category: 'Residential',
    categoryLabel: 'Premium High-Rise Residential',
    status: 'Active / Current',
    scope: ['Plumbing & Drainage', 'Electrical Distribution', 'Fire Alarm', 'STP Integration'],
    description: 'Integrated MEP services documentation for multi-tower residential project, featuring rainwater harvesting recharge wells, central water treatment, and architectural riser alignments.',
    featured: true,
    tag: 'Residential Towers',
    image: '/images/project-2.jpeg',
    sortOrder: 2,
    isActive: true
  },
  {
    id: 'project-3',
    slNo: 3,
    title: 'The Proposed residential Building "Casagrande"',
    client: 'Casagrand Builders',
    location: 'Sulur, Coimbatore',
    area_sqft: '2,00,000',
    areaNumber: 200000,
    category: 'Residential',
    categoryLabel: 'Modern Residential Complex',
    status: 'Active / Current',
    scope: ['Internal Plumbing', 'External Drainage', 'Electrical Earthing', 'Fire Hydrants'],
    description: 'Coordinated services layout and GFC drawings for residential housing blocks, emphasizing cost-effective plumbing runs, hydraulic balance, and statutory firefighting clearances.',
    featured: false,
    tag: 'Housing Complex',
    image: '/images/project-3.jpeg',
    sortOrder: 3,
    isActive: true
  },
  {
    id: 'project-4',
    slNo: 4,
    title: 'The Proposed residential Building "Casagrande"',
    client: 'Casagrand Builders',
    location: 'Korattur, Chennai',
    area_sqft: '5,75,000',
    areaNumber: 575000,
    category: 'Residential',
    categoryLabel: 'Multi-Storey Residential Township',
    status: 'Active / Current',
    scope: ['Plumbing Risers', 'Fire Sprinklers & Hydrants', 'Electrical Panels', 'DG Backup'],
    description: 'High-density multi-tower residential project requiring complete MEP clash resolution, acoustic insulation for drainage pipes, and dedicated domestic water booster pumping network.',
    featured: true,
    tag: 'Residential Township',
    image: '/images/project-4.jpeg',
    sortOrder: 4,
    isActive: true
  },
  {
    id: 'project-5',
    slNo: 5,
    title: 'The Proposed residential Building "Casagrande"',
    client: 'Casagrand Builders',
    location: 'Saravanampatti, Coimbatore',
    area_sqft: '2,00,000',
    areaNumber: 200000,
    category: 'Residential',
    categoryLabel: 'Gated Residential Community',
    status: 'Active / Current',
    scope: ['Domestic PHE', 'Storm Drainage', 'Landscape Irrigation', 'Fire Suppression'],
    description: 'Comprehensive public health and fire engineering for gated community villas and mid-rise apartments, with dual plumbing network for treated water flushing.',
    featured: false,
    tag: 'Gated Community',
    image: '/images/project-5.jpeg',
    sortOrder: 5,
    isActive: true
  },
  {
    id: 'project-6',
    slNo: 6,
    title: 'The proposed Development "INSTA" School',
    client: 'Educational Institution',
    location: 'Kolapakkam, Chennai',
    area_sqft: '1,00,000',
    areaNumber: 100000,
    category: 'Institutional',
    categoryLabel: 'Modern Educational Campus',
    status: 'Active / Current',
    scope: ['School Sanitation', 'Laboratory Waste Drainage', 'Fire Hydrants & Extinguishers', 'HVAC Auditorium'],
    description: 'Child-safe plumbing fixtures, acid-resistant drainage pipes for chemistry labs, dedicated primary substation design, and compliance with institutional life-safety guidelines.',
    featured: false,
    tag: 'Campus & Education',
    image: '/images/project-6.jpeg',
    sortOrder: 6,
    isActive: true
  },
  {
    id: 'project-7',
    slNo: 7,
    title: 'The Proposed residential Building "Casagrande"',
    client: 'Casagrand Builders',
    location: 'Karapakkam, Chennai',
    area_sqft: '2,75,000',
    areaNumber: 275000,
    category: 'Residential',
    categoryLabel: 'IT Corridor Luxury Housing',
    status: 'Active / Current',
    scope: ['PHE Infrastructure', 'Basement Ventilation', 'Fire Sprinklers', 'Power Distribution'],
    description: 'High-rise residential development along Chennai IT corridor. Integrated design for mechanical basement ventilation, wet-risers, and pressurized staircase smoke management.',
    featured: false,
    tag: 'Luxury Towers',
    image: '/images/project-7.jpeg',
    sortOrder: 7,
    isActive: true
  },
  {
    id: 'project-8',
    slNo: 8,
    title: 'The proposed residential development "S & P"',
    client: 'S & P Foundation',
    location: 'Nedunkundram, Chennai',
    area_sqft: '2,00,000',
    areaNumber: 200000,
    category: 'Residential',
    categoryLabel: 'Affordable & Premium Mixed Housing',
    status: 'Active / Current',
    scope: ['Water Supply Networks', 'Sewage Lifting Sump', 'Transformer Yard GA', 'Fire Protection'],
    description: 'Cost-optimized MEP engineering enabling phased construction, energy-efficient LED exterior lighting schematics, and zero liquid discharge water management scheme.',
    featured: false,
    tag: 'Residential Township',
    image: '/images/project-8.jpeg',
    sortOrder: 8,
    isActive: true
  },
  {
    id: 'project-9',
    slNo: 9,
    title: 'The proposed Office Building "S & P"',
    client: 'S & P Foundation',
    location: 'Mogappair, Chennai',
    area_sqft: '70,000',
    areaNumber: 70000,
    category: 'Commercial',
    categoryLabel: 'Corporate Headquarters & Commercial Space',
    status: 'Active / Current',
    scope: ['Central HVAC & VRF', 'Low-Noise PHE Risers', 'Server Room FM200', 'Access Control / CCTV'],
    description: 'Premium corporate office building featuring VRF air conditioning, intelligent energy sub-metering, acoustically isolated toilet stacks, and clean agent fire suppression for server hub.',
    featured: false,
    tag: 'Commercial Office',
    image: '/images/project-9.jpeg',
    sortOrder: 9,
    isActive: true
  },
  {
    id: 'project-10',
    slNo: 10,
    title: 'Proposed Indian Coast Guard Station (ICGS)',
    client: 'Indian Coast Guard / MoD',
    location: 'Ratnagiri, Maharashtra',
    area_sqft: '2,00,000',
    areaNumber: 200000,
    category: 'Institutional',
    categoryLabel: 'Defense & Maritime Infrastructure',
    status: 'Active / Current',
    scope: ['Marine Grade Corrosion Protection', 'High-Capacity Substation', 'Emergency DG Backup', 'Fire Fighting'],
    description: 'Mission-critical maritime defense establishment requiring marine-grade corrosion-resistant materials, uncompromised emergency power redundancy, and robust fire security systems.',
    featured: true,
    tag: 'Defense Infrastructure',
    image: '/images/project-10.jpeg',
    sortOrder: 10,
    isActive: true
  },
  {
    id: 'project-11',
    slNo: 11,
    title: 'Proposed Residential Building',
    client: 'Private Client',
    location: 'Pallavaram, Chennai',
    area_sqft: '1,00,000',
    areaNumber: 100000,
    category: 'Residential',
    categoryLabel: 'Urban Apartment Complex',
    status: 'Active / Current',
    scope: ['Sanitary Drainage', 'Water Booster Pumping', 'Meter Panel Layouts', 'External Fire Hydrants'],
    description: 'Compact urban high-density residential community with optimized plumbing shafts to maximize usable carpet area, paired with CPWD/NBC compliant fire safety measures.',
    featured: false,
    tag: 'Urban Housing',
    image: '/images/project-11.jpeg',
    sortOrder: 11,
    isActive: true
  }
];

const STORAGE_KEY = 'gga_projects_data_v2';
const UPDATE_EVENT = 'gga_projects_updated';

// Helper to normalize project data ensuring scope is an array
export function normalizeProject(raw = {}, idx = 0) {
  let scope = raw.scope;
  if (typeof scope === 'string') {
    try {
      scope = JSON.parse(scope);
    } catch (_) {
      scope = scope.split(',').map((s) => s.trim()).filter(Boolean);
    }
  }
  if (!Array.isArray(scope)) {
    scope = [];
  }

  // Parse numeric area for sorting and summing
  let areaNumber = raw.areaNumber;
  if (!areaNumber) {
    const cleaned = String(raw.area_sqft || '').replace(/[^0-9]/g, '');
    areaNumber = cleaned ? parseInt(cleaned, 10) : 0;
  }

  return {
    id: raw.id || `project-${Date.now()}-${idx}`,
    slNo: Number(raw.slNo) || idx + 1,
    title: raw.title || 'Untitled Project',
    client: raw.client || 'GGA Client',
    location: raw.location || 'Tamil Nadu, India',
    area_sqft: raw.area_sqft || '1,00,000',
    areaNumber: Number(areaNumber) || 0,
    category: raw.category || 'Residential',
    categoryLabel: raw.categoryLabel || `${raw.category || 'Residential'} Development`,
    status: raw.status || 'Active / Current',
    scope,
    description: raw.description || '',
    featured: Boolean(raw.featured),
    tag: raw.tag || raw.category || 'Engineering',
    image: raw.image || `/images/project-${(idx % 11) + 1}.jpeg`,
    sortOrder: Number(raw.sortOrder) || idx + 1,
    isActive: raw.isActive !== false
  };
}

// Get stored projects from localStorage or defaults
export function getStoredProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizeProject);
      }
    }
  } catch (e) {
    console.warn('Failed to parse local projects data', e);
  }
  return DEFAULT_PROJECTS.map(normalizeProject);
}

// Save projects list to localStorage and sync with backend
export async function saveProjects(projectsList) {
  try {
    const normalized = (Array.isArray(projectsList) ? projectsList : []).map(normalizeProject);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: normalized }));

    try {
      await fetch(`${API}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(normalized)
      });
    } catch (apiErr) {
      console.info('Backend sync skipped or offline, local changes active');
    }
    return { success: true, count: normalized.length };
  } catch (error) {
    console.error('Error saving projects:', error);
    return { success: false, error: error.message };
  }
}

// Helper to reset projects back to defaults
export function resetProjectsToDefault() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: DEFAULT_PROJECTS }));
  return DEFAULT_PROJECTS;
}

// React Hook to access and listen to live projects
export function useProjects() {
  const [projects, setProjectsState] = useState(() => getStoredProjects());

  useEffect(() => {
    // 1. Initial attempt to load from backend
    fetch(`${API}/projects`)
      .then((res) => (res.ok ? res.json() : null))
      .then((serverData) => {
        if (Array.isArray(serverData) && serverData.length > 0) {
          const normalized = serverData.map(normalizeProject);
          setProjectsState(normalized);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
          } catch (_) {}
        }
      })
      .catch(() => {});

    // 2. Listen to update events
    const handleUpdate = (e) => {
      if (e.detail && Array.isArray(e.detail)) {
        setProjectsState(e.detail.map(normalizeProject));
      } else {
        setProjectsState(getStoredProjects());
      }
    };

    window.addEventListener(UPDATE_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(UPDATE_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const updateProjects = async (nextProjects) => {
    const res = await saveProjects(nextProjects);
    setProjectsState(nextProjects);
    return res;
  };

  const resetProjects = () => {
    const def = resetProjectsToDefault();
    setProjectsState(def);
    return def;
  };

  return {
    projects,
    setProjects: updateProjects,
    resetProjects
  };
}

