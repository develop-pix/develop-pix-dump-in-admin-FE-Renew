import { TableCell, TableHead, TableRow } from '@mui/material';

interface IProps {
  headers: string[];
}
export default function TableHeader({ headers }: IProps) {
  return (
    <TableHead>
      <TableRow>
        {headers &&
          headers?.map((header) => (
            <TableCell
              key={header}
              align="center"
              sx={{ fontWeight: '700', fontSize: '16px', minWidth: '150' }}
            >
              {header}
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
}
