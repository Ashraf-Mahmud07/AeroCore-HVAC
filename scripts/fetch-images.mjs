/**
 * Downloads the site's stand-in photography from Wikimedia Commons and writes
 * the attribution file that ships beside it.
 *
 * Every entry below was picked by hand for subject relevance and for a licence
 * that permits commercial reuse (public domain, CC0, CC BY or CC BY-SA). Swap
 * any `commonsFile` for the client's own photograph — or replace the JPEG in
 * `public/images/` directly — and nothing else in the app changes.
 *
 * Run with `npm run images:fetch`.
 *
 * NOTE: customer headshots are deliberately absent. Attaching a real,
 * identifiable person to a testimonial they did not give would misrepresent
 * them, so `testimonial-*.png` stay as generated blueprint plates until the
 * client supplies signed-off portraits.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { get as httpsGet } from 'node:https';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'public', 'images');
/* Wikimedia's API etiquette requires a descriptive agent with a contact route. */
const USER_AGENT =
  'AeroCoreHVAC-SiteBuild/1.0 (https://www.aerocorehvac.com; service@aerocorehvac.com)';
const THROTTLE_MS = 1500;

/** slot name → Commons file, requested width, and what the slot depicts. */
const ASSETS = [
  {
    name: 'hero-technician',
    width: 1400,
    commonsFile: '379th ECES HVAC technicians combat rising temperatures (8502258).jpg',
    depicts: 'Technician servicing a rooftop air-conditioning unit',
  },
  {
    name: 'hero-rooftop-array',
    width: 1600,
    commonsFile: 'Rooftop Packaged Units.JPG',
    depicts: 'Rooftop packaged air-conditioning array on a commercial building',
  },
  {
    name: 'hero-technician-gauge',
    width: 1200,
    commonsFile:
      '379 ELRS vehicle maintenance introduces innovative nitrogen gas testing method for air conditioning systems (9469861).jpg',
    depicts: 'Technician taking instrument readings on a cooling system',
  },
  {
    name: 'why-choose-us-team',
    width: 1400,
    commonsFile: 'HVAC Technicians Power Mission Success (8850030).jpg',
    depicts: 'Technicians working together on mechanical plant',
  },
  {
    name: 'project-mission-district-triplex',
    width: 1200,
    commonsFile: 'Mitsubishi Heavy Industries aircon indoor unit FDKN208C.jpg',
    depicts: 'Ductless mini-split indoor head mounted on a wall',
  },
  {
    name: 'project-soma-creative-office',
    width: 1200,
    commonsFile: 'Chiller in a large commercial building, Brisbane.jpg',
    depicts: 'Commercial chiller plant serving an office building',
  },
  {
    name: 'project-noe-valley-victorian',
    width: 1200,
    commonsFile: 'Systemair.jpg',
    depicts: 'Air-handling unit in a clean mechanical room',
  },
  {
    name: 'project-peninsula-medical-suite',
    width: 1200,
    commonsFile: 'South Campus Chiller Plant.jpg',
    depicts: 'Redundant packaged plant serving a facility',
  },
  {
    name: 'project-berkeley-bungalow',
    width: 1200,
    commonsFile: 'Outdoor air conditioner unit installed in residential garden space.jpg',
    depicts: 'Outdoor condensing unit beside a home',
  },
  {
    name: 'project-oakland-warehouse',
    width: 1400,
    commonsFile:
      'Interior view of the first floor, facing southwest, and showing elements of the cold storage refrigeration system attached to the ceiling. - Armour and Company Building, 100 HABS RI,4-PROV,198-14.tif',
    depicts: 'High-bay warehouse interior with overhead mechanical services',
  },
  {
    name: 'before-attic-retrofit',
    width: 1600,
    commonsFile: 'Virginia V (ship, 1922) engine hold 01 - furnace & pipes under boiler.jpg',
    depicts: 'Aged furnace and tangled pipework — the "before" state',
  },
  {
    name: 'after-attic-retrofit',
    width: 1600,
    commonsFile: 'EFTA00000252 - Utility room housing a boiler pipes and HVAC components.jpg',
    depicts: 'Tidy modern plant room — the "after" state',
  },
  {
    name: 'blog-seer2-rating',
    width: 1600,
    commonsFile: 'Ecobee4.jpg',
    depicts: 'Smart thermostat showing an efficiency readout',
  },
  {
    name: 'blog-filter-check',
    width: 640,
    commonsFile: 'HVAC air filter.webp',
    depicts: 'Pleated HVAC air filter',
  },
  {
    name: 'blog-cold-weather-heat-pumps',
    width: 640,
    commonsFile: 'Ecodan outdoor unit in the snow.jpg',
    depicts: 'Outdoor heat pump running in snow',
  },
  {
    name: 'blog-repair-or-replace',
    width: 640,
    commonsFile: '379th ECES HVAC technicians combat rising temperatures (8502255).jpg',
    depicts: 'Technician diagnosing an outdoor unit',
  },
  {
    name: 'og-aerocore-hvac',
    width: 1200,
    commonsFile: 'HVAC Technicians Power Mission Success (8850027).jpg',
    depicts: 'Share-card image: technicians at work on mechanical plant',
  },
];

function fetchUrl(url, { binary = false } = {}) {
  return new Promise((resolvePromise, reject) => {
    httpsGet(url, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        resolvePromise(fetchUrl(res.headers.location, { binary }));
        return;
      }
      if (res.statusCode !== 200) {
        res.resume();
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolvePromise(binary ? buffer : buffer.toString('utf8'));
      });
    }).on('error', reject);
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Wikimedia throttles bursts aggressively; back off and retry rather than fail. */
async function fetchWithRetry(url, options, attempts = 6) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await fetchUrl(url, options);
    } catch (error) {
      const retryable = /HTTP (429|5\d\d)/.test(String(error.message));
      if (!retryable || attempt === attempts) throw error;
      const wait = 3000 * 2 ** (attempt - 1);
      console.log(`    retrying in ${wait / 1000}s (${error.message})`);
      await sleep(wait);
    }
  }
  throw new Error('unreachable');
}

function stripHtml(value) {
  return String(value ?? '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function describe(commonsFile, width) {
  const url =
    'https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo' +
    `&titles=${encodeURIComponent(`File:${commonsFile}`)}` +
    `&iiprop=url|size|extmetadata&iiurlwidth=${width}`;

  const page = Object.values(JSON.parse(await fetchWithRetry(url, {})).query.pages)[0];
  const info = page?.imageinfo?.[0];
  if (!info) throw new Error(`No image info for ${commonsFile}`);

  const meta = info.extmetadata ?? {};
  return {
    thumbUrl: info.thumburl ?? info.url,
    thumbWidth: info.thumbwidth ?? info.width,
    thumbHeight: info.thumbheight ?? info.height,
    descriptionUrl: info.descriptionurl,
    license: stripHtml(meta.LicenseShortName?.value) || 'See source page',
    licenseUrl: stripHtml(meta.LicenseUrl?.value),
    author: stripHtml(meta.Artist?.value) || 'Unknown',
    credit: stripHtml(meta.Credit?.value),
  };
}

mkdirSync(OUT_DIR, { recursive: true });

const credits = [];

for (const asset of ASSETS) {
  await sleep(THROTTLE_MS);
  const info = await describe(asset.commonsFile, asset.width);
  const extension = info.thumbUrl.toLowerCase().endsWith('.png') ? 'png' : 'jpg';
  const fileName = `${asset.name}.${extension}`;

  await sleep(THROTTLE_MS);
  const bytes = await fetchWithRetry(info.thumbUrl, { binary: true });
  writeFileSync(join(OUT_DIR, fileName), bytes);

  credits.push({ ...asset, ...info, fileName, bytes: bytes.length });
  console.log(
    `  ${fileName}  ${info.thumbWidth}x${info.thumbHeight}  ${(bytes.length / 1024).toFixed(0)} kB  ${info.license}`,
  );
}

const lines = [
  '# Image credits',
  '',
  'Every photograph in `public/images/` is a licensed stand-in sourced from',
  'Wikimedia Commons by `scripts/fetch-images.mjs`. Replace them with AeroCore’s',
  'own photography before launch — keep the same file names and nothing else',
  'needs to change.',
  '',
  'Files with a CC BY or CC BY-SA licence **must** keep an attribution visible',
  'to users (a credits page or an image caption) for as long as they are in use.',
  'Public-domain and CC0 files carry no such obligation.',
  '',
  '| File | Depicts | Author | Licence | Source |',
  '| --- | --- | --- | --- | --- |',
  ...credits.map(
    (c) =>
      `| \`${c.fileName}\` | ${c.depicts} | ${c.author} | ${c.license} | [Commons](${c.descriptionUrl}) |`,
  ),
  '',
  '## Testimonial portraits',
  '',
  '`testimonial-*.png` are generated blueprint plates, not photographs. A real,',
  'identifiable person must never be shown beside a testimonial they did not',
  'give — supply signed-off customer portraits before replacing them.',
  '',
];

writeFileSync(join(OUT_DIR, 'CREDITS.md'), `${lines.join('\n')}`, 'utf8');
console.log(`\nWrote public/images/CREDITS.md (${credits.length} entries).`);
