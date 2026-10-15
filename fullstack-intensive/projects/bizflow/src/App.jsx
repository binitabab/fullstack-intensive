import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import { DashboardPage } from "./pages/DashboardPage.jsx";
import { CustomersPage } from "./pages/CustomersPage.jsx";

/**
 * App = route table.
 * URL path → which page component to show inside Layout.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="customers" element={<CustomersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
