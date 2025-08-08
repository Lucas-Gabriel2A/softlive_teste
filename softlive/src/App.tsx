import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider, theme as antTheme, Spin, Result } from "antd";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { Suspense } from "react";
import { PageProducts } from "./pages/pageProducts";

export const Themeapp = () => {
  const { theme, isDarkMode } = useTheme();
  const antDesignTheme = {
    algorithm: isDarkMode ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
    token: {
      colorPrimary: theme.colors.primary,
      colorSuccess: theme.colors.success,
      colorWarning: "#FFA500",
      colorError: theme.colors.error,
      colorTextBase: theme.colors.text,
      colorBgBase: theme.colors.background,
      borderRadius: 8,
      fontFamily: theme.fonts.primary,
    },
  };

  return (
    <ConfigProvider theme={antDesignTheme}>
      <Router>
        {/* Suspense pode envolver todas as rotas para simplificar */}
        <Suspense fallback={<Spin size="large" />}>
          <Routes>
            {/* --- ROTAS PÚBLICAS (com layout) --- */}
            <Route path="/" element={<PageProducts />} />
          </Routes>
        </Suspense>
      </Router>
    </ConfigProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>

        <Themeapp />
     
    </ThemeProvider>
  );
};

export default App;
