import { Product, ProductImage, ProductSpecification, GrowingGuide, DownloadableResource } from '@/lib/types/product';

// Sample product images
const createProductImages = (productName: string, count: number = 4): ProductImage[] => {
  let mainImage = '/placeholder.jpg';

  if (productName.includes('Tomato')) {
    mainImage = '/images/product-tomato.jpg';
  } else if (productName.includes('Pepper')) {
    mainImage = '/images/product-pepper.jpg';
  } else if (productName.includes('Wheat')) {
    mainImage = '/images/product-wheat.jpg';
  }

  return Array.from({ length: count }, (_, index) => ({
    id: `${productName.toLowerCase().replace(/\s+/g, '-')}-img-${index + 1}`,
    url: index === 0 ? mainImage : `/placeholder.jpg`, // Only main image is real for now
    altText: `${productName} - View ${index + 1}`,
    caption: index === 0 ? `${productName} - Main view` : `${productName} - Angle ${index + 1}`,
    isPrimary: index === 0,
    sortOrder: index,
  }));
};

// Sample specifications
const createBasicSpecs = (product: Partial<Product>): ProductSpecification[] => [
  {
    id: 'spec-1',
    name: 'Seed Type',
    value: product.category || 'Hybrid',
    category: 'Basic',
  },
  {
    id: 'spec-2',
    name: 'Maturity Time',
    value: product.maturityTime || '60-80 days',
    category: 'Growing',
  },
  {
    id: 'spec-3',
    name: 'Planting Season',
    value: product.seasonality?.join(', ') || 'All-Season',
    category: 'Growing',
  },
  {
    id: 'spec-4',
    name: 'Difficulty Level',
    value: product.difficultyLevel || 'Intermediate',
    category: 'Growing',
  },
  {
    id: 'spec-5',
    name: 'Expected Yield',
    value: product.yieldExpectation || 'High',
    category: 'Harvest',
  },
];

// Sample downloadable resources
const createDownloadableResources = (productName: string): DownloadableResource[] => [
  {
    id: `${productName.toLowerCase().replace(/\s+/g, '-')}-guide-pdf`,
    title: `${productName} Complete Growing Guide`,
    description: 'Comprehensive PDF guide covering all aspects of growing, from seed to harvest',
    type: 'guide',
    url: `/guides/${productName.toLowerCase().replace(/\s+/g, '-')}-complete-guide.pdf`,
    fileSize: '2.4 MB',
    downloadCount: 1250,
    featured: true,
  },
  {
    id: `${productName.toLowerCase().replace(/\s+/g, '-')}-planting-calendar`,
    title: 'Seasonal Planting Calendar',
    description: 'Month-by-month planting schedule optimized for different climate zones',
    type: 'pdf',
    url: `/guides/${productName.toLowerCase().replace(/\s+/g, '-')}-calendar.pdf`,
    fileSize: '850 KB',
    downloadCount: 890,
    featured: false,
  },
  {
    id: `${productName.toLowerCase().replace(/\s+/g, '-')}-care-tips`,
    title: 'Quick Care Tips Card',
    description: 'Printable reference card with essential care instructions',
    type: 'pdf',
    url: `/guides/${productName.toLowerCase().replace(/\s+/g, '-')}-care-tips.pdf`,
    fileSize: '320 KB',
    downloadCount: 2100,
    featured: false,
  },
  {
    id: `${productName.toLowerCase().replace(/\s+/g, '-')}-growth-stages`,
    title: 'Growth Stages Photo Guide',
    description: 'Visual guide showing different growth stages with photos',
    type: 'image',
    url: `/guides/${productName.toLowerCase().replace(/\s+/g, '-')}-growth-stages.jpg`,
    fileSize: '1.8 MB',
    downloadCount: 650,
    featured: false,
  },
];

// Sample growing guide
const createGrowingGuide = (productName: string): GrowingGuide => ({
  id: `guide-${productName.toLowerCase().replace(/\s+/g, '-')}`,
  title: `${productName} Growing Guide`,
  pdfUrl: `/guides/${productName.toLowerCase().replace(/\s+/g, '-')}-guide.pdf`,
  sections: [
    {
      id: 'section-1',
      title: 'Soil Preparation',
      content: 'Prepare well-drained, fertile soil with pH 6.0-7.0. Add organic compost for better results.',
      order: 1,
    },
    {
      id: 'section-2',
      title: 'Planting Instructions',
      content: 'Sow seeds at appropriate depth and spacing. Maintain consistent moisture during germination.',
      order: 2,
    },
    {
      id: 'section-3',
      title: 'Care and Maintenance',
      content: 'Regular watering, fertilization, and pest monitoring for optimal growth.',
      order: 3,
    },
    {
      id: 'section-4',
      title: 'Harvesting',
      content: 'Harvest at the right maturity stage for best quality and yield.',
      order: 4,
    },
  ],
});

export const sampleProducts: Product[] = [
  {
    id: 'tomato-hybrid-001',
    name: 'Premium Tomato Seeds',
    category: 'Vegetable',
    subcategory: 'Fruit Vegetables',
    description: 'High-yielding hybrid tomato variety with excellent disease resistance and shelf life.',
    longDescription: 'Our Premium Tomato Seeds represent the pinnacle of hybrid breeding technology. These seeds produce robust plants with exceptional disease resistance, particularly against common tomato ailments like blight and wilt. The fruits are uniform in size, have excellent shelf life, and possess the perfect balance of sweetness and acidity that makes them ideal for both fresh consumption and processing. With proper care, these plants can yield up to 40% more than traditional varieties while maintaining superior fruit quality throughout the growing season.',
    images: createProductImages('Premium Tomato Seeds', 5),
    specifications: [
      ...createBasicSpecs({
        category: 'Vegetable',
        maturityTime: '75-85 days',
        seasonality: ['Spring', 'Summer'],
        difficultyLevel: 'Intermediate',
        yieldExpectation: '8-12 kg per plant',
      }),
      {
        id: 'spec-tomato-1',
        name: 'Fruit Weight',
        value: '150-200g per fruit',
        category: 'Harvest',
      },
      {
        id: 'spec-tomato-2',
        name: 'Plant Height',
        value: '4-6 feet',
        category: 'Growing',
      },
      {
        id: 'spec-tomato-3',
        name: 'Disease Resistance',
        value: 'Blight, Wilt, Mosaic Virus',
        category: 'Basic',
      },
    ],
    growingGuide: createGrowingGuide('Premium Tomato Seeds'),
    downloadableResources: createDownloadableResources('Premium Tomato Seeds'),
    seasonality: ['Spring', 'Summer'],
    difficultyLevel: 'Intermediate',
    yieldExpectation: '8-12 kg per plant',
    maturityTime: '75-85 days',
    plantingInstructions: 'Start seeds indoors 6-8 weeks before last frost. Transplant seedlings after soil temperature reaches 60°F (16°C). Space plants 24-36 inches apart in rows 3-4 feet apart.',
    careInstructions: 'Provide consistent moisture (1-2 inches per week). Stake or cage plants for support. Apply balanced fertilizer every 2-3 weeks. Prune suckers for better fruit development.',
    harvestingTips: 'Harvest when fruits are fully colored but still firm. Pick regularly to encourage continued production. Green tomatoes can be harvested before frost and ripened indoors.',
    storageGuidance: 'Store ripe tomatoes at room temperature for best flavor. Refrigerate only fully ripe tomatoes for extended storage. Green tomatoes can be stored in a cool, dry place to ripen gradually.',
    nutritionalInfo: {
      calories: 18,
      protein: 0.9,
      carbohydrates: 3.9,
      fiber: 1.2,
      vitamins: ['Vitamin C', 'Vitamin K', 'Folate', 'Potassium'],
    },
    certifications: ['Organic Certified', 'Non-GMO'],
    availability: true,
    featured: true,
    seoMetadata: {
      title: 'Premium Tomato Seeds - High Yield Hybrid Variety | Savaj Seeds',
      description: 'Grow exceptional tomatoes with our premium hybrid seeds. Disease resistant, high-yielding variety perfect for home gardens and commercial farming.',
      keywords: ['tomato seeds', 'hybrid tomato', 'disease resistant', 'high yield', 'vegetable seeds'],
      ogTitle: 'Premium Tomato Seeds - High Yield Hybrid Variety',
      ogDescription: 'Grow exceptional tomatoes with our premium hybrid seeds. Disease resistant, high-yielding variety perfect for home gardens and commercial farming.',
      ogImage: '/images/product-tomato.jpg',
      structuredData: {
        '@type': 'Product',
        name: 'Premium Tomato Seeds',
        category: 'Vegetable Seeds',
        brand: 'Savaj Seeds',
      },
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'pepper-hybrid-002',
    name: 'Sweet Pepper Seeds',
    category: 'Vegetable',
    subcategory: 'Fruit Vegetables',
    description: 'Colorful bell pepper variety with thick walls and excellent flavor profile.',
    longDescription: 'Our Sweet Pepper Seeds produce vibrant, thick-walled bell peppers in multiple colors including red, yellow, orange, and green. These peppers are known for their exceptional sweetness, crisp texture, and versatility in cooking. The plants are compact yet productive, making them suitable for both garden beds and container growing. With excellent disease resistance and consistent fruit set, these peppers are perfect for fresh eating, stuffing, grilling, or preserving.',
    images: createProductImages('Sweet Pepper Seeds', 4),
    specifications: [
      ...createBasicSpecs({
        category: 'Vegetable',
        maturityTime: '70-80 days',
        seasonality: ['Spring', 'Summer'],
        difficultyLevel: 'Beginner',
        yieldExpectation: '15-20 peppers per plant',
      }),
      {
        id: 'spec-pepper-1',
        name: 'Fruit Size',
        value: '3-4 inches',
        category: 'Harvest',
      },
      {
        id: 'spec-pepper-2',
        name: 'Wall Thickness',
        value: '6-8mm',
        category: 'Harvest',
      },
    ],
    growingGuide: createGrowingGuide('Sweet Pepper Seeds'),
    downloadableResources: createDownloadableResources('Sweet Pepper Seeds'),
    seasonality: ['Spring', 'Summer'],
    difficultyLevel: 'Beginner',
    yieldExpectation: '15-20 peppers per plant',
    maturityTime: '70-80 days',
    plantingInstructions: 'Start seeds indoors 8-10 weeks before last frost. Transplant after soil temperature consistently reaches 65°F (18°C). Space plants 18-24 inches apart.',
    careInstructions: 'Maintain consistent soil moisture. Provide support for heavy-fruited plants. Apply balanced fertilizer monthly. Mulch around plants to retain moisture.',
    harvestingTips: 'Harvest peppers when they reach full size and desired color. Regular harvesting encourages more fruit production. Use clean, sharp tools to avoid plant damage.',
    storageGuidance: 'Fresh peppers can be stored in the refrigerator for 1-2 weeks. For longer storage, peppers can be frozen, dried, or pickled.',
    certifications: ['Organic Certified'],
    availability: true,
    featured: true,
    seoMetadata: {
      title: 'Sweet Pepper Seeds - Colorful Bell Pepper Variety | Savaj Seeds',
      description: 'Grow delicious, colorful bell peppers with thick walls and sweet flavor. Perfect for home gardens and cooking enthusiasts.',
      keywords: ['pepper seeds', 'bell pepper', 'sweet pepper', 'colorful peppers', 'vegetable seeds'],
      ogTitle: 'Sweet Pepper Seeds - Colorful Bell Pepper Variety',
      ogDescription: 'Grow delicious, colorful bell peppers with thick walls and sweet flavor. Perfect for home gardens and cooking enthusiasts.',
      ogImage: '/images/product-pepper.jpg',
      structuredData: {
        '@type': 'Product',
        name: 'Sweet Pepper Seeds',
        category: 'Vegetable Seeds',
        brand: 'Savaj Seeds',
      },
    },
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: 'wheat-hybrid-003',
    name: 'Hybrid Wheat Seeds',
    category: 'Crop',
    subcategory: 'Cereal Crops',
    description: 'Premium wheat variety optimized for Indian climate with superior grain quality.',
    longDescription: 'Our Hybrid Wheat Seeds are specifically developed for Indian growing conditions, offering exceptional performance across diverse climatic zones. These seeds produce high-quality grain with excellent protein content and superior milling characteristics. The variety shows remarkable resistance to common wheat diseases and pests, ensuring consistent yields even under challenging conditions. With improved drought tolerance and efficient nutrient utilization, this wheat variety is ideal for both irrigated and rain-fed agriculture.',
    images: createProductImages('Hybrid Wheat Seeds', 3),
    specifications: [
      ...createBasicSpecs({
        category: 'Crop',
        maturityTime: '120-130 days',
        seasonality: ['Winter'],
        difficultyLevel: 'Intermediate',
        yieldExpectation: '45-55 quintals per hectare',
      }),
      {
        id: 'spec-wheat-1',
        name: 'Protein Content',
        value: '12-14%',
        category: 'Harvest',
      },
      {
        id: 'spec-wheat-2',
        name: 'Plant Height',
        value: '90-100 cm',
        category: 'Growing',
      },
    ],
    growingGuide: createGrowingGuide('Hybrid Wheat Seeds'),
    downloadableResources: createDownloadableResources('Hybrid Wheat Seeds'),
    seasonality: ['Winter'],
    difficultyLevel: 'Intermediate',
    yieldExpectation: '45-55 quintals per hectare',
    maturityTime: '120-130 days',
    plantingInstructions: 'Sow seeds in well-prepared fields during optimal sowing window (November-December). Use seed rate of 100-120 kg per hectare. Maintain row spacing of 20-22.5 cm.',
    careInstructions: 'Apply recommended fertilizer doses in splits. Ensure adequate irrigation at critical growth stages. Monitor for pests and diseases regularly.',
    harvestingTips: 'Harvest when grains reach physiological maturity (moisture content 20-25%). Use proper harvesting equipment to minimize grain losses.',
    storageGuidance: 'Dry grains to 12% moisture content before storage. Store in clean, dry, pest-free conditions. Use proper storage structures to prevent quality deterioration.',
    certifications: ['Certified Seed'],
    availability: true,
    featured: false,
    seoMetadata: {
      title: 'Hybrid Wheat Seeds - High Yield Variety for Indian Climate | Savaj Seeds',
      description: 'Premium hybrid wheat seeds optimized for Indian conditions. High protein content, disease resistant, and excellent yield potential.',
      keywords: ['wheat seeds', 'hybrid wheat', 'crop seeds', 'high yield wheat', 'Indian climate'],
      ogTitle: 'Hybrid Wheat Seeds - High Yield Variety for Indian Climate',
      ogDescription: 'Premium hybrid wheat seeds optimized for Indian conditions. High protein content, disease resistant, and excellent yield potential.',
      ogImage: '/images/product-wheat.jpg',
      structuredData: {
        '@type': 'Product',
        name: 'Hybrid Wheat Seeds',
        category: 'Crop Seeds',
        brand: 'Savaj Seeds',
      },
    },
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-17'),
  },
];

// Helper function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return sampleProducts.find(product => product.id === id);
};

// Helper function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return sampleProducts.filter(product =>
    product.category.toLowerCase() === category.toLowerCase()
  );
};

// Helper function to get featured products
export const getFeaturedProducts = (): Product[] => {
  return sampleProducts.filter(product => product.featured);
};