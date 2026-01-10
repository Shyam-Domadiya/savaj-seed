const https = require('https');
const http = require('http');

const baseUrl = 'http://localhost:3001';

const testUrls = [
  '/',
  '/products',
  '/blog',
  '/contact',
  '/about',
  '/faq',
  '/certifications',
  '/locations/ahmedabad',
  '/sitemap.xml',
  '/robots.txt'
];

async function testUrl(url) {
  return new Promise((resolve, reject) => {
    const fullUrl = baseUrl + url;
    console.log(`Testing: ${fullUrl}`);
    
    http.get(fullUrl, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const result = {
          url,
          status: res.statusCode,
          headers: res.headers,
          hasTitle: data.includes('<title>'),
          hasDescription: data.includes('name="description"'),
          hasKeywords: data.includes('name="keywords"'),
          hasOgTitle: data.includes('property="og:title"'),
          hasOgDescription: data.includes('property="og:description"'),
          hasStructuredData: data.includes('application/ld+json'),
          hasCanonical: data.includes('rel="canonical"'),
          contentLength: data.length
        };
        
        console.log(`✓ ${url} - Status: ${result.status}, Title: ${result.hasTitle}, Meta: ${result.hasDescription}, OG: ${result.hasOgTitle}, Schema: ${result.hasStructuredData}`);
        resolve(result);
      });
    }).on('error', (err) => {
      console.error(`✗ ${url} - Error: ${err.message}`);
      reject(err);
    });
  });
}

async function runSEOTests() {
  console.log('🔍 Running SEO Tests...\n');
  
  const results = [];
  
  for (const url of testUrls) {
    try {
      const result = await testUrl(url);
      results.push(result);
      await new Promise(resolve => setTimeout(resolve, 100)); // Small delay between requests
    } catch (error) {
      console.error(`Failed to test ${url}:`, error.message);
    }
  }
  
  console.log('\n📊 SEO Test Summary:');
  console.log('===================');
  
  const summary = {
    totalPages: results.length,
    pagesWithTitle: results.filter(r => r.hasTitle).length,
    pagesWithDescription: results.filter(r => r.hasDescription).length,
    pagesWithKeywords: results.filter(r => r.hasKeywords).length,
    pagesWithOG: results.filter(r => r.hasOgTitle && r.hasOgDescription).length,
    pagesWithSchema: results.filter(r => r.hasStructuredData).length,
    pagesWithCanonical: results.filter(r => r.hasCanonical).length,
    successfulRequests: results.filter(r => r.status === 200).length
  };
  
  console.log(`✓ Total pages tested: ${summary.totalPages}`);
  console.log(`✓ Successful requests: ${summary.successfulRequests}/${summary.totalPages}`);
  console.log(`✓ Pages with titles: ${summary.pagesWithTitle}/${summary.totalPages}`);
  console.log(`✓ Pages with descriptions: ${summary.pagesWithDescription}/${summary.totalPages}`);
  console.log(`✓ Pages with keywords: ${summary.pagesWithKeywords}/${summary.totalPages}`);
  console.log(`✓ Pages with Open Graph: ${summary.pagesWithOG}/${summary.totalPages}`);
  console.log(`✓ Pages with structured data: ${summary.pagesWithSchema}/${summary.totalPages}`);
  console.log(`✓ Pages with canonical URLs: ${summary.pagesWithCanonical}/${summary.totalPages}`);
  
  const seoScore = Math.round(
    ((summary.pagesWithTitle + summary.pagesWithDescription + summary.pagesWithOG + summary.pagesWithSchema) / (summary.totalPages * 4)) * 100
  );
  
  console.log(`\n🎯 Overall SEO Score: ${seoScore}%`);
  
  if (seoScore >= 90) {
    console.log('🎉 Excellent SEO implementation!');
  } else if (seoScore >= 75) {
    console.log('👍 Good SEO implementation with room for improvement.');
  } else {
    console.log('⚠️  SEO implementation needs attention.');
  }
}

runSEOTests().catch(console.error);