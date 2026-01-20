// src/app/page.tsx
"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

// Mock data per le stanze
const mockRooms = [
  {
    id: 1,
    title: "Soggiorno Scandinavo Luminoso",
    room_type: "soggiorno",
    design_style: "scandinavo",
    sqm: 28,
    user: {
      name: "Anna Rossi",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop",
    like_count: 342,
    save_count: 128,
    comment_count: 23,
    tags: ["minimal", "luminoso", "accogliente"],
    is_liked: false,
    is_saved: false,
  },
  {
    id: 2,
    title: "Camera da Letto Moderna con Vista",
    room_type: "camera_letto",
    design_style: "moderno",
    sqm: 18,
    user: {
      name: "Marco Bianchi",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop",
    like_count: 567,
    save_count: 234,
    comment_count: 45,
    tags: ["elegante", "rilassante"],
    is_liked: false,
    is_saved: false,
  },
  {
    id: 3,
    title: "Cucina Industriale Open Space",
    room_type: "cucina",
    design_style: "industriale",
    sqm: 22,
    user: {
      name: "Sofia Verde",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    image: "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800&h=600&fit=crop",
    like_count: 892,
    save_count: 445,
    comment_count: 67,
    tags: ["industrial", "funzionale"],
    is_liked: false,
    is_saved: false,
  },
  {
    id: 4,
    title: "Bagno Minimal con Vasca",
    room_type: "bagno",
    design_style: "minimalista",
    sqm: 8,
    user: {
      name: "Luca Neri",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop",
    like_count: 423,
    save_count: 189,
    comment_count: 31,
    tags: ["spa", "relax"],
    is_liked: false,
    is_saved: false,
  },
  {
    id: 5,
    title: "Studio Home Office Creativo",
    room_type: "studio",
    design_style: "contemporaneo",
    sqm: 12,
    user: {
      name: "Elena Gialli",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop",
    like_count: 678,
    save_count: 312,
    comment_count: 52,
    tags: ["produttivo", "creativo"],
    is_liked: false,
    is_saved: false,
  },
  {
    id: 6,
    title: "Terrazzo Boho con Piante",
    room_type: "terrazzo",
    design_style: "boho",
    sqm: 15,
    user: {
      name: "Giulia Marroni",
      avatar: "https://i.pravatar.cc/150?img=6"
    },
    image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop",
    like_count: 1243,
    save_count: 678,
    comment_count: 89,
    tags: ["outdoor", "verde", "relax"],
    is_liked: false,
    is_saved: false,
  },
  {
    id: 7,
    title: "Cameretta Montessori per Bambini",
    room_type: "cameretta",
    design_style: "scandinavo",
    sqm: 14,
    user: {
      name: "Chiara Blu",
      avatar: "https://i.pravatar.cc/150?img=7"
    },
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    like_count: 534,
    save_count: 267,
    comment_count: 41,
    tags: ["kids", "educativo"],
    is_liked: false,
    is_saved: false,
  },
  {
    id: 8,
    title: "Ingresso Elegante con Specchio",
    room_type: "ingresso",
    design_style: "classico",
    sqm: 6,
    user: {
      name: "Paolo Grigi",
      avatar: "https://i.pravatar.cc/150?img=8"
    },
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
    like_count: 298,
    save_count: 134,
    comment_count: 18,
    tags: ["elegante", "funzionale"],
    is_liked: false,
    is_saved: false,
  },
];

const roomTypeLabels: Record<string, string> = {
  soggiorno: "Soggiorno",
  camera_letto: "Camera da letto",
  cucina: "Cucina",
  bagno: "Bagno",
  studio: "Studio",
  cameretta: "Cameretta",
  terrazzo: "Terrazzo",
  ingresso: "Ingresso",
};

const designStyleLabels: Record<string, string> = {
  scandinavo: "Scandinavo",
  moderno: "Moderno",
  industriale: "Industriale",
  minimalista: "Minimalista",
  contemporaneo: "Contemporaneo",
  boho: "Boho",
  classico: "Classico",
};

export default function Home() {
  const [rooms, setRooms] = useState(mockRooms);

  const toggleLike = (roomId: number) => {
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? { 
            ...room, 
            is_liked: !room.is_liked,
            like_count: room.is_liked ? room.like_count - 1 : room.like_count + 1
          }
        : room
    ));
  };

  const toggleSave = (roomId: number) => {
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? { 
            ...room, 
            is_saved: !room.is_saved,
            save_count: room.is_saved ? room.save_count - 1 : room.save_count + 1
          }
        : room
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Esplora Stanze e Design
          </h1>
          <p className="text-gray-600">
            Scopri idee e ispirazioni per ogni ambiente della tua casa
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          <Button variant="outline" size="sm">Tutte</Button>
          <Button variant="outline" size="sm">Soggiorno</Button>
          <Button variant="outline" size="sm">Camera</Button>
          <Button variant="outline" size="sm">Cucina</Button>
          <Button variant="outline" size="sm">Bagno</Button>
          <Button variant="outline" size="sm">Studio</Button>
        </div>

        {/* Rooms Grid - Layout Pinterest style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {rooms.map((room) => (
            <Card
              key={room.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 group p-0 flex flex-col"
            >
              {/* Image */}
              <Link href={`/room/${room.id}`} className="relative h-64 w-full overflow-hidden block">
                <Image
                  src={room.image}
                  alt={room.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay con azioni rapide */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Tags in basso */}
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2 flex-wrap">
                    {room.tags.slice(0, 2).map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-900 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Badge tipo stanza */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-xs font-semibold text-gray-900 rounded-full shadow-sm">
                    {roomTypeLabels[room.room_type]}
                  </span>
                </div>

                {/* Save button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleSave(room.id);
                  }}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                  aria-label="Salva"
                >
                  <svg
                    className={`w-5 h-5 transition-colors ${
                      room.is_saved ? "text-primary fill-current" : "text-gray-700"
                    }`}
                    fill={room.is_saved ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </button>
              </Link>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                <Link href={`/room/${room.id}`}>
                  <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition">
                    {room.title}
                  </h3>
                </Link>

                {/* Meta info */}
                <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                  <span className="px-2 py-0.5 bg-gray-100 rounded-full">
                    {designStyleLabels[room.design_style]}
                  </span>
                  <span>•</span>
                  <span>{room.sqm} m²</span>
                </div>

                {/* User info */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={room.user.avatar}
                      alt={room.user.name}
                      width={28}
                      height={28}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm text-gray-700 font-medium truncate">
                    {room.user.name}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-3 border-t border-gray-100 mt-auto">
                  {/* Like */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleLike(room.id);
                    }}
                    className="flex items-center gap-1.5 text-gray-600 hover:text-red-500 transition group/like"
                  >
                    <svg
                      className={`w-5 h-5 transition-colors ${
                        room.is_liked ? "text-red-500 fill-current" : ""
                      }`}
                      fill={room.is_liked ? "currentColor" : "none"}
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
                    <span className="text-sm font-medium">{room.like_count}</span>
                  </button>

                  {/* Comments */}
                  <Link 
                    href={`/room/${room.id}#comments`}
                    className="flex items-center gap-1.5 text-gray-600 hover:text-primary transition"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span className="text-sm font-medium">{room.comment_count}</span>
                  </Link>

                  {/* Saves count */}
                  <div className="flex items-center gap-1.5 text-gray-600 ml-auto">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                    <span className="text-sm font-medium">{room.save_count}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            Carica altre stanze
          </Button>
        </div>
      </main>
    </div>
  );
}