import {FamilyAllowanceApi} from "./family-allowance.api.ts";
import {FamilyAllowanceGraphql} from "./family-allowance.graphql.ts";

export * from './family-allowance.api'

let _instance: FamilyAllowanceApi
export const familyAllowanceApi = (): FamilyAllowanceApi => {
    if (_instance) {
        return _instance
    }

    return _instance = new FamilyAllowanceGraphql()
}
