import OpenAI from "openai";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

const openai = new OpenAI({
  organization: "org-qOo3S3vv5AmPTFQe1qs4OaJz",
  project: process.env.PROJECT_ID,
});

export const generateMealPlan = async (req: Request, res: Response) => {
  try {
    // Extract user input from the request body
    const {
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
    } = req.body;

    // Prepare the user input content
    const userInput = `
      Dietary Preference: ${dietaryPreference || "None"}
      Allergies/Intolerances: ${allergies || "None"}
      Meal Type: ${mealType || "Not specified"}
      Meals Per Day: ${mealsPerDay || "Not specified"}
      Daily Caloric Goal: ${calories || "Not specified"}
      Cuisine Preference: ${cuisinePreference || "None"}
      Budget Constraints: ${budget || "None"}
      Cooking Time Available: ${cookingTime || "Not specified"}
      Ingredients on Hand: ${ingredientsOnHand || "None"}
      Specific Exclusions: ${exclusions || "None"}
    `;

    // Make the API call to OpenAI
    const request = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an advanced AI meal planner. Your goal is to generate highly personalized meal plans based on detailed user input. Utilize all provided information to create meal plans that are not only nutritious but also tailored to the user’s specific needs and preferences. Here are the guidelines for generating the meal plans:

            1. **Prioritize User Input**: Incorporate all aspects of the user’s input, including dietary preferences, allergies, meal types, caloric goals, and any other provided details.
            2. **Variety and Completeness**: Offer a variety of meals suitable for different times of the day (breakfast, lunch, dinner). Ensure the meal plans are comprehensive and balanced.
            3. **Personalization**: Ensure that the meal plans respect dietary restrictions and allergies. Adjust portion sizes and ingredients to meet caloric goals.
            4. **Flexibility**: Suggest alternatives or optional ingredients if the user mentions specific preferences or exclusions.
            5. **Constraints**: Incorporate budget constraints and cooking time where applicable, providing options that fit within these constraints.
            6. **Clarity and Detail**: Provide clear and detailed meal plans with ingredients and preparation steps if needed. Aim for simplicity and ease of preparation, keeping the user’s cooking skills in mind.`,
        },
        { role: "user", content: userInput },
      ],
      max_tokens: 3000,
    });

    // Return the generated meal plan as the response
    res.json(request.choices[0].message.content);
  } catch (error: any) {
    if (error.status === 429) {
      res.status(429).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};
