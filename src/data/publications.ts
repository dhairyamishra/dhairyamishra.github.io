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
    title: 'Solaris: Multi-Agent Video World Models',
    venue: 'ICML 2026 (Submission)',
    role: 'Researcher/Developer',
    institution: 'NYU Courant',
    date: 'Aug 2025 – Present',
    venueBrand: 'icml',
    url: 'https://arxiv.org/abs/2602.22208',
  },
  {
    title: 'Testaro: Web Accessibility Testing Framework',
    venue: 'ACM SIGACCESS ASSETS 2023',
    role: 'Speaker/Contributor',
    institution: 'CVS Health',
    date: 'Oct 2023',
    venueBrand: 'acm',
    url: 'https://arxiv.org/abs/2309.10167',
  },
];
