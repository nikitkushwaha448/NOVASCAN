import { NextRequest, NextResponse } from 'next/server';
import { validateStartupIdea } from '@/lib/ai/idea-validtor';
import { collectForQuery } from '@/lib/services/background-collector';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { idea } = body as { idea: string };

    if (!idea || typeof idea !== 'string' || idea.trim().length === 0) {
      return NextResponse.json(
        { error: 'Startup idea is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    if (idea.length > 500) {
      return NextResponse.json(
        { error: 'Idea description is too long (max 500 characters)' },
        { status: 400 }
      );
    }

    const report = await validateStartupIdea(idea);

    collectForQuery(report.searchQuery).catch((error) => {
      console.error('Background collection failed:', error.message);
    });

    return NextResponse.json(report);
  } catch (error: any) {
    console.error('Validate Idea Error:', error.message);
    
    // Provide specific error message for credential issues
    if (error.message.includes('DECODER routines') || error.message.includes('credentials')) {
      return NextResponse.json(
        {
          error: 'Google Cloud credentials not configured',
          message: 'Please download your service account key from Google Cloud Console (https://console.cloud.google.com/iam-admin/serviceaccounts?project=novascan-481011) and replace E:/NovaScan/service-account-key.json',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      {
        error: 'Failed to validate idea',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}