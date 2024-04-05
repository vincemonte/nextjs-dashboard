import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 
        We can now trickle-down the Inter font throughout the app; antialiased is a tailwind
        class that smooths out the font
       */}
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
