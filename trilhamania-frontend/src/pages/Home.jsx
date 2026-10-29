import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

export default function Home() {
  const [trilhas, setTrilhas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/trilhas/")
      .then((response) => {
        setTrilhas(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Erro ao buscar trilhas:", error);
        setErro(true);
        setLoading(false);
      });
  }, []);

  function criarData(data) {
    return new Date(`${data}T00:00:00`);
  }

  function formatarData(data) {
    return criarData(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  function pegarDia(data) {
    return criarData(data).getDate().toString().padStart(2, "0");
  }

  function pegarMes(data) {
    return criarData(data)
      .toLocaleDateString("pt-BR", {
        month: "short",
      })
      .replace(".", "")
      .toUpperCase();
  }

  function urlImagem(imagem) {
    if (!imagem) {
      return null;
    }

    if (imagem.startsWith("http")) {
      return imagem;
    }

    return `http://127.0.0.1:8000${imagem}`;
  }

  function criarLinkWhatsapp(telefone) {
    if (!telefone) {
      return "#";
    }

    const numero = telefone.replace(/\D/g, "");

    const numeroComPais = numero.startsWith("55")
      ? numero
      : `55${numero}`;

    return `https://wa.me/${numeroComPais}`;
  }

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const proximasTrilhas = [...trilhas]
    .filter((trilha) => criarData(trilha.data) >= hoje)
    .sort((a, b) => criarData(a.data) - criarData(b.data));

  return (
    <div className="pagina">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="container navbar-conteudo">
          <div className="logo">
            TRILHA<span>MANIA</span>
          </div>

          <nav>
            <a href="#calendario">Calendário</a>
            <a href="#sobre">Sobre</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay"></div>

        <div className="container hero-conteudo">
          <p className="hero-destaque">
            CALENDÁRIO OFF-ROAD
          </p>

          <h1>
            Sua próxima aventura
            <span> começa aqui.</span>
          </h1>

          <p className="hero-texto">
            Confira o calendário oficial de trilhas do
            Trilhamania e encontre a próxima aventura perto
            de você.
          </p>

          <a
            href="#calendario"
            className="botao-principal"
          >
            Ver próximas trilhas
          </a>
        </div>
      </section>

      {/* CALENDÁRIO */}
      <section
        className="calendario"
        id="calendario"
      >
        <div className="container">
          <div className="titulo-secao">
            <p>AGENDA TRILHAMANIA</p>

            <h2>Próximas Trilhas</h2>

            <span>
              Confira datas, cidades e informações das
              próximas aventuras.
            </span>
          </div>

          {loading && (
            <div className="mensagem">
              Carregando trilhas...
            </div>
          )}

          {erro && (
            <div className="mensagem erro">
              Não foi possível carregar as trilhas.
            </div>
          )}

          {!loading &&
            !erro &&
            proximasTrilhas.length === 0 && (
              <div className="mensagem">
                <h3>Nenhuma trilha programada</h3>

                <p>
                  Novas datas serão divulgadas em breve.
                </p>
              </div>
            )}

          <div className="lista-trilhas">
            {proximasTrilhas.map((trilha) => (
              <article
                className="card-trilha"
                key={trilha.id}
              >
                {/* DATA */}
                <div className="data-trilha">
                  <span className="mes">
                    {pegarMes(trilha.data)}
                  </span>

                  <strong>
                    {pegarDia(trilha.data)}
                  </strong>

                  <span className="ano">
                    {criarData(trilha.data).getFullYear()}
                  </span>
                </div>

                {/* IMAGEM */}
                <div className="imagem-container">
                  {trilha.imagem ? (
                    <img
                      src={urlImagem(trilha.imagem)}
                      alt={trilha.nome}
                    />
                  ) : (
                    <div className="sem-imagem">
                      🏍️
                    </div>
                  )}
                </div>

                {/* INFORMAÇÕES */}
                <div className="informacoes-trilha">
                  <span className="badge">
                    TRILHA
                  </span>

                  <h3>{trilha.nome}</h3>

                  <div className="detalhes">
                    <p>
                      <span>📍</span>
                      {trilha.cidade}
                    </p>

                    <p>
                      <span>📅</span>
                      {formatarData(trilha.data)}
                    </p>

                    <p>
                      <span>📞</span>
                      {trilha.telefone_organizador}
                    </p>
                  </div>

                  <a
                    href={criarLinkWhatsapp(
                      trilha.telefone_organizador
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="botao-whatsapp"
                  >
                    Falar com o organizador
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section
        className="sobre"
        id="sobre"
      >
        <div className="container sobre-conteudo">
          <p className="sobre-destaque">
            SOBRE
          </p>

          <h2>Trilhamania</h2>

          <p>
            O ponto de encontro para quem vive a paixão
            pelas trilhas e aventuras off-road. Acompanhe
            nossa agenda e não perca a próxima trilha.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <strong>
            TRILHA<span>MANIA</span>
          </strong>

          <p>
            Instagram: @trilhamania
            Desenvolvedor: @junior._.me 
          </p>
        </div>
      </footer>
    </div>
  );
}