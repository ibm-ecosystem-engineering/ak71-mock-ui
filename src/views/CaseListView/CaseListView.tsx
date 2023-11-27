// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import {useAtomValue} from "jotai";
import {useNavigate} from 'react-router-dom';
import {Loading} from "@carbon/react";

import {familyAllowanceLoadable} from "../../atoms";
import {DataTable} from "../../components";
import {FamilyAllowanceModel} from "../../models";

export interface CaseListViewProps {
}

export const CaseListView: React.FunctionComponent<CaseListViewProps> = () => {
    const loadableFamilyAllowance = useAtomValue(familyAllowanceLoadable);
    const navigate = useNavigate();

    const headerData: Array<{header: string, key: keyof FamilyAllowanceModel}> = [
        {header: 'First Name', key: 'firstName'},
        {header: 'Last Name', key: 'lastName'},
        {header: 'Status', key: 'status'},
        {header: 'Type', key: 'type'},
    ]

    const navigateToCase = (caseId: string) => {
        const url = `/case/${caseId}`

        navigate(url)
    }

    if (loadableFamilyAllowance.state === 'loading') {
        return (<Loading active={true} withOverlay={true} />)
    }

    if (loadableFamilyAllowance.state === 'hasError') {
        return (<div>Error loading cases</div>)
    }

    const rowData: FamilyAllowanceModel[] = loadableFamilyAllowance.data

    return (
        <div>
            <DataTable
                headerData={headerData}
                rowData={rowData}
                onRowClick={navigateToCase} />
        </div>
    )
}
