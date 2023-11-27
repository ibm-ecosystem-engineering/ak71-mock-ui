import {FamilyAllowanceApi} from "./family-allowance.api.ts";
import {FamilyAllowanceModel, FamilyAllowanceStatus, FamilyAllowanceStatusFilter} from "../../models";
import {ApolloClient, FetchResult, gql} from "@apollo/client";
import {getApolloClient} from "../../backends";

const QUERY_LIST_CASES = gql`
query ListCases($status: FamilyAllowanceStatusFilter) {
    listFamilyAllowanceCases(status: $status) {
        id
        firstName
        lastName
        type
        status
    }
}
`
type ReturnTypeQueryListCases = {listFamilyAllowanceCases: FamilyAllowanceModel[]}

const QUERY_GET_CASE = gql`
query GetCase($id: ID!) {
    getFamilyAllowanceCase(id: $id) {
        id
        firstName
        lastName
        type
        status
    }
}
`
type ReturnTypeQueryGetCase = {getFamilyAllowanceCase: FamilyAllowanceModel}

const MUTATION_UPDATE_CASE = gql`
mutation UpdateCaseStatus($id: ID!, $status: FamilyAllowanceStatus!) {
    updateFamilyAllowanceStatus(id: $id, status: $status) {
        id
        firstName
        lastName
        type
        status
    }
}
`
type ReturnTypeMutationUpdateStatus = {updateFamilyAllowanceStatus: FamilyAllowanceModel}

export class FamilyAllowanceGraphql implements FamilyAllowanceApi {
    client: ApolloClient<unknown>;

    constructor() {
        this.client = getApolloClient();
    }

    async listFamilyAllowanceCases(filter?: FamilyAllowanceStatusFilter): Promise<FamilyAllowanceModel[]> {
        return this.client
            .query<ReturnTypeQueryListCases>({
                query: QUERY_LIST_CASES,
                variables: {filter}
            })
            .then((result: FetchResult<ReturnTypeQueryListCases>) => {
                return result.data.listFamilyAllowanceCases
            })
    }

    async getFamilyAllowanceCase(id: string): Promise<FamilyAllowanceModel> {
        return this.client
            .query<ReturnTypeQueryGetCase>({
                query: QUERY_GET_CASE,
                variables: {id},
            })
            .then((result: FetchResult<ReturnTypeQueryGetCase>) => {
                return result.data?.getFamilyAllowanceCase
            })
    }

    async updateFamilyAllowanceStatus(id: string, status: FamilyAllowanceStatus): Promise<FamilyAllowanceModel> {
        return this.client
            .mutate<ReturnTypeMutationUpdateStatus>({
                mutation: MUTATION_UPDATE_CASE,
                variables: {id, status},
                refetchQueries: [{query: QUERY_LIST_CASES}, {query: QUERY_GET_CASE, variables: {id}}],
                awaitRefetchQueries: true,
            })
            .then(async (result: FetchResult<ReturnTypeMutationUpdateStatus>) => {
                return result.data?.updateFamilyAllowanceStatus
            })
    }

}
