export enum TechType {
  REPLACING = 'Replacing', // Labor-replacing
  ENABLING = 'Enabling',   // Labor-augmenting
}

export interface HistoricalEra {
  id: string;
  name: string;
  yearStart: number;
  yearEnd: number;
  type: 'replacing' | 'enabling' | 'hybrid';
  description: string;
  keyTechnologies: string[];
  socialImpact: string;
}

export interface ComparisonInsight {
  title: string;
  summary: string;
  mechanism: string;
  signal: string;
}

export interface ComparisonPairOption {
  key: string;
  eraAId: string;
  eraBId: string;
  label: string;
  focus: string;
}

export interface DataPoint {
  year: number;
  productivity: number;
  wages: number;
  event?: string;
}

export interface Node {
  id: string;
  label: string;
  type: 'concept' | 'cause' | 'effect' | 'solution' | 'trap';
  x: number;
  y: number;
  description: string;
  // Expanded static content
  detailedMarkdown: string;
  relatedConcepts: string[];
}

export interface Link {
  source: string;
  target: string;
  label?: string;
}

export interface ChartData {
  nodes: Node[];
  links: Link[];
}

export interface FutureScenario {
  id: string;
  name: string;
  icon: any;
  color: string;
  mechanism: string[];
  history: string;
  outcome: string[];
  risk: string;
}
