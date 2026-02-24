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
  const DRIVE_FILE_ID = "1AKe8ZX_aZ0NPAD7OfvF_WZTlkO2f5CA5";
  
  // Embed link for Desktop
  const pdfEmbedSrc = `https://drive.google.com/file/d/${DRIVE_FILE_ID}/preview`;
  // Direct View link for Mobile (Triggers app or native viewer)
  const pdfMobileViewSrc = `https://drive.google.com/file/d/${DRIVE_FILE_ID}/view?usp=sharing`;
  // Direct Download link
  const pdfDownloadSrc = `https://drive.google.com/uc?export=download&id=${DRIVE_FILE_ID}`;

  useEffect(() => {
    document.title = "Gokhlesh Kumar | Resume";

    // ── MOBILE DETECTION & REDIRECT ──
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (isMobile) {
      // Redirect to Google Drive viewer directly on mobile
      window.location.href = pdfMobileViewSrc;
      return; 
    }

    // ── Favicon Logic ──
    const createFavicon = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64; canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 64, 64);
        gradient.addColorStop(0, "#14b8a6");
        gradient.addColorStop(1, "#a855f7");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 32px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("GK", 32, 34);
        const link = (document.querySelector("link[rel*='icon']") as HTMLLinkElement) || document.createElement("link");
        link.type = "image/x-icon";
        link.rel = "shortcut icon";
        link.href = canvas.toDataURL("image/x-icon");
        document.getElementsByTagName("head")[0].appendChild(link);
      }
    };
    createFavicon();
  }, [pdfMobileViewSrc]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          height: "100dvh",
          width: "100vw",
          overflow: "hidden",
          flexDirection: "column",
          bgcolor: "#323639",
        }}
      >
        {/* ── Top Action Bar (Desktop Only) ── */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 1.5,
            px: 3,
            py: 2,
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
                gap: 1,
                px: 3,
                py: 1.25,
                borderRadius: "8px",
                textDecoration: "none",
                color: "#f8f9fa",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                fontWeight: 500,
                fontSize: "0.85rem",
                "&:hover": { background: "rgba(255, 255, 255, 0.1)" },
              }}
            >
              <OpenInNewIcon sx={{ fontSize: 18 }} />
              <span>View Portfolio</span>
            </Box>
          </Tooltip>

          <Tooltip title="Download PDF Version" placement="bottom">
            <Box
              component="a"
              href={pdfDownloadSrc}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 3,
                py: 1.25,
                borderRadius: "8px",
                textDecoration: "none",
                color: "#1f2937",
                background: "#f8f9fa",
                fontWeight: 600,
                fontSize: "0.85rem",
                "&:hover": { background: "#ffffff" },
              }}
            >
              <DownloadIcon sx={{ fontSize: 18 }} />
              <span>Download</span>
            </Box>
          </Tooltip>
        </Box>

        {/* ── PDF Viewer Area ── */}
        <Box sx={{ width: "100%", flex: 1, position: "relative" }}>
          <Box
            component="iframe"
            src={pdfEmbedSrc}
            title="Gokhlesh Kumar Resume"
            sx={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}