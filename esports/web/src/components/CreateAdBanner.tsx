import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

export function CreateAdBanner() {
  return (
    <div className="pt-1 bg-nlw-gradient self-stretch rounded overflow-hidden mt-8">
      <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
        <div>
          <strong className="text-xl block text-white text-bold">
            Não encontrou seu duo?
          </strong>
          <span className="block text-zinc-400">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>
        <div className="">
          <Dialog.Trigger className="py-3 px-4 bg-violet-500 hover:bg-violet-600 shadow-sm text-white rounded flex items-center gap-3">
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </Dialog.Trigger>
        </div>
      </div>
    </div>
  );
}
