export type VisitType = {
  id: string;
  employeeId: string;
  time: string;
  duration: number;
};

export type VisitProps = {
  visit: VisitType;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};
