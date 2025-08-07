const Loader = ({ className = '' }) => {
    return (
        <div
            className={`animate-spin rounded-full border-4 border-t-green-500 border-gray-300 ${className}`}
        />
    );
};

export default Loader;

