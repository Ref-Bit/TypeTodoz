import { Dispatch, SetStateAction, useState } from 'react';
import { ITodo } from '../interfaces';
import { Modal } from 'react-responsive-modal';
import AditForm from './AditForm';
import { CloseAction, AddAction, EditAction } from './Icons';
import 'react-responsive-modal/styles.css';

interface Props {
  todos: ITodo[];
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
  isAdd: boolean;
  todoIndex?: number;
}

const AditTodo = ({ todos, setTodos, isAdd, todoIndex }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const addTodo = (todo: ITodo): void => {
    setTodos([...todos, todo]);
  };

  const editTodo = (todo: ITodo): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos[todoIndex ? todoIndex : 0] = todo;
    setTodos(newTodos);
  };

  const onOpenModal = (): void => setOpen(true);
  const onCloseModal = (): void => setOpen(false);

  return (
    <div className={`${!isAdd ? 'inline-flex self-center' : ''}`}>
      <button
        title={isAdd ? 'Add Todo' : 'Edit Todo'}
        onClick={onOpenModal}
        className="focus:outline-none"
      >
        {isAdd ? <AddAction /> : <EditAction />}
      </button>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        closeIcon={<CloseAction />}
        classNames={{ modal: 'w-1/3 rounded-lg' }}
      >
        <AditForm
          addTodo={addTodo}
          editTodo={editTodo}
          selectedTodo={todos[todoIndex ? todoIndex : 0]}
          closeModal={onCloseModal}
          isAdd={isAdd}
        />
      </Modal>
    </div>
  );
};

export default AditTodo;
