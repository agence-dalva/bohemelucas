"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const TARGET = ["70", "25", "90", "68", "88"];
const CHAMPAGNEY: [number, number] = [47.705, 6.713];

const CENTERS: Record<string, [number, number]> = {
  "70": [47.70, 6.15],
  "25": [47.15, 6.35],
  "90": [47.63, 6.87],
  "68": [47.85, 7.33],
  "88": [48.18, 6.45],
};

const BOUNDS: L.LatLngBoundsLiteral = [[46.4, 4.8], [48.9, 8.3]];

function deptPin(code: string) {
  return L.divIcon({
    html: `<div style="width:32px;height:32px;background:#C00000;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:11px;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.2);font-family:sans-serif">${code}</div>`,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

const champagneyPin = L.divIcon({
  html: `<div style="width:9px;height:9px;background:#C00000;border-radius:50%;box-shadow:0 0 0 3px rgba(192,0,0,0.2),0 0 0 6px rgba(192,0,0,0.08)"></div>`,
  className: "",
  iconSize: [9, 9],
  iconAnchor: [4, 4],
});

function countryLabel(name: string) {
  return L.divIcon({
    html: `<div style="color:rgba(80,70,60,0.4);font-size:9px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;font-family:sans-serif;white-space:nowrap;user-select:none">${name}</div>`,
    className: "",
    iconSize: [80, 14],
    iconAnchor: [40, 7],
  });
}

const LABELS: Array<{ name: string; pos: [number, number] }> = [
  { name: "France", pos: [48.1, 4.85] },
  { name: "Suisse", pos: [46.72, 7.85] },
  { name: "Allemagne", pos: [48.55, 8.72] },
];

const tooltipCSS = `
  .dept-tooltip {
    background: rgba(255,255,255,0.97) !important;
    border: 1px solid rgba(0,0,0,0.08) !important;
    color: #3a2e28 !important;
    font-size: 10px !important;
    font-weight: 700 !important;
    letter-spacing: 0.1em !important;
    text-transform: uppercase !important;
    padding: 5px 11px !important;
    border-radius: 2px !important;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12) !important;
    white-space: nowrap !important;
    font-family: sans-serif !important;
    pointer-events: none !important;
  }
  .dept-tooltip.leaflet-tooltip::before { display: none !important; }
  .leaflet-interactive {
    transition: fill 0.18s ease, fill-opacity 0.18s ease, stroke-width 0.18s ease, stroke 0.18s ease;
  }
`;

export default function MapZone() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Destroy any pre-existing Leaflet instance on this node
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((el as any)._leaflet_id != null) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (el as any)._leaflet_id;
    }

    const map = L.map(el, {
      center: [47.7, 6.6],
      zoom: 7,
      zoomControl: false,
      scrollWheelZoom: false,
      attributionControl: false,
      dragging: false,
      doubleClickZoom: false,
    });

    map.fitBounds(BOUNDS, { padding: [30, 30] });
    mapRef.current = map;
    setReady(true);

    return () => {
      map.remove();
      mapRef.current = null;
      setReady(false);
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;

    const neighborStyle: L.PathOptions = { fillColor: "#DDD8D0", fillOpacity: 1, color: "#C8C2BA", weight: 1 };

    const layerRefs: Record<string, { layer: L.Path; name: string }> = {};

    const hoverOn = (layer: L.Path, name: string, isTarget: boolean) => {
      layer.setStyle({
        fillColor: isTarget ? "#E60000" : "#C8C2BA",
        fillOpacity: isTarget ? 1 : 0.8,
        color: isTarget ? "#C00000" : "#B8B2A8",
        weight: isTarget ? 2.5 : 1,
      });
      layer.bindTooltip(name, {
        permanent: false,
        sticky: true,
        className: "dept-tooltip",
        offset: [14, -4],
      }).openTooltip();
    };

    const hoverOff = (layer: L.Path, isTarget: boolean) => {
      layer.setStyle({
        fillColor: isTarget ? "#C00000" : "#E8E4DE",
        fillOpacity: isTarget ? 0.85 : 1,
        color: isTarget ? "#990000" : "#D4CFC8",
        weight: isTarget ? 1.5 : 0.5,
      });
      layer.unbindTooltip();
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onEachFeature = (feature: any, layer: L.Layer) => {
      const code = feature?.properties?.code;
      const isTarget = TARGET.includes(code);
      const name: string = feature?.properties?.nom ?? "";
      if (isTarget) layerRefs[code] = { layer: layer as L.Path, name };
      (layer as L.Path).on({
        mouseover(e) { hoverOn(e.target as L.Path, name, isTarget); },
        mouseout(e) { hoverOff(e.target as L.Path, isTarget); },
      });
    };

    fetch("https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson")
      .then((r) => r.json())
      .then((data) => {
        if (!mapRef.current) return;
        L.geoJSON(data, {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          style: (feature: any) => {
            const isTarget = TARGET.includes(feature?.properties?.code);
            return {
              fillColor: isTarget ? "#C00000" : "#E8E4DE",
              fillOpacity: isTarget ? 0.85 : 1,
              color: isTarget ? "#990000" : "#D4CFC8",
              weight: isTarget ? 1.5 : 0.5,
            };
          },
          onEachFeature,
        }).addTo(map);

        TARGET.forEach((code) => {
          L.marker(CENTERS[code], { icon: deptPin(code) })
            .on("mouseover", () => { const r = layerRefs[code]; if (r) hoverOn(r.layer, r.name, true); })
            .on("mouseout", () => { const r = layerRefs[code]; if (r) hoverOff(r.layer, true); })
            .addTo(map);
        });

        L.marker(CHAMPAGNEY, { icon: champagneyPin }).addTo(map);
        LABELS.forEach((l) => L.marker(l.pos, { icon: countryLabel(l.name) }).addTo(map));
      })
      .catch(() => {});

    fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries/DEU.geo.json")
      .then((r) => r.json())
      .then((data) => { if (mapRef.current) L.geoJSON(data, { style: () => neighborStyle }).addTo(map); })
      .catch(() => {});

    fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries/CHE.geo.json")
      .then((r) => r.json())
      .then((data) => { if (mapRef.current) L.geoJSON(data, { style: () => neighborStyle }).addTo(map); })
      .catch(() => {});
  }, [ready]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: tooltipCSS }} />
      <div ref={containerRef} style={{ height: "100%", width: "100%", background: "#F4F1EC" }} />
    </>
  );
}
