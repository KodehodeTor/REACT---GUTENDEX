import { categories } from "../data/categories.js";

export default function CategoryMenu({ selectedCatagory, categoryChange }) {
  return (
    <select
      value={selectedCatagory}
      onChange={(e) => categoryChange(e.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category.toLowerCase()}>
          {category}
        </option>
      ))}
    </select>
  );
}
