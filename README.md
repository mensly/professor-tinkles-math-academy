# 🐱 Professor Tinkles' Math Academy

A delightful, interactive mathematics learning platform featuring charming feline instructors who guide students through various mathematical concepts from beginner to expert levels.

## 🌟 Features

### 🎓 **Four Expert Instructors**
- **Professor Tinkles** 🍰 - The wise tea-loving scholar specializing in fractions, decimals, and nature's mathematics
- **Sir Whiskersworth** 📐 - The precise garden master teaching algebra, geometry, and trigonometry  
- **Lady Pawsington** 📊 - The elegant book enthusiast covering probability, statistics, and set theory
- **Inspector Clawson** 🔍 - The brilliant detective expert in applied mathematics and discrete math

### 📚 **15 Comprehensive Lesson Categories**

#### 🟢 **Beginner Level**
- **Number Recognition** - Learn to identify and compare numbers
- **Counting** - Master basic arithmetic operations
- **Basic Arithmetic** - Word problems and fundamental math
- **Fractions & Decimals** - Convert between fractions and decimals

#### 🟡 **Intermediate Level**  
- **Algebra Basics** - Variables, equations, and linear functions
- **Probability** - Basic probability, combinations, and games
- **Geometry** - Perimeter, area, circles, triangles, and shapes
- **Trigonometry** - Sine, cosine, tangent, and special triangles
- **Statistics** - Mean, median, mode, and data analysis
- **Set Theory** - Union, intersection, complement, and Venn diagrams

#### 🔴 **Advanced Level**
- **Applied Mathematics** - Real-world problems and optimization
- **Calculus** - Derivatives, integrals, and mathematical modeling
- **Number Theory** - Prime numbers, factors, GCD, and LCM
- **Discrete Mathematics** - Permutations, combinations, and logic

#### 🌿 **Expert Level**
- **Math in Nature** - Fibonacci sequences, golden ratio, and fractals

### 🎯 **Key Features**
- **375+ Questions** - Comprehensive question bank with randomized selection
- **Difficulty Ratings** - Clear visual indicators for each lesson's complexity
- **Character Personalities** - Each instructor has unique teaching style and personality
- **Interactive Learning** - Engaging questions with detailed explanations
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Beautiful UI** - Modern, accessible interface with delightful animations

## 🚀 **Live Demo**

Visit the live application at: **https://mensly.github.io/professor-tinkles-math-academy/**

## 🛠️ **Technology Stack**

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with excellent IDE support
- **CSS3** - Modern styling with animations and responsive design
- **JSON Data** - Structured lesson content with 25 questions per category
- **GitHub Pages** - Static hosting with automatic deployment

## 📦 **Installation & Setup**

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/mensly/professor-tinkles-math-academy.git
   cd professor-tinkles-math-academy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🏗️ **Project Structure**

```
src/
├── components/
│   ├── App.tsx                 # Main application component
│   ├── Header.tsx             # Application header
│   ├── Footer.tsx             # Application footer
│   ├── CharacterMessage.tsx   # Character dialogue system
│   ├── views/
│   │   └── HomeView.tsx       # Main dashboard with lesson cards
│   ├── routing/
│   │   └── LessonRouter.tsx   # Lesson navigation system
│   ├── lessons/
│   │   ├── DynamicLesson.tsx  # Reusable lesson component
│   │   ├── BaseLesson.tsx     # Legacy lesson component
│   │   └── [Category]Lesson.tsx # Individual lesson components
│   ├── characters/
│   │   ├── ProfessorTinkles.tsx
│   │   ├── SirWhiskersworth.tsx
│   │   ├── LadyPawsington.tsx
│   │   └── InspectorClawson.tsx
│   └── utils/
│       ├── questionLoader.ts  # JSON data loading and randomization
│       ├── lesson.ts          # TypeScript interfaces
│       └── difficultyUtils.tsx # Difficulty rating utilities
├── App.css                    # Global styles
└── index.tsx                  # Application entry point

public/
├── data/                      # JSON lesson data files
│   ├── number-recognition.json
│   ├── counting.json
│   ├── arithmetic.json
│   ├── fractions-decimals.json
│   ├── algebra-basics.json
│   ├── probability.json
│   ├── applied-math.json
│   ├── math-nature.json
│   ├── geometry.json
│   ├── trigonometry.json
│   ├── statistics.json
│   ├── calculus.json
│   ├── set-theory.json
│   ├── number-theory.json
│   └── discrete-math.json
└── images/                   # Character images
    ├── tinkles.jpg
    ├── wiskersworth.jpg
    ├── pawsington.jpg
    └── clawson.jpg
```

## 🎨 **Design Philosophy**

### **Educational Approach**
- **Progressive Difficulty** - Clear learning path from beginner to expert
- **Character-Driven Learning** - Each instructor brings unique personality and expertise
- **Real-World Applications** - Practical problems that connect math to daily life
- **Immediate Feedback** - Detailed explanations for every answer

### **User Experience**
- **Intuitive Navigation** - Easy-to-use interface for all ages
- **Visual Learning** - Rich graphics and clear typography
- **Accessibility** - Designed with inclusive principles
- **Mobile-First** - Responsive design that works on all devices

## 🔧 **Development**

### **Adding New Lessons**
1. Create a new JSON file in `public/data/` with 25 questions
2. Create a new lesson component in `src/components/lessons/`
3. Update `LessonRouter.tsx` to include the new lesson
4. Update `HomeView.tsx` to add the lesson card
5. Update TypeScript interfaces in `lesson.ts`

### **Question Format**
```json
{
  "lessonInfo": {
    "title": "Lesson Name",
    "instructor": "Character Name",
    "emoji": "🎯",
    "difficulty": "beginner|intermediate|advanced|expert",
    "concepts": ["Concept1", "Concept2", "Concept3"]
  },
  "questions": [
    {
      "id": "unique-id",
      "question": "Question text",
      "answer": correctAnswer,
      "options": [option1, option2, option3, option4],
      "explanation": "Detailed explanation",
      "concept": "Related concept"
    }
  ]
}
```

## 🚀 **Deployment**

The application is automatically deployed to GitHub Pages when changes are pushed to the `main` branch. The build process:

1. Builds the React application for production
2. Copies all assets to the `gh-pages` branch
3. Serves the application from GitHub Pages

## 🤝 **Contributing**

We welcome contributions! Please feel free to:

- Add new lesson categories
- Improve existing questions
- Enhance the user interface
- Fix bugs or improve performance
- Add new features

## 📄 **License**

This project is open source and available under the [MIT License](LICENSE).

## 🙏 **Acknowledgments**

- **React Team** - For the amazing React framework
- **Create React App** - For the excellent development experience
- **GitHub Pages** - For free static hosting
- **The Math Community** - For inspiration in mathematical education

---

**Made with ❤️ by the Professor Tinkles' Math Academy Team**

*"Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding."* - Professor Tinkles 🐱📚