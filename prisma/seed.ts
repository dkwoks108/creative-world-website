import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Creativee World Admin & Content database...');

  // 1. Seed Admin User
  const defaultEmail = process.env.ADMIN_EMAIL || 'admin@creativeworld.in';
  const defaultPassword = 'CreativeeAdmin2026!';
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  const admin = await prisma.adminUser.upsert({
    where: { email: defaultEmail },
    update: { passwordHash: hashedPassword },
    create: {
      email: defaultEmail,
      name: 'Agency Admin',
      passwordHash: hashedPassword,
      role: 'ADMIN',
    },
  });
  console.log(`Admin account verified: ${admin.email}`);

  // 2. Seed Default Site Settings (Single Source of Truth)
  const defaultSettings: Record<string, string> = {
    company_name: 'Creativee World',
    company_tagline: 'Digital Growth & Performance Marketing Agency',
    company_phone: '+91 73571 59122',
    company_email: 'marketing.creativeworld@gmail.com',
    company_whatsapp: '+91 73571 59122',
    company_address: 'Creativee Tower, C-Scheme, Jaipur, Rajasthan 302001, India',
    google_maps_url: 'https://maps.google.com/?q=C-Scheme+Jaipur',
    working_hours: 'Mon - Sat: 9:30 AM - 7:00 PM',
    logo_url: '/logo-symbol.png',
    dark_logo_url: '/logo-symbol.png',
    favicon_url: '/favicon.ico',
    social_instagram: 'https://instagram.com/creativeworld_in',
    social_linkedin: 'https://linkedin.com/company/creativeworld-in',
    social_youtube: 'https://youtube.com/@creativeworld_in',
    social_facebook: 'https://facebook.com/creativeworld.in',
    social_x: 'https://x.com/creativeworld_in',
    header_cta_label: 'Book Strategy Audit',
    header_cta_href: '/contact',
    footer_copyright: '© 2026 Creativee World Digital Agency. All rights reserved.',
  };

  for (const [key, value] of Object.entries(defaultSettings)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
  console.log('Site settings seeded.');

  // 3. Seed Header & Footer Navigation
  const headerMenu = await prisma.navigationMenu.upsert({
    where: { slug: 'main-header' },
    update: {},
    create: {
      name: 'Main Header Menu',
      slug: 'main-header',
      location: 'header',
    },
  });

  const headerItems = [
    { label: 'Home', href: '/', sortOrder: 1 },
    { label: 'Services', href: '/services', sortOrder: 2 },
    { label: 'Work', href: '/work', sortOrder: 3 },
    { label: 'Packages', href: '/packages', sortOrder: 4 },
    { label: 'Blog', href: '/blog', sortOrder: 5 },
    { label: 'About', href: '/about', sortOrder: 6 },
    { label: 'Contact', href: '/contact', sortOrder: 7 },
  ];

  for (const item of headerItems) {
    const existing = await prisma.menuItem.findFirst({
      where: { menuId: headerMenu.id, href: item.href },
    });
    if (existing) {
      await prisma.menuItem.update({
        where: { id: existing.id },
        data: {
          label: item.label,
          sortOrder: item.sortOrder,
        },
      });
    } else {
      await prisma.menuItem.create({
        data: {
          menuId: headerMenu.id,
          label: item.label,
          href: item.href,
          sortOrder: item.sortOrder,
        },
      });
    }
  }

  // 4. Seed Services
  const dbServicesSeed = [
    {
      name: 'Custom Website Development',
      slug: 'website-development',
      description: 'Custom React, Next.js, WordPress, and Shopify web applications engineered for speed, high conversion, and seamless user experience.',
      icon: 'Code',
      sortOrder: 1,
      features: JSON.stringify(['Custom Next.js & React Web Architecture', 'Mobile-First Responsive Design', 'Core Web Vitals & Page Speed (90+ score)', 'SEO-Friendly Headless CMS Integration']),
    },
    {
      name: 'Paid Advertising & Meta / Google Ads',
      slug: 'performance-marketing',
      description: 'High-intent Google Search campaigns and targeted Meta ads (Instagram & Facebook) engineered to generate qualified customer leads.',
      icon: 'Target',
      sortOrder: 2,
      features: JSON.stringify(['Google Search & PPC Campaigns', 'Meta Ads Geo & Interest Targeting', 'Conversion Rate Optimization', 'GA4 & Meta Pixel Attribution']),
    },
    {
      name: 'Social Media Marketing',
      slug: 'social-media-marketing',
      description: 'Strategic social content, visual brand identity, content calendars, and community management engineered for organic brand growth.',
      icon: 'Share2',
      sortOrder: 3,
      features: JSON.stringify(['Monthly Content Calendars', 'Custom Graphic Design & Copywriting', 'Organic Community Moderation', 'Monthly Analytics Reports']),
    },
    {
      name: 'SEO & Search Engine Intelligence',
      slug: 'seo',
      description: 'Technical search optimization, site speed enhancement, local Jaipur keyword strategies, and Google Business Profile optimization.',
      icon: 'Search',
      sortOrder: 4,
      features: JSON.stringify(['Technical SEO Audit & Speed Tuning', 'On-Page Keyword Hierarchy', 'Google Business Profile & Map Pack', 'Schema.org Structured Data']),
    },
    {
      name: 'Video Editing & Production',
      slug: 'video-editing',
      description: 'Engaging Instagram Reels, YouTube Shorts, explainer videos, kinetic typography, and motion graphics built to capture brand attention.',
      icon: 'Video',
      sortOrder: 5,
      features: JSON.stringify(['Instagram Reels & Shorts Editing', 'Kinetic Typography & Motion Graphics', 'Professional Sound Design & Mixing', 'Cinematic Color Grading']),
    },
  ];

  for (const s of dbServicesSeed) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        name: s.name,
        description: s.description,
        icon: s.icon,
        sortOrder: s.sortOrder,
        features: s.features,
        status: 'Published',
      },
      create: {
        name: s.name,
        slug: s.slug,
        description: s.description,
        icon: s.icon,
        sortOrder: s.sortOrder,
        features: s.features,
        status: 'Published',
      },
    });
  }

  // 5. Seed Team Members
  const teamMembers = [
    {
      name: 'Vikramaditya Rathore',
      designation: 'Managing Director & Brand Strategist',
      department: 'Leadership',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      bio: 'Over 12 years of experience building digital brands in Rajasthan.',
      linkedinUrl: 'https://linkedin.com',
      sortOrder: 1,
    },
    {
      name: 'Ananya Sharma',
      designation: 'Head of Growth & SEO Intelligence',
      department: 'Growth',
      photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
      bio: 'Specialist in technical SEO, generative search optimization (AEO), and organic reach.',
      linkedinUrl: 'https://linkedin.com',
      sortOrder: 2,
    },
  ];

  for (const m of teamMembers) {
    const existing = await prisma.teamMember.findFirst({ where: { name: m.name } });
    if (!existing) {
      await prisma.teamMember.create({ data: m });
    }
  }

  // 6. Seed Testimonials
  const testimonials = [
    {
      clientName: 'Rajesh Khandelwal',
      company: 'Khandelwal Jewellers Jaipur',
      designation: 'Founder & CEO',
      quote: 'Creativee World completely transformed our digital presence. Our organic footfall increased by 240% within 4 months.',
      rating: 5,
      status: 'Approved',
      sortOrder: 1,
    },
    {
      clientName: 'Priya Singhania',
      company: 'Pink City Healthcare',
      designation: 'Marketing Director',
      quote: 'The ROI on our Google Ads and landing page performance has been phenomenal. Truly a premier digital agency.',
      rating: 5,
      status: 'Approved',
      sortOrder: 2,
    },
  ];

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { clientName: t.clientName } });
    if (!existing) {
      await prisma.testimonial.create({ data: t });
    }
  }

  // 7. Seed Author & Blog Categories & Articles
  const author = await prisma.author.upsert({
    where: { id: 'author-cw-editorial' },
    update: {},
    create: {
      id: 'author-cw-editorial',
      name: 'Creativee World Editorial Team',
      role: 'Growth & Strategy Team',
      bio: 'Growth strategists and performance marketers at Creativee World Jaipur.',
      avatarUrl: '/logo-symbol.png',
    },
  });

  const categoryNames = ['Websites', 'SEO', 'Social Media', 'Digital Marketing', 'Local SEO', 'Google Ads'];
  const categoryMap: Record<string, string> = {};

  for (const name of categoryNames) {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    const cat = await prisma.category.upsert({
      where: { slug },
      update: {},
      create: {
        name,
        slug,
        description: `Strategic insights and guides for ${name} in Jaipur.`,
      },
    });
    categoryMap[name] = cat.id;
  }

  const articles = [
    {
      id: 'why-jaipur-businesses-need-a-website-2026',
      slug: 'why-jaipur-businesses-need-a-website-2026',
      title: 'Why Jaipur Businesses Need More Than an Instagram Page in 2026',
      excerpt: 'Relying solely on social media leaves your business vulnerable to algorithm changes. Learn why a fast, high-converting website is essential for sustainable growth in Jaipur.',
      categoryName: 'Websites',
      featuredImage: '/images/insights/cw-insight-website-2026-01.webp',
      status: 'PUBLISHED',
      seoTitle: 'Why Jaipur Businesses Need More Than an Instagram Page in 2026 | Creativee World',
      metaDescription: 'Relying solely on social media leaves your business vulnerable to algorithm changes.',
      content: JSON.stringify([
        { type: 'heading', level: 2, text: 'The Risk of Social-Only Digital Presence' },
        { type: 'paragraph', text: 'Many business owners in Jaipur start their digital journey with an Instagram profile. While social media is fantastic for visual discovery, relying exclusively on social platforms creates significant business risk.' },
      ]),
    },
  ];

  for (const article of articles) {
    const categoryId = categoryMap[article.categoryName];
    await prisma.post.upsert({
      where: { slug: article.slug },
      update: {},
      create: {
        id: article.id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        authorId: author.id,
        categoryId: categoryId,
        featuredImage: article.featuredImage,
        status: article.status,
        publishAt: new Date(),
        seoTitle: article.seoTitle,
        metaDescription: article.metaDescription,
        canonicalUrl: `https://creativeworld.in/insights/${article.slug}`,
      },
    });
  }

  // 8. Seed Sample CRM Inquiries & Events
  const sampleInquiry = await prisma.inquiry.create({
    data: {
      name: 'Rahul Sharma',
      email: 'rahul@abctech.in',
      phone: '+91 98765 43210',
      companyName: 'ABC Technologies',
      businessName: 'ABC Tech Ltd',
      service: 'Search Engine Optimization',
      budget: '₹50,000 - ₹1,00,000',
      budgetRange: '50k-100k',
      message: 'We require technical SEO and local Jaipur search ranking optimization for our cloud software product.',
      status: 'New',
      source: 'Website Form',
      utmSource: 'google',
      utmMedium: 'cpc',
      utmCampaign: 'jaipur_seo_search',
      events: {
        create: [
          {
            eventType: 'CREATED',
            description: 'Inquiry submitted via Website Contact Form',
            createdBy: 'System',
          },
        ],
      },
    },
  });
  console.log(`Sample inquiry created: ${sampleInquiry.name}`);

  console.log('Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
