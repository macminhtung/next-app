import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/sonner';
import { ReactQueryProvider } from '@/react-query/Provider';

import './globals.css';

const geist = Geist({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '[MMT] NextJs',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html lang={locale} className={geist.className} suppressHydrationWarning>
      <body data-new-gr-c-s-check-loaded='14.1243.0' data-gr-ext-installed=''>
        <ReactQueryProvider>
          <NextIntlClientProvider>
            <ThemeProvider attribute='class'>
              <Toaster position='top-right' />
              <div className='max-w-[1800px] w-full h-full flex flex-col'>
                <Header />
                <div className='flex p-3 h-[calc(100vh-66px)] overflow-auto'>
                  <div className='p-3 flex flex-1 justify-center h-fit'>{children}</div>
                </div>
              </div>
            </ThemeProvider>
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
