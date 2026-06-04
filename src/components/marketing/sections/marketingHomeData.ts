export type CategoryItem = { title: string; count: string; icon: string; href: string };

export const CATEGORY_ITEMS: CategoryItem[] = [
  { title: "Web Design", count: "25 Courses", icon: "categories1.svg", href: "/courses" },
  { title: "Graphic Design", count: "10 Courses", icon: "categories2.svg", href: "/courses" },
  { title: "Development", count: "05 Courses", icon: "categories3.svg", href: "/courses" },
  { title: "IT And Software", count: "08 Courses", icon: "categories4.svg", href: "/courses" },
  { title: "Sales Marketing", count: "11 Courses", icon: "categories5.svg", href: "/courses" },
  { title: "Art & Humanities", count: "22 Courses", icon: "categories6.svg", href: "/courses" },
  { title: "Mobile Application", count: "15 Courses", icon: "categories7.svg", href: "/courses" },
  { title: "Finance Accounting", count: "04 Courses", icon: "categories8.svg", href: "/courses" },
];

export type TestimonialItem = { quote: string; name: string; role: string; img: string };

/** Placeholder social proof from the Briticana playbook — swap for real named stories when available. */
export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote: "Briticana gave me my first real experience working in a structured team environment.",
    name: "Briticana Participant",
    role: "Program graduate",
    img: "user1.jpg",
  },
  {
    quote: "I finally understood how startup workflows actually work.",
    name: "Briticana Participant",
    role: "Program graduate",
    img: "user2.jpg",
  },
  {
    quote: "The project experience helped me improve my confidence and portfolio.",
    name: "Briticana Participant",
    role: "Program graduate",
    img: "user3.jpg",
  },
  {
    quote: "This felt closer to real work than traditional internships.",
    name: "Briticana Participant",
    role: "Program graduate",
    img: "user2.jpg",
  },
];
