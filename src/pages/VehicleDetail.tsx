import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getVehicleById } from "@/data/vehicles";
import vehicleSpecsData from "@/data/vehicles_specs.json";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, CheckCircle } from "lucide-react";
import { getCarImage } from "@/data/carImages";

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = getVehicleById(id || "");

  // Use local car images from imageMappings for consistency
  const imageMapping = getCarImage(id || "");
  const imageUrl =
    imageMapping?.imageDetail || imageMapping?.image || vehicle?.imageDetail;

  // Find detailed spec from JSON
  const detailedSpec = vehicleSpecsData.find((spec) => {
    const specId = `${spec.make.toLowerCase()}-${spec.model
      .toLowerCase()
      .replace(/\s+/g, "-")}-${spec.trim.toLowerCase().replace(/\s+/g, "-")}`;
    return (
      id === specId ||
      (spec.make === "BYD" &&
        spec.model === "Sealion 5" &&
        id === "byd-sealion-5-dmi") ||
      (spec.make === "BYD" &&
        spec.model === "ATTO 2" &&
        spec.trim === "DM-i" &&
        id === "byd-atto-2-dmi") ||
      (spec.make === "BYD" &&
        spec.model === "ATTO 2" &&
        spec.trim === "EV" &&
        id === "byd-atto-2-ev") ||
      (spec.make === "MG" &&
        spec.model === "ZS Hybrid+" &&
        id === "mg-zs-hybrid") ||
      (spec.make === "Peugeot" &&
        spec.model === "2008 Hybrid" &&
        id === "peugeot-2008-hybrid") ||
      (spec.make === "Volkswagen" &&
        spec.model === "T-Roc" &&
        id === "vw-troc") ||
      (spec.make === "Volkswagen" &&
        spec.model === "Tiguan" &&
        id === "vw-tiguan") ||
      (spec.make === "MG" && spec.model === "HS PHEV" && id === "mg-hs-phev") ||
      (spec.make === "Hyundai" &&
        spec.model === "Tucson N Line" &&
        id === "hyundai-tucson-nline") ||
      (spec.make === "Toyota" &&
        spec.model === "RAV4" &&
        id === "toyota-rav4-hybrid")
    );
  });

  const handleBackToGallery = () => {
    navigate("/");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--byd-very-light-blue)]">
        <div className="text-center">
          <h1
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "Montserrat" }}
          >
            Vehicle Not Found
          </h1>
          <Button
            onClick={() => navigate("/")}
            style={{ backgroundColor: "var(--byd-red)" }}
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const isByd = vehicle.category === "byd";

  // Format values for display
  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return "—";
    if (typeof value === "object") {
      if (value.min && value.max) return `${value.min}-${value.max}`;
      if (value.max) return `${value.max}`;
      if (value.min) return `${value.min}+`;
    }
    return String(value);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={handleBackToGallery}
          className="gap-2 mb-6 text-[var(--byd-gray)] hover:text-[var(--byd-red)]"
          style={{ fontFamily: "Montserrat" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Gallery
        </Button>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          {/* Compact Header Section */}
          <div className="mb-8">
            <div className="flex items-end gap-4 mb-2">
              <div>
                <Badge
                  className="px-3 py-1 text-xs font-semibold uppercase tracking-wider inline-block"
                  style={{
                    backgroundColor: isByd
                      ? "var(--byd-red)"
                      : "var(--byd-blue)",
                    color: "white",
                    fontFamily: "Montserrat",
                  }}
                >
                  {vehicle.type}
                </Badge>
              </div>
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold uppercase mb-1 tracking-tight"
              style={{
                fontFamily: "Montserrat",
                letterSpacing: "0.02em",
                color: "#1a1a1a",
              }}
            >
              {vehicle.brand}
            </h1>
            <p
              className="text-lg md:text-xl font-normal uppercase tracking-wide"
              style={{
                fontFamily: "Montserrat",
                letterSpacing: "0.05em",
                color: "var(--byd-gray)",
              }}
            >
              {vehicle.model}
            </p>
          </div>

          {/* Image & Features Side-by-Side Section */}
          <div className="mb-16 grid lg:grid-cols-3 gap-8 items-start">
            {/* Car Image - Left Side (2/3 width) */}
            <div className="lg:col-span-2">
              <div className="relative bg-gradient-to-br from-[var(--byd-very-light-blue)] to-white rounded-lg p-6 md:p-8 h-full flex items-center justify-center">
                <img
                  src={imageUrl}
                  alt={vehicle.name}
                  className="w-full h-auto max-h-[400px] object-contain"
                />
              </div>
            </div>

            {/* Key Features - Right Side (1/3 width) */}
            {vehicle.features.length > 0 && (
              <div className="lg:col-span-1">
                <h3
                  className="text-lg font-bold uppercase mb-4 tracking-wide"
                  style={{
                    fontFamily: "Montserrat",
                    letterSpacing: "0.05em",
                    color: "#1a1a1a",
                  }}
                >
                  Key Features
                </h3>
                <div className="space-y-3">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                        style={{
                          color: isByd ? "var(--byd-red)" : "var(--byd-blue)",
                        }}
                      />
                      <span
                        className="text-sm font-medium"
                        style={{
                          fontFamily: "Montserrat",
                          color: "#1a1a1a",
                        }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Specifications Section - Professional Layout */}
          {detailedSpec && (
            <div className="mb-16">
              <h2
                className="text-3xl font-bold uppercase mb-8 text-center tracking-wide"
                style={{
                  fontFamily: "Montserrat",
                  letterSpacing: "0.05em",
                  color: "#1a1a1a",
                }}
              >
                Technical Specifications
              </h2>

              {/* Specs Grid - Professional Table-like Layout */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {/* Powertrain Section */}
                <div className="border-b border-gray-200">
                  <div
                    className="bg-[var(--byd-very-light-blue)] px-6 py-4 border-b border-gray-200"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    <h3 className="text-lg font-bold uppercase tracking-wide text-[var(--byd-gray)]">
                      Powertrain
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                    <div className="px-6 py-4">
                      <div className="flex justify-between items-center">
                        <span
                          className="text-sm font-medium text-[var(--byd-gray)] uppercase tracking-wide"
                          style={{ fontFamily: "Montserrat" }}
                        >
                          Propulsion
                        </span>
                        <span
                          className="text-base font-semibold text-foreground"
                          style={{ fontFamily: "Montserrat" }}
                        >
                          {detailedSpec.powertrain.propulsion}
                        </span>
                      </div>
                    </div>
                    {detailedSpec.powertrain.system_max_power_kw && (
                      <div className="px-6 py-4">
                        <div className="flex justify-between items-center">
                          <span
                            className="text-sm font-medium text-[var(--byd-gray)] uppercase tracking-wide"
                            style={{ fontFamily: "Montserrat" }}
                          >
                            System Power
                          </span>
                          <span
                            className="text-base font-semibold text-foreground"
                            style={{ fontFamily: "Montserrat" }}
                          >
                            {formatValue(
                              detailedSpec.powertrain.system_max_power_kw
                            )}{" "}
                            kW
                            {detailedSpec.powertrain.system_max_power_kw &&
                              ` (${Math.round(
                                detailedSpec.powertrain.system_max_power_kw *
                                  1.34102
                              )} HP)`}
                          </span>
                        </div>
                      </div>
                    )}
                    {detailedSpec.powertrain.motor_max_power_kw && (
                      <div className="px-6 py-4">
                        <div className="flex justify-between items-center">
                          <span
                            className="text-sm font-medium text-[var(--byd-gray)] uppercase tracking-wide"
                            style={{ fontFamily: "Montserrat" }}
                          >
                            Motor Power
                          </span>
                          <span
                            className="text-base font-semibold text-foreground"
                            style={{ fontFamily: "Montserrat" }}
                          >
                            {formatValue(
                              detailedSpec.powertrain.motor_max_power_kw
                            )}{" "}
                            kW
                          </span>
                        </div>
                      </div>
                    )}
                    {detailedSpec.powertrain.drive && (
                      <div className="px-6 py-4">
                        <div className="flex justify-between items-center">
                          <span
                            className="text-sm font-medium text-[var(--byd-gray)] uppercase tracking-wide"
                            style={{ fontFamily: "Montserrat" }}
                          >
                            Drive
                          </span>
                          <span
                            className="text-base font-semibold text-foreground"
                            style={{ fontFamily: "Montserrat" }}
                          >
                            {detailedSpec.powertrain.drive}
                          </span>
                        </div>
                      </div>
                    )}
                    {detailedSpec.powertrain.transmission && (
                      <div className="px-6 py-4">
                        <div className="flex justify-between items-center">
                          <span
                            className="text-sm font-medium text-[var(--byd-gray)] uppercase tracking-wide"
                            style={{ fontFamily: "Montserrat" }}
                          >
                            Transmission
                          </span>
                          <span
                            className="text-base font-semibold text-foreground"
                            style={{ fontFamily: "Montserrat" }}
                          >
                            {detailedSpec.powertrain.transmission}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Battery & Charging Section */}
                {detailedSpec.battery_charging.battery_type && (
                  <div className="border-b border-gray-200">
                    <div
                      className="bg-[var(--byd-very-light-blue)] px-6 py-4 border-b border-gray-200"
                      style={{ fontFamily: "Montserrat" }}
                    >
                      <h3 className="text-lg font-bold uppercase tracking-wide text-[var(--byd-gray)]">
                        Battery & Charging
                      </h3>
                    </div>
                    <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                      <div className="px-6 py-4">
                        <div className="flex justify-between items-center">
                          <span
                            className="text-sm font-medium text-[var(--byd-gray)] uppercase tracking-wide"
                            style={{ fontFamily: "Montserrat" }}
                          >
                            Battery Type
                          </span>
                          <span
                            className="text-base font-semibold text-foreground text-right max-w-[60%]"
                            style={{ fontFamily: "Montserrat" }}
                          >
                            {detailedSpec.battery_charging.battery_type}
                          </span>
                        </div>
                      </div>
                      {detailedSpec.battery_charging.battery_capacity_kwh && (
                        <div className="px-6 py-4">
                          <div className="flex justify-between items-center">
                            <span
                              className="text-sm font-medium text-[var(--byd-gray)] uppercase tracking-wide"
                              style={{ fontFamily: "Montserrat" }}
                            >
                              Battery Capacity
                            </span>
                            <span
                              className="text-base font-semibold text-foreground"
                              style={{ fontFamily: "Montserrat" }}
                            >
                              {formatValue(
                                detailedSpec.battery_charging
                                  .battery_capacity_kwh
                              )}{" "}
                              kWh
                            </span>
                          </div>
                        </div>
                      )}
                      {detailedSpec.battery_charging.max_ac_kw && (
                        <div className="px-6 py-4">
                          <div className="flex justify-between items-center">
                            <span
                              className="text-sm font-medium text-[var(--byd-gray)] uppercase tracking-wide"
                              style={{ fontFamily: "Montserrat" }}
                            >
                              AC Charging
                            </span>
                            <span
                              className="text-base font-semibold text-foreground"
                              style={{ fontFamily: "Montserrat" }}
                            >
                              {formatValue(
                                detailedSpec.battery_charging.max_ac_kw
                              )}{" "}
                              kW
                            </span>
                          </div>
                        </div>
                      )}
                      {detailedSpec.battery_charging.max_dc_kw && (
                        <div className="px-6 py-4">
                          <div className="flex justify-between items-center">
                            <span
                              className="text-sm font-medium text-[var(--byd-gray)] uppercase tracking-wide"
                              style={{ fontFamily: "Montserrat" }}
                            >
                              DC Charging
                            </span>
                            <span
                              className="text-base font-semibold text-foreground"
                              style={{ fontFamily: "Montserrat" }}
                            >
                              {formatValue(
                                detailedSpec.battery_charging.max_dc_kw
                              )}{" "}
                              kW
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Range & Efficiency Section */}
                <div className="border-b border-gray-200">
                  <div
                    className="bg-[var(--byd-very-light-blue)] px-6 py-4 border-b border-gray-200"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    <h3 className="text-lg font-bold uppercase tracking-wide text-[var(--byd-gray)]">
                      Range & Efficiency
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                    {detailedSpec.range_efficiency.wltp_electric_range_km && (
                      <div className="px-6 py-4">
                        <div className="flex justify-between items-center">
                          <span
                            className="text-sm font-medium text-[var(--byd-gray)] uppercase tracking-wide"
                            style={{ fontFamily: "Montserrat" }}
                          >
                            Electric Range (WLTP)
                          </span>
                          <span
                            className="text-base font-semibold text-foreground"
                            style={{ fontFamily: "Montserrat" }}
                          >
                            {formatValue(
                              detailedSpec.range_efficiency
                                .wltp_electric_range_km
                            )}{" "}
                            km
                          </span>
                        </div>
                      </div>
                    )}
                    {detailedSpec.range_efficiency.wltp_combined_range_km && (
                      <div className="px-6 py-4">
                        <div className="flex justify-between items-center">
                          <span
                            className="text-sm font-medium text-[var(--byd-gray)] uppercase tracking-wide"
                            style={{ fontFamily: "Montserrat" }}
                          >
                            Combined Range (WLTP)
                          </span>
                          <span
                            className="text-base font-semibold text-foreground"
                            style={{ fontFamily: "Montserrat" }}
                          >
                            {formatValue(
                              detailedSpec.range_efficiency
                                .wltp_combined_range_km
                            )}{" "}
                            km
                          </span>
                        </div>
                      </div>
                    )}
                    {detailedSpec.range_efficiency.fuel_consumption_l_per_100km
                      ?.combined && (
                      <div className="px-6 py-4">
                        <div className="flex justify-between items-center">
                          <span
                            className="text-sm font-medium text-[var(--byd-gray)] uppercase tracking-wide"
                            style={{ fontFamily: "Montserrat" }}
                          >
                            Fuel Consumption
                          </span>
                          <span
                            className="text-base font-semibold text-foreground"
                            style={{ fontFamily: "Montserrat" }}
                          >
                            {formatValue(
                              detailedSpec.range_efficiency
                                .fuel_consumption_l_per_100km.combined
                            )}{" "}
                            L/100km
                          </span>
                        </div>
                      </div>
                    )}
                    {detailedSpec.range_efficiency.co2_g_km !== null &&
                      detailedSpec.range_efficiency.co2_g_km !== undefined && (
                        <div className="px-6 py-4">
                          <div className="flex justify-between items-center">
                            <span
                              className="text-sm font-medium text-[var(--byd-gray)] uppercase tracking-wide"
                              style={{ fontFamily: "Montserrat" }}
                            >
                              CO₂ Emissions
                            </span>
                            <span
                              className="text-base font-semibold text-foreground"
                              style={{ fontFamily: "Montserrat" }}
                            >
                              {formatValue(
                                detailedSpec.range_efficiency.co2_g_km
                              )}{" "}
                              g/km
                            </span>
                          </div>
                        </div>
                      )}
                  </div>
                </div>

                {/* Performance Section */}
                <div className="border-b border-gray-200">
                  <div
                    className="bg-[var(--byd-very-light-blue)] px-6 py-4 border-b border-gray-200"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    <h3 className="text-lg font-bold uppercase tracking-wide text-[var(--byd-gray)]">
                      Performance
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                    {detailedSpec.performance.zero_to_100_kmh_s && (
                      <div className="px-6 py-4">
                        <div className="flex justify-between items-center">
                          <span
                            className="text-sm font-medium text-[var(--byd-gray)] uppercase tracking-wide"
                            style={{ fontFamily: "Montserrat" }}
                          >
                            0-100 km/h
                          </span>
                          <span
                            className="text-base font-semibold text-foreground"
                            style={{ fontFamily: "Montserrat" }}
                          >
                            {formatValue(
                              detailedSpec.performance.zero_to_100_kmh_s
                            )}{" "}
                            s
                          </span>
                        </div>
                      </div>
                    )}
                    {detailedSpec.performance.top_speed_kmh && (
                      <div className="px-6 py-4">
                        <div className="flex justify-between items-center">
                          <span
                            className="text-sm font-medium text-[var(--byd-gray)] uppercase tracking-wide"
                            style={{ fontFamily: "Montserrat" }}
                          >
                            Top Speed
                          </span>
                          <span
                            className="text-base font-semibold text-foreground"
                            style={{ fontFamily: "Montserrat" }}
                          >
                            {formatValue(
                              detailedSpec.performance.top_speed_kmh
                            )}{" "}
                            km/h
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Dimensions Section */}
                {detailedSpec.dimensions && (
                  <div className="border-b border-gray-200">
                    <div
                      className="bg-[var(--byd-very-light-blue)] px-6 py-4 border-b border-gray-200"
                      style={{ fontFamily: "Montserrat" }}
                    >
                      <h3 className="text-lg font-bold uppercase tracking-wide text-[var(--byd-gray)]">
                        Dimensions
                      </h3>
                    </div>
                    <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                      {detailedSpec.dimensions.length_mm && (
                        <div className="px-6 py-4">
                          <div className="flex justify-between items-center">
                            <span
                              className="text-sm font-medium text-[var(--byd-gray)] uppercase tracking-wide"
                              style={{ fontFamily: "Montserrat" }}
                            >
                              Length
                            </span>
                            <span
                              className="text-base font-semibold text-foreground"
                              style={{ fontFamily: "Montserrat" }}
                            >
                              {formatValue(detailedSpec.dimensions.length_mm)}{" "}
                              mm
                            </span>
                          </div>
                        </div>
                      )}
                      {detailedSpec.dimensions.width_mm && (
                        <div className="px-6 py-4">
                          <div className="flex justify-between items-center">
                            <span
                              className="text-sm font-medium text-[var(--byd-gray)] uppercase tracking-wide"
                              style={{ fontFamily: "Montserrat" }}
                            >
                              Width
                            </span>
                            <span
                              className="text-base font-semibold text-foreground"
                              style={{ fontFamily: "Montserrat" }}
                            >
                              {formatValue(detailedSpec.dimensions.width_mm)} mm
                            </span>
                          </div>
                        </div>
                      )}
                      {detailedSpec.dimensions.height_mm && (
                        <div className="px-6 py-4">
                          <div className="flex justify-between items-center">
                            <span
                              className="text-sm font-medium text-[var(--byd-gray)] uppercase tracking-wide"
                              style={{ fontFamily: "Montserrat" }}
                            >
                              Height
                            </span>
                            <span
                              className="text-base font-semibold text-foreground"
                              style={{ fontFamily: "Montserrat" }}
                            >
                              {formatValue(detailedSpec.dimensions.height_mm)}{" "}
                              mm
                            </span>
                          </div>
                        </div>
                      )}
                      {detailedSpec.dimensions.wheelbase_mm && (
                        <div className="px-6 py-4">
                          <div className="flex justify-between items-center">
                            <span
                              className="text-sm font-medium text-[var(--byd-gray)] uppercase tracking-wide"
                              style={{ fontFamily: "Montserrat" }}
                            >
                              Wheelbase
                            </span>
                            <span
                              className="text-base font-semibold text-foreground"
                              style={{ fontFamily: "Montserrat" }}
                            >
                              {formatValue(
                                detailedSpec.dimensions.wheelbase_mm
                              )}{" "}
                              mm
                            </span>
                          </div>
                        </div>
                      )}
                      {detailedSpec.weight_capacity.boot_volume_l && (
                        <div className="px-6 py-4">
                          <div className="flex justify-between items-center">
                            <span
                              className="text-sm font-medium text-[var(--byd-gray)] uppercase tracking-wide"
                              style={{ fontFamily: "Montserrat" }}
                            >
                              Boot Volume
                            </span>
                            <span
                              className="text-base font-semibold text-foreground"
                              style={{ fontFamily: "Montserrat" }}
                            >
                              {formatValue(
                                detailedSpec.weight_capacity.boot_volume_l
                              )}{" "}
                              L
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Official BYD Website CTA */}
          {isByd && vehicle.officialUrl && (
            <div className="text-center">
              <a
                href={vehicle.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg font-semibold uppercase tracking-wide"
                  style={{
                    backgroundColor: "var(--byd-red)",
                    color: "white",
                    fontFamily: "Montserrat",
                  }}
                >
                  Ver página oficial BYD
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;
