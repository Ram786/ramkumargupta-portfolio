export default function sitemap() {
  const base = 'https://your-domain.com';
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}#projects`, lastModified: new Date() },
    { url: `${base}#skills`, lastModified: new Date() },
    { url: `${base}#metrics`, lastModified: new Date() },
    { url: `${base}#oss`, lastModified: new Date() },
    { url: `${base}#case-studies`, lastModified: new Date() },
    { url: `${base}#contact`, lastModified: new Date() },
  ];
}
