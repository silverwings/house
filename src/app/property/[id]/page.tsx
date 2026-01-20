// src/app/property/[id]/page.tsx
"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock data - sostituiremo con dati reali da Supabase
const mockProperty = {
  id: 1,
  title: "Appartamento moderno nel centro di Milano",
  description: "Splendido appartamento completamente ristrutturato nel cuore di Milano. L'immobile si trova al terzo piano di un elegante palazzo d'epoca con ascensore. Gli interni sono stati progettati con materiali di alta qualità e finiture moderne. La zona giorno luminosa si apre su un balcone con vista sulla città. La cucina è completamente attrezzata con elettrodomestici di ultima generazione. La camera da letto principale dispone di ampio armadio a muro. Il bagno è dotato di doccia idromassaggio e sanitari sospesi. Riscaldamento autonomo e aria condizionata in tutti gli ambienti. Cantina di pertinenza inclusa.",
  location: "Milano, Lombardia",
  address: "Via Dante Alighieri, 45",
  price: 350000,
  bedrooms: 2,
  bathrooms: 1,
  sqm: 75,
  floor: 3,
  status: "Ristrutturato",
  energyClass: "A",
  yearBuilt: 2020,
  images: [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=1200&h=800&fit=crop",
  ],
  amenities: [
    "Ascensore",
    "Balcone",
    "Aria condizionata",
    "Riscaldamento autonomo",
    "Cantina",
    "Doppi vetri",
    "Porta blindata",
    "Fibra ottica",
  ],
};

const relatedProperties = [
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
];

export default function PropertyDetailPage() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

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
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center gap-2 text-gray-600">
            <li>
              <Link href="/" className="hover:text-primary transition">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/" className="hover:text-primary transition">
                Immobili
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium truncate">{mockProperty.title}</li>
          </ol>
        </nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="space-y-3">
              {/* Main Image */}
              <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden bg-gray-200">
                <Image
                  src={mockProperty.images[selectedImage]}
                  alt={mockProperty.title}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Heart Button */}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all hover:scale-110 z-10"
                  aria-label={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                >
                  <svg
                    className={`w-6 h-6 transition-colors ${
                      isFavorite ? "text-red-500 fill-current" : "text-gray-700"
                    }`}
                    fill={isFavorite ? "currentColor" : "none"}
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

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 text-white text-sm rounded-full">
                  {selectedImage + 1} / {mockProperty.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-5 gap-2">
                {mockProperty.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 rounded-lg overflow-hidden transition-all ${
                      selectedImage === index
                        ? "ring-2 ring-primary"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Foto ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Descrizione</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {mockProperty.description}
                </p>
              </div>
            </Card>

            {/* Features */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Caratteristiche</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Camere</p>
                      <p className="font-semibold text-gray-900">{mockProperty.bedrooms}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Bagni</p>
                      <p className="font-semibold text-gray-900">{mockProperty.bathrooms}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Superficie</p>
                      <p className="font-semibold text-gray-900">{mockProperty.sqm} m²</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Piano</p>
                      <p className="font-semibold text-gray-900">{mockProperty.floor}°</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Classe Energetica</p>
                      <p className="font-semibold text-gray-900">{mockProperty.energyClass}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Anno</p>
                      <p className="font-semibold text-gray-900">{mockProperty.yearBuilt}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Amenities */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Dotazioni</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {mockProperty.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Contact Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <div className="p-6">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {mockProperty.title}
                  </h1>
                  <p className="text-gray-600 flex items-center gap-1">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {mockProperty.address}
                  </p>
                </div>

                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-3xl font-bold text-primary">
                    {formatPrice(mockProperty.price)}
                  </p>
                </div>

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Chiama Ora
                  </Button>
                  
                  <Button variant="outline" className="w-full" size="lg">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Invia Messaggio
                  </Button>

                  <Button variant="outline" className="w-full" size="lg">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Prenota Visita
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Marco Rossi</p>
                      <p className="text-sm text-gray-600">Agente Immobiliare</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Related Properties */}
        <div className="mt-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Altri immobili</h2>
            <p className="text-gray-600">Potrebbero interessarti anche questi</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {relatedProperties.map((property) => (
              <Link key={property.id} href={`/property/${property.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group p-0">
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log("Toggle favorite:", property.id);
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

                  <div className="p-3">
                    <div className="mb-2">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 min-h-[2.5rem]">
                        {property.title}
                      </h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {property.location}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                      <span>{property.bedrooms} cam</span>
                      <span>•</span>
                      <span>{property.bathrooms} bagni</span>
                      <span>•</span>
                      <span>{property.sqm} m²</span>
                    </div>

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
        </div>
      </main>
    </div>
  );
}