'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

const SearchParamsHandler = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  useEffect(() => {
    if (status === 'success') {
      toast.success('Thank you for your payment! Your order has been confirmed.');
    }
  }, [status]);

  return null;
};

export default SearchParamsHandler;
