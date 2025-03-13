import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar 
      position="static" 
      sx={{ backgroundColor: "transparent", boxShadow: "none", backdropFilter: "blur(10px)" }}
    >
      <Container maxWidth="lg">
        <Toolbar>
          <Typography 
            variant="h5" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: "bold", 
              fontSize: "1.8rem", 
              background: "linear-gradient(135deg, #007bff, #00c6ff)", 
              WebkitBackgroundClip: "text", 
              WebkitTextFillColor: "transparent",
              letterSpacing: "1px",
              cursor: "pointer"
            }}
            onClick={() => navigate(isAuthenticated ? "/" : "/login")}
          >
            MediConnect
          </Typography>

          <Box>
            {isAuthenticated ? (
              <>
                <Button onClick={() => navigate("/")} sx={navButtonStyle}>Home</Button>
                <Button 
                  onClick={() => navigate("/add-hospital")}
                  sx={{
                    ...navButtonStyle,
                    backgroundColor: "#007bff",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#0056b3", 
                      boxShadow: "0px 4px 12px rgba(0, 123, 255, 0.5)",
                    },
                  }}
                >
                  Add Hospital
                </Button>
                <Button onClick={() => navigate("/contact")} sx={navButtonStyle}>Contact</Button>
                <Button 
                  onClick={handleLogout} 
                  sx={{
                    ...navButtonStyle,
                    backgroundColor: "#d9534f",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#c9302c",
                      boxShadow: "0px 4px 12px rgba(217, 83, 79, 0.5)",
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => navigate("/login")} sx={navButtonStyle}>Login</Button>
                <Button 
                  onClick={() => navigate("/signup")} 
                  sx={{
                    ...navButtonStyle,
                    backgroundColor: "#28a745",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#218838",
                      boxShadow: "0px 4px 12px rgba(40, 167, 69, 0.5)",
                    },
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const navButtonStyle = {
  color: "#1a1a1a",
  mx: 1,
  backgroundColor: "rgba(70, 130, 180, 0.5)", 
  backdropFilter: "blur(8px)",
  borderRadius: "12px",
  padding: "8px 20px",
  transition: "all 0.3s",
  "&:hover": {
    backgroundColor: "rgba(70, 130, 180, 0.8)", 
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)", 
  },
};

export default Navbar;
