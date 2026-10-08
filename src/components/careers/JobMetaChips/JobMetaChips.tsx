import React from 'react';
import { BriefcaseIcon, ClockIcon, GraduationCapIcon, MapPinIcon } from 'lucide-react';
import type { IJob } from "@/types/api";

interface JobMetaChipsProps {
  job: IJob;
  tone?: 'light' | 'dark';
  showDepartment?: boolean;
  showExperience?: boolean;
  className?: string;
}

/** Small pill chips: location, type, department, experience. */
export function JobMetaChips({
  job,
  tone = 'light',
  showDepartment = true,
  showExperience = false,
  className = ''
}: JobMetaChipsProps) {
  const chip =
  tone === 'light' ?
  'border-line-dark text-ink-2 bg-white/40' :
  'border-line text-fg-2 bg-surface';

  const items = [
  { icon: MapPinIcon, label: `${job.location} · ${job.city}` },
  { icon: ClockIcon, label: job.type },
  ...(showDepartment ? [{ icon: BriefcaseIcon, label: job.department }] : []),
  ...(showExperience ? [{ icon: GraduationCapIcon, label: job.experience }] : [])];


  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map(({ icon: Icon, label }) =>
      <li
        key={label}
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${chip}`}>
        
          <Icon aria-hidden className="h-3.5 w-3.5" />
          {label}
        </li>
      )}
    </ul>);

}
