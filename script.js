// Scroll animation
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.2 });
sections.forEach(section => observer.observe(section));

// Form validation + mock submission
const form = document.getElementById('contactForm');
const messageBox = document.getElementById('form-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  messageBox.textContent = '';
  messageBox.className = 'message';

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const msg = form.message.value.trim();

  if (!name || !email || !msg) {
    showError('Please fill in all fields.');
    return;
  }

  const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailPattern.test(email)) {
    showError('Please enter a valid email address.');
    return;
  }

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, msg })
    });

    if (response.ok) {
      showSuccess('Message sent successfully!');
      form.reset();
    } else {
      showError('Something went wrong. Please try again.');
    }
  } catch {
    showError('Network error. Please try again later.');
  }
});

function showError(text) {
  messageBox.textContent = text;
  messageBox.className = 'message error';
}

function showSuccess(text) {
  messageBox.textContent = text;
  messageBox.className = 'message success';
}
