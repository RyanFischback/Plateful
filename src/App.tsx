import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MealPlan from "./routes/MealPlan/mealPlan";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MealPlan />} />
      </Routes>
    </Router>
  );
}

export default App;
