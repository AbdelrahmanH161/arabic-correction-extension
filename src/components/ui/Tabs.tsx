import React from 'react';
import { cn } from '../../lib/utils';

interface TabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn('flex space-x-1 rtl:space-x-reverse border-b border-background-light', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'px-4 py-2 text-sm font-medium transition-colors',
            activeTab === tab.id
              ? 'bg-primary text-white rounded-t-md'
              : 'text-text-secondary hover:text-white'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
} 