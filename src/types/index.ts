export interface Project {
  title: string;
  description: string;
  tech: string[];
  images: string | string[]; // Handles both single strings and arrays
  link: string;
  github: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  image: string;
  fullCertificate?: string; // Optional to prevent errors if missing
  verifyLink: string;
  skills: string[];
}

export interface Socials {
  github: string;
  linkedin: string;
  email: string;
}