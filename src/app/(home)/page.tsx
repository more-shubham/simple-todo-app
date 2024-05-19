import TodoInput from '@/components/TodoInput';
import UserButton from '@/components/UserButton';
import TodoItem from '@/components/TodoItem';
import TodoLists from '@/components/TodoLists';

export default function Home() {
  return (
    <main className='max-w-screen-sm mx-auto my-4 space-y-2' >
      <UserButton />
      <TodoInput />
      <TodoLists />
      {/* <TodoItem itemId='1' itemContent='Sample text' isDone /> */}
    </main>
  );
}
