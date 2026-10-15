import { useForm } from "react-hook-form";
import { useEffect } from "react";

function AddApplication({ onCancel, onSubmitApplication, editingJob }) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      company: "",
      jobTitle: "",
      location: "",
      jobLink: "",
      appliedDate: "",
      status: "APPLIED",
      minSalary: "",
      maxSalary: "",
      source: "LINKEDIN",
      notes: "",
    },
  });
  useEffect(() => {
    if (editingJob) {
      reset({
        company: editingJob.company ?? "",
        jobTitle: editingJob.jobTitle ?? "",
        location: editingJob.location ?? "",
        jobLink: editingJob.jobLink ?? "",
        appliedDate: editingJob.appliedDate ?? "",
        status: editingJob.status ?? "APPLIED",
        minSalary: editingJob.minSalary ?? "",
        maxSalary: editingJob.maxSalary ?? "",
        source: editingJob.source ?? "LINKEDIN",
        notes: editingJob.notes ?? "",
      });
    } else {
      reset();
    }
  }, [editingJob, reset]);

  const submitHandler = async (data) => {
    try {
      if (editingJob) await onSubmitApplication(data, editingJob.id);
      else await onSubmitApplication(data);
      reset();
    } catch (error) {
      setError("root.server", {
        type: "server",
        message:
          error.message || "Failed to save application. Please try again.",
      });
    }
  };

  const inputClass =
    "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass = "text-sm font-medium text-gray-700";

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#10253d]">Add Application</h2>
        <p className="mt-1 text-sm text-gray-500">
          Keep track of your job application details.
        </p>
      </div>

      {/* Server Error */}
      {errors.root?.server && (
        <p
          role="alert"
          className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600"
        >
          {errors.root.server.message}
        </p>
      )}

      {/* Form Fields */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Company */}
        <div>
          <label className={labelClass}>Company Name *</label>
          <input
            type="text"
            placeholder="e.g. Google"
            className={inputClass}
            {...register("company", {
              required: "Company name is required.",
              validate: (value) =>
                value.trim().length > 0 || "Company name cannot be empty.",
            })}
          />
          {errors.company && (
            <p className="mt-1 text-sm text-red-500">
              {errors.company.message}
            </p>
          )}
        </div>

        {/* Job Title */}
        <div>
          <label className={labelClass}>Job Title *</label>
          <input
            type="text"
            placeholder="e.g. Software Engineer Intern"
            className={inputClass}
            {...register("jobTitle", {
              required: "Job title is required.",
              validate: (value) =>
                value.trim().length > 0 || "Job title cannot be empty.",
            })}
          />
          {errors.jobTitle && (
            <p className="mt-1 text-sm text-red-500">
              {errors.jobTitle.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className={labelClass}>Location *</label>
          <input
            type="text"
            placeholder="e.g. Bangalore / Remote"
            className={inputClass}
            {...register("location", {
              required: "Location is required.",
              validate: (value) =>
                value.trim().length > 0 || "Location cannot be empty.",
            })}
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-500">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Job Link */}
        <div>
          <label className={labelClass}>Job Link</label>
          <input
            type="url"
            placeholder="https://..."
            className={inputClass}
            {...register("jobLink")}
          />
        </div>

        {/* Applied Date */}
        <div>
          <label className={labelClass}>Applied Date *</label>
          <input
            type="date"
            className={inputClass}
            {...register("appliedDate", {
              required: "Applied date is required.",
            })}
          />
          {errors.appliedDate && (
            <p className="mt-1 text-sm text-red-500">
              {errors.appliedDate.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className={labelClass}>Application Status *</label>
          <select
            className={inputClass}
            {...register("status", {
              required: "Status is required.",
            })}
          >
            <option value="SAVED">Saved</option>
            <option value="APPLIED">Applied</option>
            <option value="ONLINE_ASESSMENT">Online Assessment</option>
            <option value="INTERVIEW">Interview</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTED">Rejected</option>
            <option value="WITHDRAWN">Withdrawn</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
          )}
        </div>

        {/* Minimum Salary */}
        <div>
          <label className={labelClass}>Minimum Salary</label>
          <input
            type="number"
            min="0"
            step="1"
            placeholder="e.g. 500000"
            className={inputClass}
            {...register("minSalary", {
              setValueAs: (value) => (value === "" ? null : Number(value)),
              validate: (value) =>
                value === null ||
                (Number.isInteger(value) && value >= 0) ||
                "Enter a valid non-negative whole number.",
            })}
          />
          {errors.minSalary && (
            <p className="mt-1 text-sm text-red-500">
              {errors.minSalary.message}
            </p>
          )}
        </div>

        {/* Maximum Salary */}
        <div>
          <label className={labelClass}>Maximum Salary</label>
          <input
            type="number"
            min="0"
            step="1"
            placeholder="e.g. 1000000"
            className={inputClass}
            {...register("maxSalary", {
              setValueAs: (value) => (value === "" ? null : Number(value)),
              validate: (value) => {
                if (value !== null && (!Number.isInteger(value) || value < 0)) {
                  return "Enter a valid non-negative whole number.";
                }
                const minSalary = getValues("minSalary");
                return (
                  value === null ||
                  minSalary === null ||
                  value >= minSalary ||
                  "Maximum salary must be greater than or equal to minimum salary."
                );
              },
            })}
          />
          {errors.maxSalary && (
            <p className="mt-1 text-sm text-red-500">
              {errors.maxSalary.message}
            </p>
          )}
        </div>

        {/* Source */}
        <div>
          <label className={labelClass}>Application Source *</label>
          <select
            className={inputClass}
            {...register("source", {
              required: "Source is required.",
            })}
          >
            <option value="LINKEDIN">LinkedIn</option>
            <option value="REFERRAL">Referral</option>
            <option value="INDEED">Indeed</option>
            <option value="OTHER">Other</option>
          </select>
          {errors.source && (
            <p className="mt-1 text-sm text-red-500">{errors.source.message}</p>
          )}
        </div>

        {/* Notes */}
        <div className="md:col-span-2">
          <label className={labelClass}>Notes</label>
          <textarea
            rows={4}
            placeholder="Add interview details, recruiter information, or other notes..."
            className={inputClass}
            {...register("notes")}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Application"}
        </button>
      </div>
    </form>
  );
}

export default AddApplication;