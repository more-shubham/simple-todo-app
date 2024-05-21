import { create } from 'zustand';
import { addTodo } from '@/action/actionTodo'

type IStore = {
    input: string,
    changeInput: (input: IStore['input']) => void,
    addTodo: () => Promise<void>,
}

const useStore = create<IStore>((set, get) => ({
    input: '',
    changeInput: (input: IStore['input']) => set({ input }),
    addTodo: async () => {
        const input = await get().input
        if (input.trim()) {
            const { insertedId, message } = await addTodo(input)
            console.log(insertedId, message)
            set({ input: '' })
        }
    }
}))

export {useStore};