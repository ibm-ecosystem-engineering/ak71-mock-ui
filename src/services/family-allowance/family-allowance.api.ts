import {FamilyAllowanceModel, FamilyAllowanceStatus, FamilyAllowanceStatusFilter} from "../../models";

export abstract class FamilyAllowanceApi {

    abstract listFamilyAllowanceCases(status?: FamilyAllowanceStatusFilter): Promise<FamilyAllowanceModel[]>;

    abstract getFamilyAllowanceCase(id: string): Promise<FamilyAllowanceModel>;

    abstract updateFamilyAllowanceStatus(id: string, status: FamilyAllowanceStatus): Promise<FamilyAllowanceModel>;

}
