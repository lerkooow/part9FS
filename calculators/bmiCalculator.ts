export function calculateBmi(height: number, weight: number): BMIData {
  const count = weight / ((height * height) / 10000);
  let bmiCategory = "";

  if (count < 18.4) {
    bmiCategory = "Underweight"
  } else if (count >= 18.5 && count <= 24.9) {
    bmiCategory = "Normal (healthy weight)"
  } else if (count >= 25 && count <= 29.9) {
    bmiCategory = "Overweight"
  } else if (count >= 30 && count <= 34.9) {
    bmiCategory = "Obese"
  } else if (count >= 35) {
    bmiCategory = "Extremely obese"
  }

  const bmiData: BMIData = {
    weight,
    height,
    bmi: bmiCategory,
  };

  return bmiData;
}

export interface BMIData {
    weight: number;
    height: number;
    bmi: string;
}