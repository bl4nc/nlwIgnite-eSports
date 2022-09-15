import logoImg from "./assets/logo.svg";
import GameCard from "./components/GameCard";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { useEffect, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { GameController } from "phosphor-react";
import { Input } from "./components/Form/Input";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);
  //Dessa maneira o comportamento só acontece apenas 1x
  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      });
  }, []);

  return (
    <div className="max-width-[1344px] mx-auto flex flex-col items-center my-20 mx-10">
      <img src={logoImg}></img>
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            // Procurar dps sobre a reatividade dessa Key no React
            <GameCard
              key={game.id}
              gameUrl={game.bannerUrl}
              adsCount={game._count.ads}
              name={game.title}
            />
          );
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black">
            <Dialog.DialogTitle className="text-2xl text-white font-bold">
              Publique um anúncio
            </Dialog.DialogTitle>
            <form className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="game">
                  Qual o game?
                </label>
                <Input
                  type="text"
                  id="game"
                  placeholder="Selecione o game deseja jogar"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="nome">Seu nome (ou nickname)</label>
                <Input
                  type="text"
                  id="nome"
                  placeholder="Como te chamam dentro do jogo?"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Jogo há quanto tempo?</label>
                  <Input
                    type="number"
                    id="yearsPlaying"
                    placeholder="Tudo bem ser zero"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual seu Discord?</label>
                  <Input type="text" id="discord" placeholder="usuario#2234" />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="dias">Quando costuma jogar?</label>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      className="w-8 h-8 rounded-sm bg-zinc-900"
                      title="Domingo"
                    >
                      D
                    </button>
                    <button
                      className="w-8 h-8 rounded-sm bg-zinc-900"
                      title="Segunda"
                    >
                      S
                    </button>
                    <button
                      className="w-8 h-8 rounded-sm bg-zinc-900"
                      title="Terça"
                    >
                      T
                    </button>
                    <button
                      className="w-8 h-8 rounded-sm bg-zinc-900"
                      title="Quarta"
                    >
                      Q
                    </button>
                    <button
                      className="w-8 h-8 rounded-sm bg-zinc-900"
                      title="Quinta"
                    >
                      Q
                    </button>
                    <button
                      className="w-8 h-8 rounded-sm bg-zinc-900"
                      title="Sexta"
                    >
                      S
                    </button>
                    <button
                      className="w-8 h-8 rounded-sm bg-zinc-900"
                      title="Sabado"
                    >
                      S
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label>Qual horario do dia</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input id="hourStart" type="time" placeholder="De"></Input>
                    <Input id="hourStart" type="time" placeholder="Até"></Input>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex gap-2">
                <input type="checkbox"></input>
                <label className="text-sm">Costumo me conectar ao chat de voz?</label>
              </div>
              <footer className="mt-4 mb-8 flex justify-end gap-4 ">
                <Dialog.Close className="bg-zinc-500 rounded px-5 h-11 shadow font-semibold hover:bg-zinc-600">Cancelar</Dialog.Close>
                <button className="flex items-center gap-3 bg-violet-500 rounded px-5 h-11 shadow font-semibold hover:bg-violet-600" type="submit">
                  <GameController size={24} /> Encontrar Duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default App;
