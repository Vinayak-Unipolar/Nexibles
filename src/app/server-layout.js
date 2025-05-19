import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin-ext'],
  weight: ['100','200','300','400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'Nexibles',
  description: '',
};

export default function ServerLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}