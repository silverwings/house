// src/app/room/[id]/page.tsx
"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock data
const mockRoom = {
  id: 1,
  title: "Soggiorno Scandinavo Luminoso",
  description: "Un soggiorno dal design scandinavo che combina minimalismo e comfort. La palette di colori neutri crea un'atmosfera rilassante, mentre la luce naturale abbondante esalta gli spazi. Il parquet chiaro e i tessuti naturali completano l'ambiente.",
  room_type: "soggiorno",
  design_style: "scandinavo",
  sqm: 28,
  height: 2.8,
  wall_color: "Bianco sporco",
  floor_type: "parquet",
  floor_color: "Rovere chiaro",
  natural_light: "molta",
  window_orientation: "sud",
  budget_range: "medio",
  tags: ["minimal", "luminoso", "accogliente", "nordico"],
  user: {
    id: "user-1",
    name: "Anna Rossi",
    avatar: "https://i.pravatar.cc/150?img=1",
    bio: "Interior designer appassionata di stile scandinavo"
  },
  images: [
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop",
  ],
  items: [
    { id: 1, type: "divano", brand: "IKEA", model: "Söderhamn", color: "Grigio chiaro", price: 899 },
    { id: 2, type: "tavolino", brand: "HAY", model: "Bella Coffee Table", color: "Bianco", price: 349 },
    { id: 3, type: "lampada", brand: "Muuto", model: "Ambit", color: "Bianco", price: 289 },
    { id: 4, type: "tappeto", brand: "H&M Home", model: "Juta naturale", color: "Naturale", price: 79 },
  ],
  features: [
    { key: "Illuminazione", value: "LED dimmerabile + luce naturale", category: "Luce" },
    { key: "Riscaldamento", value: "Pavimento radiante", category: "Comfort" },
    { key: "Prese smart", value: "Controllo domotico luci", category: "Tecnologia" },
  ],
  like_count: 342,
  save_count: 128,
  comment_count: 23,
  view_count: 1250,
  is_liked: false,
  is_saved: false,
  created_at: "2024-01-15",
};

const mockComments = [
  {
    id: 1,
    user: {
      name: "Marco Verdi",
      avatar: "https://i.pravatar.cc/150?img=10"
    },
    content: "Bellissimo! Dove hai preso il divano? Sto cercando qualcosa di simile per il mio soggiorno",
    created_at: "2 giorni fa",
    replies: [
      {
        id: 2,
        user: {
          name: "Anna Rossi",
          avatar: "https://i.pravatar.cc/150?img=1"
        },
        content: "Grazie! È un IKEA Söderhamn, molto comodo e perfetto per lo stile scandinavo 😊",
        created_at: "1 giorno fa",
      }
    ]
  },
  {
    id: 3,
    user: {
      name: "Laura Blu",
      avatar: "https://i.pravatar.cc/150?img=11"
    },
    content: "Adoro i colori neutri! Che tonalità di bianco hai usato per le pareti?",
    created_at: "3 giorni fa",
    replies: []
  },
];

const relatedRooms = [
  {
    id: 2,
    title: "Soggiorno Minimal Giapponese",
    room_type: "soggiorno",
    design_style: "giapponese",
    user: { name: "Yuki Tanaka", avatar: "https://i.pravatar.cc/150?img=12" },
    image: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop",
    like_count: 456,
    is_liked: false,
  },
  {
    id: 3,
    title: "Living Room Nordico Moderno",
    room_type: "soggiorno",
    design_style: "scandinavo",
    user: { name: "Erik Nielsen", avatar: "https://i.pravatar.cc/150?img=13" },
    image: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800&h=600&fit=crop",
    like_count: 389,
    is_liked: false,
  },
  {
    id: 4,
    title: "Soggiorno Bianco Minimalista",
    room_type: "soggiorno",
    design_style: "minimalista",
    user: { name: "Sofia White", avatar: "https://i.pravatar.cc/150?img=14" },
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop",
    like_count: 521,
    is_liked: false,
  },
  {
    id: 5,
    title: "Open Space Luminoso",
    room_type: "soggiorno",
    design_style: "contemporaneo",
    user: { name: "Paolo Grigi", avatar: "https://i.pravatar.cc/150?img=15" },
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&h=600&fit=crop",
    like_count: 298,
    is_liked: false,
  },
];

export default function RoomDetailPage() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(mockRoom.is_liked);
  const [isSaved, setIsSaved] = useState(mockRoom.is_saved);
  const [likeCount, setLikeCount] = useState(mockRoom.like_count);
  const [saveCount, setSaveCount] = useState(mockRoom.save_count);
  const [newComment, setNewComment] = useState("");

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
    setSaveCount(isSaved ? saveCount - 1 : saveCount + 1);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nuovo commento:", newComment);
    setNewComment("");
    // TODO: Implementa invio commento
  };

  const roomTypeLabels: Record<string, string> = {
    soggiorno: "Soggiorno",
    camera_letto: "Camera da letto",
    cucina: "Cucina",
    bagno: "Bagno",
  };

  const designStyleLabels: Record<string, string> = {
    scandinavo: "Scandinavo",
    moderno: "Moderno",
    giapponese: "Giapponese",
    minimalista: "Minimalista",
    contemporaneo: "Contemporaneo",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center gap-2 text-gray-600">
            <li><Link href="/" className="hover:text-primary transition">Home</Link></li>
            <li>/</li>
            <li><Link href="/" className="hover:text-primary transition">Stanze</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium truncate">{mockRoom.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <div className="space-y-3">
              {/* Main Image */}
              <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden bg-gray-200">
                <Image
                  src={mockRoom.images[selectedImage]}
                  alt={mockRoom.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {mockRoom.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 rounded-lg overflow-hidden transition-all ${
                      selectedImage === index ? "ring-2 ring-primary" : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={image} alt={`Foto ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Title and Actions */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{mockRoom.title}</h1>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                    {roomTypeLabels[mockRoom.room_type]}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                    {designStyleLabels[mockRoom.design_style]}
                  </span>
                  <span>{mockRoom.sqm} m²</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleLike}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                    isLiked
                      ? "bg-red-50 text-red-600 hover:bg-red-100"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <svg
                    className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
                    fill={isLiked ? "currentColor" : "none"}
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
                  <span>{likeCount}</span>
                </button>

                <button
                  onClick={toggleSave}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                    isSaved
                      ? "bg-primary/10 text-primary hover:bg-primary/20"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <svg
                    className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`}
                    fill={isSaved ? "currentColor" : "none"}
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
                  <span>{saveCount}</span>
                </button>
              </div>
            </div>

            {/* User Info */}
            <Card>
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={mockRoom.user.avatar}
                      alt={mockRoom.user.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{mockRoom.user.name}</p>
                    <p className="text-sm text-gray-600">{mockRoom.user.bio}</p>
                  </div>
                </div>
                <Button variant="outline">Segui</Button>
              </div>
            </Card>

            {/* Description */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Descrizione</h2>
                <p className="text-gray-700 leading-relaxed">{mockRoom.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {mockRoom.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>

            {/* Room Details */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Dettagli Stanza</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Superficie</p>
                    <p className="font-semibold text-gray-900">{mockRoom.sqm} m²</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Altezza</p>
                    <p className="font-semibold text-gray-900">{mockRoom.height} m</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Luce naturale</p>
                    <p className="font-semibold text-gray-900 capitalize">{mockRoom.natural_light}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Colore pareti</p>
                    <p className="font-semibold text-gray-900">{mockRoom.wall_color}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Pavimento</p>
                    <p className="font-semibold text-gray-900 capitalize">{mockRoom.floor_type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Budget</p>
                    <p className="font-semibold text-gray-900 capitalize">{mockRoom.budget_range}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Items/Furniture */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Mobili ed Elementi</h2>
                <div className="space-y-3">
                  {mockRoom.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 capitalize">{item.type}</p>
                        <p className="text-sm text-gray-600">
                          {item.brand} - {item.model} • {item.color}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">€{item.price}</p>
                        <Button variant="ghost" size="sm" className="text-xs">
                          Dove acquistare →
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Features */}
            {mockRoom.features.length > 0 && (
              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Caratteristiche Extra</h2>
                  <div className="space-y-2">
                    {mockRoom.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <p className="font-medium text-gray-900">{feature.key}</p>
                          <p className="text-sm text-gray-600">{feature.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {/* Comments */}
            <Card id="comments">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Commenti ({mockRoom.comment_count})
                </h2>

                {/* New Comment Form */}
                <form onSubmit={handleCommentSubmit} className="mb-6">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                    <div className="flex-1">
                      <Input
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Aggiungi un commento..."
                        className="mb-2"
                      />
                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="ghost" size="sm">Annulla</Button>
                        <Button type="submit" size="sm" disabled={!newComment.trim()}>
                          Commenta
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-4">
                  {mockComments.map((comment) => (
                    <div key={comment.id}>
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={comment.user.avatar}
                            alt={comment.user.name}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="font-semibold text-sm text-gray-900 mb-1">
                              {comment.user.name}
                            </p>
                            <p className="text-gray-700 text-sm">{comment.content}</p>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                            <span>{comment.created_at}</span>
                            <button className="hover:text-primary transition">Mi piace</button>
                            <button className="hover:text-primary transition">Rispondi</button>
                          </div>

                          {/* Replies */}
                          {comment.replies.length > 0 && (
                            <div className="mt-3 ml-6 space-y-3">
                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="flex gap-3">
                                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                                    <Image
                                      src={reply.user.avatar}
                                      alt={reply.user.name}
                                      width={32}
                                      height={32}
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <div className="bg-gray-50 rounded-lg p-3">
                                      <p className="font-semibold text-sm text-gray-900 mb-1">
                                        {reply.user.name}
                                      </p>
                                      <p className="text-gray-700 text-sm">{reply.content}</p>
                                    </div>
                                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                                      <span>{reply.created_at}</span>
                                      <button className="hover:text-primary transition">Mi piace</button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Stats */}
              <Card>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">Statistiche</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Visualizzazioni</span>
                      <span className="font-semibold">{mockRoom.view_count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mi piace</span>
                      <span className="font-semibold">{likeCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Salvataggi</span>
                      <span className="font-semibold">{saveCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Commenti</span>
                      <span className="font-semibold">{mockRoom.comment_count}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Share */}
              <Card>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">Condividi</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Related Rooms */}
        <div className="mt-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Stanze Simili</h2>
            <p className="text-gray-600">Altre stanze che potrebbero piacerti</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {relatedRooms.map((room) => (
              <Link key={room.id} href={`/room/${room.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow group p-0">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={room.image}
                      alt={room.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                      {room.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {room.like_count}
                      </span>
                      <span className="text-gray-500">{room.user.name}</span>
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