// Updated: 2026-04-12T13:45:00Z
export interface Service {
  title: string;
  description: string;
  icon: string;
  images?: string[];
}

export interface ServiceCategory {
  category: string;
  items: Service[];
}

export interface Founder {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface CaseStudy {
  title: string;
  description: string;
  image: string;
  steps: string[];
  youtubeId?: string;
}

export const PAGE_BANNERS = {
  home: "/images/optimized/studio-culture.webp",
  about: "/images/optimized/about-banner.webp",
  services: "/images/banners/services.jpg",
  portfolio: "/images/banners/portfolio.jpg",
  contact: "/images/banners/contact.jpg",
};

export const FOUNDERS: Founder[] = [
  {
    name: "Sadiqa Akhter",
    role: "Lead Artist & Founder",
    image: "/images/founders/sadiqa.jpg",
    bio: "With over 11 years of experience and 500+ children's books developed, Sadiqa is the creative heartbeat of Source II Studio. Her mastery of illustration and storytelling has earned her a global reputation on platforms like Amazon, Fiverr, and Upwork.",
  },
  {
    name: "Samad Ullah Khan",
    role: "Technical Director & Founder",
    image: "/images/founders/samad.jpg",
    bio: "Samad bridges the gap between traditional art and modern technology. He specializes in building robust content pipelines and integrating AI workflows to ensure Source II Studio remains at the cutting edge of digital production.",
  },
  {
    name: "Saima Shumail",
    role: "Creative Strategist & Founder",
    image: "/images/founders/saima.jpg",
    bio: "Saima brings strategic vision to the studio, managing global client relations and ensuring that every project aligns with the studio's high standards of excellence and market presence.",
  },
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    category: "Illustration & Art",
    items: [
      {
        title: "Characterization",
        description: "Developing unique, memorable characters for any medium.",
        icon: "UserCircle",
        images: [
          "/images/services/characterization1.png",
          "/images/services/characterization2.jpg",
          "/images/services/characterization3.jpg",
          "/images/services/characterization4.jpg",
          "/images/services/characterization5.jpg",
          "/images/services/characterization6.jpg",
        ]
      },
      {
        title: "2D & 3D Artworks",
        description: "High-quality digital paintings and 3D modeled assets.",
        icon: "Palette",
        images: [
          "/images/services/2d-3d-art1.jpg",
        ]
      },
      {
        title: "Children's Books",
        description: "Complete book development from concept to final art.",
        icon: "BookOpen",
        images: [
          "/images/services/children-books1.jpg",
          "/images/services/children-books2.png",
          "/images/services/children-books3.jpg",
          "/images/services/children-books4.jpg",
          "/images/services/children-books5.jpg",
        ]
      },
      {
        title: "Graphic Novels & Comics",
        description: "Sequential storytelling with dynamic visual impact.",
        icon: "Image",
        images: [
          "/images/services/comics1.jpg",
          "/images/services/comics2.jpg",
          "/images/services/comics3.jpg",
          "/images/services/comics4.jpg",
          "/images/services/comics5.jpg",
          "/images/services/comics6.jpg",
        ]
      },
      {
        title: "Book Covers",
        description: "Eye-catching designs that sell stories.",
        icon: "Layout",
        images: [
          "/images/services/book-covers1.jpg",
          "/images/services/book-covers2.jpg",
        ]
      },
    ],
  },
  {
    category: "Animation & Video",
    items: [
      {
        title: "2D & 3D Animation",
        description: "Fluid motion graphics and character animation.",
        icon: "Play",
        images: [
          "/images/services/animation1.jpg",
          "/images/services/animation2.png",
          "/images/services/animation3.jpg",
        ]
      },
      {
        title: "Hyper-Realistic Animation",
        description: "Cutting-edge visuals with lifelike detail.",
        icon: "Zap",
        images: [
          "/images/services/hyper-realistic1.jpg",
          "/images/services/hyper-realistic2.jpg",
        ]
      },
      {
        title: "Kids Cartoon Videos",
        description: "Engaging educational and entertainment content.",
        icon: "Tv",
        images: [
          "/images/services/kids-cartoons1.jpg",
          "/images/services/kids-cartoons2.jpg",
        ]
      },
      {
        title: "Social Media Content",
        description: "Short-form videos optimized for engagement.",
        icon: "Share2",
        images: [
          "/images/services/social-media1.jpg",
          "/images/services/social-media2.jpg",
          "/images/services/social-media3.jpg",
          "/images/services/social-media4.jpg",
          "/images/services/social-media5.jpg",
          "/images/services/social-media6.jpg",
        ]
      },
    ],
  },
  {
    category: "Publishing & Digital",
    items: [
      {
        title: "KDP Amazon Print",
        description: "Expert formatting and setup for Amazon publishing.",
        icon: "Printer",
        images: [
          "/images/services/kdp1.jpg",
          "/images/services/kdp2.jpg",
        ]
      },
      {
        title: "Author Publication Guide",
        description: "Helping authors navigate the path to publication.",
        icon: "Compass",
        images: [
          "/images/services/author-guide1.png",
          "/images/services/author-guide2.png",
        ]
      },
      {
        title: "Website Development",
        description: "Modern, high-tech web solutions for creatives.",
        icon: "Globe",
        images: [
          "/images/services/web-dev1.jpg",
          "/images/services/web-dev2.jpg",
        ]
      },
      {
        title: "Content Pipelines",
        description: "Scalable workflows for high-volume production.",
        icon: "Layers",
        images: [
          "/images/services/pipelines1.jpg",
        ]
      },
    ],
  },
];

export const PORTFOLIO_PAGES = [
  "/images/portfolio/page-1.jpg",
  "/images/portfolio/page-2.png",
  "/images/portfolio/page-3.jpg",
  "/images/portfolio/page-4.jpg",
  "/images/portfolio/page-5.png",
  "/images/portfolio/page-6.jpg",
  "/images/portfolio/page-7.jpg",
  "/images/portfolio/page-8.jpg",
  "/images/portfolio/page-9.jpg",
  "/images/portfolio/page-10.jpg",
];

export const VIDEO_PORTFOLIO = [
  {
    title: "3D Animation Showreel | Characters & Stories",
    category: "Showreel",
    youtubeId: "BCUGgzjKZGU"
  },
  {
    title: "Funny 3D Monster Song (Kids Musical)",
    category: "Kids Musical",
    youtubeId: "Ge5xLB55_9Y"
  },
  {
    title: "AI-Generated Hyper-Realistic Video Demo",
    category: "AI Content",
    youtubeId: "bHnl3K5exlY"
  },
  {
    title: "Hyper Realistic Sample AI Video",
    category: "AI Content",
    youtubeId: "7JvLvJajtQI"
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: "AI to Hand-Drawn: Storybook Cover Design",
    description: "A client supplied an AI-generated character reference and needed a hand-drawn, whimsical storybook cover. Sadiqa Akhter recreated the character on her drawing tablet, developed five additional characters, and refined poses, colour, and background choices through client feedback. Watch the drawing and revision process in the video.",
    image: "",
    steps: ["Client Reference Review", "Hand-Drawn Character Development", "Cover Composition", "Client Feedback & Revisions"],
    youtubeId: "jMXTDK3fRso"
  },
  {
    title: "Children's Story Book Promo Trailer",
    description: "A children’s storybook promotional trailer produced by Source II Studio. Watch the video to see the studio’s illustration and animation work presented as a short promotional piece for a book project.",
    image: "",
    steps: ["Book Promotion", "Illustration", "Animation"],
    youtubeId: "9l0Eu07IZNg"
  },
  {
    title: "AI Animation Trailer: Future of Storytelling",
    description: "Exploring the cutting-edge integration of AI in our animation pipeline to create immersive and futuristic narratives.",
    image: "",
    steps: ["Prompt Engineering", "Temporal Consistency", "Post-Processing", "Final Composite"],
    youtubeId: "SGE4spom_GE"
  },
  {
    title: "3D Mascot Logo Design in Blender",
    description: "A detailed look at our 3D character design process, from initial mascot concept to final Blender reveal.",
    image: "",
    steps: ["2D Character Design", "3D Modeling", "Texturing & Shading", "Camera Animation"],
    youtubeId: "uBemAxrrxCM"
  },
];

export const SOCIAL_LINKS = {
  youtube: "https://www.youtube.com/@SourceIIStudio",
  instagram: "https://www.instagram.com/sourceiistudio/",
  amazon: "https://www.amazon.com/author/sadiqaakhter",
  fiverr: "https://www.fiverr.com/sadi86",
  upworkSadiqa: "https://www.upwork.com/freelancers/~01252f901a133deab1?mp_source=share",
  upworkAgency: "https://www.upwork.com/agencies/1770843614897688576/",
  upworkSamad: "https://www.upwork.com/freelancers/~015059d32047ab5250?mp_source=share",
};

export const PDF_PORTFOLIO_PATH = "/portfolio/SourceIIStudio_Portfolio.pdf";

