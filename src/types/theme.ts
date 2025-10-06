export interface ThemeConfig {
  name: string;
  value: string;
  description: string;
  colors: {
    preview: string[];
    tokens: {
      background: string;
      foreground: string;
      card: string;
      cardForeground: string;
      popover: string;
      popoverForeground: string;
      primary: string;
      primaryForeground: string;
      secondary: string;
      secondaryForeground: string;
      muted: string;
      mutedForeground: string;
      accent: string;
      accentForeground: string;
      destructive: string;
      destructiveForeground: string;
      border: string;
      input: string;
      ring: string;
      sidebar: string;
      sidebarForeground: string;
      sidebarPrimary: string;
      sidebarPrimaryForeground: string;
      sidebarAccent: string;
      sidebarAccentForeground: string;
      sidebarBorder: string;
      sidebarRing: string;
    };
  };
}

export type ThemeTokens = ThemeConfig["colors"]["tokens"];
export type ThemeTokenKey = keyof ThemeTokens;

export type THEMES =
  | "Dark"
  | "Light"
  | "Midnight"
  | "Ocean"
  | "Forest"
  | "Sunset"
  | "Rose"
  | "Amber"
  | "Violet"
  | "Slate"
  | "Emerald"
  | "Sky"
  | "Crimson"
  | "VS Code"
  | "Slack"
  | "X (Twitter)"
  | "GitHub Dark"
  | "GitHub Light"
  | "Discord"
  | "Notion"
  | "Linear"
  | "Spotify"
  | "Dracula"
  | "Nord"
  | "Solarized Light"
  | "Monokai"
  | "Jira Dark"
  | "Trello Dark"
  | "YouTube Dark"
  | "Google Dark"
  | "WhatsApp Dark"
  | "custom-theme";
