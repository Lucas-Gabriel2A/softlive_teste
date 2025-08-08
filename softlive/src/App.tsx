import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ConfigProvider,
  theme as antTheme,
  Spin,
  App as AntApp, // 👈 renomeado pra não confundir com o seu componente
} from "antd";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { Suspense } from "react";
import { PageProducts } from "./pages/pageProducts";
import { PageProductForm } from "./pages/pageProductForm";

// -----------------------------
// Rotas da aplicação
// -----------------------------
const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<PageProducts />} />
        <Route path="/products" element={<PageProducts />} />
        <Route path="/products/new" element={<PageProductForm />} />
        <Route path="/products/edit/:id" element={<PageProductForm />} />
      </Routes>
    </Suspense>
  );
};

// -----------------------------
// Componente que aplica tema + rotas
// -----------------------------
const ThemeApp = () => {
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
      <AntApp>
        <Router>
          <AppRoutes />
        </Router>
      </AntApp>
    </ConfigProvider>
  );
};

// -----------------------------
// Provider do tema global
// -----------------------------
const AppWrapper = () => {
  return (
    <ThemeProvider>
      <ThemeApp />
    </ThemeProvider>
  );
};

export default AppWrapper;
