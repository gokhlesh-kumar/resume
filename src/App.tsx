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

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  // ── Favicon & Title ─────────────────────────────────────────────────────────
  useEffect(() => {
    document.title = "Gokhlesh Kumar | Resume";

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

  // Use Google Drive embed for the resume preview
  const DRIVE_FILE_ID = "1AKe8ZX_aZ0NPAD7OfvF_WZTlkO2f5CA5";
  const pdfEmbedSrc = `https://drive.google.com/file/d/${DRIVE_FILE_ID}/preview`;
  const pdfDownloadSrc = `https://drive.google.com/uc?export=download&id=${DRIVE_FILE_ID}`;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* ── Root ── */}
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
          position: "relative",
          bgcolor: "#323639",
        }}
      >
        {/* ── Floating Action Buttons (Top Right Corner - Desktop & Mobile Download) ── */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: 12, sm: 20 },
            right: { xs: 12, sm: 24 },
            display: "flex",
            flexDirection: "row",
            gap: 1.5,
            zIndex: 10,
            alignItems: "flex-end",
          }}
        >
          {/* View Portfolio Button (Secondary Glass) - Visible here on tablet/desktop ONLY */}
          <Tooltip title="Go to Interactive Portfolio" placement="bottom">
            <Box
              component="a"
              href="https://gokhlesh-kumar.github.io/"
              target="_blank" rel="noopener noreferrer"
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                px: 3,
                py: 1.25,
                borderRadius: "8px",
                textDecoration: "none",
                color: "#f8f9fa",
                background: "rgba(32, 33, 36, 0.4)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                fontWeight: 500,
                fontSize: "0.85rem",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 255, 255, 0.4)",
                  color: "#ffffff",
                },
              }}
            >
              <OpenInNewIcon sx={{ fontSize: 18 }} />
              <span>View Portfolio</span>
            </Box>
          </Tooltip>

          {/* Download Resume Button (Primary) - Only icon on mobile, full text on tablet/desktop */}
          <Tooltip title="Download PDF Version" placement="bottom">
            <Box
              component="a"
              href={pdfDownloadSrc}
              download="Gokhlesh_Kumar_Resume.pdf"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: 0, sm: 1 },
                px: { xs: 1.25, sm: 3 },
                py: { xs: 1.25, sm: 1.25 },
                borderRadius: { xs: "50%", sm: "8px" },
                textDecoration: "none",
                color: "#1f2937",
                background: "#f8f9fa",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                fontWeight: 600,
                fontSize: "0.85rem",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                border: "1px solid rgba(255,255,255,0.8)",
                minWidth: { xs: "44px", sm: "auto" },
                minHeight: { xs: "44px", sm: "auto" },
                "&:hover": {
                  background: "#ffffff",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              <DownloadIcon sx={{ fontSize: { xs: 20, sm: 18 } }} />
              <Box
                component="span"
                sx={{ display: { xs: "none", sm: "inline" } }}
              >
                Download
              </Box>
            </Box>
          </Tooltip>
        </Box>

        {/* ── Floating Action Button (Bottom Right Corner - Mobile Portfolio ONLY) ── */}
        <Box
          sx={{
            position: "absolute",
            bottom: 24,
            right: 16,
            display: { xs: "flex", sm: "none" },
            zIndex: 10,
          }}
        >
          <Tooltip title="Go to Interactive Portfolio" placement="top">
            <Box
              component="a"
              href="https://gokhlesh-kumar.github.io/"
              target="_blank" rel="noopener noreferrer"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.75,
                px: 2,
                py: 1,
                borderRadius: "24px",
                textDecoration: "none",
                color: "#f8f9fa",
                background: "rgba(32, 33, 36, 0.6)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                fontWeight: 500,
                fontSize: "0.8rem",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
            >
              <OpenInNewIcon sx={{ fontSize: 16 }} />
              <span>View Portfolio</span>
            </Box>
          </Tooltip>
        </Box>

        {/* ── PDF Viewer Area ── */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            flex: 1,
            bgcolor: "#525659",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "stretch",
            p: 0,
            overflow: "hidden",
            pt: 0, // No extra padding needed since buttons absolute positioned
          }}
        >
          <Box
            component="iframe"
            src={pdfEmbedSrc}
            title="Gokhlesh Kumar Resume"
            sx={{
              width: "100%",
              height: "100%",
              flex: 1,
              border: "none",
              display: "block",
              borderRadius: 0,
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
