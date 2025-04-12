document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.createElement("button");
    logoutButton.textContent = "Logout";
    logoutButton.style.margin = "10px";
    document.body.insertBefore(logoutButton, document.body.firstChild);

    logoutButton.addEventListener("click", () => {
        // Clear login status
        localStorage.removeItem("isLoggedIn");

        // Redirect to login page
        window.location.href = "login.html";
    });

    const attendanceForm = document.getElementById("attendanceForm");
    const attendanceTableBody = document.querySelector("#attendanceTable tbody");

    // Function to load and display attendance records
    const loadAttendanceRecords = () => {
        const records = JSON.parse(localStorage.getItem("attendanceRecords")) || [];
        attendanceTableBody.innerHTML = ""; // Clear existing rows

        records.forEach(record => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${record.name}</td>
                <td>${record.date}</td>
                <td>${record.status}</td>
            `;
            attendanceTableBody.appendChild(row);
        });
    };

    // Load records on page load
    loadAttendanceRecords();

    attendanceForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form from refreshing the page

        // Capture form data
        const staffName = document.getElementById("staffName").value;
        const attendanceDate = document.getElementById("attendanceDate").value;
        const attendanceStatus = document.getElementById("attendanceStatus").value;

        // Validate inputs
        if (!staffName || !attendanceDate || !attendanceStatus) {
            alert("Please fill out all fields.");
            return;
        }

        // Create an attendance object
        const attendanceRecord = {
            name: staffName,
            date: attendanceDate,
            status: attendanceStatus
        };

        // Retrieve existing attendance records from local storage
        const existingRecords = JSON.parse(localStorage.getItem("attendanceRecords")) || [];

        // Add the new record to the existing records
        existingRecords.push(attendanceRecord);

        // Save updated records back to local storage
        localStorage.setItem("attendanceRecords", JSON.stringify(existingRecords));

        // Display confirmation message
        alert("Attendance successfully submitted and saved!");

        // Clear the form
        attendanceForm.reset();

        // Reload the attendance table
        loadAttendanceRecords();
    });

    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Users in localStorage:", users);

        // Check if the user exists and the password matches
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            alert("Log in successful!");
            localStorage.setItem("isAdminLoggedIn", "true");
            // Redirect to index.html
            window.location.href = "./index.html"; // Ensure the path is correct
        } else {
            alert("Invalid email or password.");
        }
    });
});