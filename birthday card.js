document.addEventListener("DOMContentLoaded", () => {
  createPersonalizationModal();
});

function createPersonalizationModal() {
  const overlay = document.createElement("div");
  overlay.id = "personalize-overlay";
  overlay.style.cssText = `
    position: fixed; inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: flex; align-items: center; justify-content: center;
    z-index: 9999; font-family: 'Happy Monkey', sans-serif;
  `;

  const modal = document.createElement("div");
  modal.style.cssText = `
    background: #fff; border-radius: 20px;
    padding: 2rem; max-width: 400px; width: 92%;
    box-shadow: 0 2px rgba(0,0,0,0.18);
  `;

  modal.innerHTML = `
    <h2 style="margin: 0 0 1.4rem; font-size: 20px; color: #333;">
      Personalize this card 🎂
    </h2>

    <label style="display: block; margin-bottom: 14px;">
      <span style="font-size: 13px; color: #888; display: block; margin-bottom: 5px;">
        Birthday person's name
      </span>
      <input id="p-name" type="text" placeholder="e.g. Dash"
        style="width: 100%; padding: 10px 12px; border: 1.5px solid #e0e0e0;
        border-radius: 10px; font-size: 15px; box-sizing: border-box; outline: none;">
    </label>

    <label style="display: block; margin-bottom: 14px;">
      <span style="font-size: 13px; color: #888; display: block; margin-bottom: 5px;">Age</span>
      <input id="p-age" type="number" placeholder="e.g. 24" min="1" max="150"
        style="width: 100%; padding: 10px 12px; border: 1.5px solid #e0e0e0;
        border-radius: 10px; font-size: 15px; box-sizing: border-box; outline: none;">
    </label>

    <label style="display: block; margin-bottom: 14px;">
      <span style="font-size: 13px; color: #888; display: block; margin-bottom: 5px;">
        Birthday date
      </span>
      <input id="p-date" type="date"
        style="width: 100%; padding: 10px 12px; border: 1.5px solid #e0e0e0;
        border-radius: 10px; font-size: 15px; box-sizing: border-box; outline: none;">
    </label>

    <label style="display: block; margin-bottom: 20px;">
      <span style="font-size: 13px; color: #888; display: block; margin-bottom: 5px;">
        Photo
      </span>
      <input id="p-photo" type="file" accept="image/*"
        style="width: 100%; padding: 10px 12px; border: 1.5px dashed #e0e0e0;
        border-radius: 10px; font-size: 14px; box-sizing: border-box;
        cursor: pointer; background: #fafafa;">
    </label>

    <button id="p-submit"
      style="width: 100%; padding: 13px; background: #ff6b9d; color: #fff;
      border: none; border-radius: 12px; font-size: 16px; cursor: pointer;
      font-family: 'Happy Monkey', sans-serif; letter-spacing: 0.5px;
      transition: opacity 0.2s;">
      Create Card 🎉
    </button>

    <p style="text-align: center; font-size: 12px; color: #bbb; margin: 12px 0 0;">
      Leave any field blank to keep the default values
    </p>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  const submitBtn = document.getElementById("p-submit");
  submitBtn.addEventListener("mouseenter", () => submitBtn.style.opacity = "0.85");
  submitBtn.addEventListener("mouseleave", () => submitBtn.style.opacity = "1");
  submitBtn.addEventListener("click", applyPersonalization);
}

function applyPersonalization() {
  const name     = document.getElementById("p-name").value.trim();
  const age      = document.getElementById("p-age").value.trim();
  const dateVal  = document.getElementById("p-date").value;
  const photoInput = document.getElementById("p-photo");

  if (name) {
    const h1 = document.querySelector("#header h1");
    if (h1) h1.textContent = `🎊 Today is ${name}'s Birthday 🎊`;
  }

  if (age) {
    const ageEl = document.getElementById("bday-age");
    if (ageEl) ageEl.textContent = `${age} years old`;
  }

  if (dateVal) {
    const [year, month, day] = dateVal.split("-");
    const dateEl = document.getElementById("bday-date");
    if (dateEl) dateEl.textContent = `${day}.${month}.${year}`;
  }

  if (photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgEl = document.getElementById("img");
      if (imgEl) imgEl.src = e.target.result;
    };
    reader.readAsDataURL(photoInput.files[0]);
  }

  const overlay = document.getElementById("personalize-overlay");
  if (overlay) {
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 0.3s";
    setTimeout(() => overlay.remove(), 300);
  }
}
