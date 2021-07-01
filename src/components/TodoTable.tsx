import { useState } from 'react';
import { ITodo } from '../interfaces';
import AditTodo from './AditTodo';
import { DeleteAction } from './Icons';

const initTodos: ITodo[] = [
  {
    title: 'Complete Todo list app with Typescript',
    deadline: 5,
    completed: false,
  },
  {
    title: 'Buy another T-shirt',
    deadline: 2,
    completed: true,
  },
  {
    title: 'Go on a walk for 1 hour',
    deadline: 1,
    completed: false,
  },
];

const TodoTable = (): JSX.Element => {
  const [todos, setTodos] = useState<ITodo[]>(initTodos);

  const deleteTodo = (title: string): void => {
    if (window.confirm('Are you sure you want to delete Todo?')) {
      const _todos = todos.filter(todo => todo.title !== title);
      setTodos(_todos);
      return;
    } else {
      window.confirm('Delete Todo action was cancelled');
    }
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Deadline
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th scope="col" className="text-right px-6 py-3">
                    <AditTodo todos={todos} setTodos={setTodos} isAdd={true} />
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {todos.map((todo, index) => (
                  <tr key={todo.title}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {todo.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {todo.deadline} days
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          todo.completed
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        } `}
                      >
                        {todo.completed ? 'Completed' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-around items-center">
                        <AditTodo
                          todos={todos}
                          setTodos={setTodos}
                          isAdd={false}
                          todoIndex={index}
                        />
                        <button
                          title="Delete Todo"
                          onClick={() => deleteTodo(todo.title)}
                        >
                          <DeleteAction />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoTable;
