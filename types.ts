import React from 'react';

export interface Opportunity {
  title: string;
  summary: string;
  analysisPoints: string[];
  source: string;
  tags: string[];
  impactLevel: 'High' | 'Medium' | 'Low';
}

export interface SearchConfig {
  urls: string[];
  frequency: 'hourly' | 'daily';
}

export interface Review {
  name: string;
  role: string;
  avatar: string;
  content: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}