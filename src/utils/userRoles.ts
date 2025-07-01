import { UserModelInterface } from "../models/userModel";

export enum UserRoles {
    NEW_USER = 0,       
    TEAM_ADMIN = 1,  
    TEAM_MEMBER = 2,  
    SYSTEM_ADMIN = 3   
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