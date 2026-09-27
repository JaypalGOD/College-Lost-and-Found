import type { CampusLocation, LocationId } from "@/types/item";

export const LOCATIONS: CampusLocation[] = [
  { id: "library", name: "Library", map: { x: 50, y: 30 } },
  { id: "cse-block", name: "CSE Block", map: { x: 73, y: 24 } },
  { id: "engineering-block", name: "Engineering Block", map: { x: 82, y: 50 } },
  { id: "main-gate", name: "Main Gate", map: { x: 50, y: 90 } },
  { id: "cafeteria", name: "Cafeteria", map: { x: 30, y: 52 } },
  { id: "auditorium", name: "Main Auditorium", map: { x: 22, y: 24 } },
  { id: "sports-complex", name: "Sports Complex", map: { x: 13, y: 70 } },
  { id: "hostel", name: "Hostel", map: { x: 87, y: 78 } },
  { id: "parking", name: "Parking", map: { x: 70, y: 83 } },
  { id: "admin-block", name: "Administrative Block", map: { x: 55, y: 62 } },
];

const byId = new Map(LOCATIONS.map((l) => [l.id, l]));

export function getLocation(id: LocationId): CampusLocation {
  return byId.get(id) ?? LOCATIONS[0];
}

export function isLocationId(value: string | null): value is LocationId {
  return value !== null && byId.has(value as LocationId);
}
