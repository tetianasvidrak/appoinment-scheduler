import { Button, type ButtonProps } from "@mui/material";

export type CustomButtonProps = ButtonProps;

export const CustomButton = ({ children, sx, ...props }: CustomButtonProps) => {
  return (
    <Button
      variant="outlined"
      sx={{
        fontSize: "16px",
        padding: "4px 12px",
        color: "#fff",
        backgroundColor: "#2e6c33",
        fontWeight: "700",
        borderColor: "#2e6c33",
        borderRadius: "20px",
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
