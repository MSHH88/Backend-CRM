# Gealan Schiebetür API Endpoints and Payloads

## 1. Price Calculation (Berechnen)
This endpoint is called every time a configuration option changes to get the updated price and sidebar HTML.

- **URL:** `https://confde.fenstermaxx24.com/confapp/ajax/berechnen/`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/x-www-form-urlencoded`
  - `X-Requested-With: XMLHttpRequest`
- **Payload:**
  - `csrf_cyko`: `[CSRF_TOKEN]`
  - `tmp_obj`: `JSON.stringify(obj_konfig)`

### Example `obj_konfig` Payload:
```json
{
  "images_path": "/confapp/Gealan/PVC-Schiebetuer-bestellen-gealan/images",
  "breite": 1550,
  "hoehe": 800,
  "mass_txt": "",
  "hersteller": "h7",
  "profil": "p1",
  "typ": "typ1",
  "pvc2_ss": "pvc2_ss_sl",
  "farbe_a": "fs1_01",
  "farbe_i": "fs1_01_i",
  "dfa": "dfa_1",
  "dfi": "dfi_1",
  "kf": "kf_0",
  "glas": "g1",
  "schallschutz": "schallschutz_nein",
  "sicherheitsverglasung": "sicherheitsverglasung_0",
  "ornament": "ornament_0",
  "drv": "drv_0",
  "sprossen": "sprossen_nein",
  "rollladen": "rollladen_nein",
  "zusatz": "zusatz_nein",
  "basket_img": "/confapp/Gealan/PVC-Schiebetuer-bestellen-gealan/images/h7/profil/p1_typ1_pvc2_ss_sl_fs1_01_fs1_01_i.jpg"
}
```

## 2. Min/Max Limits (MinMax)
This endpoint is called to get the allowed dimension ranges for the current configuration.

- **URL:** `https://confde.fenstermaxx24.com/confapp/ajax/minmax/`
- **Method:** `POST`
- **Payload:**
  - `csrf_cyko`: `[CSRF_TOKEN]`
  - `conf_obj`: `JSON.stringify(obj_konfig)`
  - `flag`: `main`

## 3. Add to Cart (AddWarenkorb)
This endpoint is called when the user clicks "In den Warenkorb legen".

- **URL:** `https://confde.fenstermaxx24.com/confapp/ajax/addWarenkorb/`
- **Method:** `POST`
- **Payload:**
  - `csrf_cyko`: `[CSRF_TOKEN]`
  - `bereich`: `true`
  - `wk`: `true`
  - `img`: `[BASKET_IMAGE_PATH]`
