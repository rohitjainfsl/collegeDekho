import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AddCategoryPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get("/category/get").then((res) => setCategories(res.data.categories));
  }, []);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    return e;
  };

  //   const handleChange = (e) => {
  //     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  //     setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  //   };

  const checkExisting = (e) => {
    const c = categories.find(
      (c) => c.name.toLowerCase() === name.trim().toLowerCase(),
    );
    if (c) {
      setErrors((prev) => ({ ...prev, name: "Category already exists" }));
    } else {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/category/add", { name });
      navigate("/");
    } catch (err) {
      setErrors({
        server: err.response?.data?.message ?? "Something went wrong",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Add New Category
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm space-y-5"
      >
        {errors.server && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-md p-3">
            {errors.server}
          </p>
        )}

        <Field label="Category Name" error={errors.name}>
          <input
            autoFocus
            name="name"
            value={name}
            className={input(errors.name)}
            placeholder="e.g. Electronics"
            onChange={(e) => setName(e.target.value)}
            onBlur={checkExisting}
          />
        </Field>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-gray-900 text-white py-2.5 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            {submitting ? "Saving…" : "Add Category"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

const input = (error) =>
  `w-full border ${error ? "border-red-400" : "border-gray-300"} rounded-md px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 transition`;
