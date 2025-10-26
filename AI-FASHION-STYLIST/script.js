async function generateOutfit() {
  const gender = document.getElementById("gender").value;
  const bodyType = document.getElementById("bodyType").value;
  const moodColor = document.getElementById("moodColor").value;
  const weather = document.getElementById("weather").value;
  const occasion = document.getElementById("occasion").value;
  const extra = document.getElementById("prompt").value.trim();
  const resultBox = document.getElementById("result");

  // Build a detailed prompt from all fields
  let prompt = `Suggest a stylish outfit for a ${gender} with a ${bodyType} body type. `;
  prompt += `Preferred colors: ${moodColor}. `;
  prompt += `Weather: ${weather}. Occasion: ${occasion}. `;
  if (extra) prompt += `Additional notes: ${extra}`;

  if (!prompt.trim()) {
    resultBox.textContent = "Please fill in the form!";
    return;
  }

  resultBox.textContent = "Thinking...";

  try {
    const response = await fetch("/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    if (response.ok) {
      let html = `<p>${data.result}</p>`;
      if (data.image) {
        html += `<img src="${data.image}" alt="Outfit suggestion" style="max-width:300px;display:block;margin-top:1em;">`;
      }
      resultBox.innerHTML = html;
    } else {
      resultBox.textContent = `❌ Error: ${JSON.stringify(data)}`;
    }
  } catch (error) {
    resultBox.textContent = `❌ Error: ${error.message}`;
  }
}