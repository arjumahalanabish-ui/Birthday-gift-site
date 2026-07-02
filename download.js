// Watches for the personalization modal to close, then shows the download bar
const observer = new MutationObserver(() => {
  const overlay = document.getElementById("personalize-overlay");
  if (!overlay && !document.getElementById("download-bar")) {
    showDownloadBar();
    observer.disconnect();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  observer.observe(document.body, { childList: true });
});

function showDownloadBar() {
  const bar = document.createElement("div");
  bar.id = "download-bar";
  bar.style.cssText = `
    position: fixed; bottom: 0; left: 0; right: 0;
    background: #fff8fc; border-top: 1.5px solid #ffd6e8;
    padding: 12px 20px; display: flex; gap: 10px;
    justify-content: center; align-items: center;
    z-index: 9998; font-family: 'Happy Monkey', sans-serif;
    box-shadow: 0 -4px 24px rgba(255, 107, 157, 0.12);
  `;

  bar.innerHTML = `
    <span style="font-size: 14px; color: #aaa;">Share this card:</span>
    <button id="btn-download-html"
      style="padding: 9px 18px; background: #ff6b9d; color: #fff;
      border: none; border-radius: 10px; font-size: 14px;
      cursor: pointer; font-family: 'Happy Monkey', sans-serif;">
      ⬇ Download as file
    </button>
    <button id="btn-save-pdf"
      style="padding: 9px 18px; background: #f0f0f0; color: #444;
      border: none; border-radius: 10px; font-size: 14px;
      cursor: pointer; font-family: 'Happy Monkey', sans-serif;">
      🖨 Save as PDF
    </button>
  `;

  document.body.appendChild(bar);

  document.getElementById("btn-download-html").addEventListener("click", downloadAsHTML);
  document.getElementById("btn-save-pdf").addEventListener("click", () => window.print());
}

function downloadAsHTML() {
  const bar = document.getElementById("download-bar");

  // Hide bar so it's not included in the snapshot
  bar.style.display = "none";

  // Grab the current page with all personalized values baked in
  let html = document.documentElement.outerHTML;

  // Strip both script tags so the modal doesn't pop up when the file is opened
  html = html.replace(/<script src="birthday_card\.js"><\/script>/gi, "");
  html = html.replace(/<script src="download\.js"><\/script>/gi, "");

  bar.style.display = "flex";

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "birthday_card.html";
  a.click();
  URL.revokeObjectURL(url);
}
