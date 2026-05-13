import { useState, useRef } from "react";
import axios from "axios";

function App() {

  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const [question, setQuestion] = useState("");
  const [chatAnswer, setChatAnswer] = useState("");

  // DEMO TIMESTAMP STATE
  const [timestamp, setTimestamp] = useState("00:45");

  const videoRef = useRef(null);

  // FILE UPLOAD
  const handleUpload = async () => {

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/api/files/upload",
        formData
      );

      setResponse(res.data);

    } catch (error) {

      console.error(error);
      alert("Upload failed");

    } finally {

      setLoading(false);
    }
  };

  // ASK QUESTION
  const askQuestion = async () => {

    if (!question || !response?.id) {
      alert("Upload file and enter question");
      return;
    }

    try {

      const res = await axios.post(
        "http://localhost:8080/api/chat",
        {
          fileId: response.id,
          question: question
        }
      );

      setChatAnswer(res.data.answer);

      // DEMO TIMESTAMP
      setTimestamp("01:20");

    } catch (error) {

      console.error(error);
      alert("Question failed");

    }
  };

  // PLAY VIDEO AT TIMESTAMP
  const playAtTimestamp = () => {

    if (videoRef.current) {

      videoRef.current.currentTime = 80;
      videoRef.current.play();

    }
  };

  return (

    <div style={styles.page}>

      <div style={styles.container}>

        {/* LEFT SECTION */}
        <div style={styles.leftSection}>

          <h1 style={styles.heading}>
            AI Document
            <br />
            Q&A Platform
          </h1>

          <p style={styles.description}>
            Upload PDF, audio, and video files and interact
            with AI-powered chatbot.
          </p>

          <div style={styles.featureBox}>

            <div style={styles.featureCard}>
              PDF Upload
            </div>

            <div style={styles.featureCard}>
              Smart Summary
            </div>

            <div style={styles.featureCard}>
              AI Q&A
            </div>

            <div style={styles.featureCard}>
              Timestamp Search
            </div>

          </div>

        </div>

        {/* RIGHT SECTION */}
        <div style={styles.rightSection}>

          {/* UPLOAD CARD */}
          <div style={styles.card}>

            <h2 style={styles.cardTitle}>
              Upload PDF, Audio or Video
            </h2>

            <div style={styles.uploadBox}>

              <label style={styles.uploadLabel}>
                Upload PDF / Audio / Video
              </label>

              <input
                type="file"
                accept=".pdf,audio/*,video/*"
                onChange={(e) => setFile(e.target.files[0])}
                style={styles.fileInput}
              />

              {file && (
                <div style={styles.selectedFile}>
                  Selected: {file.name}
                </div>
              )}

            </div>

            <button
              onClick={handleUpload}
              style={styles.button}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>

          </div>

          {/* RESPONSE SECTION */}
          {response && (

            <div style={styles.resultCard}>

              <h2 style={styles.successText}>
                Uploaded Successfully
              </h2>

              <p>
                <strong>File Name:</strong> {response.fileName}
              </p>

              <p>
                <strong>File Type:</strong> {response.fileType}
              </p>

              {/* SUMMARY */}
              <h3 style={styles.sectionHeading}>
                Summary
              </h3>

              <textarea
                value={response.summary || "No summary available"}
                readOnly
                rows="6"
                style={styles.textArea}
              />

              {/* CHATBOT */}
              <div style={styles.chatCard}>

                <h2 style={styles.chatTitle}>
                  AI Chatbot
                </h2>

                <input
                  type="text"
                  placeholder="Ask question from document..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  style={styles.input}
                />

                <button
                  onClick={askQuestion}
                  style={styles.button}
                >
                  Ask AI
                </button>

                {chatAnswer && (

                  <div style={styles.answerBox}>

                    <h3>Answer</h3>

                    <p>{chatAnswer}</p>

                    {/* TIMESTAMP */}
                    <div style={styles.timestampBox}>

                      <p>
                        <strong>Relevant Timestamp:</strong> {timestamp}
                      </p>

                      <button
                        onClick={playAtTimestamp}
                        style={styles.playButton}
                      >
                        ▶ Play Relevant Section
                      </button>

                    </div>

                  </div>
                )}

              </div>

              {/* VIDEO PLAYER */}
              <div style={styles.videoCard}>

                <h3 style={styles.sectionHeading}>
                  Video / Audio Player
                </h3>

                <video
                  ref={videoRef}
                  controls
                  width="100%"
                  style={styles.video}
                >
                  <source src="" type="video/mp4" />
                </video>

              </div>

              {/* EXTRACTED TEXT */}
              <h3 style={styles.sectionHeading}>
                Extracted Text
              </h3>

              <textarea
                value={response.extractedText || "No extracted text"}
                readOnly
                rows="12"
                style={styles.textArea}
              />

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  container: {
    width: "95%",
    maxWidth: "1400px",
    display: "grid",
    gridTemplateColumns: "35% 65%",
    gap: "40px",
    alignItems: "start"
  },

  leftSection: {
    color: "white",
    paddingTop: "50px"
  },

  heading: {
    fontSize: "56px",
    lineHeight: "1.1",
    fontWeight: "bold",
    marginBottom: "25px"
  },

  description: {
    fontSize: "20px",
    color: "#cbd5e1",
    lineHeight: "1.8",
    maxWidth: "420px",
    marginBottom: "30px"
  },

  featureBox: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap"
  },

  featureCard: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "14px",
    padding: "14px 18px",
    color: "white",
    fontWeight: "bold"
  },
  uploadBox: {
    marginBottom: "25px"
  },

  uploadLabel: {
    display: "block",
    color: "white",
    marginBottom: "12px",
    fontSize: "16px",
    fontWeight: "bold"
  },

  selectedFile: {
    marginTop: "12px",
    background: "rgba(255,255,255,0.1)",
    color: "#e2e8f0",
    padding: "12px",
    borderRadius: "12px",
    fontSize: "14px",
    overflowWrap: "break-word"
  },

  rightSection: {
    display: "flex",
    flexDirection: "column",
    gap: "25px"
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "28px",
    padding: "35px",
    boxShadow: "0 10px 35px rgba(0,0,0,0.3)"
  },

  cardTitle: {
    color: "white",
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "30px"
  },

  fileInput: {
    width: "95%",
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.1)",
    color: "white",
    marginBottom: "20px",
    fontSize: "15px"
  },

  button: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  resultCard: {
    background: "white",
    borderRadius: "28px",
    padding: "35px",
    boxShadow: "0 10px 35px rgba(0,0,0,0.25)"
  },

  successText: {
    color: "#16a34a",
    marginBottom: "20px"
  },

  sectionHeading: {
    marginBottom: "12px",
    color: "#111827"
  },

  textArea: {
    width: "95%",
    padding: "18px",
    borderRadius: "16px",
    border: "1px solid #cbd5e1",
    marginBottom: "25px",
    resize: "none",
    background: "#f8fafc",
    color: "#111827",
    lineHeight: "1.7",
    fontSize: "15px"
  },

  chatCard: {
    background: "#f8fafc",
    padding: "25px",
    borderRadius: "20px",
    marginBottom: "25px"
  },

  chatTitle: {
    marginBottom: "18px",
    color: "#111827"
  },

  input: {
    width: "95%",
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    marginBottom: "20px",
    fontSize: "15px",
    color: "#111827"
  },

  answerBox: {
    background: "#eff6ff",
    padding: "22px",
    borderRadius: "16px",
    marginTop: "20px",
    color: "#111827",
    lineHeight: "1.7",
    borderLeft: "5px solid #2563eb"
  },

  timestampBox: {
    marginTop: "20px",
    background: "white",
    padding: "18px",
    borderRadius: "14px"
  },

  playButton: {
    marginTop: "12px",
    padding: "12px 18px",
    border: "none",
    borderRadius: "12px",
    background: "#16a34a",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  videoCard: {
    marginBottom: "30px"
  },

  video: {
    borderRadius: "18px"
  }

};

export default App;