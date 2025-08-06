
const categories = [
  { name: "Alle" },
  { name: "Eiscreme" },
  { name: "Eier" },
  { name: "Obst & Gemüse" },
  { name: "Teig- & Backwaren" },
  { name: "Milchprodukte" },
  { name: "Metzgereiprodukte" },
  { name: "Fahrradschläuche" },
];

const CategoryFilter = ({ selected, setSelected }) => (
  <div style={{ padding: '10px' }}>
    <select value={selected} onChange={(e) => setSelected(e.target.value)}>
      {categories.map((cat) => (
        <option key={cat.name} value={cat.name}>{cat.name}</option>
      ))}
    </select>
  </div>
);

export default CategoryFilter;
