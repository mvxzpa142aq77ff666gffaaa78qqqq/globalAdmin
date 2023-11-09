import { Skeleton, Stack, Box } from "@mui/material"
import SkeletonColum from "./skelethonColum"

function SkeletonTable() {
    return (
        <Stack spacing={2} >
            <Stack spacing={2} >
                <Skeleton variant="rectangular" height={40} />
                <SkeletonColum />
            </Stack>

            <Stack spacing={2} >
                <SkeletonColum />
            </Stack>
            <Stack spacing={2} >
                <SkeletonColum />
            </Stack>
            <Stack spacing={2} >
                <SkeletonColum />
            </Stack>
            <Stack spacing={2} >
                <SkeletonColum />
            </Stack>
            <Stack spacing={2} >
                <SkeletonColum />
            </Stack>
            <Stack spacing={2} >
                <SkeletonColum />
            </Stack>
            <Stack spacing={2} >
                <SkeletonColum />
            </Stack>
            <Stack spacing={2} >
                <SkeletonColum />
            </Stack>
            <Stack spacing={2} >
                <SkeletonColum />
            </Stack>

        </Stack>
    )
}

export default SkeletonTable