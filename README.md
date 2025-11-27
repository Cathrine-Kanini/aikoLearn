# CBC Learning Assistant - Frontend

AI-Powered Multilingual Learning Assistant for Kenyan Schools (CBC)

## Features

### Student Features
- **Ask Questions** - Get instant help with any topic
- **Practice Quiz** - Test your knowledge with AI-generated quizzes
- **Homework Help** - Get hints without direct answers
- **Step-by-Step Solutions** - Solve problems with detailed explanations
- **Explore Topics** - Deep dive into any concept
- **Daily Learning Tip** - Learn something new every day

### Teacher Features
- **Lesson Plans** - Generate CBC-aligned lesson plans
- **Assessments** - Create tests with marking schemes
- **Scheme of Work** - Generate term schemes
- **Progress Reports** - Create detailed student reports

## Tech Stack

- React 18
- React Router v6
- Axios for API calls
- Tailwind CSS for styling
- Lucide React for icons
- date-fns for date formatting

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd cbc-learning-assistant-frontend
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Update `.env` with your API URL
```env
REACT_APP_API_URL=http://localhost:8000
```

5. Start the development server
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   ├── Textarea.jsx
│   │   ├── Loading.jsx
│   │   ├── Alert.jsx
│   │   ├── Badge.jsx
│   │   └── Modal.jsx
│   └── layout/          # Layout components
│       ├── Navbar.jsx
│       ├── Footer.jsx
│       └── Layout.jsx
├── pages/
│   ├── Home.jsx
│   ├── student/         # Student pages
│   │   ├── StudentDashboard.jsx
│   │   ├── Chat.jsx
│   │   ├── Quiz.jsx
│   │   ├── Homework.jsx
│   │   ├── DailyTip.jsx
│   │   ├── Solve.jsx
│   │   └── Explore.jsx
│   └── teacher/         # Teacher pages
│       ├── TeacherDashboard.jsx
│       ├── LessonPlan.jsx
│       ├── Assessment.jsx
│       ├── SchemeOfWork.jsx
│       └── ProgressReport.jsx
├── config/
│   └── api.js           # API configuration
├── utils/
│   └── constants.js     # App constants
├── App.jsx              # Main app component
├── index.js             # Entry point
└── index.css            # Global styles
```

## Available Scripts

### `npm start`
Runs the app in development mode

### `npm build`
Builds the app for production

### `npm test`
Runs the test suite

### `npm run eject`
Ejects from Create React App (one-way operation)

## API Integration

The frontend connects to the FastAPI backend. Make sure your backend is running on the URL specified in `.env`

### API Endpoints Used
- `/api/chat` - Chat with AI
- `/api/quiz/generate` - Generate quiz
- `/api/homework-help` - Get homework hints
- `/api/daily-tip` - Get daily tip
- `/api/solve-problem` - Step-by-step solutions
- `/api/explore-topic/:topic` - Explore topics
- `/api/teacher/lesson-plan` - Generate lesson plans
- `/api/teacher/assessment` - Generate assessments
- `/api/teacher/scheme-of-work` - Generate schemes
- `/api/teacher/progress-report` - Generate reports

## Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_ENV=development
```

## Styling

This project uses Tailwind CSS for styling. Custom utilities and components are defined in:
- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - Global styles and custom utilities

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License

## Support

For support, email support@cbcassistant.ke or open an issue in the repository.

## Acknowledgments

- Built for Kenyan CBC education system
- Designed with teachers and students in mind
- Powered by AI technology