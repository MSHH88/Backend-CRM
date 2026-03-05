-- =============================================================================
-- FenTuRo Konfigurator Engine – Database Schema
-- =============================================================================

-- ── Base prices (Grundpreise) ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS fenster_base_prices (
    id              SERIAL PRIMARY KEY,
    manufacturer_id VARCHAR(10)    NOT NULL DEFAULT 'h1',
    profile_id      VARCHAR(10)    NOT NULL DEFAULT 'p1',
    width_mm        INTEGER        NOT NULL CHECK (width_mm  BETWEEN 400 AND 2400),
    height_mm       INTEGER        NOT NULL CHECK (height_mm BETWEEN 400 AND 2400),
    price           NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    created_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    UNIQUE (manufacturer_id, profile_id, width_mm, height_mm)
);

CREATE INDEX IF NOT EXISTS idx_base_prices_lookup
    ON fenster_base_prices (manufacturer_id, profile_id, width_mm, height_mm);

-- ── Profile multipliers ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profile_multipliers (
    id           SERIAL PRIMARY KEY,
    profile_id   VARCHAR(10)    NOT NULL UNIQUE,
    profile_name VARCHAR(100)   NOT NULL,
    multiplier   NUMERIC(8, 4)  NOT NULL CHECK (multiplier > 0),
    created_at   TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

INSERT INTO profile_multipliers (profile_id, profile_name, multiplier) VALUES
    ('p1', 'Iglo 5 Classic',      1.0000),
    ('p2', 'Iglo 5',              1.0000),
    ('p3', 'Iglo Energy Classic', 1.2601),
    ('p4', 'Iglo Energy',         1.2601),
    ('p5', 'Iglo Light',          0.9532),
    ('p7', 'Iglo EXT',            1.2886)
ON CONFLICT (profile_id) DO UPDATE
    SET profile_name = EXCLUDED.profile_name,
        multiplier   = EXCLUDED.multiplier;

-- ── Surcharges ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS surcharges (
    id          SERIAL PRIMARY KEY,
    category    VARCHAR(50)    NOT NULL,
    option_id   VARCHAR(20)    NOT NULL,
    name        VARCHAR(150)   NOT NULL,
    amount      NUMERIC(10, 2) NOT NULL,
    sort_order  INTEGER        NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    UNIQUE (category, option_id)
);

CREATE INDEX IF NOT EXISTS idx_surcharges_lookup
    ON surcharges (category, option_id);

-- ── Configuration options (meta) ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS config_options (
    id           SERIAL PRIMARY KEY,
    category     VARCHAR(50)  NOT NULL,
    option_id    VARCHAR(20)  NOT NULL,
    label        VARCHAR(150) NOT NULL,
    description  TEXT,
    is_active    BOOLEAN      NOT NULL DEFAULT TRUE,
    sort_order   INTEGER      NOT NULL DEFAULT 0,
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    UNIQUE (category, option_id)
);

CREATE INDEX IF NOT EXISTS idx_config_options_category
    ON config_options (category);

-- ── Cart items (Warenkorb) ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cart_items (
    id                SERIAL PRIMARY KEY,
    session_id        VARCHAR(128)   NOT NULL,
    produkt_name      VARCHAR(200)   NOT NULL,
    dimensionen       VARCHAR(50)    NOT NULL,
    konfiguration     JSONB          NOT NULL DEFAULT '{}',
    grundpreis        NUMERIC(10, 2) NOT NULL,
    profile_multiplier NUMERIC(8, 4) NOT NULL,
    profile_adjusted  NUMERIC(10, 2) NOT NULL,
    surcharges_total  NUMERIC(10, 2) NOT NULL,
    surcharge_items   JSONB          NOT NULL DEFAULT '[]',
    preisempfehlung   NUMERIC(10, 2) NOT NULL,
    ersparnis         NUMERIC(10, 2) NOT NULL,
    angebotspreis     NUMERIC(10, 2) NOT NULL,
    quantity          INTEGER        NOT NULL DEFAULT 1 CHECK (quantity > 0),
    created_at        TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cart_items_session
    ON cart_items (session_id);

CREATE INDEX IF NOT EXISTS idx_cart_items_created
    ON cart_items (created_at);
