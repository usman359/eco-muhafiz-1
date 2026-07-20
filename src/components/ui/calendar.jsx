'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      navLayout="around"
      className={cn('ui-calendar', className)}
      classNames={{
        root: 'ui-calendar',
        months: 'ui-cal-months',
        month: 'ui-cal-month',
        month_caption: 'ui-cal-caption',
        caption_label: 'ui-cal-caption-label',
        nav: 'ui-cal-nav',
        button_previous: cn(
          buttonVariants({ variant: 'outline', size: 'icon' }),
          'ui-cal-nav-btn ui-cal-nav-prev'
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline', size: 'icon' }),
          'ui-cal-nav-btn ui-cal-nav-next'
        ),
        month_grid: 'ui-cal-grid',
        weekdays: 'ui-cal-weekdays',
        weekday: 'ui-cal-weekday',
        week: 'ui-cal-week',
        day: 'ui-cal-day',
        day_button: 'ui-cal-day-btn',
        selected: 'ui-cal-selected',
        today: 'ui-cal-today',
        outside: 'ui-cal-outside',
        disabled: 'ui-cal-disabled',
        hidden: 'ui-cal-hidden',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...chevronProps }) => {
          const Icon = orientation === 'left' ? ChevronLeft : ChevronRight;
          return <Icon size={16} {...chevronProps} />;
        },
      }}
      {...props}
    />
  );
}

export { Calendar };
