const API_URL = "http://127.0.0.1:8000"; // backend URL
let token = localStorage.getItem("token");

// DOM references
const authSection = document.getElementById("auth-section");
const appSection = document.getElementById("app-section");
const postsDiv = document.getElementById("posts");

// Show correct section
function checkAuth() {
  if (token) {
    authSection.style.display = "none";
    appSection.style.display = "block";
    loadPosts();
  } else {
    authSection.style.display = "block";
    appSection.style.display = "none";
  }
}
checkAuth();

// Register
document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  alert("Registered! Now login.");
});

// Login
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData
  });

  if (res.ok) {
    const data = await res.json();
    token = data.access_token;
    localStorage.setItem("token", token);
    checkAuth();
  } else {
    alert("Invalid credentials");
  }
});

// Logout
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("token");
  token = null;
  checkAuth();
});

// Create Post
document.getElementById("post-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("post-title").value;
  const content = document.getElementById("post-content").value;

  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ title, content, published: true })
  });

  if (res.ok) {
    alert("Post created!");
    loadPosts();
  } else {
    alert("Failed to create post");
  }
});

// Load posts
async function loadPosts() {
  const res = await fetch(`${API_URL}/posts`);
  const posts = await res.json();

  postsDiv.innerHTML = "";
  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <h3>${post.post.title}</h3>
      <p>${post.post.content}</p>
      <small>By ${post.post.owner.email}</small>
      <button onclick="vote(${post.post.id}, 1)">👍</button>
      <button onclick="vote(${post.post.id}, 0)">👎</button>
    `;
    postsDiv.appendChild(div);
  });
}

// Vote
async function vote(postId, dir) {
  const res = await fetch(`${API_URL}/vote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ post_id: postId, dir }) // ⚠ GET with body is unusual
  });

  if (res.ok) {
    alert("Vote action done");
  } else {
    alert("Vote failed");
  }
}
