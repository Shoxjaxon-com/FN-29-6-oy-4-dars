import React, { useState } from "react";
import logo from "./assets/todo.png";
import logo1 from "./assets/logo2.svg";

export default function App() {
  // Boshlang'ich state
  const initialState = {
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    employees: "",
    description: "",
    image: logo,
  };

  const [companyData, setCompanyData] = useState(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null); // Yuborilgan ma'lumotlarni saqlash

  // Input qiymatlarini yangilash funksiyasi
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
  };

  // Rasm yuklash funksiyasi
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompanyData({ ...companyData, image: URL.createObjectURL(file) });
    }
  };

  // Formani yuborish funksiyasi
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(companyData); // Yuborilgan ma'lumotlarni saqlash
    setIsSubmitted(true);
    setCompanyData(initialState); // Formani tozalash
  };

  return (
    <div>
      {/* Header bo'limi */}
      <header className="bg-blue-700 mb-14 p-5 flex justify-between items-center">
        <img src={logo1} alt="Logo" />
        <nav>
          <ul className="flex gap-6 text-white">
            <li><a href="#">Vakansiyalar</a></li>
            <li><a href="#">Kandidatlar</a></li>
            <li><a href="#">Kompaniyalar</a></li>
            <li><a href="#">Xizmatlar</a></li>
            <li><a href="#">Ta’lim</a></li>
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <select className="select bg-blue-700 text-white">
            <option disabled>Select language</option>
            <option>Ozbek</option>
            <option>Rus</option>
            <option>English</option>
          </select>
          <button className="btn btn-outline bg-white text-blue-700">Boshlash</button>
        </div>
      </header>

      {/* Forma bo'limi */}
      <main className="bg-white rounded-lg shadow-md w-[778px] m-auto p-8">
        <h1 className="font-bold text-2xl mb-5">Kompaniya ma’lumotlari</h1>
        <form onSubmit={handleSubmit}>
          {/* Rasm yuklash */}
          <div className="flex items-center gap-3 mb-5">
            <img
              src={companyData.image}
              alt="Uploaded"
              className="w-16 h-16 rounded-full object-cover"
            />
            <label className="cursor-pointer text-blue-600 hover:underline">
              <input type="file" className="hidden" onChange={handleImageChange} />
              Yuklash
            </label>
          </div>

          {/* Inputlar */}
          {[
            { label: "Kompaniya nomi", name: "name", type: "text", placeholder: "Kompaniya nomi" },
            { label: "Email", name: "email", type: "email", placeholder: "Email" },
            { label: "Telefon raqami", name: "phone", type: "tel", placeholder: "UZ +9989" },
            { label: "Yashash joyi", name: "address", type: "text", placeholder: "Joy" },
            { label: "Hodimlar soni", name: "employees", type: "number", placeholder: "Hodimlar soni" },
          ].map((field, idx) => (
            <div key={idx} className="mb-5">
              <label className="block mb-1 font-medium">{field.label} *</label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={companyData[field.name]}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
          ))}

          {/* Selectlar */}
          <div className="flex gap-5 mb-5">
            <select
              className="select w-full"
              name="country"
              value={companyData.country}
              onChange={handleChange}
              required
            >
              <option disabled value="">Davlat</option>
              <option>Rassiya</option>
              <option>Italiya</option>
              <option>O’zbekiston</option>
            </select>
            <select
              className="select w-full"
              name="city"
              value={companyData.city}
              onChange={handleChange}
              required
            >
              <option disabled value="">Shahar</option>
              <option>Toshkent</option>
              <option>Maskva</option>
              <option>Farg’ona</option>
            </select>
          </div>

          {/* Textarea */}
          <div className="mb-5">
            <label className="block mb-1 font-medium">Izoh *</label>
            <textarea
              name="description"
              placeholder="Kompaniya haqida izoh qoldiring"
              value={companyData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>

          {/* Tugmalar */}
          <div className="flex justify-between">
            <button type="button" className="btn btn-outline">Ortga</button>
            <button type="submit" className="btn btn-primary">Keyingisi</button>
          </div>
        </form>
      </main>

      {/* Karta ko'rinishi */}
      {isSubmitted && submittedData && (
        <section className="card bg-base-100 w-96 shadow-xl m-auto mt-10">
          <figure>
            <img
              src={submittedData.image}
              alt="Uploaded"
              className="w-full h-48 object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{submittedData.name}</h2>
            <p>{submittedData.description}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Telefon:</strong> {submittedData.phone}</p>
            <p><strong>Davlat:</strong> {submittedData.country}</p>
            <p><strong>Shahar:</strong> {submittedData.city}</p>
            <p><strong>Hodimlar:</strong> {submittedData.employees}</p>
          </div>
        </section>
      )}
    </div>
  );
}
