// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "@carbon/react";
import {useSetAtom} from "jotai";

import {familyAllowanceAtom} from "../../atoms";
import {InfoRow, Stack} from "../../components";
import {FamilyAllowanceModel, FamilyAllowanceStatus} from "../../models";
import {familyAllowanceApi} from "../../services";

export interface CaseDetailProps {
    familyAllowanceCase: FamilyAllowanceModel
}

export const CaseDetail: React.FunctionComponent<CaseDetailProps> = ({familyAllowanceCase}: CaseDetailProps) => {
    const navigate = useNavigate();
    const setFamilyAllowances = useSetAtom(familyAllowanceAtom)

    const service = familyAllowanceApi()

    const approveCase = () => {
        service.updateFamilyAllowanceStatus(familyAllowanceCase.id, FamilyAllowanceStatus.Approved)
            .catch(() => '')
            .then(() => setFamilyAllowances())
            .then(() => navigate('/'))
    }

    const declineCase = () => {
        service.updateFamilyAllowanceStatus(familyAllowanceCase.id, FamilyAllowanceStatus.Denied)
            .catch(() => '')
            .then(() => setFamilyAllowances())
            .then(() => navigate('/'))
    }

    const returnCase = () => {
        service.updateFamilyAllowanceStatus(familyAllowanceCase.id, FamilyAllowanceStatus.NeedsInfo)
            .catch(() => '')
            .then(() => setFamilyAllowances())
            .then(() => navigate('/'))
    }

    const cancel = () => {
        navigate('/')
    }

    const ButtonGroup = () => {
        if (FamilyAllowanceStatus[familyAllowanceCase.status] !== FamilyAllowanceStatus.Pending) {
            return (
                <>
                    <InfoRow label="Status" text={familyAllowanceCase.status}/>
                    <Button kind="tertiary" onClick={cancel}>Cancel</Button>
                </>
            )
        }

        return (
            <div style={{display: 'flex', gap: '10px', padding: '10px 0'}}>
                <Button kind="tertiary" onClick={cancel}>Cancel</Button>
                <Button onClick={returnCase}>Needs Info</Button>
                <Button onClick={approveCase}>Approve</Button>
                <Button onClick={declineCase}>Decline</Button>
            </div>
        )
    }

    return (
        <div>
            <h1>Family Allowance Case</h1>
            <Stack gap={3}>
                <InfoRow label="Name" text={`${familyAllowanceCase.firstName} ${familyAllowanceCase.lastName}`} />
                <InfoRow label="Type" text={familyAllowanceCase.type} />
                <ButtonGroup />
            </Stack>
        </div>
    )
}
