const imageMap: Record<string, { image: string; imageDetail: string }> = {
   "byd-atto-2-dmi": { image: "/car-images/byd/17.ATTO 2 DMi_LHD_Midnight Blue_17 inch wheels_download_Left Front 45°_PNG.png", imageDetail: "/car-images/byd/17.ATTO 2 DMi_LHD_Midnight Blue_17 inch wheels_download_Left Front 45°_PNG.png" },
   "byd-atto-2-ev": { image: "/car-images/byd/atto2-ev.png", imageDetail: "/car-images/byd/atto2-ev.png" },
  "byd-sealion-5-dmi": { image: "/car-images/byd/BYD-Sealion5-DMi-Color-CosmosBlack-794x397.webp", imageDetail: "/car-images/byd/BYD-Sealion5-DMi-Color-CosmosBlack-794x397.webp" },
  "mg-hs-phev": { image: "/car-images/competitors/MG-HS-PHEV-LUXURY.png", imageDetail: "/car-images/competitors/MG-HS-PHEV-LUXURY.png" },
  "peugeot-2008-hybrid": { image: "/car-images/competitors/Peugeot-2008-hibrido-nuevo-2024-1.png", imageDetail: "/car-images/competitors/Peugeot-2008-hibrido-nuevo-2024-1.png" },
   "vw-troc": { image: "/car-images/competitors/volkswagen_T-roc.png", imageDetail: "/car-images/competitors/volkswagen_T-roc.png" },
  "vw-tiguan": { image: "/car-images/competitors/volkswagen_25tiguanrlinesu3bfr_lowaggressive.webp", imageDetail: "/car-images/competitors/volkswagen_25tiguanrlinesu3bfr_lowaggressive.webp" },
  "mg-zs-hybrid": { image: "/car-images/competitors/MG ZS +HEV.png", imageDetail: "/car-images/competitors/MG ZS +HEV.png" },
  "hyundai-tucson-nline": { image: "/car-images/competitors/tucson.webp", imageDetail: "/car-images/competitors/tucson.webp" },
  "toyota-rav4-hybrid": { image: "/car-images/competitors/rav4.png", imageDetail: "/car-images/competitors/rav4.png" },
};

export const getCarImage = (id: string) => imageMap[id];