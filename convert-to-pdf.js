const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

async function convertToPDF() {
    console.log('Starting PDF conversion...');

    const browser = await chromium.launch();

    // A4 landscape ratio is 297mm x 210mm = 1.414:1
    // Using viewport 1680x1189 (same as before for correct layout)
    // But with deviceScaleFactor 3 for high-quality 300 DPI equivalent
    const context = await browser.newContext({
        viewport: {
            width: 1680,
            height: 1189
        },
        deviceScaleFactor: 3 // Triple pixel density for 300 DPI quality
    });
    const page = await context.newPage();

    // Load the HTML file
    const htmlPath = path.join(__dirname, 'presentation-complete-v2.html');
    await page.goto(`file://${htmlPath}`);

    // Wait for all images to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Get all slides
    const slides = await page.$$('.slide');
    console.log(`Found ${slides.length} slides`);

    const screenshots = [];
    const screenshotDir = path.join(__dirname, 'temp-screenshots');

    // Create temp directory if it doesn't exist
    if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir);
    }

    // Capture each slide
    for (let i = 0; i < slides.length; i++) {
        console.log(`Capturing slide ${i + 1}/${slides.length}...`);

        // Scroll to the slide
        await slides[i].scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        // Take screenshot of the slide
        const screenshotPath = path.join(screenshotDir, `slide-${i + 1}.png`);
        await slides[i].screenshot({
            path: screenshotPath,
            type: 'png'
        });

        screenshots.push(screenshotPath);
    }

    await browser.close();
    console.log('All screenshots captured!');

    // Create PDF from screenshots
    console.log('Creating PDF from screenshots...');
    const pdfDoc = await PDFDocument.create();

    // A4 landscape dimensions in points (1 point = 1/72 inch)
    const a4Width = 841.89; // 297mm
    const a4Height = 595.28; // 210mm

    for (let i = 0; i < screenshots.length; i++) {
        console.log(`Adding slide ${i + 1}/${screenshots.length} to PDF...`);

        const imageBytes = fs.readFileSync(screenshots[i]);
        const image = await pdfDoc.embedPng(imageBytes);

        const page = pdfDoc.addPage([a4Width, a4Height]);

        // Calculate scaling to fit the image on the page while maintaining aspect ratio
        const imageAspectRatio = image.width / image.height;
        const pageAspectRatio = a4Width / a4Height;

        let drawWidth, drawHeight;
        if (imageAspectRatio > pageAspectRatio) {
            // Image is wider than page ratio
            drawWidth = a4Width;
            drawHeight = a4Width / imageAspectRatio;
        } else {
            // Image is taller than page ratio
            drawHeight = a4Height;
            drawWidth = a4Height * imageAspectRatio;
        }

        // Center the image on the page
        const x = (a4Width - drawWidth) / 2;
        const y = (a4Height - drawHeight) / 2;

        page.drawImage(image, {
            x: x,
            y: y,
            width: drawWidth,
            height: drawHeight
        });
    }

    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('presentation-complete-v2.pdf', pdfBytes);

    // Clean up temporary screenshots
    console.log('Cleaning up temporary files...');
    screenshots.forEach(screenshot => fs.unlinkSync(screenshot));
    fs.rmdirSync(screenshotDir);

    console.log('✓ PDF created successfully: presentation-complete-v2.pdf');
}

convertToPDF().catch(console.error);
