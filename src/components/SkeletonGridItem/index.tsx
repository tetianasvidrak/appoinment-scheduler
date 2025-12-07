import { Skeleton } from "@mui/material";

interface SkeletonGridItemProps {
  height?: number | string;
  count?: number;
}

export const SkeletonGridItem = ({
  count = 3,
  height = 24,
}: SkeletonGridItemProps) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="text-center">
          <Skeleton width="90%" height={height} />
        </div>
      ))}
    </>
  );
};
