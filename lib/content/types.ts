export type SectionStyles = {
  headingColor: string;
  bodyColor: string;
  scriptColor: string;
  accentColor: string;
};

export type ContentValue =
  | string
  | number
  | boolean
  | null
  | SectionStyles
  | ContentValue[]
  | { [key: string]: ContentValue };

export type SiteContent = {
  home: Record<string, ContentValue>;
  about: Record<string, ContentValue>;
  work: Record<string, ContentValue>;
  contact: Record<string, ContentValue>;
};

export const PAGE_LABELS = {
  home: "Home",
  about: "About me",
  work: "Work with me",
  contact: "Contact",
} as const;

export type PageKey = keyof typeof PAGE_LABELS;

export const PAGE_PREVIEWS: Record<PageKey, string> = {
  home: "/",
  about: "/aboutme",
  work: "/workwithme",
  contact: "/contact",
};

export const SECTION_LABELS: Record<PageKey, Record<string, string>> = {
  home: {
    hero: "Hero",
    explain: "Explain",
    quote: "Quote",
    lion: "Lion",
    selfAssess: "Self-assessment",
    testimonials: "Testimonials",
    intro: "Intro",
    lead: "Lead",
  },
  about: {
    hero: "Hero",
    hi: "Hi, I'm Francesca",
    built: "The life I built",
    ended: "The moment it ended",
    pivot: "Coaching wasn't a pivot",
    again: "The version of me that did it again",
    whereIAm: "Where I am now",
    credentials: "Credentials",
    belief: "What I actually believe",
    lead: "Closing CTA",
    page: "Page background",
  },
  work: {
    hero: "Hero",
    who: "Who this is for",
    notForYou: "Not for you if",
    how: "How it works",
    what: "What we'll work on",
    testimonials: "Testimonials",
    process: "Process",
    faq: "FAQs",
    cta: "Call to action",
  },
  contact: {
    main: "Contact",
  },
};
