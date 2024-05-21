import { create } from 'zustand';
import { addTodo, getTodo } from '@/action/actionTodo'
import type { ITodo } from '@/action/actionTodo'

type IStore = {
    input: string,
    todoList: ITodo[],
    changeInput: (input: IStore['input']) => void,
    addTodo: () => Promise<void>,
    loadTodo: () => Promise<void>
}

const useStore = create<IStore>((set, get) => ({
    input: '',
    todoList: [],
    changeInput: (input: IStore['input']) => set({ input }),
    addTodo: async () => {
        const input = await get().input
        if (input.trim()) {
            const { insertedId, message, created, updated } = await addTodo(input)
            const todoList = get().todoList
            todoList.push({ id: insertedId, message, created, updated })
            set({ input: '', todoList: todoList })
        }
    },
    loadTodo: async () => {
        const data = await getTodo();
        set({ todoList: data })
    }
}))

export {useStore};