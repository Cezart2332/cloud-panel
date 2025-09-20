#!/usr/bin/env node
/*
Bulk upload images from src/assets to Cloudinary.
Usage: ensure .env has CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
Run: pnpm run upload:assets
*/
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
// also load root .env
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });
dotenv.config();

const ASSETS_DIR = path.resolve(__dirname, '..', 'src', 'assets');

function validateEnv() {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    console.error('Missing Cloudinary environment variables. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
    process.exit(1);
  }
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
}

function listImageFiles(dir) {
  const exts = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => exts.has(path.extname(f).toLowerCase()))
    .map((f) => path.join(dir, f));
}

async function uploadFile(filePath) {
  const publicId = `assets/${path.basename(filePath, path.extname(filePath))}`;
  try {
    const res = await cloudinary.uploader.upload(filePath, {
      folder: 'assets',
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      resource_type: 'image',
      public_id: publicId,
    });
    return { ok: true, url: res.secure_url, public_id: res.public_id };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function main() {
  validateEnv();
  console.log(`Scanning directory: ${ASSETS_DIR}`);
  const files = listImageFiles(ASSETS_DIR);
  if (files.length === 0) {
    console.log('No images found in src/assets');
    return;
  }
  console.log(`Found ${files.length} file(s). Starting upload...`);
  let success = 0;
  let fail = 0;
  for (const file of files) {
    process.stdout.write(`Uploading ${path.basename(file)} ... `);
    const result = await uploadFile(file);
    if (result.ok) {
      success++;
      console.log('done');
      console.log(`  -> ${result.url}`);
    } else {
      fail++;
      console.log('failed');
      console.error(`  !! ${result.error}`);
    }
  }
  console.log(`\nUpload complete. Success: ${success}, Failed: ${fail}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});