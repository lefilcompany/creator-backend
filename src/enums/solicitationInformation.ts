export enum SolicitationInformation {
    USER_ID_INVALID = "User ID inválido",
    TEAM_ID_INVALID = "Team ID inválido",
    SOLICITATION_ALREADY_EXISTS = "Solicitação já existe",
    SOLICITATION_NOT_FOUND = "Solicitação não encontrada",
    SOLICITATION_ALREADY_ACCEPTED = "Solicitação já aceita",
    SOLICITATION_ALREADY_REJECTED = "Solicitação já rejeitada",
    SOLICITATION_ALREADY_CANCELED = "Solicitação já cancelada",
    SOLICITATION_ALREADY_EXPIRED = "Solicitação já expirada",
    SOLICITATION_NOT_PENDING = "Solicitação não está pendente",
    SOLICITATION_ACCEPTED = "Solicitação aceita",
    SOLICITATION_REJECTED = "Solicitação rejeitada",
    SOLICITATION_CANCELED = "Solicitação cancelada",
    SOLICITATION_EXPIRED = "Solicitação expirada",
    SOLICITATION_NOT_EXPIRED_YET = "Solicitação ainda não expirou. Deve ter pelo menos 1 semana.",
    SOLICITATION_DELETED = "Solicitação excluída",
    USER_IS_NOT_SOLICITATION_OWNER = "Usuário não é o proprietário da solicitação",
    INVALID_REQUEST = "Requisição inválida",
}

export enum SolicitationStatus {
    PENDING = 0, // Solicitação pendente
    ACCEPTED = 1, // Solicitação aceita
    REJECTED = 2, // Solicitação rejeitada
    CANCELED = 3, // Solicitação cancelada
    EXPIRED = 4, // Solicitação expirada
}