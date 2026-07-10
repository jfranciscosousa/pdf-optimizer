export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-linear-to-br from-blue-50 via-white to-purple-50">
      <div className="absolute -top-40 -right-40 size-80 animate-blob rounded-full bg-purple-200 opacity-70 mix-blend-multiply blur-xl" />
      <div className="absolute -bottom-40 -left-40 size-80 animate-blob rounded-full bg-blue-200 opacity-70 mix-blend-multiply blur-xl [animation-delay:2s]" />
      <div className="absolute top-40 left-40 size-80 animate-blob rounded-full bg-pink-200 opacity-70 mix-blend-multiply blur-xl [animation-delay:4s]" />
    </div>
  );
}
