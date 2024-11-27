import { getTimeOfDay } from './timeOfDayUtils.js';

// Define test cases
const testCases = [
  { currentTime: '2024-11-25T05:00:00', sunrise: '2024-11-25T07:00:00', sunset: '2024-11-25T18:00:00', expected: 'night' },
  { currentTime: '2024-11-25T08:00:00', sunrise: '2024-11-25T07:00:00', sunset: '2024-11-25T18:00:00', expected: 'morning' },
  { currentTime: '2024-11-25T12:00:00', sunrise: '2024-11-25T07:00:00', sunset: '2024-11-25T18:00:00', expected: 'afternoon' },
  { currentTime: '2024-11-25T19:00:00', sunrise: '2024-11-25T07:00:00', sunset: '2024-11-25T18:00:00', expected: 'evening' },
  { currentTime: '2024-11-25T23:00:00', sunrise: '2024-11-25T07:00:00', sunset: '2024-11-25T18:00:00', expected: 'night' },
];

// Run test cases
testCases.forEach(({ currentTime, sunrise, sunset, expected }) => {
  const result = getTimeOfDay(currentTime, sunrise, sunset);
  console.log(`Time: ${currentTime} | Sunrise: ${sunrise} | Sunset: ${sunset}`);
  console.log(`Expected: ${expected} | Result: ${result}`);
  console.log(result === expected ? '✅ Test Passed' : '❌ Test Failed');
});
