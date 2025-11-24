#!/usr/bin/env node

/**
 * Export PNG for social media
 *
 * Usage: node export-png.js <html-file> [output-name]
 *
 * Exports the flyer container as a clean PNG with exact dimensions
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function exportPNG(htmlFile, outputName) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const absolutePath = path.resolve(htmlFile);

    if (!fs.existsSync(absolutePath)) {
        console.error(`❌ File not found: ${absolutePath}`);
        process.exit(1);
    }

    console.log(`📄 Loading: ${path.basename(htmlFile)}`);

    await page.goto(`file://${absolutePath}`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Extra time for fonts

    // Find the flyer container
    const container = await page.locator('#flyer-container');

    if (!container) {
        console.error('❌ No flyer container found');
        await browser.close();
        process.exit(1);
    }

    // Get container info
    const box = await container.boundingBox();

    console.log(`📐 Dimensions: ${Math.round(box.width)}×${Math.round(box.height)}px`);

    // Generate output filename
    const defaultName = path.basename(htmlFile, '.html') + '.png';
    const outputPath = path.resolve(outputName || defaultName);

    // Take screenshot of just the container
    await container.screenshot({
        path: outputPath
    });

    console.log(`✅ PNG exported: ${path.basename(outputPath)}`);
    console.log(`   Path: ${outputPath}`);
    console.log(`   Size: ${Math.round(box.width)}×${Math.round(box.height)}px`);

    await browser.close();

    return outputPath;
}

// CLI usage
if (require.main === module) {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log('Usage: node export-png.js <html-file> [output-name]');
        console.log('');
        console.log('Examples:');
        console.log('  node export-png.js facebook-post-three-cups.html');
        console.log('  node export-png.js my-design.html my-flyer.png');
        process.exit(1);
    }

    const [htmlFile, outputName] = args;

    exportPNG(htmlFile, outputName)
        .then(() => {
            console.log('✨ Done!');
            process.exit(0);
        })
        .catch(error => {
            console.error('❌ Error:', error.message);
            process.exit(1);
        });
}

module.exports = { exportPNG };
