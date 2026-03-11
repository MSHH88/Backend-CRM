#!/usr/bin/env python3
import requests, json, csv, os, time, re
from copy import deepcopy
from bs4 import BeautifulSoup

BASE_URL  = "https://confde.fenstermaxx24.com"
API_URL   = f"{BASE_URL}/confapp/Holz-Haustuer-bestellen/ajax/berechnen/"
OUT_DIR   = "/home/ubuntu/holz_haustuer"
CSV_DIR   = f"{OUT_DIR}/csv"
JSON_DIR  = f"{OUT_DIR}/json"
HTML_DIR  = f"{OUT_DIR}/html"
os.makedirs(CSV_DIR, exist_ok=True)
os.makedirs(JSON_DIR, exist_ok=True)
os.makedirs(HTML_DIR, exist_ok=True)

BASE_CONFIG = {
    "faktor_profil": "1.22",
    "rabattprozent": "40",
    "mwst": "1.2",
    "profil": "kiefer",
    "typ": "nt_1",
    "breite": 800,
    "breite_nt": 800,
    "breite_ol": 800,
    "breite_sl": 0,
    "breite_sr": 0,
    "hoehe": 1900,
    "hoehe_nt": 1900,
    "hoehe_ol": 0,
    "oer": "oer_dli",
    "model": "m1",
    "slrol": "fn_1_fest_ohne_fluegel",
    "dekofarbe_rubrik": "fr3",
    "dekofarbe_textur": "",
    "dekofarbe_a": "fr3_ho01",
    "dekofarbe_i": "fr3_ho01_i",
    "sif": "sif1",
    "glas": "g1",
    "schallschutz": "schallschutz_nein",
    "schallschutz_db": "schallschutz_stufe01",
    "sicherheitsverglasung": "sicherheitsverglasung_0",
    "sicherheitsverglasung_typ": "verglasung_typ_2_1",
    "ornament": "ornament_0",
    "ornament_typ": "ornament_typ_1",
    "verriegelung": "v2",
    "zs": "zs1",
    "hbs": "hbs0",
    "zks": "zks_0",
    "zks_art": "",
    "elektro": "elektro_0",
    "elektro_art": "",
    "tb": "tb_1",
    "ts": "ts_0",
    "ts_art": "ts_art_1",
    "griff_kombi": "gk_1",
    "griff_a": "dd_a_1",
    "griff_i": "dd_i_1",
    "ka": "ka0",
    "fsk": "fsk_0",
    "fsk_art": "fsk_art_1",
    "fensterfalzluefter": "fensterfalzluefter_0",
    "fensterfalzluefter_art": "fensterfalzluefter_art_3",
    "rahmenverbreiterung": "rahmenverbreiterung_0",
    "unten": "unten_0",
    "links": "links_0",
    "rechts": "rechts_0",
    "oben": "oben_0",
    "basket_img": "/confapp/Holz-Haustuer-bestellen/images/nt/m1.jpg",
    "farbe_innen": "Weiss (deckend)",
    "farbe_aussen": "Weiss (deckend)"
}

HEADERS = {
    "Referer": f"{BASE_URL}/confapp/Holz-Haustuer-bestellen/",
    "Origin": BASE_URL,
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest"
}

session = requests.Session()
session.get(f"{BASE_URL}/confapp/Holz-Haustuer-bestellen/", headers=HEADERS)

def call_api(config):
    try:
        resp = session.post(API_URL, data={'csrf_cyko': '', 'tmp_obj': json.dumps(config)},
                            headers=HEADERS, timeout=15)
        return resp.text if resp.status_code == 200 else None
    except Exception as e:
        print(f"  EXCEPTION: {e}")
        return None

def parse_german_price(s):
    s = s.strip()
    if ',' in s:
        s = s.replace('.', '').replace(',', '.')
    return float(s)

def parse_prices(html):
    if not html: return {}
    prices = {}
    soup = BeautifulSoup(html, 'html.parser')
    stroke = soup.find(id='topStrokePrice')
    if stroke:
        m = re.search(r'([\d][\d\.]*[,\.]\d+)\s*EUR', stroke.text)
        if m:
            try: prices['preisempfehlung'] = parse_german_price(m.group(1))
            except: pass
    for h2 in soup.find_all('h2'):
        m = re.search(r'([\d][\d\.]*[,\.]\d+)\s*EUR', h2.text)
        if m:
            try:
                prices['angebotspreis'] = parse_german_price(m.group(1))
                break
            except: pass
    return prices

# Profiles
PROFILES = {'kiefer': 'SOFTLINE 68mm Kiefer', 'meranti': 'SOFTLINE 68mm Meranti'}

# Dimensions (Width: 800-1200, Height: 1900-2300)
WIDTHS = [800, 900, 1000, 1100, 1200]
HEIGHTS = [1900, 2000, 2100, 2200, 2300]

all_matrix_rows = []
price_matrix = {}

print("EXTRACTING DIMENSION MATRIX")
for pid, pname in PROFILES.items():
    print(f"--- {pname} ({pid}) ---")
    price_matrix[pid] = {}
    for w in WIDTHS:
        price_matrix[pid][w] = {}
        for h in HEIGHTS:
            config = deepcopy(BASE_CONFIG)
            config['profil'] = pid
            config['breite'] = w
            config['breite_nt'] = w
            config['breite_ol'] = w
            config['hoehe'] = h
            config['hoehe_nt'] = h
            html = call_api(config)
            prices = parse_prices(html)
            ap = prices.get('angebotspreis')
            ep = prices.get('preisempfehlung', 0)
            if ap:
                price_matrix[pid][w][h] = ap
                print(f"  {pid} {w}x{h}: Angebot={ap}, Empfehlung={ep}")
                all_matrix_rows.append({
                    'profil_id': pid, 'profil_name': pname,
                    'breite_mm': w, 'hoehe_mm': h,
                    'angebotspreis_eur': ap, 'preisempfehlung_eur': ep
                })
            time.sleep(0.1)

# Surcharges
surcharges = {}
def test_option(category, config_key, options_dict, base_config=None):
    if base_config is None: base_config = deepcopy(BASE_CONFIG)
    print(f"--- {category} ---")
    surcharges[category] = {}
    base_ap = parse_prices(call_api(base_config)).get('angebotspreis')
    for opt_key, opt_label in options_dict.items():
        config = deepcopy(base_config)
        config[config_key] = opt_key
        ap = parse_prices(call_api(config)).get('angebotspreis')
        if ap and base_ap:
            diff = round(ap - base_ap, 2)
            surcharges[category][opt_key] = {'label': opt_label, 'surcharge': diff}
            print(f"  {opt_label}: {ap} EUR ({'+' if diff>=0 else ''}{diff} EUR)")
        time.sleep(0.1)

test_option("Modell", "model", {f"m{i}": f"Modell {i}" for i in range(1, 24)})
test_option("Öffnungsrichtung", "oer", {
    "oer_dli": "Drehrichtung Links Innen", "oer_dri": "Drehrichtung Rechts Innen",
    "oer_dla": "Drehrichtung Links Außen", "oer_dra": "Drehrichtung Rechts Außen"
})
test_option("Verriegelung", "verriegelung", {
    "v2": "1 Schloss - ohne Getriebe", "v1": "3-fach Verriegelung", "v3": "5-fach Verriegelung"
})
test_option("Schloss", "zs", {
    "zs1": "PZ-Hauptschloss (Standard)", "zs2": "PZ-Hauptschloss (Klasse C)"
})
test_option("Hinterbandsicherung", "hbs", {"hbs0": "Nein", "hbs1": "Ja"})
test_option("Zusatzschloss", "zks", {"zks_0": "Nein", "zks_1": "Ja"})
test_option("Elektroöffner", "elektro", {"elektro_0": "Nein", "elektro_1": "Ja"})
test_option("Türschließer", "ts", {"ts_0": "Nein", "ts_1": "Ja"})
test_option("Füllungsstruktur", "fsk", {"fsk_0": "Nein", "fsk_1": "Ja"})

# Save files
with open(f"{CSV_DIR}/holz_haustuer_alle_profile_preismatrix.csv", 'w', newline='') as f:
    if all_matrix_rows:
        w = csv.DictWriter(f, fieldnames=all_matrix_rows[0].keys())
        w.writeheader(); w.writerows(all_matrix_rows)

with open(f"{JSON_DIR}/holz_haustuer_complete_data.json", 'w') as f:
    json.dump({'price_matrix': price_matrix, 'surcharges': surcharges}, f, indent=2)

print("EXTRACTION COMPLETE")
