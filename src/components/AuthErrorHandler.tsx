// src/components/AuthErrorHandler.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function AuthErrorHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Non eseguire se siamo già nella pagina errore o callback
    if (pathname === '/auth/error' || pathname === '/auth/callback') {
      setIsChecking(false);
      return;
    }

    // Controlla se ci sono errori nell'hash
    const hash = window.location.hash;
    
    if (hash) {
      const hashParams = new URLSearchParams(hash.substring(1));
      const error = hashParams.get('error');
      const errorCode = hashParams.get('error_code');
      const errorDescription = hashParams.get('error_description');
      const type = hashParams.get('type');
      
      if (error || errorCode) {
        console.log('AuthErrorHandler: Errore rilevato nell\'hash', {
          error,
          errorCode,
          errorDescription,
          type
        });
        
        // Costruisci messaggio user-friendly
        let userMessage = 'Si è verificato un errore durante l\'autenticazione.';
        const errorType = error || errorCode;
        
        if (errorType === 'otp_expired' || errorDescription?.includes('expired')) {
          userMessage = 'Il link è scaduto o non è più valido. Richiedi un nuovo link.';
        } else if (errorType === 'access_denied') {
          userMessage = 'Link non valido o scaduto. Richiedi un nuovo link.';
        } else if (errorDescription) {
          userMessage = decodeURIComponent(errorDescription);
        }
        
        // Pulisci l'hash prima di redirectare
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
        
        // Redirect alla pagina errore
        router.push(`/auth/error?error=${encodeURIComponent(userMessage)}&type=${type || 'magiclink'}`);
        // Non settare isChecking a false perché stiamo redirectando
        return;
      }
    }
    
    // Nessun errore, mostra il contenuto
    setIsChecking(false);
  }, [pathname, router]);

  // Mostra loading durante il check
  if (isChecking) {
    return (
      <div className="fixed inset-0 bg-gray-50 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return null; // Nessun errore, componente invisibile
}