import React from "react";

function Home() {
  return (
    <div className="content">
      <h6>Olá, Um breve resumo do sistema :)</h6>
      <p>
        O sistema é um &quot;buscador&quot; de artistas e álbuns, foi
        desenvolvido usando a biblioteca React ❤, com as tecnologias, ESLint com
        padrão standart para organização do código, Babel Root Import para
        organização de importações, Redux Thunk para controle de estados, Cirrus
        UI para Kit de UI, Axios para integração com os backends, implementado
        tratamento de erros no interceptor, também foi feito controle de
        permissões nas rotas, no login usado JWT fake com a api REQRES... entre
        outras tecnologias.
      </p>

      <h5>Bom teste!</h5>
    </div>
  );
}

export default Home;
