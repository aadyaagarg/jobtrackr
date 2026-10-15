import conf from "../conf/conf";
const API_URL = `${conf.apiBaseUrl}/jobs`;
const addJob = async (jobData) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(jobData),
  });
  if (!response.ok) throw new Error("Failed to add job application");
  return response.json();
};
const updateJob = async (id, jobData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(jobData),
  });
  if (!response.ok) throw new Error("Failed to update job application");
  return response.json();
};
const deleteJob = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) throw new Error("Failed to delete job application");
  return response.text();
};
const getJobs = async (params = {}) => {
  const queryParams = new URLSearchParams();
  if (params.page !== undefined) {
    queryParams.set("page", params.page);
  }
  if (params.size !== undefined) {
    queryParams.set("size", params.size);
  }

  if (params.status) {
    queryParams.set("status", params.status);
  }

  if (params.company) {
    queryParams.set("company", params.company);
  }
  const queryString = queryParams.toString();
  const url = queryString ? `${API_URL}?${queryString}` : API_URL;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch job applications");
  return response.json();
};
const jobService = {
  getJobs,
  addJob,
  deleteJob,
  updateJob,
};
export default jobService;
