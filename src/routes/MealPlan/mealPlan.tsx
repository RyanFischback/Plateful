import React, { useState } from "react";

function MealPlan() {
  // State for form fields
  const [dietaryPreference, setDietaryPreference] = useState("");
  const [allergies, setAllergies] = useState("");
  const [mealType, setMealType] = useState("");
  const [mealsPerDay, setMealsPerDay] = useState(3);
  const [calories, setCalories] = useState("");
  const [cuisinePreference, setCuisinePreference] = useState("");
  const [budget, setBudget] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredientsOnHand, setIngredientsOnHand] = useState("");
  const [exclusions, setExclusions] = useState("");

  // State for error messages
  const [errors, setErrors] = useState<string[]>([]);

  // Validate form fields
  const validateFields = () => {
    const newErrors: string[] = [];

    if (!dietaryPreference.trim())
      newErrors.push("Dietary Preference is required.");
    if (!mealType.trim()) newErrors.push("Meal Type is required.");
    if (!mealsPerDay || mealsPerDay < 1)
      newErrors.push("Meals Per Day must be at least 1.");
    if (!calories || parseInt(calories) <= 0)
      newErrors.push("Calories must be a positive number.");

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form
    if (!validateFields()) return;

    // Prepare data
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
      // Replace with your API request logic
      const response = await fetch("/api/generateMealPlan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mealPlanData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate meal plan.");
      }

      const result = await response.json();
      console.log("Generated meal plan:", result);

      // Handle the result (e.g., display the generated plan to the user)
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="meal-plan-page">
      <form onSubmit={handleSubmit} className="meal-form">
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
            <input
              type="text"
              value={dietaryPreference}
              onChange={(e) => setDietaryPreference(e.target.value)}
              className="form-input"
              placeholder="e.g., Vegetarian"
              required
            />
          </label>

          <label className="form-label">
            Meal Type:
            <input
              type="text"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="form-input"
              placeholder="e.g., Breakfast, Lunch"
              required
            />
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
      </form>
      <button type="submit" className="form-button">
        Generate Meal Plan
      </button>
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
