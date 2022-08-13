const ErrorAlert = ({ msg }: { msg: string }) => {
  return msg !== "" ? (
    <div className="bg-red-100 px-3 py-2 border border-red-600 text-red-600 text-smr my-2 w-full rounded-xl">
      {msg}
    </div>
  ) : null;
};
export default ErrorAlert;
