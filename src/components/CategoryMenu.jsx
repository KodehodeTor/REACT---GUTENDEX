import { categories } from "../data/categories.js";

// Category Menu function
export default function CategoryMenu({ selectedCatagory, categoryChange }) {
  return (
    // Set the selected catagory.
    <select
      value={selectedCatagory}
      // Update the selected catagory
      onChange={(e) => categoryChange(e.target.value)}
    >
      {/* Option to display all categories */}
      <option value="">All Categories</option>
      {categories.map((category) => (
        // Maps through catagory array to generate dropdown menu.
        <option key={category} value={category.toLowerCase()}>
          {category}
        </option>
      ))}
    </select>
  );
}
