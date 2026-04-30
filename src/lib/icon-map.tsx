
import {
  Scale,
  Building,
  Shield,
  Briefcase,
  Landmark,
  UserCheck,
  FileCheck2,
  Leaf,
  BadgeCheck,
  Lightbulb,
  Icon as LucideIcon,
} from 'lucide-react';

export type IconName = 
  | 'Scale' | 'Building' | 'Shield' | 'Briefcase' | 'Landmark' 
  | 'UserCheck' | 'FileCheck2' | 'Leaf' | 'BadgeCheck' | 'Lightbulb';

export const iconMap: Record<IconName, LucideIcon> = {
  Scale,
  Building,
  Shield,
  Briefcase,
  Landmark,
  UserCheck,
  FileCheck2,
  Leaf,
  BadgeCheck,
  Lightbulb,
};

export const iconList = Object.keys(iconMap).map(name => ({
    name: name as IconName,
    component: iconMap[name as IconName],
}));
