type Visit = { id: string; employeeId: string; time: string; duration: number };

export type VisitProps = {
  visit: Visit;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};
