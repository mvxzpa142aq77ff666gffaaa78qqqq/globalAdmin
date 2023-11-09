import { Skeleton, Stack, Box } from "@mui/material"


function SkeletonColum() {
    return (
        <Stack spacing={2} >
            <Stack direction={"row"} spacing={3}>
                <Skeleton height={"40px"} width={"30%"} />
                <Skeleton width={"100%"} />
                <Skeleton width={"25%"} />
                <Skeleton width={"50%"} />
                <Skeleton width={"20%"} />
                <Skeleton width={"20%"} />
            </Stack>
        </Stack>
    )
}

export default SkeletonColum