import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "qrcode";

// This file is used in both browser and Node.js environments
// Node.js specific functions receive dependencies as parameters

export interface VehicleData {
  name: string;
  brand: string;
  model: string;
  imageDetail?: string;
  category?: string;
}

export interface PdfGenerationOptions {
  vehicle: VehicleData;
  specsElement: HTMLElement;
  pdfLinks?: Record<string, string>;
  vehicleId?: string;
}

export interface PdfGenerationResult {
  pdfBlobUrl: string;
  qrCodeUrl: string;
}

/**
 * Generates a PDF spec sheet and QR code for a vehicle
 * @param options - The options for PDF generation
 * @returns Promise resolving to PDF blob URL and QR code URL
 */
export async function generateVehiclePdf({
  vehicle: _vehicle,
  specsElement,
  pdfLinks = {},
  vehicleId
}: PdfGenerationOptions): Promise<PdfGenerationResult> {
  // Show PDF header temporarily
  const header = specsElement.querySelector('.pdf-header') as HTMLElement;
  if (header) {
    header.style.display = 'block';
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Capture the specs element as canvas
  const canvas = await html2canvas(specsElement, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
  });

  // Hide header again
  if (header) {
    header.style.display = 'none';
  }

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');

  const imgWidth = 210;
  const pageHeight = 295;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;

  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  const pdfBlob = pdf.output('blob');
  const blobUrl = URL.createObjectURL(pdfBlob);

  // Generate QR from pdfLinks if available, else blob
  const qrLink = vehicleId ? pdfLinks[vehicleId] || blobUrl : blobUrl;
  const qrDataUrl = await QRCode.toDataURL(qrLink, { width: 141 });

  return {
    pdfBlobUrl: blobUrl,
    qrCodeUrl: qrDataUrl
  };
}

/**
 * Downloads a PDF file with the given blob URL and filename
 * @param pdfBlobUrl - The blob URL of the PDF
 * @param filename - The filename for the download
 */
export function downloadPdf(pdfBlobUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.href = pdfBlobUrl;
  link.download = filename;
  link.click();
}

/**
 * Generates and saves PDF spec sheets for all vehicles to the public/spec-sheets directory
 * This function is designed to run in Node.js environment
 * @param vehiclesData - Array of vehicle specification data
 * @param carImages - Mapping of vehicle IDs to image paths
 * @param outputDir - Output directory (defaults to 'public/spec-sheets')
 * @param dependencies - Node.js dependencies (puppeteer, fs, path)
 * @returns Promise that resolves when all PDFs are generated
 */
export async function generateAllVehiclePdfs(
  vehiclesData: any[],
  carImages: Record<string, any> = {},
  outputDir: string = 'public/spec-sheets',
  dependencies?: { puppeteer: any; fs: any; path: any }
): Promise<void> {
  if (typeof window !== 'undefined') {
    throw new Error('generateAllVehiclePdfs can only be run in Node.js environment');
  }

  // Use provided dependencies or try to load them
  const { puppeteer: puppeteerDep, fs: fsDep, path: pathDep } = dependencies || {};
  if (!puppeteerDep || !fsDep || !pathDep) {
    throw new Error('Required dependencies (puppeteer, fs, path) must be provided');
  }

  const puppeteer = puppeteerDep;
  const fs = fsDep;
  const path = pathDep;

  console.log('🚗 Starting PDF generation for all vehicles...');

  // Create output directory
  const fullOutputDir = path.resolve(outputDir);
  if (!fs.existsSync(fullOutputDir)) {
    fs.mkdirSync(fullOutputDir, { recursive: true });
  }

  // Launch browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    let processedCount = 0;

    for (const vehicleSpec of vehiclesData) {
      const vehicleId = `${vehicleSpec.make.toLowerCase()}-${vehicleSpec.model.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-')}-${vehicleSpec.trim.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-')}`;

      console.log(`📄 Generating PDF for: ${vehicleSpec.make} ${vehicleSpec.model} ${vehicleSpec.trim}`);

      // Get car image
      const carImage = carImages[vehicleId];
      const imageUrl = carImage?.imageDetail || carImage?.image || '/placeholder-car.png';

      // Generate HTML content
      const htmlContent = generateVehicleSpecSheetHTML(vehicleSpec, imageUrl);

      // Create PDF
      const page = await browser.newPage();
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

      // Wait for fonts and images to load
      await new Promise(resolve => setTimeout(resolve, 1000));

      const pdfPath = path.join(fullOutputDir, `${vehicleId}.pdf`);
      await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px'
        }
      });

      await page.close();
      processedCount++;

      console.log(`✅ Generated: ${pdfPath}`);
    }

    console.log(`🎉 Successfully generated ${processedCount} PDF spec sheets in ${fullOutputDir}`);

  } finally {
    await browser.close();
  }
}

/**
 * Generates HTML content for a vehicle spec sheet PDF
 * @param vehicleSpec - Vehicle specification data
 * @param imageUrl - URL/path to vehicle image
 * @returns HTML string for the spec sheet
 */
function generateVehicleSpecSheetHTML(vehicleSpec: any, imageUrl: string): string {
  // Format values helper
  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return "—";
    if (typeof value === "object") {
      if (value.min && value.max) return `${value.min}-${value.max}`;
      if (value.max) return `${value.max}`;
      if (value.min) return `${value.min}+`;
    }
    return String(value);
  };

  // Read CSS file content (this would need to be provided or inlined)
  const cssContent = `
    body {
        font-family: 'Montserrat', sans-serif;
        margin: 0;
        padding: 0;
        background: white;
        color: #1a1a1a;
    }

    .pdf-container {
        max-width: none;
        margin: 0;
        padding: 20px;
    }

    .pdf-header {
        border-bottom: 1px solid #e5e7eb;
        background: rgba(255, 255, 255, 0.95);
        margin-bottom: 30px;
    }

    .header-content {
        display: flex;
        height: 64px;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
    }

    .logo-container img {
        height: 40px;
        width: auto;
    }

    .title-section {
        text-align: right;
    }

    .title-section h1 {
        font-size: 18px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #dc2626;
        margin: 0;
    }

    .title-section h2 {
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #1a1a1a;
        margin: 4px 0 0 0;
    }

    .specs-section {
        margin-bottom: 30px;
    }

    .section-header {
        background: linear-gradient(to right, #dbeafe, #ffffff);
        padding: 16px 20px;
        border-bottom: 1px solid #e5e7eb;
        margin-bottom: 0;
    }

    .section-title {
        font-size: 18px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #6b7280;
        margin: 0;
    }

    .specs-grid {
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        overflow: hidden;
    }

    .spec-row {
        display: flex;
        border-bottom: 1px solid #e5e7eb;
    }

    .spec-row:last-child {
        border-bottom: none;
    }

    .spec-item {
        flex: 1;
        padding: 16px 20px;
        border-right: 1px solid #e5e7eb;
    }

    .spec-item:last-child {
        border-right: none;
    }

    .spec-label {
        font-size: 12px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #6b7280;
        margin-bottom: 4px;
    }

    .spec-value {
        font-size: 14px;
        font-weight: 600;
        color: #1a1a1a;
    }

    .features-section {
        margin-top: 30px;
    }

    .features-list {
        list-style: disc;
        padding-left: 20px;
    }

    .features-list li {
        margin-bottom: 8px;
        font-size: 14px;
    }
  `;

  // Read logo as base64 (simplified - in real implementation you'd read the actual file)
  const logoSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40"><text x="50" y="25" font-family="Arial" font-size="20" fill="#dc2626" text-anchor="middle">BYD</text></svg>';
  const logoDataUrl = `data:image/svg+xml;base64,${Buffer ? Buffer.from(logoSvg).toString('base64') : btoa(logoSvg)}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${vehicleSpec.make} ${vehicleSpec.model} - Spec Sheet</title>
    <style>
        ${cssContent}
    </style>
</head>
<body>
    <div class="pdf-container">
        <!-- PDF Header -->
        <div class="pdf-header">
            <div class="header-content">
                <div class="logo-container">
                    <img src="${logoDataUrl}" alt="BYD Logo" />
                </div>
                <div class="title-section">
                    <h1>BYD Sales Training Spec Sheet</h1>
                    <h2>${vehicleSpec.make} ${vehicleSpec.model} ${vehicleSpec.trim}</h2>
                </div>
            </div>
        </div>

        <!-- Vehicle Image -->
        <div style="text-align: center; margin-bottom: 30px;">
            <img src="${imageUrl}" alt="${vehicleSpec.make} ${vehicleSpec.model}" style="max-width: 400px; height: auto; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);" />
        </div>

        <!-- General Vehicle Info -->
        <div class="specs-section">
            <div class="section-header">
                <h3 class="section-title">General Vehicle Info</h3>
            </div>
            <div class="specs-grid">
                <div class="spec-row">
                    <div class="spec-item">
                        <div class="spec-label">Model Name</div>
                        <div class="spec-value">${vehicleSpec.make} ${vehicleSpec.model}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Model Year</div>
                        <div class="spec-value">${formatValue(vehicleSpec.model_year)}</div>
                    </div>
                </div>
                <div class="spec-row">
                    <div class="spec-item">
                        <div class="spec-label">Trim/Edition</div>
                        <div class="spec-value">${formatValue(vehicleSpec.trim)}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Body Style</div>
                        <div class="spec-value">${formatValue(vehicleSpec.body_style)}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Powertrain & Performance -->
        ${vehicleSpec.powertrain ? `
        <div class="specs-section">
            <div class="section-header">
                <h3 class="section-title">Powertrain & Performance</h3>
            </div>
            <div class="specs-grid">
                ${vehicleSpec.powertrain.engine_displacement_l ? `
                <div class="spec-row">
                    <div class="spec-item">
                        <div class="spec-label">Engine Displacement</div>
                        <div class="spec-value">${formatValue(vehicleSpec.powertrain.engine_displacement_l)} L</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Engine Configuration</div>
                        <div class="spec-value">${formatValue(vehicleSpec.powertrain.cylinders)} cylinders</div>
                    </div>
                </div>
                ` : ''}
                ${vehicleSpec.powertrain.motor_max_power_kw ? `
                <div class="spec-row">
                    <div class="spec-item">
                        <div class="spec-label">Motor Power</div>
                        <div class="spec-value">${formatValue(vehicleSpec.powertrain.motor_max_power_kw)} kW</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Total Power Output</div>
                        <div class="spec-value">${formatValue(vehicleSpec.powertrain.system_max_power_kw)} kW (${Math.round(vehicleSpec.powertrain.system_max_power_kw * 1.34102)} HP)</div>
                    </div>
                </div>
                ` : ''}
                ${vehicleSpec.powertrain.system_max_torque_nm ? `
                <div class="spec-row">
                    <div class="spec-item">
                        <div class="spec-label">Torque</div>
                        <div class="spec-value">${formatValue(vehicleSpec.powertrain.system_max_torque_nm)} Nm</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Transmission Type</div>
                        <div class="spec-value">${formatValue(vehicleSpec.powertrain.transmission)}</div>
                    </div>
                </div>
                ` : ''}
                ${vehicleSpec.performance ? `
                <div class="spec-row">
                    <div class="spec-item">
                        <div class="spec-label">Acceleration (0-100 km/h)</div>
                        <div class="spec-value">${formatValue(vehicleSpec.performance.zero_to_100_kmh_s)} s</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Top Speed</div>
                        <div class="spec-value">${formatValue(vehicleSpec.performance.top_speed_kmh)} km/h</div>
                    </div>
                </div>
                ` : ''}
            </div>
        </div>
        ` : ''}

        <!-- Fuel & Emissions -->
        <div class="specs-section">
            <div class="section-header">
                <h3 class="section-title">Fuel & Emissions</h3>
            </div>
            <div class="specs-grid">
                ${vehicleSpec.weight_capacity?.fuel_tank_l ? `
                <div class="spec-row">
                    <div class="spec-item">
                        <div class="spec-label">Fuel Tank Capacity</div>
                        <div class="spec-value">${formatValue(vehicleSpec.weight_capacity.fuel_tank_l)} L</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">WLTP Fuel Economy</div>
                        <div class="spec-value">${formatValue(vehicleSpec.range_efficiency?.fuel_consumption_l_per_100km?.combined)} L/100km</div>
                    </div>
                </div>
                ` : ''}
                ${vehicleSpec.range_efficiency?.co2_g_km ? `
                <div class="spec-row">
                    <div class="spec-item">
                        <div class="spec-label">CO₂ Emissions</div>
                        <div class="spec-value">${formatValue(vehicleSpec.range_efficiency.co2_g_km)} g/km</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Hybrid Battery Capacity</div>
                        <div class="spec-value">${formatValue(vehicleSpec.battery_charging?.battery_capacity_kwh)} kWh</div>
                    </div>
                </div>
                ` : ''}
            </div>
        </div>

        <!-- Dimensions & Capacity -->
        ${vehicleSpec.dimensions ? `
        <div class="specs-section">
            <div class="section-header">
                <h3 class="section-title">Dimensions & Capacity</h3>
            </div>
            <div class="specs-grid">
                <div class="spec-row">
                    <div class="spec-item">
                        <div class="spec-label">Length</div>
                        <div class="spec-value">${formatValue(vehicleSpec.dimensions.length_mm)} mm</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Width</div>
                        <div class="spec-value">${formatValue(vehicleSpec.dimensions.width_mm)} mm</div>
                    </div>
                </div>
                <div class="spec-row">
                    <div class="spec-item">
                        <div class="spec-label">Height</div>
                        <div class="spec-value">${formatValue(vehicleSpec.dimensions.height_mm)} mm</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Wheelbase</div>
                        <div class="spec-value">${formatValue(vehicleSpec.dimensions.wheelbase_mm)} mm</div>
                    </div>
                </div>
                <div class="spec-row">
                    <div class="spec-item">
                        <div class="spec-label">Boot/Trunk Volume</div>
                        <div class="spec-value">${formatValue(vehicleSpec.weight_capacity?.boot_volume_l)} L</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Kerb Weight</div>
                        <div class="spec-value">${formatValue(vehicleSpec.weight_capacity?.kerb_kg)} kg</div>
                    </div>
                </div>
            </div>
        </div>
        ` : ''}

        <!-- Features & Options -->
        ${(vehicleSpec.features?.exterior?.length > 0 ||
           vehicleSpec.features?.interior?.length > 0 ||
           vehicleSpec.features?.infotainment?.length > 0 ||
           vehicleSpec.features?.safety?.length > 0 ||
           vehicleSpec.features?.adas?.length > 0) ? `
        <div class="specs-section">
            <div class="section-header">
                <h3 class="section-title">Features & Options</h3>
            </div>
            <div style="padding: 20px;">
                ${vehicleSpec.features?.infotainment?.length > 0 ? `
                <div style="margin-bottom: 20px;">
                    <h4 style="font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 10px;">Infotainment System</h4>
                    <ul class="features-list">
                        ${vehicleSpec.features.infotainment.map((feature: string) => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
                ${vehicleSpec.features?.safety?.length > 0 ? `
                <div style="margin-bottom: 20px;">
                    <h4 style="font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 10px;">Safety Features</h4>
                    <ul class="features-list">
                        ${vehicleSpec.features.safety.map((feature: string) => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
                ${vehicleSpec.features?.adas?.length > 0 ? `
                <div style="margin-bottom: 20px;">
                    <h4 style="font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 10px;">Driver Assistance Systems</h4>
                    <ul class="features-list">
                        ${vehicleSpec.features.adas.map((feature: string) => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>
        </div>
        ` : ''}
    </div>
</body>
</html>`;
}