export const imageMap: Record<string, { image: string; imageDetail: string }> = {
  "byd-atto-2-dmi": {
    image:
      "/car-images/byd/17.ATTO 2 DMi_LHD_Midnight Blue_17 inch wheels_download_Left Front 45°_PNG.webp",
    imageDetail:
      "/car-images/byd/17.ATTO 2 DMi_LHD_Midnight Blue_17 inch wheels_download_Left Front 45°_PNG.webp",
  },
  "byd-atto-2-ev": {
    image: "/car-images/byd/atto2-ev.webp",
    imageDetail: "/car-images/byd/atto2-ev.webp",
  },
  "byd-sealion-5-dmi": {
    image: "/car-images/byd/BYD-Sealion5-DMi-Color-CosmosBlack-794x397.webp",
    imageDetail:
      "/car-images/byd/BYD-Sealion5-DMi-Color-CosmosBlack-794x397.webp",
  },
  "mg-hs-phev": {
    image: "/car-images/competitors/MG-HS-PHEV-LUXURY.webp",
    imageDetail: "/car-images/competitors/MG-HS-PHEV-LUXURY.webp",
  },
  "peugeot-2008-hybrid": {
    image: "/car-images/competitors/Peugeot-2008-hibrido-nuevo-2024-1.webp",
    imageDetail:
      "/car-images/competitors/Peugeot-2008-hibrido-nuevo-2024-1.webp",
  },
   "vw-troc": {
     image: "/car-images/competitors/volkswagen_T-roc.webp",
     imageDetail: "/car-images/competitors/volkswagen_T-roc.webp",
   },
   "vw-troc-ice": {
     image: "/car-images/competitors/volkswagen_T-roc.webp",
     imageDetail: "/car-images/competitors/volkswagen_T-roc.webp",
   },
  "vw-tiguan": {
    image:
      "/car-images/competitors/volkswagen_25tiguanrlinesu3bfr_lowaggressive.webp",
    imageDetail:
      "/car-images/competitors/volkswagen_25tiguanrlinesu3bfr_lowaggressive.webp",
  },
  "mg-zs-hybrid": {
    image: "/car-images/competitors/MG ZS +HEV.webp",
    imageDetail: "/car-images/competitors/MG ZS +HEV.webp",
  },
  "hyundai-tucson-nline": {
    image: "/car-images/competitors/tucson.webp",
    imageDetail: "/car-images/competitors/tucson.webp",
  },
  "toyota-rav4-hybrid": {
    image: "/car-images/competitors/rav4.webp",
    imageDetail: "/car-images/competitors/rav4.webp",
  },
  "toyota-yaris": {
    image: "/car-images/competitors/Toyota Yaris Cross Hybrid 130 e-CVT.webp",
    imageDetail:
      "/car-images/competitors/Toyota Yaris Cross Hybrid 130 e-CVT.webp",
  },
};

const BASE = import.meta.env.BASE_URL;

export const getCarImage = (id: string) => {
  const entry = imageMap[id];
  if (!entry) return undefined;
  return {
    image: BASE + entry.image.slice(1),
    imageDetail: BASE + entry.imageDetail.slice(1),
  };
};
