export type Theme = {
  light: Record<string, string>;
  dark: Record<string, string>;
};

const baseTheme = {
  light: {
    "--radius": "0.65rem",
    "--background": "oklch(1 0 0)",
    "--foreground": "oklch(0.141 0.005 285.823)",
    "--card": "oklch(1 0 0)",
    "--card-foreground": "oklch(0.141 0.005 285.823)",
    "--popover": "oklch(1 0 0)",
    "--popover-foreground": "oklch(0.141 0.005 285.823)",
    "--secondary": "oklch(0.967 0.001 286.375)",
    "--secondary-foreground": "oklch(0.21 0.006 285.885)",
    "--muted": "oklch(0.967 0.001 286.375)",
    "--muted-foreground": "oklch(0.552 0.016 285.938)",
    "--accent": "oklch(0.967 0.001 286.375)",
    "--accent-foreground": "oklch(0.21 0.006 285.885)",
    "--destructive": "oklch(0.577 0.245 27.325)",
    "--border": "oklch(0.92 0.004 286.32)",
    "--input": "oklch(0.92 0.004 286.32)",
  },
  dark: {
    "--background": "oklch(0.141 0.005 285.823)",
    "--foreground": "oklch(0.985 0 0)",
    "--card": "oklch(0.21 0.006 285.885)",
    "--card-foreground": "oklch(0.985 0 0)",
    "--popover": "oklch(0.21 0.006 285.885)",
    "--popover-foreground": "oklch(0.985 0 0)",
    "--secondary": "oklch(0.274 0.006 286.033)",
    "--secondary-foreground": "oklch(0.985 0 0)",
    "--muted": "oklch(0.274 0.006 286.033)",
    "--muted-foreground": "oklch(0.705 0.015 286.067)",
    "--accent": "oklch(0.274 0.006 286.033)",
    "--accent-foreground": "oklch(0.985 0 0)",
    "--destructive": "oklch(0.704 0.191 22.216)",
    "--border": "oklch(1 0 0 / 10%)",
    "--input": "oklch(1 0 0 / 15%)",
  },
};

export const themes: Record<string, Theme> = {
  default: {
    light: {
      ...baseTheme.light,
      "--primary": "oklch(0.205 0 0)",
      "--primary-foreground": "oklch(0.985 0 0)",
      "--ring": "oklch(0.708 0 0)",
    },
    dark: {
      ...baseTheme.dark,
      "--primary": "oklch(0.922 0 0)",
      "--primary-foreground": "oklch(0.205 0 0)",
      "--ring": "oklch(0.556 0 0)",
    },
  },
  red: {
    light: {
      ...baseTheme.light,
      "--primary": "oklch(0.65 0.25 25)",
      "--primary-foreground": "oklch(0.98 0.016 73.684)",
      "--ring": "oklch(0.65 0.25 25)",
    },
    dark: {
      ...baseTheme.dark,
      "--primary": "oklch(0.75 0.25 25)",
      "--primary-foreground": "oklch(0.98 0.016 73.684)",
      "--ring": "oklch(0.75 0.25 25)",
    },
  },
  rose: {
    light: {
      ...baseTheme.light,
      "--primary": "oklch(0.65 0.25 350)",
      "--primary-foreground": "oklch(0.98 0.016 73.684)",
      "--ring": "oklch(0.65 0.25 350)",
    },
    dark: {
      ...baseTheme.dark,
      "--primary": "oklch(0.75 0.25 350)",
      "--primary-foreground": "oklch(0.98 0.016 73.684)",
      "--ring": "oklch(0.75 0.25 350)",
    },
  },
  orange: {
    light: {
      ...baseTheme.light,
      "--primary": "oklch(0.65 0.25 45)",
      "--primary-foreground": "oklch(0.98 0.016 73.684)",
      "--ring": "oklch(0.65 0.25 45)",
    },
    dark: {
      ...baseTheme.dark,
      "--primary": "oklch(0.75 0.25 45)",
      "--primary-foreground": "oklch(0.98 0.016 73.684)",
      "--ring": "oklch(0.75 0.25 45)",
    },
  },
  green: {
    light: {
      ...baseTheme.light,
      "--primary": "oklch(0.65 0.25 145)",
      "--primary-foreground": "oklch(0.98 0.016 73.684)",
      "--ring": "oklch(0.65 0.25 145)",
    },
    dark: {
      ...baseTheme.dark,
      "--primary": "oklch(0.75 0.25 145)",
      "--primary-foreground": "oklch(0.98 0.016 73.684)",
      "--ring": "oklch(0.75 0.25 145)",
    },
  },
  blue: {
    light: {
      ...baseTheme.light,
      "--primary": "oklch(0.65 0.25 245)",
      "--primary-foreground": "oklch(0.98 0.016 73.684)",
      "--ring": "oklch(0.65 0.25 245)",
    },
    dark: {
      ...baseTheme.dark,
      "--primary": "oklch(0.75 0.25 245)",
      "--primary-foreground": "oklch(0.98 0.016 73.684)",
      "--ring": "oklch(0.75 0.25 245)",
    },
  },
  yellow: {
    light: {
      ...baseTheme.light,
      "--primary": "oklch(0.65 0.25 85)",
      "--primary-foreground": "oklch(0.98 0.016 73.684)",
      "--ring": "oklch(0.65 0.25 85)",
    },
    dark: {
      ...baseTheme.dark,
      "--primary": "oklch(0.75 0.25 85)",
      "--primary-foreground": "oklch(0.98 0.016 73.684)",
      "--ring": "oklch(0.75 0.25 85)",
    },
  },
  violet: {
    light: {
      ...baseTheme.light,
      "--primary": "oklch(0.65 0.25 285)",
      "--primary-foreground": "oklch(0.98 0.016 73.684)",
      "--ring": "oklch(0.65 0.25 285)",
    },
    dark: {
      ...baseTheme.dark,
      "--primary": "oklch(0.75 0.25 285)",
      "--primary-foreground": "oklch(0.98 0.016 73.684)",
      "--ring": "oklch(0.75 0.25 285)",
    },
  },
  // További témák hozzáadása...
}; 