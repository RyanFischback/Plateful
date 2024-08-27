import React, { useState } from "react";

const MealTypeOptions = ["Breakfast", "Lunch", "Dinner", "Snack"];
const DietaryPreferenceOptions = ["Vegetarian", "Vegan", "Gluten-Free", "None"];

function MealPlan() {
  const [dietaryPreference, setDietaryPreference] = useState<string>("");
  const [allergies, setAllergies] = useState<string>("");
  const [mealType, setMealType] = useState<string>("");
  const [mealsPerDay, setMealsPerDay] = useState<number>(3);
  const [calories, setCalories] = useState<string>("");
  const [cuisinePreference, setCuisinePreference] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [cookingTime, setCookingTime] = useState<string>("");
  const [ingredientsOnHand, setIngredientsOnHand] = useState<string>("");
  const [exclusions, setExclusions] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [mealPlan, setMealPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const validateFields = () => {
    const newErrors: string[] = [];
    if (!dietaryPreference.trim())
      newErrors.push("Dietary Preference is required.");
    if (!mealType.trim()) newErrors.push("Meal Type is required.");
    if (mealsPerDay < 1) newErrors.push("Meals Per Day must be at least 1.");
    if (!calories || parseInt(calories) <= 0)
      newErrors.push("Calories must be a positive number.");
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;
    setLoading(true);
    const mealPlanData = {
      dietaryPreference,
      allergies,
      mealType,
      mealsPerDay,
      calories,
      cuisinePreference,
      budget,
      cookingTime,
      ingredientsOnHand,
      exclusions,
    };

    try {
      const response = await fetch("/api/openai/generateMealPlan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mealPlanData),
      });

      if (!response.ok) throw new Error("Failed to generate meal plan.");
      const result = await response.json();
      setMealPlan(result);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="meal-plan-page">
      <form onSubmit={(e) => e.preventDefault()} className="meal-form">
        <div className="form-grid">
          <div className="required-section">
            <h2 className="form-title">Required Fields</h2>
            {errors.length > 0 && (
              <div className="error-messages">
                {errors.map((error, index) => (
                  <p key={index} className="error-message">
                    {error}
                  </p>
                ))}
              </div>
            )}
            <label className="form-label">
              Dietary Preference:
              <select
                value={dietaryPreference}
                onChange={(e) => setDietaryPreference(e.target.value)}
                className="form-input"
                required
              >
                <option value="">Select</option>
                {DietaryPreferenceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="form-label">
              Meal Type:
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="form-input"
                required
              >
                <option value="">Select</option>
                {MealTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="form-label">
              Meals Per Day:
              <input
                type="number"
                value={mealsPerDay}
                onChange={(e) => setMealsPerDay(parseInt(e.target.value))}
                className="form-input"
                min="1"
                required
              />
            </label>
            <label className="form-label">
              Daily Caloric Goal:
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="form-input"
                placeholder="e.g., 2000"
                required
              />
            </label>
          </div>

          <div className="optional-section">
            <h2 className="form-title">Optional Fields</h2>
            <label className="form-label">
              Allergies/Intolerances:
              <input
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="form-input"
                placeholder="e.g., Gluten, Dairy"
              />
            </label>
            <label className="form-label">
              Cuisine Preference:
              <input
                type="text"
                value={cuisinePreference}
                onChange={(e) => setCuisinePreference(e.target.value)}
                className="form-input"
                placeholder="e.g., Italian, Indian"
              />
            </label>
            <label className="form-label">
              Budget Constraints:
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="form-input"
                placeholder="e.g., Low budget"
              />
            </label>
            <label className="form-label">
              Cooking Time Available (minutes):
              <input
                type="number"
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.value)}
                className="form-input"
                placeholder="e.g., 30"
              />
            </label>
            <label className="form-label">
              Ingredients on Hand:
              <input
                type="text"
                value={ingredientsOnHand}
                onChange={(e) => setIngredientsOnHand(e.target.value)}
                className="form-input"
                placeholder="e.g., Chicken, Rice"
              />
            </label>
            <label className="form-label">
              Specific Exclusions:
              <input
                type="text"
                value={exclusions}
                onChange={(e) => setExclusions(e.target.value)}
                className="form-input"
                placeholder="e.g., Nuts, Shellfish"
              />
            </label>
          </div>
        </div>
        <button
          type="button"
          className="form-button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <div className="spinner"></div> : "Generate Meal Plan"}
        </button>
      </form>

      {mealPlan && (
        <div className="meal-plan-result">
          <h2 className="result-title">Your Meal Plan</h2>
          <div className="result-content">
            <p>{mealPlan}</p>
          </div>
        </div>
      )}
      <button
        className="fab"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>
    </div>
  );
}

export default MealPlan;
