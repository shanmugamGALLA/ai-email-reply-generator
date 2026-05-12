async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Save JWT tokens
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);

            document.getElementById("msg").innerText = "Login successful! Redirecting...";

            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);

        } else {
            document.getElementById("msg").innerText = data.detail || "Login failed";
        }

    } catch (error) {
        document.getElementById("msg").innerText = "Server error. Check backend.";
        console.error(error);
    }
}

async function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://127.0.0.1:8000/api/auth/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById("msg").innerText = "Registered successfully! Go to login.";
        } else {
            document.getElementById("msg").innerText = "Registration failed";
        }

    } catch (error) {
        document.getElementById("msg").innerText = "Server error";
    }
}
async function generateReply() {
    const emailText = document.getElementById("emailText").value;
    const tone = document.getElementById("tone").value;

    const token = localStorage.getItem("access");

    if (!token) {
        document.getElementById("output").innerText = "Please login first.";
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:8000/api/email/generate/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                email: emailText,
                tone: tone
            })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById("output").innerText = data.reply;
        } else {
            document.getElementById("output").innerText = "Error generating reply";
        }

    } catch (error) {
        console.error(error);
        document.getElementById("output").innerText = "Server error";
    }
}