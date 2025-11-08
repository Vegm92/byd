import vehicleSpecsData from "./vehicles_specs.json";
import { getCarImage } from "./carImages";

type VehicleSpec = (typeof vehicleSpecsData)[0];

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  type: "HEV" | "EV" | "Hybrid" | "PHEV" | "MHEV" | "ICE";
  category: "byd" | "competitor";
  image: string;
  imageDetail: string;
  officialUrl?: string;
  specs: {
    power?: string;
    range?: string;
    battery?: string;
    acceleration?: string;
    topSpeed?: string;
    consumption?: string;
  };
  features: string[];
}

// Helper function to format power from kW
const formatPower = (kw: number | null | undefined): string | undefined => {
  if (kw === null || kw === undefined) return undefined;
  const hp = Math.round(kw * 1.34102);
  return `${kw} kW (${hp} HP)`;
};

// Helper function to format range
const formatRange = (
  range: number | { min?: number; max?: number } | null | undefined
): string | undefined => {
  if (range === null || range === undefined) return undefined;
  if (typeof range === "object") {
    if (range.max) return `${range.max} km`;
    if (range.min) return `${range.min}+ km`;
    return undefined;
  }
  return `${range} km`;
};

// Helper function to format battery capacity
const formatBattery = (
  capacity: number | { min?: number; max?: number } | null | undefined
): string | undefined => {
  if (capacity === null || capacity === undefined) return undefined;
  if (typeof capacity === "object") {
    if (capacity.max) return `${capacity.max} kWh`;
    if (capacity.min) return `${capacity.min} kWh`;
    return undefined;
  }
  return `${capacity} kWh`;
};

// Helper function to format acceleration
const formatAcceleration = (
  seconds: number | null | undefined
): string | undefined => {
  if (seconds === null || seconds === undefined) return undefined;
  return `${seconds}s (0-100 km/h)`;
};

// Helper function to format consumption
const formatConsumption = (
  consumption:
    | { combined?: number; weighted_combined?: number }
    | number
    | null
    | undefined
): string | undefined => {
  if (consumption === null || consumption === undefined) return undefined;
  if (typeof consumption === "object") {
    const value = consumption.weighted_combined || consumption.combined;
    if (value) return `${value} L/100km`;
    return undefined;
  }
  return `${consumption} L/100km`;
};

// Helper function to map propulsion type
const mapPropulsionType = (propulsion: string): Vehicle["type"] => {
  const mapping: Record<string, Vehicle["type"]> = {
    PHEV: "PHEV",
    EV: "EV",
    HEV: "HEV",
    MHEV: "MHEV",
    ICE: "ICE",
  };
  return mapping[propulsion] || "Hybrid";
};

// Generate ID from vehicle spec
const generateId = (spec: VehicleSpec): string => {
  const make = spec.make.toLowerCase();
  const model = spec.model.toLowerCase().replace(/\s+/g, "-");
  const trim = spec.trim.toLowerCase().replace(/\s+/g, "-");

  if (spec.make === "BYD") {
    if (spec.model === "Sealion 5") return "byd-sealion-5-dmi";
    if (spec.model === "ATTO 2" && spec.trim === "DM-i")
      return "byd-atto-2-dmi";
    if (spec.model === "ATTO 2" && spec.trim === "EV") return "byd-atto-2-ev";
  }

  if (spec.make === "MG" && spec.model === "ZS Hybrid+") return "mg-zs-hybrid";
  if (spec.make === "Peugeot" && spec.model === "2008 Hybrid")
    return "peugeot-2008-hybrid";
  if (spec.make === "Volkswagen" && spec.model === "T-Roc") return "vw-troc";
  if (spec.make === "Volkswagen" && spec.model === "Tiguan") return "vw-tiguan";
  if (spec.make === "MG" && spec.model === "HS PHEV") return "mg-hs-phev";
  if (spec.make === "Hyundai" && spec.model === "Tucson N Line")
    return "hyundai-tucson-nline";
  if (spec.make === "Toyota" && spec.model === "RAV4")
    return "toyota-rav4-hybrid";

  return `${make}-${model}-${trim}`;
};

// Convert vehicle spec to Vehicle interface
const convertSpecToVehicle = (spec: VehicleSpec): Vehicle => {
  const id = generateId(spec);
  const carImage = getCarImage(id);
  const images = carImage || {
    image: "/car-images/atto2-ev.png",
    imageDetail: "/car-images/atto2-ev.png",
  };

  const systemPower = spec.powertrain.system_max_power_kw;
  const range =
    spec.range_efficiency.wltp_combined_range_km ||
    spec.range_efficiency.wltp_electric_range_km;
  const battery = spec.battery_charging.battery_capacity_kwh;
  const acceleration = spec.performance.zero_to_100_kmh_s;
  const topSpeed = spec.performance.top_speed_kmh;
  const consumption = spec.range_efficiency.fuel_consumption_l_per_100km;

  // Generate features based on available data
  const features: string[] = [];
  if (spec.battery_charging.battery_type?.includes("Blade Battery")) {
    features.push("BYD Blade Battery");
  }
  if (spec.powertrain.propulsion === "PHEV") {
    features.push("Plug-in Hybrid Technology");
  }
  if (spec.powertrain.propulsion === "EV") {
    features.push("100% Electric");
    features.push("Zero Emissions");
  }
  if (spec.powertrain.drive === "AWD") {
    features.push("All-Wheel Drive");
  }
  if (
    spec.range_efficiency.wltp_combined_range_km &&
    spec.range_efficiency.wltp_combined_range_km > 1000
  ) {
    features.push("Extended Range");
  }

  return {
    id,
    name: `${spec.make} ${spec.model} ${spec.trim}`,
    brand: spec.make,
    model: `${spec.model} ${spec.trim}`,
    type: mapPropulsionType(spec.powertrain.propulsion),
    category: spec.make === "BYD" ? "byd" : "competitor",
    image: images.image,
    imageDetail: images.imageDetail,
    specs: {
      power: formatPower(systemPower),
      range: formatRange(range),
      battery: formatBattery(battery),
      acceleration: formatAcceleration(acceleration),
      topSpeed: topSpeed ? `${topSpeed} km/h` : undefined,
      consumption: formatConsumption(consumption),
    },
    features:
      features.length > 0
        ? features
        : [
            `${spec.powertrain.propulsion} Technology`,
            "Advanced Safety Features",
            "Modern Design",
          ],
  };
};

// Convert all specs to vehicles
export const vehicles: Vehicle[] = vehicleSpecsData.map(convertSpecToVehicle);

export const getBydVehicles = () =>
  vehicles.filter((v) => v.category === "byd");
export const getCompetitorVehicles = () =>
  vehicles.filter((v) => v.category === "competitor");
export const getVehicleById = (id: string) => vehicles.find((v) => v.id === id);
