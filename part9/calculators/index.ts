import express from 'express';
import { calculateBmi, BMIData } from './bmiCalculator';
import { CalculExercisions } from './exerciseCalculator';


const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    res.status(400).json({ error: 'malformatted parameters' });
  } else {
    const bmiData: BMIData = calculateBmi(height, weight);
    res.json(bmiData);
  }
});

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
      return res.status(400).json({ error: 'parameters missing' });
    }

    if (!Array.isArray(daily_exercises) || !daily_exercises.every(Number.isFinite) || typeof target !== 'number') {
      return res.status(400).json({ error: 'malformatted parameters' });
    }

    const result = CalculExercisions(target, daily_exercises);
    return res.json(result);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
