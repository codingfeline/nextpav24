// app/api/consent/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { anonymousId, userId, analytics, externalMedia } = await req.json();

  if (!anonymousId && !userId) {
    return NextResponse.json({ error: 'Missing identifier' }, { status: 400 });
  }

  // Anonymous consent
  if (anonymousId) {
    const existing = await prisma.cookieConsent.findUnique({
      where: { anonymousId },
    });

    if (existing) {
      await prisma.cookieConsent.update({
        where: { id: existing.id },
        data: { analytics, externalMedia },
      });
    } else {
      await prisma.cookieConsent.create({
        data: { anonymousId, analytics, externalMedia },
      });
    }
  }

  // Logged-in consent
  if (userId) {
    const existing = await prisma.cookieConsent.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (existing) {
      await prisma.cookieConsent.update({
        where: { id: existing.id },
        data: { analytics, externalMedia },
      });
    } else {
      await prisma.cookieConsent.create({
        data: { userId, analytics, externalMedia },
      });
    }
  }

  return NextResponse.json({ ok: true });
}
