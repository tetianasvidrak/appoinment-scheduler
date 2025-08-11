export type TimeSlotProps = {
  employeeId: string;
  time: string;
  occupied: boolean;
  onClick: () => void;
  children: React.ReactNode;
};
