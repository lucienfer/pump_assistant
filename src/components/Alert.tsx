const Alert = ({ message }: { message: string }) => (
  <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-lg text-red-600">
    {message}
  </div>
);

export default Alert;
