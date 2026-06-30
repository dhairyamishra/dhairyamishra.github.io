export interface Publication {
  title: string;
  venue: string;
  role: string;
  institution: string;
  date: string;
  venueBrand: string;
  url?: string;
}

export const publications: Publication[] = [
  {
    title: 'Solaris: Building a Multiplayer Video World Model in Minecraft',
    venue: 'NeurIPS 2026 (Under Review)',
    role: 'Co-author / Researcher',
    institution: 'NYU Courant',
    date: 'Aug 2025 - Feb 2026',
    venueBrand: 'neurips',
    url: 'https://arxiv.org/abs/2602.22208',
  },
  {
    title: 'Testaro: Web Accessibility Testing Framework',
    venue: 'ACM SIGACCESS ASSETS 2023',
    role: 'Contributor',
    institution: 'CVS Health',
    date: 'Oct 2023',
    venueBrand: 'acm',
    url: 'https://arxiv.org/abs/2309.10167',
  },
];
