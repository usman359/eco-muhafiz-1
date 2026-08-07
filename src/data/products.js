export const PRODUCTS_DATA = [
  {
    id: 'eco-guardian',
    slug: 'eco-guardian',
    title: 'Eco Guardian',
    subtitle: 'AI-Powered Forest Protection & Biodiversity Monitoring',
    tagline: 'Protect forests before irreversible damage occurs.',
    tag: 'Active Deployment',
    img: '/images/eco_guardian_device.jpeg',
    secondaryImgs: [
      '/images/eco_guardian_tree_deployment.jpeg',
      '/images/eco_guardian_app_dashboard.png',
      '/images/eco_guardian_app_map.png'
    ],
    secondaryTitle: 'On-Ground Technology & App Telemetry',
    desc: 'Eco Guardian is a solar-powered, AI-enabled monitoring system that provides continuous protection for forests. Using edge AI, acoustic sensing, IoT, satellite imagery, and GIS, it detects illegal activities, monitors forest health, and tracks biodiversity in real time. Instead of relying solely on patrols or periodic inspections, Eco Guardian enables 24/7 automated monitoring, allowing authorities and conservation organizations to respond faster and make informed decisions.',
    features: [
      'Real-time detection of illegal logging through chainsaw and axe sounds',
      'Gunshot detection to support anti-poaching efforts',
      'AI-powered biodiversity monitoring using bioacoustic analysis',
      'Satellite and GIS-based forest health monitoring',
      'Wildfire risk monitoring and early detection',
      'Instant alerts and centralized monitoring dashboard',
      'Solar-powered devices designed for remote deployment'
    ],
    idealFor: [
      'Government forest departments',
      'National parks',
      'Protected areas',
      'NGOs',
      'Conservation organizations',
      'Corporate biodiversity projects'
    ]
  },
  {
    id: 'eco-atlas',
    slug: 'eco-atlas',
    title: 'Eco Atlas',
    subtitle: 'Carbon Monitoring, Emissions Tracking & Nature-Based Offset Management',
    tagline: 'Measure your emissions. Track your climate action.',
    tag: 'Carbon & GIS Platform',
    img: '/images/eco_atlas_forest_monitoring.png',
    secondaryImgs: [
      '/images/eco_atlas_carbon_dashboard.png',
      '/images/eco_atlas_cockpit.png',
      '/images/maps.png'
    ],
    secondaryTitle: 'Platform & Satellite Dashboard Telemetry',
    desc: 'Eco Atlas is an intelligent carbon monitoring platform that helps organizations understand their emissions while managing nature-based carbon offset projects from a single dashboard. The platform calculates greenhouse gas emissions, provides practical reduction recommendations, and monitors afforestation projects using GIS and satellite imagery. It estimates carbon sequestration using established literature-based carbon factors, enabling organizations to visualize how their restoration projects contribute toward offsetting emissions.',
    features: [
      'Organizational carbon footprint calculation',
      'Emissions dashboard and reporting',
      'AI-driven recommendations to reduce emissions',
      'Afforestation project monitoring through GIS and satellite imagery',
      'Plantation survival and growth tracking',
      'Estimated carbon sequestration calculations using literature-based emission and sequestration factors',
      'Carbon offset progress tracking',
      'ESG and sustainability reporting support'
    ],
    idealFor: [
      'Corporations',
      'Manufacturing industries',
      'Real estate developers',
      'Universities',
      'Government organizations',
      'ESG teams',
      'Sustainability consultants'
    ]
  }
];

export function getProductById(idOrSlug) {
  return PRODUCTS_DATA.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}
