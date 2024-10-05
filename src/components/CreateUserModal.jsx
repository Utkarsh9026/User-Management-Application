import { useState } from "react";
import { createUser } from "../services/userService";

const CreateUserModal = ({ onClose, onUserCreated }) => {
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    username: `USER-${Date.now()}`,
    address: {
      street: "",
      city: "",
    },
    company: "",
    website: "",
  };

  // Validating the details before creating it and also handling errors
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!formData.name || formData.name.length < 3) {
      errors.name = "Name must be at least 3 characters";
    }
    if (
      !formData.email ||
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)
    ) {
      errors.email = "Enter a valid email";
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Enter a valid 10-digit phone number";
    }
    if (!formData.address.street) {
      errors.street = "Street is required";
    }
    if (!formData.address.city) {
      errors.city = "City is required";
    }
    if (formData.company && formData.company.length < 3) {
      errors.company = "Company name must be at least 3 characters";
    }
    if (
      formData.website &&
      !/^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6}\.?)(\/[\w.-]*)*\/?$/.test(
        formData.website
      )
    ) {
      errors.website = "Enter a valid URL";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    createUser(formData)
      .then((newUser) => {
        onUserCreated(newUser);
        onClose();
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white max-w-sm  max-h-[calc(100vh-200px)] overflow-y-auto p-6 rounded-md w-full md:max-w-lg">
        <h2 className="text-xl mb-4">Create User</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-bold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-bold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-sm font-bold">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-bold">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              disabled
              className="w-full border rounded p-2 bg-gray-200 cursor-not-allowed"
            />
          </div>

          {/* Address - Street */}
          <div className="mb-4">
            <label className="block text-sm font-bold">Street</label>
            <input
              type="text"
              name="street"
              value={formData.address.street}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  address: { ...prev.address, street: e.target.value },
                }))
              }
              className="w-full border rounded p-2"
              required
            />
            {errors.street && (
              <p className="text-red-500 text-sm">{errors.street}</p>
            )}
          </div>

          {/* Address - City */}
          <div className="mb-4">
            <label className="block text-sm font-bold">City</label>
            <input
              type="text"
              name="city"
              value={formData.address.city}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  address: { ...prev.address, city: e.target.value },
                }))
              }
              className="w-full border rounded p-2"
              required
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>

          {/* Company Name */}
          <div className="mb-4">
            <label className="block text-sm font-bold">Company Name</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {errors.company && (
              <p className="text-red-500 text-sm">{errors.company}</p>
            )}
          </div>

          {/* Website */}
          <div className="mb-4">
            <label className="block text-sm font-bold">Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {errors.website && (
              <p className="text-red-500 text-sm">{errors.website}</p>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 text-red-500"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
