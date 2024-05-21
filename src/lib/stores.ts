import { create } from 'zustand';
import { addTodo, getTodo, updateTodo } from '@/action/actionTodo'
import type { ITodo } from '@/action/actionTodo'

type IStore = {
    input: string,
    todoList: ITodo[],
    changeInput: (input: IStore['input']) => void,
    addTodo: () => Promise<void>,
    loadTodo: () => Promise<void>,
    updateStatus: (id: ITodo['id'], boolean: boolean) => Promise<void>,
    filteredTodo: () => ITodo[],
}

const useStore = create<IStore>((set, get) => ({
    input: '',

    todoList: [],

    changeInput: (input: IStore['input']) => set({ input }),

    addTodo: async () => {
        const input = await get().input
        if (input.trim()) {
            const { insertedId, message, created, updated } = await addTodo(input);
            const newTodo = { id: insertedId, message, created, updated, isDone: false };
            set((state) => ({ input: '', todoList: [newTodo, ...state.todoList] }));
        }
    },

    loadTodo: async () => {
        const data = await getTodo();
        set({ todoList: data })
    },

    updateStatus: async (id: ITodo['id'], status: boolean) => {
        await updateTodo(id, status);
        set((state) => ({
            todoList: state.todoList.map(todo =>
                todo.id === id ? { ...todo, isDone: status } : todo
            )
        }));
    },

    filteredTodo: () => {
        const { input, todoList } = get();
        if (!input.trim()) return todoList;
        return todoList.filter(todo => todo.message.toLowerCase().includes(input.toLowerCase()));
    }
}))

export {useStore};