export const mockCourses = [
  {
    id: "1",
    title: "Introduction to Web Development",
    summary: "Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites from scratch.",
    instructor: "Sarah Johnson",
    duration: "6 hours",
    students: 12450,
    lessons: 24,
    published: true,
    lessons_data: [
      { id: "1", title: "Getting Started with HTML", duration: "15 min", completed: true },
      { id: "2", title: "CSS Fundamentals", duration: "20 min", completed: true },
      { id: "3", title: "JavaScript Basics", duration: "25 min", completed: false },
      { id: "4", title: "Building Your First Website", duration: "30 min", completed: false },
    ],
  },
  {
    id: "2",
    title: "React for Beginners",
    summary:
      "Master React fundamentals and build interactive user interfaces with components, hooks, and state management.",
    instructor: "Michael Chen",
    duration: "8 hours",
    students: 9823,
    lessons: 32,
    published: true,
    lessons_data: [
      { id: "5", title: "What is React?", duration: "12 min", completed: false },
      { id: "6", title: "Components and Props", duration: "18 min", completed: false },
      { id: "7", title: "State and Lifecycle", duration: "22 min", completed: false },
      { id: "8", title: "Hooks Deep Dive", duration: "28 min", completed: false },
    ],
  },
  {
    id: "3",
    title: "UI/UX Design Principles",
    summary:
      "Discover the core principles of user interface and user experience design to create beautiful, intuitive products.",
    instructor: "Emily Rodriguez",
    duration: "5 hours",
    students: 7654,
    lessons: 18,
    published: true,
    lessons_data: [
      { id: "9", title: "Design Thinking Process", duration: "16 min", completed: false },
      { id: "10", title: "Color Theory", duration: "14 min", completed: false },
      { id: "11", title: "Typography Basics", duration: "18 min", completed: false },
      { id: "12", title: "Wireframing", duration: "20 min", completed: false },
    ],
  },
  {
    id: "4",
    title: "Python Programming Fundamentals",
    summary: "Start your programming journey with Python, one of the most popular and versatile languages.",
    instructor: "David Kim",
    duration: "10 hours",
    students: 15234,
    lessons: 40,
    published: true,
    lessons_data: [
      { id: "13", title: "Python Basics", duration: "15 min", completed: false },
      { id: "14", title: "Data Types", duration: "18 min", completed: false },
      { id: "15", title: "Control Flow", duration: "20 min", completed: false },
      { id: "16", title: "Functions", duration: "22 min", completed: false },
    ],
  },
  {
    id: "5",
    title: "Digital Marketing Essentials",
    summary:
      "Learn how to create effective digital marketing campaigns across social media, email, and content platforms.",
    instructor: "Jessica Taylor",
    duration: "7 hours",
    students: 8932,
    lessons: 28,
    published: true,
    lessons_data: [
      { id: "17", title: "Marketing Strategy", duration: "20 min", completed: false },
      { id: "18", title: "Social Media Marketing", duration: "25 min", completed: false },
      { id: "19", title: "Email Campaigns", duration: "18 min", completed: false },
      { id: "20", title: "Analytics", duration: "22 min", completed: false },
    ],
  },
  {
    id: "6",
    title: "Data Science with Python",
    summary: "Dive into data analysis, visualization, and machine learning using Python and popular libraries.",
    instructor: "Robert Anderson",
    duration: "12 hours",
    students: 6543,
    lessons: 45,
    published: true,
    lessons_data: [
      { id: "21", title: "NumPy Basics", duration: "20 min", completed: false },
      { id: "22", title: "Pandas for Data Analysis", duration: "25 min", completed: false },
      { id: "23", title: "Data Visualization", duration: "22 min", completed: false },
      { id: "24", title: "Machine Learning Intro", duration: "30 min", completed: false },
    ],
  },
]

export const mockEnrolledCourses = [
  {
    courseId: "1",
    progress: 75,
    lastAccessed: "2024-01-15",
    completed: false,
  },
  {
    courseId: "2",
    progress: 30,
    lastAccessed: "2024-01-14",
    completed: false,
  },
  {
    courseId: "3",
    progress: 100,
    lastAccessed: "2024-01-10",
    completed: true,
    completionDate: "2024-01-10",
    certificateHash: "a3f5c9d2e8b1f4a7c6d9e2b5f8a1c4d7",
  },
]

export const mockPendingCourses = [
  {
    id: "7",
    title: "Advanced TypeScript Patterns",
    instructor: "Alex Morgan",
    submittedDate: "2024-01-12",
    lessons: 35,
  },
  {
    id: "8",
    title: "Mobile App Development with React Native",
    instructor: "Lisa Wang",
    submittedDate: "2024-01-14",
    lessons: 42,
  },
  {
    id: "9",
    title: "Blockchain Fundamentals",
    instructor: "James Wilson",
    submittedDate: "2024-01-15",
    lessons: 28,
  },
]

export const mockLesson = {
  id: "1",
  title: "Getting Started with HTML",
  courseId: "1",
  courseName: "Introduction to Web Development",
  videoUrl: "https://example.com/video.mp4",
  transcript: `Welcome to the first lesson of our Web Development course!

In this lesson, we'll cover the basics of HTML, which stands for HyperText Markup Language. HTML is the foundation of every website you see on the internet.

We'll learn about:
- HTML document structure
- Common HTML tags
- Semantic HTML elements
- Best practices for writing clean HTML

Let's start by understanding what HTML actually is. HTML is a markup language that tells web browsers how to structure the content on a web page. It uses a system of tags to define different types of content.

For example, the <h1> tag is used for main headings, <p> for paragraphs, and <a> for links. Each tag has an opening and closing version, like <p> and </p>.

Throughout this lesson, we'll build a simple web page together, and by the end, you'll have a solid understanding of HTML fundamentals.

Let's dive in!`,
  nextLessonId: "2",
  previousLessonId: null,
}
