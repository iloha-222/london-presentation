#!/usr/bin/env node

/**
 * Screenshot Design Tool
 *
 * Usage: node screenshot-design.js <html-file> [output-name]
 *
 * This script takes a screenshot of an HTML design file so Claude can see what it created.
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function screenshotDesign(htmlFile, outputName) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Get absolute path
    const absolutePath = path.resolve(htmlFile);

    if (!fs.existsSync(absolutePath)) {
        console.error(`❌ File not found: ${absolutePath}`);
        process.exit(1);
    }

    console.log(`📄 Loading: ${path.basename(htmlFile)}`);

    // Load the HTML file
    await page.goto(`file://${absolutePath}`);

    // Wait for fonts and images to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500); // Extra time for web fonts

    // Hide debug elements before measuring
    await page.evaluate(() => {
        const debugElements = document.querySelectorAll('.debug-grid, .debug-info');
        debugElements.forEach(el => el.style.display = 'none');
    });

    // Find the main container with exact dimensions
    const containerInfo = await page.evaluate(() => {
        // Look for the flyer container specifically
        const container = document.getElementById('flyer-container');

        if (container) {
            const style = window.getComputedStyle(container);
            const width = parseInt(style.width);
            const height = parseInt(style.height);

            return {
                width,
                height,
                scrollWidth: container.scrollWidth,
                scrollHeight: container.scrollHeight,
                hasOverflow: container.scrollWidth > width || container.scrollHeight > height
            };
        }

        // Fallback: look for elements with specific widths
        const containers = document.querySelectorAll('[style*="width:"], [style*="width :"]');
        for (let container of containers) {
            if (container.classList.contains('debug-grid') || container.classList.contains('debug-info')) {
                continue;
            }

            const style = window.getComputedStyle(container);
            const width = parseInt(style.width);
            const height = parseInt(style.height);

            if (width > 500 && height > 500) {
                return {
                    width,
                    height,
                    scrollWidth: container.scrollWidth,
                    scrollHeight: container.scrollHeight,
                    hasOverflow: container.scrollWidth > width || container.scrollHeight > height
                };
            }
        }

        // Last fallback to body
        return {
            width: document.body.scrollWidth,
            height: document.body.scrollHeight,
            scrollWidth: document.body.scrollWidth,
            scrollHeight: document.body.scrollHeight,
            hasOverflow: false
        };
    });

    console.log(`📏 Container: ${containerInfo.width}×${containerInfo.height}px`);
    console.log(`📐 Content:   ${containerInfo.scrollWidth}×${containerInfo.scrollHeight}px`);

    if (containerInfo.hasOverflow) {
        const widthOverflow = containerInfo.scrollWidth - containerInfo.width;
        const heightOverflow = containerInfo.scrollHeight - containerInfo.height;
        console.log(`⚠️  OVERFLOW DETECTED!`);
        if (widthOverflow > 0) console.log(`   Width: +${widthOverflow}px`);
        if (heightOverflow > 0) console.log(`   Height: +${heightOverflow}px`);
    } else {
        console.log(`✅ No overflow - design fits perfectly!`);
    }

    // Set viewport to capture the whole design
    await page.setViewportSize({
        width: Math.max(containerInfo.scrollWidth, 1920),
        height: Math.max(containerInfo.scrollHeight, 1080)
    });

    // Generate output filename
    const defaultName = path.basename(htmlFile, '.html') + '-screenshot.png';
    const outputPath = path.resolve(outputName || defaultName);

    // Take screenshot
    await page.screenshot({
        path: outputPath,
        fullPage: true
    });

    console.log(`📸 Screenshot saved: ${path.basename(outputPath)}`);
    console.log(`   Path: ${outputPath}`);

    await browser.close();

    return {
        outputPath,
        containerInfo
    };
}

// CLI usage
if (require.main === module) {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log('Usage: node screenshot-design.js <html-file> [output-name]');
        console.log('');
        console.log('Examples:');
        console.log('  node screenshot-design.js facebook-post-three-cups.html');
        console.log('  node screenshot-design.js my-design.html custom-name.png');
        process.exit(1);
    }

    const [htmlFile, outputName] = args;

    screenshotDesign(htmlFile, outputName)
        .then(() => {
            console.log('✨ Done!');
            process.exit(0);
        })
        .catch(error => {
            console.error('❌ Error:', error.message);
            process.exit(1);
        });
}

module.exports = { screenshotDesign };
