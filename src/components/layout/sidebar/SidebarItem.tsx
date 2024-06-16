import { Link } from 'react-router-dom';
import { ListItemButton, ListItemText } from '@mui/material';
import { customColors } from '../../../styles';

interface IProps {
  url: string;
  title: string;
}
export default function SidebarItem({ url, title }: IProps) {
  return (
    <ListItemButton
      component={Link}
      to={url}
      sx={{
        '& .Mui-selected': {
          backgroundColor: customColors.white,
          color: customColors.black,
          '&:hover': {
            backgroundColor: customColors.white,
            color: customColors.black,
          },
        },
      }}
    >
      <ListItemText primary={title} />
    </ListItemButton>
  );
}
