//Jacek
import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Logout from '@mui/icons-material/Logout';
import ArticleIcon from '@mui/icons-material/Article';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { LoginForm } from '../loginform';
import { RegisterForm } from '../registerform';
import { Link } from "react-router-dom"
import { getAuth, signOut} from 'firebase/auth'
import { Profile } from '../../content/profile';
import ModeIcon from '@mui/icons-material/Mode';
import { useUserContext } from "../../services/user-context";









export const UserPanel = () => {
  const { avatarUrl } = useUserContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

const handleSignOutClick = () => {
  const auth = getAuth();
  signOut(auth);
}

const handleClickAvatarProfile = () => {
  Profile()
}



  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        
        <Tooltip title="Panel użytkownika">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={avatarUrl} alt="avatar"sx={{ width: 56, height: 56 }}  />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 56,
              height: 56,
              ml: -0.5,
              mr: 25,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 25,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar src={avatarUrl} alt="avatar" sx={{ my: 2, width: 56, height: 56 }} />
       </MenuItem>
       <MenuItem>
       <ModeIcon sx={{ color: 'rgba(0, 0, 0, 0.54);' }} />
       <Button sx={{color:"#64C2A7"}} component={Link} to='/profile' onClick={handleClickAvatarProfile}>Edytuj dane</Button>
       </MenuItem>
        <MenuItem>
          <ArticleIcon sx={{ color: 'rgba(0, 0, 0, 0.54);' }} />
          <Button sx={{color:"#64C2A7"}} >Dodaj ogłoszenie</Button>
        </MenuItem>
        <MenuItem>
          <button className='close-button' variant='text' sx={{ color: 'white', fontSize: '16px', border: 'none ', borderRadius: '45px', padding:'15px',  }}>Zamknij ogłoszenie</button>

        </MenuItem>
        <Divider />
        <MenuItem>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Button sx={{color:"#64C2A7"}} onClick={handleSignOutClick}>Wyloguj się</Button>
        </MenuItem>
      </Menu>
    </>
  );
}
