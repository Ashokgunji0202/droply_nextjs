
export default function FileLoadingState() {
  return (
    <div className="flex flex-col justify-center items-center py-20">
      <div className="animate-spin h-16 w-16 border-4 border-t-primary rounded-full border-gray-200"></div> 
      <p className="mt-4 text-gray-600">Loading your files...</p>
    </div>
  );
}
