import { Box, CircularProgress } from '@mui/material';

export default function LoadingSpinner({ size = 32 }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 8,
      }}
    >
      <CircularProgress size={size} sx={{ color: 'primary.main' }} />
    </Box>
  );
}
