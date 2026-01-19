// src/app/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (user) {
      setDisplayName(user.user_metadata?.display_name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      // Aggiorna il display name nei metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { display_name: displayName },
      });

      if (updateError) {
        throw updateError;
      }

      // Se l'email è cambiata, aggiornala
      if (email !== user?.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: email,
        });

        if (emailError) {
          throw emailError;
        }

        setMessage({
          type: "success",
          text: "Profilo aggiornato! Controlla la tua nuova email per confermare il cambio.",
        });
      } else {
        setMessage({
          type: "success",
          text: "Profilo aggiornato con successo!",
        });
      }

      setIsEditing(false);
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setMessage({
        type: "error",
        text: error.message || "Errore durante l'aggiornamento del profilo.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setDisplayName(user.user_metadata?.display_name || "");
      setEmail(user.email || "");
    }
    setIsEditing(false);
    setMessage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <p className="text-gray-600">Devi effettuare l'accesso per visualizzare questa pagina.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Profilo</h1>
          <p className="text-gray-600 mt-1">Gestisci le informazioni del tuo profilo</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Dati Personali</CardTitle>
              {!isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Modifica
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {message && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  message.type === "success"
                    ? "bg-green-50 border border-green-200 text-green-800"
                    : "bg-red-50 border border-red-200 text-red-800"
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Nome/Nickname */}
              <div className="space-y-2">
                <Label htmlFor="displayName">Nome o Nickname</Label>
                <Input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  disabled={!isEditing}
                  placeholder="Come vuoi essere chiamato?"
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                  placeholder="nome@esempio.com"
                  className={!isEditing ? "bg-gray-50" : ""}
                />
                {isEditing && (
                  <p className="text-xs text-gray-500">
                    Se modifichi l'email, riceverai un messaggio di conferma al nuovo indirizzo.
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Salvataggio..." : "Salva Modifiche"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSaving}
                  >
                    Annulla
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Informazioni Account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700">ID Utente</p>
                <p className="text-sm text-gray-600 mt-1 font-mono">{user.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Account creato il</p>
                <p className="text-sm text-gray-600 mt-1">
                  {new Date(user.created_at).toLocaleDateString("it-IT", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Ultimo accesso</p>
                <p className="text-sm text-gray-600 mt-1">
                  {user.last_sign_in_at
                    ? new Date(user.last_sign_in_at).toLocaleDateString("it-IT", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}