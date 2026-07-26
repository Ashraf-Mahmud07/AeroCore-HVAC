import type { LucideIcon } from 'lucide-react';

/** Every icon referenced by the design components, resolved to a real component. */
export type IconName =
  | 'arrow-right'
  | 'award'
  | 'badge-check'
  | 'building-2'
  | 'calendar-check'
  | 'calendar-clock'
  | 'check'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevrons-left-right'
  | 'clock'
  | 'credit-card'
  | 'file-text'
  | 'flame'
  | 'gauge'
  | 'git-compare-arrows'
  | 'home'
  | 'leaf'
  | 'mail'
  | 'map-pin'
  | 'menu'
  | 'messages-square'
  | 'package'
  | 'percent'
  | 'phone'
  | 'phone-call'
  | 'plus'
  | 'quote'
  | 'refresh-cw'
  | 'ruler'
  | 'search'
  | 'send'
  | 'shield-check'
  | 'siren'
  | 'smile'
  | 'star'
  | 'thermometer-sun'
  | 'users'
  | 'wind'
  | 'wrench'
  | 'x';

export type IconRegistry = Readonly<Record<IconName, LucideIcon>>;

/** Hero layout selected by the `heroVariant` design-component prop. */
export type HeroVariant = 'split' | 'centered' | 'spec';

export interface NavLink {
  readonly label: string;
  readonly href: string;
}

/**
 * A photograph slot. Every image renders through `next/image` with `fill` and
 * `object-fit: cover`, so intrinsic dimensions never affect layout — a
 * replacement file of any size drops straight in.
 */
export interface ImageAsset {
  readonly src: string;
  readonly alt: string;
}

export interface Service {
  readonly icon: IconName;
  readonly title: string;
  readonly body: string;
  readonly popular: boolean;
}

export interface CatalogService {
  readonly icon: IconName;
  readonly title: string;
  readonly tag?: string;
  readonly body: string;
  readonly points: readonly string[];
}

export interface Brand {
  readonly name: string;
}

export interface WhyCard {
  readonly icon: IconName;
  readonly title: string;
  readonly body: string;
}

export interface Statistic {
  /** Numeric target the counter animates toward. */
  readonly n: number;
  readonly suffix: string;
  /** Pre-formatted value rendered server-side and when JS is unavailable. */
  readonly display: string;
  readonly label: string;
}

export interface SpecRow {
  readonly no: string;
  readonly prop: string;
  readonly n: number;
  readonly suffix: string;
  readonly val: string;
}

export interface ProcessStep {
  readonly no: string;
  readonly icon: IconName;
  readonly title: string;
  readonly body: string;
  readonly delay: number;
}

export type ProjectType = 'Residential' | 'Commercial';
export type ProjectMode = 'Heating' | 'Cooling';
export type ProjectFilter = 'All' | ProjectType | ProjectMode;

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly type: ProjectType;
  readonly mode: ProjectMode;
  readonly body: string;
  readonly image: ImageAsset;
}

export interface Testimonial {
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  readonly location: string;
  readonly system: string;
  readonly image: ImageAsset;
}

export interface FinanceBenefit {
  readonly icon: IconName;
  readonly title: string;
  readonly body: string;
}

export interface FinanceExample {
  readonly label: string;
  readonly total: string;
  readonly month: string;
}

export interface Faq {
  readonly q: string;
  readonly a: string;
}

export interface FeaturedPost {
  readonly cat: string;
  readonly read: string;
  readonly title: string;
  readonly excerpt: string;
  readonly image: ImageAsset;
}

export interface Post {
  readonly id: string;
  readonly cat: string;
  readonly read: string;
  readonly title: string;
  readonly image: ImageAsset;
}

export interface MethodStep {
  readonly no: string;
  readonly title: string;
  readonly body: string;
}

export interface InfoCard {
  readonly icon: IconName;
  readonly label: string;
  readonly value: string;
}

export interface BusinessHour {
  readonly day: string;
  readonly time: string;
}

export interface TimingOption {
  readonly value: string;
  readonly label: string;
}

export interface BreadcrumbItem {
  readonly label: string;
  readonly href?: string;
}
