import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';

export function CreateAdBanner() {
    return (
        <div className='pt-1 bg-gradient-to-r from-[#46baba] to-[#f4cf3a] rounded-lg self-stretch  mt-8 overflow-hidden'>
            <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
                <div>   
                    <strong className='text-2xl text-white font-black block'>Não encontrou o seu duo?</strong>
                    <span className='text-zinc-400'>Publique um anúncio para encontrar novos players!</span>
                </div>
                <Dialog.Trigger className='py-3 px-4 bg-violet-500 text-white rounded hover:bg-violet-600 transition flex items-center gap-3 '>
                    <MagnifyingGlassPlus size={24}/>
                    Publicar anúncio
                </Dialog.Trigger>
            </div>
        </div>
    )
}