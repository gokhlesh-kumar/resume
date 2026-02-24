import { useEffect } from "react";
import {
  Box,
  Tooltip,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// ─── Theme ────────────────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#8ab4f8", light: "#d2e3fc", dark: "#1a73e8" },
    background: { default: "#202124" },
  },
  typography: {
    fontFamily: '"Roboto", "Inter", sans-serif',
  },
});

export default function App() {
  // ── Favicon & Title & Viewport Fix ──────────────────────────────────────────
  useEffect(() => {
    document.title = "Gokhlesh Kumar | Resume";

    // 1. IMPROVEMENT: Force viewport to prevent entire page zooming
    // Removed strict viewport constraints to allow native browser zooming on mobile

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

  const DRIVE_FILE_ID = "1AKe8ZX_aZ0NPAD7OfvF_WZTlkO2f5CA5";
  const pdfEmbedSrc = `https://drive.google.com/file/d/${DRIVE_FILE_ID}/preview`;
  const pdfDownloadSrc = `https://drive.google.com/uc?export=download&id=${DRIVE_FILE_ID}`;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          display: "flex",
          height: "100dvh", // Using dvh for better mobile address bar handling
          width: "100vw",
          overflow: "hidden",
          flexDirection: "column",
          bgcolor: "#323639",
        }}
      >
        {/* ── Top Action Bar ── */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: { xs: 1, sm: 1.5 },
            px: { xs: 1, sm: 3 },
            py: { xs: 1, sm: 2 },
            flexShrink: 0,
            bgcolor: "#323639",
            zIndex: 10,
          }}
        >
          <Tooltip title="Go to Interactive Portfolio" placement="bottom">
            <Box
              component="a"
              href="https://gokhlesh-kumar.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 0.5, sm: 1 },
                px: { xs: 1.5, sm: 3 },
                py: { xs: 1, sm: 1.25 },
                borderRadius: "8px",
                textDecoration: "none",
                color: "#f8f9fa",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                fontWeight: 500,
                fontSize: { xs: "0.75rem", sm: "0.85rem" },
                whiteSpace: "nowrap",
                "&:hover": { background: "rgba(255, 255, 255, 0.1)" },
              }}
            >
              <OpenInNewIcon sx={{ fontSize: { xs: 14, sm: 18 } }} />
              <Box
                component="span"
                sx={{ display: { xs: "none", sm: "inline" } }}
              >
                View Portfolio
              </Box>
              <Box
                component="span"
                sx={{ display: { xs: "inline", sm: "none" } }}
              >
                Portfolio
              </Box>
            </Box>
          </Tooltip>

          <Tooltip title="Download PDF Version" placement="bottom">
            <Box
              component="a"
              href={pdfDownloadSrc}
              download="Gokhlesh_Kumar_Resume.pdf"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: 0.5, sm: 1 },
                px: { xs: 1.5, sm: 3 },
                py: { xs: 1, sm: 1.25 },
                borderRadius: "8px",
                textDecoration: "none",
                color: "#1f2937",
                background: "#f8f9fa",
                fontWeight: 600,
                fontSize: { xs: "0.75rem", sm: "0.85rem" },
                whiteSpace: "nowrap",
                "&:hover": {
                  background: "#ffffff",
                  transform: "translateY(-1px)",
                },
              }}
            >
              <DownloadIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
              <Box component="span" sx={{ display: "inline" }}>
                Download
              </Box>
            </Box>
          </Tooltip>
        </Box>

        {/* ── PDF Viewer Area ── */}
        <Box
          sx={{
            width: "100%",
            flex: 1,
            position: "relative",
            overflow: "hidden",
            // 3. IMPROVEMENT: Webkit smooth scrolling for iOS
            WebkitOverflowScrolling: "touch",
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
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
