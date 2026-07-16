<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");

const dataApiKey = "3ee57ddd-2946-449a-9908-8a28d7ce3960";
const dataActionId = "login";
const dataEmailElement = "email";
const currentURL = typeof window !== "undefined" ? window.location.href : "";

const injectCdnScript = (userEmail: string) => {
  if (typeof window === "undefined") return;

  if (document.getElementById("botbuster-script")) {
    console.log("CDN script already injected.");
    return;
  }
  const script = document.createElement("script");
  script.id = "botbuster-script";
  script.src = "https://cdn.jsdelivr.net/gh/tarunInomatrix/captcha-script@bc3e2cb74bf9967ea2b0ea1309e007f84b0149f7/quick-check-inject.js";
  script.async = true;
  script.setAttribute("data-api-key", dataApiKey);
  script.setAttribute("data-email", userEmail);
  script.setAttribute("data-loaded-captcha-url", currentURL);
  script.setAttribute("data-action-id", dataActionId);
  script.setAttribute("data-email-element", dataEmailElement);
  script.setAttribute("data-web-url", currentURL);

  document.body.appendChild(script);
  script.onload = () => {
    console.log("Botbuster CDN script loaded successfully and should inject.");
  };
  script.onerror = () => {
    console.error("Error loading Botbuster CDN script.");
  };
};

const handleSignIn = (e: Event) => {
  e.preventDefault();
  injectCdnScript(email.value);
};

const handleSocialLogin = (platform: string) => {
  alert(`Connecting with ${platform}...`);
};
</script>

<template>
  <div class="page-container">
    <div class="signin-header">
      <h1>Sign in to your account</h1>
      <p>
        Don't have an account?
        <a href="#" class="signup-link">Sign up</a>
      </p>
    </div>

    <div class="signin-card">
      <form @submit="handleSignIn" class="signin-form">
        <!-- Email field -->
        <div class="form-group">
          <label for="email">Email address</label>
          <div class="input-wrapper">
            <svg
              class="input-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <input
              id="email"
              type="email"
              v-model="email"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <!-- Password field -->
        <div class="form-group">
          <label for="password">Password</label>
          <div class="input-wrapper">
            <input
              id="password"
              type="password"
              v-model="password"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        <!-- Sign in button -->
        <button type="submit" class="btn-signin">Sign in</button>
        <div id="botbuster-container"></div>
      </form>

      <!-- Divider -->
      <div class="divider-container">
        <span class="divider-text">Or continue with</span>
      </div>

      <!-- Social login buttons -->
      <div class="social-buttons">
        <button @click="handleSocialLogin('Google')" class="btn-social">
          <svg
            class="social-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.5 24c0-1.61-.15-3.16-.42-4.69H24v8.87h12.66c-.55 2.94-2.2 5.43-4.69 7.11l7.3 5.66C43.53 36.42 46.5 30.79 46.5 24z"
            />
            <path
              fill="#FBBC05"
              d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.3-5.66c-2.03 1.36-4.63 2.17-8.59 2.17-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg>
          Continue with Google
        </button>

        <button @click="handleSocialLogin('Facebook')" class="btn-social">
          <svg
            class="social-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#1877F2"
          >
            <path
              d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
            />
          </svg>
          Continue with Facebook
        </button>

        <button @click="handleSocialLogin('Instagram')" class="btn-social">
          <svg
            class="social-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <defs>
              <radialGradient id="ig-grad" cx="30%" cy="107%" r="130%">
                <stop offset="0%" stop-color="#fdf497" />
                <stop offset="5%" stop-color="#fdf497" />
                <stop offset="45%" stop-color="#fd5949" />
                <stop offset="60%" stop-color="#d6249f" />
                <stop offset="90%" stop-color="#285AEB" />
              </radialGradient>
            </defs>
            <path
              fill="url(#ig-grad)"
              d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
            />
          </svg>
          Continue with Instagram
        </button>
      </div>
    </div>
  </div>
</template>

<style>
/* Global Reset and Box Model */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Helvetica,
    Arial,
    sans-serif;
  background-color: #f8fafc;
  color: #1e293b;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

#app {
  width: 100%;
}
</style>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  padding: 20px 0;
}

/* Header Styling */
.signin-header {
  text-align: center;
  margin-bottom: 28px;
}

.signin-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #0f172a; /* Deep Slate/Navy */
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.signin-header p {
  font-size: 15px;
  color: #64748b;
  font-weight: 500;
}

.signup-link {
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.15s ease;
}

.signup-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

/* Card Container */
.signin-card {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.04),
    0 8px 10px -6px rgba(0, 0, 0, 0.04),
    0 0 0 1px rgba(0, 0, 0, 0.01);
}

/* Form Styles */
.signin-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
}

/* Input Wrapper & Inputs */
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  width: 20px;
  height: 20px;
  color: #94a3b8;
  pointer-events: none;
}

.input-wrapper input {
  width: 100%;
  height: 46px;
  padding: 12px 14px;
  font-size: 15px;
  color: #1e293b;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Padding adjustment if input has an icon */
.input-wrapper:has(.input-icon) input {
  padding-left: 44px;
}

.input-wrapper input::placeholder {
  color: #94a3b8;
}

/* Focus effects */
.input-wrapper input:focus {
  border-color: #94a3b8;
  box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.12);
}

/* Sign In Button */
.btn-signin {
  width: 100%;
  height: 46px;
  background-color: #18181b; /* Sleek black/zinc */
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 4px;
  transition: all 0.15s ease;
}

.btn-signin:hover {
  background-color: #27272a;
}

.btn-signin:active {
  transform: scale(0.995);
}

/* Divider */
.divider-container {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 24px 0;
}

.divider-container::before,
.divider-container::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #f1f5f9;
}

.divider-text {
  padding: 0 16px;
  font-size: 14px;
  color: #94a3b8;
  font-weight: 500;
}

/* Social Buttons */
.social-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-social {
  width: 100%;
  height: 46px;
  background-color: #ffffff;
  color: #0f172a;
  font-size: 15px;
  font-weight: 600;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-social:hover {
  background-color: #f8fafc;
  border-color: #cbd5e1;
}

.btn-social:active {
  transform: scale(0.995);
}

.social-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}
</style>
