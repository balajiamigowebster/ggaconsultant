import { useState, useEffect } from 'react';
import API from '../config.js';

export const SERVICE_CATEGORIES = [
  {
    id: 'plumbing',
    name: 'Plumbing & PHE',
    number: '01',
    badge: 'PUBLIC HEALTH ENGINEERING (PHE)',
    shortTitle: 'Plumbing (PHE)',
    icon: '💧',
    iconType: 'droplet',
    defaultTagline: 'Water balance, hydro-pneumatic boosting, drainage collection & treatment plant engineering.'
  },
  {
    id: 'electrical',
    name: 'Electrical & ELV',
    number: '02',
    badge: 'ELECTRICAL & LOW VOLTAGE (LV / ELV)',
    shortTitle: 'Electrical & ELV',
    icon: '⚡',
    iconType: 'zap',
    defaultTagline: 'High-voltage substations, low-voltage distribution, backup generation, and integrated building automation.'
  },
  {
    id: 'fire-fighting',
    name: 'Fire Fighting',
    number: '03',
    badge: 'FIRE FIGHTING & HYDRAULIC SUPPRESSION',
    shortTitle: 'Fire Fighting',
    icon: '🧯',
    iconType: 'flame',
    defaultTagline: 'Fully compliant hydrant, wet-riser, automated sprinkler, and high-pressure fire pump room engineering.'
  },
  {
    id: 'fire-alarm',
    name: 'Fire Alarm & Detection',
    number: '04',
    badge: 'FIRE ALARM & DETECTION SYSTEMS',
    shortTitle: 'Fire Alarm & Detection',
    icon: '🔔',
    iconType: 'bell',
    defaultTagline: 'Microprocessor addressable detection, smoke management, and integrated emergency evacuation.'
  },
  {
    id: 'hvac',
    name: 'HVAC & Ventilation',
    number: '05',
    badge: 'HVAC & MECHANICAL VENTILATION',
    shortTitle: 'HVAC & Ventilation',
    icon: '❄️',
    iconType: 'wind',
    defaultTagline: 'Cooling load calculations, duct spatial routing, basement smoke exhaust, and energy recovery systems.'
  }
];

export const DEFAULT_SERVICES = [
  {
    id: 'plumbing-design',
    category: 'Plumbing & PHE',
    disciplineKey: 'plumbing',
    disciplineNumber: '01',
    badge: 'PUBLIC HEALTH ENGINEERING (PHE)',
    title: 'Plumbing & Public Health Engineering',
    shortTitle: 'Plumbing (PHE)',
    tagline: 'Water balance, hydro-pneumatic boosting, drainage collection & treatment plant engineering.',
    iconType: 'droplet',
    statHighlight: { value: '40%+', label: 'Water Recycled via STP/RWH Design' },
    summary: 'Comprehensive PHE design from raw water intake, treatment and hydro-pneumatic pumping to internal sanitary fixtures, dual-stack drainage, and sustainable stormwater management.',
    description: "GGA delivers comprehensive Public Health Engineering (PHE) consulting tailored to high-occupancy commercial towers, manufacturing campuses, and gated residential communities. Every schematic complies with CPHEEO manuals, NBC 2016 Part 9, and Uniform Plumbing Code (UPC-I) guidelines to ensure water conservation, sanitary hygiene, and optimal lifecycle durability.",
    coreScope: [
      'Internal & external cold and hot water distribution networks',
      'Hydro-pneumatic booster pumping systems & gravity overhead tank sizing',
      'Soil, waste, and vent drainage collection networks with dual-stack venting',
      'Stormwater runoff management, external storm drainage & rainwater harvesting (RWH)',
      'Sewage Treatment Plant (STP) & Effluent Treatment Plant (ETP) space and hydraulic coordination',
      'Water Treatment Plant (WTP) filtration, softening & RO system planning',
      'Basement sub-soil drainage and automated dewatering sump pump systems',
      'Solar water heating integration & centralized hot water return circulation'
    ],
    standards: [
      { code: 'NBC 2016 Part 9', name: 'Plumbing Services & Sanitation Norms' },
      { code: 'CPHEEO Manual', name: 'Water Supply & Sewerage Design Guidelines' },
      { code: 'IS 1172 & IS 2065', name: 'Basic Requirements for Water Supply & Drainage' },
      { code: 'UPC-I', name: 'Uniform Plumbing Code of India' }
    ],
    deliverables: [
      'Water Supply Schematics & Pipe Sizing Hydraulic Calculations',
      'Soil & Waste Riser Diagrams with Designated Invert Levels',
      'External Utility Infrastructure & Inspection Chamber Layouts',
      'Pumping Station & Plant Room Detailed GA Layouts',
      'Comprehensive Bill of Quantities (BOQ) & Valve Schedules'
    ]
  },
  {
    id: 'electrical-design',
    category: 'Electrical & ELV',
    disciplineKey: 'electrical',
    disciplineNumber: '02',
    badge: 'ELECTRICAL & LOW VOLTAGE (LV / ELV)',
    title: 'Electrical & Power Distribution Systems',
    shortTitle: 'Electrical & ELV',
    tagline: 'High-voltage substations, low-voltage distribution, backup generation, and integrated building automation.',
    iconType: 'zap',
    statHighlight: { value: '0.98+', label: 'Target Power Factor Optimization' },
    summary: 'End-to-end power engineering covering HT/LT substations, transformer sizing, DG synchronization, busways, illumination design, and integrated ELV/BMS systems.',
    description: "From high-capacity transformer substations to precision lighting and ELV safety networks, GGA designs robust power infrastructures that maximize energy efficiency, safeguard against harmonic distortion, and guarantee uninterrupted continuity.",
    coreScope: [
      'HT Substation, HT/LT Transformer sizing & switchgear configuration',
      'Electrical connected load, maximum demand & diversity factor calculations',
      'Diesel Generator (DG) synchronization & auto-mains failure (AMF) control logic',
      'Uninterruptible Power Supply (UPS) centralized & localized systems',
      'Main LT Panel, Sub-Distribution Boards (SDB), and intelligent metering',
      'Cable tray routing, bus-duct systems & vertical electrical riser detailing',
      'Lighting simulation, lux-level calculations & architectural luminaire layout',
      'Chemical earthing, lightning protection grids (as per IS/IEC 62305)',
      'Low Voltage (ELV): Structured cabling, CCTV, Access Control & Building Automation (BMS)'
    ],
    standards: [
      { code: 'IS 732 & IS 3043', name: 'Wiring Installations & Chemical Earthing' },
      { code: 'NBC 2016 Part 8 Sec 2', name: 'Electrical & Allied Installations' },
      { code: 'CEA Regulations 2010', name: 'Central Electricity Authority Safety Norms' },
      { code: 'IS/IEC 62305', name: 'Protection Against Lightning & Surges' }
    ],
    deliverables: [
      'Comprehensive Single Line Diagrams (HT/LT SLD)',
      'Power, Small Power & Raw Power Floor Distribution Layouts',
      'Indoor & Outdoor Lighting Layouts with Circuiting Schedules',
      'Earthing & Lightning Protection Grid Shop Layouts',
      'Substation & Electrical Room Layouts with Statutory Clearances'
    ]
  },
  {
    id: 'fire-fighting-design',
    category: 'Fire Fighting',
    disciplineKey: 'fire-fighting',
    disciplineNumber: '03',
    badge: 'FIRE FIGHTING & HYDRAULIC SUPPRESSION',
    title: 'Fire Fighting & Hydraulic Suppression',
    shortTitle: 'Fire Fighting',
    tagline: 'Fully compliant hydrant, wet-riser, automated sprinkler, and high-pressure fire pump room engineering.',
    iconType: 'flame',
    statHighlight: { value: '100%', label: 'First-Pass Fire NOC Approval Rate' },
    summary: 'Life-safety hydraulic suppression engineering featuring internal wet-risers, yard hydrants, automated sprinkler networks, and dedicated high-pressure fire pump stations.',
    description: "GGA delivers life-critical fire safety suppression engineering compliant with NBC 2016 Part 4, NFPA standards, and state Fire and Rescue Services department requirements. We protect high-rise occupants and high-value capital assets.",
    coreScope: [
      'Hydraulic node calculation & water demand sizing for fire reserves',
      'Internal wet-riser system with landing valves & first-aid hose reels',
      'External yard hydrant ring mains with landing valves and breeching inlets',
      'Automated wet-pipe sprinkler grid layout for basements and occupied floors',
      'Dedicated fire pump room layout (Main Electric, Standby Diesel, Jockey & Booster pumps)',
      'Pre-action sprinkler & clean agent gaseous suppression for server rooms & substations',
      'Deluge water spray system for transformers and flammable fuel storage',
      'Portable & trolley fire extinguisher allocation and statutory escape signage'
    ],
    standards: [
      { code: 'NBC 2016 Part 4', name: 'Fire & Life Safety Standards' },
      { code: 'IS 3844 & IS 15105', name: 'Hydrant & Sprinkler Design Codes' },
      { code: 'NFPA 13, 14, 20', name: 'National Fire Protection Association Standards' },
      { code: 'State Fire Authority', name: 'Fire and Rescue Services Department NOC Rules' }
    ],
    deliverables: [
      'Fire Hydraulic Schematic & System P&ID Flow Diagrams',
      'Fire Pump Room GA with Header, Suction & Delivery Sizing',
      'Floor-wise Hydrant & Sprinkler Distribution GFC Plans',
      'Fire Water Underground & Overhead Storage Tank Details',
      'Tender Specification & Fire Department NOC Compliance Packs'
    ]
  },
  {
    id: 'fire-alarm-systems',
    category: 'Fire Alarm & Detection',
    disciplineKey: 'fire-alarm',
    disciplineNumber: '04',
    badge: 'FIRE ALARM & DETECTION SYSTEMS',
    title: 'Fire Alarm & Emergency Detection Systems',
    shortTitle: 'Fire Alarm & Detection',
    tagline: 'Microprocessor addressable detection, smoke management, and integrated emergency evacuation.',
    iconType: 'bell',
    statHighlight: { value: '<30s', label: 'Egress Evacuation Warning Response' },
    summary: 'Intelligent analogue addressable fire detection, optical smoke and heat sensor networks, HVAC damper trips, and public address evacuation integration.',
    description: "Early warning is the cornerstone of life safety. GGA designs intelligent analogue addressable fire alarm systems interfacing seamlessly with HVAC fire dampers, elevator grounding, access control door unlocking, and public address evacuation systems.",
    coreScope: [
      'Analogue addressable optical smoke, thermal heat & multi-sensor detector layouts',
      'Main Fire Alarm Control Panel (FACP) & Repeater Panel network architecture',
      'Manual Call Points (MCP) and strobe sounders along statutory exit egress paths',
      'Beam detectors for high-ceiling warehouses, atriums & industrial bays',
      'Duct smoke detectors and interface modules for HVAC fire damper trip',
      'Voice Evacuation & Public Address (PA/VA) integration for zoned phased evacuation',
      'Lift grounding control module & magnetic door release integration',
      'Integration with Building Management System (BMS) and central fire command center'
    ],
    standards: [
      { code: 'IS 2189:2008', name: 'Selection, Installation & Maintenance of Fire Alarms' },
      { code: 'NBC 2016 Part 4', name: 'Life Safety Egress & Emergency Signaling' },
      { code: 'NFPA 72', name: 'National Fire Alarm and Signaling Code' },
      { code: 'EN 54 Standards', name: 'Fire Detection & Alarm System Components' }
    ],
    deliverables: [
      'Fire Alarm System Loop Schematics & Panel Riser Diagrams',
      'Floor-wise Addressable Device Mapping & Cable Route Plans',
      'Fire Interlocking Cause & Effect (Matrix) Logic Sheets',
      'Fire Command Center Ergonomic & Equipment Layouts',
      'Detailed Device Schedule & Cable Sizing Calculations'
    ]
  },
  {
    id: 'hvac-design',
    category: 'HVAC & Ventilation',
    disciplineKey: 'hvac',
    disciplineNumber: '05',
    badge: 'HVAC & MECHANICAL VENTILATION',
    title: 'HVAC & Mechanical Ventilation Coordination',
    shortTitle: 'HVAC & Ventilation',
    tagline: 'Cooling load calculations, duct spatial routing, basement smoke exhaust, and energy recovery systems.',
    iconType: 'wind',
    statHighlight: { value: '25%+', label: 'Energy Reduction vs Standard Baselines' },
    summary: 'Thermal comfort and ventilation engineering, including cooling load simulations, VRF and chiller routing, basement smoke extraction, and staircase pressurization.',
    description: "GGA coordinates indoor environmental air quality and thermal comfort with minimal energy consumption. We harmonize duct paths with structural beams and false ceiling heights, preventing site clashes and costly field modifications.",
    coreScope: [
      'Building thermal envelope heat-load analysis & tonnage calculation',
      'Central chilled water plant vs VRF/VRV system selection & feasibility',
      'Air Handling Units (AHU) & Fan Coil Units (FCU) zoning and piping layout',
      'Precision Air Conditioning (PAC) for server rooms and data centers',
      'Basement car park mechanical ventilation & jet fan induction systems',
      'Kitchen exhaust, scrubber systems & fresh air makeup coordination',
      'Toilet exhaust ventilation & shaft riser duct sizing',
      'Staircase & lift well pressurization for smoke-free emergency egress'
    ],
    standards: [
      { code: 'ASHRAE 90.1 & 62.1', name: 'Energy Standard & Indoor Air Quality' },
      { code: 'IS 659', name: 'Safety Code for Air Conditioning' },
      { code: 'NBC 2016 Part 8 Sec 3', name: 'Air Conditioning, Heating & Mechanical Ventilation' },
      { code: 'ECBC Guidelines', name: 'Energy Conservation Building Code Compliance' }
    ],
    deliverables: [
      'HVAC Chilled Water & Refrigerant Piping Schematics',
      'Ductwork Spatial Routing & False Ceiling Level Coordination',
      'Basement Jet Fan & Exhaust Ductwork GFC Layouts',
      'Plant Room & AHU Room Cross-Sectional Elevation Drawings',
      'Equipment Schedules & Acoustic Attenuation Specifications'
    ]
  }
];

const STORAGE_KEY = 'gga_services_data_v1';
const UPDATE_EVENT = 'gga_services_updated';

// Normalizes a service record ensuring coreScope, standards, deliverables are always valid Arrays
export function normalizeService(raw) {
  if (!raw) return raw;
  const s = { ...raw };

  // Category fallback
  if (!s.category) {
    const matched = SERVICE_CATEGORIES.find(c => c.id === s.disciplineKey);
    s.category = matched ? matched.name : 'General MEP';
  }

  // coreScope: ensure Array
  if (typeof s.coreScope === 'string') {
    try { s.coreScope = JSON.parse(s.coreScope); } catch (_) { s.coreScope = []; }
  }
  if (!Array.isArray(s.coreScope)) s.coreScope = [];

  // standards: ensure Array
  if (typeof s.standards === 'string') {
    try { s.standards = JSON.parse(s.standards); } catch (_) { s.standards = []; }
  }
  if (!Array.isArray(s.standards)) s.standards = [];

  // deliverables: ensure Array
  if (typeof s.deliverables === 'string') {
    try { s.deliverables = JSON.parse(s.deliverables); } catch (_) { s.deliverables = []; }
  }
  if (!Array.isArray(s.deliverables)) s.deliverables = [];

  // statHighlight: ensure Object { value, label }
  if (typeof s.statHighlight === 'string') {
    try { s.statHighlight = JSON.parse(s.statHighlight); } catch (_) { s.statHighlight = null; }
  }
  if (!s.statHighlight || typeof s.statHighlight !== 'object') {
    s.statHighlight = { value: '100%', label: 'Engineering Precision' };
  }

  return s;
}

// Helper to get currently active services
export function getStoredServices() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizeService);
      }
    }
  } catch (e) {
    console.warn('Failed to parse local services data', e);
  }
  return DEFAULT_SERVICES.map(normalizeService);
}

// Helper to save services
export async function saveServices(servicesList) {
  try {
    const normalized = (Array.isArray(servicesList) ? servicesList : []).map(normalizeService);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: normalized }));

    // Also attempt background sync with backend if available
    try {
      await fetch(`${API}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(normalized)
      });
    } catch (apiErr) {
      console.info('Backend sync skipped or offline, local changes active');
    }
    return { success: true, count: normalized.length };
  } catch (error) {
    console.error('Error saving services:', error);
    return { success: false, error: error.message };
  }
}

// Helper to reset services back to defaults
export function resetServicesToDefault() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: DEFAULT_SERVICES }));
  return DEFAULT_SERVICES;
}

// React Hook to access and listen to live updated services
export function useServices() {
  const [services, setServicesState] = useState(() => getStoredServices());

  useEffect(() => {
    // 1. Initial attempt to load from backend if available
    fetch(`${API}/services`)
      .then((res) => (res.ok ? res.json() : null))
      .then((serverData) => {
        if (Array.isArray(serverData) && serverData.length > 0) {
          const normalized = serverData.map(normalizeService);
          setServicesState(normalized);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
          } catch (_) {}
        }
      })
      .catch(() => {});

    // 2. Listen to custom update events across components
    const handleUpdate = (e) => {
      if (e.detail && Array.isArray(e.detail)) {
        setServicesState(e.detail.map(normalizeService));
      } else {
        setServicesState(getStoredServices());
      }
    };

    window.addEventListener(UPDATE_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(UPDATE_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const updateServices = async (nextServices) => {
    const res = await saveServices(nextServices);
    setServicesState(nextServices);
    return res;
  };

  const resetServices = () => {
    const def = resetServicesToDefault();
    setServicesState(def);
    return def;
  };

  return {
    services,
    setServices: updateServices,
    resetServices
  };
}

