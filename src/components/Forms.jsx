import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api";

function FormComponent() {
  const [formData, setFormData] = useState({
    fullName: "",
    lawArea: [],
    barCouncilNumber: "",
    region: "",
    experience: 0, // Change to number type
    languages: [],
    lawCertificate: null, // Change to file/image type
    charges: 0, // Change to number type
    consultingDuration: "",
    consultingTime: "",
    qualification: "",
    biography: "",
    emailId: "",
    mobileNumber: "",
    profilePic: null,
  });
  const navigate = useNavigate();

  const [fileErrors, setFileErrors] = useState({
    lawCertificate: "",
    profilePic: "",
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const allowedFileTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (files[0]) {
      if (!allowedFileTypes.includes(files[0].type)) {
        setFileErrors((prevErrors) => ({
          ...prevErrors,
          [name]:
            "Invalid file type. Please select a valid file type (e.g., PDF, DOC, DOCX, JPEG, PNG).",
        }));
      } else if (files[0].size > maxSize) {
        setFileErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "File size exceeds the maximum limit (5MB).",
        }));
      } else {
        setFileErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      // Handle checkbox inputs (lawArea options)
      const isChecked = checked;
      setFormData((prevData) => ({
        ...prevData,
        lawArea: isChecked
          ? [...prevData.lawArea, value]
          : prevData.lawArea.filter((lawArea) => lawArea !== value),
      }));
    } else if (type === "file") {
      // Handle file input for law certificates and profile picture
      if (name === "lawCertificate" || name === "profilePic") {
        handleFileChange(e);
        setFormData((prevData) => ({
          ...prevData,
          [name]: files[0] || null,
        }));
      }
    } else {
      // Handle other inputs
      setFormData((prevData) => ({
        ...prevData,

        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };

  async function post(url, formData) {
    const response = await client.post(url, formData);
    console.log(response?.data);
    const id = response?.data?._id;
    navigate(`/${id}`);
  }

  async function upload(file) {
    const { url } = await fetch("http://127.0.0.1:5000/s3Url").then((res) =>
      res.json()
    );
    console.log(url);

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    const imageUrl = url.split("?")[0];
    console.log(imageUrl);
    return imageUrl;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your server route
      let newLawyer = { ...formData };
      console.log(newLawyer);
      console.log(formData.profilePic);

      if (fileErrors.lawCertificate || fileErrors.profilePic) {
        console.error("File upload errors. Please fix them before submitting.");
        return;
      }
      const profilPicImageUrl = await upload(formData.profilePic);
      newLawyer.profilePic = profilPicImageUrl;

      const response = await post("/lawyers", newLawyer);
      // Handle the response as needed
      // console.log("Server response:", response?.data);

      // Reset the form after successful submission
      setFormData({
        fullName: "",
        lawArea: [],
        barCouncilNumber: "",
        region: "",
        experience: 0,
        languages: [],
        lawCertificate: null,
        charges: 0,
        consultingDuration: "",
        consultingTime: "",
        qualification: "",
        biography: "",
        emailId: "",
        mobileNumber: "",
        profilePic: null,
      });
    } catch (error) {
      // Handle any errors here
      console.error("Error:", error);
    }
  };

  // Define an array of lawArea options
  const lawOptions = ["Corporate", "Property", "Family", "Tax", "Criminal"];

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            placeholder="Advocate Vishal Vikram Rana"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label h-6">Law Area</label>
          <div className="d-flex flex-wrap">
            {lawOptions.map((lawArea) => (
              <div key={lawArea} className="form-check form-check-inline">
                <input
                  type="checkbox"
                  id={lawArea.toLowerCase()}
                  name="lawArea"
                  value={lawArea.toLowerCase()}
                  checked={formData.lawArea.includes(lawArea.toLowerCase())}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label
                  htmlFor={lawArea.toLowerCase()}
                  className="form-check-label"
                >
                  {lawArea}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="barCouncilNumber" className="form-label">
            Bar Council Number
          </label>
          <input
            type="text"
            className="form-control"
            id="barCouncilNumber"
            name="barCouncilNumber"
            placeholder="BR/19**/20**"
            value={formData.barCouncilNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="region" className="form-label">
            Region
          </label>
          <input
            type="text"
            className="form-control"
            id="region"
            name="region"
            placeholder="Patna"
            value={formData.region}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="experience" className="form-label">
            Work Experience (yrs)
          </label>
          <input
            type="number"
            className="form-control"
            id="experience"
            name="experience"
            placeholder="2" //
            value={formData.experience}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="languages" className="form-label">
            Languages
          </label>
          <input
            type="text"
            className="form-control"
            id="languages"
            name="languages"
            placeholder="English, Hindi, Kanada"
            value={formData.languages}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lawCertificate" className="form-label">
            Law Certificates
          </label>
          <input
            type="file"
            className="form-control"
            id="lawCertificate"
            name="lawCertificate"
            accept=".pdf, .doc, .docx"
            onChange={handleChange}
          />
          {fileErrors.lawCertificate && (
            <p className="text-danger">{fileErrors.lawCertificate}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="charges" className="form-label">
            Charge (in rupees)
          </label>
          <input
            type="number"
            className="form-control"
            id="charges"
            name="charges"
            value={formData.charges}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="consultingDuration" className="form-label">
            Consulting Duration (in minutes)
          </label>
          <input
            type="number"
            className="form-control"
            id="consultingDuration"
            name="consultingDuration"
            value={formData.consultingDuration}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Consulting Time</label>
          <div className="d-flex">
            <div className="me-3">
              <label htmlFor="consultingStartTime" className="form-label">
                Start Time
              </label>
              <input
                type="time"
                className="form-control"
                id="consultingStartTime"
                name="consultingStartTime"
                value={formData.consultingStartTime}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="consultingEndTime" className="form-label">
                End Time
              </label>
              <input
                type="time"
                className="form-control"
                id="consultingEndTime"
                name="consultingEndTime"
                value={formData.consultingEndTime}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="biography" className="form-label">
            Biography
          </label>
          <textarea
            className="form-control"
            id="biography"
            name="biography"
            rows="4"
            value={formData.biography}
            placeholder="Advocate Vishal Vikram Rana completed his law in the year 2016 and has been providing services in various fields of law, that is, Labour & Service, Family, Divorce, Child Custody, Consumer Court and drafting and vetting of various agreements and documents.

Advocate Vishal enrolled with the Bar Council of Bihar in 2016. He is a member of the Patna High Court Bar Association."
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="emailId" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="emailId"
            name="emailId"
            value={formData.emailId}
            placeholder="vi***@gmail.com"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mobileNumber" className="form-label">
            Mobile Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            placeholder="911***27**"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="profilePic" className="form-label">
            Profile Picture
          </label>
          <input
            type="file"
            className="form-control"
            id="profilePic"
            name="profilePic"
            accept="image/*"
            onChange={handleChange}
          />
          {fileErrors.profilePic && (
            <p className="text-danger">{fileErrors.profilePic}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-100"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormComponent;
