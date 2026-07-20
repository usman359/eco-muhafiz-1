'use client';

import { useMemo, useState } from 'react';
import { format, isValid, parse } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const DISPLAY_FORMAT = 'MMMM d, yyyy';

function parseDisplayDate(value) {
  if (!value) return undefined;
  const parsed = parse(value, DISPLAY_FORMAT, new Date());
  return isValid(parsed) ? parsed : undefined;
}

export default function DatePicker({
  id,
  value = '',
  onChange,
  placeholder = 'Pick a date',
  invalid = false,
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const selected = useMemo(() => parseDisplayDate(value), [value]);

  function handleSelect(date) {
    if (!date) {
      onChange('');
      return;
    }
    onChange(format(date, DISPLAY_FORMAT));
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          disabled={disabled}
          aria-invalid={invalid || undefined}
          className={cn(
            'ui-date-trigger',
            !value && 'ui-date-trigger-empty',
            invalid && 'ui-date-trigger-invalid'
          )}
        >
          <CalendarIcon size={16} />
          <span>{value || placeholder}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="ui-date-popover">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          defaultMonth={selected}
        />
      </PopoverContent>
    </Popover>
  );
}
