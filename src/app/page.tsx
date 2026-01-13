// /src/app/page.tsx
"use client";

import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Dati mock per gli immobili (sostituiremo con dati reali da Supabase)
const mockProperties = [
  {
    id: 1,
    title: "Appartamento moderno nel centro di Milano",
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
    title: "Casa indipendente in campagna",
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
    title: "Appartamento con balcone panoramico",
    location: "Firenze, Toscana",
    price: 520000,
    bedrooms: 2,
    bathrooms: 2,
    sqm: 95,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Trova la tua casa ideale
          </h1>
          <p className="text-lg text-gray-600">
            Scopri le migliori opportunità immobiliari in tutta Italia
          </p>
        </div>

        {/* Filters - Placeholder for now */}
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          <Button variant="outline" size="sm">Tutti</Button>
          <Button variant="outline" size="sm">Appartamenti</Button>
          <Button variant="outline" size="sm">Ville</Button>
          <Button variant="outline" size="sm">Loft</Button>
          <Button variant="outline" size="sm">Case indipendenti</Button>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProperties.map((property) => (
            <Card
              key={property.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
            >
              {/* Image */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                    {property.title}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
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
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
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
                    {property.bedrooms} camere
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                      />
                    </svg>
                    {property.bathrooms} bagni
                  </span>
                  <span>{property.sqm} m²</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(property.price)}
                  </span>
                  <Button size="sm" className="group-hover:bg-primary group-hover:text-white transition">
                    Dettagli
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            Carica altri immobili
          </Button>
        </div>
      </main>
    </div>
  );
}