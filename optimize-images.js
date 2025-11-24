const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Images used in presentation-complete-v2.html with their paths
const imagesToOptimize = [
    'presentation-slides/public/pictures/SINI Buildings, with Elephants.jpg',
    'presentation-slides/public/pictures/sacred place.jpg',
    'presentation-slides/public/pictures/sacred person.JPG',
    'presentation-slides/public/pictures/sacred object.jpg',
    'presentation-slides/public/pictures/SINI front view.jpg',
    'presentation-slides/public/pictures/monks in SINI campus.jpg',
    'presentation-slides/public/pictures/monks studying (1).jpg',
    'presentation-slides/public/pictures/monks studying.JPG',
    'presentation-slides/public/pictures/EDP students in library.jpg',
    'presentation-slides/public/pictures/EDP student looking at tibetan manuals.jpg',
    'presentation-slides/public/pictures/EDP students in classroom.jpg',
    'presentation-slides/public/pictures/Gandharan art (broken).png',
    'presentation-slides/public/pictures/Gandharan art (fixed digitally).png',
    'presentation-slides/public/pictures/SWAYAMBHU picture.png',
    'presentation-slides/public/pictures/Tarthang Rinpoche2.jpg',
    'presentation-slides/public/pictures/Yab Yum.jpg',
    'presentation-slides/public/pictures/Earth from Space.jpg',
    'presentation-slides/public/pictures/Varanasi.jpg',
    'presentation-slides/public/pictures/bird eye view of Swayambhu.png',
    'pictures/Monk looking at screen.jpeg',
    'presentation-slides/public/illustrations/u4174158496_Small_remote_tibetan_monastery_library_with_compute_77d83f2e-1e1e-4b2a-b536-c48d1d6aa4b8.png',
    'presentation-slides/public/illustrations/mountains-sacred-1.webp',
    'presentation-slides/public/illustrations/monastery-mountain.webp'
];

async function optimizeImage(imagePath) {
    try {
        const fullPath = path.join(__dirname, imagePath);

        if (!fs.existsSync(fullPath)) {
            console.log(`⚠️  Skipping ${imagePath} - file not found`);
            return;
        }

        const stats = fs.statSync(fullPath);
        const originalSize = (stats.size / 1024 / 1024).toFixed(2);

        // Skip if already small
        if (stats.size < 200 * 1024) {
            console.log(`✓ Skipping ${imagePath} - already small (${originalSize}MB)`);
            return;
        }

        const ext = path.extname(imagePath).toLowerCase();
        const image = sharp(fullPath);
        const metadata = await image.metadata();

        // Create backup
        const backupPath = fullPath.replace(/(\.[^.]+)$/, '.backup$1');
        if (!fs.existsSync(backupPath)) {
            fs.copyFileSync(fullPath, backupPath);
        }

        // Resize if too large, max 2000px on longest side
        const maxDimension = 2000;
        let resizeOptions = null;
        if (metadata.width > maxDimension || metadata.height > maxDimension) {
            if (metadata.width > metadata.height) {
                resizeOptions = { width: maxDimension };
            } else {
                resizeOptions = { height: maxDimension };
            }
        }

        // Optimize based on format
        let optimized = image;

        if (resizeOptions) {
            optimized = optimized.resize(resizeOptions);
        }

        if (ext === '.jpg' || ext === '.jpeg') {
            // Quality 88 for JPEGs - good balance
            await optimized.jpeg({ quality: 88, progressive: true }).toFile(fullPath + '.tmp');
        } else if (ext === '.png') {
            // compressionLevel 8 for PNGs - good compression
            await optimized.png({ compressionLevel: 8, progressive: true }).toFile(fullPath + '.tmp');
        } else if (ext === '.webp') {
            // Quality 90 for WebP
            await optimized.webp({ quality: 90 }).toFile(fullPath + '.tmp');
        } else {
            console.log(`⚠️  Skipping ${imagePath} - unsupported format`);
            return;
        }

        // Check new size
        const newStats = fs.statSync(fullPath + '.tmp');
        const newSize = (newStats.size / 1024 / 1024).toFixed(2);
        const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1);

        // Only replace if significantly smaller
        if (newStats.size < stats.size * 0.95) {
            fs.renameSync(fullPath + '.tmp', fullPath);
            console.log(`✓ Optimized ${imagePath}: ${originalSize}MB → ${newSize}MB (${reduction}% reduction)`);
        } else {
            fs.unlinkSync(fullPath + '.tmp');
            console.log(`✓ Kept original ${imagePath} - optimization not beneficial (${originalSize}MB)`);
        }

    } catch (error) {
        console.error(`✗ Error optimizing ${imagePath}:`, error.message);
    }
}

async function optimizeAll() {
    console.log('🖼️  Starting image optimization (conservative settings)...\n');

    for (const imagePath of imagesToOptimize) {
        await optimizeImage(imagePath);
    }

    console.log('\n✅ Image optimization complete!');
}

optimizeAll();
