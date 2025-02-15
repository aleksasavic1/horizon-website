import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    orbitron: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    orbitron?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    orbitron: true;
  }
}
