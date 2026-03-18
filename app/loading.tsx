export default function Loading() {
  return (
    <div className="min-h-screen pt-[72px] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-gray-200 border-t-accent-500 rounded-full animate-spin" />
        <p className="text-sm font-body text-text-muted animate-pulse">Loading...</p>
      </div>
    </div>
  )
}
