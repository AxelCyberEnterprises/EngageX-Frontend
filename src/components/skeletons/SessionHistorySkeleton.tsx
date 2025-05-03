import React from 'react';
import { TableCell, TableRow } from '../ui/table';
import { Skeleton } from '../ui/skeleton';

interface SkeletonPayload {
    rows: number;
    columns: any[];
}
const SessionHistorySkeleton: React.FC<SkeletonPayload> = ({ rows, columns }) => {
    return (
        <>
            {Array.from({ length: rows }).map((_, i) => (
                <TableRow key={`skeleton-row-${i}`}>
                    {Array.from({ length: columns.length }).map((_, j) => (
                        <TableCell key={`skeleton-cell-${i}-${j}`}>
                            <Skeleton className="h-6 w-full" />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    );
};

export default SessionHistorySkeleton;