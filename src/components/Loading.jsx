import Skeleton from '@mui/material/Skeleton';

export const Loading = () => {
    return(
        <div className="loading">
                    <div className="loading-inside">
                    {/* For variant="text", adjust the height via font-size */}
                    <Skeleton variant="text" width={40} sx={{ fontSize: '1rem'}} />

                    {/* For other variants, adjust the size with `width` and `height` */}
                    <Skeleton variant="circular" width={40} height={40}  />
                    <Skeleton variant="rectangular" width={210} height={60}  />
                    <Skeleton variant="rounded" width={210} height={60} />
                    </div>
                </div>
    )
}