import express from 'express';
import router from './routes';

const app = express();
// Neste projeto de exemplo, o CORS não está habilitado. Isso
// significa que a API não aceitará requisições que não sejam do mesmo
// domínio (localhost caso você esteja na fase de desenvolvimento). 
// Para habilitar o CORS, instale a dependência "cors" e use como um middleware.
app.use(express.json());
app.use(router);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
