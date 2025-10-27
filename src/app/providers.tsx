'use client';

import {ThemeProvider} from '@/contexts/ThemeContext';
import {MockCartProvider} from '@/contexts/MockCartContext';
import {MockWishlistProvider} from '@/contexts/MockWishlistContext';
import {LanguageProvider} from '@/contexts/LanguageContext';
import {SearchProvider} from '@/contexts/SearchContext';
import {AuthProvider} from '@/contexts/AuthContext';

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <SearchProvider>
            <MockCartProvider>
              <MockWishlistProvider>
                {children}
              </MockWishlistProvider>
            </MockCartProvider>
          </SearchProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
