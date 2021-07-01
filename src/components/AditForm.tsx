import { useForm, SubmitHandler } from 'react-hook-form';
import { ITodo } from '../interfaces';

interface Props {
  addTodo: (todo: ITodo) => void;
  editTodo: (todo: ITodo) => void;
  selectedTodo: ITodo | null;
  closeModal: () => void;
  isAdd: boolean;
}

function AditForm({
  addTodo,
  editTodo,
  selectedTodo,
  closeModal,
  isAdd,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITodo>({
    defaultValues: {
      title: !isAdd && selectedTodo ? selectedTodo.title : '',
      deadline: !isAdd && selectedTodo ? selectedTodo.deadline : undefined,
      completed: !isAdd && selectedTodo ? selectedTodo.completed : false,
    },
  });

  const onSubmit: SubmitHandler<ITodo> = (data: ITodo) => {
    isAdd ? addTodo(data) : editTodo(data);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4">
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter todo title"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring focus:ring-indigo-600 transition duration-300"
          {...register('title', { required: true })}
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic font-semibold mt-1">
            This field is required!
          </p>
        )}
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="deadline"
        >
          Deadline
        </label>
        <input
          type="number"
          id="deadline"
          placeholder="Enter deadline for task in days"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring focus:ring-indigo-600 transition duration-300"
          {...register('deadline', { min: 1, max: 7, required: true })}
        />
        {errors.deadline?.type === 'required' && (
          <p className="text-red-500 text-xs italic font-semibold mt-1">
            This field is required!
          </p>
        )}
        {(errors.deadline?.type === 'min' ||
          errors.deadline?.type === 'max') && (
          <p className="text-red-500 text-xs italic font-semibold mt-1">
            You must specify a minimum value of 1 and a maximum value of 7
          </p>
        )}
      </div>
      <div className="mb-6">
        <label className="flex items-center">
          <input
            className="relative w-8 h-4 transition-all duration-300 ease-in-out bg-gray-400 rounded-full shadow-inner outline-none appearance-none focus:ring focus:ring-indigo-600"
            type="checkbox"
            {...register('completed')}
          />
          <span className="text-gray-700 text-sm font-bold ml-2">
            Completed
          </span>
        </label>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-gray-300 hover:bg-indigo-600 text-gray-900 hover:text-gray-50 font-semibold shadow py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring focus:ring-indigo-600 transition duration-300"
        >
          {isAdd ? 'Add' : 'Update'}
        </button>
      </div>
    </form>
  );
}

export default AditForm;
