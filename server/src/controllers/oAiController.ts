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

    // Combine the user input into a single string (combinedContent)
    const combinedContent = `
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
          content:
            "You are an AI-powered meal planner. Your task is to generate personalized meal plans based on user input. The user will provide preferences such as dietary restrictions, allergies, meal types, caloric goals, and other optional details. You should prioritize generating meal plans that are nutritious, easy to prepare, and align with the user's input. When generating meal plans: 1. Provide a variety of meals for different times of the day (e.g., breakfast, lunch, dinner). 2. Ensure that meals follow dietary restrictions and allergies provided by the user. 3. Adjust portion sizes and ingredient choices to meet the user’s caloric goal. 4. Suggest alternatives or optional ingredients if specific preferences or exclusions are mentioned. 5. Incorporate budget and time constraints where applicable.",
        },
        { role: "user", content: combinedContent },
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
