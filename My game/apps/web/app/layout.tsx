import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ramayan: The Eternal Path',
  description: 'An interactive retelling of the Ayodhya Kanda. Choose, justify, and reflect on dharma.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
