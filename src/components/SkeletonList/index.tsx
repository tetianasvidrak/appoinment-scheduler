import { Box, List, ListItem, Skeleton } from "@mui/material";

export const SkeletonList = () => {
  return (
    <List
      className="scroll-thin"
      sx={{
        maxHeight: 220,
        minHeight: 220,
        overflowY: "auto",
        padding: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {[...Array(7)].map((_, i) => (
        <ListItem
          key={i}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Skeleton variant="circular" width={8} height={8} sx={{ mr: 1 }} />
            <Skeleton variant="text" width={120} height={20} />
          </Box>
          <Skeleton variant="text" width={40} height={20} />
        </ListItem>
      ))}
    </List>
  );
};
