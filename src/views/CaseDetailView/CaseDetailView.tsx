
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Loading} from "@carbon/react";
import {useAtomValue, useSetAtom} from "jotai";

import {CaseDetail} from "./CaseDetail";
import {selectedFamilyAllowanceAtomLoadable, selectedFamilyAllowanceCaseAtom} from "../../atoms";
import {FamilyAllowanceModel} from "../../models";

export interface CaseDetailViewProps {
}

const basePath = '/'

export const CaseDetailView: React.FunctionComponent<CaseDetailViewProps> = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const selectedCaseLoadable = useAtomValue(selectedFamilyAllowanceAtomLoadable);
    const setSelectedCase = useSetAtom(selectedFamilyAllowanceCaseAtom);

    if (selectedCaseLoadable.state === 'loading') {
        return (
            <div className="loadingContainer">
                <Loading
                    active={true}
                    description="Active loading indicator" withOverlay={false}
                />
            </div>
        )
    } else if (selectedCaseLoadable.state === 'hasError') {
        return (
            <div>
                <div>Error: {selectedCaseLoadable.error as string}</div>
            </div>
        )
    }

    const selectedCase: FamilyAllowanceModel | undefined = selectedCaseLoadable.data

    if (id === undefined) {
        navigate(basePath)
    } else if (id !== 'new' && selectedCase?.id !== id) {
        setSelectedCase(id);
    }

    return (<CaseDetail familyAllowanceCase={selectedCase} />)
}
