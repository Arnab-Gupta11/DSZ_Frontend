const fs = require('fs');

let content = fs.readFileSync('src/constants/services.ts', 'utf-8');

const images = {
  brand: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
  marketing: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  design: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800',
  video: 'https://images.unsplash.com/photo-1574717024453-354056aafd0c?auto=format&fit=crop&q=80&w=800',
  web: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
  automation: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
};

content = content.replace(/visual: '(\w+)'/g, (match, visual) => {
  return `${match},\n  image: '${images[visual] || images.brand}'`;
});

fs.writeFileSync('src/constants/services.ts', content);
console.log('Updated services.ts');
