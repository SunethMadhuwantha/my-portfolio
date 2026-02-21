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

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string[]; // Changed to array for bullet points
  tech?: string[];
}

export interface Education {
  school: string;
  degree: string;
  year: string;
  description: string;
  transcript?: string; // Path to PDF or Image
}