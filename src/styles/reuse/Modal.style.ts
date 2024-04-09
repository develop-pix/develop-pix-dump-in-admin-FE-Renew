/* eslint-disable import/prefer-default-export */
import { customColors } from '../base/Variable.style';

export const DeleteModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 150,
  bgcolor: `${customColors.color_bgcolor_grey}`,
  border: `3px solid ${customColors.main_pink}`,
  borderRadius: '15px',
  boxShadow: 24,
  padding: '20px 30px 20px 30px',
};
