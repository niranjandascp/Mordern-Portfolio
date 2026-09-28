import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEO({
  title = 'Niranjan Das C.P. | Full Stack Developer',
  description = 'Niranjan Das C.P. is a Full Stack Developer from Thrissur, Kerala, specializing in React, Next.js, Node.js, NestJS, TypeScript, MongoDB, PostgreSQL, and modern web applications.',
  image = 'https://niranjandas.in/assets/profile.png',
  url = 'https://niranjandas.in/',
  type = 'website',
}: SEOProps) {
  useEffect(() => {
    // Page title
    document.title = title;

    const updateMetaTag = (
      name: string,
      content: string,
      attribute: string = 'name'
    ) => {
      let element = document.querySelector(
        `meta[${attribute}="${name}"]`
      ) as HTMLMetaElement | null;

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Basic SEO
    updateMetaTag('description', description);

    // Open Graph
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', image, 'property');
    updateMetaTag('og:url', url, 'property');
    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:site_name', 'Niranjan Das C.P.', 'property');

    // Twitter / X
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Canonical URL
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;

    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }

    canonical.setAttribute('href', url);

    // Person structured data
    const structuredDataId = 'niranjan-person-schema';

    let structuredData = document.getElementById(
      structuredDataId
    ) as HTMLScriptElement | null;

    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.id = structuredDataId;
      structuredData.type = 'application/ld+json';
      document.head.appendChild(structuredData);
    }

    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Niranjan Das C.P.',
      url: 'https://niranjandas.in/',
      image: 'https://niranjandas.in/assets/profile.png',
      jobTitle: 'Full Stack Developer',
      description:
        'Full Stack Developer from Thrissur, Kerala specializing in React, Next.js, Node.js, NestJS, TypeScript, MongoDB, and PostgreSQL.',
      sameAs: [
        'https://github.com/niranjandascp',
        'https://www.linkedin.com/in/niranjandascp/',
        'https://leetcode.com/u/niranjandascp/',
      ],
    });
  }, [title, description, image, url, type]);

  return null;
}