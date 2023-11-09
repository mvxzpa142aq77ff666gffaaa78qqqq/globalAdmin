import { Skeleton, Stack, Box, Grid } from "@mui/material"


function SkelethonCard() {
    return (
        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}  >
            <Box
                sx={{
                    height: "160px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Skeleton width={"100%"} height="100%"/>
            </Box>
        </Grid>
    )
}

export default SkelethonCard