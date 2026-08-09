"use client";

import React, { useState, useRef, useCallback } from "react";
import { X, Upload as UploadIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const COUNTRIES = [
  { name: "Afghanistan", code: "+93", flag: "🇦🇫" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "Bangladesh", code: "+880", flag: "🇧🇩" },
  { name: "Brazil", code: "+55", flag: "🇧🇷" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "China", code: "+86", flag: "🇨🇳" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "Indonesia", code: "+62", flag: "🇮🇩" },
  { name: "Italy", code: "+39", flag: "🇮🇹" },
  { name: "Japan", code: "+81", flag: "🇯🇵" },
  { name: "Malaysia", code: "+60", flag: "🇲🇾" },
  { name: "Mexico", code: "+52", flag: "🇲🇽" },
  { name: "Netherlands", code: "+31", flag: "🇳🇱" },
  { name: "New Zealand", code: "+64", flag: "🇳🇿" },
  { name: "Nigeria", code: "+234", flag: "🇳🇬" },
  { name: "Pakistan", code: "+92", flag: "🇵🇰" },
  { name: "Philippines", code: "+63", flag: "🇵🇭" },
  { name: "Russia", code: "+7", flag: "🇷🇺" },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
  { name: "Singapore", code: "+65", flag: "🇸🇬" },
  { name: "South Africa", code: "+27", flag: "🇿🇦" },
  { name: "South Korea", code: "+82", flag: "🇰🇷" },
  { name: "Spain", code: "+34", flag: "🇪🇸" },
  { name: "Sri Lanka", code: "+94", flag: "🇱🇰" },
  { name: "Sweden", code: "+46", flag: "🇸🇪" },
  { name: "Thailand", code: "+66", flag: "🇹🇭" },
  { name: "Turkey", code: "+90", flag: "🇹🇷" },
  { name: "UAE", code: "+971", flag: "🇦🇪" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "Vietnam", code: "+84", flag: "🇻🇳" },
];

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Experience {
  id: number;
  title: string;
  company: string;
  organization: string;
  description: string;
  from: string;
  to: string;
  currentlyWorking: boolean;
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  from: string;
  to: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CareerApplicationForm({ jobTitle }: { jobTitle: string }) {
  let nextId = useRef(1);

  /* --- form state --- */
  const [personal, setPersonal] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
  });
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [linkedin, setLinkedin] = useState("");
  const [fileName, setFileName] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  /* --- handlers --- */
  const handlePersonal = (field: string, value: string) =>
    setPersonal((p) => ({ ...p, [field]: value }));

  const addExperience = () =>
    setExperiences((prev) => [
      ...prev,
      { id: nextId.current++, title: "", company: "", organization: "", description: "", from: "", to: "", currentlyWorking: false },
    ]);

  const updateExperience = (id: number, field: keyof Experience, value: string | boolean) =>
    setExperiences((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  const removeExperience = (id: number) =>
    setExperiences((prev) => prev.filter((e) => e.id !== id));

  const addEducation = () =>
    setEducation((prev) => [
      ...prev,
      { id: nextId.current++, degree: "", institution: "", from: "", to: "" },
    ]);

  const updateEducation = (id: number, field: keyof Education, value: string) =>
    setEducation((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  const removeEducation = (id: number) =>
    setEducation((prev) => prev.filter((e) => e.id !== id));

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setFileName(file.name);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting:", { personal, experiences, education, linkedin, fileName });
  };

  /* --- shared styles --- */
  const inputCls =
    "w-full bg-white border border-neutral-200 px-3 py-2 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-neutral-300 focus:outline-none";
  const labelCls = "block text-sm font-medium text-neutral-700 mb-1";

  /* ================================================================== */
  /*  RENDER                                                            */
  /* ================================================================== */

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {/* ───────── PAGE TITLE ───────── */}
      <h1 className="font-test-tiempos-fine text-2xl lg:text-[2rem] font-medium text-neutral-900">{jobTitle}</h1>

      {/* ───────── LINKEDIN BANNER ───────── */}
      <div className="mt-8 flex items-center justify-between gap-4 rounded bg-blue-50 border border-blue-100 px-4 py-3">
        <div className="flex items-center gap-3">
          {/* LinkedIn icon */}
          <svg className="size-6 shrink-0" viewBox="0 0 24 24" fill="#0A66C2">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-neutral-800">Apply with LinkedIn</p>
            <p className="text-xs text-neutral-500">
              Fill your information automatically from your LinkedIn profile.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="shrink-0 rounded bg-[#0A66C2] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#004182]"
        >
          Apply With LinkedIn
        </button>
      </div>

      {/* ════════════════════════════════════════════════════════════
          PERSONAL INFORMATION
         ════════════════════════════════════════════════════════════ */}
      <div className="mt-8 border border-neutral-200">
        {/* Section header */}
        <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3">
          <h2 className="text-sm font-semibold text-neutral-800">Personal Information</h2>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* First Name */}
            <div>
              <label className={labelCls}>
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="First Name"
                value={personal.firstName}
                onChange={(e) => handlePersonal("firstName", e.target.value)}
                className={inputCls}
              />
            </div>

            {/* Last Name */}
            <div>
              <label className={labelCls}>
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Last Name"
                value={personal.lastName}
                onChange={(e) => handlePersonal("lastName", e.target.value)}
                className={inputCls}
              />
            </div>

            {/* Email */}
            <div>
              <label className={labelCls}>
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="Email address"
                value={personal.email}
                onChange={(e) => handlePersonal("email", e.target.value)}
                className={inputCls}
              />
            </div>

            {/* Phone */}
            <div>
              <label className={labelCls}>
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <select
                  value={personal.country}
                  onChange={(e) => handlePersonal("phone", e.target.value)}
                  className="w-20 shrink-0 rounded-l border border-neutral-200 bg-white py-2 pl-2 pr-1 text-sm text-neutral-700 focus:outline-none"
                >
                  <option value="">Code</option>
                  {COUNTRIES.map((c) => (
                    <option key={c.code + c.name} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  required
                  placeholder="Phone Number"
                  value={personal.phone}
                  onChange={(e) => handlePersonal("phone", e.target.value)}
                  className={`${inputCls} rounded-l-none`}
                />
              </div>
            </div>

            {/* Country / Region */}
            <div>
              <label className={labelCls}>
                Country/Region <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={personal.country}
                onChange={(e) => handlePersonal("country", e.target.value)}
                className={inputCls}
              >
                <option value="">Select Country/Region</option>
                {COUNTRIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className={labelCls}>
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="City"
                value={personal.city}
                onChange={(e) => handlePersonal("city", e.target.value)}
                className={inputCls}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          EXPERIENCE
         ════════════════════════════════════════════════════════════ */}
      <div className="mt-8 border border-neutral-200">
        {/* Section header */}
        <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-3">
          <div className="flex items-center gap-2">
            {/* Briefcase icon */}
            <svg
              className="size-4 text-neutral-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <h2 className="text-sm font-semibold text-neutral-800">Experience</h2>
          </div>
          <button
            type="button"
            onClick={addExperience}
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
          >
            + Add
          </button>
        </div>

        {/* Experience entries */}
        {experiences.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-neutral-400">
            No experience added yet. Click &ldquo;+ Add&rdquo; to add your work experience.
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {experiences.map((exp) => (
              <div key={exp.id} className="p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Title */}
                  <div>
                    <label className={labelCls}>
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Title"
                      value={exp.title}
                      onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                      className={inputCls}
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className={labelCls}>
                      Company <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                      className={inputCls}
                    />
                  </div>

                  {/* Organization */}
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Organization</label>
                    <input
                      type="text"
                      placeholder="Amanat Shah Group ASG"
                      value={exp.organization}
                      onChange={(e) => updateExperience(exp.id, "organization", e.target.value)}
                      className={inputCls}
                    />
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Description</label>
                    <textarea
                      placeholder="Describe your role and responsibilities..."
                      rows={3}
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  {/* From */}
                  <div>
                    <label className={labelCls}>
                      From <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={exp.from}
                      onChange={(e) => updateExperience(exp.id, "from", e.target.value)}
                      className={inputCls}
                    />
                  </div>

                  {/* To */}
                  <div>
                    <label className={labelCls}>
                      To <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      disabled={exp.currentlyWorking}
                      value={exp.to}
                      onChange={(e) => updateExperience(exp.id, "to", e.target.value)}
                      className={`${inputCls} disabled:cursor-not-allowed disabled:bg-neutral-50`}
                    />
                  </div>

                  {/* Currently working checkbox */}
                  <div className="flex items-center gap-2 sm:col-span-2">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      checked={exp.currentlyWorking}
                      onChange={(e) =>
                        updateExperience(exp.id, "currentlyWorking", e.target.checked)
                      }
                      className="size-4 rounded border-neutral-300 accent-neutral-700"
                    />
                    <label
                      htmlFor={`current-${exp.id}`}
                      className="text-sm text-neutral-600"
                    >
                      I currently work here
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 sm:col-span-2">
                    <button
                      type="button"
                      onClick={() => removeExperience(exp.id)}
                      className="rounded border border-neutral-200 bg-white px-4 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-neutral-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="rounded bg-neutral-800 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-neutral-900"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════════════════════════
          EDUCATION
         ════════════════════════════════════════════════════════════ */}
      <div className="mt-8 border border-neutral-200">
        {/* Section header */}
        <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-3">
          <div className="flex items-center gap-2">
            {/* Graduation cap icon */}
            <svg
              className="size-4 text-neutral-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
            </svg>
            <h2 className="text-sm font-semibold text-neutral-800">Education</h2>
          </div>
          <button
            type="button"
            onClick={addEducation}
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
          >
            + Add
          </button>
        </div>

        {/* Education entries */}
        {education.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-neutral-400">
            No education added yet. Click &ldquo;+ Add&rdquo; to add your education.
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {education.map((edu) => (
              <div key={edu.id} className="p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Degree */}
                  <div>
                    <label className={labelCls}>
                      Degree <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                      className={inputCls}
                    />
                  </div>

                  {/* Institution */}
                  <div>
                    <label className={labelCls}>
                      Institution <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                      className={inputCls}
                    />
                  </div>

                  {/* From */}
                  <div>
                    <label className={labelCls}>
                      From <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={edu.from}
                      onChange={(e) => updateEducation(edu.id, "from", e.target.value)}
                      className={inputCls}
                    />
                  </div>

                  {/* To */}
                  <div>
                    <label className={labelCls}>
                      To <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={edu.to}
                      onChange={(e) => updateEducation(edu.id, "to", e.target.value)}
                      className={inputCls}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 sm:col-span-2">
                    <button
                      type="button"
                      onClick={() => removeEducation(edu.id)}
                      className="rounded border border-neutral-200 bg-white px-4 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-neutral-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="rounded bg-neutral-800 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-neutral-900"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════════════════════════
          YOUR PROFILES
         ════════════════════════════════════════════════════════════ */}
      <div className="mt-8 border border-neutral-200">
        <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3">
          <h2 className="text-sm font-semibold text-neutral-800">Your profiles</h2>
        </div>

        <div className="p-4">
          <label className={labelCls}>LinkedIn</label>
          <input
            type="url"
            placeholder="https://www.linkedin.com/in/your-profile"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          CV / RESUME UPLOAD
         ════════════════════════════════════════════════════════════ */}
      <div className="mt-8">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center rounded border-2 border-dashed px-6 py-10 transition-colors ${
            dragOver ? "border-neutral-400 bg-neutral-50" : "border-neutral-200 bg-neutral-50/50"
          }`}
        >
          <UploadIcon className="mb-3 size-8 text-neutral-400" strokeWidth={1.5} />
          <p className="text-sm font-medium text-neutral-700">Upload your CV/Resume</p>
          <p className="mt-1 text-xs text-neutral-500">
            Drag and drop, or{" "}
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="font-medium text-neutral-700 underline underline-offset-2"
            >
              browse
            </button>
          </p>
          <p className="mt-1 text-xs text-neutral-400">PDF, DOC, DOCX, JPG, PNG (Max 5MB)</p>

          {fileName && (
            <div className="mt-3 flex items-center gap-2 rounded bg-neutral-100 px-3 py-1.5 text-sm text-neutral-700">
              <span className="truncate max-w-[16rem]">{fileName}</span>
              <button
                type="button"
                onClick={() => setFileName("")}
                className="text-neutral-400 hover:text-neutral-600"
              >
                <X className="size-3.5" />
              </button>
            </div>
          )}

          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          SUBMIT
         ════════════════════════════════════════════════════════════ */}
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded bg-neutral-800 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-900"
        >
          Submit Application
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </form>
  );
}
