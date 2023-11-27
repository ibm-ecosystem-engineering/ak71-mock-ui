import {atom} from "jotai";
import {loadable} from "jotai/utils";

import {FamilyAllowanceModel} from "../models";
import {familyAllowanceApi} from "../services";
import {atomWithRefresh} from "../utils";

export const familyAllowanceAtom = atomWithRefresh(
    () => familyAllowanceApi().listFamilyAllowanceCases(),
    familyAllowanceApi().listFamilyAllowanceCases()
)

export const familyAllowanceLoadable = loadable(familyAllowanceAtom)

const baseSelectedCaseAtom = atom<Promise<FamilyAllowanceModel | undefined>>(Promise.resolve(undefined))

type FamilyAllowanceInput = string | FamilyAllowanceModel;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const selectedFamilyAllowanceCaseAtom = atom<Promise<KycCaseModel | undefined>, CaseInput[]>(
    (get) => get(baseSelectedCaseAtom),
    (_, set, caseId: FamilyAllowanceInput) => {
        const result = (typeof caseId === 'string') ? familyAllowanceApi().getFamilyAllowanceCase(caseId) : Promise.resolve(caseId);

        set(baseSelectedCaseAtom, result);

        return result;
    }
);

export const selectedFamilyAllowanceAtomLoadable = loadable(selectedFamilyAllowanceCaseAtom);
