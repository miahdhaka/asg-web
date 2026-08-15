"use client";

import React, { useRef, useState, useCallback, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import {
  AlertCircle,
  Building2,
  CalendarDays,
  GraduationCap,
  Link2,
  Pencil,
  Plus,
  Send,
  Trash2,
  UploadCloud,
} from "lucide-react";
import ApplicationSubmitted from "./ApplicationSubmitted";

const COUNTRIES = [
  { name: "Bangladesh", code: "+880", flag: "🇧🇩" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "Japan", code: "+81", flag: "🇯🇵" },
  { name: "Singapore", code: "+65", flag: "🇸🇬" },
  { name: "Malaysia", code: "+60", flag: "🇲🇾" },
  { name: "UAE", code: "+971", flag: "🇦🇪" },
];

interface Experience {
  id: number;
  title: string;
  company: string;
  organization: string;
  description: string;
  from: string;
  to: string;
  currentlyWorking: boolean;
  saved: boolean;
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
  description: string;
  from: string;
  to: string;
  currentlyAttending: boolean;
  saved: boolean;
}

export default function CareerApplicationForm({
  jobTitle,
  department,
  location,
}: {
  jobTitle: string;
  department: string;
  location: string;
}) {
  const nextId = useRef(2);
  const fileRef = useRef<HTMLInputElement>(null);
  const expContainerRef = useRef<HTMLDivElement>(null);
  const prevExpIdsRef = useRef<Set<number>>(new Set([1]));
  const prevSavedRef = useRef<Set<number>>(new Set());
  const eduContainerRef = useRef<HTMLDivElement>(null);
  const prevEduIdsRef = useRef<Set<number>>(new Set([100]));
  const prevEduSavedRef = useRef<Set<number>>(new Set());
  const [personal, setPersonal] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
  });

  const [phoneCountry, setPhoneCountry] = useState(COUNTRIES[0]);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: 1,
      title: "",
      company: "Amanat Shah Group A&S",
      organization: "Amanat Shah Group A&S",
      description: "",
      from: "",
      to: "",
      currentlyWorking: false,
      saved: false,
    },
  ]);

  const [education, setEducation] = useState<Education[]>([
    {
      id: 100,
      degree: "",
      institution: "",
      location: "",
      description: "",
      from: "",
      to: "",
      currentlyAttending: false,
      saved: false,
    },
  ]);
  const [linkedin, setLinkedin] = useState("");
  const [fileName, setFileName] = useState("");
  const [dragOver, setDragOver] = useState(false);

  // Animate only newly added experience entries
  useLayoutEffect(() => {
    if (!expContainerRef.current) return;
    const currentIds = new Set(experiences.map((e) => e.id));
    const newIds = [...currentIds].filter((id) => !prevExpIdsRef.current.has(id));
    prevExpIdsRef.current = currentIds;
    if (newIds.length === 0) return;
    const newEls = newIds
      .map((id) => expContainerRef.current?.querySelector(`[data-exp-entry][data-exp-id="${id}"]`))
      .filter(Boolean) as Element[];
    if (newEls.length === 0) return;
    gsap.fromTo(newEls, { opacity: 0, y: -24 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" });
  }, [experiences]);

  // Animate content transitions (form ↔ overview)
  useLayoutEffect(() => {
    if (!expContainerRef.current) return;
    const currentSaved = new Set(experiences.filter((e) => e.saved).map((e) => e.id));
    const newlySaved = [...currentSaved].filter((id) => !prevSavedRef.current.has(id));
    const newlyUnsaved = [...prevSavedRef.current].filter((id) => !currentSaved.has(id));
    prevSavedRef.current = currentSaved;
    const idsToAnimate = new Set([...newlySaved, ...newlyUnsaved]);
    if (idsToAnimate.size === 0) return;
    idsToAnimate.forEach((id) => {
      const entry = expContainerRef.current?.querySelector(`[data-exp-id="${id}"]`);
      if (!entry) return;
      const content = newlySaved.includes(id)
        ? entry.querySelector("[data-exp-overview]")
        : entry.querySelector("[data-exp-form]");
      if (content) {
        gsap.fromTo(content, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
      }
    });
  }, [experiences]);

  // Animate only newly added education entries
  useLayoutEffect(() => {
    if (!eduContainerRef.current) return;
    const currentIds = new Set(education.map((e) => e.id));
    const newIds = [...currentIds].filter((id) => !prevEduIdsRef.current.has(id));
    prevEduIdsRef.current = currentIds;
    if (newIds.length === 0) return;
    const newEls = newIds
      .map((id) => eduContainerRef.current?.querySelector(`[data-edu-entry][data-edu-id="${id}"]`))
      .filter(Boolean) as Element[];
    if (newEls.length === 0) return;
    gsap.fromTo(newEls, { opacity: 0, y: -24 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" });
  }, [education]);

  // Animate education content transitions (form ↔ overview)
  useLayoutEffect(() => {
    if (!eduContainerRef.current) return;
    const currentSaved = new Set(education.filter((e) => e.saved).map((e) => e.id));
    const newlySaved = [...currentSaved].filter((id) => !prevEduSavedRef.current.has(id));
    const newlyUnsaved = [...prevEduSavedRef.current].filter((id) => !currentSaved.has(id));
    prevEduSavedRef.current = currentSaved;
    const idsToAnimate = new Set([...newlySaved, ...newlyUnsaved]);
    if (idsToAnimate.size === 0) return;
    idsToAnimate.forEach((id) => {
      const entry = eduContainerRef.current?.querySelector(`[data-edu-id="${id}"]`);
      if (!entry) return;
      const content = newlySaved.includes(id)
        ? entry.querySelector("[data-edu-overview]")
        : entry.querySelector("[data-edu-form]");
      if (content) {
        gsap.fromTo(content, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
      }
    });
  }, [education]);

  const updatePersonal = (
    field: keyof typeof personal,
    value: string
  ) => {
    setPersonal((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addExperience = () => {
    setExperiences((prev) => [
      ...prev,
      {
        id: nextId.current++,
        title: "",
        company: "",
        organization: "",
        description: "",
        from: "",
        to: "",
        currentlyWorking: false,
        saved: false,
      },
    ]);
  };

  const saveExperience = (id: number) => {
    if (!expContainerRef.current) {
      setExperiences((prev) => prev.map((item) => item.id === id ? { ...item, saved: true } : item));
      return;
    }
    const entry = expContainerRef.current.querySelector(`[data-exp-id="${id}"]`);
    const form = entry?.querySelector("[data-exp-form]");
    if (!form) {
      setExperiences((prev) => prev.map((item) => item.id === id ? { ...item, saved: true } : item));
      return;
    }
    gsap.to(form, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () =>
        setExperiences((prev) => prev.map((item) => (item.id === id ? { ...item, saved: true } : item))),
    });
  };

  const editExperience = (id: number) => {
    if (!expContainerRef.current) {
      setExperiences((prev) => prev.map((item) => item.id === id ? { ...item, saved: false } : item));
      return;
    }
    const entry = expContainerRef.current.querySelector(`[data-exp-id="${id}"]`);
    const overview = entry?.querySelector("[data-exp-overview]");
    if (!overview) {
      setExperiences((prev) => prev.map((item) => (item.id === id ? { ...item, saved: false } : item)));
      return;
    }
    gsap.to(overview, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () =>
        setExperiences((prev) => prev.map((item) => (item.id === id ? { ...item, saved: false } : item))),
    });
  };

  const updateExperience = (
    id: number,
    field: keyof Experience,
    value: string | boolean
  ) => {
    setExperiences((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const removeExperience = (id: number) => {
    if (!expContainerRef.current) {
      setExperiences((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    const el = expContainerRef.current.querySelector(`[data-exp-id="${id}"]`);
    if (!el) {
      setExperiences((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    gsap.to(el, {
      opacity: 0,
      height: 0,
      marginTop: 0,
      paddingTop: 0,
      duration: 0.45,
      ease: "power3.inOut",
      onComplete: () => setExperiences((prev) => prev.filter((item) => item.id !== id)),
    });
  };

  const addEducation = () => {
    setEducation((prev) => [
      ...prev,
      {
        id: nextId.current++,
        degree: "",
        institution: "",
        location: "",
        description: "",
        from: "",
        to: "",
        currentlyAttending: false,
        saved: false,
      },
    ]);
  };

  const saveEducation = (id: number) => {
    if (!eduContainerRef.current) {
      setEducation((prev) => prev.map((item) => item.id === id ? { ...item, saved: true } : item));
      return;
    }
    const entry = eduContainerRef.current.querySelector(`[data-edu-id="${id}"]`);
    const form = entry?.querySelector("[data-edu-form]");
    if (!form) {
      setEducation((prev) => prev.map((item) => item.id === id ? { ...item, saved: true } : item));
      return;
    }
    gsap.to(form, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () =>
        setEducation((prev) => prev.map((item) => (item.id === id ? { ...item, saved: true } : item))),
    });
  };

  const editEducation = (id: number) => {
    if (!eduContainerRef.current) {
      setEducation((prev) => prev.map((item) => item.id === id ? { ...item, saved: false } : item));
      return;
    }
    const entry = eduContainerRef.current.querySelector(`[data-edu-id="${id}"]`);
    const overview = entry?.querySelector("[data-edu-overview]");
    if (!overview) {
      setEducation((prev) => prev.map((item) => (item.id === id ? { ...item, saved: false } : item)));
      return;
    }
    gsap.to(overview, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () =>
        setEducation((prev) => prev.map((item) => (item.id === id ? { ...item, saved: false } : item))),
    });
  };

  const updateEducation = (
    id: number,
    field: keyof Education,
    value: string | boolean
  ) => {
    setEducation((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const removeEducation = (id: number) => {
    if (!eduContainerRef.current) {
      setEducation((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    const el = eduContainerRef.current.querySelector(`[data-edu-id="${id}"]`);
    if (!el) {
      setEducation((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    gsap.to(el, {
      opacity: 0,
      height: 0,
      marginTop: 0,
      paddingTop: 0,
      duration: 0.45,
      ease: "power3.inOut",
      onComplete: () => setEducation((prev) => prev.filter((item) => item.id !== id)),
    });
  };

  const handleFile = (file: File | undefined) => {
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB.");
      return;
    }

    setFileName(file.name);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(false);

      handleFile(e.dataTransfer.files?.[0]);
    },
    []
  );

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFile(e.target.files?.[0]);
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "instant" });

    console.log({
      personal,
      phoneCountry,
      experiences,
      education,
      linkedin,
      fileName,
    });
  };

  const hasUnsavedExp = experiences.some((e) => !e.saved);
  const hasUnsavedEdu = education.some((e) => !e.saved);

  const calcDuration = (from: string, to: string, currentlyWorking: boolean) => {
    if (!from) return "";
    const start = new Date(from);
    const end = currentlyWorking ? new Date() : to ? new Date(to) : new Date();
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const yrs = Math.floor(months / 12);
    const mos = months % 12;
    if (yrs === 0) return `${mos} mo`;
    if (mos === 0) return `${yrs} yr`;
    return `${yrs} yr ${mos} mo`;
  };

  const formatDate = (d: string) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const inputClass = "h-9 sm:h-12 w-full bg-white px-2 sm:px-4 text-xs sm:text-sm text-[#555] outline-none placeholder:text-[#b5b7b9]";

  const labelClass = "mb-1.5 block text-xs lg:text-[1.2rem] text-neutral-800";

  const showError = (key: string, value: string, required = true) =>
    required && (submitted || touched.has(key)) && !value.trim();

  const renderField = (
    key: string,
    label: string,
    value: string,
    onChange: (val: string) => void,
    opts?: { type?: string; placeholder?: string; required?: boolean; disabled?: boolean; children?: React.ReactNode; errorLabel?: string }
  ) => {
    const isRequired = opts?.required ?? true;
    const isDisabled = opts?.disabled ?? false;
    const hasError = showError(key, value, isRequired);
    return (
      <div>
        <label className={labelClass}>
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
        <div
          className={`${!isDisabled ? "input-gradient-border-hover" : ""} bg-white ${
            hasError ? "input-gradient-border-error" : ""
          }`}
        >
          {opts?.children ?? (
            <input
              required={isRequired}
              type={opts?.type ?? "text"}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onBlur={() => setTouched((prev) => new Set(prev).add(key))}
              placeholder={opts?.placeholder}
              className={inputClass}
            />
          )}
        </div>
        {hasError && (
          <p className="mt-1.5 flex items-center gap-1 text-xs lg:text-[1rem] text-red-500">
            <AlertCircle className="size-3.5 lg:size-4" />
            Please provide your {opts?.errorLabel ?? label.toLowerCase()}
          </p>
        )}
      </div>
    );
  };

  return (
    <div>
      {/* ── Success view ── */}
      {submitted && (
        <ApplicationSubmitted
          refNumber={`ASG-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, "0")}`}
          jobTitle={jobTitle}
          companyName="Amanat Shah Group"
          department={department}
          location={location}
          applicantName={`${personal.firstName} ${personal.lastName}`.trim() || "Applicant"}
          appliedOn={new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
          phone={`${phoneCountry.code} ${personal.phone || "N/A"}`}
          email={personal.email}
        />
      )}

      {!submitted && <form
        onSubmit={handleSubmit}
        className="w-full sm:pb-[70px] "
      >
        <h1 className="font-test-tiempos-fine text-xl lg:text-[2rem] font-medium text-neutral-800">{jobTitle}</h1>

        <div className="flex flex-col gap-2 sm:gap-4 rounded bg-[#EAF4FF] px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:mt-6 lg:mt-[2rem] lg:px-[1.5rem] lg:py-[1.4rem] mt-4">
          <div>
            <p className="text-base lg:text-[1.3rem] text-neutral-800">
              Autofill with LinkedIn
            </p>

            <p className="mt-1 text-xs lg:text-[1rem] text-neutral-500">Fills your name, work history, and education. You can edit anything after.</p>
          </div>

          <button
            type="button"
            className="group relative flex h-9 sm:h-11 w-full sm:w-fit items-center justify-center gap-1.5 bg-[#0A66C2] px-5 text-sm lg:h-12 lg:px-6 lg:text-[1.1667rem] text-white transition-all duration-300 ease-out cursor-pointer"
          >
            {/* Shine sweep */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-[60%] w-[40%] -skew-x-[20deg] bg-white/30 blur-[6px] transition-transform duration-700 ease-out group-hover:translate-x-[460%]"
            />

            <span className="flex size-6 items-center justify-center rounded-lg bg-white">
              <Image src="/icons/social-icon/linked-in-blue.png" alt="" width={12} height={12} quality={100} className="size-4" />
            </span>

            Apply With LinkedIn
          </button>
        </div>

        {/* Personal Information */}
        <section className="bg-gray-50 px-3 sm:px-4 py-5 sm:py-6 mt-8 sm:mt-10 sm:px-6 sm:py-8 lg:px-8 lg:mt-12">
          <h2 className="font-test-tiempos-fine text-lg lg:text-[1.5rem] font-medium text-neutral-800">Personal information</h2>

          <div className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2 mt-6 sm:mt-12">
            {renderField("firstName", "First name", personal.firstName, (v) => updatePersonal("firstName", v), { placeholder: "Enter your first name" })}
            {renderField("lastName", "Last name", personal.lastName, (v) => updatePersonal("lastName", v), { placeholder: "Enter your last name" })}
            {renderField("email", "Email address", personal.email, (v) => updatePersonal("email", v), { type: "email", placeholder: "Enter your email address" })}
            {renderField("phone", "Phone Number", personal.phone, (v) => updatePersonal("phone", v), { type: "tel", placeholder: "01XXXXXXXXX" })}
            {renderField("country", "Country/Region", personal.country, (v) => updatePersonal("country", v), { placeholder: "Bangladesh" })}
            {renderField("city", "City", personal.city, (v) => updatePersonal("city", v), { placeholder: "Dhaka" })}
          </div>
        </section>

        <section className="bg-gray-50 px-4 py-6 mt-8 sm:mt-10 sm:px-6 sm:py-8 lg:px-8 lg:mt-12">
          <div className="flex h-12 items-center justify-between border-b border-gray-200 pb-5 sm:h-14 sm:pb-7 lg:h-14 lg:pb-7">
            <div className="flex items-center gap-2">
              <Building2
                size={24}
                strokeWidth={1.4}
                className="text-[#303438]"
              />

              <h2 className="font-test-tiempos-fine text-lg lg:text-[1.5rem] font-medium text-neutral-800">Experience</h2>
            </div>

            <button
              type="button"
              onClick={addExperience}
              disabled={hasUnsavedExp}
              data-label="Add"
              className={`flex h-8 cursor-pointer items-center gap-1.5 px-3 text-sm transition-all duration-300 ${
                hasUnsavedExp
                  ? "cursor-not-allowed bg-[#eef0f1] text-[#c8ccd0]"
                  : "save-btn text-white"
              }`}
            >
              <Plus size={14} />
              Add
            </button>
          </div>

          <div ref={expContainerRef}>
          {[...experiences].sort((a, b) => Number(a.saved) - Number(b.saved)).map((experience, index) => (
            <div
              key={experience.id}
              data-exp-entry
              data-exp-id={experience.id}
              className={`mt-6 ${index > 0 ? "border-t border-gray-200 pt-6" : ""}`}
            >
              {experience.saved ? (
                /* ---- Overview (collapsed) ---- */
                <div data-exp-overview className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-test-tiempos-fine text-base lg:text-[1.3rem] font-medium text-neutral-800">
                        {experience.title || "Untitled"}
                      </h3>
                      <p className="text-xs lg:text-[1rem] text-neutral-500">
                        {experience.company || "Company"} <span className="mx-1 inline-block size-1.5 rounded-full bg-neutral-600 align-middle" /> {experience.from ? `${formatDate(experience.from)} – ${experience.currentlyWorking ? "Present" : formatDate(experience.to)}` : "Dates not set"}{experience.from ? ` (${calcDuration(experience.from, experience.to, experience.currentlyWorking)})` : ""}
                      </p>
                      {experience.organization && (
                        <p className="text-xs lg:text-[1rem] text-neutral-500">{experience.organization}</p>
                      )}
                      {experience.description && (
                        <p className="mt-1 text-xs lg:text-[1rem] text-neutral-400 line-clamp-2 max-w-[40rem]">{experience.description}</p>
                      )}
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button type="button" onClick={() => editExperience(experience.id)} className="cursor-pointer text-neutral-400 transition-colors duration-300 hover:text-neutral-700">
                        <Pencil size={16} />
                      </button>
                      <button type="button" onClick={() => removeExperience(experience.id)} className="cursor-pointer text-neutral-400 transition-colors duration-300 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* ---- Edit form (open) ---- */
                <div data-exp-form>
                  <div className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2">
                    {renderField(`exp-${experience.id}-title`, "Title", experience.title, (v) => updateExperience(experience.id, "title", v), { placeholder: "UI" })}
                    {renderField(`exp-${experience.id}-company`, "Company", experience.company, (v) => updateExperience(experience.id, "company", v), { placeholder: "Amanat Shah Group A&S" })}
                    {renderField(`exp-${experience.id}-org`, "Office location", experience.organization, (v) => updateExperience(experience.id, "organization", v), { placeholder: "Amanat Shah Group A&S", required: false })}

                    <div className="md:col-span-2">
                      <label className={labelClass}>Description</label>
                      <div className="input-gradient-border-hover bg-white">
                        <textarea
                          value={experience.description}
                          onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
                          placeholder="Subject"
                          className="h-20 w-full resize-none bg-white px-4 py-2 text-sm text-[#555] outline-none placeholder:text-[#b5b7b9]"
                        />
                      </div>
                    </div>

                    {renderField(`exp-${experience.id}-from`, "From", experience.from, (v) => updateExperience(experience.id, "from", v), {
                      errorLabel: "start date",
                      children: (
                        <div className="relative cursor-pointer">
                          <CalendarDays size={14} strokeWidth={1.4} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[#999]" />
                          <input required type="date" value={experience.from} onChange={(e) => updateExperience(experience.id, "from", e.target.value)} onBlur={() => setTouched((prev) => new Set(prev).add(`exp-${experience.id}-from`))} className={`${inputClass} pl-8 sm:pl-7`} />
                        </div>
                      ),
                    })}

                    {renderField(`exp-${experience.id}-to`, "To", experience.to, (v) => updateExperience(experience.id, "to", v), {
                      errorLabel: "end date",
                      required: !experience.currentlyWorking,
                      disabled: experience.currentlyWorking,
                      children: (
                        <div className="relative cursor-pointer">
                          <CalendarDays size={14} strokeWidth={1.4} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[#999]" />
                          <input required={!experience.currentlyWorking} disabled={experience.currentlyWorking} type="date" value={experience.to} onChange={(e) => updateExperience(experience.id, "to", e.target.value)} onBlur={() => setTouched((prev) => new Set(prev).add(`exp-${experience.id}-to`))} className={`${inputClass} pl-8 sm:pl-7 disabled:bg-[#f1f2f3] disabled:cursor-not-allowed`} />
                        </div>
                      ),
                    })}
                  </div>

                  <div className="mt-3 sm:mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                    <label className="flex cursor-pointer items-center gap-2 text-xs sm:text-sm text-[#686c70]">
                      <input type="checkbox" checked={experience.currentlyWorking} onChange={(e) => updateExperience(experience.id, "currentlyWorking", e.target.checked)} className="peer sr-only" />
                      <span className={`flex size-3.5 sm:size-4.5 items-center justify-center rounded-sm border-2 transition-all duration-300 ${experience.currentlyWorking ? "border-transparent [background-image:var(--primary-gradient)]" : "border-[#c8ccd0]"}`}>
                        {experience.currentlyWorking && (
                          <svg className="size-2 sm:size-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </span>
                      I currently work here
                    </label>

                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                      <button type="button" onClick={() => removeExperience(experience.id)} className="h-9 flex-1 sm:flex-none text-sm text-neutral-500 cursor-pointer bg-gray-200 hover:bg-gray-300 transition-all duration-300 ease-out px-6">
                        Cancel
                      </button>
                      <button type="button" data-label="Save" onClick={() => saveExperience(experience.id)} className="save-btn h-9 flex-1 sm:flex-none text-sm cursor-pointer px-6">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          </div>

        </section>

        {/* ======================================================== */}
        {/* EDUCATION                                                */}
        {/* ======================================================== */}

        <section className="bg-gray-50 px-4 py-6 mt-8 sm:mt-10 sm:px-6 sm:py-8 lg:px-8 lg:mt-12">
          <div className="flex h-12 items-center justify-between border-b border-gray-200 pb-5 sm:h-14 sm:pb-7 lg:h-14 lg:pb-7">
            <div className="flex items-center gap-2">
              <GraduationCap
                size={24}
                strokeWidth={1.4}
                className="text-[#303438]"
              />

              <h2 className="font-test-tiempos-fine text-lg lg:text-[1.5rem] font-medium text-neutral-800">Education</h2>
            </div>

            <button
              type="button"
              onClick={addEducation}
              disabled={hasUnsavedEdu}
              data-label="Add"
              className={`flex h-8 cursor-pointer items-center gap-1.5 px-3 text-sm transition-all duration-300 ${
                hasUnsavedEdu
                  ? "cursor-not-allowed bg-[#eef0f1] text-[#c8ccd0]"
                  : "save-btn text-white"
              }`}
            >
              <Plus size={14} />
              Add
            </button>
          </div>

          <div ref={eduContainerRef}>
          {[...education].sort((a, b) => Number(a.saved) - Number(b.saved)).map((edu, index) => (
            <div
              key={edu.id}
              data-edu-entry
              data-edu-id={edu.id}
              className={`mt-6 ${index > 0 ? "border-t border-gray-200 pt-6" : ""}`}
            >
              {edu.saved ? (
                /* ---- Overview (collapsed) ---- */
                <div data-edu-overview className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-test-tiempos-fine text-base lg:text-[1.3rem] font-medium text-neutral-800">
                        {edu.institution || "Untitled"}
                      </h3>
                      <p className="text-xs lg:text-[1rem] text-neutral-500">
                        {edu.degree || "Degree"} {edu.from && <span className="mx-1 inline-block size-1.5 rounded-full bg-neutral-600 align-middle" />} {edu.from ? `${formatDate(edu.from)} – ${edu.currentlyAttending ? "Present" : edu.to ? formatDate(edu.to) : "Present"}` : ""}{edu.from ? ` (${calcDuration(edu.from, edu.to, edu.currentlyAttending)})` : ""}
                      </p>
                      {edu.location && (
                        <p className="text-xs lg:text-[1rem] text-neutral-500">{edu.location}</p>
                      )}
                      {edu.description && (
                        <p className="mt-1 text-xs lg:text-[1rem] text-neutral-400 line-clamp-2 max-w-[40rem]">{edu.description}</p>
                      )}
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button type="button" onClick={() => editEducation(edu.id)} className="cursor-pointer text-neutral-400 transition-colors duration-300 hover:text-neutral-700">
                        <Pencil size={16} />
                      </button>
                      <button type="button" onClick={() => removeEducation(edu.id)} className="cursor-pointer text-neutral-400 transition-colors duration-300 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* ---- Edit form (open) ---- */
                <div data-edu-form>
                  <div className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2">
                    {/* Institution — full width */}
                    <div className="md:col-span-2">
                      {renderField(`edu-${edu.id}-institution`, "Institution", edu.institution, (v) => updateEducation(edu.id, "institution", v), { placeholder: "University name" })}
                    </div>

                    {/* Degree + Location — same row */}
                    {renderField(`edu-${edu.id}-degree`, "Degree", edu.degree, (v) => updateEducation(edu.id, "degree", v), { placeholder: "BSc in Computer Science" })}
                    {renderField(`edu-${edu.id}-location`, "Location", edu.location, (v) => updateEducation(edu.id, "location", v), { placeholder: "City, Country", required: false })}

                    {/* Description — full width */}
                    <div className="md:col-span-2">
                      <label className={labelClass}>Description</label>
                      <div className="input-gradient-border-hover bg-white">
                        <textarea
                          value={edu.description}
                          onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                          placeholder="Brief description"
                          className="h-20 w-full resize-none bg-white px-4 py-2 text-sm text-[#555] outline-none placeholder:text-[#b5b7b9]"
                        />
                      </div>
                    </div>

                    {renderField(`edu-${edu.id}-from`, "From", edu.from, (v) => updateEducation(edu.id, "from", v), {
                      errorLabel: "start date",
                      children: (
                        <div className="relative cursor-pointer">
                          <CalendarDays size={14} strokeWidth={1.4} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[#999]" />
                          <input required type="date" value={edu.from} onChange={(e) => updateEducation(edu.id, "from", e.target.value)} onBlur={() => setTouched((prev) => new Set(prev).add(`edu-${edu.id}-from`))} className={`${inputClass} pl-8 sm:pl-7`} />
                        </div>
                      ),
                    })}

                    {renderField(`edu-${edu.id}-to`, "To", edu.to, (v) => updateEducation(edu.id, "to", v), {
                      errorLabel: "end date",
                      required: !edu.currentlyAttending,
                      disabled: edu.currentlyAttending,
                      children: (
                        <div className="relative cursor-pointer">
                          <CalendarDays size={14} strokeWidth={1.4} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[#999]" />
                          <input required={!edu.currentlyAttending} disabled={edu.currentlyAttending} type="date" value={edu.to} onChange={(e) => updateEducation(edu.id, "to", e.target.value)} onBlur={() => setTouched((prev) => new Set(prev).add(`edu-${edu.id}-to`))} className={`${inputClass} pl-8 sm:pl-7 disabled:bg-[#f1f2f3] disabled:cursor-not-allowed`} />
                        </div>
                      ),
                    })}
                  </div>

                  <div className="mt-3 sm:mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                    <label className="flex cursor-pointer items-center gap-2 text-xs sm:text-sm text-[#686c70]">
                      <input type="checkbox" checked={edu.currentlyAttending} onChange={(e) => updateEducation(edu.id, "currentlyAttending", e.target.checked)} className="peer sr-only" />
                      <span className={`flex size-3.5 sm:size-4.5 items-center justify-center rounded-sm border-2 transition-all duration-300 ${edu.currentlyAttending ? "border-transparent [background-image:var(--primary-gradient)]" : "border-[#c8ccd0]"}`}>
                        {edu.currentlyAttending && (
                          <svg className="size-2 sm:size-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </span>
                      I currently attend here
                    </label>

                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                      <button type="button" onClick={() => removeEducation(edu.id)} className="h-9 flex-1 sm:flex-none text-sm text-neutral-500 cursor-pointer bg-gray-200 hover:bg-gray-300 transition-all duration-300 ease-out px-6">
                        Cancel
                      </button>
                      <button type="button" data-label="Save" onClick={() => saveEducation(edu.id)} className="save-btn h-9 flex-1 sm:flex-none text-sm cursor-pointer px-6">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          </div>
        </section>

        {/* PROFILES */}
        <section className="mt-6 sm:mt-8 bg-[#f8f9fa] px-4 py-4 sm:px-5 sm:py-5">
          <h2 className="mb-3 font-test-tiempos-fine text-lg lg:text-[1.5rem] font-medium text-neutral-800">Your profiles</h2>

          <label className={labelClass}>LinkedIn</label>

          <div className="relative">
            <Link2
              size={14}
              strokeWidth={1.4}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9da1a4]"
            />

            <input
              type="url"
              value={linkedin}
              onChange={(e) =>
                setLinkedin(e.target.value)
              }
              placeholder="https://www.linkedin.com/in/..."
              className={`${inputClass} pl-8`}
            />

          </div>
        </section>

        <section className="bg-gray-50 px-4 py-6 mt-8 sm:mt-10 sm:px-6 sm:py-8 lg:px-8 lg:mt-12">
          <h2 className="font-test-tiempos-fine text-lg lg:text-[1.5rem] font-medium text-neutral-800">Upload your CV or resume</h2>

          <div
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`group mt-4 flex h-40 cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed text-center transition-all duration-300 ease-in-out sm:mt-6 sm:h-48 lg:h-56 lg:mt-6 ${
              dragOver
                ? "border-[#76c438] bg-[#f7fcf4]"
                : "border-[#cce5b7] bg-[#fcfefd] hover:border-[#76c438] hover:bg-[#f7fcf4]"
            }`}
          >
            <UploadCloud
              size={32}
              strokeWidth={1.2}
              className="mb-3 size-8 sm:mb-5 sm:size-10 lg:size-10 text-[#00a889] transition-transform duration-300 ease-in-out group-hover:scale-110"
            />

            {fileName ? (
              <>
                <p className="text-sm sm:text-base lg:text-xl font-medium text-[#25282b]">
                  {fileName}
                </p>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setFileName(""); }}
                  className="mt-2 text-sm sm:text-base lg:text-lg text-red-400"
                >
                  Remove
                </button>
              </>
            ) : (
              <>
                <p className="text-sm sm:text-base lg:text-xl font-medium text-neutral-800">Upload your CV or resume</p>
                <p className="mt-2 text-xs sm:text-sm lg:text-base text-neutral-500">Drag and drop, or browse · PDF, DOC, DOCX, JPEG, PNG</p>
                <p className="mt-1 text-xs sm:text-sm lg:text-base text-neutral-500">10MB size limit </p>
              </>
            )}

            <input
              ref={fileRef}
              hidden
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
            />
          </div>
        </section>

        {/* SUBMIT */}
        <div className="mt-8 flex justify-end sm:mt-10 lg:mt-12">
          <button
            type="submit"
            className="group relative inline-flex shrink-0 items-center justify-center overflow-hidden px-6 py-3 text-sm sm:px-8 sm:py-4 sm:text-base lg:px-16 lg:py-5 lg:text-[1.25rem] leading-none cursor-pointer"
            style={{
              borderImage: "var(--primary-gradient) 1",
              borderWidth: 2,
            }}
          >
            {/* Invisible spacer — preserves the button's intrinsic width/height */}
            <span className="invisible inline-flex items-center gap-2 whitespace-nowrap">
              Submit Application
              <Send className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
            </span>

            {/* Default: gradient fill + white text + white icon — slides down and out on hover */}
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center gap-2 whitespace-nowrap text-white transition-transform duration-500 ease-in-out group-hover:translate-y-full"
              style={{ background: "var(--primary-gradient)" }}
            >
              Submit Application
              <Send className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" strokeWidth={1.5} />
            </span>

            {/* Hover: gradient text + gradient icon — slides in from the top */}
            <span
              aria-hidden
              className="absolute inset-0 flex -translate-y-full items-center justify-center gap-2 whitespace-nowrap transition-transform duration-500 ease-in-out group-hover:translate-y-0"
            >
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--primary-gradient)" }}
              >
                Submit Application
              </span>
              <Send className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" style={{ color: '#1AA179' }} strokeWidth={1.5} />
            </span>
          </button>
        </div>
      </form>}
    </div>
  );
}