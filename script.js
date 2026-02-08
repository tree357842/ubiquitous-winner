const generateBtn = document.getElementById("generateBtn");
const statusDiv = document.getElementById("status");
const resultImage = document.getElementById("resultImage");

generateBtn.addEventListener("click", async () => {
  const apiKey = document.getElementById("apiKey").value.trim();
  const baseUrl = document.getElementById("baseUrl").value.trim();
  const model = document.getElementById("model").value.trim();
  const prompt = document.getElementById("prompt").value.trim();

  if (!apiKey || !baseUrl || !model || !prompt) {
    alert("Fill in all fields.");
    return;
  }

  statusDiv.textContent = "Generating image...";
  resultImage.src = "";

  try {
    const response = await fetch(`${baseUrl}/images/generations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        prompt: prompt,
        size: "1024x1024"
      })
    });

    const data = await response.json();

    if (!response.ok) {
      statusDiv.textContent = "Error: " + (data.error?.message || "Request failed");
      return;
    }

    // OpenAI-compatible response
    const imageUrl = data.data?.[0]?.url || `data:image/png;base64,${data.data?.[0]?.b64_json}`;

    if (!imageUrl) {
      statusDiv.textContent = "No image returned.";
      return;
    }

    resultImage.src = imageUrl;
    statusDiv.textContent = "Done!";
  } catch (err) {
    statusDiv.textContent = "Fetch error: " + err.message;
  }
});
