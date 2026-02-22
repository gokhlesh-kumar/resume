import { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Avatar,
  Chip,
  CircularProgress,
  Divider,
  Fab,
  Typography,
  Tooltip,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DownloadIcon from "@mui/icons-material/Download";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { GoogleGenerativeAI, ChatSession } from "@google/generative-ai";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  role: "user" | "ai";
  content: string;
}

// ─── Theme ────────────────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    primary: { main: "#1a73e8", light: "#e8f0fe", dark: "#1557b0" },
    secondary: { main: "#34a853" },
    background: { default: "#f5f5f5", paper: "#ffffff" },
    text: { primary: "#202124", secondary: "#5f6368" },
  },
  typography: {
    fontFamily: '"Roboto", "Google Sans", sans-serif',
    h6: { fontWeight: 600, letterSpacing: 0.15 },
    body2: { fontSize: "0.875rem" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 24,
            backgroundColor: "#f8f9fa",
            transition: "all 0.2s ease",
            "&:hover": { backgroundColor: "#f1f3f4" },
            "&.Mui-focused": {
              backgroundColor: "#fff",
              boxShadow: "0 0 0 2px rgba(26,115,232,0.2)",
            },
          },
        },
      },
    },
  },
});

// ─── Gemini Config ────────────────────────────────────────────────────────────
const SYSTEM_CONTEXT = `You are an AI assistant for Gokhlesh Kumar, a Software Engineer at Softsensor.ai with experience at Samsung R&D. You help recruiters understand his expertise in React Native, Mobile Development, and ML Research.

Be concise, professional, and friendly. Highlight his key skills and experience when relevant. If asked something outside his professional profile, politely redirect to relevant professional topics. Keep answers to 2-4 sentences unless more detail is specifically requested.`;

const GEMINI_API_KEY: string = (import.meta.env.VITE_GEMINI_API_KEY ?? "").trim();

const SUGGESTIONS: string[] = [
  "What is his tech stack?",
  "Tell me about Samsung R&D",
  "What ML projects has he done?",
  "React Native expertise?",
];

// ─── Message Bubble ───────────────────────────────────────────────────────────
function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-start",
        gap: 1,
        mb: 1.75,
        animation: "fadeIn 0.22s ease-out",
        "@keyframes fadeIn": {
          from: { opacity: 0, transform: "translateY(6px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Avatar
        sx={{
          width: 28,
          height: 28,
          bgcolor: isUser ? "#e8f0fe" : "#34a853",
          color: isUser ? "#1a73e8" : "#fff",
          flexShrink: 0,
          mt: 0.5,
        }}
      >
        {isUser ? (
          <PersonOutlineIcon sx={{ fontSize: 15 }} />
        ) : (
          <SmartToyOutlinedIcon sx={{ fontSize: 15 }} />
        )}
      </Avatar>
      <Box
        sx={{
          maxWidth: "82%",
          px: 1.75,
          py: 1,
          borderRadius: isUser ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
          bgcolor: isUser ? "#1a73e8" : "#fff",
          color: isUser ? "#fff" : "#202124",
          boxShadow: isUser
            ? "0 2px 6px rgba(26,115,232,0.22)"
            : "0 1px 3px rgba(0,0,0,0.08)",
          border: isUser ? "none" : "1px solid #e8eaed",
          lineHeight: 1.55,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: "inherit", fontSize: "0.82rem" }}
        >
          {message.content}
        </Typography>
      </Box>
    </Box>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content:
        "👋 Hi! I'm an AI assistant for Gokhlesh Kumar. Ask me about his skills, experience at Softsensor.ai or Samsung R&D, or his React Native & ML projects!",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Init Gemini ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!GEMINI_API_KEY) return;
    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: SYSTEM_CONTEXT,
      });
      setChatSession(
        model.startChat({
          history: [],
          generationConfig: { maxOutputTokens: 512, temperature: 0.7 },
        }),
      );
    } catch (err) {
      console.error("Gemini init error:", err);
    }
  }, []);

  // ── Auto-scroll ─────────────────────────────────────────────────────────────
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ── Favicon ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    document.title = "Gokhlesh Kumar | Resume🧑‍💻";

    const createFavicon = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 64, 64);
        gradient.addColorStop(0, "#14b8a6");
        gradient.addColorStop(0.5, "#3b82f6");
        gradient.addColorStop(1, "#a855f7");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 32px system-ui, -apple-system, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("GK", 32, 34);

        const link =
          (document.querySelector("link[rel*='icon']") as HTMLLinkElement) ||
          document.createElement("link");
        link.type = "image/x-icon";
        link.rel = "shortcut icon";
        link.href = canvas.toDataURL("image/x-icon");
        document.getElementsByTagName("head")[0].appendChild(link);
      }
    };

    createFavicon();
  }, []);

  // ── Send message ────────────────────────────────────────────────────────────
  const sendMessage = async (text?: string): Promise<void> => {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setLoading(true);
    try {
      if (!chatSession)
        throw new Error("Set VITE_GEMINI_API_KEY in .env to enable AI.");
      const result = await chatSession.sendMessage(userText);
      const text = await result.response.text();
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: text },
      ]);
    } catch (err) {
      const error = err as Error;
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: GEMINI_API_KEY
            ? `Error: ${error.message}`
            : "⚠️ Add VITE_GEMINI_API_KEY to a .env file in the project root, then restart the dev server (Ctrl+C, then npm run dev).",
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  // Use Google Drive embed for the resume preview
  const DRIVE_FILE_ID = "1AKe8ZX_aZ0NPAD7OfvF_WZTlkO2f5CA5";
  const pdfEmbedSrc = `https://drive.google.com/file/d/${DRIVE_FILE_ID}/preview`;
  // Keep download using the same Drive file (you can swap to local later if needed)
  const pdfDownloadSrc = `https://drive.google.com/uc?export=download&id=${DRIVE_FILE_ID}`;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* ── Root: full-screen document preview ── */}
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* ── Full-screen PDF Viewer ── */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            bgcolor: "#525659",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "stretch",
            p: 0,
            overflow: "hidden",
          }}
        >
          <Box
            component="iframe"
            src={pdfEmbedSrc}
            title="Gokhlesh Kumar Resume"
            sx={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
              borderRadius: 0,
            }}
          />
        </Box>

        {/* ── Chat Sidebar (hidden for now: set SHOW_CHAT_SIDEBAR to true to restore) ── */}
        {false && (
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            width: { sm: "320px", md: "22%" },
            minWidth: 280,
            flexShrink: 0,
            flexDirection: "column",
            bgcolor: "#fff",
            borderLeft: "1px solid #e8eaed",
            overflow: "hidden",
          }}
        >
          {/* Sidebar Header */}
          <Box
            sx={{
              px: 2,
              py: 1.5,
              borderBottom: "1px solid #e8eaed",
              display: "flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "#fafafa",
              flexShrink: 0,
            }}
          >
            <Avatar
              sx={{
                width: 28,
                height: 28,
                bgcolor: "#34a853",
                boxShadow: "0 2px 5px rgba(52,168,83,0.3)",
              }}
            >
              <SmartToyOutlinedIcon sx={{ fontSize: 15 }} />
            </Avatar>
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, lineHeight: 1.2, fontSize: "0.8rem" }}
              >
                Ask about Gokhlesh
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
                <AutoAwesomeIcon sx={{ fontSize: 10, color: "#34a853" }} />
                <Typography
                  variant="caption"
                  sx={{
                    color: "#34a853",
                    fontWeight: 500,
                    fontSize: "0.68rem",
                  }}
                >
                  Gemini 1.5 Flash
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Messages — scrollable */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 1.5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {messages.map((msg, idx) => (
              <MessageBubble key={idx} message={msg} />
            ))}

            {/* Typing indicator */}
            {loading && (
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}
              >
                <Avatar sx={{ width: 28, height: 28, bgcolor: "#34a853" }}>
                  <SmartToyOutlinedIcon sx={{ fontSize: 15 }} />
                </Avatar>
                <Box
                  sx={{
                    px: 1.75,
                    py: 1,
                    borderRadius: "4px 16px 16px 16px",
                    bgcolor: "#fff",
                    border: "1px solid #e8eaed",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    display: "flex",
                    gap: 0.5,
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <Box
                      key={i}
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: "#bdbdbd",
                        animation: "bounce 1.2s ease-in-out infinite",
                        animationDelay: `${i * 0.2}s`,
                        "@keyframes bounce": {
                          "0%,80%,100%": { transform: "translateY(0)" },
                          "40%": { transform: "translateY(-5px)" },
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            <div ref={chatEndRef} />
          </Box>

          {/* Suggestion chips */}
          {messages.length <= 1 && !loading && (
            <Box sx={{ px: 1.5, pb: 1, flexShrink: 0 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  display: "block",
                  mb: 0.5,
                  ml: 0.25,
                  fontSize: "0.68rem",
                }}
              >
                Suggested
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {SUGGESTIONS.map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    size="small"
                    variant="outlined"
                    onClick={() => void sendMessage(s)}
                    sx={{
                      borderColor: "#e0e0e0",
                      color: "text.secondary",
                      fontSize: "0.68rem",
                      cursor: "pointer",
                      height: 24,
                      transition: "all 0.15s ease",
                      "&:hover": {
                        borderColor: "primary.main",
                        color: "primary.main",
                        bgcolor: "primary.light",
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          <Divider />

          {/* Input */}
          <Box
            sx={{
              p: 1.5,
              display: "flex",
              gap: 0.75,
              alignItems: "flex-end",
              flexShrink: 0,
            }}
          >
            <TextField
              inputRef={inputRef}
              fullWidth
              multiline
              maxRows={3}
              placeholder="Ask anything…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              size="small"
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-input": { fontSize: "0.8rem" },
              }}
            />
            <Tooltip title="Send (Enter)">
              <span>
                <IconButton
                  color="primary"
                  onClick={() => void sendMessage()}
                  disabled={!input.trim() || loading}
                  size="small"
                  sx={{
                    width: 34,
                    height: 34,
                    flexShrink: 0,
                    bgcolor:
                      input.trim() && !loading ? "primary.main" : "transparent",
                    color: input.trim() && !loading ? "#fff" : "text.disabled",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor:
                        input.trim() && !loading
                          ? "primary.dark"
                          : "transparent",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress
                      size={14}
                      sx={{ color: "primary.main" }}
                    />
                  ) : (
                    <SendIcon sx={{ fontSize: 15 }} />
                  )}
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        </Box>
        )}
      </Box>

      {/* ── Download FAB (all screen sizes) ── */}
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        component="a"
        href={pdfDownloadSrc}
        download="Gokhlesh_Kumar_Resume.pdf"
        sx={{
          display: "flex",
          position: "fixed",
          bottom: 24,
          right: 24,
          gap: 1,
          boxShadow: "0 4px 16px rgba(26,115,232,0.4)",
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.85rem",
        }}
      >
        <DownloadIcon sx={{ fontSize: 18 }} />
        Download Resume
      </Fab>
    </ThemeProvider>
  );
}
