// src/app/auth/error/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();
  const error = searchParams.get('error') || 'Si è verificato un errore durante l\'autenticazione.';
  const type = searchParams.get('type'); // signup o magiclink

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Se l'utente è già loggato, mostra con header e footer
  if (user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-16">
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Errore di Autenticazione
            </h1>

            <p className="text-gray-600 mb-6">{error}</p>

            <p className="text-sm text-gray-500 mb-6">
              Sei già autenticato come <span className="font-medium">{user.email}</span>
            </p>

            <div className="flex gap-3 justify-center">
              <Link href="/">
                <Button>Torna alla Home</Button>
              </Link>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  // Se l'utente NON è loggato, mostra landing page pulita
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="text-4xl font-bold text-primary mb-2 cursor-pointer hover:opacity-80 transition">
              House
            </h1>
          </Link>
          <p className="text-gray-600">Trova la tua casa ideale</p>
        </div>

        <Card className="p-8 shadow-lg border-0 text-center">
          {/* Error Icon */}
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Errore di Autenticazione
          </h2>

          <p className="text-gray-600 mb-6">{error}</p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm font-medium text-gray-900 mb-2">Cosa puoi fare:</p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Richiedi un nuovo link di accesso</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Controlla che l'email sia corretta</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Usa il link entro 15 minuti dall'invio</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            {type === 'signup' ? (
              <>
                <Link href="/signup">
                  <Button className="w-full">Richiedi Nuovo Link di Registrazione</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="w-full">
                    Hai già un account? Accedi
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button className="w-full">Richiedi Nuovo Link di Accesso</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="outline" className="w-full">
                    Non hai un account? Registrati
                  </Button>
                </Link>
              </>
            )}
          </div>
        </Card>

        {/* Link Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-primary transition">
            ← Torna alla Home
          </Link>
        </div>
      </div>
    </div>
  );
}