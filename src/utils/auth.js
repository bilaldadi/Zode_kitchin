// utils/auth.js
export const handleUnauthorized = () => {
    console.log('Unauthorized access. Redirecting to login...');
    // Clear token from local storage
    localStorage.removeItem("authToken");
    // Redirect to login page
    window.location.href = "/login";
};
