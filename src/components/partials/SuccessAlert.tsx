const SuccessAlert = ({msg}:{msg : string}) => {
    return msg !== "" ? (
        <div className="bg-green-100 px-3 py-2 border border-green-600 text-green-600 text-sm  my-2 w-full rounded-xl">
            {msg}
        </div>
    ) : null;
};
export default SuccessAlert;
