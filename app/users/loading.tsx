
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 dark:bg-black bg-opacity-50 dark:bg-opacity-60">
      <div className="flex items-center justify-center p-6 rounded-lg">
        <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-neutral-500 rounded-full"></div>
      </div>
    </div>
  )
}
