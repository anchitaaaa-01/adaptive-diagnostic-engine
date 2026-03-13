export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  difficulty: number; // 1-10
  topic: string;
}

export const mockQuestions: Question[] = [
  {
    id: 1, text: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctIndex: 1, difficulty: 3, topic: "Algorithms"
  },
  {
    id: 2, text: "Which data structure uses LIFO (Last In, First Out)?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correctIndex: 1, difficulty: 2, topic: "Data Structures"
  },
  {
    id: 3, text: "What does the 'P' in TCP/IP stand for?",
    options: ["Process", "Protocol", "Program", "Packet"],
    correctIndex: 1, difficulty: 3, topic: "Networking"
  },
  {
    id: 4, text: "In Big-O notation, what is the complexity of merge sort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correctIndex: 1, difficulty: 5, topic: "Algorithms"
  },
  {
    id: 5, text: "Which principle states that a class should have only one reason to change?",
    options: ["Open/Closed", "Single Responsibility", "Liskov Substitution", "Dependency Inversion"],
    correctIndex: 1, difficulty: 4, topic: "Software Design"
  },
  {
    id: 6, text: "What is the worst-case time complexity of quicksort?",
    options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
    correctIndex: 1, difficulty: 6, topic: "Algorithms"
  },
  {
    id: 7, text: "Which design pattern provides a simplified interface to a complex subsystem?",
    options: ["Observer", "Factory", "Facade", "Singleton"],
    correctIndex: 2, difficulty: 6, topic: "Software Design"
  },
  {
    id: 8, text: "What is a deadlock in concurrent programming?",
    options: [
      "A process that runs infinitely",
      "Two or more processes waiting for each other indefinitely",
      "A memory overflow error",
      "A process with high CPU usage"
    ],
    correctIndex: 1, difficulty: 7, topic: "Operating Systems"
  },
  {
    id: 9, text: "What is the amortized time complexity of inserting into a dynamic array?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
    correctIndex: 0, difficulty: 8, topic: "Data Structures"
  },
  {
    id: 10, text: "In CAP theorem, which two properties can a distributed system guarantee simultaneously?",
    options: [
      "All three always",
      "Any two of Consistency, Availability, Partition tolerance",
      "Only Consistency and Availability",
      "Only Partition tolerance"
    ],
    correctIndex: 1, difficulty: 9, topic: "Distributed Systems"
  },
];

export interface StudyStep {
  step: number;
  title: string;
  description: string;
  resources: string[];
  icon: "book" | "code" | "target";
}

export const mockStudyPlan: StudyStep[] = [
  {
    step: 1,
    title: "Strengthen Fundamentals",
    description: "Focus on core algorithm analysis and Big-O notation. Practice identifying time and space complexity for common operations.",
    resources: ["Introduction to Algorithms (CLRS) Ch. 1-3", "MIT OCW 6.006 Lectures 1-5", "LeetCode Easy: Arrays & Strings"],
    icon: "book",
  },
  {
    step: 2,
    title: "Deepen Design Knowledge",
    description: "Explore SOLID principles and common design patterns. Build small projects applying each pattern to solidify understanding.",
    resources: ["Head First Design Patterns", "Refactoring Guru - Interactive Examples", "Build a CLI tool using Strategy Pattern"],
    icon: "code",
  },
  {
    step: 3,
    title: "Master Advanced Topics",
    description: "Tackle distributed systems concepts, concurrency models, and CAP theorem. Simulate real-world scenarios in practice environments.",
    resources: ["Designing Data-Intensive Applications Ch. 5-9", "Distributed Systems Course (MIT 6.824)", "Practice: Build a basic distributed key-value store"],
    icon: "target",
  },
];
