import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const transactionId = searchParams.get('transactionId');
  const fullUrl = searchParams.get('url');
  const token = process.env.NEXT_PUBLIC_API_KEY;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const MERCHANT_ID = "PGTESTPAYUAT86";

  if (!transactionId) {
    return NextResponse.json(
      { error: 'Transaction ID is required' },
      { status: 400 }
    );
  }
  try {
    const statusUrl = `https://nexiblesapp.barecms.com/api/status/${transactionId}/${MERCHANT_ID}`;
    const response = await axios.get(statusUrl);
    if (response.data?.data?.data?.state === 'COMPLETED') {
      return NextResponse.redirect(`${fullUrl}/order-placed?status=success`);
    } else {
      const paymentState = response.data?.data?.data?.state || 'FAILED';
      return NextResponse.redirect(`${fullUrl}/shipping?status=${paymentState.toLowerCase()}`);
    }
  } catch (error) {
    console.error('Error fetching payment status:', error);
    return NextResponse.redirect(`${fullUrl}/shipping?status=error&message=${encodeURIComponent(error.message)}`);
  }
}