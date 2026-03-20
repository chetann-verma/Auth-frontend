import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

  const buildHeaders = (token) => ({
    Authorization: `Bearer ${token}`,
    "ngrok-skip-browser-warning": "true",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Session expired. Please login again.");
          navigate("/login");
          return;
        }

        const response = await axios.get(`${API_URL}/profile`, {
          headers: buildHeaders(token),
        });

        setUser(response.data);
        setFormData({ name: response.data.name, email: response.data.email });
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          (err.message === "Network Error"
            ? "Network/CORS issue while fetching profile"
            : "Failed to fetch profile");
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [API_URL, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      await axios.put(`${API_URL}/profile`, formData, {
        headers: buildHeaders(token),
      });

      setUser((prev) => ({ ...prev, ...formData }));
      setEditMode(false);
      setError("");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to update profile";
      setError(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="profile-card error-card">
          <h1>Error</h1>
          <p className="error-message">{error}</p>
          <button onClick={handleLogout} className="logout-btn">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <button onClick={() => navigate('/feed')} className="back-btn">
            ← Feed
          </button>
          <h1>My Profile</h1>
          <div className="header-actions">
            <button
              onClick={handleEditToggle}
              className={`edit-btn ${editMode ? "cancel" : ""}`}
            >
              {editMode ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>

        {user && (
          <div className="profile-content">
            {!editMode ? (
              <div className="profile-info">
                <div className="info-row">
                  <span className="label">Name</span>
                  <span className="value">{user.name}</span>
                </div>
                <div className="info-row">
                  <span className="label">Email</span>
                  <span className="value">{user.email}</span>
                </div>
                <div className="info-row">
                  <span className="label">Member Since</span>
                  <span className="value">Today</span>
                </div>
              </div>
            ) : (
              <form className="edit-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-actions">
                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    className="save-btn"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        <div className="profile-footer">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
