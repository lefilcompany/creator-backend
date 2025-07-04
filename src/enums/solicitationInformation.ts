export enum SolicitationInformation {
    USER_ID_INVALID = "User ID inválido",
    TEAM_ID_INVALID = "Team ID inválido",
}

export enum SolicitationStatus {
    PENDING = 0, // Solicitação pendente
    ACCEPTED = 1, // Solicitação aceita
    REJECTED = 2, // Solicitação rejeitada
    CANCELED = 3, // Solicitação cancelada
    EXPIRED = 4, // Solicitação expirada
}