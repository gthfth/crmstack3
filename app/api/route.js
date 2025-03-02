// app/api/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const email = 'oscar@frithiofpartners.com'; // Replace with your email
  const apiKey = process.env.INSTANTLY_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Missing INSTANTLY_API_KEY environment variable' }, { status: 500 });
  }

  try {
    const response = await fetch(`https://api.instantly.ai/api/v2/accounts/${email}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      console.log(response)
      throw new Error(`Instantly API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch account information' }, { status: 500 });
  }
}

