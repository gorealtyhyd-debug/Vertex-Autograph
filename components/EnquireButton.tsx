'use client';

import type { ReactNode } from 'react';
import { useEnquiry } from './EnquiryProvider';

export default function EnquireButton({
  context = 'Enquiry',
  unit,
  offer,
  className = 'btn-gold',
  children = 'Enquire now',
}: {
  context?: string;
  unit?: string;
  offer?: string;
  className?: string;
  children?: ReactNode;
}) {
  const { open } = useEnquiry();
  return (
    <button type="button" onClick={() => open(context, unit, offer)} className={className}>
      {children}
    </button>
  );
}
