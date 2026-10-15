import { useCallback, useEffect, useState } from "react";
import AddApplication from "../components/AddApplication";
import jobService from "../services/jobService";

function Applications() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [editingJob, setEditingJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await jobService.getJobs({
        page: currentPage,
        size: 10,
        status: selectedStatus,
        company: searchInput,
      });

      setJobs(data.content ?? []);
      setTotalPages(data.totalPages ?? 0);
    } catch (err) {
      setError(err.message || "Failed to load applications.");
    } finally {
      setLoading(false);
    }
  }, [selectedStatus, searchInput, currentPage]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);
  useEffect(() => {
    setCurrentPage(0);
  }, [searchInput, selectedStatus]);

  const handleSaveApplication = async (jobData, id) => {
    if (id) await jobService.updateJob(id, jobData);
    else await jobService.addJob(jobData);
    await fetchJobs();
    setShowForm(false);
  };
  const handleDeleteApplication = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?",
    );
    if (!confirmed) return;
    try {
      await jobService.deleteJob(id);
      await fetchJobs();
    } catch (e) {
      setError(e.message || "Failed to delete application.");
    }
  };

  if (loading) {
    return <div className="p-8 text-gray-500">Loading applications...</div>;
  }

  if (error) {
    return (
      <div className="m-8 rounded-lg bg-red-50 p-4 text-red-600">
        {error}
        <button type="button" onClick={fetchJobs} className="ml-3 underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#f8f9fc] p-6 md:p-8">
      {/* Applications Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#10253d]">Applications</h1>
          <p className="mt-2 text-gray-500">
            Track and manage your job applications.
          </p>
        </div>

        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            + Add Application
          </button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by company name..."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 sm:flex-1"
        />

        <select
          className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 sm:w-56"
          defaultValue=""
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">Filter by status</option>
          <option value="SAVED">Saved</option>
          <option value="APPLIED">Applied</option>
          <option value="ONLINE_ASSESSMENT">Online Assessment</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
          <option value="WITHDRAWN">Withdrawn</option>
        </select>
      </div>

      {/* Add Application Form */}
      {showForm && (
        <div className="mb-6">
          <AddApplication
            onCancel={() => {
              setShowForm(false);
              setEditingJob(null);
            }}
            onSubmitApplication={handleSaveApplication}
            editingJob={editingJob}
          />
        </div>
      )}

      {/* Applications Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-5 py-4">Company</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Applied Date</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-medium text-[#10253d]">
                      {job.company}
                    </td>
                    <td className="px-5 py-4 text-gray-600">{job.jobTitle}</td>
                    <td className="px-5 py-4 text-gray-600">
                      {job.appliedDate || "—"}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        {job.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {job.location || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingJob(job);
                            setShowForm(true);
                          }}
                          className="font-medium text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            handleDeleteApplication(job.id);
                          }}
                          className="font-medium text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-gray-500"
                  >
                    {searchInput || selectedStatus
                      ? "No matching applications found. Try changing your search or filters."
                      : "No applications found. Add your first application!"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 0}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page {totalPages === 0 ? 0 : currentPage + 1} of {totalPages}
          </span>

          <button
            type="button"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage >= totalPages - 1}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default Applications;
