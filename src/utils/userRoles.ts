import { UserModelInterface } from "../models/userModel";

export enum UserRoles {
    WITHOUT_TEAM = 0,       
    TEAM_ADMIN = 1,  
    TEAM_MEMBER = 2,  
    SYSTEM_ADMIN = 3   
}

export enum UserRolesDescriptions {
    WITHOUT_TEAM_DESCRIPTION = "Usuário sem equipe",
    TEAM_ADMIN_DESCRIPTION = "Administrador da equipe",
    TEAM_MEMBER_DESCRIPTION = "Membro da equipe",
    SYSTEM_ADMIN_DESCRIPTION = "Administrador do sistema",
    ROLE_UNKNOWN_DESCRIPTION = "Role desconhecida"
}

export interface UserRoleValidator {
    /*
        Verifica se o usuário pode criar uma equipe
        Apenas usuários com role 0 (sem equipe) podem criar equipes
    */
    canCreateTeam(): boolean

    /*
        Verifica se o usuário pode gerenciar a equipe
        Apenas administradores da equipe (role 1) e do sistema (role 3)
    */
    canManageTeam(): boolean 

    /*
        Verifica se o usuário pode usar funcionalidades de IA
        Apenas usuários com equipe (roles 1, 2 ou 3)
    */
    canUseAIFeatures(): boolean 

    /*
        Verifica se o usuário pode entrar em uma equipe
        Apenas usuários com role 0 (sem equipe) podem entrar em equipes
    */
     canJoinTeam(): boolean

    /*
        Retorna a descrição da role
    */
    getRoleDescription(): string
}