const blobStyles = {
  __html: `
    @keyframes blob {
      0% {
        transform: translate(0px, 0px) scale(1);
      }
      33% {
        transform: translate(30px, -50px) scale(1.1);
      }
      66% {
        transform: translate(-20px, 20px) scale(0.9);
      }
      100% {
        transform: translate(0px, 0px) scale(1);
      }
    }
    .animate-blob {
      animation: blob 7s infinite;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }
  `,
};

export function AnimatedBackground() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 overflow-hidden bg-linear-to-br from-blue-50 via-white to-purple-50">
        <div className="animate-blob absolute -top-40 -right-40 size-80 rounded-full bg-purple-200 opacity-70 mix-blend-multiply blur-xl filter"></div>
        <div className="animate-blob animation-delay-2000 absolute -bottom-40 -left-40 size-80 rounded-full bg-blue-200 opacity-70 mix-blend-multiply blur-xl filter"></div>
        <div className="animate-blob animation-delay-4000 absolute top-40 left-40 size-80 rounded-full bg-pink-200 opacity-70 mix-blend-multiply blur-xl filter"></div>
      </div>

      <style dangerouslySetInnerHTML={blobStyles} />
    </>
  );
}
