import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Route, Routes } from 'react-router';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { ProtectedRoute } from './components/protected-route/protected-route';
import { Dashboard } from './pages/dashboard/dashboard';
import Details from './pages/details/details';
import { Home } from './pages/home/home';
import { SignIn } from './pages/sign-in/sign-in';

// Base global configuration for the query client
const queryClient = new QueryClient();

// Enhanced global configuration for the query client
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 3, // Retry 3 times
//       retryDelay: 1000, // Retry after 1 second
//       staleTime: 1000 * 60 * 5, // Cache for 5 minutes
//       refetchOnWindowFocus: false, // Do not refetch on window focus
//     },
//     mutations: {
//       retry: false,
//     },
//   },
// });

export const App = (): React.ReactElement => (
  <QueryClientProvider client={queryClient}>
    <div>
      <Header />
      <main id="mainSection" className="usa-section">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/details/:id" element={<Details />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  </QueryClientProvider>
);
