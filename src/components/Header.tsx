// src/components/Header.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CustomSelect } from "@/components/CustomSelect";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Header() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  
  // Stati per i filtri
  const [uso, setUso] = useState("");
  const [dimensione, setDimensione] = useState("");
  const [stato, setStato] = useState("");

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  const getUserDisplayName = () => {
    if (user?.user_metadata?.display_name) {
      return user.user_metadata.display_name;
    }
    return user?.email?.split("@")[0] || "Utente";
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Ricerca:", { uso, dimensione, stato });
    // Implementa la logica di ricerca
  };

  if (loading) {
    return (
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-primary">House</div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar - Menu principale */}
        <div className="flex justify-between items-center h-16 border-b border-gray-100">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition">
            House
          </Link>

          {/* Navigation Centrata */}
          <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-primary transition font-medium"
            >
              Immobili
            </Link>
          </nav>

          {/* Right Side: Le mie Stanze + Burger Menu */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Le mie Stanze - Visibile solo su desktop */}
                <Link 
                  href="/rooms" 
                  className="hidden lg:flex text-gray-700 hover:text-primary transition font-medium"
                >
                  Le mie Stanze
                </Link>

                {/* Burger Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 hover:opacity-80 transition outline-none p-2">
                      <svg
                        className="w-6 h-6 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 bg-white">
                    {/* User Info come prima voce */}
                    <div className="px-3 py-3 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-semibold">
                            {getUserDisplayName()[0].toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm truncate">
                            {getUserDisplayName()}
                          </p>
                          <p className="text-gray-500 text-xs truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Le mie Stanze - Visibile solo su mobile/tablet */}
                    <div className="lg:hidden">
                      <DropdownMenuItem asChild>
                        <Link href="/rooms" className="cursor-pointer">
                          <svg
                            className="mr-2 h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                          </svg>
                          Le mie Stanze
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </div>

                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <svg
                          className="mr-2 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Profilo
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/favorites" className="cursor-pointer">
                        <svg
                          className="mr-2 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        Preferiti
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50" 
                      onClick={handleLogout}
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex gap-2">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Accedi
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Registrati</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="py-4">
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
            {/* Desktop Version - Barra orizzontale */}
            <div className="hidden md:flex items-center bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow overflow-visible">
              {/* Uso */}
              <div className="flex-1 px-6 py-3 border-r border-gray-200">
                <CustomSelect
                  label="Uso"
                  placeholder="Seleziona tipo"
                  value={uso}
                  onChange={setUso}
                  options={[
                    { value: "residenziale", label: "Residenziale" },
                    { value: "commerciale", label: "Commerciale" },
                    { value: "ufficio", label: "Ufficio" },
                  ]}
                />
              </div>

              {/* Dimensione */}
              <div className="flex-1 px-6 py-3 border-r border-gray-200">
                <CustomSelect
                  label="Dimensione"
                  placeholder="Seleziona mq"
                  value={dimensione}
                  onChange={setDimensione}
                  options={[
                    { value: "piccolo", label: "Fino a 50 m²" },
                    { value: "medio", label: "50-100 m²" },
                    { value: "grande", label: "100-200 m²" },
                    { value: "extra", label: "Oltre 200 m²" },
                  ]}
                />
              </div>

              {/* Stato */}
              <div className="flex-1 px-6 py-3">
                <CustomSelect
                  label="Stato"
                  placeholder="Seleziona stato"
                  value={stato}
                  onChange={setStato}
                  options={[
                    { value: "nuovo", label: "Nuovo" },
                    { value: "ristrutturato", label: "Ristrutturato" },
                    { value: "buono", label: "Buono stato" },
                    { value: "daristrutturare", label: "Da ristrutturare" },
                  ]}
                />
              </div>

              {/* Search Button */}
              <div className="pr-2">
                <button 
                  type="submit"
                  className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition flex-shrink-0 shadow-sm hover:shadow-md"
                  aria-label="Cerca"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Version - Layout verticale compatto */}
            <div className="md:hidden space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {/* Uso */}
                <div className="bg-white border border-gray-300 rounded-lg p-3">
                  <CustomSelect
                    label="Uso"
                    placeholder="Tipo"
                    value={uso}
                    onChange={setUso}
                    options={[
                      { value: "residenziale", label: "Residenziale" },
                      { value: "commerciale", label: "Commerciale" },
                      { value: "ufficio", label: "Ufficio" },
                    ]}
                  />
                </div>

                {/* Dimensione */}
                <div className="bg-white border border-gray-300 rounded-lg p-3">
                  <CustomSelect
                    label="Dimensione"
                    placeholder="m²"
                    value={dimensione}
                    onChange={setDimensione}
                    options={[
                      { value: "piccolo", label: "< 50 m²" },
                      { value: "medio", label: "50-100 m²" },
                      { value: "grande", label: "100-200 m²" },
                      { value: "extra", label: "> 200 m²" },
                    ]}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                {/* Stato */}
                <div className="flex-1 bg-white border border-gray-300 rounded-lg p-3">
                  <CustomSelect
                    label="Stato"
                    placeholder="Condizione"
                    value={stato}
                    onChange={setStato}
                    options={[
                      { value: "nuovo", label: "Nuovo" },
                      { value: "ristrutturato", label: "Ristrutturato" },
                      { value: "buono", label: "Buono" },
                      { value: "daristrutturare", label: "Da ristrutt." },
                    ]}
                  />
                </div>

                {/* Search Button */}
                <button 
                  type="submit"
                  className="h-[58px] w-14 rounded-lg bg-primary hover:bg-primary/90 flex items-center justify-center transition flex-shrink-0 shadow-sm"
                  aria-label="Cerca"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}