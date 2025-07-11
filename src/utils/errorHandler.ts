export function handleError(error: any, res: any) {
    const errorMap: Record<number, { error: string; message: string }> = {
        400: { error: 'Bad Request', message: 'Requisição inválida' },
        401: { error: 'Unauthorized', message: 'Não autorizado' },
        403: { error: 'Forbidden', message: 'Acesso proibido' },
        404: { error: 'Not Found', message: 'Recurso não encontrado' },
        422: { error: 'Unprocessable Entity', message: 'Dados inválidos' },
        429: { error: 'Too Many Requests', message: 'Muitas requisições' },
        500: { error: 'Internal Server Error', message: 'Erro interno do servidor' },
        502: { error: 'Bad Gateway', message: 'Gateway inválido' },
        503: { error: 'Service Unavailable', message: 'Serviço indisponível' }
    };

    const statusCode = error.status || error.statusCode || 400;
    const errorInfo = errorMap[statusCode] || errorMap[400];

    return res.status(statusCode).json({
        ...errorInfo,
        details: error.message || 'Erro desconhecido'
    });
}