import TodoTable from './components/TodoTable';

const App = (): JSX.Element => {
  return (
    <div className="container min-h-screen px-4">
      <h1 className="text-6xl text-center py-12 font-medium font-title">
        Type Todoz
      </h1>
      <div className="flex justify-center items-center">
        <div className="w-2/3">
          <TodoTable />
        </div>
      </div>
    </div>
  );
};

export default App;
