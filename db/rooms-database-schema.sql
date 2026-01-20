-- =====================================================
-- SCHEMA DATABASE HOUSE - ROOM DESIGN APP
-- =====================================================
-- Concetto: Gli utenti caricano le loro stanze con foto e caratteristiche
-- per esplorare e condividere design di interni

-- Abilita le estensioni necessarie
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABELLE PRINCIPALI
-- =====================================================

-- Tabella utenti profili (estende auth.users di Supabase)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  instagram TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabella stanze (rooms)
CREATE TABLE public.rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Informazioni base
  title TEXT NOT NULL,
  description TEXT,
  slug TEXT UNIQUE, -- Per URL SEO friendly
  
  -- Tipologia stanza
  room_type TEXT NOT NULL CHECK (room_type IN (
    'soggiorno', 'camera_letto', 'cucina', 'bagno', 
    'studio', 'cameretta', 'mansarda', 'taverna',
    'ingresso', 'corridoio', 'balcone', 'terrazzo', 'giardino', 'altro'
  )),
  
  -- Stile design
  design_style TEXT CHECK (design_style IN (
    'moderno', 'classico', 'industriale', 'scandinavo', 
    'minimalista', 'vintage', 'boho', 'rustico',
    'contemporaneo', 'eclettico', 'giapponese', 'mediterraneo'
  )),
  
  -- Dimensioni
  sqm DECIMAL(6, 2), -- Metri quadri
  height DECIMAL(4, 2), -- Altezza soffitto in metri
  
  -- Caratteristiche stanza
  has_window BOOLEAN DEFAULT TRUE,
  window_orientation TEXT CHECK (window_orientation IN ('nord', 'sud', 'est', 'ovest', 'no_finestra')),
  natural_light TEXT CHECK (natural_light IN ('molta', 'media', 'poca', 'nessuna')),
  
  -- Colori predominanti
  wall_color TEXT, -- es: "Bianco ghiaccio", "Grigio perla"
  floor_type TEXT CHECK (floor_type IN (
    'parquet', 'gres', 'marmo', 'laminato', 
    'cotto', 'moquette', 'cemento', 'resina', 'altro'
  )),
  floor_color TEXT,
  
  -- Budget (opzionale)
  budget_range TEXT CHECK (budget_range IN (
    'economico', 'medio', 'alto', 'lusso', 'non_specificato'
  )),
  estimated_cost DECIMAL(10, 2), -- Costo totale stimato
  
  -- Tag liberi
  tags TEXT[], -- Array di tag es: ['minimal', 'accogliente', 'luminoso']
  
  -- Stato
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  is_featured BOOLEAN DEFAULT FALSE,
  
  -- Statistiche
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  save_count INTEGER DEFAULT 0,
  
  -- Timestamp
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Tabella immagini stanze
CREATE TABLE public.room_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_cover BOOLEAN DEFAULT FALSE, -- Immagine principale
  width INTEGER,
  height INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabella elementi/mobili nella stanza
CREATE TABLE public.room_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  
  item_type TEXT NOT NULL CHECK (item_type IN (
    'divano', 'poltrona', 'tavolo', 'sedia', 'letto',
    'armadio', 'libreria', 'scaffale', 'scrivania',
    'lampada', 'tappeto', 'quadro', 'pianta', 'specchio',
    'mobile_tv', 'credenza', 'consolle', 'pouf', 'altro'
  )),
  
  brand TEXT, -- Marca/designer
  model TEXT, -- Modello
  color TEXT,
  material TEXT, -- es: "legno", "metallo", "tessuto"
  
  price DECIMAL(10, 2), -- Prezzo se specificato
  purchase_link TEXT, -- Link acquisto
  
  notes TEXT,
  display_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabella caratteristiche personalizzate
CREATE TABLE public.room_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  feature_key TEXT NOT NULL, -- es: "colore_parete", "tipo_illuminazione"
  feature_value TEXT NOT NULL,
  category TEXT, -- Per raggruppare features simili
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabella likes/preferiti
CREATE TABLE public.room_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, room_id)
);

-- Tabella salvataggi (diverso da like, è per "salvare per dopo")
CREATE TABLE public.room_saves (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  collection_name TEXT, -- es: "Idee soggiorno", "Per la ristrutturazione"
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, room_id)
);

-- Tabella commenti
CREATE TABLE public.room_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES public.room_comments(id) ON DELETE CASCADE, -- Per risposte
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabella collezioni utente (mood boards)
CREATE TABLE public.collections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  cover_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabella ponte collezioni-stanze
CREATE TABLE public.collection_rooms (
  collection_id UUID REFERENCES public.collections(id) ON DELETE CASCADE,
  room_id UUID REFERENCES public.rooms(id) ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (collection_id, room_id)
);

-- =====================================================
-- INDICI PER PERFORMANCE
-- =====================================================

-- Indici per rooms
CREATE INDEX idx_rooms_user ON public.rooms(user_id);
CREATE INDEX idx_rooms_type ON public.rooms(room_type);
CREATE INDEX idx_rooms_style ON public.rooms(design_style);
CREATE INDEX idx_rooms_status ON public.rooms(status);
CREATE INDEX idx_rooms_featured ON public.rooms(is_featured);
CREATE INDEX idx_rooms_published ON public.rooms(published_at) WHERE status = 'published';
CREATE INDEX idx_rooms_slug ON public.rooms(slug);

-- Indice per ricerca testuale
CREATE INDEX idx_rooms_search ON public.rooms 
  USING gin(to_tsvector('italian', title || ' ' || COALESCE(description, '')));

-- Indice per tag
CREATE INDEX idx_rooms_tags ON public.rooms USING gin(tags);

-- Indici per images
CREATE INDEX idx_room_images_room ON public.room_images(room_id);
CREATE INDEX idx_room_images_cover ON public.room_images(room_id, is_cover);

-- Indici per items
CREATE INDEX idx_room_items_room ON public.room_items(room_id);
CREATE INDEX idx_room_items_type ON public.room_items(item_type);

-- Indici per features
CREATE INDEX idx_room_features_room ON public.room_features(room_id);
CREATE INDEX idx_room_features_key ON public.room_features(feature_key);

-- Indici per likes e saves
CREATE INDEX idx_room_likes_user ON public.room_likes(user_id);
CREATE INDEX idx_room_likes_room ON public.room_likes(room_id);
CREATE INDEX idx_room_saves_user ON public.room_saves(user_id);
CREATE INDEX idx_room_saves_room ON public.room_saves(room_id);

-- Indici per comments
CREATE INDEX idx_room_comments_room ON public.room_comments(room_id);
CREATE INDEX idx_room_comments_user ON public.room_comments(user_id);
CREATE INDEX idx_room_comments_parent ON public.room_comments(parent_comment_id);

-- Indici per collections
CREATE INDEX idx_collections_user ON public.collections(user_id);
CREATE INDEX idx_collections_public ON public.collections(is_public) WHERE is_public = true;

-- =====================================================
-- FUNZIONI E TRIGGER
-- =====================================================

-- Funzione per aggiornare updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger per rooms
CREATE TRIGGER update_rooms_updated_at
  BEFORE UPDATE ON public.rooms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger per profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger per comments
CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON public.room_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger per collections
CREATE TRIGGER update_collections_updated_at
  BEFORE UPDATE ON public.collections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Funzione per generare slug
CREATE OR REPLACE FUNCTION generate_slug()
RETURNS TRIGGER AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
BEGIN
  base_slug := lower(regexp_replace(NEW.title, '[^a-zA-Z0-9]+', '-', 'g'));
  base_slug := trim(both '-' from base_slug);
  final_slug := base_slug || '-' || substring(NEW.id::text from 1 for 8);
  NEW.slug := final_slug;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger per generare slug
CREATE TRIGGER generate_rooms_slug
  BEFORE INSERT ON public.rooms
  FOR EACH ROW
  WHEN (NEW.slug IS NULL)
  EXECUTE FUNCTION generate_slug();

-- Funzione per aggiornare contatori
CREATE OR REPLACE FUNCTION update_room_counter()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_TABLE_NAME = 'room_likes' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE public.rooms SET like_count = like_count + 1 WHERE id = NEW.room_id;
    ELSIF TG_OP = 'DELETE' THEN
      UPDATE public.rooms SET like_count = like_count - 1 WHERE id = OLD.room_id;
    END IF;
  ELSIF TG_TABLE_NAME = 'room_saves' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE public.rooms SET save_count = save_count + 1 WHERE id = NEW.room_id;
    ELSIF TG_OP = 'DELETE' THEN
      UPDATE public.rooms SET save_count = save_count - 1 WHERE id = OLD.room_id;
    END IF;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger per contatori
CREATE TRIGGER update_room_like_counter
  AFTER INSERT OR DELETE ON public.room_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_room_counter();

CREATE TRIGGER update_room_save_counter
  AFTER INSERT OR DELETE ON public.room_saves
  FOR EACH ROW
  EXECUTE FUNCTION update_room_counter();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Abilita RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_saves ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_rooms ENABLE ROW LEVEL SECURITY;

-- Policy per profiles
CREATE POLICY "Profili pubblici leggibili da tutti"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Utenti possono aggiornare il proprio profilo"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Policy per rooms
CREATE POLICY "Stanze pubblicate visibili a tutti"
  ON public.rooms FOR SELECT
  USING (status = 'published' OR user_id = auth.uid());

CREATE POLICY "Utenti possono inserire stanze"
  ON public.rooms FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Utenti possono modificare le proprie stanze"
  ON public.rooms FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Utenti possono eliminare le proprie stanze"
  ON public.rooms FOR DELETE
  USING (auth.uid() = user_id);

-- Policy per room_images
CREATE POLICY "Immagini di stanze pubblicate visibili a tutti"
  ON public.room_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.rooms 
      WHERE id = room_id 
      AND (status = 'published' OR user_id = auth.uid())
    )
  );

CREATE POLICY "Utenti possono gestire immagini delle proprie stanze"
  ON public.room_images FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.rooms 
      WHERE id = room_id AND user_id = auth.uid()
    )
  );

-- Policy per room_items
CREATE POLICY "Items di stanze pubblicate visibili a tutti"
  ON public.room_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.rooms 
      WHERE id = room_id 
      AND (status = 'published' OR user_id = auth.uid())
    )
  );

CREATE POLICY "Utenti possono gestire items delle proprie stanze"
  ON public.room_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.rooms 
      WHERE id = room_id AND user_id = auth.uid()
    )
  );

-- Policy per room_features
CREATE POLICY "Features di stanze pubblicate visibili a tutti"
  ON public.room_features FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.rooms 
      WHERE id = room_id 
      AND (status = 'published' OR user_id = auth.uid())
    )
  );

CREATE POLICY "Utenti possono gestire features delle proprie stanze"
  ON public.room_features FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.rooms 
      WHERE id = room_id AND user_id = auth.uid()
    )
  );

-- Policy per likes
CREATE POLICY "Utenti autenticati possono vedere tutti i like"
  ON public.room_likes FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Utenti possono gestire i propri like"
  ON public.room_likes FOR ALL
  USING (auth.uid() = user_id);

-- Policy per saves
CREATE POLICY "Utenti possono vedere i propri salvataggi"
  ON public.room_saves FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Utenti possono gestire i propri salvataggi"
  ON public.room_saves FOR ALL
  USING (auth.uid() = user_id);

-- Policy per comments
CREATE POLICY "Commenti di stanze pubblicate visibili a tutti"
  ON public.room_comments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.rooms 
      WHERE id = room_id AND status = 'published'
    )
  );

CREATE POLICY "Utenti autenticati possono commentare"
  ON public.room_comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Utenti possono modificare i propri commenti"
  ON public.room_comments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Utenti possono eliminare i propri commenti"
  ON public.room_comments FOR DELETE
  USING (auth.uid() = user_id);

-- Policy per collections
CREATE POLICY "Collezioni pubbliche visibili a tutti"
  ON public.collections FOR SELECT
  USING (is_public = true OR user_id = auth.uid());

CREATE POLICY "Utenti possono gestire le proprie collezioni"
  ON public.collections FOR ALL
  USING (auth.uid() = user_id);

-- Policy per collection_rooms
CREATE POLICY "Items di collezioni pubbliche visibili a tutti"
  ON public.collection_rooms FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.collections 
      WHERE id = collection_id 
      AND (is_public = true OR user_id = auth.uid())
    )
  );

CREATE POLICY "Utenti possono gestire items delle proprie collezioni"
  ON public.collection_rooms FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.collections 
      WHERE id = collection_id AND user_id = auth.uid()
    )
  );

-- =====================================================
-- FUNZIONI DI UTILITÀ
-- =====================================================

-- Funzione per ricerca stanze
CREATE OR REPLACE FUNCTION search_rooms(
  search_query TEXT DEFAULT NULL,
  room_types TEXT[] DEFAULT NULL,
  design_styles TEXT[] DEFAULT NULL,
  min_sqm DECIMAL DEFAULT NULL,
  max_sqm DECIMAL DEFAULT NULL,
  search_tags TEXT[] DEFAULT NULL
)
RETURNS SETOF public.rooms AS $$
BEGIN
  RETURN QUERY
  SELECT r.*
  FROM public.rooms r
  WHERE r.status = 'published'
    AND (search_query IS NULL OR 
         to_tsvector('italian', r.title || ' ' || COALESCE(r.description, '')) 
         @@ plainto_tsquery('italian', search_query))
    AND (room_types IS NULL OR r.room_type = ANY(room_types))
    AND (design_styles IS NULL OR r.design_style = ANY(design_styles))
    AND (min_sqm IS NULL OR r.sqm >= min_sqm)
    AND (max_sqm IS NULL OR r.sqm <= max_sqm)
    AND (search_tags IS NULL OR r.tags && search_tags)
  ORDER BY r.is_featured DESC, r.published_at DESC;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- COMMENTI
-- =====================================================

COMMENT ON TABLE public.rooms IS 'Stanze caricate dagli utenti con foto e caratteristiche';
COMMENT ON TABLE public.room_images IS 'Galleria immagini delle stanze';
COMMENT ON TABLE public.room_items IS 'Mobili ed elementi presenti nella stanza';
COMMENT ON TABLE public.room_features IS 'Caratteristiche personalizzate delle stanze';
COMMENT ON TABLE public.room_likes IS 'Like degli utenti alle stanze';
COMMENT ON TABLE public.room_saves IS 'Stanze salvate dagli utenti';
COMMENT ON TABLE public.collections IS 'Collezioni/mood boards degli utenti';
