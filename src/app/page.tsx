// /src/app/page.tsx
"use client";

import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

// Dati mock per gli immobili (sostituiremo con dati reali da Supabase)
const mockProperties = [
  {
    id: 1,
    title: "Appartamento moderno centro Milano",
    location: "Milano, Lombardia",
    price: 350000,
    bedrooms: 2,
    bathrooms: 1,
    sqm: 75,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Villa con vista mare",
    location: "Portofino, Liguria",
    price: 1200000,
    bedrooms: 4,
    bathrooms: 3,
    sqm: 250,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Attico di lusso con terrazzo",
    location: "Roma, Lazio",
    price: 850000,
    bedrooms: 3,
    bathrooms: 2,
    sqm: 120,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    title: "Casa indipendente campagna",
    location: "Siena, Toscana",
    price: 450000,
    bedrooms: 3,
    bathrooms: 2,
    sqm: 180,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop",
  },
  {
    id: 5,
    title: "Loft industriale ristrutturato",
    location: "Torino, Piemonte",
    price: 280000,
    bedrooms: 1,
    bathrooms: 1,
    sqm: 90,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
  },
  {
    id: 6,
    title: "Appartamento balcone panoramico",
    location: "Firenze, Toscana",
    price: 520000,
    bedrooms: 2,
    bathrooms: 2,
    sqm: 95,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
  },
  {
    id: 7,
    title: "Monolocale zona universitaria",
    location: "Bologna, Emilia-Romagna",
    price: 180000,
    bedrooms: 1,
    bathrooms: 1,
    sqm: 45,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
  },
  {
    id: 8,
    title: "Trilocale ristrutturato centro",
    location: "Verona, Veneto",
    price: 295000,
    bedrooms: 2,
    bathrooms: 1,
    sqm: 85,
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",
  },
  {
    id: 9,
    title: "Penthouse vista lago",
    location: "Como, Lombardia",
    price: 980000,
    bedrooms: 3,
    bathrooms: 2,
    sqm: 140,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
  },
  {
    id: 10,
    title: "Bilocale zona residenziale",
    location: "Padova, Veneto",
    price: 220000,
    bedrooms: 1,
    bathrooms: 1,
    sqm: 60,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
  },
  {
    id: 11,
    title: "Villa singola con giardino",
    location: "Bergamo, Lombardia",
    price: 550000,
    bedrooms: 4,
    bathrooms: 2,
    sqm: 200,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
  },
  {
    id: 12,
    title: "Mansarda centro storico",
    location: "Pisa, Toscana",
    price: 310000,
    bedrooms: 2,
    bathrooms: 1,
    sqm: 70,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
  },
];

export default function Home() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Trova la tua casa ideale
          </h1>
          <p className="text-gray-600">
            Scopri le migliori opportunità immobiliari in tutta Italia
          </p>
        </div>

        {/* Filters - Placeholder for now */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          <Button variant="outline" size="sm">Tutti</Button>
          <Button variant="outline" size="sm">Appartamenti</Button>
          <Button variant="outline" size="sm">Ville</Button>
          <Button variant="outline" size="sm">Loft</Button>
          <Button variant="outline" size="sm">Case indipendenti</Button>
        </div>

        {/* Property Grid - 6 colonne */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {mockProperties.map((property) => (
            <Link href={`/property/${property.id}`} key={property.id}>
              <Card
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group p-0"
              >
              {/* Image */}
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Heart Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("Toggle favorite:", property.id);
                    // TODO: Implementa logica preferiti
                  }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all hover:scale-110 z-10"
                  aria-label="Aggiungi ai preferiti"
                >
                  <svg
                    className="w-5 h-5 text-gray-700 hover:text-red-500 transition-colors"
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
                </button>
              </div>

              {/* Content */}
              <div className="p-3">
                <div className="mb-2">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 min-h-[2.5rem]">
                    {property.title}
                  </h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {property.location}
                  </p>
                </div>

                {/* Features */}
                <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                  <span>{property.bedrooms} cam</span>
                  <span>•</span>
                  <span>{property.bathrooms} bagni</span>
                  <span>•</span>
                  <span>{property.sqm} m²</span>
                </div>

                {/* Price */}
                <div className="pt-2 border-t border-gray-100">
                  <span className="text-base font-bold text-primary block">
                    {formatPrice(property.price)}
                  </span>
                </div>
              </div>
            </Card>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <Button variant="outline" size="lg">
            Carica altri immobili
          </Button>
        </div>
      </main>
    </div>
  );
}