import { Button } from "@mui/material";
import type { CustomButtomProps } from "./index.model";

export const CustomButton = ({
  children,
  sx,
  round = false,
  ...props
}: CustomButtomProps) => {
  return (
    <Button
      variant="outlined"
      sx={{
        fontSize: "16px",
        color: "#fff",
        backgroundColor: "#2e6c33",
        fontWeight: "700",
        borderColor: "#2e6c33",
        borderRadius: round ? "50%" : "20px",
        minWidth: round ? 0 : undefined,
        padding: round ? 0 : "4px 12px",
        textTransform: "none",
        transition: "all 0.3s ease",
        "&:hover": {
          filter: "brightness(1.2)",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
