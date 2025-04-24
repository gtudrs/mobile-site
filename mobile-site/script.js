// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSQndUrZEJcL5SZh2JLkhFkYyt5f15Nqo",
  authDomain: "history-5bb03.firebaseapp.com",
  projectId: "history-5bb03",
  storageBucket: "history-5bb03.firebasestorage.app",
  messagingSenderId: "650340680299",
  appId: "1:650340680299:web:fd79f5a10e799d1f33272e"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();


function toggleMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('hidden');
}

// Handle Sign Up
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Create User with Firebase Auth
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Save profile info to Firestore
    await db.collection("users").doc(user.uid).set({
      email: user.email,
      username: email.split('@')[0], // Example: username = part before '@'
      bio: "This is your bio",
    });

    // Redirect to profile page after successful sign-up
    window.location.href = "profile.html";
  } catch (error) {
    alert("Error: " + error.message);
  }
});

// Handle Login
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Log the user in with Firebase Auth
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Store user info in sessionStorage (for simple example)
    sessionStorage.setItem("loggedInUser", user.uid);

    // Redirect to profile page after successful login
    window.location.href = "profile.html";
  } catch (error) {
    alert("Error: " + error.message);
  }
});

// Display profile data on profile page
document.addEventListener("DOMContentLoaded", async () => {
  const userId = sessionStorage.getItem("loggedInUser");

  if (userId) {
    const userDoc = await db.collection("users").doc(userId).get();

    if (userDoc.exists) {
      const userData = userDoc.data();
      document.getElementById("username").textContent = userData.username;
      document.getElementById("email").textContent = userData.email;
      document.getElementById("bio").textContent = userData.bio;
    }
  } else {
    alert("Please log in first.");
    window.location.href = "login.html";
  }
});
