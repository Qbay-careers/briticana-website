export const PARTNERS = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `partner${n}.png`);

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

export type CourseCard = {
  tag: string;
  title: string;
  author: string;
  userImg: string;
  hours: string;
  students: string;
  priceWas: string;
  priceNow: string;
  img: string;
};

export const COURSE_CARDS: CourseCard[] = [
  {
    tag: "Mobile Development",
    title: "Android App Development Using Java for Beginners",
    author: "Michael Turner",
    userImg: "user1.jpg",
    hours: "3 hrs",
    students: "34",
    priceWas: "$75.00",
    priceNow: "$55.00",
    img: "course1.jpg",
  },
  {
    tag: "Web Development",
    title: "Complete Frontend Web Development Bootcamp",
    author: "Sarah Williams",
    userImg: "user2.jpg",
    hours: "4 hrs",
    students: "48",
    priceWas: "$80.00",
    priceNow: "$60.00",
    img: "course2.jpg",
  },
  {
    tag: "UI/UX Design",
    title: "User Experience Design for Modern Applications",
    author: "Daniel Roberts",
    userImg: "user3.jpg",
    hours: "2.5 hrs",
    students: "22",
    priceWas: "$65.00",
    priceNow: "$45.00",
    img: "course3.jpg",
  },
  {
    tag: "Digital Marketing",
    title: "SEO and Social Media Marketing Masterclass",
    author: "Emily Johnson",
    userImg: "user1.jpg",
    hours: "3.5 hrs",
    students: "41",
    priceWas: "$70.00",
    priceNow: "$50.00",
    img: "course4.jpg",
  },
  {
    tag: "Data Science",
    title: "Data Analysis and Visualization with Python",
    author: "James Anderson",
    userImg: "user2.jpg",
    hours: "4.5 hrs",
    students: "29",
    priceWas: "$85.00",
    priceNow: "$65.00",
    img: "course5.jpg",
  },
  {
    tag: "Cyber Security",
    title: "Ethical Hacking and Network Security Basics",
    author: "Kevin Martinez",
    userImg: "user3.jpg",
    hours: "3 hrs",
    students: "26",
    priceWas: "$78.00",
    priceNow: "$58.00",
    img: "course6.jpg",
  },
];

export type TestimonialItem = { quote: string; name: string; role: string; img: string };

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "EduMove helped me sharpen my skills with practical lessons and clear explanations. The learning experience felt structured, engaging, and useful for real-world projects.",
    name: "Jason Miller",
    role: "Product Designer",
    img: "user1.jpg",
  },
  {
    quote:
      "The courses are well-organized and easy to follow. I especially liked how complex topics were broken down into simple, actionable steps that boosted my confidence.",
    name: "Olivia Brown",
    role: "Frontend Developer",
    img: "user2.jpg",
  },
  {
    quote:
      "What I love most about EduMove is the balance between theory and practice. The instructors explain concepts clearly and always focus on real industry needs.",
    name: "Ryan Cooper",
    role: "Software Engineer",
    img: "user3.jpg",
  },
  {
    quote:
      "From beginner to advanced lessons, everything feels thoughtfully designed. EduMove made online learning enjoyable, effective, and truly worth the time invested.",
    name: "Emily Carter",
    role: "Digital Marketer",
    img: "user2.jpg",
  },
];

export type TeamMember = { name: string; role: string; img: string };

export const TEAM: TeamMember[] = [
  { name: "Laura Bennett", role: "Senior Lecturer", img: "team1.jpg" },
  { name: "Andrew Collins", role: "Lead Professor", img: "team2.jpg" },
  { name: "Matthew Rogers", role: "Software Architect", img: "team3.jpg" },
  { name: "Sophia Turner", role: "Academic Mentor", img: "team4.jpg" },
  { name: "Natalie Perez", role: "Course Facilitator", img: "team5.jpg" },
  { name: "Daniel Thompson", role: "Professional Instructor", img: "team6.jpg" },
];

export type BlogItem = { date: string; comments: string; title: string; img: string };

export const BLOGS: BlogItem[] = [
  {
    date: "12 March 2025",
    comments: "14",
    title: "How Skill-Based Learning Is Shaping the Future Workforce",
    img: "blog1.jpg",
  },
  {
    date: "28 April 2025",
    comments: "09",
    title: "Choosing the Right Online Course for Long-Term Career Growth",
    img: "blog2.jpg",
  },
  {
    date: "05 May 2025",
    comments: "21",
    title: "Practical Learning Methods That Help Students Succeed Faster",
    img: "blog3.jpg",
  },
];
