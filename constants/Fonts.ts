export const Fonts = {
  regular: "OpenSauceOne-Regular",
  medium: "OpenSauceOne-Medium",
  semiBold: "OpenSauceOne-SemiBold",
  bold: "OpenSauceOne-Bold",
} as const;

export type FontFamily = (typeof Fonts)[keyof typeof Fonts];
