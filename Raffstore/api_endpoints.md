# Raffstore API Endpoints and Payloads

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
  "images_path": "/confapp/Raffstore-bestellen/images",
  "breite": 1000,
  "hoehe": 1000,
  "mass_txt": "IhreSonderwnsche",
  "hersteller": "h1",
  "typ": "typ2",
  "modell": "modell_3",
  "rev": "rev_1",
  "lam": "lam_1",
  "fs": "fs_1",
  "apl": "apl_1",
  "kd": "kd_1",
  "fkf": "fs1_01",
  "fe": "fs1_01_i",
  "ada": "ada_1",
  "aa": "aa_1",
  "as": "as_0",
  "wss": "wss_0",
  "wss_typ": "wss_typ1",
  "st": "st_0",
  "st_typ": "st_typ1",
  "fst": "fst_0",
  "fst_typ": "fst_typ1",
  "basket_img": "/confapp/Raffstore-bestellen/images/typ1fs1_01-fs1_01_i.jpg"
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
