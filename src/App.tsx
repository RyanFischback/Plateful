import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MealPlan from "./routes/MealPlan/mealPlan";
import Layout from "./components/Layout";
import "./styles/main.scss";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MealPlan />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
