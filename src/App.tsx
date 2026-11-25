import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { HelmetProvider } from 'react-helmet-async';
import { initGA, trackPageView } from './utils/analytics';
import { SEO } from './components/shared/SEO';
import { JsonLd, getOrganizationSchema } from './components/shared/JsonLd';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { AboutUs } from './components/sections/AboutUs';
import { Products } from './components/sections/Products';
import { WhatWeDo } from './components/sections/WhatWeDo';
import { Gallery } from './components/sections/Gallery';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';
import { BackToTopButton } from './components/shared/BackToTopButton';
import { WhatsAppButton } from './components/shared/WhatsAppButton';
import { ScrollProgressBar } from './components/shared/ScrollProgressBar';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components/shared/ThemeToggle';
import { ECommerceProvider } from './context/ECommerceContext';
import { ToastProvider } from './context/ToastContext';
import { SkipLink } from './components/layout/SkipLink';
import { LoadingSpinner } from './components/shared/LoadingSpinner';

// Lazy loaded components
const CataloguePage = lazy(() => import('./pages/CataloguePage').then(m => ({ default: m.CataloguePage })));
const CustomSignsPage = lazy(() => import('./components/products/CustomSignsPage').then(m => ({ default: m.CustomSignsPage })));
const PersonalizedGiftsPage = lazy(() => import('./components/products/PersonalizedGiftsPage').then(m => ({ default: m.PersonalizedGiftsPage })));
const EducationalKidsPage = lazy(() => import('./components/products/EducationalKidsPage').then(m => ({ default: m.EducationalKidsPage })));
const SignatureWallDecorPage = lazy(() => import('./components/products/SignatureWallDecorPage').then(m => ({ default: m.SignatureWallDecorPage })));
const TrendingPage = lazy(() => import('./pages/TrendingPage').then(m => ({ default: m.TrendingPage })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./pages/TermsOfService').then(m => ({ default: m.TermsOfService })));
const CartPage = lazy(() => import('./pages/CartPage').then(m => ({ default: m.CartPage })));
const OrdersPage = lazy(() => import('./pages/OrdersPage').then(m => ({ default: m.OrdersPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(m => ({ default: m.ProfilePage })));
const NotFound = lazy(() => import('./components/shared/NotFound').then(m => ({ default: m.NotFound })));

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
    exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
    transition={{ 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1],
      opacity: { duration: 0.4 }
    }}
  >
    {children}
  </motion.div>
);

const MainContent = ({ onNavigate }: { onNavigate: (page: string, anchor?: string) => void }) => (
  <main className="flex flex-col gap-0">
    <Hero onNavigate={onNavigate} />
    <WhatWeDo onNavigate={onNavigate} />
    <Products onNavigate={onNavigate} />
    <Gallery />
    <Contact />
  </main>
);

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateTo = (page: string, anchor = '') => {
    if (page === 'main') {
      if (location.pathname !== '/') {
        navigate(`/${anchor}`);
      } else if (anchor) {
        const element = document.querySelector(anchor);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate(`/${page}${anchor}`);
    }
  };

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
    } else {
      window.scrollTo(0, 0);
    }
    trackPageView(location.pathname);
  }, [location.pathname, location.hash]);

  const showMainHeader = ['/', '/trending', '/catalogue', '/about-us', '/custom-signs', '/personalized-gifts', '/educational-kids', '/signature-wall-decor'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100 transition-colors duration-300">
      <SkipLink />
      <ScrollProgressBar />
      <ThemeToggle />
      {showMainHeader && <Header onNavigate={navigateTo} currentPage={location.pathname === '/' ? 'main' : location.pathname.substring(1)} />}
      
      <main id="main">
        <Suspense fallback={<LoadingSpinner fullScreen />}>
          <AnimatePresence mode="wait">
            <Routes location={location}>
            <Route path="/" element={
              <PageWrapper>
                <SEO />
                <JsonLd data={getOrganizationSchema()} />
                <MainContent onNavigate={navigateTo} />
              </PageWrapper>
            } />
            <Route path="/about-us" element={
              <PageWrapper>
                <div className="pt-20">
                  <AboutUs onNavigate={navigateTo} />
                </div>
              </PageWrapper>
            } />
            <Route path="/trending" element={
              <PageWrapper>
                <TrendingPage onNavigate={navigateTo} />
              </PageWrapper>
            } />
            <Route path="/catalogue" element={
              <PageWrapper>
                <CataloguePage />
              </PageWrapper>
            } />
            <Route path="/custom-signs" element={
              <PageWrapper>
                <CustomSignsPage onNavigateBack={() => navigate('/')} />
              </PageWrapper>
            } />
            <Route path="/personalized-gifts" element={
              <PageWrapper>
                <PersonalizedGiftsPage onNavigateBack={() => navigate('/')} />
              </PageWrapper>
            } />
            <Route path="/educational-kids" element={
              <PageWrapper>
                <EducationalKidsPage onNavigateBack={() => navigate('/')} />
              </PageWrapper>
            } />
            <Route path="/signature-wall-decor" element={
              <PageWrapper>
                <SignatureWallDecorPage onNavigateBack={() => navigate('/')} />
              </PageWrapper>
            } />
            <Route path="/privacy-policy" element={
              <PageWrapper>
                <PrivacyPolicy />
              </PageWrapper>
            } />
            <Route path="/terms-of-service" element={
              <PageWrapper>
                <TermsOfService />
              </PageWrapper>
            } />
            <Route path="/cart" element={
              <PageWrapper>
                <CartPage onNavigateBack={() => navigate('/')} onNavigate={navigateTo} />
              </PageWrapper>
            } />
            <Route path="/orders" element={
              <PageWrapper>
                <OrdersPage onNavigateBack={() => navigate('/')} onNavigate={navigateTo} />
              </PageWrapper>
            } />
            <Route path="/profile" element={
              <PageWrapper>
                <ProfilePage onNavigateBack={() => navigate('/')} />
              </PageWrapper>
            } />
            <Route path="*" element={
              <PageWrapper>
                <NotFound onNavigateBack={() => navigate('/')} />
              </PageWrapper>
            } />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </main>
      
      <Footer onNavigate={navigateTo} />
      <WhatsAppButton />
      <BackToTopButton />
    </div>
  );
}

function App() {
  useEffect(() => {
    initGA();
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <ECommerceProvider>
          <ToastProvider>
            <Router>
              <AppContent />
            </Router>
          </ToastProvider>
        </ECommerceProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
