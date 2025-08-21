// const fetch = require("node-fetch");

const STRAPI_URL = process.env.STRAPI_API_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || "";

const services = [
  {
    title: "Web Development",
    slug: "web-development",
    description: "<p>We build responsive and scalable web applications.</p>",
  },
  {
    title: "Mobile App Development",
    slug: "mobile-app-development",
    description: "<p>Create iOS and Android apps with seamless UX.</p>",
  },
  {
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description: "<p>Design intuitive interfaces for web and mobile.</p>",
  },
];

const teamMembers = [
  {
    name: "John Doe",
    role: "CEO",
    bio: "<p>John leads the company with 10+ years of experience.</p>",
  },
  {
    name: "Jane Smith",
    role: "Lead Developer",
    bio: "<p>Expert in React, Node.js, and modern frontend development.</p>",
  },
  {
    name: "Ahmed Ali",
    role: "UX Designer",
    bio: "<p>Focuses on creating user-friendly designs for all platforms.</p>",
  },
];

const clients = [
  { name: "TechCorp", testimonial: "<p>Excellent service and support!</p>" },
  {
    name: "Creative Agency",
    testimonial: "<p>Highly recommended for app development projects.</p>",
  },
  {
    name: "Global Enterprise",
    testimonial: "<p>Delivered our project on time and on budget.</p>",
  },
];

const heroSection = {
  heroTitle: "Welcome to Our Company",
  heroDescription:
    "We provide innovative solutions for web, mobile, and design.",
  heroBackgrounds: [],
};

const globalSettings = {
  siteName: "My Company",
  footerLinks: [
    { link: "/about", label: "About Us" },
    { link: "/services", label: "Services" },
    { link: "/contact", label: "Contact" },
  ],
  socialLinks: [
    { platform: "Facebook", url: "https://facebook.com" },
    { platform: "Twitter", url: "https://twitter.com" },
    { platform: "LinkedIn", url: "https://linkedin.com" },
  ],
};

const subscribers = [
  { email: "user1@example.com" },
  { email: "user2@example.com" },
];

const blogs = [
  {
    title: "The Future of Web Development",
    slug: "future-of-web-development",
    excerpt:
      "Explore upcoming trends and technologies shaping web development.",
    content:
      "<p>Web development is evolving rapidly with new frameworks, tools, and best practices. Staying updated is key to building scalable applications.</p>",
    coverImage: null, // Add media ID if uploaded
    author: null, // Add author ID if already seeded in Team Members
  },
  {
    title: "UI/UX Design Principles",
    slug: "ui-ux-design-principles",
    excerpt:
      "Learn the core principles of effective user interface and experience design.",
    content:
      "<p>UI/UX design focuses on creating intuitive and enjoyable user experiences. Key principles include consistency, accessibility, and clarity.</p>",
    coverImage: null,
    author: null,
  },
  {
    title: "Building Scalable APIs",
    slug: "building-scalable-apis",
    excerpt:
      "Tips and techniques for designing APIs that scale with your application.",
    content:
      "<p>Scalable APIs require proper architecture, caching, rate limiting, and careful database design to handle growth efficiently.</p>",
    coverImage: null,
    author: null,
  },
];

async function createEntry(endpoint, data) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(STRAPI_API_TOKEN
          ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({ data }),
    });

    const json = await res.json();
    if (!res.ok) {
      console.error(`Failed to create ${endpoint}:`, json);
    } else {
      console.log(`Created ${endpoint}:`, json.data?.id || json.data);
    }
  } catch (err) {
    console.error(`Error creating ${endpoint}:`, err);
  }
}

async function seed() {
  console.log("Seeding Strapi data...");

  for (const service of services) {
    await createEntry("services", service);
  }

  for (const member of teamMembers) {
    await createEntry("team-members", member);
  }

  for (const client of clients) {
    await createEntry("clients", client);
  }

  await createEntry("homepage", heroSection);
  await createEntry("global", globalSettings);

  for (const subscriber of subscribers) {
    await createEntry("subscribers", subscriber);
  }

  for (const blog of blogs) {
    await createEntry("blogs", blog);
  }

  console.log("Seeding completed!");
}

seed();
