
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import {Stack as CarbonStack} from "@carbon/react/lib/components/Stack"

export interface StackProps {
    gap: number;
    orientation?: 'horizontal' | 'vertical'
    children: unknown | unknown[];
}

export const Stack: React.FunctionComponent<StackProps> = (props: StackProps) => {

    const orientation = props.orientation || 'vertical'

    return (
        <CarbonStack gap={props.gap} orientation={orientation}>
            {props.children}
        </CarbonStack>
    )
}
