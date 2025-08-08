export const lightTheme = {
  colors: {
    primary: '#40E0D0', // Turquesa principal
    primaryLight: '#65E6D9',
    primaryDark: '#2CB4A8',
    primaryAlpha: 'rgba(64, 224, 208, 0.1)',
    secondary: '#1A1A1A',
    secondaryLight: '#4A4A4A',
    secondaryDark: '#000000',
    background: '#FFFFFF',
    backgroundAlt: '#F8F9FA',
    surface: '#F8F9FA',
    surfaceHover: '#F0F0F0',
    text: '#1A1A1A',
    textLight: '#4A4A4A',
    textMuted: '#6C757D',
    textInverse: '#FFFFFF',
    border: '#E1E1E1',
    borderLight: '#F0F0F0',
    borderDark: '#D1D1D1',
    error: '#FF453A',
    errorLight: '#FFE5E5',
    success: '#32D74B',
    successLight: '#E6F9E8',
    warning: '#FFD60A',
    warningLight: '#FFF8E5',
    info: '#0A84FF',
    infoLight: '#E5F1FF',
    cardBg: '#FFFFFF',
    headerBg: '#FFFFFF',
    footerBg: '#1A1A1A',
    gradients: {
      primary: 'linear-gradient(135deg, #40E0D0 0%, #2CB4A8 100%)',
      secondary: 'linear-gradient(135deg, #1A1A1A 0%, #4A4A4A 100%)',
      dark: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))',
      glass: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9))',
    },
    overlay: {
      light: 'rgba(255, 255, 255, 0.8)',
      dark: 'rgba(0, 0, 0, 0.7)',
    }
  },
  fonts: {
    primary: "'Roboto', sans-serif",
    heading: "'Montserrat', sans-serif",
    mono: "'Roboto Mono', monospace",
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      md: '1rem',       // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '4rem',    // 64px
    },
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    }
  },
  spacing: {
    '2xs': '0.125rem', // 2px
    xs: '0.25rem',     // 4px
    sm: '0.5rem',      // 8px
    md: '1rem',        // 16px
    lg: '1.5rem',      // 24px
    xl: '2rem',        // 32px
    '2xl': '2.5rem',   // 40px
    '3xl': '3rem',     // 48px
    '4xl': '4rem',     // 64px
    '5xl': '6rem',     // 96px
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',    // 4px
    md: '0.5rem',     // 8px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    '2xl': '2rem',    // 32px
    full: '9999px',
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1400px',
  },
  shadows: {
    none: 'none',
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.15)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  transitions: {
    none: 'none',
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
    timing: {
      ease: 'ease',
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }
  },
  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  }
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: '#40E0D0',
    primaryLight: '#65E6D9',
    primaryDark: '#2CB4A8',
    primaryAlpha: 'rgba(64, 224, 208, 0.2)',
    secondary: '#F8F9FA',
    secondaryLight: '#FFFFFF',
    secondaryDark: '#E1E1E1',
    background: '#1A1A1A',
    backgroundAlt: '#2A2A2A',
    surface: '#2A2A2A',
    surfaceHover: '#3A3A3A',
    text: '#FFFFFF',
    textLight: '#E1E1E1',
    textMuted: '#A0A0A0',
    textInverse: '#1A1A1A',
    border: '#3A3A3A',
    borderLight: '#4A4A4A',
    borderDark: '#2A2A2A',
    cardBg: '#2A2A2A',
    headerBg: '#1A1A1A',
    footerBg: '#2A2A2A',
    gradients: {
      ...lightTheme.colors.gradients,
      glass: 'linear-gradient(rgba(26, 26, 26, 0.9), rgba(26, 26, 26, 0.9))',
    },
    overlay: {
      light: 'rgba(255, 255, 255, 0.1)',
      dark: 'rgba(0, 0, 0, 0.8)',
    }
  },
  shadows: {
    ...lightTheme.shadows,
    xs: '0 1px 2px rgba(0, 0, 0, 0.2)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.3)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.4)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)',
  },
}; 