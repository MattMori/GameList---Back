async function authDocProducao(req, res, next) {
    const { senhaDigitada } = req.body;

    // Verifica se o host é localhost ou se o URL original não é "/doc/"
    if (req.headers.host.includes("localhost") || req.originalUrl !== "/doc/") {
        // O usuário está no localhost ou não está acessando a rota da documentação
        return next();
    }

    // Verifica se a senha digitada é correta
    if (senhaDigitada === process.env.SWAGGER_SENHA_DOC) {
        // O usuário digitou a senha correta
        return next();
    }

    // Se a senha foi digitada e está incorreta
    if (senhaDigitada) {
        res.status(401).set('Content-Type', 'text/html');
        res.send(Buffer.from(`
            <form method="post">
                <p style="color: red;">Senha Errada!</p>
                <label for="senhaDigitada">Senha da documentação:</label>
                <input type="password" name="senhaDigitada" id="senhaDigitada" />
                <button type="submit">Entrar</button>
            </form>
        `));
    } else {
        // Se a senha ainda não foi digitada
        res.status(200).set('Content-Type', 'text/html');
        res.send(Buffer.from(`
            <form method="post">
                <label for="senhaDigitada">Senha da documentação:</label>
                <input type="password" name="senhaDigitada" id="senhaDigitada" />
                <button type="submit">Entrar</button>
            </form>
        `));
    }
}

module.exports = authDocProducao;
