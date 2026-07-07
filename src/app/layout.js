import '../css/fontawesome.min.css';
import '../css/odometer.min.css';
import '../css/fancybox.min.css';
import '../css/swiper.min.css';
import '../css/bootstrap.min.css';
import '../css/style.css';
import './globals.css';
import MainLayout from '../components/MainLayout';
import { AppProvider } from '../context/AppContext';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  shrinkToFit: 'no',
  themeColor: '#feed01',
};

export const metadata = {
  title: 'Eco Muhafiz - Your Forest Guardian',
  description: 'Pakistan’s first AI-powered Climate Intelligence Platform. We combine on-ground bioacoustic IoT sensors with satellite telemetry for real-time forest monitoring and auditable ESG compliance.',
  keywords: 'Eco, Plantation, Drive, Forest, Margalla Hills, AI, Bioacoustics',
  author: 'Eco Muhafiz',
  icons: {
    icon: '/logo.png?v=1',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Cinzel:wght@400;600&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AppProvider>
          <MainLayout>{children}</MainLayout>
        </AppProvider>
      </body>
    </html>
  );
}
