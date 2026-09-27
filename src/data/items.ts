import type { LostFoundItem } from "@/types/item";

/** Mock dates are relative to "today" so the demo always looks fresh. */
function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function stamp(n: number, time: string): string {
  return `${daysAgo(n)}T${time}:00`;
}

/**
 * Local mock data. Replace `itemsService` (src/lib/items-service.ts) with real
 * API calls when a backend is ready — components never import this file directly.
 */
export const MOCK_ITEMS: LostFoundItem[] = [
  {
    id: "itm-1001",
    title: "Black AirPods Pro",
    description:
      "Black AirPods Pro in a matte black silicone case with a small scratch near the hinge. Left them on a desk on the second floor reading area.",
    status: "lost",
    category: "electronics",
    location: "library",
    date: daysAgo(0),
    time: "11:40",
    art: "earbuds",
    color: "black",
    tags: ["airpods", "earbuds", "wireless", "apple", "headphones"],
    reporter: { name: "Aarav M.", role: "Student", department: "CSE", verified: true },
    createdAt: stamp(0, "12:05"),
  },
  {
    id: "itm-1002",
    title: "Blue Hydro Flask",
    description:
      "32 oz navy blue Hydro Flask with a few stickers (a mountain and a coding sticker). Found under row F after the evening seminar.",
    status: "found",
    category: "bottles",
    location: "auditorium",
    date: daysAgo(1),
    time: "18:20",
    art: "bottle",
    color: "blue",
    tags: ["water bottle", "flask", "hydro flask", "steel"],
    reporter: { name: "Meera K.", role: "Student", department: "ECE", verified: true },
    createdAt: stamp(1, "18:45"),
  },
  {
    id: "itm-1003",
    title: "Student ID Card",
    description:
      "College ID card with a red lanyard. Handed over at the CSE Block front desk — the owner can collect it after verifying their USN.",
    status: "found",
    category: "documents",
    location: "cse-block",
    date: daysAgo(2),
    time: "09:15",
    art: "id-card",
    color: "red",
    tags: ["id", "identity card", "lanyard", "student id"],
    reporter: { name: "CSE Front Desk", role: "Staff", verified: true },
    createdAt: stamp(2, "09:30"),
  },
  {
    id: "itm-1004",
    title: "Casio Calculator",
    description:
      "Casio fx-991EX ClassWiz scientific calculator, grey. Name initials 'R.S.' scratched on the back cover. Probably left in Lab 3 after the mid-term.",
    status: "lost",
    category: "electronics",
    location: "engineering-block",
    date: daysAgo(3),
    time: "13:00",
    art: "calculator",
    color: "grey",
    tags: ["calculator", "casio", "fx-991", "scientific"],
    reporter: { name: "Rohan S.", role: "Student", department: "Mechanical", verified: true },
    createdAt: stamp(3, "15:10"),
  },
  {
    id: "itm-1005",
    title: "Black Backpack",
    description:
      "Black Wildcraft backpack with a grey front pocket. Contains a blue notebook and a charger. Left on a chair near the counter during lunch.",
    status: "lost",
    category: "bags",
    location: "cafeteria",
    date: daysAgo(4),
    time: "13:25",
    art: "backpack",
    color: "black",
    tags: ["backpack", "bag", "wildcraft", "laptop bag"],
    reporter: { name: "Nisha P.", role: "Student", department: "Civil", verified: true },
    createdAt: stamp(4, "14:00"),
  },
  {
    id: "itm-1006",
    title: "Wireless Earbuds Case",
    description:
      "Black wireless earbuds charging case (no earbuds inside). Found on the bench beside the basketball court.",
    status: "found",
    category: "electronics",
    location: "sports-complex",
    date: daysAgo(5),
    time: "17:50",
    art: "earbuds-case",
    color: "black",
    tags: ["earbuds", "case", "wireless", "headphones", "charging case"],
    reporter: { name: "Kabir D.", role: "Student", department: "ISE", verified: true },
    createdAt: stamp(5, "18:10"),
  },
  {
    id: "itm-1007",
    title: "Hostel Room Keys",
    description:
      "Two keys on a green carabiner keychain with a small bottle-opener. Found near the two-wheeler parking entrance.",
    status: "found",
    category: "keys",
    location: "parking",
    date: daysAgo(1),
    time: "08:10",
    art: "keys",
    color: "green",
    tags: ["keys", "keychain", "carabiner", "room key"],
    reporter: { name: "Security Office", role: "Staff", verified: true },
    createdAt: stamp(1, "08:30"),
  },
  {
    id: "itm-1008",
    title: "Dell Laptop Charger",
    description:
      "65W Dell laptop charger with a slightly frayed cable near the brick. Left plugged in at the charging point near the periodicals section.",
    status: "lost",
    category: "electronics",
    location: "library",
    date: daysAgo(2),
    time: "16:30",
    art: "charger",
    color: "black",
    tags: ["charger", "laptop charger", "dell", "adapter"],
    reporter: { name: "Ishaan R.", role: "Student", department: "AIML", verified: true },
    createdAt: stamp(2, "19:00"),
  },
  {
    id: "itm-1009",
    title: "Engineering Chemistry Textbook",
    description:
      "Engineering Chemistry textbook with a yellow cover, name written on the first page and lots of pencil notes in Unit 3.",
    status: "found",
    category: "books",
    location: "cafeteria",
    date: daysAgo(3),
    time: "11:05",
    art: "book",
    color: "yellow",
    tags: ["book", "textbook", "chemistry", "notes"],
    reporter: { name: "Ananya G.", role: "Student", department: "CSE", verified: true },
    createdAt: stamp(3, "11:20"),
  },
  {
    id: "itm-1010",
    title: "Grey College Hoodie",
    description:
      "Grey hoodie with the college fest logo on the back, size M. Left in the changing room after football practice.",
    status: "lost",
    category: "clothing",
    location: "sports-complex",
    date: daysAgo(6),
    time: "18:40",
    art: "hoodie",
    color: "grey",
    tags: ["hoodie", "sweatshirt", "jacket", "clothing"],
    reporter: { name: "Dev A.", role: "Student", department: "EEE", verified: true },
    createdAt: stamp(6, "20:15"),
  },
  {
    id: "itm-1011",
    title: "Black Wireless Earbuds",
    description:
      "Found a single black wireless earbud (right side) near the photocopy counter. Could belong to any brand — owner can identify the pairing name.",
    status: "found",
    category: "electronics",
    location: "library",
    date: daysAgo(1),
    time: "15:05",
    art: "earbuds",
    color: "black",
    tags: ["earbuds", "earbud", "wireless", "headphones"],
    reporter: { name: "Library Help Desk", role: "Staff", verified: true },
    createdAt: stamp(1, "15:20"),
  },
  {
    id: "itm-1012",
    title: "Prescription Glasses",
    description:
      "Black rectangular prescription glasses in a brown hard case. Found on the front steps of the Administrative Block.",
    status: "found",
    category: "accessories",
    location: "admin-block",
    date: daysAgo(2),
    time: "10:45",
    art: "glasses",
    color: "black",
    tags: ["glasses", "spectacles", "specs", "case"],
    reporter: { name: "Admin Reception", role: "Staff", verified: true },
    createdAt: stamp(2, "11:00"),
  },
  {
    id: "itm-1013",
    title: "Brown Leather Wallet",
    description:
      "Brown bi-fold leather wallet. Contains a metro card and a library card. Lost somewhere between the main gate and the hostel.",
    status: "lost",
    category: "accessories",
    location: "main-gate",
    date: daysAgo(1),
    time: "20:10",
    art: "wallet",
    color: "brown",
    tags: ["wallet", "leather", "purse", "cards"],
    reporter: { name: "Sneha V.", role: "Student", department: "Biotech", verified: true },
    createdAt: stamp(1, "21:00"),
  },
  {
    id: "itm-1014",
    title: "Navy Blue Umbrella",
    description:
      "Compact navy blue folding umbrella with a wooden handle. Left in the hostel common room after dinner.",
    status: "found",
    category: "other",
    location: "hostel",
    date: daysAgo(4),
    time: "21:30",
    art: "umbrella",
    color: "blue",
    tags: ["umbrella", "folding umbrella"],
    reporter: { name: "Hostel Warden Office", role: "Staff", verified: true },
    createdAt: stamp(4, "21:45"),
  },
];
