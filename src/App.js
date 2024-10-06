import React, { useEffect, useState } from 'react';
import './App.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { Slider } from '@mui/material';
import FireIcon from '@mui/icons-material/LocalFireDepartment';
import SleepPage from './SleepPage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1rxH8wL2rqJD-fapPSgpj5umfs-56-bA",
  authDomain: "timetable-f78c2.firebaseapp.com",
  databaseURL: "https://timetable-f78c2-default-rtdb.firebaseio.com",
  projectId: "timetable-f78c2",
  storageBucket: "timetable-f78c2.appspot.com",
  messagingSenderId: "773763248332",
  appId: "1:773763248332:web:d225ee2436620b88239269",
  measurementId: "G-WSZSTR8NRW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDay, setCurrentDay] = useState("");
  const [completedTasks, setCompletedTasks] = useState({});
  const [motivationPercentage, setMotivationPercentage] = useState(0);
  const [isSleeping, setIsSleeping] = useState(false); 
 

const timetable = {
  Monday: [
    { time: "6:00 AM", task: "Wake up, freshen up" },
    { time: "6:30 – 7:30 AM", task: "Gym (Cardio or full-body workout)" },
    { time: "7:30 – 8:15 AM", task: "Breakfast & relax" },
    { time: "8:30 – 11:00 AM", task: "DSA practice (solving problems, working on algorithms)" },
    { time: "11:00 – 11:15 AM", task: "Short break" },
    { time: "11:15 AM – 1:00 PM", task: "Advanced Java (concepts and hands-on practice)" },
    { time: "1:00 – 2:00 PM", task: "Lunch and rest" },
    { time: "2:00 – 4:00 PM", task: "Advanced Java Project work" },
    { time: "4:00 – 5:00 PM", task: "Relax or light activity" },
    { time: "5:00 – 6:00 PM", task: "Temple visit" },
    { time: "6:30 – 8:30 PM", task: "German class" },
    { time: "8:30 – 9:00 PM", task: "Dinner" },
    { time: "9:00 – 9:30 PM", task: "Light revision of German notes" },
    { time: "9:30 – 10:00 PM", task: "DSA revision" },
    { time: "10:30 PM", task: "Sleep" },
  ],
  Tuesday: [
    { time: "6:00 AM", task: "Wake up, freshen up" },
    { time: "6:30 – 7:30 AM", task: "Gym (Strength and flexibility workout)" },
    { time: "7:30 – 8:15 AM", task: "Breakfast & relax" },
    { time: "8:30 – 11:00 AM", task: "DSA practice (focus on hard problems)" },
    { time: "11:00 – 11:15 AM", task: "Short break" },
    { time: "11:15 AM – 1:00 PM", task: "MySQL exercises (queries and database concepts)" },
    { time: "1:00 – 2:00 PM", task: "Lunch and rest" },
    { time: "2:00 – 4:00 PM", task: "Advanced Java Project work" },
    { time: "4:00 – 6:00 PM", task: "German practice (use language apps, review class notes)" },
    { time: "6:30 – 9:00 PM", task: "Meet with friends" },
    { time: "9:00 – 10:00 PM", task: "Relax (watch a show or unwind)" },
    { time: "10:30 PM", task: "Sleep" },
  ],
  Wednesday: [
    { time: "6:00 AM", task: "Wake up, freshen up" },
    { time: "6:30 – 7:30 AM", task: "Gym (Cardio + light weights)" },
    { time: "7:30 – 8:15 AM", task: "Breakfast & relax" },
    { time: "8:30 – 11:00 AM", task: "Java/Advanced Java (concepts and coding practice)" },
    { time: "11:00 – 11:15 AM", task: "Short break" },
    { time: "11:15 AM – 1:00 PM", task: "DSA practice (algorithm work)" },
    { time: "1:00 – 2:00 PM", task: "Lunch and rest" },
    { time: "2:00 – 4:00 PM", task: "Advanced Java Project" },
    { time: "4:00 – 6:00 PM", task: "Relax or unwind" },
    { time: "6:30 – 8:30 PM", task: "German class" },
    { time: "8:30 – 9:00 PM", task: "Dinner" },
    { time: "9:00 – 9:30 PM", task: "German practice (go over class notes)" },
    { time: "9:30 – 10:00 PM", task: "Light DSA revision" },
    { time: "10:30 PM", task: "Sleep" },
  ],
  Thursday: [
    { time: "6:00 AM", task: "Wake up, freshen up" },
    { time: "6:30 – 7:30 AM", task: "Gym (Strength training + stretching)" },
    { time: "7:30 – 8:15 AM", task: "Breakfast & relax" },
    { time: "8:30 – 11:00 AM", task: "DSA problem-solving (tackle challenging problems)" },
    { time: "11:00 – 11:15 AM", task: "Short break" },
    { time: "11:15 AM – 1:00 PM", task: "MySQL exercises" },
    { time: "1:00 – 2:00 PM", task: "Lunch and rest" },
    { time: "2:00 – 4:00 PM", task: "Advanced Java Project" },
    { time: "4:00 – 5:00 PM", task: "German practice (review and speak aloud)" },
    { time: "6:30 – 9:00 PM", task: "Meet with friends" },
    { time: "9:00 – 10:00 PM", task: "Relax, unwind" },
    { time: "10:30 PM", task: "Sleep" },
  ],
  Friday: [
    { time: "6:00 AM", task: "Wake up, freshen up" },
    { time: "6:30 – 7:30 AM", task: "Gym (Focus on cardio + flexibility)" },
    { time: "7:30 – 8:15 AM", task: "Breakfast & relax" },
    { time: "8:30 – 11:00 AM", task: "Java/Advanced Java (concepts and coding)" },
    { time: "11:00 – 11:15 AM", task: "Short break" },
    { time: "11:15 AM – 1:00 PM", task: "DSA (problem-solving and practice)" },
    { time: "1:00 – 2:00 PM", task: "Lunch and rest" },
    { time: "2:00 – 4:00 PM", task: "Advanced Java Project" },
    { time: "4:00 – 6:00 PM", task: "German practice (reading, speaking, vocabulary)" },
    { time: "6:30 – 8:30 PM", task: "German class" },
    { time: "8:30 – 9:00 PM", task: "Dinner" },
    { time: "9:00 – 10:00 PM", task: "Relax (watch a show, listen to music)" },
    { time: "10:30 PM", task: "Sleep" },
  ],
  Saturday: [
    { time: "6:30 AM", task: "Wake up, freshen up" },
    { time: "6:30 – 7:30 AM", task: "Gym (Full-body workout)" },
    { time: "7:30 – 8:15 AM", task: "Breakfast & relax" },
    { time: "8:30 – 11:00 AM", task: "DSA practice (tackle difficult problems)" },
    { time: "11:00 – 11:15 AM", task: "Short break" },
    { time: "11:15 AM – 1:00 PM", task: "MySQL work (advanced queries)" },
    { time: "1:00 – 2:00 PM", task: "Lunch and rest" },
    { time: "2:00 – 4:00 PM", task: "Advanced Java Project" },
    { time: "4:00 – 6:30 PM", task: "Meet with friends" },
    { time: "7:00 – 9:00 PM", task: "Dinner and relax with a movie or book" },
    { time: "10:00 PM", task: "Wind down for the day" },
    { time: "10:30 PM", task: "Sleep" },
  ],
  Sunday: [
    { time: "8:00 AM", task: "Wake up later, freshen up" },
    { time: "8:30 – 9:00 AM", task: "Breakfast & relax" },
    { time: "9:00 – 12:00 PM", task: "German practice (casual reading or listening)" },
    { time: "12:00 – 1:00 PM", task: "Free time" },
    { time: "1:00 – 2:00 PM", task: "Lunch" },
    { time: "2:00 – 4:00 PM", task: "Light DSA revision (review concepts)" },
    { time: "4:00 – 6:00 PM", task: "Relax, spend time with family or friends" },
    { time: "6:30 – 10:30 PM", task: "Prepare for the week ahead" },
    { time: "10:30 PM", task: "Sleep" },
  ],
  // Add timetable for other days similarly
};   
 
useEffect(() => {
  const intervalId = setInterval(() => {
    const now = new Date();
    setCurrentTime(now);
    setCurrentDay(new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(now));
  }, 1000);

  return () => clearInterval(intervalId);
}, []);

useEffect(() => {
  const tasksRef = ref(database, 'completedTasks');
  const unsubscribe = onValue(tasksRef, (snapshot) => {
    const tasks = snapshot.val() || {};
    setCompletedTasks(tasks);
    calculateMotivation(tasks);
  });

  return () => unsubscribe();
}, []);

const calculateMotivation = (completed) => {
  const totalTasks = timetable[currentDay]?.length || 0;
  const completedCount = Object.keys(completed).filter(task => completed[task]).length;
  const percentage = (completedCount / totalTasks) * 100;
  setMotivationPercentage(percentage);
};

const toggleTaskCompletion = (taskId) => {
  const newCompletedTasks = { ...completedTasks, [taskId]: !completedTasks[taskId] };
  setCompletedTasks(newCompletedTasks);

  // Directly set completed tasks in the database
  set(ref(database, 'completedTasks'), newCompletedTasks)
    .then(() => {
      console.log("Data written successfully.");
      calculateMotivation(newCompletedTasks);
    })
    .catch((error) => {
      console.error("Error writing data: ", error);
    });
};

const getHighlightedSlot = (timeSlot) => {
  const now = new Date();
  const [slotStart, slotEnd] = timeSlot.time.split(' – ').map(t => new Date(`${now.toDateString()} ${t}`));
  return now >= slotStart && now <= slotEnd ? 'highlight' : '';
};

const checkSleepStatus = () => {
  const sleepTime = new Date();
  sleepTime.setHours(22, 30, 0); // 10:30 PM
  const wakeTime = new Date();
  wakeTime.setHours(6, 0, 0); // 6:00 AM

  setIsSleeping(currentTime >= sleepTime || currentTime < wakeTime);
};

useEffect(() => {
  checkSleepStatus();
}, [currentTime]);

// Calculate the motivation percentage initially and on completed tasks update
useEffect(() => {
  const tasksRef = ref(database, 'completedTasks');
  onValue(tasksRef, (snapshot) => {
    const tasks = snapshot.val() || {};
    setCompletedTasks(tasks);
    calculateMotivation(tasks);
  });
}, [currentDay]);

if (isSleeping) {
  return <SleepPage />;
}

return (
  <div className="App">
    <header>
      <h2>Welcome back, Shreays! Let’s see what’s on the agenda!</h2>
      <h3>Weekly Timetable</h3>
      <div className="date-time">
        <p>Today: {currentDay}</p>
        <p>Current Time: {currentTime.toLocaleTimeString()}</p>
      </div>
    </header>

    <div className="motivation">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FireIcon style={{ color: 'red', fontSize: '30px', marginRight: '10px' }} />
        <Slider
          value={motivationPercentage}
          aria-labelledby="motivation-slider"
          style={{ color: 'red', width: '300px' }}
          min={0}
          max={100}
          disabled // Disable user interaction with the slider
        />
      </div>
      <p>Motivation Level: {motivationPercentage.toFixed(0)}%</p>
    </div>

    <div className="timetable">
      {timetable[currentDay]?.map((slot, index) => (
        <div
          key={index}
          className={`time-slot ${getHighlightedSlot(slot)}`}
          onClick={() => toggleTaskCompletion(index)}
          style={{ cursor: 'pointer', backgroundColor: completedTasks[index] ? 'lightgreen' : 'inherit' }}
        >
          <span className="time">{slot.time}</span>
          <span className="task">{slot.task}</span>
        </div>
      ))}
    </div>
  </div>
);
}

export default App;