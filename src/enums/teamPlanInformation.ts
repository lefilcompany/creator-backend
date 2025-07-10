export enum TeamPlanInformation {
    TEAM_ID_REQUIRED = 'O id da equipe é obrigatório e deve ser um número positivo.',
    PLAN_ID_REQUIRED = 'O id do plano é obrigatório e deve ser um número positivo.',
    END_DATE_REQUIRED = 'A data de término é obrigatória e deve ser uma data válida.',
    TEAM_PLAN_NOT_FOUND = 'Plano de equipe não encontrado.',
    TEAM_PLAN_CREATED = 'Plano de equipe criado com sucesso.',
    TEAM_PLAN_UPDATED = 'Plano de equipe atualizado com sucesso.',
    TEAM_PLAN_DELETED = 'Plano de equipe excluído com sucesso.',
    END_DATE_INVALID = 'A data de término deve ser uma data futura.',
    MISSING_REQUIRED_FIELDS = 'Campos obrigatórios ausentes: teamId, planId, endDate.',
    INVALID_DATE_FORMAT = 'Formato de data inválido. Use "DD/MM/YYYY".',
}