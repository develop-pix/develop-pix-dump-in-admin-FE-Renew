import { TableCell, TableRow as Row, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface IProps {
  id: number;
  src: string;
  name: string;
  title: string;
  description: string;
  term: string;
  hashtag: string;
}

export default function TableRow({
  id,
  src,
  name,
  title,
  description,
  term,
  hashtag,
}: IProps) {
  return (
    <Row hover role="checkbox" tabIndex={-1}>
      <TableCell
        align="center"
        sx={{ fontWeight: '700', fontSize: '16px', minWidth: 150 }}
      >
        <Box sx={{ width: '15vh', height: '15vh' }}>
          <img src={src} width="100%" height="100%" alt="event-manage" />
        </Box>
      </TableCell>
      <TableCell sx={{ fontSize: '16px', minWidth: 120 }}>{name}</TableCell>
      <TableCell sx={{ fontSize: '16px', minWidth: 150 }}>{title}</TableCell>
      <TableCell sx={{ fontSize: '16px', minWidth: 470 }}>
        {description}
      </TableCell>
      <TableCell sx={{ fontSize: '16px', minWidth: 120 }}>{term}</TableCell>
      <TableCell sx={{ fontSize: '16px', minWidth: 130 }}>{hashtag}</TableCell>
      <TableCell sx={{ fontSize: '16px', minWidth: 100 }}>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Link to={`/edit/${id}`}>
            <Button size="small" variant="contained" color="success">
              편집
            </Button>
          </Link>
          <Link to="/">
            <Button size="small" variant="contained" color="error">
              삭제
            </Button>
          </Link>
        </Box>
      </TableCell>
    </Row>
  );
}
