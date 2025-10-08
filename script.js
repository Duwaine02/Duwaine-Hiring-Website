const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById("name").value.trim(),
      message: document.getElementById("message").value.trim(),
      _replyto: document.getElementById("email").value.trim() // Required by Formspree
    };

    if (!data.name || !data._replyto || !data.message) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/xqaybqgn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert("✅ Thank you! Your message has been sent.");
        form.reset();
      } else {
        const errorText = await response.text();
        alert("❌ Error sending message: " + errorText);
      }
    } catch (error) {
      alert("⚠️ Network error. Please check your connection.");
    }
  });


  const clearBtn = document.getElementById("clearBtn");
  clearBtn.addEventListener("click", () => form.reset());
}
