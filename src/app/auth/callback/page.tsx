// src/app/auth/callback/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuth = async () => {
      // 1. Controlla errori nell'hash (es. #error=otp_expired)
      const hash = window.location.hash;
      if (hash) {
        const hashParams = new URLSearchParams(hash.substring(1));
        const hashError = hashParams.get('error');
        const errorCode = hashParams.get('error_code');
        const errorDescription = hashParams.get('error_description');
        const type = hashParams.get('type'); // magiclink o signup (mandato da Supabase)
        
        if (hashError || errorCode) {
          console.error('Auth error from hash:', hashError || errorCode, errorDescription);
          
          let userMessage = 'Si è verificato un errore durante l\'autenticazione.';
          const errorType = hashError || errorCode;
          
          if (errorType === 'otp_expired' || errorDescription?.includes('expired')) {
            userMessage = 'Il link di accesso è scaduto. Richiedi un nuovo link.';
          } else if (errorType === 'access_denied') {
            userMessage = 'Link di accesso non valido o scaduto. Richiedi un nuovo link.';
          } else if (errorDescription) {
            userMessage = decodeURIComponent(errorDescription);
          }
          
          // Redirect alla pagina errore con type
          router.push(`/auth/error?error=${encodeURIComponent(userMessage)}&type=${type || 'magiclink'}`);
          return;
        }
      }

      // 2. Controlla errori nei query params (es. ?error=xxx)
      const queryError = searchParams.get('error');
      const queryErrorDescription = searchParams.get('error_description');
      const type = searchParams.get('type'); // magiclink o signup (mandato da Supabase)
      
      if (queryError) {
        console.error('Auth error from query:', queryError, queryErrorDescription);
        
        let userMessage = 'Si è verificato un errore durante l\'autenticazione.';
        
        if (queryError === 'otp_expired' || queryErrorDescription?.includes('expired')) {
          userMessage = 'Il link di accesso è scaduto. Richiedi un nuovo link.';
        } else if (queryError === 'access_denied') {
          userMessage = 'Link di accesso non valido o scaduto. Richiedi un nuovo link.';
        } else if (queryErrorDescription) {
          userMessage = queryErrorDescription;
        }
        
        // Redirect alla pagina errore con type
        router.push(`/auth/error?error=${encodeURIComponent(userMessage)}&type=${type || 'magiclink'}`);
        return;
      }

      // 3. Gestisce il code per exchange session
      const code = searchParams.get('code');
      const typeFromQuery = searchParams.get('type'); // leggi type anche qui
      
      if (code) {
        try {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          
          if (exchangeError) {
            console.error('Error exchanging code:', exchangeError);
            
            let userMessage = 'Errore durante l\'autenticazione.';
            
            if (exchangeError.message.includes('expired')) {
              userMessage = 'Il link di accesso è scaduto. Richiedi un nuovo link.';
            } else if (exchangeError.message) {
              userMessage = exchangeError.message;
            }
            
            // Redirect alla pagina errore con type
            router.push(`/auth/error?error=${encodeURIComponent(userMessage)}&type=${typeFromQuery || 'magiclink'}`);
            return;
          }
          
          // Successo - vai alla home
          router.push('/');
          
        } catch (err) {
          console.error('Unexpected error:', err);
          router.push(`/auth/error?error=Errore+imprevisto.+Riprova.&type=${typeFromQuery || 'magiclink'}`);
        }
      } else {
        // Nessun code e nessun errore - vai alla home
        router.push('/');
      }
    };

    handleAuth();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">
          {error ? 'Reindirizzamento...' : 'Autenticazione in corso...'}
        </p>
      </div>
    </div>
  );
}